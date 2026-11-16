<?php
/**
 * 사내 서버용 차수 등록 도구 — tools/round_editor.html 에 업로드 주소만 끼워 넣어 보여줌.
 * 여기서 열면 사진을 고르는 즉시 upload.php로 올라가고, JSON에 서버 주소가 자동 입력됩니다.
 */
session_start();
// if (empty($_SESSION['admin_id'])) { header('Location: /admin/login.php'); exit; }   // 관리자 체크로 교체

$html = file_get_contents(dirname(__FILE__) . '/../tools/round_editor.html');
$cfg  = '<script>window.SP_UPLOAD_URL = "upload.php";</script>';
echo preg_replace('/<script>/', $cfg . "\n<script>", $html, 1);   // 첫 <script> 앞에 설정 삽입
