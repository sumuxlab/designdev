# 외부 배포 설정 (GitHub Pages + Firebase)

외부 사람도 링크로 들어와 신청하고 승인받을 수 있게 하는 설정입니다. 처음 한 번만 하면 되고, 30분 정도 걸립니다.

- 화면: GitHub Pages (`https://sumuxlab.github.io/designdev/waong-approval/`)
- 로그인: Google 계정
- 저장: Firebase Firestore (무료 요금제 Spark로 충분)
- 권한: 명단(`config/access`)에 있는 이메일, 도메인만 신청. 승인 담당자 명단에 있는 사람만 결재

## 1. Firebase 프로젝트 만들기

1. https://console.firebase.google.com 에 회사에서 관리할 Google 계정으로 들어갑니다.
2. **프로젝트 추가**를 누르고 이름을 `waong-approval`로 적습니다.
3. Google 애널리틱스는 끄고 **프로젝트 만들기**를 누릅니다.

## 2. 웹 앱 등록하고 설정 값 넣기

1. 프로젝트 개요 화면에서 웹 아이콘(`</>`)을 누릅니다.
2. 앱 닉네임에 `waong-approval`을 적고, Firebase 호스팅은 체크하지 않은 채 **앱 등록**을 누릅니다.
3. 화면에 나온 `const firebaseConfig = { ... }`의 중괄호 부분을 복사합니다.
4. `waong-approval/firebase-config.js`를 열어 맨 아래 줄을 이렇게 바꿉니다.

```js
window.FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

이 값은 원래 브라우저에 공개되는 값이라 GitHub에 올려도 됩니다. 실제 접근은 4단계 보안 규칙이 막습니다.

## 3. Google 로그인 켜기

1. 왼쪽 메뉴 **빌드 > Authentication > 시작하기**를 누릅니다.
2. **Sign-in method** 탭에서 **Google**을 고르고 사용 설정을 켭니다. 프로젝트 지원 이메일을 고르고 **저장**합니다.
3. **설정** 탭 > **승인된 도메인** > **도메인 추가**에서 `sumuxlab.github.io`를 넣습니다. (`localhost`는 처음부터 들어 있습니다)

## 4. 데이터베이스 만들고 보안 규칙 넣기

1. 왼쪽 메뉴 **빌드 > Firestore Database > 데이터베이스 만들기**를 누릅니다.
2. 위치는 `asia-northeast3 (서울)`, 시작 모드는 **프로덕션 모드**를 고릅니다.
3. **규칙** 탭을 열고, 있던 내용을 지운 뒤 `waong-approval/firebase/firestore.rules` 내용을 그대로 붙여 넣고 **게시**를 누릅니다.

## 5. 명단 만들기

명단이 없으면 아무도 들어올 수 없습니다. 반드시 만듭니다.

1. Firestore **데이터** 탭에서 **컬렉션 시작**을 누르고 컬렉션 ID에 `config`를 적습니다.
2. 문서 ID에 `access`를 적고, 아래 필드 3개를 만듭니다. 유형은 모두 **array**, 값은 모두 **소문자**로 적습니다.

| 필드 | 넣을 값 | 예 |
| --- | --- | --- |
| `approvers` | 결재할 승인 담당자 이메일 | `sum@ybm.co.kr` |
| `allowedEmails` | 신청할 수 있는 외부 사람 이메일 | `designer@partner.com` |
| `allowedDomains` | 이 도메인 이메일은 모두 신청 가능 | `ybm.co.kr` |

비워 둘 필드도 빈 array로 꼭 만듭니다. 필드가 없으면 규칙이 오류를 내서 아무도 들어올 수 없습니다.

나중에 사람을 더하거나 뺄 때도 이 문서의 배열만 고치면 바로 반영됩니다. 승인 담당자는 신청도 할 수 있어서 `allowedEmails`에 따로 넣지 않아도 됩니다.

## 6. GitHub에 올리고 Pages 켜기

1. `firebase-config.js`를 고친 내용을 커밋하고 푸시합니다.

```bash
git add waong-approval
git commit -m "와옹이 사용 승인 외부 배포 설정"
git push
```

2. GitHub의 `sumuxlab/designdev` 저장소에서 **Settings > General** 맨 아래 **Danger Zone > Change repository visibility**를 눌러 **Public**으로 바꿉니다.
   - designdev 안의 모든 파일(1~6번 프로젝트, CLAUDE.md 포함)이 누구나 볼 수 있게 됩니다. 바꾸기 전에 비밀번호, 개인 정보, 사내 자료가 없는지 확인합니다.
3. **Settings > Pages**에서 Source를 **Deploy from a branch**, Branch를 **main**, 폴더를 **/ (root)**로 고르고 **Save**를 누릅니다.
4. 1~3분 뒤 아래 주소가 열립니다. 이 주소를 외부 사람에게 보냅니다.

```
https://sumuxlab.github.io/designdev/waong-approval/
```

## 7. 확인

1. 주소를 열고 승인 담당자 계정으로 로그인합니다. 오른쪽 위에 `승인 담당자 / 이름`이 보이면 됩니다.
2. 명단에 없는 다른 Google 계정으로 로그인하면 "사용 권한이 없어요" 화면이 나와야 합니다.
3. 외부 사람에게 링크를 보내기 전에, 그 사람 이메일을 `allowedEmails`에 넣습니다.

## 고친 뒤 다시 배포하기

`waong-approval` 안의 파일을 고치고 커밋, 푸시하면 1~3분 뒤 같은 주소에 반영됩니다. 고친 뒤에는 yds 검사를 돌립니다.

```bash
node waong-approval/dev/yds-check.mjs waong-approval/index.html
```

## 자주 생기는 문제

| 증상 | 원인과 해결 |
| --- | --- |
| 로그인 버튼을 눌러도 창이 안 뜸 | 브라우저 팝업 차단. 주소창 옆 팝업 허용 |
| "이 주소는 아직 로그인을 쓸 수 없어요" | 3단계 승인된 도메인에 `sumuxlab.github.io`가 없음 |
| 로그인했는데 "사용 권한이 없어요" | 5단계 명단에 그 이메일, 도메인이 없음. 대문자로 적었는지도 확인 |
| 승인 담당자인데 결재 칸이 안 보임 | `approvers`에 그 이메일이 소문자로 들어 있는지 확인 |
| 주소가 404 | Pages 설정 후 몇 분 기다리기. 주소 끝 `/waong-approval/` 확인 |
