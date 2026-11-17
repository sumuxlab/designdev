// Pull cord (YBM 스터디 조명)
// 원본 designbookmark Pull cord를 그대로 옮겼다. 스프링 값(강도, 감쇠)은 원본과 같다.
// 끈은 무게가 있는 점들의 사슬이고, 부드러운 고리로 길이를 지킨다. 잡으면 손잡이가 포인터를
// 따라오다가 끈이 팽팽해지면 고무처럼 늘어나며 전등을 당긴다. 딸깍 지점을 넘으면 스위치가
// 바뀌고, 밝은 방이 전구에서 원으로 퍼진다(끌 때는 전구로 접힌다). 바뀐 밝기는 yds 테마
// (html data-theme)에 반영하고 저장한다.
(() => {
  // ---------- 스프링 엔진 (원본 shared/motion.js에서 필요한 부분만) ----------
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const S = (x, k = 400, c = 30) => ({ x, v: 0, t: x, k, c });
  const tune = (s, k, c) => { s.k = k; s.c = reduce ? 2 * Math.sqrt(k) : c; };
  const step = (s, dt) => { const a = -s.k * (s.x - s.t) - s.c * s.v; s.v += a * dt; s.x += s.v * dt; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const timers = [];
  const after = (sec, fn) => { timers.push({ t: sec, fn }); };

  // ---------- 장면 ----------
  const $ = id => document.getElementById(id);
  const scene = $('scene'), lit = $('lit'), grab = $('grab');
  const root = document.documentElement;

  const WIRE = 122, SHADE = 66, AX = 34, AY = SHADE - 3;   // 전선 길이, 끈이 갓에서 나오는 자리
  const N = 12, SEG = 9, L = N * SEG;                      // 끈 마디 수와 길이
  const CLICK = 22, MAXS = 54;                             // 스위치가 바뀌는 늘어남, 최대 늘어남

  const PARTS = '<svg class="cord-rope" aria-hidden="true"><path/></svg><div class="cord-lamp" aria-hidden="true"><div class="cord-head"><i class="cord-bulb"></i><i class="cord-shade"></i><i class="cord-cap"></i></div></div><svg class="cord-rope" aria-hidden="true"><path/></svg><i class="cord-bead" aria-hidden="true"></i>';
  const rooms = [...scene.querySelectorAll('.cord-room')].map(r => {
    r.insertAdjacentHTML('beforeend', PARTS);
    const q = s => r.querySelector(s), paths = r.querySelectorAll('.cord-rope path');
    return { lamp: q('.cord-lamp'), wire: paths[0], head: q('.cord-head'), bulb: q('.cord-bulb'), path: paths[1], bead: q('.cord-bead') };
  });

  // 원본과 같은 스프링: 전등 각도, 당겨 내려옴, 빛 반지름, 전구 튀어오름, 대신 당기는 손, 끈 늘어남
  const TH = S(0, 46, 3), TUG = S(0, 300, 13), R = S(0, 120, 21), BP = S(1, 420, 13);
  tune(TH, 46, 3); tune(TUG, 300, 13); tune(R, 120, 21); tune(BP, 420, 13);
  const HX = S(0, 210, 22), HY = S(0, 210, 22);
  const K = S(1, 300, 17); tune(K, 300, 17);

  let on = !root.hasAttribute('data-theme') || root.getAttribute('data-theme') === 'light';
  let armed = true, held = null, ghost = false, stretch = 0, lean = 0, side = 1, W = 0, H = 0, CX = 0;
  let touched = false;   // 한 번이라도 직접 만지면 안내용 살짝 당김을 멈춘다
  if (on) { R.x = R.t = 1; }
  grab.setAttribute('aria-checked', String(on));

  const pts = [];
  const anchor = () => {
    const c = Math.cos(TH.x), s = Math.sin(TH.x), y = WIRE + TUG.x + AY;
    return [CX + AX * c - y * s, AX * s + y * c];
  };
  const bulbAt = () => {
    const c = Math.cos(TH.x), s = Math.sin(TH.x), y = WIRE + TUG.x + 63;
    return [CX - y * s, y * c];
  };
  function measure() {
    W = scene.clientWidth; H = scene.clientHeight;
    const oldCX = CX;
    CX = W * (parseFloat(getComputedStyle(root).getPropertyValue('--cord-x')) || 0.5);
    if (!pts.length) {
      const [ax, ay] = anchor();
      for (let i = 0; i <= N; i++) pts.push({ x: ax, y: ay + i * SEG, vx: 0, vy: 0 });
    } else if (oldCX !== CX) {
      pts.forEach(p => { p.x += CX - oldCX; });   // 화면 폭이 바뀌면 끈도 같이 옮긴다
    }
  }
  measure();

  function applyTheme(light) {
    if (light) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'dark');
    try { localStorage.setItem('ybm-study-theme', light ? 'light' : 'dark'); } catch (e) {}
  }

  function flip(to = !on) {
    if (to === on) return;
    on = to;
    grab.setAttribute('aria-checked', String(on));
    BP.x = on ? 1.35 : .8; TUG.v += 150;
    const now = on;
    after(.14, () => { if (now === on) applyTheme(on); });
  }

  // 손잡이를 잡고 있는 것: 실제 포인터, 또는 대신 당기는 손
  const pin = () => held ? [held.x, held.y] : ghost ? [HX.x, HY.x] : null;
  function pull(depth = 64) {     // 탭, Enter, Space 한 번 = 끝까지 한 번 당김
    if (ghost || held) return;
    const b = pts[N];
    ghost = true; armed = depth > 30; side = -side;
    HX.x = b.x; HY.x = b.y; HX.v = b.vx; HY.v = b.vy;
    const [ax, ay] = anchor();
    HX.t = ax + side * 26; HY.t = ay + L + depth;
    after(1.1, () => { ghost = false; });
  }

  const local = e => { const r = scene.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  grab.addEventListener('pointerdown', e => {
    const [x, y] = local(e), b = pts[N];
    held = { id: e.pointerId, x: b.x, y: b.y, ox: b.x - x, oy: b.y - y, moved: 0, sx: x, sy: y, flipped: false };
    ghost = false; armed = true; touched = true;
    try { grab.setPointerCapture(e.pointerId); } catch (err) {}
    grab.classList.add('is-held');
  });
  grab.addEventListener('pointermove', e => {
    if (!held || e.pointerId !== held.id) return;
    const [x, y] = local(e);
    held.x = x + held.ox; held.y = y + held.oy;
    held.moved = Math.max(held.moved, Math.hypot(x - held.sx, y - held.sy));
  });
  function drop(e) {
    if (!held || e.pointerId !== held.id) return;
    const tap = held.moved < 5 && !held.flipped && e.type === 'pointerup';
    held = null;
    grab.classList.remove('is-held');
    if (tap) pull();
  }
  grab.addEventListener('pointerup', drop);
  grab.addEventListener('pointercancel', drop);
  grab.addEventListener('click', e => { if (!e.detail) { touched = true; pull(); } });   // 키보드

  // 처음 들어왔을 때만: 끈을 살짝 당겨 "당길 수 있다"고 알려 준다. 딸깍 지점까지는 가지 않는다.
  if (!reduce) (function hint() {
    if (touched) return;
    if (!held && !ghost) pull(20);
    after(4.2, hint);
  })();

  function frame(dt) {
    [TH, TUG, R, BP, HX, HY, K].forEach(s => step(s, dt));
    if (dt <= 0) return;
    const [ax, ay] = anchor(), p = pin(), b = pts[N];

    // 잡힌 끝: 끈 길이 안에서는 자유, 넘으면 고무처럼
    let px = 0, py = 0;
    stretch = 0; lean = 0;
    if (p) {
      const dx = p[0] - ax, dy = p[1] - ay, d = Math.hypot(dx, dy) || 1;
      const over = Math.max(0, d - L), give = MAXS * (1 - Math.exp(-over / 70)), r = Math.min(d, L) + give;
      px = ax + dx / d * r; py = ay + dy / d * r;
      stretch = give; lean = over > 0 ? dx / d : 0;
      if (over > 0) { K.x = K.t = r / L; K.v = 0; }
      if (armed && give > CLICK) {
        armed = false; flip();
        if (held) held.flipped = true; else after(.12, () => { ghost = false; });
      }
    }
    if (!p || !stretch) K.t = 1;
    const seg = SEG * Math.max(1, K.x);
    TUG.t = stretch * .22;
    TH.t = clamp(-lean * stretch / MAXS * .5, -.3, .3);

    // 끈: 중력을 주고, 고리를 몇 번 원래 길이로 당긴다
    const prev = pts.map(q => [q.x, q.y]);
    for (let i = 1; i <= N; i++) {
      const q = pts[i], k = Math.exp(-(i === N ? 1.1 : 2.4) * dt);
      q.vy += 2600 * dt; q.vx *= k; q.vy *= k;
      const sp = Math.hypot(q.vx, q.vy);
      if (sp > 2600) { q.vx *= 2600 / sp; q.vy *= 2600 / sp; }
      q.x += q.vx * dt; q.y += q.vy * dt;
    }
    for (let it = 0; it < 8; it++) {
      pts[0].x = ax; pts[0].y = ay;
      if (p) { b.x = px; b.y = py; }
      for (let i = 0; i < N; i++) {
        const a = pts[i], c = pts[i + 1], dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy) || 1e-6, f = (d - seg) / d * .5;
        const wa = i === 0 ? 0 : 1, wc = i + 1 === N ? (p ? 0 : .3) : 1, sum = wa + wc || 1;   // 손잡이는 무겁다
        a.x += dx * f * wa / sum * 2; a.y += dy * f * wa / sum * 2;
        c.x -= dx * f * wc / sum * 2; c.y -= dy * f * wc / sum * 2;
      }
    }
    pts[0].x = ax; pts[0].y = ay;
    if (p) { b.x = px; b.y = py; }
    for (let i = 1; i <= N; i++) { pts[i].vx = (pts[i].x - prev[i][0]) / dt; pts[i].vy = (pts[i].y - prev[i][1]) / dt; }
    R.t = on ? 1 : 0;
    if (on) tune(R, 120, 21); else tune(R, 170, 27);   // 켤 때는 넓게, 끌 때는 조금 더 빨리
  }

  function render() {
    if (scene.clientWidth !== W || scene.clientHeight !== H) measure();
    const th = TH.x, tug = TUG.x, b = pts[N], e = pts[N - 1];
    let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < N; i++) d += `Q${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${((pts[i].x + pts[i + 1].x) / 2).toFixed(1)} ${((pts[i].y + pts[i + 1].y) / 2).toFixed(1)}`;
    d += `L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    const ang = Math.atan2(e.x - b.x, b.y - e.y);
    const wl = WIRE + tug - 4, wd = `M${CX.toFixed(1)} -4L${(CX - Math.sin(th) * wl).toFixed(2)} ${(Math.cos(th) * wl).toFixed(2)}`;
    rooms.forEach(o => {
      o.lamp.style.transform = `translateX(${CX.toFixed(1)}px) rotate(${th.toFixed(4)}rad)`;
      o.wire.setAttribute('d', wd);
      o.head.style.transform = `translateY(${(WIRE + tug).toFixed(2)}px)`;
      o.bulb.style.transform = `scale(${BP.x.toFixed(4)})`;
      o.path.setAttribute('d', d);
      o.bead.style.transform = `translate(${b.x.toFixed(2)}px,${b.y.toFixed(2)}px) rotate(${ang.toFixed(4)}rad)`;
    });
    grab.style.transform = `translate(${b.x.toFixed(2)}px,${b.y.toFixed(2)}px)`;
    // 빛: 전구에서 시작해 가장 먼 모서리를 넘을 만큼 커지는 원
    const [bx, by] = bulbAt(), far = Math.hypot(Math.max(bx, W - bx), Math.max(by, H - by)) + 24, r = Math.max(0, R.x) * far;
    lit.style.visibility = r < 4 ? 'hidden' : 'visible';
    lit.style.clipPath = `circle(${r.toFixed(1)}px at ${bx.toFixed(1)}px ${by.toFixed(1)}px)`;
  }

  // ---------- 한 개의 rAF 루프: 프레임마다 4번 나눠 계산 (원본과 같음) ----------
  let last = performance.now();
  function loop(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30); last = now;
    for (let i = timers.length - 1; i >= 0; i--) if ((timers[i].t -= dt) <= 0) timers.splice(i, 1)[0].fn();
    for (let k = 0; k < 4; k++) frame(dt / 4);
    render();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
