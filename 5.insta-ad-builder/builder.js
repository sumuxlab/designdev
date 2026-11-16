/* 화면 동작: 템플릿 선택, 입력, 미리보기, PNG 저장 */
(function () {
  const $ = id => document.getElementById(id);
  const canvas = $("preview"), ctx = canvas.getContext("2d");
  const groups = window.AD_GROUPS, templates = window.AD_TEMPLATES;
  const KEY = "ybm-teacher-ad-builder-v1";
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
  const isHex = v => /^#[0-9a-f]{6}$/i.test(v || "");

  const blank = () => Object.fromEntries(templates.map(t => [t.id, Object.fromEntries(t.fields.filter(f => f.type !== "image").map(f => [f.key, f.value]))]));
  const state = { groupId: "ad", templateId: "ad-coupon", sizeIndex: 0, tones: {}, customTone: "#6d5ce7", values: blank() };
  const images = {}; /* templateId:key → { img, zoom, ox, oy, name } */
  let hits = [];

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && templates.some(t => t.id === saved.templateId)) {
      Object.assign(state, { groupId: saved.groupId, templateId: saved.templateId, sizeIndex: 0, tones: saved.tones || {}, customTone: isHex(saved.customTone) ? saved.customTone : state.customTone });
      templates.forEach(t => Object.assign(state.values[t.id], saved.values && saved.values[t.id]));
    }
  } catch (e) { /* 저장값 없이 시작 */ }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* 저장 불가 환경 */ } }

  const current = () => templates.find(t => t.id === state.templateId);
  const toneKey = t => state.tones[t.id] || t.defaultTone;
  function toneOf(t) {
    if (!t.tones) return undefined;
    const k = toneKey(t);
    return t.tones[k] || (isHex(k) ? window.AD_MAKE_TONE(k, "직접 고른 색") : t.tones[t.defaultTone]);
  }

  /* ---- 이미지 칸 ---- */
  function drawImage(c, tpl, key, x, y, w, h, o, forExport) {
    const slot = images[tpl.id + ":" + key];
    const field = tpl.fields.find(f => f.key === key);
    c.save();
    c.beginPath();
    if (o.circle) c.arc(x + w / 2, y + h / 2, w / 2, 0, Math.PI * 2); else c.roundRect(x, y, w, h, o.r || 0);
    if (slot) {
      c.clip();
      const ir = slot.img.width / slot.img.height, br = w / h, contain = o.fit === "contain";
      const base = (contain ? ir > br : ir < br) ? w / slot.img.width : h / slot.img.height;
      const s = base * slot.zoom, dw = slot.img.width * s, dh = slot.img.height * s;
      c.drawImage(slot.img, x + (w - dw) / 2 + slot.ox, y + (h - dh) / 2 + slot.oy, dw, dh);
      hits.push({ key, x, y, w, h });
    } else if (!forExport && !(field && field.optional)) {
      c.fillStyle = "rgba(255,255,255,.55)"; c.fill();
      c.setLineDash([16, 12]); c.lineWidth = 4; c.strokeStyle = "rgba(38,38,38,.35)"; c.stroke(); c.setLineDash([]);
      c.fillStyle = "rgba(38,38,38,.6)"; c.font = Math.max(22, Math.min(38, w / 12)) + 'px "AdPretendard-600"'; c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText(field ? field.label : "이미지", x + w / 2, y + h / 2);
    }
    c.restore();
  }

  function paint(c, W, H, forExport) {
    const tpl = current();
    hits = [];
    c.clearRect(0, 0, W, H);
    c.textAlign = "left";
    const S = {
      tone: toneOf(tpl),
      image: (cc, key, x, y, w, h, o) => drawImage(cc, tpl, key, x, y, w, h, o || {}, forExport)
    };
    tpl.draw(c, state.values[tpl.id], W, H, S);
  }

  function size() { const t = current(); return t.sizes[state.sizeIndex] || t.sizes[0]; }
  let queued = false;
  function render() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const [W, H] = size();
      if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
      paint(ctx, W, H, false);
      canvas.dataset.draggable = hits.length ? "true" : "false";
      $("stage-size").textContent = W + " × " + H + " px" + (hits.length ? " · 이미지는 미리보기에서 끌어 위치를 옮길 수 있어요." : "");
      persist();
    });
  }

  /* ---- 화면 그리기 ---- */
  function renderGroups() {
    $("group-tabs").innerHTML = groups.map(g => '<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="' + (g.id === state.groupId) + '" data-group="' + g.id + '">' + esc(g.name) + "</button>").join("");
  }
  function renderTemplates() {
    $("template-list").innerHTML = templates.filter(t => t.group === state.groupId).map(t =>
      '<label class="ds-selectbox"><span class="ds-selectbox__texts"><span class="ds-selectbox__label">' + esc(t.name) + '</span><span class="ds-selectbox__desc">' + esc(t.desc) + '</span></span>' +
      '<span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="template" value="' + t.id + '"' + (t.id === state.templateId ? " checked" : "") + "></span></label>").join("");
  }
  function renderSizes() {
    const t = current(), box = $("size-switch");
    box.hidden = t.sizes.length < 2;
    box.innerHTML = t.sizes.map((s, i) => '<button type="button" class="ds-segmented__item" aria-pressed="' + (i === state.sizeIndex) + '" data-size-index="' + i + '">' + (s[1] === 1920 ? "스토리 9:16" : "피드 4:5") + "</button>").join("");
  }
  function fieldHtml(t, f) {
    const id = "f-" + f.key, v = state.values[t.id][f.key] == null ? "" : state.values[t.id][f.key];
    const count = f.max ? '<span class="ds-field__count" data-count="' + f.key + '">' + String(v).replace(/\*\*/g, "").length + "/" + f.max + "</span>" : "";
    const emHelp = f.rich ? "강조할 부분은 **별표 두 개**로 감싸 주세요." : "";
    const help = [f.help, emHelp].filter(Boolean).join(" ");
    const limit = f.max ? ' maxlength="' + (f.max + (f.rich ? 8 : 0)) + '"' : "";
    const foot = (help || count) ? '<div class="ds-field__footer">' + (help ? '<p class="ds-field__help">' + esc(help) + "</p>" : "") + count + "</div>" : "";
    const head = '<div class="ds-field__header"><label class="ds-field__label" for="' + id + '">' + esc(f.label) + "</label>" + (f.optional ? '<span class="ds-field__indicator">선택</span>' : "") + "</div>";
    if (f.type === "image") {
      const slot = images[t.id + ":" + f.key];
      const tools = slot ? '<div class="image-tools"><input type="range" class="ds-slider" min="50" max="300" value="' + Math.round(slot.zoom * 100) + '" data-zoom="' + f.key + '" aria-label="' + esc(f.label) + ' 크기">' +
        '<button type="button" class="ds-btn" data-variant="neutralWeak" data-size="xsmall" data-remove="' + f.key + '"><i class="ds-icon ds-icon--trash" aria-hidden="true"></i>지우기</button></div>' : "";
      return '<div class="ds-field">' + head + '<div class="ds-fileattach"><label class="ds-fileattach__dropzone"><input type="file" id="' + id + '" class="ds-fileattach__input" accept="image/png,image/jpeg,image/webp" data-image="' + f.key + '">' +
        '<span class="ds-fileattach__label">' + (slot ? esc(slot.name) : "이미지를 끌어 놓거나 눌러서 추가하세요") + "</span></label></div>" + tools + foot + "</div>";
    }
    if (f.type === "area") return '<div class="ds-field">' + head + '<textarea class="ds-textarea" data-size="medium" rows="3" id="' + id + '" data-key="' + f.key + '"' + limit + ">" + esc(v) + "</textarea>" + foot + "</div>";
    return '<div class="ds-field">' + head + '<div class="ds-input" data-variant="outline" data-size="medium"><input class="ds-input__control" id="' + id + '" data-key="' + f.key + '" value="' + esc(v) + '"' + limit + "></div>" + foot + "</div>";
  }
  function renderFields() {
    const t = current();
    let tones = "";
    if (t.tones) {
      const key = toneKey(t), custom = !t.tones[key] && isHex(key);
      const presets = Object.entries(t.tones).map(([k, v]) =>
        '<label class="tone"><input type="radio" class="tone__control" name="tone" value="' + k + '"' + (k === key ? " checked" : "") + '>' +
        '<span class="tone__chip" style="--tone-from:' + v.stops[0][0] + ";--tone-to:" + v.stops[1][0] + '"></span><span class="tone__name">' + esc(v.name) + "</span></label>").join("");
      const picker = '<label class="tone" id="tone-custom" data-selected="' + custom + '"><input type="color" class="tone__control" value="' + state.customTone + '" data-custom-tone aria-label="원하는 색 직접 고르기">' +
        '<span class="tone__chip" id="tone-custom-chip" style="--tone-from:' + state.customTone + ";--tone-to:" + state.customTone + '"><i class="ds-icon ds-icon--palette tone__icon" aria-hidden="true"></i></span><span class="tone__name">직접</span></label>';
      tones = '<div class="ds-field"><div class="ds-field__header"><span class="ds-field__label" id="tone-label">색상</span></div><div class="tone-grid" role="radiogroup" aria-labelledby="tone-label">' + presets + picker + "</div></div>";
    }
    $("fields").innerHTML = tones + t.fields.map(f => fieldHtml(t, f)).join("");
  }
  function refreshAll() { renderGroups(); renderTemplates(); renderSizes(); renderFields(); render(); }

  /* ---- 입력 ---- */
  $("group-tabs").addEventListener("click", e => {
    const b = e.target.closest("[data-group]"); if (!b) return;
    state.groupId = b.dataset.group;
    state.templateId = templates.find(t => t.group === state.groupId).id;
    state.sizeIndex = 0; refreshAll();
  });
  $("template-list").addEventListener("change", e => { state.templateId = e.target.value; state.sizeIndex = 0; renderSizes(); renderFields(); render(); });
  $("size-switch").addEventListener("click", e => {
    const b = e.target.closest("[data-size-index]"); if (!b) return;
    state.sizeIndex = Number(b.dataset.sizeIndex); render();
  });

  function loadImage(key, file) {
    if (!file || !/^image\//.test(file.type)) { window.DS && DS.snackbar("PNG, JPG, WebP 이미지만 넣을 수 있어요.", { variant: "critical" }); return; }
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => { images[state.templateId + ":" + key] = { img, zoom: 1, ox: 0, oy: 0, name: file.name }; renderFields(); render(); };
    img.onerror = () => window.DS && DS.snackbar("이미지를 열지 못했어요. 다른 파일로 다시 시도해 주세요.", { variant: "critical" });
    img.src = url;
  }

  const form = $("fields");
  /* 직접 고른 색을 적용한다. 색상 창이 닫히지 않도록 입력칸은 다시 그리지 않는다 */
  function applyCustomTone(color) {
    state.customTone = color;
    state.tones[state.templateId] = color;
    form.querySelectorAll('input[name="tone"]').forEach(r => { r.checked = false; });
    $("tone-custom").dataset.selected = "true";
    $("tone-custom-chip").style.setProperty("--tone-from", color);
    $("tone-custom-chip").style.setProperty("--tone-to", color);
    render();
  }
  form.addEventListener("input", e => {
    const el = e.target, t = current();
    if ("customTone" in el.dataset) { applyCustomTone(el.value); return; }
    if (el.dataset.key) {
      state.values[t.id][el.dataset.key] = el.value;
      const counter = form.querySelector('[data-count="' + el.dataset.key + '"]');
      const f = t.fields.find(x => x.key === el.dataset.key);
      if (counter && f) counter.textContent = el.value.replace(/\*\*/g, "").length + "/" + f.max;
      render();
    } else if (el.dataset.zoom) {
      images[t.id + ":" + el.dataset.zoom].zoom = Number(el.value) / 100; render();
    }
  });
  form.addEventListener("change", e => {
    const el = e.target;
    if (el.name === "tone") { state.tones[state.templateId] = el.value; $("tone-custom").dataset.selected = "false"; render(); }
    if (el.dataset.image && el.files[0]) loadImage(el.dataset.image, el.files[0]);
  });
  form.addEventListener("drop", e => {
    const input = e.target.closest(".ds-fileattach") && e.target.closest(".ds-fileattach").querySelector("[data-image]");
    if (input && e.dataTransfer.files[0]) { e.preventDefault(); loadImage(input.dataset.image, e.dataTransfer.files[0]); }
  });
  form.addEventListener("dragover", e => { if (e.target.closest(".ds-fileattach")) e.preventDefault(); });
  form.addEventListener("click", e => {
    if ("customTone" in e.target.dataset) { applyCustomTone(e.target.value); return; }
    const b = e.target.closest("[data-remove]"); if (!b) return;
    delete images[state.templateId + ":" + b.dataset.remove]; renderFields(); render();
  });
  form.addEventListener("submit", e => e.preventDefault());

  $("reset-form").addEventListener("click", () => {
    const t = current(); state.values[t.id] = blank()[t.id];
    Object.keys(images).filter(k => k.startsWith(t.id + ":")).forEach(k => delete images[k]);
    renderFields(); render();
    window.DS && DS.snackbar("예시 문구로 되돌렸어요.");
  });

  /* 미리보기에서 이미지 끌기 */
  let drag = null;
  const toCanvas = e => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height }; };
  canvas.addEventListener("pointerdown", e => {
    const p = toCanvas(e), hit = [...hits].reverse().find(h => p.x >= h.x && p.x <= h.x + h.w && p.y >= h.y && p.y <= h.y + h.h);
    if (!hit) return;
    const slot = images[state.templateId + ":" + hit.key];
    drag = { slot, sx: p.x, sy: p.y, ox: slot.ox, oy: slot.oy }; canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", e => {
    if (!drag) return;
    const p = toCanvas(e); drag.slot.ox = drag.ox + p.x - drag.sx; drag.slot.oy = drag.oy + p.y - drag.sy; render();
  });
  ["pointerup", "pointercancel"].forEach(n => canvas.addEventListener(n, () => { drag = null; }));

  /* ---- PNG 저장 ---- */
  let downloads = null;
  if (window.claude && window.claude.use) window.claude.use("downloads").then(d => { downloads = d; }).catch(() => {});

  async function save() {
    const t = current(), [W, H] = size();
    const missing = t.fields.filter(f => f.type === "image" && !f.optional && !images[t.id + ":" + f.key]).length;
    const out = document.createElement("canvas"); out.width = W; out.height = H;
    paint(out.getContext("2d"), W, H, true);
    render();
    const blob = await new Promise(r => out.toBlob(r, "image/png"));
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const filename = "교원연수_" + t.name.replace(/\s+/g, "") + "_" + W + "x" + H + "_" + stamp + ".png";
    const done = () => window.DS && DS.snackbar(missing ? "저장했어요. 비어 있는 이미지 칸 " + missing + "개는 빠진 채 저장됐어요." : "PNG로 저장했어요.", { variant: "positive" });
    if (downloads) {
      try { await downloads.save({ filename, data: blob }); done(); }
      catch (err) { if (err.code !== "declined") window.DS && DS.snackbar("저장하지 못했어요. 잠시 후 다시 눌러 주세요.", { variant: "critical" }); }
      return;
    }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    done();
  }
  $("save-png").addEventListener("click", save);

  /* 글꼴을 다 읽은 뒤 그려야 광고 글꼴이 바로 적용된다 */
  refreshAll();
  Promise.all(window.AD_FONTS.map(f => document.fonts.load(f, "가A1"))).then(render, render);
})();
