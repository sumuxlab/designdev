# TOEIC Speaking & Writing 샘플테스트 차수 등록

toeicswt.co.kr 샘플테스트(`/content/TOS/sample/`)는 차수마다 페이지를 하드코딩해 왔습니다. 이 폴더는 **페이지 하나 + 차수별 JSON** 구조로 바꾸고, 디자이너가 새 차수를 입력하는 도구를 함께 담았습니다.

- 입력 도구 배포 주소: https://claude.ai/artifact/KruuCbUSKks91xG3JjFWbG (claude.ai 아티팩트)
- 디자인 시스템: 입력 도구만 yds v1.2.0 + TOEIC 브랜드(`data-ds-brand="toeic"`). 응시자가 보는 샘플테스트 화면은 지금 사이트 CSS 그대로입니다

## 폴더

| 경로 | 내용 |
| --- | --- |
| `test.php` | 샘플테스트 단일 진입점 (모든 차수, 모든 페이지) |
| `config/parts.php` | 파트 정의: 문항 번호, 제목, 준비·답변 시간, Directions. 시험 형식이 바뀔 때만 고칩니다 |
| `data/rounds/*.json` | 차수 데이터: 지문, 사진, 음성. 차수마다 파일 1개 |
| `inc/` | 차수 읽기, 화면 렌더러(기존 class 그대로), 레이아웃, 고정 안내 페이지 |
| `tools/round_editor.html` | 차수 입력 도구 (yds). JSON을 만들어 줍니다 |
| `tools/migrate_legacy.php` | 기존 하드코딩 페이지를 차수 JSON으로 바꾸는 스크립트 (1회) |
| `admin/editor.php` | 사내 서버용 입력 도구. 사진을 고르면 바로 업로드됩니다 |
| `admin/upload.php` | 사진 업로드 처리 → `uploads/<차수ID>/` |
| `uploads/` | 업로드 사진 저장 위치 (`.htaccess`로 PHP 실행 금지) |
| `dev/yds-check.mjs` | yds 규칙 검사 스크립트 |

## 주소

| 용도 | 주소 |
| --- | --- |
| 최신 차수 Speaking | `test.php?sec=spe` |
| 최신 차수 Writing | `test.php?sec=wri` |
| 특정 차수, 특정 페이지 | `test.php?r=2026_01&sec=spe&p=3` |
| 공개 전 검수 | `test.php?r=2026_02&sec=spe&preview=1` |

- `p=0` 안내 페이지, `p=1`부터 파트 순서입니다. PREV/NEXT, "Questions 3-4 of 11", 문항 번호는 자동으로 만듭니다
- `r`이 없으면 `open: true`인 차수 중 파일 이름이 가장 큰 차수(최신)를 보여 줍니다
- `preview=1`은 비공개 차수를 열고 빠진 항목을 화면 위에 표시합니다. 운영에서는 사내 IP나 관리자 로그인으로 막습니다

## 새 차수 등록 (디자이너)

1. `admin/editor.php`(또는 배포 주소)에서 이전 차수 JSON을 불러와 고칩니다
2. 사진은 칸에 끌어 놓거나 눌러서 고릅니다. 사내 서버에서는 바로 올라가고, 배포 주소에서는 "등록한 사진" 목록의 파일을 이미지 서버에 직접 올립니다
3. 음성은 지금처럼 upsisa에 올리고 파일명만 적습니다
4. JSON을 복사해 `data/rounds/<차수ID>.json`으로 올립니다 (`open: false`)
5. `preview=1`로 검수한 뒤 `open: true`로 바꾸면 최신 차수로 나옵니다

PHP 파일은 새로 만들거나 고치지 않습니다.

## 처음 옮길 때 (개발, 1회)

1. 기존 페이지 변환
   ```bash
   php tools/migrate_legacy.php <Speaking02 경로> <Speaking11 경로> 2025_01 "Sample Test"
   ```
   JSON이 만들어지고, 파트별 Directions 문구가 화면에 나옵니다
2. 나온 Directions 문구를 `config/parts.php`의 `direction`에 옮겨 넣습니다
3. `inc/intro_spe.php`, `inc/intro_wri.php`에 기존 testSpeDirection, testWriDirection 본문을 붙여 넣습니다
4. `inc/layout.php`의 `<head>`를 기존 페이지 head로 바꿉니다
5. 기존 주소를 살리려면 옛 파일을 리다이렉트로 바꿉니다
   ```php
   <?php header('Location: /content/TOS/sample/test.php?sec=spe&p=1', true, 301);  // testSpe01.php
   ```
6. `admin/upload.php`, `admin/editor.php`의 관리자 로그인 체크 주석을 사이트 체크로 바꾸고, `uploads/`에 쓰기 권한을 줍니다

## 고친 뒤 점검

```bash
node 8.toeicsw-sample/dev/yds-check.mjs 8.toeicsw-sample/tools/round_editor.html
```

오류와 주의가 0개여야 합니다. PHP는 `php -l`로 문법을 확인합니다.

## 입력 도구 다시 배포

입력 도구는 yds를 CDN 고정 주소(v1.2.0)로 불러옵니다. 아티팩트는 외부 CSS를 막아서, 배포할 때는 yds 파일(CSS, JS, TOEIC 브랜드, Pretendard 글꼴)을 함께 올립니다. Claude에게 이렇게 요청합니다.

> 8.toeicsw-sample/tools/round_editor.html 을 차수 등록 도구 아티팩트(https://claude.ai/artifact/KruuCbUSKks91xG3JjFWbG)에 다시 배포해줘. yds CDN 주소는 아티팩트에 함께 올린 yds 파일로 바꿔서.

## 기능

- 차수 메타(ID, 제목, 공개), Speaking 11문항, Writing 8문항 입력
- 사진 등록: 끌어 놓기, 형식(JPG, PNG, GIF, WEBP)과 3MB 확인, 실제 이미지인지 브라우저와 서버 양쪽에서 확인
- 실제 샘플테스트 화면 구성으로 미리보기
- 빠진 항목 목록, 파트별 상태 배지
- JSON 불러오기(이전 차수 복제), 복사, 작성 중 초안 자동 보관(브라우저)

## 아직 없는 것

- 입력 도구에서 차수 JSON을 서버에 바로 저장하는 기능: 지금은 복사해서 올립니다
- 응시자 화면(`test.php`)의 yds 전환: yds 템플릿 "모의고사 CBT"에서 시작해 전후 비교 시안부터 만듭니다
- 미리보기 영역은 yds 컴포넌트가 아니라 토큰으로 만든 서비스 요소입니다(샘플테스트 화면을 흉내 냄)
- 지문과 Directions는 자리표시자입니다. ETS 문항이라 이전 스크립트로 실제 문구를 채웁니다
