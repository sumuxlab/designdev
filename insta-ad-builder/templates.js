/* 교원연수 인스타그램 광고 템플릿.
   좌표, 글자 크기, 색은 피그마 "[교원연수] 인스타그램 카드뉴스 > 유형별 카드뉴스" 값이다.
   광고 이미지 안의 색이므로 YDS 토큰이 아니라 가이드 값을 쓴다. */
(function () {
  const A = "A2Z", P = "AdPretendard", POP = "AdPoppins", J = "Jalnan", M = "Maplestory", K = "KyoboHand";
  const INK = "#262626", BLUE = "#2563eb", FEED = [1080, 1350], STORY = [1080, 1920];

  const LOGO = ["M108.105 13.6435C109.174 13.5823 110.304 13.4751 111.343 13.3526L111.603 15.4658C109.388 15.7874 106.669 15.9252 104.652 15.9252H102.56L102.438 13.7661H104.897C105.157 13.7661 105.432 13.766 105.722 13.7507V12.1123C104.057 11.7448 102.85 10.4892 102.85 8.25354V8.05448C102.85 5.31354 104.622 4.0579 106.837 4.0579C109.052 4.0579 110.824 5.31354 110.824 8.05448V8.25354C110.824 10.4279 109.693 11.6682 108.105 12.0817V13.6435ZM105.233 8.22292C105.233 9.52448 105.981 10.0757 106.837 10.0757C107.692 10.0757 108.441 9.52448 108.441 8.22292V8.05448C108.441 6.75292 107.692 6.20167 106.837 6.20167C105.981 6.20167 105.233 6.75292 105.233 8.05448V8.22292ZM116.384 8.65165V10.8261H114.612V17.9005H112.214V3.53729H114.612V8.66698H116.384V8.65165Z",
"M117.088 11.1935V8.97323C117.088 5.40542 118.906 4.0579 121.121 4.0579C123.336 4.0579 125.138 5.40542 125.138 8.97323V11.1935C125.138 14.7614 123.32 16.1089 121.121 16.1089C118.921 16.1089 117.088 14.7614 117.088 11.1935ZM122.755 11.1935V8.97323C122.755 6.82948 121.976 6.21698 121.121 6.21698C120.265 6.21698 119.471 6.82948 119.471 8.97323V11.1935C119.471 13.3373 120.265 13.9498 121.121 13.9498C121.976 13.9498 122.755 13.3373 122.755 11.1935ZM126.91 17.9005V3.53729H129.293V17.9005H126.91Z",
"M136.503 7.87072V4.27227H138.856V15.6647H131.264V4.27227H133.616V7.87072H136.503ZM133.616 13.521H136.503V9.99915H133.616V13.521ZM140.933 3.52197H143.316V17.885H140.933V3.52197Z",
"M151.228 8.39133C150.908 10.1063 149.701 10.9638 148.112 10.9638C146.249 10.9638 144.904 9.78477 144.904 7.41133V7.25822C144.904 4.85416 146.249 3.67508 148.112 3.67508C149.701 3.67508 150.923 4.5326 151.244 6.29354H152.344V3.65979H154.513V11.2548H152.344V8.39133H151.228ZM147.073 7.38072C147.073 8.37603 147.547 8.89664 148.112 8.89664C148.677 8.89664 149.151 8.37603 149.151 7.38072V7.25822C149.151 6.26291 148.677 5.74229 148.112 5.74229C147.547 5.74229 147.073 6.26291 147.073 7.25822V7.38072ZM147.486 17.9003V11.9285H157.644V17.9003H147.486ZM149.869 14.0263V15.7719H155.246V14.0263H149.869ZM155.399 3.52197H157.644V11.2548H155.399V3.52197Z",
"M115.331 42.1247H123.824V45.7078H101.445V42.1247H105.875V33.9172H109.557V42.1247H111.649V33.9172H115.331V42.1247ZM116.538 38.5416C117.088 35.0044 117.5 30.9619 117.515 28.6956H103.538V25.1125H121.472V27.2869C121.472 30.87 121.074 35.1728 120.418 39.1387L116.538 38.5569V38.5416Z",
"M128.666 37.4391H124.985L124.832 34.3613H129.063C131.935 34.3613 136.273 34.1009 140.047 33.6722L140.428 36.7041C138.381 36.9797 136.121 37.1634 133.906 37.2859C133.86 38.3272 133.784 39.5063 133.646 40.7006L129.919 40.4403C129.995 39.3991 130.072 38.3884 130.117 37.4084C129.613 37.4391 129.14 37.4391 128.651 37.4391H128.666ZM125.611 28.6038V28.3741C125.611 25.2963 128.452 23.7497 132.317 23.7497C136.182 23.7497 138.992 25.2963 138.992 28.3741V28.6038C138.992 31.6356 136.151 33.1822 132.317 33.1822C128.483 33.1822 125.611 31.6356 125.611 28.6038ZM132.561 43.6559H146.096V47.2238H128.636V41.3131H132.561V43.6559ZM129.293 28.5578C129.293 29.6144 130.576 30.0738 132.317 30.0738C134.058 30.0738 135.311 29.6144 135.311 28.5578V28.4047C135.311 27.3481 134.028 26.8581 132.317 26.8581C130.606 26.8581 129.293 27.3328 129.293 28.4047V28.5578ZM136.014 38.0056H141.437V23.5047H145.362V42.1706H141.437V40.8538H136.014V38.0056Z",
"M160.637 34.6981C159.507 36.6888 157.384 37.6228 154.97 37.6228C151.289 37.6228 148.371 35.4944 148.371 30.9313V30.625C148.371 25.97 151.289 23.8875 154.97 23.8875C157.185 23.8875 159.125 24.6684 160.317 26.3069H164.578V23.5047H168.504V40.8384H164.578V34.6981H160.653H160.637ZM155.948 43.6713H169.253V47.2391H152.022V39.3531H155.948V43.6713ZM152.297 30.8853C152.297 33.2128 153.55 34.1928 154.97 34.1928C156.391 34.1928 157.598 33.2128 157.598 30.8853V30.625C157.598 28.2975 156.33 27.3175 154.97 27.3175C153.611 27.3175 152.297 28.2975 152.297 30.625V30.8853ZM164.563 29.4H161.432C161.478 29.7828 161.508 30.2116 161.508 30.6403V30.9466C161.508 31.1763 161.508 31.4059 161.478 31.6356H164.548V29.4153L164.563 29.4Z",
"M193.221 37.6992V41.267H183.994V47.4839H180.068V41.267H170.842V37.6992H193.221ZM181.428 31.2373C179.732 32.9217 177.166 34.3917 173.515 35.6626L171.957 32.2326C178.25 29.9051 180.19 27.4398 180.19 24.9592V23.6423H184.116V24.9592C184.116 26.0158 183.933 27.057 183.566 28.037L192.105 32.3092L190.272 35.6626L181.428 31.2373Z",
"M73.9799 9.41717V47.3769H64.9062V1.71498C64.9062 1.37811 65.4409 1.22499 65.7159 1.48531L73.9799 9.4325V9.41717Z",
"M0.412109 15.5422V1.33218H9.48581V23.2444C9.48581 23.5813 8.95112 23.7344 8.67616 23.4741L0.412109 15.5269V15.5422Z",
"M22.3941 39.2919V1.3475H13.3203V47.0094C13.3203 47.3463 13.855 47.4994 14.13 47.2391L22.3941 39.2919Z",
"M35.2866 1.3475H26.2129V47.3769H35.2866V1.3475Z",
"M39.9151 1.46999C39.6401 1.20967 39.1055 1.36279 39.1055 1.69966V23.2444C39.1055 23.5813 39.6401 23.7344 39.9151 23.4741L48.1792 15.5269V9.41715L39.9151 1.46999Z",
"M39.9151 25.235C39.6401 24.9747 39.1055 25.1278 39.1055 25.4647V47.0094C39.1055 47.3463 39.6401 47.4994 39.9151 47.2391L48.1792 39.2919V33.1822L39.9151 25.235Z",
"M61.0874 9.41717V47.3769H52.0137V1.71498C52.0137 1.37811 52.5483 1.22499 52.8233 1.48531L61.0874 9.4325V9.41717Z",
"M86.8882 9.41717V47.3769H77.8145V1.71498C77.8145 1.37811 78.3491 1.22499 78.6241 1.48531L86.8882 9.4325V9.41717Z"].map(d => new Path2D(d));
  const LOGO_COLOR = ["#7d7d7d","#7d7d7d","#7d7d7d","#7d7d7d","#e83844","#e83844","#e83844","#e83844","#0055a7","#e83844","#e83844","#e83844","#e83844","#e83844","#0055a7","#0055a7"];

  /* ---- 그리기 도구 ---- */
  function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
  function fillR(c, x, y, w, h, r, fill) { rr(c, x, y, w, h, r); c.fillStyle = fill; c.fill(); }
  function strokeR(c, x, y, w, h, r, color, sw) { rr(c, x + sw / 2, y + sw / 2, w - sw, h - sw, Math.max(0, r - sw / 2)); c.strokeStyle = color; c.lineWidth = sw; c.stroke(); }
  function setFont(c, weight, size, family) { c.font = size + 'px "' + family + "-" + weight + '"'; if ("letterSpacing" in c) c.letterSpacing = (-0.03 * size).toFixed(2) + "px"; }

  function logo(c, x, y, w, color, alpha) {
    const s = w / 194;
    c.save(); c.translate(x, y); c.scale(s, s); if (alpha) c.globalAlpha = alpha;
    LOGO.forEach((p, i) => { c.fillStyle = color || LOGO_COLOR[i]; c.fill(p); });
    c.restore();
  }

  /* 피그마 gradientTransform 첫 줄(a, b, e) 그대로 캔버스 그라디언트를 만든다 */
  function figGrad(c, W, H, row, stops) {
    const a = row[0] / W, b = row[1] / H, d = a * a + b * b, e = row[2];
    const x0 = -e * a / d, y0 = -e * b / d;
    const g = c.createLinearGradient(x0, y0, x0 + a / d, y0 + b / d);
    stops.forEach(s => g.addColorStop(s[1], s[0]));
    return g;
  }
  function bg(c, W, H, row, stops) { c.fillStyle = figGrad(c, W, H, row, stops); c.fillRect(0, 0, W, H); }

  /* **강조** 표시를 읽어 줄을 나눈다. 띄어쓰기에서만 줄을 바꾼다 */
  function wrap(c, text, o, size) {
    const lines = [];
    const fontOf = em => setFont(c, em && o.emWeight || o.weight, size, o.family);
    String(text || "").split("\n").forEach(par => {
      let line = [], lineW = 0;
      par.split(/(\*\*[^*]+\*\*)/).filter(Boolean).forEach(part => {
        const em = /^\*\*/.test(part), t = em ? part.slice(2, -2) : part;
        fontOf(em);
        t.split(/(\s+)/).filter(Boolean).forEach(word => {
          const w = c.measureText(word).width, sp = /^\s+$/.test(word);
          if (o.w && lineW + w > o.w && line.length && !sp) { lines.push(line); line = []; lineW = 0; }
          if (sp && !line.length) return;
          line.push({ t: word, em, w }); lineW += w;
        });
      });
      lines.push(line);
    });
    return lines;
  }

  /* 글자가 칸을 넘치면 크기를 줄여 맞추고, 쓴 높이를 돌려준다 */
  function text(c, str, o) {
    const lh = o.lh || 1.2, minSize = o.minSize || o.size * 0.4;
    let size = o.size, lines = wrap(c, str, o, size);
    while (size > minSize && ((o.maxLines && lines.length > o.maxLines) || (o.h && lines.length * size * lh > o.h))) {
      size -= 2; lines = wrap(c, str, o, size);
    }
    if (o.maxLines && lines.length > o.maxLines) lines = lines.slice(0, o.maxLines);
    c.save(); c.textBaseline = "alphabetic";
    if (o.shadow) { c.shadowColor = o.shadow[0]; c.shadowOffsetY = o.shadow[1]; c.shadowBlur = o.shadow[2]; }
    lines.forEach((line, i) => {
      const total = line.reduce((s, r) => s + r.w, 0);
      let x = o.align === "center" ? o.x + ((o.w || 0) - total) / 2 : o.align === "right" ? o.x + (o.w || 0) - total : o.x;
      const y = o.y + i * size * lh + size * lh / 2 + size * 0.36;
      line.forEach(r => {
        setFont(c, r.em && o.emWeight || o.weight, size, o.family);
        c.fillStyle = r.em && o.emColor || o.color; c.fillText(r.t, x, y); x += r.w;
      });
    });
    c.restore();
    return { h: lines.length * size * lh, size };
  }

  function chevron(c, x, y, s, color) {
    c.save(); c.strokeStyle = color; c.lineWidth = s * 0.16; c.lineCap = "round"; c.lineJoin = "round";
    c.beginPath(); c.moveTo(x + s * 0.34, y + s * 0.14); c.lineTo(x + s * 0.68, y + s * 0.5); c.lineTo(x + s * 0.34, y + s * 0.86); c.stroke(); c.restore();
  }
  function star(c, x, y, s) {
    c.beginPath();
    for (let i = 0; i < 10; i++) { const r = i % 2 ? s * 0.24 : s * 0.5, t = -Math.PI / 2 + i * Math.PI / 5; c[i ? "lineTo" : "moveTo"](x + s / 2 + r * Math.cos(t), y + s / 2 + r * Math.sin(t)); }
    c.closePath(); c.fillStyle = "#ffcd00"; c.fill();
  }
  function pill(c, str, cx, y, o) {
    setFont(c, o.weight, o.size, o.family);
    const w = c.measureText(str).width + o.px * 2, x = cx === null ? o.x : cx - w / 2;
    if (o.fill) fillR(c, x, y, w, o.h, o.r, o.fill);
    if (o.stroke) strokeR(c, x, y, w, o.h, o.r, o.stroke, 2);
    text(c, str, { x, y: y + (o.h - o.size * 1.2) / 2, w, size: o.size, weight: o.weight, family: o.family, color: o.color, align: "center" });
  }
  function button(c, x, y, w, h, r, fill, str, opts) {
    fillR(c, x, y, w, h, r, fill);
    setFont(c, opts.weight, 50, A);
    const plain = String(str).replace(/\*\*/g, ""), tw = Math.min(c.measureText(plain).width, w - 160), gap = 20;
    const left = x + (w - tw - gap - 52) / 2;
    text(c, str, { x: left, y: y + 26, w: tw + 4, size: 50, weight: opts.weight, family: A, color: "#ffffff", emColor: opts.em, maxLines: 1 });
    chevron(c, left + tw + gap, y + 30, 52, "#ffffff");
  }
  function bubble(c, x, y, str, flip) {
    c.fillStyle = "rgba(255,255,255,.9)";
    c.beginPath(); c.ellipse(x + 205, y + 118, 205, 118, 0, 0, Math.PI * 2); c.fill();
    const a = flip ? [89, -68, 38] : [321, 214, 0], b = flip ? [38, -40, 0] : [372, 240, 0];
    c.beginPath(); c.ellipse(x + (flip ? 117 : 321), y + (flip ? -8 : 210), 28, 24, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(x + (flip ? 51 : 382), y + (flip ? -34 : 241), 13, 12, 0, 0, Math.PI * 2); c.fill();
    text(c, str, { x: x + 40, y: y + 68, w: 330, size: 42, weight: 400, family: K, color: "#333333", align: "center", lh: 1.2, maxLines: 2 });
  }
  function coupon(c, amount, tone, dy) {
    c.save(); c.translate(0, dy);
    /* 뒤 쿠폰 */
    c.save(); c.translate(495, 725); c.rotate(-0.09);
    const g = c.createLinearGradient(-280, 0, 280, 0); g.addColorStop(0, tone.back[0]); g.addColorStop(1, tone.back[1]);
    fillR(c, -280, -105, 560, 210, 24, g);
    setFont(c, 600, 34.6, POP); c.fillStyle = "rgba(255,255,255,.35)"; c.textBaseline = "alphabetic"; c.fillText("COUPON", -40, -50);
    c.restore();
    /* 앞 쿠폰 */
    c.save(); c.translate(588, 858); c.rotate(0.07);
    c.shadowColor = tone.shadow || "rgba(20,60,140,.28)"; c.shadowOffsetY = 18; c.shadowBlur = 40;
    c.beginPath(); c.roundRect(-262, -146, 524, 292, 24); c.fillStyle = "#f7fbff"; c.fill();
    c.shadowColor = "transparent"; c.fillStyle = tone.notch;
    c.restore();
    c.save(); c.translate(588, 858); c.rotate(0.07);
    setFont(c, 600, 34.6, POP); c.fillStyle = tone.bar; c.textBaseline = "alphabetic"; c.fillText("COUPON", -214, -82);
    text(c, amount, { x: -214, y: -66, w: 440, size: 103, weight: 700, family: POP, color: tone.bar, maxLines: 1, lh: 1.2 });
    setFont(c, 500, 26, A);
    if ("letterSpacing" in c) c.letterSpacing = "14px";
    c.textAlign = "center"; c.fillStyle = tone.bar; c.fillText("YBM교원연수", 0, 112);
    if ("letterSpacing" in c) c.letterSpacing = "0px";
    c.restore();
    c.restore();
  }
  function qaBubbles(c) {
    fillR(c, 400, 545, 190, 150, 40, "#60a5fa");
    c.beginPath(); c.moveTo(430, 680); c.lineTo(420, 735); c.lineTo(490, 690); c.closePath(); c.fillStyle = "#60a5fa"; c.fill();
    text(c, "Q", { x: 400, y: 572, w: 190, size: 84, weight: 700, family: POP, color: "#ffffff", align: "center", lh: 1.2 });
    fillR(c, 500, 625, 190, 150, 40, "#fbbf24");
    c.beginPath(); c.moveTo(660, 760); c.lineTo(672, 815); c.lineTo(600, 770); c.closePath(); c.fillStyle = "#fbbf24"; c.fill();
    text(c, "A", { x: 500, y: 652, w: 190, size: 84, weight: 700, family: POP, color: "#ffffff", align: "center", lh: 1.2 });
  }
  function reviewBg(c, W, H) {
    c.fillStyle = "#ffffff"; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, H * 0.75);
    g.addColorStop(0, "rgba(121,175,255,.5)"); g.addColorStop(.61, "rgba(169,204,255,.5)"); g.addColorStop(1, "rgba(186,214,255,.5)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
  }
  const QA_BG = [[ "#f3f9ff", .6 ], [ "#cfe8ff", .9 ]], INFO_BG = [[ "#fbfbfb", .47 ], [ "#def4ff", 1 ]];
  const RANK_ROW = [-.47, .69, .35], RANK_BG = [[ "#0a1d27", .13 ], [ "#2e627c", .57 ], [ "#53a6b6", 1 ]], DOWN = [0, 1, 0];
  function card(c, x, y, w, h, r) {
    c.save(); c.shadowColor = "rgba(0,0,0,.1)"; c.shadowBlur = 8; fillR(c, x, y, w, h, r, "#ffffff"); c.restore();
  }
  const labelPill = (c, str, cx, x) => pill(c, str, cx, 89, { x, h: 94, px: 30, r: 47, stroke: INK, size: 44.2, weight: 600, family: A, color: INK });

  /* ---- 색 하나로 광고 색 묶음 만들기 ---- */
  function toHsl(hex) {
    const n = parseInt(hex.slice(1), 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
    if (!d) return [0, 0, l];
    const h = max === r ? ((g - b) / d + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, d / (1 - Math.abs(2 * l - 1)), l];
  }
  function toHex(h, s, l) {
    h = (h + 360) % 360; s = Math.min(1, s); l = Math.max(0, Math.min(1, l));
    const a = s * Math.min(l, 1 - l);
    const f = n => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, "0"); };
    return "#" + f(0) + f(8) + f(4);
  }
  function lum(hex) {
    const n = parseInt(hex.slice(1), 16);
    const ch = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); };
    return .2126 * ch(n >> 16 & 255) + .7152 * ch(n >> 8 & 255) + .0722 * ch(n & 255);
  }
  const onWhite = hex => 1.05 / (lum(hex) + .05);
  /* 흰 글자와의 대비가 target 이상이 될 때까지 어둡게 */
  function deepen(h, s, l, target) {
    let hex = toHex(h, s, l);
    while (onWhite(hex) < target && l > .05) { l -= .01; hex = toHex(h, s, l); }
    return hex;
  }
  function makeTone(base, name) {
    const [h, s, l] = toHsl(base);
    const dir = h >= 330 || h < 70 ? 1 : -1, near = h + 12 * dir, far = h + 35 * dir; /* 빨강~노랑은 밝은 쪽, 나머지는 파랑·청록 쪽으로 번진다 */
    const shadow = "hsla(" + Math.round(h) + "," + Math.round(Math.min(s, .75) * 100) + "%,25%,.28)";
    if (onWhite(base) < 2) { /* 밝은 색은 어두운 글자를 얹는다 */
      const bar = deepen(h, s, .42, 4.5);
      return { name, row: TONE_ROW, stops: [[base, 0], [toHex(near, s, Math.max(l, .72)), .5], [toHex(far, s, .9), 1]], bar, em: deepen(h, s, .36, 6.5), barEm: toHex(h, 1, .78), back: [toHex(h, s, .5), bar], fg: INK, shadow };
    }
    const top = deepen(h, s, Math.min(l, .55), 3.4), bar = deepen(h, s, Math.min(l, .5), 4.5), em = toHex(far, Math.min(1, s + .1), .86);
    return { name, row: TONE_ROW, stops: [[top, 0], [deepen(near, s, .62, 3), .5], [toHex(far, s * .9, .8), 1]], bar, em, barEm: em, back: [top, bar], shadow };
  }
  const TONE_ROW = [-.36, .78, .37];

  /* ---- 템플릿 ---- */
  const TONES = {
    blue: { name: "블루", row: [-.36, .78, .37], stops: [["#1a75ff", 0], ["#64bff8", .5], ["#9ffaef", 1]], bar: BLUE, em: "#89fff5", barEm: "#ffffff", back: ["#2f8dff", "#1a6cf0"], notch: "#64bff8" },
    green: { name: "그린", row: [-.36, .78, .37], stops: [["#8cf57e", 0], ["#c8ea91", .5], ["#e0f6bc", 1]], bar: "#0a6c13", em: "#319037", barEm: "#faf502", back: ["#3fb24c", "#2b8f39"], notch: "#c8ea91" },
    navy: makeTone("#1e3a8a", "네이비"),
    sky: makeTone("#0284c7", "스카이"),
    teal: makeTone("#0f766e", "틸"),
    purple: makeTone("#7c3aed", "퍼플"),
    pink: makeTone("#db2777", "핑크"),
    red: makeTone("#dc2626", "레드"),
    coral: makeTone("#e8604c", "코랄"),
    orange: makeTone("#ea580c", "오렌지"),
    yellow: makeTone("#facc15", "옐로"),
    charcoal: makeTone("#334155", "차콜")
  };
  window.AD_MAKE_TONE = makeTone;

  window.AD_GROUPS = [
    { id: "ad", name: "광고형" }, { id: "review", name: "후기형" }, { id: "qa", name: "Q&A형" }, { id: "info", name: "정보형" }, { id: "rank", name: "랭킹형" }
  ];

  window.AD_TEMPLATES = [
    { id: "ad-coupon", group: "ad", name: "쿠폰 혜택", desc: "금액이 들어간 쿠폰과 하단 버튼 띠", sizes: [FEED, STORY],
      tones: TONES, defaultTone: "blue",
      fields: [
        { key: "line1", label: "윗줄", value: "선생님, 2학기 준비 전", max: 18 },
        { key: "line2", label: "강조 문구", value: "시원한 웰컴 선물", max: 12 },
        { key: "line3", label: "아랫줄", value: "챙기세요!", max: 14 },
        { key: "amount", label: "쿠폰 금액", value: "20,000", max: 7 },
        { key: "cta", label: "버튼 문구", value: "디저트 + **2만 원 쿠폰** 받기", max: 22, rich: true },
        { key: "deco1", label: "꾸밈 이미지 (오른쪽 아래)", type: "image", optional: true },
        { key: "deco2", label: "꾸밈 이미지 (왼쪽 아래)", type: "image", optional: true }
      ],
      draw(c, v, W, H, S) {
        const t = S.tone, dy = H === 1920 ? 267 : 0;
        bg(c, W, H, t.row, t.stops);
        logo(c, 836, H === 1920 ? 336 : 69, 194, t.fg || "#ffffff");
        const tw = { x: 117, w: 847, align: "center", family: A, color: t.fg || "#ffffff", shadow: t.fg ? null : ["rgba(0,0,0,.2)", 5, 15], maxLines: 1 };
        text(c, v.line1, { ...tw, y: 179 + dy, size: 70, weight: 500 });
        text(c, v.line2, { ...tw, y: 263 + dy, size: 120, weight: 700, color: t.em });
        text(c, v.line3, { ...tw, y: 407 + dy, size: 90, weight: 500 });
        coupon(c, v.amount, t, dy);
        S.image(c, "deco1", 716, 871 + dy, 316, 266, { fit: "contain" });
        S.image(c, "deco2", 75, 968 + dy, 198, 180, { fit: "contain" });
        if (H === 1920) button(c, 140, 1473, 800, 112, 80, t.bar, v.cta, { weight: 700, em: t.barEm });
        else button(c, 0, 1238, 1080, 112, 0, t.bar, v.cta, { weight: 700, em: t.barEm });
      } },
    { id: "ad-event", group: "ad", name: "이벤트 안내", desc: "바다 그라디언트, 큰 제목, 라운드 버튼", sizes: [FEED, STORY],
      fields: [
        { key: "desc", label: "윗줄 설명", value: "배라 · 요아정 · 설빙 얼음 깨고 받아가세요!", max: 26 },
        { key: "title", label: "제목", type: "area", value: "신규가입만 해도\n100% 당첨!", help: "두 줄까지 들어가요.", max: 24 },
        { key: "hero", label: "메인 이미지", type: "image", help: "배경이 투명한 PNG가 가장 잘 어울려요." },
        { key: "cta", label: "버튼 문구", value: "지금 선물 받기", max: 14 }
      ],
      draw(c, v, W, H, S) {
        const tall = H === 1920;
        bg(c, W, H, DOWN, [["#6dd8fc", 0], ["#49d5fb", .12], ["#00adff", .24], ["#76deff", .46], ["#7de0ff", .63], ["#03a7e5", .63], ["#8debf2", .77], ["#f1e7cc", .82], ["#edd59f", .9], ["#e0c995", .99]]);
        logo(c, 836, tall ? 338 : 69, 194, "#ffffff");
        const y = tall ? 469 : 209;
        text(c, v.desc, { x: 151, y, w: 778, size: 48, weight: 300, family: M, color: "#ffffff", align: "center", maxLines: 1 });
        text(c, v.title, { x: 151, y: y + 82, w: 778, size: 110, weight: 400, family: J, color: "#ffffff", align: "center", shadow: ["rgba(0,0,0,.2)", 5, 15], maxLines: 2 });
        S.image(c, "hero", 0, tall ? 849 : 580, 1080, tall ? 600 : 520, { fit: "contain" });
        button(c, 180, tall ? 1473 : 1121, 721, 112, tall ? 80 : 20, BLUE, v.cta, { weight: 600 });
      } },
    { id: "review-cover", group: "review", name: "후기 표지", desc: "라벨, 제목, 원형 사진, 별점", sizes: [FEED],
      fields: [
        { key: "label", label: "라벨", value: "REAL REVIEW", max: 14 },
        { key: "title", label: "제목", type: "area", value: "원어민 앞에만 서면\n머리가 하얘졌어요.😥", max: 30 },
        { key: "photo", label: "인물 사진", type: "image" },
        { key: "review", label: "한 줄 후기", value: "영어는 평생 숙제였던 선생님, 전화영어로 자신감을 찾다", max: 34 }
      ],
      draw(c, v, W, H, S) {
        reviewBg(c, W, H);
        labelPill(c, v.label, null, 70);
        text(c, v.title, { x: 70, y: 203, w: 940, size: 94, weight: 700, family: A, color: INK, lh: 1.3, maxLines: 2 });
        c.beginPath(); c.arc(540, 817, 322, 0, Math.PI * 2); c.fillStyle = "#ffffff"; c.fill();
        S.image(c, "photo", 218, 495, 644, 644, { circle: true });
        c.beginPath(); c.arc(540, 817, 314, 0, Math.PI * 2); c.strokeStyle = "#cde1ff"; c.lineWidth = 16; c.stroke();
        const g = c.createLinearGradient(0, 1350, 0, 1010); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(.5, "rgba(149,167,242,.3)"); g.addColorStop(1, "rgba(148,191,255,.7)");
        c.fillStyle = g; c.fillRect(0, 1010, W, 340);
        for (let i = 0; i < 5; i++) star(c, 395 + i * 60, 1060, 50);
        text(c, v.review, { x: 64, y: 1142, w: 952, size: 40, weight: 600, family: A, color: INK, align: "center", lh: 1.35, maxLines: 1 });
        logo(c, 397, 1219, 274);
      } },
    { id: "review-body", group: "review", name: "후기 본문", desc: "인용문, 큰 사진, 말풍선 두 개", sizes: [FEED],
      fields: [
        { key: "quote", label: "인용문", type: "area", value: "＂영어 교사는 아니지만\n왜 영어는 평생 숙제 같을까요?＂", max: 44 },
        { key: "photo", label: "장면 이미지", type: "image" },
        { key: "bubble1", label: "말풍선 1 (왼쪽 위)", type: "area", value: "영어 공부한 지 3년...\n짧은 문장은 되는데...", max: 26 },
        { key: "bubble2", label: "말풍선 2 (오른쪽 아래)", type: "area", value: "원어민을 만나면\n머리가 하얘지기 일쑤", max: 26 },
        { key: "note", label: "하단 고지", value: "본 콘텐츠의 이미지는 AI를 활용해 제작되었습니다.", max: 40 }
      ],
      draw(c, v, W, H, S) {
        reviewBg(c, W, H);
        text(c, v.quote, { x: 80, y: 90, w: 920, size: 50, weight: 700, family: A, color: "#2e35b5", align: "center", lh: 1.35, maxLines: 2 });
        S.image(c, "photo", 80, 286, 920, 877, { r: 16 });
        strokeR(c, 80, 286, 920, 877, 16, "#9fc6ff", 20);
        bubble(c, 47, 254, v.bubble1, false);
        bubble(c, 610, 928, v.bubble2, true);
        text(c, v.note, { x: 80, y: 1278, w: 760, size: 20, weight: 500, family: A, color: "rgba(0,0,0,.5)", lh: 1.5, maxLines: 1 });
        logo(c, 841, 1260, 160);
      } },
    { id: "qa-cover", group: "qa", name: "Q&A 표지", desc: "자주 묻는 질문 첫 장", sizes: [FEED],
      fields: [
        { key: "label", label: "라벨", value: "연수 Q&A", max: 10 },
        { key: "title", label: "제목", value: "자주 묻는 질문", max: 10 },
        { key: "sub", label: "주제", value: "연수유형 편", max: 12 },
        { key: "question", label: "질문", type: "area", value: "직무연수와 자율연수의\n차이가 뭔가요?", max: 30 },
        { key: "prompt", label: "넘김 안내", value: "넘겨서 답변 확인하기", max: 16 }
      ],
      draw(c, v, W, H) {
        bg(c, W, H, DOWN, QA_BG);
        labelPill(c, v.label, 540);
        text(c, v.title, { x: 70, y: 243, w: 940, size: 94, weight: 700, family: A, color: INK, align: "center", lh: 1.3, maxLines: 1 });
        pill(c, v.sub, 540, 405, { h: 88, px: 40, r: 10, fill: "#dbeafe", size: 40, weight: 600, family: A, color: BLUE });
        card(c, 70, 651, 940, 512, 30);
        qaBubbles(c);
        text(c, v.question, { x: 110, y: 816, w: 860, size: 54, weight: 500, family: A, color: INK, align: "center", lh: 1.3, maxLines: 2 });
        fillR(c, 110, 1006, 860, 122, 15, "#e5e7eb");
        text(c, v.prompt, { x: 110, y: 1043, w: 860, size: 40, weight: 500, family: A, color: "#737373", align: "center", maxLines: 1 });
        logo(c, 397, 1219, 274);
      } },
    { id: "qa-answer", group: "qa", name: "Q&A 답변", desc: "채팅 말풍선으로 묻고 답하기", sizes: [FEED],
      fields: [
        { key: "series", label: "상단 제목", value: "연수 Q&A  l  연수유형 편", max: 24 },
        { key: "avatar", label: "질문자 사진", type: "image", optional: true },
        { key: "q", label: "질문", value: "자율연수는 무엇인가요?", max: 22 },
        { key: "a", label: "답변", type: "area", rich: true, value: "자율연수는 교원의 직무능력 향상 및 인문/교양 분야에 대한 다양한 지적 욕구를 충족하기 위한 연수로써,\n\n**시험 및 평가 없이** 자유롭게 수강이 가능해요.", max: 130 },
        { key: "time", label: "시각", value: "오전 10:32", max: 10 }
      ],
      draw(c, v, W, H, S) {
        bg(c, W, H, DOWN, QA_BG);
        text(c, v.series, { x: 70, y: 89, w: 940, size: 40, weight: 500, family: P, color: "#737373", maxLines: 1 });
        card(c, 70, 167, 940, 997, 40);
        const aMeasure = wrap(c, v.a, { w: 458, weight: 500, emWeight: 700, family: P }, 44).length;
        const aSize = aMeasure > 11 ? Math.max(32, 44 * 11 / aMeasure) : 44, aLines = wrap(c, v.a, { w: 458, weight: 500, emWeight: 700, family: P }, aSize).length;
        const aH = Math.max(120, aLines * aSize * 1.27 + 60), total = 130 + 70 + aH, top = 167 + (997 - total) / 2;
        c.beginPath(); c.arc(175, top + 65, 65, 0, Math.PI * 2); c.fillStyle = "#f3f4f6"; c.fill();
        S.image(c, "avatar", 110, top, 130, 130, { circle: true });
        fillR(c, 290, top, 540, 115, 30, "#e5e7eb");
        text(c, "Q.", { x: 320, y: top + 30, size: 40, weight: 600, family: A, color: "#111827" });
        text(c, v.q, { x: 378, y: top + 30, w: 422, size: 46, weight: 500, family: P, color: INK, maxLines: 1 });
        text(c, "읽음\n" + v.time, { x: 860, y: top + 78, size: 22, weight: 600, family: P, color: "#525252" });
        const aY = top + 200;
        fillR(c, 236, aY, 572, aH, 30, "#dbeafe");
        text(c, "A.", { x: 266, y: aY + 30, size: 40, weight: 600, family: A, color: "#111827" });
        text(c, v.a, { x: 320, y: aY + 30, w: 458, size: aSize, weight: 500, emWeight: 700, emColor: BLUE, family: P, color: INK, lh: 1.27 });
        text(c, "읽음\n" + v.time, { x: 110, y: aY + aH - 52, w: 106, size: 22, weight: 600, family: P, color: "#525252", align: "right" });
        c.beginPath(); c.arc(904, aY + aH - 66, 64, 0, Math.PI * 2); c.fillStyle = "#f9fafb"; c.fill(); c.strokeStyle = "#e5e5e5"; c.lineWidth = 4; c.stroke();
        logo(c, 860, aY + aH - 78, 90);
        logo(c, 397, 1219, 274);
      } },
    { id: "info-cover", group: "info", name: "정보 표지", desc: "KEY NOTE 라벨과 원형 이미지", sizes: [FEED],
      fields: [
        { key: "label", label: "라벨", value: "KEY NOTE", max: 12 },
        { key: "photo", label: "메인 이미지", type: "image" },
        { key: "sub", label: "윗줄 문구", value: "\"저... 이거 안 시켰는데요...\"", max: 24 },
        { key: "title", label: "제목", type: "area", value: "해외 식당에서 잘못 나온\n음식 거절하는 법", max: 30 }
      ],
      draw(c, v, W, H, S) {
        bg(c, W, H, DOWN, INFO_BG);
        labelPill(c, v.label, null, 70);
        c.beginPath(); c.arc(540, 572, 322, 0, Math.PI * 2); c.fillStyle = "#ffffff"; c.fill();
        S.image(c, "photo", 218, 250, 644, 644, { circle: true });
        c.beginPath(); c.arc(540, 572, 314, 0, Math.PI * 2); c.strokeStyle = "#cde1ff"; c.lineWidth = 16; c.stroke();
        text(c, v.sub, { x: 70, y: 829, w: 932, size: 54, weight: 500, family: A, color: INK, lh: 1.3, maxLines: 1 });
        text(c, v.title, { x: 70, y: 919, w: 932, size: 94, weight: 700, family: A, color: INK, lh: 1.3, maxLines: 2 });
        logo(c, 397, 1219, 274);
      } },
    { id: "info-body", group: "info", name: "정보 본문", desc: "핵심 패턴과 설명 카드", sizes: [FEED],
      fields: [
        { key: "badge", label: "배지", value: "핵심패턴 1", max: 10 },
        { key: "topic", label: "상황", value: "식당에서 음식이 잘못 나왔을 때", max: 22 },
        { key: "main", label: "핵심 문장", type: "area", rich: true, value: "“**This is**\n**not what I ordered.**”", max: 40 },
        { key: "ko", label: "해석", value: "이건 제가 주문한 게 아니에요.", max: 24 },
        { key: "tip1", label: "패턴", value: "✅ This is ~.", max: 20 },
        { key: "tip2", label: "패턴 뜻", value: "이건/여긴 ~예요./~하네요.", max: 22 }
      ],
      draw(c, v, W, H) {
        bg(c, W, H, DOWN, INFO_BG);
        card(c, 70, 89, 940, 1074, 40);
        pill(c, v.badge, 540, 190, { h: 89, px: 30, r: 44, fill: INK, size: 34, weight: 600, family: A, color: "#f9fafb" });
        text(c, v.topic, { x: 150, y: 319, w: 780, size: 54, weight: 600, family: A, color: INK, align: "center", maxLines: 1 });
        const m = text(c, v.main, { x: 150, y: 480, w: 780, size: 74, weight: 500, emWeight: 700, emColor: "#ef4444", family: P, color: INK, align: "center", maxLines: 3, lh: 1.19 });
        text(c, v.ko, { x: 150, y: 480 + m.h + 40, w: 780, size: 44, weight: 500, family: P, color: INK, align: "center", maxLines: 1 });
        fillR(c, 150, 883, 780, 180, 15, "#f3f4f6");
        text(c, v.tip1, { x: 180, y: 913, w: 720, size: 50, weight: 600, family: P, color: "#ef4444", align: "center", maxLines: 1, lh: 1.16 });
        text(c, v.tip2, { x: 180, y: 971, w: 720, size: 44, weight: 500, family: P, color: INK, align: "center", maxLines: 1, lh: 1.3 });
        logo(c, 397, 1219, 274);
      } },
    { id: "rank-cover", group: "rank", name: "월간 랭킹 표지", desc: "TOP 3 연수를 한 장에", sizes: [FEED],
      fields: [
        { key: "title", label: "제목", value: "월간 인기연수", max: 10 },
        { key: "month", label: "월", value: "8월", max: 4 },
        { key: "t1", label: "TOP1 키워드", value: "#영문법  #기초완성", max: 16 },
        { key: "i1", label: "TOP1 강의 이미지", type: "image" },
        { key: "t2", label: "TOP2 키워드", value: "#CNN  #시사영어", max: 16 },
        { key: "i2", label: "TOP2 강의 이미지", type: "image" },
        { key: "t3", label: "TOP3 키워드", value: "#생활영어  #관용표현", max: 16 },
        { key: "i3", label: "TOP3 강의 이미지", type: "image" },
        { key: "cta", label: "하단 문구", value: "자세히 보기", max: 10 }
      ],
      draw(c, v, W, H, S) {
        bg(c, W, H, RANK_ROW, RANK_BG);
        logo(c, 403, 89, 274, "#ffffff", .6);
        text(c, v.title, { x: 70, y: 226, w: 940, size: 110, weight: 700, family: A, color: "#fafafa", align: "center", lh: 1.3, maxLines: 1 });
        c.save(); c.translate(913, 271); c.rotate(.1); fillR(c, -77, -49, 154, 98, 24, "#ef4444");
        text(c, v.month, { x: -77, y: -36, w: 154, size: 55, weight: 700, family: A, color: "#fafafa", align: "center", maxLines: 1 }); c.restore();
        [1, 2, 3].forEach((n, i) => {
          const y = 408 + i * 268;
          fillR(c, 137, y, 805, 228, 30, "#155e75"); strokeR(c, 137, y, 805, 228, 30, "#a5f3fc", 3);
          text(c, "TOP" + n, { x: 177, y: y + 44, w: 420, size: 42, weight: 500, family: A, color: "#22d3ee", lh: 1.3 });
          text(c, v["t" + n], { x: 177, y: y + 119, w: 416, size: 50, weight: 600, family: P, color: "#fafafa", lh: 1.3, maxLines: 1 });
          S.image(c, "i" + n, 607, y + 20, 335 - 20, 188, { r: 20 });
        });
        c.fillStyle = "#164e63"; c.fillRect(0, 1246, W, 104);
        text(c, v.cta, { x: 500, y: 1274, w: 390, size: 40, weight: 700, family: P, color: "#fafafa", align: "right", maxLines: 1 });
        chevron(c, 910, 1273, 50, "#fafafa");
      } },
    { id: "rank-detail", group: "rank", name: "랭킹 상세", desc: "연수 한 개를 자세히 소개", sizes: [FEED],
      fields: [
        { key: "eyebrow", label: "윗줄", value: "데이터로 보는 8월", max: 16 },
        { key: "title", label: "제목", rich: true, value: "인기 **TOP1**", max: 10 },
        { key: "photo", label: "강의 이미지", type: "image" },
        { key: "slogan", label: "한 줄 소개", value: "“문법은 쉽게, 회화는 자연스럽게!”", max: 24 },
        { key: "body", label: "설명", type: "area", value: "복잡한 문법 용어 대신 실제 말할 때\n필요한 문법을 쉽고 재미있게 익히는 강의로\n기초부터 회화까지 탄탄하게", max: 80 },
        { key: "tags", label: "태그", value: "#4학점, #어학, #영문법", help: "쉼표로 나눠 주세요.", max: 30 }
      ],
      draw(c, v, W, H, S) {
        bg(c, W, H, RANK_ROW, RANK_BG);
        logo(c, 403, 89, 274, "#ffffff", .6);
        text(c, v.eyebrow, { x: 70, y: 226, w: 940, size: 44, weight: 500, family: A, color: "#fafafa", align: "center", lh: 1.3, maxLines: 1 });
        text(c, v.title, { x: 70, y: 293, w: 940, size: 110, weight: 700, family: A, color: "#fafafa", emColor: "#22d3ee", align: "center", maxLines: 1 });
        S.image(c, "photo", 290, 478, 500, 344, { r: 50 });
        text(c, v.slogan, { x: 150, y: 870, w: 780, size: 52, weight: 700, family: P, color: "#fecaca", align: "center", maxLines: 1 });
        text(c, v.body, { x: 150, y: 962, w: 780, size: 40, weight: 500, family: P, color: "#fafafa", align: "center", lh: 1.3, maxLines: 3 });
        c.fillStyle = "rgba(255,255,255,.9)"; c.fillRect(150, 1161, 780, 1);
        const tags = String(v.tags || "").split(",").map(s => s.trim()).filter(Boolean).slice(0, 4);
        setFont(c, 600, 40, P);
        const widths = tags.map(t => c.measureText(t).width + 100), all = widths.reduce((a, b) => a + b, 0) + 14 * (tags.length - 1);
        let x = 540 - all / 2;
        tags.forEach((t, i) => { fillR(c, x, 1203, widths[i], 74, 10, "#155e75"); text(c, t, { x, y: 1213, w: widths[i], size: 40, weight: 600, family: P, color: "#fafafa", align: "center", lh: 1.35, maxLines: 1 }); x += widths[i] + 14; });
      } }
  ];

  window.AD_FONTS = ["A2Z-500", "A2Z-600", "A2Z-700", "AdPretendard-500", "AdPretendard-600", "AdPretendard-700", "AdPoppins-500", "AdPoppins-600", "AdPoppins-700", "Jalnan-400", "Maplestory-300", "KyoboHand-400"].map(f => '40px "' + f + '"');
})();
