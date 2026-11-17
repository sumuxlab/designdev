// localStorage에 저장할 때 쓰는 키 (index.js와 같아야 함)
const STORAGE_KEY = "pomodoro-minutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const inputEl = document.querySelector("#timer-minutes");
const submitBtn = document.querySelector(".btn-submit");

// 저장된 시간을 불러와 입력칸에 표시
function loadMinutes() {
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(saved) && saved >= MIN_MINUTES && saved <= MAX_MINUTES) {
      return saved;
    }
  } catch (e) {
    // localStorage를 쓸 수 없는 환경이면 기본값 사용
  }
  return DEFAULT_MINUTES;
}

// 입력칸이 비어 있으면 버튼 비활성화
function updateButtonState() {
  submitBtn.disabled = inputEl.value.trim() === "";
}

inputEl.value = loadMinutes();
updateButtonState();

inputEl.oninput = updateButtonState;

// 설정 완료
submitBtn.onclick = function () {
  if (inputEl.value.trim() === "") return;

  const minutes = Number(inputEl.value);

  if (!Number.isInteger(minutes) || minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    alert(`타이머 시간은 ${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하의 정수로 입력해주세요.`);
    inputEl.focus();
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, String(minutes));
  } catch (e) {
    alert("설정을 저장하지 못했어요.");
    return;
  }

  // 메인 페이지로 이동해 바뀐 시간을 바로 보여줌
  location.href = "index.html";
};
