/* Firebase 연결 파일
   - 페이지(index.html)는 claude.ai 런타임과 같은 모양의 window.claude.use('db' | 'user' | 'assets')를 쓴다.
     이 파일은 그 모양을 Firebase(Google 로그인, Firestore)로 채워서, 페이지 코드를 바꾸지 않고 외부에서도 동작하게 한다.
   - firebase-config.js 에 설정이 있을 때만 index.html 이 이 파일을 불러온다.
   - 권한은 firebase/firestore.rules 가 정한다. 이 파일의 확인은 화면 안내용이다.
   - 시안 파일 올리기(assets)는 쓰지 않는다(링크로만 받는다). */
(function () {
  var cfg = window.FIREBASE_CONFIG;
  if (!cfg || window.claude || !window.firebase) return;

  firebase.initializeApp(cfg);
  var auth = firebase.auth();
  var fs = firebase.firestore();
  var resolveReady;
  var ready = new Promise(function (r) { resolveReady = r; });

  /* ---------- 로그인 화면 (yds 토큰, 컴포넌트만 사용) ---------- */
  var style = document.createElement('style');
  style.textContent =
    '.fb-gate{position:fixed;inset:0;z-index:var(--ds-z-dialog);display:grid;place-items:center;background:var(--ds-color-bg-layer-default);' +
    'padding:max(var(--ds-space-x4),env(safe-area-inset-top,0px)) max(var(--ds-space-x4),env(safe-area-inset-right,0px)) max(var(--ds-space-x4),env(safe-area-inset-bottom,0px)) max(var(--ds-space-x4),env(safe-area-inset-left,0px))}' +
    '.fb-gate .ds-card{width:min(100%,400px)}' +
    '.fb-gate__title{margin:0;font-size:var(--ds-font-size-t09);line-height:var(--ds-line-height-t09);font-weight:var(--ds-font-weight-semibold);letter-spacing:-0.02em}' +
    '.fb-gate__desc{margin:0;font-size:var(--ds-font-size-t04);line-height:var(--ds-line-height-t04);color:var(--ds-color-fg-neutral-muted);word-break:keep-all}' +
    '.fb-gate__body{display:flex;flex-direction:column;gap:var(--ds-space-x4)}';
  document.head.appendChild(style);

  var gate = null;
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { if (c) e.append(c); });
    return e;
  }
  function icon(name) { return el('i', { class: 'ds-icon ds-icon--' + name, 'aria-hidden': 'true' }); }
  function showGate(kind, email) {
    var mount = function () {
      if (gate) gate.remove();
      var btn = el('button', { type: 'button', class: 'ds-btn', 'data-variant': 'brandSolid', 'data-size': 'large', 'data-layout': 'fill' },
        [kind === 'denied' ? '다른 계정으로 로그인' : 'Google 계정으로 로그인']);
      var msg = el('div', {});
      btn.addEventListener('click', function () {
        btn.disabled = true;
        var p = new firebase.auth.GoogleAuthProvider();
        p.setCustomParameters({ prompt: 'select_account' });
        (kind === 'denied' ? auth.signOut() : Promise.resolve()).then(function () { return auth.signInWithPopup(p); }).catch(function (e) {
          btn.disabled = false;
          if (e && e.code === 'auth/popup-closed-by-user') return;
          var c = (e && e.code) || '';
          var text = c === 'auth/popup-blocked' ? '로그인 창이 막혔어요. 브라우저에서 팝업을 허용하고 다시 눌러 주세요.'
            : c === 'auth/unauthorized-domain' ? '이 주소는 아직 로그인을 쓸 수 없어요. 관리자는 Firebase Authentication 설정의 승인된 도메인에 ' + location.hostname + '을 추가해 주세요.'
            : c === 'auth/operation-not-allowed' || c === 'auth/configuration-not-found' ? 'Google 로그인이 아직 켜져 있지 않아요. 관리자는 Firebase Authentication에서 시작하기를 누르고 Google을 사용 설정해 주세요.'
            : c === 'auth/cancelled-popup-request' ? '로그인 창이 이미 열려 있어요. 열린 창에서 계정을 골라 주세요.'
            : c === 'auth/network-request-failed' ? '네트워크에 연결하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.'
            : '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.';
          if (c) text += ' (오류 코드: ' + c + ')';
          if (window.console) console.warn('[waong] 로그인 오류', c, e && e.message);
          msg.replaceChildren(el('div', { class: 'ds-callout', 'data-tone': 'critical' }, [icon('circle-alert-solid'), el('p', { class: 'ds-callout__content' }, [text])]));
        });
      });
      var body = kind === 'denied'
        ? [el('h1', { class: 'fb-gate__title' }, ['사용 권한이 없어요']),
           el('p', { class: 'fb-gate__desc' }, [(email || '이 계정') + ' 계정은 아직 신청 명단에 없어요. 승인 담당자에게 이메일을 알려 주고 등록을 요청해 주세요.'])]
        : [el('h1', { class: 'fb-gate__title' }, ['와옹이 사용 승인']),
           el('p', { class: 'fb-gate__desc' }, ['와옹이를 디자인에 쓰려면 이곳에서 사용 신청을 등록해 주세요. 등록된 계정으로 로그인하면 신청과 승인 결과를 볼 수 있어요.'])];
      gate = el('section', { class: 'fb-gate', role: 'dialog', 'aria-modal': 'true', 'aria-label': '로그인' }, [
        el('article', { class: 'ds-card' }, [el('div', { class: 'fb-gate__body' }, body.concat([btn, msg]))])
      ]);
      document.body.appendChild(gate);
    };
    if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount, { once: true });
  }
  function hideGate() { if (gate) { gate.remove(); gate = null; } }

  /* ---------- 오류를 페이지가 아는 코드로 ---------- */
  function mapErr(e) {
    var c = e && e.code;
    var code = c === 'permission-denied' || c === 'not-found' || c === 'invalid-argument' || c === 'failed-precondition' ? 'invalid_argument'
      : c === 'resource-exhausted' ? 'resource_exhausted' : 'unavailable';
    return { code: code, message: (e && e.message) || '' };
  }
  function wrap(p) { return p.catch(function (e) { throw mapErr(e); }); }

  /* ---------- db: 경로 그대로 Firestore 에 ---------- */
  function snapDoc(s) {
    return { id: s.id, exists: s.exists, data: function () { return s.exists ? s.data() : undefined; },
      metadata: { fromCache: s.metadata.fromCache, hasPendingWrites: s.metadata.hasPendingWrites } };
  }
  function snapQuery(s) {
    var docs = s.docs.map(snapDoc);
    return { docs: docs, size: s.size, empty: s.empty, docChanges: function () { return []; }, metadata: { fromCache: s.metadata.fromCache, hasPendingWrites: s.metadata.hasPendingWrites } };
  }
  function docRef(path) {
    var r = fs.doc(path);
    return {
      id: r.id, path: path,
      get: function () { return wrap(r.get().then(snapDoc)); },
      set: function (d) { return wrap(r.set(d)); },
      update: function (d) { return wrap(r.update(d)); },
      delete: function () { return wrap(r.delete()); },
      onSnapshot: function (next, err) { return r.onSnapshot(function (s) { next(snapDoc(s)); }, function (e) { if (err) err(mapErr(e)); }); },
      collection: function (p) { return colRef(path + '/' + p); }
    };
  }
  function colRef(path, q) {
    var base = q || fs.collection(path);
    return {
      path: path,
      orderBy: function (f, d) { return colRef(path, base.orderBy(f, d || 'asc')); },
      where: function (f, o, v) { return colRef(path, base.where(f, o, v)); },
      limit: function (n) { return colRef(path, base.limit(n)); },
      doc: function (id) { return docRef(path + '/' + (id || fs.collection(path).doc().id)); },
      add: function (d) { var ref = docRef(path + '/' + fs.collection(path).doc().id); return ref.set(d).then(function () { return ref; }); },
      get: function () { return wrap(base.get().then(snapQuery)); },
      onSnapshot: function (next, err) { return base.onSnapshot(function (s) { next(snapQuery(s)); }, function (e) { if (err) err(mapErr(e)); }); }
    };
  }

  /* ---------- user: 로그인한 사람, 이름 ---------- */
  var nameCache = {};
  function buildUser(u, approver) {
    var email = (u.email || '').toLowerCase();
    var name = u.displayName || email.split('@')[0];
    var me = { id: u.uid, name: name, avatarUrl: u.photoURL || '', color: '', email: email, isOwner: approver, canEdit: approver };
    nameCache[u.uid] = name;
    return {
      me: function () { return Promise.resolve(Object.assign({}, me)); },
      id: function () { return Promise.resolve(u.uid); },
      name: function () { return Promise.resolve(name); },
      email: function () { return Promise.resolve(email); },
      isOwner: function () { return Promise.resolve(approver); },
      canEdit: function () { return Promise.resolve(approver); },
      can: function () { return Promise.resolve(true); },
      profiles: function (ids) {
        ids = [].concat(ids);
        var miss = ids.filter(function (i) { return !(i in nameCache); });
        return Promise.all(miss.map(function (i) {
          return fs.doc('profiles/' + i).get().then(function (s) { nameCache[i] = s.exists ? (s.data().name || '') : ''; }).catch(function () { nameCache[i] = ''; });
        })).then(function () {
          var o = {};
          ids.forEach(function (i) { o[i] = { id: i, name: nameCache[i] || '', avatarUrl: '', color: '', email: null, isMe: i === u.uid, guest: false }; });
          return o;
        });
      }
    };
  }

  /* ---------- 로그인 상태 ---------- */
  auth.onAuthStateChanged(function (u) {
    if (!u) { showGate('login'); return; }
    var email = (u.email || '').toLowerCase();
    /* 명단에 있는지: 신청 목록을 읽을 수 있으면 등록된 사람 */
    fs.collection('requests').limit(1).get().then(function () {
      /* 승인 담당자인지: config/access 는 승인 담당자만 읽을 수 있다 */
      return fs.doc('config/access').get().then(function (s) { return s.exists; }, function () { return false; });
    }).then(function (approver) {
      fs.doc('profiles/' + u.uid).set({ name: u.displayName || email.split('@')[0] }).catch(function () {});
      hideGate();
      window.appAuth = { email: email, signOut: function () { return auth.signOut().then(function () { location.reload(); }); } };
      resolveReady({ db: { doc: docRef, collection: function (p) { return colRef(p); } }, user: buildUser(u, approver), assets: null });
    }, function () {
      showGate('denied', email);
    });
  });

  window.claude = { use: function (n) { return ready.then(function (api) { return api[n] || null; }); } };
})();
