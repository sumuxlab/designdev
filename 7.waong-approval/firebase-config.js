/* Firebase 웹 앱 설정
   SETUP.md 2단계에서 Firebase 콘솔이 보여 주는 firebaseConfig 값을 아래 null 자리에 붙여 넣습니다.
   이 값은 브라우저에 공개되는 값이라 GitHub에 올려도 됩니다. 접근은 firebase/firestore.rules 가 막습니다.
   null 로 두면 Firebase를 쓰지 않습니다(로컬에서는 dev/mock.js 예시 데이터로 동작).

   붙여 넣은 모양 예:
   window.FIREBASE_CONFIG = {
     apiKey: "AIza...",
     authDomain: "waong-approval.firebaseapp.com",
     projectId: "waong-approval",
     storageBucket: "waong-approval.firebasestorage.app",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
*/
window.FIREBASE_CONFIG = null;
