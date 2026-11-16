<?php
/**
 * 기존 하드코딩 페이지 → 차수 JSON 변환 (서버에서 1회 실행)
 *
 *   php tools/migrate_legacy.php <Speaking폴더> <Writing폴더> <차수ID> [제목]
 *   예) php tools/migrate_legacy.php /www/content/TOS/sample/Speaking02 /www/content/TOS/sample/Speaking11 2025_02 "Sample Test 2025-02"
 *
 * Speaking폴더: testSpe01~05.php 가 있는 곳 / Writing폴더: testWri01~03.php 가 있는 곳
 * 결과: data/rounds/<차수ID>.json  (+ 파트별 Directions 문구를 화면에 출력 → config/parts.php에 1회 옮겨 넣기)
 */
if (PHP_SAPI !== 'cli') exit("CLI 전용\n");
if ($argc < 4) exit("사용법: php migrate_legacy.php <Speaking폴더> <Writing폴더> <차수ID> [제목]\n");

list(, $speDir, $wriDir, $roundId) = $argv;
$title = isset($argv[4]) ? $argv[4] : $roundId;
if (!preg_match('/^[A-Za-z0-9_-]{1,40}$/', $roundId)) exit("차수ID는 영문/숫자/_/- 만 사용\n");

$IMG_BASE   = 'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/';
$AUDIO_BASE = 'https://upsisa.ybmnet.co.kr:444/si/exam_ybmsisa_com/E_TOS/sampleTest/';
$directions = array();

/* ---------- 헬퍼 ---------- */
function load($file) {
  if (!is_file($file)) { fwrite(STDERR, "없음: $file\n"); return null; }
  $html = file_get_contents($file);
  // var soundQ1 = new Audio("...mp3");
  preg_match_all('/var\s+(sound\w+)\s*=\s*new\s+Audio\(\s*["\']([^"\']+)["\']/', $html, $m, PREG_SET_ORDER);
  $audio = array();
  foreach ($m as $row) $audio[$row[1]] = $row[2];
  $html = preg_replace('/<\?(php|=)?[\s\S]*?\?>/', '', $html);   // PHP 코드 제거
  $doc = new DOMDocument();
  libxml_use_internal_errors(true);
  $doc->loadHTML('<?xml encoding="utf-8"?>' . $html);
  libxml_clear_errors();
  return array('x' => new DOMXPath($doc), 'audio' => $audio);
}
function cls($c) { return "contains(concat(' ', normalize-space(@class), ' '), ' $c ')"; }
/** <br>을 줄바꿈으로 살리면서 텍스트 추출 */
function txt($node) {
  $out = '';
  foreach ($node->childNodes as $c) {
    if ($c->nodeType === XML_TEXT_NODE) $out .= preg_replace('/\s+/u', ' ', $c->nodeValue);
    elseif ($c->nodeName === 'br') $out .= "\n";
    elseif (in_array($c->nodeName, array('button', 'script', 'img'))) continue;
    else $out .= txt($c);
  }
  return trim(preg_replace("/ *\n */", "\n", $out));
}
function short($url, $base) { return strpos($url, $base) === 0 ? substr($url, strlen($base)) : $url; }
function btnAudio($node, $page) {
  global $AUDIO_BASE;
  $xp = $page['x'];
  foreach ($xp->query('.//button[@onclick]', $node) as $b) {
    if (preg_match('/LCpartPlay\((\w+)\)/', $b->getAttribute('onclick'), $m) && isset($page['audio'][$m[1]]))
      return short($page['audio'][$m[1]], $AUDIO_BASE);
  }
  return '';
}
function first($xp, $q, $ctx = null) { $r = $xp->query($q, $ctx); return $r->length ? $r->item(0) : null; }

/** 공통: Directions 첫 문단 + 음성, 상황설명 문단 + 음성, 공통 이미지 */
function head($page, $key) {
  global $directions, $IMG_BASE;
  $xp = $page['x']; $d = array();
  $ps = $xp->query("//div[" . cls('direction') . "]/p[" . cls('txt_normal') . " and not(" . cls('red') . ")]");
  if ($ps->length) {
    $directions[$key] = txt($ps->item(0));
    $d['audio_direction'] = btnAudio($ps->item(0), $page);
  }
  if ($ps->length > 1) {
    $d['context'] = txt($ps->item($ps->length - 1));
    $d['audio_context'] = btnAudio($ps->item($ps->length - 1), $page);
  }
  $img = first($xp, "//div[" . cls('direction') . "]//img");
  if ($img) $d['image'] = short($img->getAttribute('src'), $IMG_BASE);
  return $d;
}
function questions($page) {
  $xp = $page['x']; $items = array();
  foreach ($xp->query("//div[" . cls('tit_m_que') . "]") as $q) {
    $span = first($xp, './span', $q);
    $label = $span ? $span->textContent : '';
    $items[] = array('text' => trim(substr(txt($q), strlen(trim($label)))), 'audio' => btnAudio($q, $page));
  }
  if (!$items) {   // tit_m_que가 없는 페이지 대비
    foreach ($xp->query("//div[" . cls('main_content') . "]//p[" . cls('scription') . "]") as $p)
      $items[] = array('text' => txt($p), 'audio' => '');
  }
  return $items;
}

