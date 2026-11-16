<?php
/**
 * 샘플 테스트 공통 함수 (PHP 5.6+ 호환)
 */

define('SP_IMG_BASE',   'https://imagesisa.ybmnet.co.kr/platform/exam_ybmnet_co_kr/content/toeicsw/');
define('SP_AUDIO_BASE', 'https://upsisa.ybmnet.co.kr:444/si/exam_ybmsisa_com/E_TOS/sampleTest/');
define('SP_DATA_DIR',   dirname(__FILE__) . '/../data/rounds/');
define('SP_CONFIG',     dirname(__FILE__) . '/../config/parts.php');

/* ---------- 출력 헬퍼 ---------- */
function sp_h($s)    { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function sp_text($s) { return nl2br(sp_h(trim((string)$s)), false); }          // 줄바꿈 → <br>
function sp_get($arr, $key, $def = '') { return (is_array($arr) && isset($arr[$key])) ? $arr[$key] : $def; }

/** 파일명만 적으면 기본 경로를 붙이고, http로 시작하면 그대로 사용 */
function sp_asset($v, $base) {
  $v = trim((string)$v);
  if ($v === '') return '';
  return preg_match('#^https?://#i', $v) ? $v : $base . $v;
}
function sp_img($v)   { return sp_asset($v, SP_IMG_BASE); }
function sp_audio($v) { return sp_asset($v, SP_AUDIO_BASE); }

/** 스피커 버튼 (오디오 없으면 출력 안 함) */
function sp_speaker($file) {
  $url = sp_audio($file);
  return $url === '' ? '' : '<button type="button" class="btn btn_speaker" data-audio="' . sp_h($url) . '"></button>';
}

/* ---------- 차수 ---------- */
function sp_valid_id($id) { return is_string($id) && preg_match('/^[A-Za-z0-9_-]{1,40}$/', $id); }

/** 등록된 차수 목록 (파일명 역순 = 최신 차수 먼저) */
function sp_list_rounds($includeClosed = false) {
  $out = array();
  foreach ((array)glob(SP_DATA_DIR . '*.json') as $file) {
    $data = json_decode(file_get_contents($file), true);
    if (!is_array($data)) continue;
    $id = basename($file, '.json');
    $open = !isset($data['open']) || $data['open'];
    if (!$open && !$includeClosed) continue;
    $out[$id] = array('id' => $id, 'title' => sp_get($data, 'title', $id), 'open' => $open);
  }
  krsort($out, SORT_STRING);
  return $out;
}

/** ?r= 값이 없으면 공개된 최신 차수 */
function sp_resolve_round($requested, $preview) {
  $rounds = sp_list_rounds($preview);
  if (sp_valid_id($requested) && isset($rounds[$requested])) return $requested;
  $ids = array_keys($rounds);
  return $ids ? $ids[0] : '';
}

function sp_load_round($id) {
  if (!sp_valid_id($id)) return null;
  $file = SP_DATA_DIR . $id . '.json';
  if (!is_file($file)) return null;
  $data = json_decode(file_get_contents($file), true);
  return is_array($data) ? $data : null;
}

/* ---------- 페이지 구성 ---------- */
/**
 * 섹션(spe/wri)의 페이지 배열을 만든다.
 * [0] = 안내(Direction) 페이지, [1..n] = 파트별 문제 페이지
 */
function sp_build_pages($config, $round, $sec) {
  $secConf = $config[$sec];
  $pages = array(array('kind' => 'intro', 'chapter' => $secConf['label'] . ' Directions', 'intro' => $secConf['intro']));
  foreach ($secConf['parts'] as $part) {
    $data = sp_get(sp_get($round, $sec, array()), $part['key'], array());
    $range = $part['from'] == $part['to'] ? 'Question ' . $part['from'] : 'Questions ' . $part['from'] . '-' . $part['to'];
    $pages[] = array(
      'kind'    => 'part',
      'part'    => $part,
      'data'    => $data,
      'range'   => $range,
      'chapter' => $range . ' of ' . $secConf['total'],
    );
  }
  return $pages;
}

/** 입력 누락 점검 (미리보기 모드에서 화면 상단에 표시) */
function sp_validate($config, $round) {
  $warn = array();
  foreach (array('spe', 'wri') as $sec) {
    foreach ($config[$sec]['parts'] as $part) {
      $data  = sp_get(sp_get($round, $sec, array()), $part['key'], null);
      $label = $config[$sec]['label'] . ' Q' . $part['from'] . ($part['to'] != $part['from'] ? '-' . $part['to'] : '');
      if (!$data) { $warn[] = "$label : 데이터 없음"; continue; }
      $need  = $part['to'] - $part['from'] + 1;
      $items = sp_get($data, 'items', array());
      if (count($items) != $need) $warn[] = "$label : 문항 {$need}개 필요 (현재 " . count($items) . "개)";
      foreach ($items as $i => $it) {
        $no = $part['from'] + $i;
        if (in_array($part['type'], array('picture_list', 'picture_keywords')) && trim(sp_get($it, 'image')) === '')
          $warn[] = "$label : Question $no 이미지 없음";
        if (in_array($part['type'], array('text_list', 'question_set', 'essay')) && trim(sp_get($it, 'text')) === '')
          $warn[] = "$label : Question $no 문항 텍스트 없음";
      }
    }
  }
  return $warn;
}

/** 페이지 이동 URL */
function sp_url($round, $sec, $p, $preview) {
  $q = array('r' => $round, 'sec' => $sec, 'p' => $p);
  if ($preview) $q['preview'] = 1;
  return '?' . http_build_query($q);
}
