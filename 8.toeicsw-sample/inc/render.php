<?php
/**
 * 파트 유형별 렌더러 — 기존 페이지 마크업(class명)을 그대로 사용합니다.
 * 새 유형이 생기면 sp_render_<type>() 함수 하나만 추가하면 됩니다.
 */

/* ---------- 공통: 제목 + Directions ---------- */
function sp_render_head($page) {
  $part = $page['part']; $d = $page['data'];
  $direction = sp_get($d, 'direction', $part['direction']);   // 차수별 덮어쓰기 가능
  ob_start(); ?>
  <h2 class="page_title"> <?php echo sp_h($page['range'] . ': ' . $part['title']); ?>
    <p class="sub_script"><?php echo sp_h($part['sub']); ?></p>
  </h2>
  <div class="direction">
    <h3>Directions.</h3>
    <p class="txt_normal">
      <?php echo sp_speaker(sp_get($d, 'audio_direction')); ?>
      <?php echo sp_text($direction); ?>
    </p>
    <?php if (!empty($part['criteria'])): ?>
      <ul class="type_02">
        <?php foreach ($part['criteria'] as $c): ?><li>• <?php echo sp_h($c); ?></li><?php endforeach; ?>
      </ul><br>
    <?php endif; ?>
    <?php if (!empty($part['direction_after'])): ?>
      <p class="txt_normal"><?php echo sp_text($part['direction_after']); ?></p>
    <?php endif; ?>

    <?php /* 공통 이미지(예: Q8-10 일정표) */ if (sp_get($d, 'image') !== ''): ?>
      <span class="pic"><img src="<?php echo sp_h(sp_img($d['image'])); ?>" alt=""></span>
    <?php endif; ?>
    <?php if (!empty($part['notice'])): ?>
      <p class="txt_normal red"><?php echo sp_h($part['notice']); ?></p>
    <?php endif; ?>
    <?php /* 상황 설명 지문 (Q5-7, Q8-10) */ if (trim(sp_get($d, 'context')) !== ''): ?>
      <br>
      <p class="txt_normal">
        <?php echo sp_speaker(sp_get($d, 'audio_context')); ?>
        <?php echo sp_text($d['context']); ?>
      </p>
    <?php endif; ?>
  </div>
  <?php return ob_get_clean();
}

/* ---------- Speaking Q1-2 : 지문 읽기 ---------- */
function sp_render_text_list($page) {
  $html = '';
  foreach (sp_get($page['data'], 'items', array()) as $i => $it) {
    $no = $page['part']['from'] + $i;
    $html .= '<h3>Question ' . $no . '.</h3>'
           . '<p class="scription">' . sp_text(sp_get($it, 'text')) . '</p><br>';
  }
  return $html;
}

/* ---------- Speaking Q3-4 : 사진 묘사 ---------- */
function sp_render_picture_list($page) {
  $html = '<span class="pic">';
  foreach (sp_get($page['data'], 'items', array()) as $i => $it) {
    $no = $page['part']['from'] + $i;
    $html .= '<h3>Question ' . $no . '.</h3>'
           . '<img src="' . sp_h(sp_img(sp_get($it, 'image'))) . '" alt="Question ' . $no . ' 사진">';
  }
  return $html . '</span>';
}

/* ---------- Speaking Q5-7 / Q8-10 / Q11 : 질문 + 음성 ---------- */
function sp_render_question_set($page) {
  $html = '';
  foreach (sp_get($page['data'], 'items', array()) as $i => $it) {
    $no = $page['part']['from'] + $i;
    $html .= '<div class="tit_m_que type_02"><span>Question ' . $no . '.</span>'
           . sp_text(sp_get($it, 'text')) . ' ' . sp_speaker(sp_get($it, 'audio')) . '</div>';
  }
  return $html;
}

/* ---------- Writing Q1-5 : 사진 + 제시어 ---------- */
function sp_render_picture_keywords($page) {
  $html = '<h3>Question.</h3>';
  foreach (sp_get($page['data'], 'items', array()) as $it) {
    $html .= '<span class="pic"><img src="' . sp_h(sp_img(sp_get($it, 'image'))) . '" alt=""><br> '
           . sp_h(sp_get($it, 'keywords')) . '</span>';
  }
  return $html;
}

/* ---------- Writing Q6-7 : 이메일 답장 ---------- */
function sp_render_email($page) {
  $html = '';
  foreach (sp_get($page['data'], 'items', array()) as $it) {
    $html .= '<h3>Question.</h3><div class="scription">'
           . '<p class="direction">Directions: Read the e-mail.</p>';
    foreach (array('from' => 'FROM', 'to' => 'TO', 'subject' => 'SUBJECT', 'sent' => 'SENT') as $k => $label) {
      $html .= '<strong class="subj">' . $label . '</strong>' . sp_h(sp_get($it, $k)) . '<br>';
    }
    $html .= '<span class="txt_in">' . sp_text(sp_get($it, 'body')) . '</span>'
           . '<p class="direction">' . sp_text(sp_get($it, 'task')) . '</p></div>'
           . '<p class="c_txt">' . sp_h($page['part']['response_time']) . '</p>';
  }
  return $html;
}

/* ---------- Writing Q8 : 에세이 ---------- */
function sp_render_essay($page) {
  $html = '';
  foreach (sp_get($page['data'], 'items', array()) as $it) {
    $html .= '<h3>Question.</h3><div class="scription">'
           . '<p class="direction">' . sp_text($page['part']['question_direction']) . '</p>'
           . '<p>' . sp_text(sp_get($it, 'text')) . '</p></div>';
  }
  return $html;
}

/* ---------- 디스패처 ---------- */
function sp_render_part($page) {
  $fn = 'sp_render_' . $page['part']['type'];
  if (!function_exists($fn)) return '<!-- 알 수 없는 유형: ' . sp_h($page['part']['type']) . ' -->';
  return sp_render_head($page)
       . '<div class="main_content">' . $fn($page) . '</div>';
}
