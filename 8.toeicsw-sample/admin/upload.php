<?php
/**
 * 차수 등록 도구의 사진 업로드 처리
 * POST round, name, file  →  {"ok":true,"url":"https://.../uploads/2026_02/VH606009.jpg"}
 *
 * 저장 위치 : sample/uploads/<차수ID>/<파일명>
 * ※ 이미지 서버(imagesisa)로 바로 올려야 한다면 아래 "저장" 부분만 FTP/API 전송으로 바꾸면 됩니다.
 */
header('Content-Type: application/json; charset=utf-8');

function out($arr, $code = 200) {
  if ($code !== 200) header('HTTP/1.1 ' . $code . ' Error');
  echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

/* 1) 권한 — 사이트 관리자 로그인 체크로 교체하세요 */
session_start();
// if (empty($_SESSION['admin_id'])) out(array('ok' => false, 'error' => '관리자 로그인이 필요합니다'), 403);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(array('ok' => false, 'error' => 'POST만 허용'), 405);

/* 2) 입력 검사 */
$round = isset($_POST['round']) ? $_POST['round'] : '';
if (!preg_match('/^[A-Za-z0-9_-]{1,40}$/', $round)) out(array('ok' => false, 'error' => '차수 ID가 올바르지 않습니다'), 400);

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK)
  out(array('ok' => false, 'error' => '파일 전송 오류'), 400);

$MAX = 3 * 1024 * 1024;
if ($_FILES['file']['size'] > $MAX) out(array('ok' => false, 'error' => '3MB 이하만 가능'), 400);

/* 확장자가 아니라 실제 이미지 내용으로 판별 */
$info = @getimagesize($_FILES['file']['tmp_name']);
$extByType = array(IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png', IMAGETYPE_GIF => 'gif');
if (defined('IMAGETYPE_WEBP')) $extByType[IMAGETYPE_WEBP] = 'webp';
if (!$info || !isset($extByType[$info[2]])) out(array('ok' => false, 'error' => '이미지 파일이 아닙니다'), 400);
$ext = $extByType[$info[2]];

/* 파일명: 영문/숫자/_/-/. 만 허용, 확장자는 실제 형식으로 맞춤 */
$name = isset($_POST['name']) ? $_POST['name'] : $_FILES['file']['name'];
$base = preg_replace('/[^A-Za-z0-9_.-]/', '_', pathinfo(basename($name), PATHINFO_FILENAME));
$base = trim($base, '._');
if ($base === '') $base = 'img_' . date('YmdHis');
$file = $base . '.' . $ext;

/* 3) 저장 */
$dir = dirname(__FILE__) . '/../uploads/' . $round;
if (!is_dir($dir) && !mkdir($dir, 0755, true)) out(array('ok' => false, 'error' => '폴더 생성 실패'), 500);
$dest = $dir . '/' . $file;
if (!move_uploaded_file($_FILES['file']['tmp_name'], $dest)) out(array('ok' => false, 'error' => '저장 실패'), 500);

/* 4) 공개 URL 반환 — 차수 JSON에는 이 전체 주소가 저장됨 */
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$webDir = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/');
out(array('ok' => true, 'url' => $scheme . '://' . $_SERVER['HTTP_HOST'] . $webDir . '/uploads/' . rawurlencode($round) . '/' . rawurlencode($file)));