/* ---------- Speaking ---------- */
$spe = array();
if ($pg = load("$speDir/testSpe01.php")) {
  $d = head($pg, 'read_aloud'); unset($d['context'], $d['audio_context']);
  foreach ($pg['x']->query("//div[" . cls('main_content') . "]//p[" . cls('scription') . "]") as $p) $d['items'][] = array('text' => txt($p));
  $spe['read_aloud'] = $d;
}
if ($pg = load("$speDir/testSpe02.php")) {
  $d = head($pg, 'describe_picture'); unset($d['image'], $d['context'], $d['audio_context']);
  foreach ($pg['x']->query("//div[" . cls('main_content') . "]//img") as $img) $d['items'][] = array('image' => short($img->getAttribute('src'), $IMG_BASE));
  $spe['describe_picture'] = $d;
}
if ($pg = load("$speDir/testSpe03.php")) { $d = head($pg, 'respond_questions'); $d['items'] = questions($pg); $spe['respond_questions'] = $d; }
if ($pg = load("$speDir/testSpe04.php")) { $d = head($pg, 'respond_info');      $d['items'] = questions($pg); $spe['respond_info'] = $d; }
if ($pg = load("$speDir/testSpe05.php")) { $d = head($pg, 'opinion'); unset($d['context'], $d['audio_context']); $d['items'] = questions($pg); $spe['opinion'] = $d; }

/* ---------- Writing ---------- */
$wri = array();
if ($pg = load("$wriDir/testWri01.php")) {
  head($pg, 'picture_sentence'); $d = array('items' => array());
  foreach ($pg['x']->query("//div[" . cls('main_content') . "]//span[" . cls('pic') . "]") as $s) {
    $img = first($pg['x'], './/img', $s);
    $d['items'][] = array('image' => $img ? short($img->getAttribute('src'), $IMG_BASE) : '', 'keywords' => trim(txt($s)));
  }
  $wri['picture_sentence'] = $d;
}
if ($pg = load("$wriDir/testWri02.php")) {
  head($pg, 'email'); $d = array('items' => array()); $xp = $pg['x'];
  foreach ($xp->query("//div[" . cls('main_content') . "]//div[" . cls('scription') . "]") as $box) {
    $it = array();
    foreach ($xp->query(".//strong[" . cls('subj') . "]", $box) as $s) {
      $val = ''; $n = $s->nextSibling;
      while ($n && $n->nodeName !== 'br' && $n->nodeName !== 'strong') { $val .= $n->textContent; $n = $n->nextSibling; }
      $it[strtolower(trim($s->textContent))] = trim($val);
    }
    $body = first($xp, ".//span[" . cls('txt_in') . "]", $box);
    $it['body'] = $body ? txt($body) : '';
    $dirs = $xp->query(".//p[" . cls('direction') . "]", $box);
    $it['task'] = $dirs->length > 1 ? txt($dirs->item($dirs->length - 1)) : '';
    $d['items'][] = array_merge(array('from' => '', 'to' => '', 'subject' => '', 'sent' => ''), $it);
  }
  $wri['email'] = $d;
}
if ($pg = load("$wriDir/testWri03.php")) {
  head($pg, 'essay'); $xp = $pg['x']; $text = '';
  $box = first($xp, "//div[" . cls('main_content') . "]//div[" . cls('scription') . "]");
  if ($box) {
    foreach ($xp->query(".//p[" . cls('direction') . "]", $box) as $p) $p->parentNode->removeChild($p);
    $text = txt($box);
  }
  $wri['essay'] = array('items' => array(array('text' => $text)));
}

/* ---------- 저장 ---------- */
$out = array('id' => $roundId, 'title' => $title, 'open' => false, 'spe' => $spe, 'wri' => $wri);
$dest = dirname(__FILE__) . "/../data/rounds/$roundId.json";
file_put_contents($dest, json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
echo "저장: $dest  (open:false 상태 — test.php?r=$roundId&preview=1 로 확인 후 true로 변경)\n\n";
echo "== Directions 문구 (config/parts.php의 'direction'에 1회 옮겨 넣기) ==\n";
foreach ($directions as $k => $v) echo "[$k]\n$v\n\n";
