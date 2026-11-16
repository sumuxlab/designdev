<?php
/** 공통 레이아웃 — <head>는 기존 샘플 페이지의 것을 그대로 옮겨 쓰면 됩니다. */
$IMG = SP_IMG_BASE;
?><!DOCTYPE html>
<html lang="en">
<head>
  <title>TOEIC® <?php echo $sec === 'wri' ? 'Writing' : 'Speaking'; ?> 공식 사이트</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Cache-Control" content="no-cache">
  <link rel="stylesheet" type="text/css" href="/_resources/css/base.css" media="all">
  <link rel="stylesheet" type="text/css" href="/_resources/css/guide.css" media="all">
  <link rel="stylesheet" type="text/css" href="/_resources/css/dev.css" media="all">
  <?php /* 기존 <head>의 나머지 meta/script는 여기에 그대로 붙여넣기 */ ?>
</head>
<body>

<?php if ($warnings): ?>
<div style="background:#fff4e5;border:1px solid #f5a623;padding:12px 16px;font-size:13px;line-height:1.6">
  <strong>[미리보기] 입력 확인 필요 <?php echo count($warnings); ?>건</strong> — 차수: <?php echo sp_h($roundId); ?>
  <ul style="margin:6px 0 0 18px;list-style:disc"><?php foreach ($warnings as $w) echo '<li>' . sp_h($w) . '</li>'; ?></ul>
</div>
<?php endif; ?>

<div id="sample_header">
  <h1 class="logo"><img src="<?php echo $IMG; ?>logo.png" alt="TOEIC Speaking & Writing"></h1>
  <p class="ctrl_win"><a href="javascript:self.close();"><img src="<?php echo $IMG; ?>btn_close.png" alt="닫기"></a></p>
  <p class="chapter"><span><?php echo sp_h($page['chapter']); ?></span></p>
</div>

<div id="sample_contents">
  <?php
  if ($page['kind'] === 'intro') {
    include dirname(__FILE__) . '/' . $page['intro'];     // 차수와 무관한 고정 안내
  } else {
    echo sp_render_part($page);
  }
  ?>
  <div class="btn_area">
    <?php if ($prevUrl): ?>
      <button class="btn btn_direction prev" type="button" onclick="location.href='<?php echo sp_h($prevUrl); ?>'"><img src="<?php echo $IMG; ?>arr_prev.png" alt="">&nbsp;&nbsp;PREV</button>
    <?php endif; ?>
    <?php if ($nextUrl): ?>
      <button class="btn btn_direction next" type="button" onclick="location.href='<?php echo sp_h($nextUrl); ?>'"><?php echo $page['kind'] === 'intro' ? 'CONTINUE' : 'NEXT'; ?>&nbsp;&nbsp;<img src="<?php echo $IMG; ?>arr_next.png" alt=""></button>
    <?php endif; ?>
  </div>
</div>

<div id="sample_footer">
  All items were created by ETS and they are protected by United States Laws, International Copyright Laws and International Treaties.<br>
  Unauthorized copying or reuse of any portion of these materials in any format is prohibited without prior permission from ETS.
</div>

<script>
/* 스피커 버튼: 기존 LCpartPlay()와 동일 동작(재생/일시정지 토글).
   전역 변수 soundD1, soundQ1… 대신 버튼의 data-audio 값을 사용 */
(function () {
  var cache = {}, current = null;
  document.addEventListener('click', function (e) {
    var btn = e.target;
    while (btn && btn !== document && !(btn.getAttribute && btn.getAttribute('data-audio'))) btn = btn.parentNode;
    if (!btn || btn === document) return;
    var url = btn.getAttribute('data-audio');
    var a = cache[url] || (cache[url] = new Audio(url));
    if (current && current !== a) { current.pause(); }
    if (a.ended) a.currentTime = 0;
    if (a.paused) { a.play(); current = a; } else { a.pause(); }
  });
})();
</script>
</body>
</html>
