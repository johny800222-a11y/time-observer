/* 時空觀測器・遊戲引擎
 * 流程：標題 → 章節選單 → 時空跳躍 → 開場旁白 → [場景探索 → 抉擇 → 知識卡] × N → 尾聲 → 歷史修正檢驗 → 觀測報告
 * 章節內容全部放在 data/*.js，引擎只負責「怎麼演」。
 */
(function () {
  'use strict';
  const D = window.GAME_DATA, A = window.ART, SFX = window.SFX, VOICE = window.VOICE;
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app'), ovRoot = $('#overlay'), dlgRoot = $('#dialog'), toastRoot = $('#toast');
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7M8 11h5"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 17.6v.4" stroke-linecap="round" stroke-width="2.6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.2 3.2L17 9" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
    eye: '<svg class="sym" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="24" cy="24" r="20" stroke-dasharray="4 3"/><path d="M6 24s7-11 18-11 18 11 18 11-7 11-18 11S6 24 6 24z"/><circle cx="24" cy="24" r="6" fill="currentColor"/></svg>',
    chip: '<svg class="sym" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="12" y="12" width="24" height="24" rx="3"/><rect x="19" y="19" width="10" height="10" fill="currentColor"/><path d="M18 6v6M24 6v6M30 6v6M18 36v6M24 36v6M30 36v6M6 18h6M6 24h6M6 30h6M36 18h6M36 24h6M36 30h6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  /* ---------- 存檔（只存在這台裝置的瀏覽器） ---------- */
  const KEY = 'time-observer-v1';
  const fresh = () => ({ v: 1, booted: false, done: {}, cards: {}, terms: {}, settings: { sound: true, voice: false, speed: 2, book: null } });
  let save = (() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === 1) return Object.assign(fresh(), s, { settings: Object.assign(fresh().settings, s.settings) });
    } catch (e) {}
    return fresh();
  })();
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) {} };
  SFX.setOn(save.settings.sound);

  /* ---------- 文字：[[關鍵詞]] ---------- */
  function segs(text) {
    const out = [], re = /\[\[(.+?)\]\]/g; let m, last = 0;
    while ((m = re.exec(text))) {
      if (m.index > last) out.push({ t: text.slice(last, m.index) });
      out.push({ t: m[1], kw: true });
      last = re.lastIndex;
    }
    if (last < text.length) out.push({ t: text.slice(last) });
    return out;
  }
  const plain = t => t.replace(/\[\[(.+?)\]\]/g, '$1');
  function renderSegs(sg, n) {
    let html = '', left = n;
    for (const s of sg) {
      if (left <= 0) break;
      const chars = [...s.t], take = chars.slice(0, left).join('');
      left -= chars.length;
      html += s.kw ? `<span class="kw" data-term="${esc(s.t)}">${esc(take)}</span>` : esc(take);
    }
    return html;
  }
  const rich = t => renderSegs(segs(t), Infinity);
  function define(term) {
    if (C && C.glossary && C.glossary[term]) return C.glossary[term];
    for (const id in D.chapters) { const g = D.chapters[id].glossary; if (g && g[term]) return g[term]; }
    return null;
  }
  function collectTerms(text) {
    let changed = false;
    for (const s of segs(text)) {
      if (s.kw && define(s.t) && !save.terms[s.t]) { save.terms[s.t] = C ? C.id : 'misc'; changed = true; }
      if (s.kw && S) S.terms.add(s.t);
    }
    if (changed) persist();
  }

  /* ---------- 狀態 ---------- */
  let C = null;   // 目前章節資料
  let S = null;   // 本次遊玩狀態
  let idleTimer = null;
  const chapterNum = id => parseInt(id.replace(/\D/g, ''), 10);
  const playable = () => D.units.filter(u => u.status === 'play' && D.chapters[u.id]);

  function setScreen(html) {
    clearInterval(idleTimer); idleTimer = null;
    Dlg.abort(); closeOverlay(); closePop();
    app.innerHTML = html;
    app.scrollTop = 0;
  }

  /* =========================================================
   * 對話系統（打字機效果）
   * ========================================================= */
  function speakerInfo(who) {
    if (who === 'narrator') return { kind: 'narrator', name: '觀測器旁白', portrait: ICON.eye };
    if (who === 'system') return { kind: 'system', name: '系統訊息', portrait: ICON.chip };
    const id = who === 'host' ? S.host : who;
    const c = C.cast[id];
    if (!c) return { kind: 'narrator', name: '觀測器旁白', portrait: ICON.eye };
    if (who === 'host') return { kind: 'host', name: `${c.name}（內心）`, role: '意識連結中', portrait: A.portrait(c.look) };
    return { kind: 'actor', name: c.name, role: c.role, portrait: A.portrait(c.look) };
  }

  const Dlg = {
    active: false,
    open(lines, done) {
      if (!lines || !lines.length) { done && done(); return; }
      this.lines = lines; this.i = 0; this.done = done; this.active = true;
      dlgRoot.hidden = false;
      this.render();
    },
    render() {
      const L = this.lines[this.i], sp = speakerInfo(L.who);
      dlgRoot.innerHTML = `<div class="dlg frame kind-${sp.kind}" role="dialog" aria-live="polite" aria-label="${esc(sp.name)}">
        <div class="dlg-portrait">${sp.portrait}</div>
        <div class="dlg-main">
          <div class="dlg-name">${esc(sp.name)}${sp.role ? `<small>${esc(sp.role)}</small>` : ''}</div>
          <p class="dlg-text"></p>
          <div class="dlg-foot"><span>${this.i + 1} / ${this.lines.length}</span><span class="dlg-next">點一下繼續 ${ICON.next}</span></div>
        </div></div>`;
      this.sg = segs(L.text); this.len = [...plain(L.text)].length; this.n = 0;
      this.el = $('.dlg-text', dlgRoot);
      if (save.settings.voice) VOICE.speak(plain(L.text));
      const ms = [0, 55, 32, 16][save.settings.speed];
      clearInterval(this.timer); this.timer = null;
      if (!ms || reduced()) { this.finish(); return; }
      this.timer = setInterval(() => {
        this.n++;
        this.el.innerHTML = renderSegs(this.sg, this.n);
        if (this.n % 3 === 0) SFX.blip();
        if (this.n >= this.len) this.finish();
      }, ms);
    },
    finish() {
      clearInterval(this.timer); this.timer = null;
      this.el.innerHTML = renderSegs(this.sg, Infinity);
      $('.dlg', dlgRoot).classList.add('done');
      collectTerms(this.lines[this.i].text);
    },
    next() {
      if (this.timer) { this.finish(); return; }
      this.i++;
      if (this.i >= this.lines.length) this.close(); else this.render();
    },
    close() {
      this.active = false; clearInterval(this.timer); this.timer = null;
      VOICE.stop(); closePop();
      dlgRoot.hidden = true; dlgRoot.innerHTML = '';
      const d = this.done; this.done = null; d && d();
    },
    abort() {
      this.active = false; clearInterval(this.timer); this.timer = null; this.done = null;
      VOICE.stop(); dlgRoot.hidden = true; dlgRoot.innerHTML = '';
    }
  };
  const dialog = (lines, done) => Dlg.open(lines, done);

  /* 關鍵詞小卡 */
  let popEl = null;
  function showTerm(term, anchor) {
    closePop();
    const def = define(term);
    if (!def) return;
    popEl = document.createElement('div');
    popEl.className = 'term-pop';
    popEl.setAttribute('role', 'note');
    popEl.innerHTML = `<b>${esc(term)}</b><p>${esc(def)}</p><small>已收進觀測筆記・點任意處關閉</small>`;
    document.body.appendChild(popEl);
    const r = anchor.getBoundingClientRect();
    const h = popEl.offsetHeight;
    const top = r.top - h - 12 > 8 ? r.top - h - 12 : Math.min(r.bottom + 12, innerHeight - h - 8);
    popEl.style.top = top + 'px';
    if (save.terms[term] === undefined) { save.terms[term] = C ? C.id : 'misc'; persist(); }
  }
  function closePop() { if (popEl) { popEl.remove(); popEl = null; return true; } return false; }

  /* =========================================================
   * 覆蓋層與提示
   * ========================================================= */
  function showOverlay(html, cls = '') {
    ovRoot.innerHTML = `<div class="ov ${cls}">${html}</div>`;
    ovRoot.hidden = false;
    // 抉擇面板不要自動聚焦在某個選項上（免得看起來像提示答案）
    const f = ovRoot.querySelector('.btn-primary, .btn-danger') || ovRoot.querySelector('.panel');
    if (f) { if (!f.matches('button')) f.setAttribute('tabindex', '-1'); setTimeout(() => f.focus({ preventScroll: true }), 50); }
  }
  function closeOverlay() { ovRoot.hidden = true; ovRoot.innerHTML = ''; }
  const overlayOpen = () => !ovRoot.hidden;

  function toast(html, icon = ICON.search) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = icon + `<span>${html}</span>`;
    toastRoot.appendChild(t);
    setTimeout(() => t.remove(), 3300);
  }

  /* =========================================================
   * 標題畫面
   * ========================================================= */
  function screenTitle() {
    setScreen(`<section class="title-screen">
      <div class="observer" aria-hidden="true">
        <div class="ring"></div><div class="ring r2"></div><div class="ring r3"></div>
        ${A.taiwan({ cls: 'title-map', stroke: 'currentColor', fill: 'rgba(99,199,178,.1)' })}
      </div>
      <p class="eyebrow">國小五年級・臺灣歷史互動冒險</p>
      <h1 class="game-title">時空觀測器</h1>
      <p class="subtitle">臺灣命運的抉擇</p>
      <button class="btn btn-primary" data-a="boot" id="boot-btn">啟動觀測器 ${ICON.next}</button>
      <div class="boot-log frame" hidden></div>
      <p class="title-foot">建議戴上耳機・點擊畫面中的人物和物品來探索</p>
    </section>`);
  }

  function boot() {
    SFX.unlock(); SFX.open();
    if (save.booted) { screenMenu(); return; }
    $('#boot-btn').hidden = true;
    $('.title-screen').classList.add('booting');
    const log = $('.boot-log'); log.hidden = false;
    const sys = ['時空觀測器 v1.0 啟動中……', '校正時間軸……完成', '掃描臺灣歷史座標……共 11 個章節'];
    const speech = '啟動時空觀測器……連結建立成功。你現在是歷史的觀測者，你的任務是進入特定的歷史章節，引導當時的關鍵人物做出決策。請記住，你的每一個指令，都將形塑未來臺灣的樣貌。';
    let i = 0;
    const step = () => {
      if (i < sys.length) {
        log.insertAdjacentHTML('beforeend', `<p class="sys">› ${esc(sys[i++])}</p>`);
        SFX.blip();
        setTimeout(step, reduced() ? 0 : 420);
        return;
      }
      const p = document.createElement('p'); p.className = 'speech'; log.appendChild(p);
      const chars = [...speech]; let n = 0;
      const end = () => {
        clearInterval(tm); p.textContent = speech;
        if (!$('.boot-actions', log)) log.insertAdjacentHTML('beforeend', `<div class="boot-actions"><button class="btn btn-primary" data-a="menu">選擇觀測章節 ${ICON.next}</button></div>`);
        save.booted = true; persist();
        $('.boot-actions .btn', log).focus();
      };
      if (save.settings.voice) VOICE.speak(speech);
      const tm = setInterval(() => { n++; p.textContent = chars.slice(0, n).join(''); if (n % 3 === 0) SFX.blip(); if (n >= chars.length) end(); }, reduced() ? 1 : 38);
      log.onclick = end;
    };
    step();
  }

  /* =========================================================
   * 章節選單
   * ========================================================= */
  const starRow = (n, cls = 'stars-sm') => `<span class="${cls}" aria-label="${n} 顆星">${[1, 2, 3].map(i => `<span class="${i <= n ? 'on' : ''}">${ICON.star}</span>`).join('')}</span>`;
  const totalCards = () => playable().reduce((s, u) => s + D.chapters[u.id].scenes.length, 0);

  /* 教學進度：依使用者選的課本版本，推算「這個月大約上到哪一章」 */
  const MONTH_ORDER = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];   // 一個學年的月份順序
  const sIdx = m => MONTH_ORDER.indexOf(m);
  const firstIdx = (u, b) => Math.min(...u.books[b].months.map(sIdx));
  const monthsText = ms => ms.length ? `約 ${ms.join('～')} 月` : '';
  const nowMonth = () => new Date().getMonth() + 1;

  function plan() {
    const b = save.settings.book;
    if (!b) return null;
    const m = nowMonth();
    const units = D.units.filter(u => u.books && u.books[b] && u.books[b].months.length);
    const cur = units.filter(u => u.books[b].months.includes(m));
    if (cur.length) return { kind: 'now', m, list: cur };
    let later = (m === 7 || m === 8) ? units : units.filter(u => firstIdx(u, b) > sIdx(m));
    if (!later.length) return { kind: 'done', m, list: [] };
    const first = Math.min(...later.map(u => firstIdx(u, b)));
    return { kind: (m === 7 || m === 8) ? 'summer' : 'next', m, list: later.filter(u => firstIdx(u, b) === first) };
  }

  function groups() {
    const b = save.settings.book;
    const label = { '五上': '五年級上學期', '五下': '五年級下學期', '六年級': '之後的年級' };
    const termOf = u => (b && u.books && u.books[b]) ? u.books[b].grade : u.term;
    return ['五上', '五下', '六年級'].map(t => ({ t, label: label[t], units: D.units.filter(u => termOf(u) === t) })).filter(g => g.units.length);
  }

  function nowBar() {
    const b = save.settings.book, p = plan();
    const picker = `<div class="book-pick" role="group" aria-label="我的課本版本"><span>我的課本</span>
      ${Object.entries(D.books).map(([k, n]) => `<button data-a="book" data-b="${k}" aria-pressed="${b === k}">${n}</button>`).join('')}
      <button data-a="book" data-b="" aria-pressed="${!b}">不指定</button></div>`;
    if (!p) {
      return `<section class="now-bar frame">${picker}
        <div class="now-text"><h2>選擇你的課本版本</h2><p>觀測器會依照課本進度，告訴你這個月大約上到哪一章，還會標出每章對應的單元。</p></div></section>`;
    }
    const bn = D.books[b];
    const names = p.list.length > 2
      ? `第 ${chapterNum(p.list[0].id)}～${chapterNum(p.list[p.list.length - 1].id)} 章`
      : p.list.map(u => `第 ${chapterNum(u.id)} 章「${esc(u.title)}」`).join('、');
    const first = p.list[0], bi = first && first.books[b];
    let h, sub;
    if (p.kind === 'now') { h = `這個月大約上到：${names}`; sub = `${esc(bi.unit)}${bi.lesson ? '・' + esc(bi.lesson) : ''}`; }
    else if (p.kind === 'next') { h = `下一站：${names}`; sub = `${bn}版${monthsText(bi.months)}會教到，可以先來預習！`; }
    else if (p.kind === 'summer') { h = `暑假預習：${names}`; sub = `開學後${monthsText(bi.months)}就會教到。`; }
    else { h = '五年級的歷史進度都上完了！'; sub = '挑戰還沒拿到三顆星的章節，好好複習一下吧。'; }
    const acts = p.list.map(u => (u.status === 'play' && D.chapters[u.id])
      ? `<button class="btn btn-primary" data-a="start" data-id="${u.id}">進入第 ${chapterNum(u.id)} 章 ${ICON.next}</button>`
      : `<span class="pill">第 ${chapterNum(u.id)} 章建造中</span>`).join('');
    return `<section class="now-bar frame">${picker}
      <div class="now-text"><p class="eyebrow">本月進度・${bn}版・${p.m} 月</p><h2>${h}</h2><p>${sub}</p></div>
      ${acts ? `<div class="now-actions">${acts}</div>` : ''}</section>`;
  }

  function screenMenu() {
    const got = Object.keys(save.cards).length;
    setScreen(`<section class="menu"><div class="menu-inner">
      <header class="menu-head">
        <div>
          <p class="eyebrow">時空觀測器・臺灣命運的抉擇</p>
          <h1>選擇觀測章節</h1>
          <p class="menu-sub">章節依照歷史先後排列，和五年級社會課本的順序一致。亮起的章節已可進入觀測，虛線框的章節正在建造中。</p>
        </div>
        <div class="menu-tools">
          <button class="chip-btn" data-a="notebook">${ICON.book}觀測筆記 <b>${got}/${totalCards()}</b></button>
          <button class="icon-btn" data-a="settings" aria-label="設定">${ICON.gear}</button>
        </div>
      </header>
      ${nowBar()}
      ${groups().map(g => `
        <section class="term" aria-label="${esc(g.label)}">
          <h2 class="term-title">${esc(g.label)}</h2>
          <ol class="chapters">${g.units.map(chapterCard).join('')}</ol>
        </section>`).join('')}
      <footer class="menu-foot">對應 108 課綱國小五年級社會領域（康軒、南一、翰林）。月份是依一般學校進度推估，實際以老師的安排為準。</footer>
    </div></section>`);
  }

  function chapterCard(u) {
    const play = u.status === 'play' && D.chapters[u.id];
    const done = save.done[u.id];
    const b = save.settings.book, bi = b && u.books ? u.books[b] : null;
    const isNow = bi && bi.months.includes(nowMonth());
    const status = play ? (done ? starRow(done.stars) + `<span class="pill pill-go">再玩一次</span>` : `<span class="pill pill-go">可以觀測</span>`) : `<span class="pill">建造中</span>`;
    const bookLine = bi ? `<p class="ch-book">${D.books[b]}・${esc(bi.grade)}　${esc(bi.unit)}${bi.lesson ? '・' + esc(bi.lesson) : ''}${bi.months.length ? `<b>${monthsText(bi.months)}</b>` : ''}</p>` : '';
    return `<li class="ch ${play ? 'is-play' : 'is-soon'} ${done ? 'is-done' : ''} ${isNow ? 'is-now' : ''}">
      <button class="ch-btn" ${play ? `data-a="start" data-id="${u.id}"` : 'disabled aria-disabled="true"'}>
        <div class="ch-map">${A.taiwan({ marker: u.map, stroke: 'currentColor', fill: 'rgba(255,255,255,.04)' })}</div>
        <div class="ch-body">
          <div class="ch-meta"><span class="ch-num">第 ${chapterNum(u.id)} 章・${esc(u.unit)}</span>${isNow ? '<span class="badge-now">本月</span>' : ''}</div>
          <span class="ch-year">${esc(u.year)}</span>
          <h3>${esc(u.title)}</h3>
          <p class="ch-host">控制角色：${esc(u.host)}</p>
          <p class="ch-topics">${u.topics.map(t => `<span>${esc(t)}</span>`).join('')}</p>
          ${bookLine}
        </div>
        <div class="ch-status">${status}</div>
      </button>
    </li>`;
  }

  /* =========================================================
   * 進入章節
   * ========================================================= */
  function startChapter(id) {
    C = D.chapters[id];
    S = { si: 0, stability: 100, wrong: 0, cards: [], host: C.scenes[0].host, visited: new Set(), clues: [], terms: new Set(), order: null, disabled: new Set(), res: [] };
    SFX.unlock(); SFX.warp();
    warp(() => {
      renderScene();
      dialog(C.intro, () => enterScene(0, true));
    });
  }

  // 時空跳躍：一般章節從今年倒轉到目標年份；史前章節改成「距今 ○○ 年前」往上數
  function warp(done) {
    const ago = C.warpAgo, now = new Date().getFullYear();
    const from = ago ? 0 : now, to = ago || C.year;
    setScreen('');
    showOverlay(`<div class="warp-rings">${'<i></i>'.repeat(6)}</div>
      <div class="warp-year"><small>${ago ? '距今' : '時空座標校正中'}</small><b class="wy">${from}</b><span class="era">${ago ? '年前' : '西元年'}</span></div>`, 'ov-warp');
    const el = $('.wy'), dur = reduced() ? 200 : 1700, t0 = performance.now();
    const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const tick = t1 => {
      const t = Math.min(1, (t1 - t0) / dur);
      const n = Math.round(from + (to - from) * ease(t));
      el.textContent = ago ? n.toLocaleString('en-US') : n;
      if (t < 1) { requestAnimationFrame(tick); return; }
      $('.ov-warp').classList.add('flash');
      setTimeout(() => { closeOverlay(); done(); }, reduced() ? 50 : 420);
    };
    requestAnimationFrame(tick);
  }

  function enterScene(i, already) {
    const sc = C.scenes[i];
    S.si = i; S.visited = new Set(); S.clues = []; S.order = null; S.disabled = new Set();
    const go = () => {
      S.host = sc.host;
      if (!already) renderScene();
      dialog(sc.enter || [], () => {
        const o = $('.objective'); if (o) { o.classList.add('flash'); }
        toast(`任務：${esc(sc.objective)}`);
        startIdle();
      });
    };
    if (sc.hostSwitch && i > 0) hostSwitch(sc.hostSwitch, go); else go();
  }

  function hostSwitch(h, go) {
    const from = C.cast[h.from], to = C.cast[h.to];
    SFX.warp();
    showOverlay(`<div class="panel frame jump" role="dialog" aria-label="意識跳躍">
      <p class="eyebrow">意識跳躍</p>
      <div class="jump-row">
        <div class="jp from"><div>${A.portrait(from.look)}</div><span>${esc(from.name)}</span></div>
        <div class="jump-arrow">${ICON.next}</div>
        <div class="jp to"><div>${A.portrait(to.look)}</div><span>${esc(to.name)}</span></div>
      </div>
      <p class="fb">${rich(h.text)}</p>
      <button class="btn btn-primary" data-a="jump-go">連結新角色 ${ICON.next}</button>
    </div>`);
    S.afterJump = go;
  }

  /* =========================================================
   * 場景
   * ========================================================= */
  function actorName(a) { return a.prop ? a.name : C.cast[a.cast].name; }

  function actorSVG(a, idx) {
    const isProp = !!a.prop;
    const body = isProp ? A.prop(a.prop) : A.character(C.cast[a.cast].look);
    const box = isProp ? A.propBox(a.prop, a) : [-78, -335, 156, 350];
    const top = isProp ? box[1] - 26 : (C.cast[a.cast].look.kid ? -262 : -345);
    const seen = S.visited.has(idx);
    return `<g class="actor ${isProp ? 'is-prop' : ''} ${a.host ? 'is-host' : ''} ${a.clue ? 'has-clue' : ''} ${seen ? 'seen' : ''}" data-actor="${idx}"
        transform="translate(${a.x} ${a.y}) scale(${a.s || 1})" tabindex="0" role="button" aria-label="${esc(actorName(a))}">
      ${a.host ? '<ellipse class="host-aura" cx="0" cy="0" rx="80" ry="18"/>' : ''}
      ${a.prop === 'zone' ? `<rect class="zone-outline" x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" rx="18"/>` : ''}
      <g class="actor-body"><g${a.flip ? ' transform="scale(-1 1)"' : ''}>${body}</g></g>
      <rect class="hit" x="${box[0]}" y="${box[1]}" width="${box[2]}" height="${box[3]}" fill="transparent"/>
      <g class="bubble-wrap" transform="translate(${a.prop === 'zone' ? a.w / 2 - 26 : isProp ? 0 : 40} ${a.prop === 'zone' ? 26 - a.h / 2 : top})"><g class="bubble"><circle r="22"/><text y="10" text-anchor="middle">${a.host ? '…' : isProp ? '?' : '!'}</text></g></g>
    </g>`;
  }

  function tagHTML(a, idx) {
    const s = a.s || 1;
    const topY = a.prop === 'zone' ? a.y - a.h / 2 - 34 : a.y + 22 * s;
    return `<button class="tag ${a.host ? 'tag-host' : ''} ${S.visited.has(idx) ? 'is-seen' : ''}" data-actor="${idx}" tabindex="-1" aria-hidden="true"
      style="left:${(a.x / 16).toFixed(2)}%;top:${Math.min(94, topY / 9).toFixed(2)}%">${esc(actorName(a))}${S.visited.has(idx) && a.clue ? '<span class="tick">✓</span>' : ''}</button>`;
  }

  function renderScene() {
    const sc = C.scenes[S.si], host = C.cast[S.host];
    setScreen(`<section class="game" data-bg="${sc.bg}">
      <header class="hud">
        <button class="hud-back" data-a="menu" aria-label="回到章節選單">${ICON.back}<span>章節</span></button>
        <div class="hud-where"><span class="hud-year">${esc(String(sc.era || C.year))}</span><div><b>${esc(sc.title)}</b><small>${esc(sc.time)}・${esc(sc.place)}</small></div></div>
        <div class="hud-link" title="意識連結中：${esc(host.name)}">${A.portrait(host.look)}<div><small>意識連結</small><b>${esc(host.name)}</b></div></div>
        <div class="hud-meter" title="選錯指令會讓歷史穩定度下降"><small><span>歷史穩定度</span><span class="meter-num">${S.stability}%</span></small><div class="meter ${S.stability < 60 ? 'low' : ''}"><i style="width:${S.stability}%"></i></div></div>
        <div class="hud-tools">
          <button class="icon-btn" data-a="notebook" aria-label="觀測筆記">${ICON.book}</button>
          <button class="icon-btn" data-a="settings" aria-label="設定">${ICON.gear}</button>
        </div>
      </header>
      <div class="swipe-hint" aria-hidden="true">${ICON.back} 左右滑動，探索整個場景 ${ICON.next}</div>
      <div class="stage-wrap"><div class="stage">
        <svg class="scene" viewBox="0 0 1600 900" role="img" aria-label="${esc(sc.place)}">${A.scene(sc.bg)}<g class="actors">${sc.actors.map((a, i) => [a, i]).sort((p, q) => (p[0].prop === 'zone' ? -1 : p[0].y) - (q[0].prop === 'zone' ? -1 : q[0].y)).map(([a, i]) => actorSVG(a, i)).join('')}</g></svg>
        <div class="labels">${sc.actors.map(tagHTML).join('')}</div>
      </div></div>
      <footer class="scene-bar">
        <div class="objective"><span class="obj-tag">任務 ${S.si + 1}/${C.scenes.length}</span><span class="obj-text">${esc(sc.objective)}</span></div>
        <button class="obj-clues" data-a="clues">${ICON.search}線索 <b class="clue-count">0</b>/${sc.need}</button>
        <button class="cmd" data-a="decide" disabled><span class="cmd-main">下達指令</span><small class="cmd-sub"></small></button>
      </footer>
    </section>`);
    updateClues();
    // 直式手機時，先把畫面捲到中間（主角站的位置）
    const wrap = $('.stage-wrap'), stage = $('.stage');
    if (wrap && stage && stage.offsetWidth > wrap.clientWidth) {
      wrap.scrollLeft = (stage.offsetWidth - wrap.clientWidth) / 2;
      const hint = $('.swipe-hint');
      const hide = () => hint && hint.classList.add('gone');
      setTimeout(() => wrap.addEventListener('scroll', hide, { once: true, passive: true }), 400);
      setTimeout(hide, 6000);
    }
  }

  function updateClues() {
    const sc = C.scenes[S.si], n = S.clues.length, ready = n >= sc.need;
    const cc = $('.clue-count'); if (cc) cc.textContent = n;
    const b = $('.cmd'); if (!b) return;
    b.disabled = !ready;
    $('.cmd-sub', b).textContent = ready ? '線索足夠了！' : `再蒐集 ${sc.need - n} 條線索`;
  }

  function updateMeter() {
    const m = $('.meter'); if (!m) return;
    $('i', m).style.width = S.stability + '%';
    m.classList.toggle('low', S.stability < 60);
    const num = $('.meter-num'); if (num) num.textContent = S.stability + '%';
  }

  function talk(idx) {
    if (Dlg.active || overlayOpen()) return;
    const sc = C.scenes[S.si], a = sc.actors[idx];
    if (!a) return;
    const first = !S.visited.has(idx);
    const src = (!first && a.again) ? a.again : a.lines;
    const lines = src.map(l => typeof l === 'string' ? { who: a.cast || 'narrator', text: l } : l);
    SFX.click();
    dialog(lines, () => {
      if (!first) return;
      S.visited.add(idx);
      const g = $(`.actor[data-actor="${idx}"]`); if (g) g.classList.add('seen');
      const tag = $(`.tag[data-actor="${idx}"]`);
      if (tag) { tag.classList.add('is-seen'); if (a.clue) tag.insertAdjacentHTML('beforeend', '<span class="tick">✓</span>'); }
      if (a.clue) {
        S.clues.push(a.clue);
        SFX.clue();
        toast(`<b>獲得線索</b>　${esc(a.clue)}`);
        updateClues();
        if (S.clues.length === sc.need) setTimeout(() => toast('線索足夠了！可以按右下角「下達指令」', ICON.check), 900);
      }
    });
  }

  /* 配角閒聊泡泡：讓場景有生命感 */
  function startIdle() {
    clearInterval(idleTimer);
    idleTimer = setInterval(() => {
      if (Dlg.active || overlayOpen() || document.hidden) return;
      const sc = C.scenes[S.si], labels = $('.labels'); if (!labels) return;
      const pool = sc.actors.map((a, i) => [a, i]).filter(([a]) => a.idle);
      if (!pool.length) return;
      const [a] = pool[Math.floor(Math.random() * pool.length)];
      const s = a.s || 1, kid = C.cast[a.cast] && C.cast[a.cast].look.kid;
      const b = document.createElement('div');
      b.className = 'idle-bubble';
      b.textContent = a.idle;
      b.style.left = (a.x / 16) + '%';
      b.style.top = Math.max(4, (a.y - (kid ? 270 : 350) * s) / 9) + '%';
      labels.appendChild(b);
      setTimeout(() => b.remove(), 2900);
    }, 4200);
  }

  /* =========================================================
   * 抉擇
   * ========================================================= */
  function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

  function openDecision() {
    const sc = C.scenes[S.si], d = sc.decision, host = C.cast[S.host];
    if (!S.order) S.order = shuffle(d.options.map((_, i) => i));
    SFX.open();
    showOverlay(`<div class="panel frame decision" role="dialog" aria-labelledby="dq">
      <div class="panel-head"><div class="mini-portrait">${A.portrait(host.look)}</div><div><small>意識連結中・下達指令</small><b>${esc(host.name)}</b></div></div>
      <p class="decision-q" id="dq">${rich(d.prompt)}</p>
      <ol class="opts">${S.order.map((oi, k) => `<li><button class="opt" data-a="choose" data-opt="${oi}" ${S.disabled.has(oi) ? 'disabled' : ''}>
        <span class="opt-key">${'ABCD'[k]}</span><span class="opt-text">${rich(d.options[oi].text)}</span></button></li>`).join('')}</ol>
      <details class="clue-recap" ${S.disabled.size ? 'open' : ''}><summary>${ICON.search}你蒐集到的線索（${S.clues.length}）</summary>
        <ul>${S.clues.map(c => `<li>${esc(c)}</li>`).join('')}</ul></details>
      <div class="panel-actions"><button class="btn btn-ghost" data-a="close-ov">再去四周看看</button></div>
    </div>`, 'ov-decision');
  }

  function choose(oi) {
    const d = C.scenes[S.si].decision, o = d.options[oi];
    collectTerms(o.fb);
    if (o.ok) {
      SFX.success();
      showOverlay(`<div class="panel frame success" role="alertdialog" aria-labelledby="okh">
        <div class="ok-head" id="okh">${ICON.check}<b>指令成功</b><span>歷史軌道穩定</span></div>
        <p class="fb">${rich(o.fb)}</p>
        <div class="panel-actions"><button class="btn btn-primary" data-a="card">取得知識卡 ${ICON.next}</button></div>
      </div>`);
    } else {
      SFX.warn();
      S.wrong++; S.stability = Math.max(10, S.stability - 15); S.disabled.add(oi);
      updateMeter();
      app.classList.remove('glitch'); void app.offsetWidth; app.classList.add('glitch');
      showOverlay(`<div class="panel frame warn" role="alertdialog" aria-labelledby="wh">
        <div class="warn-head" id="wh">${ICON.warn}<b>時空警告！</b><span>歷史正在偏移……</span></div>
        <p class="fb">${rich(o.fb)}</p>
        <p class="warn-meter">歷史穩定度 −15%（目前 ${S.stability}%）</p>
        <div class="panel-actions"><button class="btn btn-danger" data-a="retry">撤回指令，重新選擇</button></div>
      </div>`);
    }
  }

  function showCard() {
    const card = C.scenes[S.si].decision.card;
    SFX.card();
    showOverlay(`<div class="card-stage">
      ${cardHTML(card, C)}
      <button class="btn btn-primary" data-a="card-next">收進觀測筆記 ${ICON.next}</button>
    </div>`);
  }
  function cardHTML(card, ch) {
    return `<article class="kcard">
      <div class="kcard-top"><span class="kcard-era">${esc(card.year)}</span><span>第 ${chapterNum(ch.id)} 章・${esc(ch.title)}</span></div>
      <h3>${esc(card.title)}</h3>
      <p>${esc(card.body)}</p>
      <div class="kcard-today"><b>連結今天</b><p>${esc(card.today)}</p></div>
      <div class="kcard-stamp">觀測紀錄</div>
    </article>`;
  }

  function cardNext() {
    const card = C.scenes[S.si].decision.card;
    save.cards[card.id] = C.id; persist();
    if (!S.cards.includes(card.id)) S.cards.push(card.id);
    closeOverlay();
    if (S.si + 1 < C.scenes.length) enterScene(S.si + 1);
    else { clearInterval(idleTimer); dialog(C.outro, startQuiz); }
  }

  /* =========================================================
   * 歷史修正檢驗
   * ========================================================= */
  function startQuiz() { S.q = 0; S.score = 0; S.res = []; renderQuiz(); }

  function renderQuiz() {
    const q = C.quiz[S.q], tf = q.type === 'tf';
    setScreen(`<section class="quiz"><div class="quiz-inner">
      <header class="quiz-head">
        <div><p class="eyebrow">歷史修正檢驗・第 ${chapterNum(C.id)} 章</p><h1>第 ${S.q + 1} 題 / 共 ${C.quiz.length} 題</h1></div>
        <ol class="quiz-dots" aria-hidden="true">${C.quiz.map((_, i) => `<li class="${i < S.q ? (S.res[i] ? 'ok' : 'no') : i === S.q ? 'now' : ''}"></li>`).join('')}</ol>
      </header>
      <article class="qcard frame">
        <span class="qtag">${esc(q.tag)}</span>
        <h2 class="qtext">${rich(q.q)}</h2>
        <div class="qopts ${tf ? 'is-tf' : ''}">
          ${tf
            ? `<button class="qopt" data-a="answer" data-v="1"><span class="tf-mark">○</span>正確</button><button class="qopt" data-a="answer" data-v="0"><span class="tf-mark">✕</span>錯誤</button>`
            : q.options.map((o, i) => `<button class="qopt" data-a="answer" data-v="${i}"><span class="opt-key">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('')}
        </div>
        <div class="qfb" hidden aria-live="polite"></div>
      </article>
    </div></section>`);
  }

  function answer(v) {
    const q = C.quiz[S.q], tf = q.type === 'tf';
    if (S.res[S.q] !== undefined) return;
    const correct = tf ? (v === 1) === q.answer : v === q.answer;
    S.res[S.q] = correct; if (correct) S.score++;
    const rightV = tf ? (q.answer ? 1 : 0) : q.answer;
    document.querySelectorAll('.qopt').forEach(b => {
      const bv = +b.dataset.v; b.disabled = true;
      if (bv === rightV) b.classList.add('is-right');
      else if (bv === v) b.classList.add('is-wrong');
    });
    const last = S.q + 1 >= C.quiz.length;
    const rightText = tf ? (q.answer ? '○ 正確' : '✕ 錯誤') : `${'ABCD'[q.answer]}．${q.options[q.answer]}`;
    const fb = $('.qfb');
    fb.innerHTML = `<p class="qfb-head ${correct ? 'ok' : 'no'}">${correct ? '答對了！歷史紀錄修正成功' : `差一點！正確答案是「${esc(rightText)}」`}</p>
      <p>${rich(q.explain)}</p>
      <button class="btn btn-primary" data-a="qnext">${last ? '查看觀測報告' : '下一題'} ${ICON.next}</button>`;
    fb.hidden = false;
    collectTerms(q.explain);
    correct ? SFX.success() : SFX.warn();
    $('.btn', fb).focus({ preventScroll: true });
    fb.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' });
  }

  /* =========================================================
   * 觀測報告
   * ========================================================= */
  function report() {
    const total = C.quiz.length;
    const stars = S.score === total ? 3 : S.score >= Math.ceil(total * 0.6) ? 2 : 1;
    const prev = save.done[C.id] || {};
    save.done[C.id] = { stars: Math.max(stars, prev.stars || 0), best: Math.max(S.score, prev.best || 0), total };
    persist();
    const list = playable(), idx = list.findIndex(u => u.id === C.id), next = list[idx + 1];
    const cards = C.scenes.map(s => s.decision.card);
    const terms = [...S.terms].filter(define);
    const msg = stars === 3 ? '完美觀測！你已經是這段歷史的專家了。' : stars === 2 ? '觀測成功！再複習一下知識卡，就能拿到三顆星。' : '觀測完成！打開觀測筆記複習，再挑戰一次吧。';
    setScreen(`<section class="report"><div class="report-inner">
      <p class="eyebrow">觀測報告</p>
      <h1>第 ${chapterNum(C.id)} 章　${esc(C.title)}</h1>
      ${starRow(stars, 'stars')}
      <p>${msg}</p>
      <dl class="stats">
        <div><dt>檢驗答對</dt><dd>${S.score}/${total}</dd></div>
        <div><dt>歷史穩定度</dt><dd>${S.stability}%</dd></div>
        <div><dt>知識卡</dt><dd>${S.cards.length}</dd></div>
      </dl>
      <h2>這一章蒐集的知識卡</h2>
      <div class="nb-grid">${cards.map(c => `<div class="mcard"><small>${esc(c.year)}</small><b>${esc(c.title)}</b><p>${esc(c.body)}</p></div>`).join('')}</div>
      ${terms.length ? `<h2>你學會的關鍵詞（點一下看解釋）</h2><p class="term-chips">${terms.map(t => `<span class="kw" data-term="${esc(t)}">${esc(t)}</span>`).join('')}</p>` : ''}
      <div class="report-actions">
        <button class="btn btn-ghost" data-a="start" data-id="${C.id}">再玩一次</button>
        <button class="btn btn-ghost" data-a="menu">回到章節選單</button>
        ${next ? `<button class="btn btn-primary" data-a="start" data-id="${next.id}">前往第 ${chapterNum(next.id)} 章 ${ICON.next}</button>` : ''}
      </div>
    </div></section>`);
  }

  /* =========================================================
   * 觀測筆記・線索・設定
   * ========================================================= */
  function openNotebook(tab = 'cards') {
    const chs = playable().map(u => D.chapters[u.id]);
    let body;
    if (tab === 'cards') {
      body = chs.map(ch => `<section class="nb-ch"><h3>第 ${chapterNum(ch.id)} 章・${esc(String(ch.yearLabel || ch.year))}　${esc(ch.title)}</h3>
        <div class="nb-grid">${ch.scenes.map(s => {
          const c = s.decision.card;
          return save.cards[c.id] ? `<div class="mcard"><small>${esc(c.year)}</small><b>${esc(c.title)}</b><p>${esc(c.body)}</p></div>`
            : `<div class="mcard locked"><b>？？？</b><span>尚未觀測</span></div>`;
        }).join('')}</div></section>`).join('');
    } else {
      body = chs.map(ch => {
        const ts = Object.keys(save.terms).filter(t => save.terms[t] === ch.id && ch.glossary[t]);
        return `<section class="nb-ch"><h3>第 ${chapterNum(ch.id)} 章・${esc(ch.title)}（${ts.length}/${Object.keys(ch.glossary).length}）</h3>
          ${ts.length ? `<dl class="terms">${ts.map(t => `<div><dt>${esc(t)}</dt><dd>${esc(ch.glossary[t])}</dd></div>`).join('')}</dl>` : '<p class="nb-empty">還沒有蒐集到這一章的關鍵詞。對話中亮黃色的字就是關鍵詞！</p>'}
        </section>`;
      }).join('');
    }
    showOverlay(`<div class="panel frame notebook" role="dialog" aria-labelledby="nbh">
      <div class="panel-head"><h2 id="nbh">觀測筆記</h2><button class="icon-btn panel-close" data-a="close-ov" aria-label="關閉">${ICON.close}</button></div>
      <div class="nb-tabs" role="tablist">
        <button role="tab" aria-selected="${tab === 'cards'}" data-a="nb-tab" data-t="cards">知識卡 ${Object.keys(save.cards).length}/${totalCards()}</button>
        <button role="tab" aria-selected="${tab === 'terms'}" data-a="nb-tab" data-t="terms">關鍵詞 ${Object.keys(save.terms).length}</button>
      </div>
      <div class="nb-body">${body}</div>
    </div>`);
  }

  function openClues() {
    const sc = C.scenes[S.si];
    showOverlay(`<div class="panel frame" role="dialog" aria-labelledby="clh">
      <div class="panel-head"><h2 id="clh">線索 ${S.clues.length}/${sc.need}</h2><button class="icon-btn panel-close" data-a="close-ov" aria-label="關閉">${ICON.close}</button></div>
      ${S.clues.length ? `<ul>${S.clues.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : '<p class="nb-empty">還沒有線索。點擊頭上有「!」或「?」的人物和物品，聽聽他們怎麼說。</p>'}
      <p class="nb-empty">任務：${esc(sc.objective)}</p>
    </div>`);
  }

  function openSettings(confirmReset = false) {
    const st = save.settings;
    showOverlay(`<div class="panel frame" role="dialog" aria-labelledby="sth">
      <div class="panel-head"><h2 id="sth">設定</h2><button class="icon-btn panel-close" data-a="close-ov" aria-label="關閉">${ICON.close}</button></div>
      <ul class="settings-list">
        <li class="setting"><label for="set-sound">音效<small>點擊、打字、成功與警告的聲音</small></label><input type="checkbox" class="switch" id="set-sound" data-set="sound" ${st.sound ? 'checked' : ''}></li>
        ${VOICE.supported ? `<li class="setting"><label for="set-voice">語音朗讀<small>用裝置內建的中文語音唸出對話</small></label><input type="checkbox" class="switch" id="set-voice" data-set="voice" ${st.voice ? 'checked' : ''}></li>` : ''}
        <li class="setting"><span>文字速度</span><div class="seg" role="group" aria-label="文字速度">
          ${['立即', '慢', '中', '快'].map((l, i) => [i, l]).slice(1).concat([[0, '立即']]).map(([i, l]) => `<button data-a="speed" data-v="${i}" aria-pressed="${st.speed === i}">${l}</button>`).join('')}
        </div></li>
        <li class="setting"><span>清除進度<small>星星、知識卡和關鍵詞會全部歸零</small></span>
          <div class="danger-zone">${confirmReset
            ? `<p>確定要清除嗎？這個動作無法復原。</p><button class="btn btn-ghost" data-a="settings">取消</button><button class="btn btn-danger" data-a="reset-yes">確定清除</button>`
            : `<button class="btn btn-ghost" data-a="reset">清除</button>`}</div></li>
      </ul>
    </div>`);
  }

  /* =========================================================
   * 事件
   * ========================================================= */
  const actions = {
    boot, menu: screenMenu,
    start: el => startChapter(el.dataset.id),
    decide: () => openDecision(),
    choose: el => choose(+el.dataset.opt),
    retry: () => openDecision(),
    card: () => showCard(),
    'card-next': () => cardNext(),
    'jump-go': () => { closeOverlay(); const g = S.afterJump; S.afterJump = null; g && g(); },
    answer: el => answer(+el.dataset.v),
    qnext: () => { S.q++; if (S.q < C.quiz.length) renderQuiz(); else report(); },
    notebook: () => openNotebook(),
    'nb-tab': el => openNotebook(el.dataset.t),
    clues: () => openClues(),
    settings: () => openSettings(),
    speed: el => { save.settings.speed = +el.dataset.v; persist(); openSettings(); },
    book: el => { save.settings.book = el.dataset.b || null; persist(); const y = $('.menu') ? $('.menu').scrollTop : 0; screenMenu(); if ($('.menu')) $('.menu').scrollTop = y; },
    reset: () => openSettings(true),
    'reset-yes': () => { const s = save.settings; save = fresh(); save.settings = s; save.booted = true; persist(); closeOverlay(); screenMenu(); toast('進度已清除', ICON.check); },
    'close-ov': () => closeOverlay()
  };

  document.addEventListener('click', e => {
    if (closePop() && !e.target.closest('.kw')) return;
    const kw = e.target.closest('.kw');
    if (kw) { e.stopPropagation(); showTerm(kw.dataset.term, kw); return; }
    if (e.target.closest('#dialog .dlg')) { Dlg.next(); return; }
    const act = e.target.closest('[data-a]');
    if (act && !act.disabled) { const f = actions[act.dataset.a]; if (f) { if (act.dataset.a !== 'speed') SFX.click(); f(act); } return; }
    const actor = e.target.closest('.stage [data-actor]');
    if (actor) talk(+actor.dataset.actor);
    if (e.target.classList && e.target.classList.contains('ov') && !e.target.classList.contains('ov-warp') && $('.panel-close', e.target)) closeOverlay();
  });

  document.addEventListener('change', e => {
    const k = e.target.dataset && e.target.dataset.set;
    if (!k) return;
    save.settings[k] = e.target.checked; persist();
    if (k === 'sound') SFX.setOn(e.target.checked);
    if (k === 'voice' && !e.target.checked) VOICE.stop();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (closePop()) return;
      if (overlayOpen() && $('.panel-close, [data-a="close-ov"]', ovRoot)) { closeOverlay(); return; }
    }
    if (Dlg.active && !overlayOpen() && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault(); Dlg.next(); return;
    }
    const actor = e.target.closest && e.target.closest('.actor');
    if (actor && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); talk(+actor.dataset.actor); }
  });

  screenTitle();
})();
