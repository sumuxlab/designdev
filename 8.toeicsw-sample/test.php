<?php
/**
 * TOEIC Speaking & Writing 샘플 테스트 — 단일 진입점
 *
 *   test.php?sec=spe            → 공개된 최신 차수 Speaking 안내 페이지
 *   test.php?sec=wri            → 공개된 최신 차수 Writing 안내 페이지
 *   test.php?r=2026_01&sec=spe&p=3   → 특정 차수, 3번째 페이지(Q5-7)
 *   &preview=1                  → 비공개(open:false) 차수 보기 + 입력 누락 점검
 */
require dirname(__FILE__) . '/inc/sample_lib.php';
require dirname(__FILE__) . '/inc/render.php';

$config  = require SP_CONFIG;
$preview = !empty($_GET['preview']);   // 운영 시 사내 IP/관리자 세션으로 제한 권장
$sec     = (isset($_GET['sec']) && $_GET['sec'] === 'wri') ? 'wri' : 'spe';
$roundId = sp_resolve_round(isset($_GET['r']) ? $_GET['r'] : '', $preview);
$round   = sp_load_round($roundId);

if (!$round) {
  header('HTTP/1.1 404 Not Found');
  exit('등록된 샘플 테스트가 없습니다.');
}

$pages = sp_build_pages($config, $round, $sec);
$p     = isset($_GET['p']) ? max(0, min(count($pages) - 1, (int)$_GET['p'])) : 0;
$page  = $pages[$p];

$prevUrl = $p > 0 ? sp_url($roundId, $sec, $p - 1, $preview) : '';
$nextUrl = $p < count($pages) - 1 ? sp_url($roundId, $sec, $p + 1, $preview) : '';
$warnings = $preview ? sp_validate($config, $round) : array();

include dirname(__FILE__) . '/inc/layout.php';
