/* 로컬 확인용 가짜 claude.ai 런타임 (window.claude.use)
   - index.html 은 localhost 나 파일로 열 때만 이 파일을 불러온다. claude.ai 에 배포한 페이지에서는 쓰이지 않는다.
   - 데이터는 브라우저 메모리에만 있다(새로 고치면 예시 데이터로 돌아간다). 아래 데이터는 모두 예시다.
   - 주소 끝에 ?as=requester 를 붙이면 신청자, 없으면 승인 담당자로 본다. ?empty 를 붙이면 빈 상태로 시작한다. */
(function () {
  if (window.claude) return;
  var q = new URLSearchParams(location.search);
  var asRequester = q.get('as') === 'requester';
  var now = Date.now(), day = 864e5;
  var iso = function (ms) { var d = new Date(ms); return d.toISOString().slice(0, 10); };
  var store = new Map();   // path -> data
  var listeners = [];      // { kind: 'col'|'doc', path, fn, order }

  if (!q.has('empty')) {
    var seed = {
      'requests/ex1': { team: '플랫폼디자인팀', project: '[예시] 토익 정기시험 접수 이벤트', site: '토익 사이트 메인 배너', medium: '웹, 앱 배너', usage: '크기, 배경 편집', start: iso(now + 3 * day), end: iso(now + 30 * day), purpose: '접수 독려 배너에 달력을 든 와옹이를 넣어요.', requesterId: 'u_me', createdAt: now - 2 * 3600e3 },
      'requests/ex2': { team: '마케팅팀', project: '[예시] 공식 인스타그램 겨울 캠페인', site: '공식 인스타그램', medium: 'SNS 콘텐츠', usage: '신규 포즈, 표정 제작', start: iso(now + 10 * day), purpose: '목도리를 두른 와옹이', requesterId: 'u_other', createdAt: now - 2 * day },
      'requests/ex3': { team: '교재개발팀', project: '[예시] 토익 기본서 표지', site: '교재 표지', medium: '인쇄물', usage: '기존 이미지 그대로', start: iso(now - 60 * day), end: iso(now + 4 * day), purpose: '표지 아래쪽', requesterId: 'u_me', createdAt: now - 70 * day },
      'requests/ex4': { team: '이벤트운영팀', project: '[예시] 여름방학 특강 배너', site: 'YBM 어학원 사이트', medium: '웹, 앱 배너', usage: '기존 이미지 그대로', start: iso(now - 120 * day), end: iso(now - 5 * day), purpose: '특강 배너 오른쪽', requesterId: 'u_me', createdAt: now - 125 * day },
      'decisions/ex2': { status: 'revise', note: '표정 시안을 2종 더 보내 주세요.', reviewerId: 'u_lead', decidedAt: now - 3600e3, log: [{ status: 'revise', note: '표정 시안을 2종 더 보내 주세요.', reviewerId: 'u_lead', at: now - 3600e3 }] },
      'decisions/ex3': { status: 'approved', note: '로고와 2cm 이상 띄워 주세요.', reviewerId: 'u_lead', decidedAt: now - 65 * day, log: [{ status: 'approved', reviewerId: 'u_lead', at: now - 65 * day }] },
      'decisions/ex4': { status: 'approved', note: '', reviewerId: 'u_lead', decidedAt: now - 121 * day, log: [{ status: 'approved', reviewerId: 'u_lead', at: now - 121 * day }] }
    };
    Object.keys(seed).forEach(function (k) { store.set(k, seed[k]); });
  }

  var me = asRequester ? { id: 'u_me', name: '신청자(예시)', canEdit: false } : { id: 'u_lead', name: '승인 담당자(예시)', canEdit: true };
  var names = { u_me: '김신청', u_other: '이디자인', u_lead: '박승인' };
  var clone = function (o) { return o == null ? o : JSON.parse(JSON.stringify(o)); };
  var docSnap = function (path) { var d = store.get(path); return { id: path.split('/').pop(), exists: !!d, data: function () { return clone(d); }, metadata: { fromCache: false, hasPendingWrites: false } }; };
  var colDocs = function (path, order) {
    var pre = path + '/', out = [];
    store.forEach(function (v, k) { if (k.indexOf(pre) === 0 && k.slice(pre.length).indexOf('/') < 0) out.push(docSnap(k)); });
    if (order) out.sort(function (a, b) { var x = a.data()[order.f], y = b.data()[order.f]; return (x < y ? -1 : x > y ? 1 : 0) * (order.d === 'desc' ? -1 : 1); });
    return out;
  };
  var notify = function () {
    setTimeout(function () {
      listeners.forEach(function (l) {
        if (l.kind === 'doc') l.fn(docSnap(l.path));
        else { var docs = colDocs(l.path, l.order); l.fn({ docs: docs, size: docs.length, empty: !docs.length, docChanges: function () { return []; }, metadata: {} }); }
      });
    }, 30);
  };
  var docRef = function (path) {
    return {
      id: path.split('/').pop(), path: path,
      get: function () { return Promise.resolve(docSnap(path)); },
      set: function (d) { store.set(path, clone(d)); notify(); return Promise.resolve(); },
      update: function (d) {
        if (!store.has(path)) return Promise.reject({ code: 'invalid_argument', message: 'no doc' });
        store.set(path, Object.assign({}, store.get(path), clone(d))); notify(); return Promise.resolve();
      },
      delete: function () { store.delete(path); notify(); return Promise.resolve(); },
      onSnapshot: function (fn) { var l = { kind: 'doc', path: path, fn: fn }; listeners.push(l); setTimeout(function () { fn(docSnap(path)); }, 30); return function () { listeners.splice(listeners.indexOf(l), 1); }; },
      collection: function (sub) { return colRef(path + '/' + sub); }
    };
  };
  var colRef = function (path, order) {
    return {
      path: path,
      orderBy: function (f, d) { return colRef(path, { f: f, d: d || 'asc' }); },
      where: function () { return colRef(path, order); },
      limit: function () { return colRef(path, order); },
      doc: function (id) { return docRef(path + '/' + (id || 'r' + Math.random().toString(36).slice(2, 10))); },
      get: function () { var docs = colDocs(path, order); return Promise.resolve({ docs: docs, size: docs.length, empty: !docs.length }); },
      onSnapshot: function (fn) {
        var l = { kind: 'col', path: path, fn: fn, order: order }; listeners.push(l);
        setTimeout(function () { var docs = colDocs(path, order); fn({ docs: docs, size: docs.length, empty: !docs.length, docChanges: function () { return []; }, metadata: {} }); }, 30);
        return function () { listeners.splice(listeners.indexOf(l), 1); };
      }
    };
  };

  var api = {
    db: { doc: docRef, collection: function (p) { return colRef(p); } },
    user: {
      me: function () { return Promise.resolve({ id: me.id, name: me.name, avatarUrl: '', color: '', email: null, isOwner: me.canEdit, canEdit: me.canEdit }); },
      id: function () { return Promise.resolve(me.id); },
      can: function () { return Promise.resolve(true); },
      isOwner: function () { return Promise.resolve(me.canEdit); },
      canEdit: function () { return Promise.resolve(me.canEdit); },
      profiles: function (ids) { var o = {}; [].concat(ids).forEach(function (i) { o[i] = { id: i, name: names[i] || '', avatarUrl: '', color: '', email: null, isMe: i === me.id, guest: false }; }); return Promise.resolve(o); }
    },
    assets: {
      upload: function (f) { var url = URL.createObjectURL(f); return Promise.resolve({ id: url, url: url, sizeBytes: f.size, contentType: f.type }); }
    }
  };
  window.__ydsMock = true;
  window.claude = { use: function (n) { return Promise.resolve(api[n] || null); } };
})();
