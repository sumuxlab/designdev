// YDS 사이트 Get Started 시안: 컴포넌트 띠 움직임과 떠 있는 버튼
(function () {
  var track = document.querySelector("[data-home-track]");
  var pause = document.querySelector("[data-home-pause]");
  if (track && pause && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // 끊김 없이 돌도록 같은 카드를 한 번 더 붙인다 (바깥 칸이 inert 라 눌리지 않는다)
    Array.prototype.slice.call(track.children).forEach(function (tile) {
      track.appendChild(tile.cloneNode(true));
    });
    track.setAttribute("data-running", "");
    pause.addEventListener("click", function () {
      var paused = track.toggleAttribute("data-paused");
      pause.setAttribute("aria-label", paused ? "움직임 다시 시작" : "움직임 멈추기");
      pause.querySelector(".ds-icon").className = "ds-icon ds-icon--" + (paused ? "play" : "pause");
    });
  }

  // 요청 글 묶음이 화면에 보이면 같은 곳으로 가는 버튼은 숨긴다
  var float = document.querySelector("[data-home-float]");
  var target = document.getElementById("ai");
  if (float && target && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      float.toggleAttribute("data-away", entries[0].isIntersecting);
    }).observe(target);
  }
})();
