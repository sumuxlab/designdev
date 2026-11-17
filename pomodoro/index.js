// localStorage에 저장할 때 쓰는 키 (setting.js와 같아야 함)
const STORAGE_KEY = "pomodoro-minutes";
const DEFAULT_MINUTES = 25;

// 설정 페이지에서 저장한 시간(분)을 불러옴. 없거나 잘못된 값이면 기본값 사용
function loadMinutes() {
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(saved) && saved >= 1 && saved <= 60) {
      return saved;
    }
  } catch (e) {
    // localStorage를 쓸 수 없는 환경이면 기본값 사용
  }
  return DEFAULT_MINUTES;
}

// 집중 시간 (초)
let DEFAULT_TIME = loadMinutes() * 60;

let remainingTime = DEFAULT_TIME;
let timerId = null;

const timeEl = document.querySelector(".timer-time");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

// 남은 시간을 mm:ss 형식으로 화면에 표시
function render() {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  timeEl.textContent = `${minutes}:${seconds}`;
}

// 1초마다 남은 시간을 줄임
function tick() {
  remainingTime -= 1;
  render();

  if (remainingTime <= 0) {
    clearInterval(timerId);
    timerId = null;
    alert("집중 시간이 끝났어요!");
  }
}

// 시작
startBtn.onclick = function () {
  if (timerId !== null) return; // 이미 실행 중이면 무시
  if (remainingTime <= 0) remainingTime = DEFAULT_TIME;
  timerId = setInterval(tick, 1000);
};

// 정지
pauseBtn.onclick = function () {
  clearInterval(timerId);
  timerId = null;
};

// 초기화
resetBtn.onclick = function () {
  clearInterval(timerId);
  timerId = null;
  remainingTime = DEFAULT_TIME;
  render();
};

// 다른 탭에서 설정을 바꾼 경우에도 바로 반영 (타이머가 멈춰 있을 때만)
window.addEventListener("storage", function (event) {
  if (event.key !== STORAGE_KEY) return;
  DEFAULT_TIME = loadMinutes() * 60;
  if (timerId === null) {
    remainingTime = DEFAULT_TIME;
    render();
  }
});

render();
