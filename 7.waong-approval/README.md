# 와옹이 사용 승인

회사 캐릭터 와옹이를 디자인에 쓸 때 메일로 주고받던 사용 허가를 한 페이지에서 신청하고 승인하는 도구입니다.

- 배포 주소: https://claude.ai/artifact/NrUsjSco1FYXzFi11K2s5f (claude.ai 아티팩트)
- 디자인 시스템: yds v1.2.0 (`yds/` 폴더에 CSS, JS, Pretendard 글꼴을 함께 넣음)

## 폴더

| 경로 | 내용 |
| --- | --- |
| `index.html` | 페이지 전체 (화면, 서비스 CSS, 스크립트) |
| `yds/` | yds 원본 파일. 고치지 않습니다. 버전을 올릴 때만 통째로 바꿉니다 |
| `dev/mock.js` | 로컬 확인용 가짜 데이터. 배포에는 넣지 않습니다 |
| `dev/yds-check.mjs` | yds 규칙 검사 스크립트 |

## 로컬에서 보기

`designdev` 폴더에서 아래를 실행하고 http://localhost:5183 을 엽니다. 예시 데이터로 동작하고, 새로 고치면 처음 상태로 돌아갑니다.

```bash
python -m http.server 5183 --directory 7.waong-approval
```

- 승인 담당자 화면: http://localhost:5183/
- 신청자 화면: http://localhost:5183/?as=requester
- 빈 화면: http://localhost:5183/?empty

## 고친 뒤 점검

```bash
node 7.waong-approval/dev/yds-check.mjs 7.waong-approval/index.html
```

오류와 주의가 0개여야 합니다.

## 배포

이 페이지는 claude.ai 아티팩트에서 동작합니다. 신청 저장, 로그인한 사람 구분, 시안 파일 올리기는 아티팩트가 제공하는 기능(`window.claude.use('db' | 'user' | 'assets')`)을 씁니다. 그래서 GitHub Pages 같은 곳에 올리면 저장과 로그인이 동작하지 않습니다.

배포는 Claude에게 이렇게 요청합니다.

> 7.waong-approval 폴더의 index.html 과 yds 폴더를 와옹이 사용 승인 아티팩트(https://claude.ai/artifact/NrUsjSco1FYXzFi11K2s5f)에 다시 배포해줘. dev 폴더는 빼고.

같은 주소로 올라가고, 등록된 신청과 결재 기록, 공유 권한은 그대로 남습니다.

## 데이터

| 위치 | 내용 | 쓰는 사람 |
| --- | --- | --- |
| `requests/<id>` | 신청서 (부서, 프로젝트, 사용처, 매체, 형태, 기간, 목적, 시안, 신청자 id) | 참여자 이상 |
| `decisions/<신청 id>` | 결재 (상태, 의견, 승인자, 결재 시각, 이력) | 편집자 이상 (아티팩트 권한 규칙) |
| `data/users/<id>/inbox` | 사람마다 알림 읽음 기록 | 본인만 |

권한: 결재하는 사람은 아티팩트 공유 메뉴에서 편집자, 신청하는 사람은 참여자로 둡니다.

## 기능

- 사용 신청 등록, 수정, 철회, 시안 링크와 파일 첨부
- 결재: 승인, 수정 요청, 반려 (수정 요청과 반려는 사유 필수). 승인하면 `WY-날짜-코드` 승인번호 발급
- 수정 요청을 받으면 고쳐서 다시 신청
- 알림: 승인 담당자는 새 신청과 재신청, 신청자는 내 신청의 결재 결과와 사용 기간 종료(7일 전, 종료 후)를 페이지 안에서 알림으로 봅니다. 읽은 기록은 사람마다 따로 남습니다
- 기간 만료: 종료일이 지난 승인 건은 `기간 만료`로 따로 모으고, 7일 안에 끝나는 건은 `종료 D-n`으로 표시합니다. 신청자는 이전 내용을 채운 채로 기간 연장 신청을 할 수 있습니다

## 아직 없는 것

- 메일, 메신저 알림: 알림은 페이지를 열었을 때만 보입니다. 메일이나 Slack으로 보내려면 커넥터 연동이 필요합니다
- yds 승인 도장은 yds 컴포넌트가 아니라 서비스 CSS로 만든 요소입니다(색은 `--ds-color-fg-critical`)
