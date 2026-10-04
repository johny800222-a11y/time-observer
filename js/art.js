/* 時空觀測器・美術模組
 * 全部畫面都用 SVG 程式繪製（不需要圖片檔），所以檔案小、可離線、可任意縮放。
 *   ART.character(look)  Q 版人物（原點在腳底中心，高約 300）
 *   ART.portrait(look)   對話框用的頭像（完整 <svg>）
 *   ART.prop(type)       可點擊的物品（原點在底部中心）
 *   ART.propBox(type)    物品的點擊範圍
 *   ART.scene(id)        1600×900 的場景背景
 *   ART.taiwan(...)      臺灣輪廓小地圖
 */
window.ART = (function () {
  'use strict';

  /* ---------- 小工具 ---------- */
  const shade = (hex, amt) => {           // amt: -1 ~ 1，負數變暗、正數變亮
    const n = parseInt(hex.slice(1), 16);
    let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  const INK = '#2B1D14';

  /* =========================================================
   * 人物
   * ========================================================= */
  const HEAD_Y = -205, HEAD_R = 50;

  function backHair(c) {
    const h = c.hair || '#222';
    switch (c.hairStyle) {
      case 'long':
        return `<path d="M-54 -214 Q-64 -150 -44 -128 L44 -128 Q64 -150 54 -214 Z" fill="${h}"/>`;
      case 'womanlong':
        return `<path d="M-56 -214 Q-70 -130 -50 -110 L50 -110 Q70 -130 56 -214 Z" fill="${h}"/>`;
      case 'curly':
        return `<path d="M-56 -214 Q-70 -160 -52 -138 Q-40 -150 -36 -170 L36 -170 Q40 -150 52 -138 Q70 -160 56 -214 Z" fill="${h}"/>
          <circle cx="-58" cy="-160" r="12" fill="${h}"/><circle cx="58" cy="-160" r="12" fill="${h}"/>
          <circle cx="-54" cy="-140" r="10" fill="${h}"/><circle cx="54" cy="-140" r="10" fill="${h}"/>`;
      case 'wild':   // 史前人物：蓬鬆長髮
        return `<path d="M-58 -214 Q-72 -160 -58 -116 L-48 -132 L-40 -110 L-28 -130 L28 -130 L40 -110 L48 -132 L58 -116 Q72 -160 58 -214 Z" fill="${h}"/>`;
      default: return '';
    }
  }

  function frontHair(c) {
    const h = c.hair || '#222';
    const cap = `<path d="M-52 -206 Q-56 -262 0 -263 Q56 -262 52 -206 Q46 -232 18 -238 Q0 -230 -18 -238 Q-46 -232 -52 -206 Z" fill="${h}"/>`;
    switch (c.hairStyle) {
      case 'bald': return '';
      case 'bun':
        return cap + `<ellipse cx="0" cy="-266" rx="17" ry="14" fill="${h}"/><rect x="-18" y="-262" width="36" height="5" rx="2" fill="${shade(h, 0.25)}"/>`;
      case 'kidbun':
        return cap + `<circle cx="-30" cy="-252" r="13" fill="${h}"/><circle cx="30" cy="-252" r="13" fill="${h}"/>`;
      case 'kid':
        return cap + `<path d="M-6 -262 Q4 -284 16 -270 Q6 -268 2 -258 Z" fill="${h}"/>`;
      case 'womanlong':
        return `<path d="M-54 -200 Q-58 -264 0 -264 Q58 -264 54 -200 Q50 -236 6 -244 L0 -232 L-6 -244 Q-50 -236 -54 -200 Z" fill="${h}"/>`;
      case 'queue':  // 清代：前額剃髮，後腦留辮
        return `<path d="M-50 -214 Q-52 -258 0 -260 Q52 -258 50 -214 Q30 -246 0 -248 Q-30 -246 -50 -214 Z" fill="${shade(c.skin || '#EBC39C', -0.1)}"/>
          <path d="M-52 -206 Q-56 -226 -46 -238 L-44 -210 Z M52 -206 Q56 -226 46 -238 L44 -210 Z" fill="${h}"/>
          <g fill="${h}"><ellipse cx="50" cy="-170" rx="7" ry="10"/><ellipse cx="54" cy="-152" rx="6.5" ry="9.5"/><ellipse cx="57" cy="-135" rx="6" ry="9"/><ellipse cx="59" cy="-119" rx="5" ry="8"/></g>
          <path d="M56 -110 l4 14 l4 -14 Z" fill="${shade(h, 0.3)}"/>`;
      case 'chonmage': // 江戶時代町人髮型
        return `<path d="M-52 -200 Q-54 -236 -40 -246 L-34 -214 Z M52 -200 Q54 -236 40 -246 L34 -214 Z" fill="${h}"/>
          <path d="M-40 -246 Q0 -262 40 -246 Q20 -252 0 -253 Q-20 -252 -40 -246 Z" fill="${shade(c.skin || '#F1CDA8', -0.12)}"/>
          <rect x="-6" y="-272" width="12" height="26" rx="5" fill="${h}" transform="rotate(-10 0 -258)"/>`;
      case 'curly':
        return `<path d="M-54 -204 Q-58 -264 0 -265 Q58 -264 54 -204 Q50 -236 0 -242 Q-50 -236 -54 -204 Z" fill="${h}"/>`;
      case 'long':
        return `<path d="M-54 -200 Q-58 -264 0 -264 Q58 -264 54 -200 Q48 -232 0 -238 Q-48 -232 -54 -200 Z" fill="${h}"/>`;
      case 'wild':
        return `<path d="M-55 -198 Q-62 -268 0 -270 Q62 -268 55 -198 L47 -226 L37 -212 L29 -236 L17 -220 L7 -242 L-5 -222 L-16 -240 L-26 -218 L-36 -236 L-45 -212 Z" fill="${h}"/>`;
      default: return cap;
    }
  }

  function face(c) {
    const e = c.expr || 'smile';
    let eyes, brows, mouth;
    const eyeL = `<ellipse cx="-18" cy="-198" rx="5.2" ry="6.8" fill="${INK}"/><circle cx="-16.4" cy="-200.6" r="1.9" fill="#fff"/>`;
    const eyeR = `<ellipse cx="18" cy="-198" rx="5.2" ry="6.8" fill="${INK}"/><circle cx="19.6" cy="-200.6" r="1.9" fill="#fff"/>`;
    const bc = c.beardColor || c.hair || INK;
    switch (e) {
      case 'happy':
        eyes = `<path d="M-24 -196 q6 -9 12 0 M12 -196 q6 -9 12 0" stroke="${INK}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
        brows = `<path d="M-26 -214 q8 -5 15 -1 M11 -215 q8 -4 15 1" stroke="${bc}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M-10 -180 q10 13 20 0 Z" fill="#8E3B2E"/><path d="M-6 -176 q6 5 12 0" fill="#E8857A"/>`;
        break;
      case 'worry':
        eyes = eyeL + eyeR;
        brows = `<path d="M-27 -211 L-10 -217 M10 -217 L27 -211" stroke="${bc}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M-8 -177 q4 -4 8 0 q4 4 8 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        break;
      case 'serious':
        eyes = eyeL + eyeR;
        brows = `<path d="M-27 -216 L-10 -211 M10 -211 L27 -216" stroke="${bc}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M-8 -177 L8 -177" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
        break;
      default:
        eyes = eyeL + eyeR;
        brows = `<path d="M-26 -213 q8 -4 15 0 M11 -213 q8 -4 15 0" stroke="${bc}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
        mouth = `<path d="M-9 -179 q9 8 18 0" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
    }
    const blush = `<ellipse cx="-30" cy="-184" rx="8" ry="4.5" fill="#F28B82" opacity=".42"/><ellipse cx="30" cy="-184" rx="8" ry="4.5" fill="#F28B82" opacity=".42"/>`;
    return brows + eyes + blush + mouth;
  }

  function beard(c) {
    const b = c.beardColor || INK;
    const mus = `<path d="M-15 -183 Q-7 -190 0 -184 Q7 -190 15 -183 Q7 -179 0 -182 Q-7 -179 -15 -183 Z" fill="${b}"/>`;
    switch (c.beard) {
      case 'mustache': return mus;
      case 'goatee': return mus + `<path d="M-6 -170 Q0 -150 6 -170 Z" fill="${b}"/>`;
      case 'vandyke': return mus + `<path d="M-8 -171 Q0 -146 8 -171 Q0 -166 -8 -171 Z" fill="${b}"/>`;
      case 'longbeard':
        return mus + `<path d="M-9 -172 Q-4 -122 0 -112 Q4 -122 9 -172 Q0 -166 -9 -172 Z" fill="${b}"/>
          <path d="M-30 -178 Q-34 -150 -30 -136" stroke="${b}" stroke-width="3" fill="none"/><path d="M30 -178 Q34 -150 30 -136" stroke="${b}" stroke-width="3" fill="none"/>`;
      case 'full':
        return `<path d="M-46 -196 Q-46 -150 0 -146 Q46 -150 46 -196 Q40 -172 22 -170 Q12 -176 0 -174 Q-12 -176 -22 -170 Q-40 -172 -46 -196 Z" fill="${b}"/>` + mus +
          `<path d="M-8 -178 q8 6 16 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      default: return '';
    }
  }

  function hat(c) {
    const k = c.hatColor || '#2A2A30';
    switch (c.hat) {
      case 'cavalier':
        return `<ellipse cx="0" cy="-246" rx="82" ry="15" fill="${k}"/>
          <path d="M-40 -248 Q-42 -296 0 -298 Q42 -296 40 -248 Z" fill="${k}"/>
          <rect x="-41" y="-262" width="82" height="9" fill="${shade(k, 0.35)}"/>
          <path d="M18 -284 Q72 -326 92 -270 Q62 -294 24 -262 Z" fill="#F5F1E8"/>
          <path d="M28 -276 Q60 -300 84 -276" stroke="#D9D2C2" stroke-width="2" fill="none"/>`;
      case 'skullcap':
        return `<path d="M-40 -246 Q0 -276 40 -246 Q0 -252 -40 -246 Z" fill="${k}"/>`;
      case 'beanie':
        return `<path d="M-51 -224 Q-52 -276 0 -278 Q52 -276 51 -224 Z" fill="${k}"/>
          <rect x="-54" y="-236" width="108" height="16" rx="7" fill="${shade(k, -0.18)}"/>
          <path d="M-30 -270 L-30 -240 M0 -276 L0 -240 M30 -270 L30 -240" stroke="${shade(k, -0.12)}" stroke-width="3"/>`;
      case 'bandana':
        return `<path d="M-53 -214 Q-54 -268 0 -270 Q54 -268 53 -214 Q30 -230 0 -232 Q-30 -230 -53 -214 Z" fill="${k}"/>
          <path d="M48 -226 L70 -214 L62 -236 Z" fill="${shade(k, -0.15)}"/>`;
      case 'wrap':     // 明代網巾／頭巾
        return `<path d="M-46 -236 Q0 -276 46 -236 L44 -226 Q0 -244 -44 -226 Z" fill="${k}"/>
          <ellipse cx="0" cy="-268" rx="20" ry="16" fill="${k}"/>
          <path d="M14 -262 Q40 -250 34 -226" stroke="${k}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      case 'scholar':  // 明代方巾
        return `<path d="M-42 -230 L-38 -292 L38 -292 L42 -230 Q0 -240 -42 -230 Z" fill="${k}"/>
          <path d="M-38 -292 L0 -280 L38 -292" stroke="${shade(k, 0.3)}" stroke-width="3" fill="none"/>
          <path d="M0 -280 L0 -236" stroke="${shade(k, 0.3)}" stroke-width="2"/>`;
      case 'helmet':   // 明軍頭盔
        return `<path d="M-50 -220 Q-52 -282 0 -284 Q52 -282 50 -220 Z" fill="${k}"/>
          <rect x="-56" y="-232" width="112" height="14" rx="6" fill="${shade(k, -0.2)}"/>
          <path d="M-4 -284 L0 -312 L4 -284 Z" fill="${shade(k, -0.25)}"/>
          <path d="M0 -306 Q-14 -298 -10 -282 Q0 -292 10 -282 Q14 -298 0 -306 Z" fill="#C0392B"/>
          <path d="M-56 -224 Q-62 -196 -50 -180 L-44 -222 Z M56 -224 Q62 -196 50 -180 L44 -222 Z" fill="${shade(k, -0.1)}"/>`;
      case 'soldiercap':
        return `<path d="M-50 -222 Q-50 -272 0 -274 Q50 -272 50 -222 Z" fill="${k}"/>
          <rect x="-54" y="-232" width="108" height="12" rx="5" fill="${shade(k, -0.25)}"/>
          <circle cx="0" cy="-276" r="7" fill="#C0392B"/>`;
      case 'liuhe':    // 六合帽（瓜皮帽的前身）
      case 'guapi':
        return `<path d="M-48 -230 Q-48 -276 0 -277 Q48 -276 48 -230 Z" fill="${k}"/>
          <path d="M-24 -272 L-28 -232 M0 -277 L0 -232 M24 -272 L28 -232" stroke="${shade(k, 0.25)}" stroke-width="2"/>
          <rect x="-50" y="-236" width="100" height="9" rx="4" fill="${shade(k, 0.12)}"/>
          <circle cx="0" cy="-280" r="6.5" fill="${c.button || '#C0392B'}"/>`;
      case 'qing':     // 清代官帽（涼帽）＋頂戴、花翎
        return `<path d="M-30 -270 Q-80 -286 -112 -300 Q-70 -270 -40 -258 Z" fill="#2F6E5E"/>
          <circle cx="-96" cy="-292" r="8" fill="#1E3A6E"/><circle cx="-96" cy="-292" r="4" fill="#E9C46A"/>
          <path d="M-66 -234 Q0 -300 66 -234 Q0 -248 -66 -234 Z" fill="${k}"/>
          <path d="M-52 -240 Q0 -296 52 -240 Q0 -250 -52 -240 Z" fill="#B8322A"/>
          <path d="M-36 -254 L-46 -240 M-18 -266 L-24 -246 M0 -272 L0 -248 M18 -266 L24 -246 M36 -254 L46 -240" stroke="#8E2420" stroke-width="2.5"/>
          <circle cx="0" cy="-280" r="9" fill="${c.button || '#C0392B'}"/><circle cx="-3" cy="-283" r="3" fill="#fff" opacity=".6"/>`;
      case 'turban':
        return `<path d="M-54 -218 Q-56 -270 0 -272 Q56 -270 54 -218 Q0 -236 -54 -218 Z" fill="${k}"/>
          <path d="M-54 -230 Q0 -250 54 -230 M-52 -246 Q0 -264 52 -246" stroke="${shade(k, 0.2)}" stroke-width="3" fill="none"/>`;
      case 'straw':
        return `<path d="M-96 -232 L0 -296 L96 -232 Q0 -218 -96 -232 Z" fill="${k}"/>
          <path d="M-60 -246 L0 -288 L60 -246 M-30 -238 L0 -292 L30 -238" stroke="${shade(k, -0.18)}" stroke-width="2" fill="none"/>
          <path d="M-40 -230 Q-44 -190 -38 -170 M40 -230 Q44 -190 38 -170" stroke="${shade(k, -0.35)}" stroke-width="1.5" fill="none"/>`;
      case 'bowler':
        return `<ellipse cx="0" cy="-244" rx="62" ry="11" fill="${k}"/>
          <path d="M-40 -246 Q-42 -296 0 -298 Q42 -296 40 -246 Z" fill="${k}"/>
          <rect x="-41" y="-258" width="82" height="7" fill="${shade(k, 0.3)}"/>`;
      case 'flatcap':
        return `<path d="M-52 -228 Q-50 -270 4 -270 Q52 -268 54 -232 Q10 -238 -52 -228 Z" fill="${k}"/>
          <path d="M-56 -230 Q-20 -222 30 -228 Q-10 -240 -56 -230 Z" fill="${shade(k, -0.2)}"/>`;
      case 'featherband':
        return `<rect x="-53" y="-236" width="106" height="12" rx="5" fill="${k}"/>
          <path d="M-53 -230 L53 -230" stroke="#F2E6C8" stroke-width="3" stroke-dasharray="6 6"/>
          <path d="M30 -236 Q44 -290 62 -306 Q52 -270 40 -234 Z" fill="#F2E6C8"/>
          <path d="M40 -240 Q50 -276 60 -300" stroke="${INK}" stroke-width="1.5" fill="none"/>`;
      case 'flowerband':
        return `<rect x="-54" y="-238" width="108" height="11" rx="5" fill="#2E7D5B"/>
          ${[-40, -20, 0, 20, 40].map((x, i) => `<circle cx="${x}" cy="-238" r="${i % 2 ? 7 : 9}" fill="${i % 2 ? '#F2E6C8' : k}"/><circle cx="${x}" cy="-238" r="3" fill="#C0392B"/>`).join('')}`;
      case 'furcap':      // 布農族獵人的皮帽
        return `<path d="M-50 -218 Q-52 -274 0 -276 Q52 -274 50 -218 Z" fill="${k}"/>
          <path d="M-20 -268 Q0 -280 20 -268" stroke="${shade(k, 0.25)}" stroke-width="3" fill="none"/>
          <path d="M-55 -222 Q0 -240 55 -222" stroke="${shade(k, 0.4)}" stroke-width="11" stroke-linecap="round" fill="none"/>`;
      case 'eaglefeather': {  // 排灣族頭飾：熊鷹羽毛（象徵身分）
        const f = (x, r) => `<g transform="translate(${x} -236) rotate(${r})"><path d="M0 0 Q-12 -42 0 -90 Q12 -42 0 0 Z" fill="#F4F0E6"/><path d="M0 -62 Q-8 -76 0 -90 Q8 -76 0 -62 Z" fill="#2B2B2B"/><path d="M0 0 L0 -84" stroke="#9C9688" stroke-width="1.5"/></g>`;
        return f(-24, -16) + f(0, 0) + f(24, 16) +
          `<rect x="-55" y="-244" width="110" height="18" rx="6" fill="${k}"/>
          <path d="M-50 -235 L50 -235" stroke="#E9C46A" stroke-width="4" stroke-dasharray="6 4"/>
          ${[-36, -12, 12, 36].map((x, i) => `<circle cx="${x}" cy="-235" r="3.5" fill="${i % 2 ? '#2E7D5B' : '#C0392B'}"/>`).join('')}`;
      }
      case 'amisfeather':   // 阿美族男子羽冠
        return [-64, -42, -21, 0, 21, 42, 64].map(r => `<g transform="translate(0 -238) rotate(${r})"><path d="M0 0 Q-9 -42 0 -82 Q9 -42 0 0 Z" fill="#FAF7F0" stroke="#D8D2C2" stroke-width="1.5"/></g>`).join('') +
          `<rect x="-55" y="-246" width="110" height="18" rx="7" fill="${k}"/>
          <path d="M-52 -237 L52 -237" stroke="#E9C46A" stroke-width="4"/><path d="M-52 -231 L52 -231" stroke="#2E7D5B" stroke-width="2.5"/>`;
      case 'amisband':      // 阿美族女子彩珠頭飾
        return `<rect x="-55" y="-246" width="110" height="18" rx="7" fill="${k}"/>
          ${[-44, -22, 0, 22, 44].map((x, i) => `<circle cx="${x}" cy="-249" r="8" fill="${['#E9C46A', '#2E7D5B', '#F4F0E6', '#2E7D5B', '#E9C46A'][i]}"/>`).join('')}
          <path d="M-53 -230 L-60 -178 M-48 -230 L-53 -176 M53 -230 L60 -178 M48 -230 L53 -176" stroke="#E9C46A" stroke-width="3"/>`;
      default: return '';
    }
  }

  function collar(c) {
    switch (c.collar) {
      case 'ruff':
        return `<ellipse cx="0" cy="-152" rx="42" ry="13" fill="#F7F3EA"/>
          <path d="M-36 -152 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" stroke="#D8D0BE" stroke-width="2" fill="none"/>`;
      case 'bands':
        return `<path d="M-14 -152 L14 -152 L10 -118 L0 -122 L-10 -118 Z" fill="#F7F3EA"/>
          <path d="M0 -150 L0 -122" stroke="#D8D0BE" stroke-width="2"/>`;
      default: return '';
    }
  }

  const ARM_L = { x1: -42, y1: -140, x2: -55, y2: -88 };
  const ARM_R = { x1: 42, y1: -140, x2: 62, y2: -100 };

  function torso(c) {
    const col = c.color || '#556', c2 = c.color2 || shade(col, -0.2);
    const base = `M-36 -152 Q-48 -150 -50 -130 L-54 -58 Q0 -50 54 -58 L50 -130 Q48 -150 36 -152 Z`;
    switch (c.outfit) {
      case 'robe':
        return `<path d="M-36 -152 Q-50 -150 -52 -128 L-62 -10 Q0 0 62 -10 L52 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          <path d="M-20 -152 L14 -100 L14 -12" stroke="${c2}" stroke-width="5" fill="none"/>
          <rect x="-54" y="-100" width="108" height="10" rx="4" fill="${c2}"/>`;
      case 'qingrobe':
        return `<path d="M-36 -152 Q-50 -150 -52 -128 L-62 -10 Q0 0 62 -10 L52 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          <rect x="-22" y="-140" width="44" height="40" fill="${c2}" stroke="${shade(c2, -0.3)}" stroke-width="2"/>
          <path d="M-12 -116 q12 -18 24 0 q-12 8 -24 0 Z" fill="#F7F3EA"/><circle cx="6" cy="-122" r="3" fill="#C0392B"/>
          <path d="M-46 -40 L46 -40" stroke="${shade(col, 0.15)}" stroke-width="4"/>
          <circle cx="0" cy="-150" r="5" fill="#C0392B"/><path d="M-30 -150 Q0 -138 30 -150" stroke="#C0392B" stroke-width="3" fill="none" stroke-dasharray="3 5"/>`;
      case 'magua':
        return `<path d="M-36 -152 Q-50 -150 -52 -128 L-60 -10 Q0 0 60 -10 L52 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          <path d="M-38 -152 Q-52 -150 -54 -126 L-56 -84 Q0 -78 56 -84 L54 -126 Q52 -150 38 -152 Z" fill="${c2}"/>
          <path d="M0 -150 L0 -82" stroke="${shade(c2, 0.3)}" stroke-width="2"/>
          ${[-138, -122, -106, -92].map(y => `<circle cx="0" cy="${y}" r="3" fill="#D9B64E"/>`).join('')}`;
      case 'qingwoman':
        return `<path d="M-36 -152 Q-50 -150 -52 -128 L-58 -66 Q0 -58 58 -66 L52 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          <path d="M-10 -152 Q20 -146 26 -118 L30 -66" stroke="${c2}" stroke-width="5" fill="none"/>
          <path d="M-58 -66 L-50 -60 L50 -60 L58 -66" stroke="${c2}" stroke-width="5" fill="none"/>`;
      case 'armor': {
        let scales = '';
        for (let r = 0; r < 4; r++) for (let i = -2; i <= 2; i++) {
          scales += `<path d="M${i * 18 - 9 + (r % 2) * 9} ${-134 + r * 16} q9 12 18 0" stroke="${c2}" stroke-width="2.6" fill="none"/>`;
        }
        return `<path d="${base}" fill="${col}"/>${scales}
          <ellipse cx="-44" cy="-144" rx="20" ry="12" fill="${c2}"/><ellipse cx="44" cy="-144" rx="20" ry="12" fill="${c2}"/>
          <rect x="-52" y="-72" width="104" height="12" rx="5" fill="${shade(col, -0.35)}"/>
          <circle cx="0" cy="-66" r="8" fill="${c2}"/>`;
      }
      case 'sailor':
        return `<path d="${base}" fill="${col}"/>
          ${[-138, -122, -106, -90, -74].map(y => `<path d="M-50 ${y} L50 ${y}" stroke="${c2}" stroke-width="7"/>`).join('')}
          <path d="M-18 -152 L0 -132 L18 -152" stroke="${c2}" stroke-width="4" fill="none"/>`;
      case 'coat':
        return `<path d="${base}" fill="${col}"/>
          <path d="M0 -150 L0 -58" stroke="${c2}" stroke-width="3"/>
          ${[-136, -120, -104, -88].map(y => `<circle cx="0" cy="${y}" r="3.4" fill="${c2}"/>`).join('')}
          <rect x="-52" y="-80" width="104" height="10" fill="${shade(col, -0.35)}"/>
          <rect x="-8" y="-82" width="16" height="14" rx="2" fill="none" stroke="${c2}" stroke-width="3"/>
          <path d="M44 -150 L-20 -66" stroke="#D8622A" stroke-width="9" stroke-linecap="round" opacity=".9"/>`;
      case 'suit':
        return `<path d="${base}" fill="${col}"/>
          <path d="M-16 -152 L0 -118 L16 -152 Z" fill="${c2}"/>
          <path d="M-3 -146 L3 -146 L5 -112 L0 -104 L-5 -112 Z" fill="#7A2E28"/>
          <path d="M-22 -152 L-4 -106 L-12 -60 M22 -152 L4 -106 L12 -60" stroke="${shade(col, -0.3)}" stroke-width="3" fill="none"/>
          <circle cx="-8" cy="-86" r="2.6" fill="${shade(col, -0.4)}"/><circle cx="-8" cy="-72" r="2.6" fill="${shade(col, -0.4)}"/>`;
      case 'kimono':
        return `<path d="M-36 -152 Q-50 -150 -52 -128 L-60 -10 Q0 0 60 -10 L52 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          <path d="M-22 -152 L18 -96 M22 -152 L-4 -118" stroke="#F2EEE4" stroke-width="5" fill="none"/>
          <rect x="-54" y="-104" width="108" height="20" fill="${c2}"/>
          <path d="M-60 -10 Q0 0 60 -10" stroke="${shade(col, -0.25)}" stroke-width="3" fill="none"/>`;
      case 'siraya':
        return `<path d="${base}" fill="${col}"/>
          <path d="M-50 -128 L50 -128" stroke="${c2}" stroke-width="8"/>
          <path d="M-50 -116 L50 -116" stroke="#F2E6C8" stroke-width="4" stroke-dasharray="8 4"/>
          <path d="M-52 -96 L52 -96" stroke="${c2}" stroke-width="6"/>
          <path d="M-54 -66 L54 -66" stroke="#F2E6C8" stroke-width="4"/>`;
      case 'dress':
        return `<path d="M-36 -152 Q-50 -150 -50 -128 L-52 -96 L-64 -14 Q0 -4 64 -14 L52 -96 L50 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          <path d="M-51 -120 L51 -120" stroke="${c2}" stroke-width="8"/>
          <path d="M-58 -50 L58 -50" stroke="${c2}" stroke-width="8"/>
          <path d="M-60 -38 L60 -38" stroke="#F2E6C8" stroke-width="4" stroke-dasharray="8 4"/>
          <path d="M-63 -22 L63 -22" stroke="${c2}" stroke-width="5"/>`;
      case 'yong': // 清兵號褂
        return `<path d="${base}" fill="${col}"/>
          <path d="M-50 -130 L-54 -58 L54 -58 L50 -130" stroke="${c2}" stroke-width="5" fill="none"/>
          <circle cx="0" cy="-106" r="22" fill="#F4EBD3" stroke="${c2}" stroke-width="3"/>
          <text x="0" y="-98" text-anchor="middle" font-size="24" font-weight="900" fill="${c2}" font-family="Noto Serif TC, serif">${c.patch || '勇'}</text>`;
      case 'hide': // 史前：獸皮衣
        return `<path d="M-36 -152 Q-50 -150 -52 -128 L-56 -64 L-46 -52 L-36 -64 L-24 -50 L-12 -62 L0 -50 L12 -62 L24 -50 L36 -64 L46 -52 L56 -64 L52 -128 Q50 -150 36 -152 Z" fill="${col}"/>
          ${[[-28, -128], [10, -136], [30, -110], [-14, -98], [22, -80], [-34, -84]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="${c2}" opacity=".55"/>`).join('')}
          <path d="M-52 -92 Q0 -82 52 -92" stroke="#6B4A2E" stroke-width="5" fill="none"/>`;
      case 'barkcloth': // 新石器時代以後：樹皮布或簡單織布
        return `<path d="${base}" fill="${col}"/>
          ${[-140, -126, -112, -98, -84, -70].map(y => `<path d="M-50 ${y} L50 ${y}" stroke="${shade(col, -0.12)}" stroke-width="1.5" opacity=".7"/>`).join('')}
          <path d="M-20 -152 Q0 -138 20 -152" stroke="${shade(col, -0.25)}" stroke-width="4" fill="none"/>
          <path d="M-53 -86 Q0 -78 53 -86" stroke="${c2}" stroke-width="7" fill="none"/>
          <path d="M-8 -84 l-6 22 M4 -84 l6 22" stroke="${c2}" stroke-width="4" stroke-linecap="round"/>`;
      case 'vest': { // 布農族男子白色長背心
        const sk = c.skin || '#B07648';
        const zig = (x0) => { let d = `M${x0} -46`; for (let i = 0; i < 9; i++) d += ` l4 ${i % 2 ? 6 : -6}`; return d; };
        return `<path d="${base}" fill="${sk}"/>
          <path d="M-50 -66 L50 -66 L46 -36 L-46 -36 Z" fill="${c2}"/>
          <path d="M-16 -150 L16 -150 L20 -70 L-20 -70 Z" fill="${c2}"/>
          <path d="M-14 -138 L14 -138 M-16 -118 L16 -118 M-18 -98 L18 -98" stroke="#E9C46A" stroke-width="2.5" stroke-dasharray="4 3"/>
          <path d="M-36 -152 Q-50 -150 -52 -128 L-58 -38 L-22 -38 L-18 -150 Z" fill="${col}"/>
          <path d="M36 -152 Q50 -150 52 -128 L58 -38 L22 -38 L18 -150 Z" fill="${col}"/>
          <path d="M-22 -38 L-18 -150 M22 -38 L18 -150" stroke="#C0392B" stroke-width="5"/>
          <path d="M-58 -46 L-22 -46 M22 -46 L58 -46" stroke="${c2}" stroke-width="9"/>
          <path d="${zig(-58)} ${zig(22)}" stroke="#E9C46A" stroke-width="2.5" fill="none"/>`;
      }
      case 'tao': { // 達悟族男子背心與丁字帶
        const sk = c.skin || '#A86E44';
        return `<path d="${base}" fill="${sk}"/>
          <path d="M-36 -152 Q-50 -150 -52 -128 L-54 -92 L-14 -92 L-12 -150 Z" fill="${col}"/>
          <path d="M36 -152 Q50 -150 52 -128 L54 -92 L14 -92 L12 -150 Z" fill="${col}"/>
          ${[-140, -126, -112, -100].map(y => `<path d="M-52 ${y} L-13 ${y} M13 ${y} L52 ${y}" stroke="${c2}" stroke-width="4"/>`).join('')}
          <path d="M-50 -70 L50 -70 L44 -58 L-44 -58 Z" fill="${c2}"/>
          <path d="M-12 -62 L12 -62 L8 -26 L-8 -26 Z" fill="${c2}"/>`;
      }
      case 'paiwan': // 排灣族：黑底刺繡
        return `<path d="${base}" fill="${col}"/>
          <path d="M-22 -152 L0 -118 L22 -152" stroke="${c2}" stroke-width="8" fill="none"/>
          <path d="M-18 -146 L0 -120 L18 -146" stroke="#E9C46A" stroke-width="2" fill="none"/>
          <rect x="-52" y="-106" width="104" height="15" fill="${c2}"/>
          ${[-40, -20, 0, 20, 40].map(x => `<path d="M${x - 7} -98 L${x} -104 L${x + 7} -98 L${x} -92 Z" fill="#E9C46A"/>`).join('')}
          <rect x="-54" y="-72" width="108" height="12" fill="#2E7D5B"/>
          <path d="M-52 -66 L52 -66" stroke="#E9C46A" stroke-width="2.5" stroke-dasharray="3 5"/>`;
      case 'amis': // 阿美族：紅色上衣＋黑色腰裙
        return `<path d="${base}" fill="${col}"/>
          <path d="M-16 -152 L-6 -76 M16 -152 L6 -76" stroke="${c2}" stroke-width="5"/>
          <path d="M-50 -128 L50 -128" stroke="#E9C46A" stroke-width="4"/>
          <path d="M-50 -122 L50 -122" stroke="#2E7D5B" stroke-width="2.5"/>
          <rect x="-55" y="-78" width="110" height="36" fill="#1E1E22"/>
          <path d="M-55 -52 L55 -52" stroke="#2E7D5B" stroke-width="3"/><path d="M-55 -46 L55 -46" stroke="#E9C46A" stroke-width="4"/>`;
      default: // worker
        return `<path d="${base}" fill="${col}"/>
          <path d="M-18 -152 L0 -128 L18 -152" stroke="${c2}" stroke-width="4" fill="none"/>
          <rect x="-53" y="-80" width="106" height="11" rx="4" fill="${c2}"/>`;
    }
  }

  function legs(c) {
    const p = c.pants || '#333';
    const long = /robe|qingrobe|magua|kimono|dress/.test(c.outfit);
    const shoe = shade(p, -0.45);
    if (long) {
      return `<ellipse cx="-20" cy="-4" rx="18" ry="8" fill="${shoe}"/><ellipse cx="20" cy="-4" rx="18" ry="8" fill="${shoe}"/>`;
    }
    return `<rect x="-30" y="-66" width="24" height="62" rx="9" fill="${p}"/><rect x="6" y="-66" width="24" height="62" rx="9" fill="${p}"/>
      <ellipse cx="-19" cy="-4" rx="17" ry="8" fill="${shoe}"/><ellipse cx="19" cy="-4" rx="17" ry="8" fill="${shoe}"/>`;
  }

  function arm(c, A, sleeveWide) {
    const col = c.color || '#556';
    const skin = c.skin || '#F2C9A0';
    const sw = c.bareArms ? 18 : sleeveWide ? 30 : 22;
    const sleeve = c.bareArms ? shade(skin, -0.04) : shade(col, -0.08);
    return `<path d="M${A.x1} ${A.y1} L${A.x2} ${A.y2}" stroke="${sleeve}" stroke-width="${sw}" stroke-linecap="round"/>
      <circle cx="${A.x2 + (A.x2 > 0 ? 2 : -1)}" cy="${A.y2 + 8}" r="10.5" fill="${skin}"/>`;
  }

  function accessory(c) {
    const hx = ARM_R.x2 + 2, hy = ARM_R.y2 + 8;
    const t = (s) => `<g transform="translate(${hx} ${hy})">${s}</g>`;
    switch (c.acc) {
      case 'map': return t(`<g transform="rotate(-20)"><rect x="-6" y="-46" width="16" height="70" rx="4" fill="#E9DAB4"/><rect x="-8" y="-50" width="20" height="8" rx="3" fill="#8A5A2B"/><rect x="-8" y="22" width="20" height="8" rx="3" fill="#8A5A2B"/></g>`);
      case 'fan': return t(`<path d="M0 0 L-30 -44 Q0 -60 30 -44 Z" fill="#F2E6C8" stroke="#8A5A2B" stroke-width="2"/><path d="M0 0 L-15 -50 M0 0 L0 -54 M0 0 L15 -50" stroke="#C9B48A" stroke-width="1.5"/>`);
      case 'book': return t(`<rect x="-14" y="-26" width="30" height="36" rx="3" fill="#6B3A2A"/><rect x="-11" y="-23" width="24" height="30" fill="#EFE5CC"/><path d="M-7 -14 h16 M-7 -7 h16 M-7 0 h12" stroke="#9C8F74" stroke-width="2"/>`);
      case 'brick': return t(`<rect x="-20" y="-16" width="40" height="20" rx="2" fill="#B5503A"/><path d="M-20 -6 h40 M0 -16 v10 M-10 -6 v10 M10 -6 v10" stroke="#8E3B2A" stroke-width="1.6"/>`);
      case 'hoe': return t(`<path d="M0 30 L0 -90" stroke="#8A5A2B" stroke-width="6" stroke-linecap="round"/><path d="M0 -88 L-26 -80 L-26 -66 L0 -74 Z" fill="#7F8C8D"/>`);
      case 'rake': return t(`<path d="M0 30 L0 -90" stroke="#8A5A2B" stroke-width="6" stroke-linecap="round"/><rect x="-30" y="-96" width="60" height="9" rx="3" fill="#A0784A"/>`);
      case 'oar': return t(`<path d="M0 34 L0 -96" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><path d="M-10 -96 Q0 -140 10 -96 Z" fill="#A0784A"/>`);
      case 'spear': return t(`<path d="M0 40 L0 -150" stroke="#6B4A2E" stroke-width="6" stroke-linecap="round"/><path d="M0 -176 L-9 -148 L9 -148 Z" fill="#B8BEC2"/><path d="M-8 -146 Q0 -132 8 -146" fill="#C0392B"/>`);
      case 'staff': return t(`<path d="M0 40 L0 -120" stroke="#6B4A2E" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-124" r="8" fill="#2E7D5B"/>`);
      case 'sword': return t(`<g transform="rotate(10)"><rect x="-3" y="-90" width="6" height="80" rx="2" fill="#C9CED2"/><rect x="-12" y="-12" width="24" height="6" rx="2" fill="#D9B64E"/><rect x="-3" y="-6" width="6" height="20" rx="2" fill="#6B3A2A"/></g>`);
      case 'bow': return t(`<path d="M-4 -80 Q34 -20 -4 40" stroke="#6B4A2E" stroke-width="5" fill="none"/><path d="M-4 -80 L-4 40" stroke="#E8DCC0" stroke-width="1.5"/>`);
      case 'abacus': return t(`<rect x="-24" y="-24" width="48" height="32" rx="3" fill="#6B3A2A"/>${[-16, -8, 0].map(y => `<path d="M-20 ${y} h40" stroke="#C9B48A" stroke-width="1.5"/>` + [-14, -6, 6, 14].map(x => `<circle cx="${x}" cy="${y}" r="3" fill="#2B1D14"/>`).join('')).join('')}`);
      case 'basket': return t(`<path d="M-24 -20 L24 -20 L18 10 L-18 10 Z" fill="#B08850"/><path d="M-22 -10 h44 M-20 0 h40" stroke="#8A6A3A" stroke-width="2"/><path d="M-18 -20 Q0 -46 18 -20" stroke="#8A6A3A" stroke-width="3" fill="none"/>`);
      case 'scroll': return t(`<g transform="rotate(-30)"><rect x="-6" y="-40" width="12" height="60" rx="5" fill="#E9DAB4"/><rect x="-8" y="-44" width="16" height="7" rx="3" fill="#6B3A2A"/></g>`);
      case 'paper': return t(`<rect x="-18" y="-30" width="34" height="42" fill="#DCE8F2" stroke="#5A7FA0" stroke-width="2"/><path d="M-12 -20 h22 M-12 -12 h22 M-12 -4 h14 M-12 4 h18" stroke="#5A7FA0" stroke-width="1.6"/>`);
      case 'letter': return t(`<rect x="-20" y="-20" width="40" height="26" fill="#F4EBD3" stroke="#B5503A" stroke-width="2"/><path d="M-20 -20 L0 -4 L20 -20" stroke="#B5503A" stroke-width="2" fill="none"/>`);
      case 'lantern': return t(`<path d="M0 -40 L0 -26" stroke="#3A2A1A" stroke-width="2"/><ellipse cx="0" cy="-8" rx="16" ry="20" fill="#D8432F"/><rect x="-8" y="-30" width="16" height="5" fill="#D9B64E"/><rect x="-8" y="10" width="16" height="5" fill="#D9B64E"/><ellipse cx="-4" cy="-12" rx="5" ry="9" fill="#F7B267" opacity=".6"/>`);
      case 'stonetool': return t(`<path d="M-14 -16 L12 -24 L22 -4 L14 12 L-10 14 L-18 0 Z" fill="#8E8A80"/><path d="M12 -24 L22 -4 L14 12" stroke="#D2CEC2" stroke-width="3" fill="none"/><path d="M-6 -8 L4 -12 M-8 4 L6 0" stroke="#6E6A60" stroke-width="2"/>`);
      case 'stoneaxe': return t(`<path d="M0 30 L0 -76" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><path d="M-3 -82 L-32 -88 Q-40 -72 -32 -56 L-3 -62 Z" fill="#6E8A80"/><path d="M-30 -84 Q-36 -72 -30 -60" stroke="#A9C2B8" stroke-width="2.5" fill="none"/><path d="M-6 -84 L6 -60 M6 -84 L-6 -60" stroke="#5A3A20" stroke-width="3"/>`);
      case 'woodspear': return t(`<path d="M0 40 L0 -140" stroke="#7A5232" stroke-width="6" stroke-linecap="round"/><path d="M0 -170 L-10 -138 L10 -138 Z" fill="#8E8A80"/><path d="M-7 -140 L7 -131 M-7 -131 L7 -140" stroke="#5A3A20" stroke-width="2"/>`);
      case 'hammer': return t(`<path d="M0 26 L0 -50" stroke="#6B4226" stroke-width="6" stroke-linecap="round"/><rect x="-17" y="-66" width="34" height="17" rx="3" fill="#4A4F55"/>`);
      case 'fish': return t(`<g transform="rotate(-25)"><path d="M-6 -16 L-24 -40 L12 -18 Z M-6 -4 L-24 20 L12 -2 Z" fill="#C7DCEA"/><ellipse cx="0" cy="-10" rx="28" ry="8" fill="#7FA9C9"/><path d="M-26 -10 Q0 -4 26 -10" stroke="#E8F1F7" stroke-width="2" fill="none"/><path d="M26 -10 L40 -22 L37 -10 L40 2 Z" fill="#5E8AAE"/><circle cx="-18" cy="-12" r="2.6" fill="#1E2A38"/></g>`);
      case 'millet': return t(`<path d="M0 26 L0 -30" stroke="#8A9A4E" stroke-width="4"/><path d="M0 -30 Q-20 -40 -24 -66 M0 -30 Q-4 -56 6 -76 M0 -30 Q18 -42 22 -64" stroke="#D9A441" stroke-width="9" stroke-linecap="round" fill="none"/><path d="M0 -30 Q-20 -40 -24 -66 M0 -30 Q-4 -56 6 -76 M0 -30 Q18 -42 22 -64" stroke="#F0C766" stroke-width="3" stroke-dasharray="2 4" fill="none"/>`);
      default: return '';
    }
  }

  function necklace() {  // 琉璃珠／瑪瑙珠項鍊
    const cols = ['#E9C46A', '#C0392B', '#2E7D5B', '#F4F0E6', '#2B5C9A'];
    return Array.from({ length: 9 }, (_, i) => {
      const a = Math.PI * (0.15 + 0.7 * i / 8);
      return `<circle cx="${(Math.cos(a) * 32).toFixed(1)}" cy="${(-150 + Math.sin(a) * 26).toFixed(1)}" r="5" fill="${cols[i % 5]}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`;
    }).join('');
  }

  function character(c) {
    const skin = c.skin || '#F2C9A0';
    const wide = /robe|qingrobe|magua|kimono/.test(c.outfit);
    const parts = [
      `<ellipse cx="0" cy="0" rx="60" ry="12" fill="rgba(20,14,8,.25)"/>`,
      backHair(c),
      legs(c),
      arm(c, ARM_L, wide),
      torso(c),
      collar(c),
      c.necklace ? necklace() : '',
      `<rect x="-11" y="-162" width="22" height="16" fill="${shade(skin, -0.12)}"/>`,
      `<circle cx="-49" cy="-200" r="9" fill="${shade(skin, -0.06)}"/><circle cx="49" cy="-200" r="9" fill="${shade(skin, -0.06)}"/>`,
      `<circle cx="0" cy="${HEAD_Y}" r="${HEAD_R}" fill="${skin}"/>`,
      face(c),
      beard(c),
      c.earring === 'jade' ? '<circle cx="-53" cy="-182" r="8" fill="none" stroke="#5FAF86" stroke-width="5" stroke-dasharray="42 8"/><circle cx="53" cy="-182" r="8" fill="none" stroke="#5FAF86" stroke-width="5" stroke-dasharray="42 8"/>' : '',
      frontHair(c),
      hat(c),
      arm(c, ARM_R, wide),
      accessory(c)
    ];
    const inner = parts.join('');
    return c.kid ? `<g transform="scale(.74)">${inner}</g>` : inner;
  }

  function portrait(c) {
    const kidFix = c.kid ? ' transform="scale(1.35)"' : '';
    return `<svg viewBox="-92 -320 184 200" aria-hidden="true"><g${kidFix}>${character(Object.assign({}, c, { acc: null }))}</g></svg>`;
  }

  /* =========================================================
   * 物品
   * ========================================================= */
  const PROPS = {
    chest: [`<rect x="-70" y="-74" width="140" height="74" rx="6" fill="#7A4A2A"/>
      <path d="M-70 -74 Q0 -128 70 -74 Z" fill="#8E5A34" transform="rotate(-14 -70 -74)"/>
      <rect x="-70" y="-50" width="140" height="8" fill="#5A3A20"/><rect x="-10" y="-60" width="20" height="24" rx="3" fill="#D9B64E"/>
      ${[[-40, -84], [-16, -90], [10, -86], [34, -82], [-28, -78], [22, -76]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="6" fill="#DADFE3" stroke="#9AA3AA" stroke-width="2"/>`).join('')}`, [-80, -140, 160, 145]],
    telescope: [`<path d="M-30 0 L0 -80 L30 0 M0 -80 L0 0" stroke="#5A3A20" stroke-width="7" fill="none"/>
      <g transform="translate(0 -92) rotate(-18)"><rect x="-70" y="-12" width="100" height="24" rx="6" fill="#C9A23F"/><rect x="26" y="-15" width="44" height="30" rx="6" fill="#A8842F"/><rect x="-82" y="-9" width="16" height="18" rx="3" fill="#8E6E22"/></g>`, [-90, -140, 180, 145]],
    maptable: [`<rect x="-80" y="-74" width="160" height="12" fill="#6B4226"/><path d="M-70 -62 L-70 0 M70 -62 L70 0" stroke="#5A3A20" stroke-width="10"/>
      <path d="M-74 -78 L74 -78 L64 -92 L-64 -92 Z" fill="#E9DAB4"/><path d="M-30 -86 q20 -8 40 0 q14 4 20 -2" stroke="#7A5A3A" stroke-width="2" fill="none"/><circle cx="34" cy="-86" r="5" fill="none" stroke="#B5503A" stroke-width="2"/>`, [-85, -110, 170, 112]],
    deer: [deerSVG(), [-150, -160, 300, 165]],
    zone: ['', null],
    gongxie: [`<rect x="-80" y="-90" width="160" height="90" fill="#8E6A42"/>
      <path d="M-104 -84 L0 -170 L104 -84 Z" fill="#C9A46A"/><path d="M-90 -96 L90 -96 M-70 -118 L70 -118 M-44 -140 L44 -140" stroke="#A8844A" stroke-width="3"/>
      <rect x="-30" y="-74" width="60" height="74" fill="#3A2A1A"/><rect x="-18" y="-34" width="36" height="8" fill="#8A5A2B"/>
      <path d="M-8 -34 Q-12 -54 0 -58 Q12 -54 8 -34 Z" fill="#C9B48A"/><path d="M-4 -58 Q0 -72 6 -64" stroke="#2E7D5B" stroke-width="3" fill="none"/>`, [-110, -175, 220, 178]],
    bible: [`<path d="M-50 0 L-40 -70 L40 -70 L50 0 Z" fill="#6B4226"/><path d="M-56 -70 L56 -70 L46 -88 L-46 -88 Z" fill="#5A3A20"/>
      <path d="M-44 -92 Q-22 -104 0 -92 Q22 -104 44 -92 L44 -86 L-44 -86 Z" fill="#F4EBD3"/>
      <text x="-22" y="-93" font-size="9" fill="#5A3A20" font-family="serif">a b c</text><text x="6" y="-93" font-size="9" fill="#5A3A20" font-family="serif">d e f</text>`, [-65, -110, 130, 112]],
    tools: [`<g transform="rotate(-12)"><path d="M-20 0 L-20 -130" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><path d="M-20 -128 L-52 -118 L-52 -100 L-20 -110 Z" fill="#7F8C8D"/></g>
      <g transform="rotate(10)"><path d="M20 0 L20 -120" stroke="#8A5A2B" stroke-width="7" stroke-linecap="round"/><path d="M20 -118 L48 -108 L48 -92 L20 -102 Z" fill="#95A0A5"/></g>
      <path d="M-70 -6 L60 -40 L80 -20 M10 -26 L18 4" stroke="#6B4226" stroke-width="9" stroke-linecap="round" fill="none"/>`, [-85, -150, 170, 155]],
    campflag: [`<path d="M0 0 L0 -240" stroke="#5A3A20" stroke-width="8"/><path d="M4 -236 L110 -210 L4 -170 Z" fill="#B8322A"/>
      <text x="36" y="-196" font-size="34" font-weight="900" fill="#F4E3B5" font-family="Noto Serif TC, serif">營</text>`, [-20, -245, 140, 250]],
    seachart: [`<rect x="-60" y="-50" width="120" height="50" fill="#6B4226"/><path d="M-70 -54 L70 -54 L60 -78 L-60 -78 Z" fill="#E9DAB4"/>
      <path d="M-40 -66 Q-10 -76 0 -64 Q12 -54 40 -70" stroke="#3E7CA6" stroke-width="4" fill="none"/><path d="M-50 -60 q10 -6 20 0 M20 -62 q10 -6 20 0" stroke="#C9A46A" stroke-width="5"/>`, [-75, -90, 150, 92]],
    cannon: [`<ellipse cx="-30" cy="-26" rx="26" ry="26" fill="#5A3A20"/><ellipse cx="30" cy="-26" rx="26" ry="26" fill="#5A3A20"/>
      <circle cx="-30" cy="-26" r="8" fill="#2B1D14"/><circle cx="30" cy="-26" r="8" fill="#2B1D14"/>
      <g transform="rotate(-12 0 -50)"><rect x="-70" y="-66" width="150" height="34" rx="14" fill="#3B3F44"/><rect x="72" y="-70" width="14" height="42" rx="4" fill="#2B2E32"/></g>`, [-80, -100, 175, 102]],
    cable: [`<ellipse cx="0" cy="-10" rx="80" ry="22" fill="#2B2E32"/><rect x="-80" y="-80" width="160" height="70" fill="#34383D"/><ellipse cx="0" cy="-80" rx="80" ry="22" fill="#3E4349"/>
      <ellipse cx="0" cy="-80" rx="30" ry="9" fill="#1E2023"/>${[-60, -40, -20].map(y => `<path d="M-80 ${y} Q0 ${y + 18} 80 ${y}" stroke="#4A4F55" stroke-width="3" fill="none"/>`).join('')}`, [-85, -110, 170, 112]],
    lamp: [`<path d="M0 0 L0 -300" stroke="#4A3A2A" stroke-width="10"/><path d="M-60 -280 L60 -280" stroke="#4A3A2A" stroke-width="6"/>
      ${[-50, -20, 20, 50].map(x => `<circle cx="${x}" cy="-284" r="4" fill="#E9DAB4"/>`).join('')}
      <path d="M0 -270 Q40 -270 46 -240" stroke="#4A3A2A" stroke-width="4" fill="none"/><path d="M34 -240 L58 -240 L52 -222 L40 -222 Z" fill="#6B6F74"/>
      <ellipse cx="46" cy="-218" rx="7" ry="5" fill="#F4E3B5"/>`, [-70, -310, 140, 312]],
    train: [trainSVG(), [-230, -260, 460, 262]],

    /* ---- 史前文化 ---- */
    campfire: [`${[[-44, -6], [-24, -2], [0, 0], [24, -2], [44, -6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="9" fill="#7A766C"/>`).join('')}
      <path d="M-34 -6 L34 -22 M-34 -22 L34 -6" stroke="#6B4226" stroke-width="10" stroke-linecap="round"/>
      <g class="glow"><path d="M0 -12 Q-30 -44 -8 -88 Q-2 -60 10 -64 Q4 -92 24 -108 Q40 -64 20 -12 Z" fill="#F08A24"/>
      <path d="M2 -14 Q-12 -38 2 -62 Q8 -44 14 -48 Q22 -30 12 -14 Z" fill="#FFD166"/></g>`, [-62, -115, 124, 125]],
    pebbles: [`${[[-50, -14, 24, 14], [-12, -18, 28, 18], [28, -12, 22, 13], [-30, -36, 18, 12], [10, -42, 21, 14], [46, -32, 15, 10]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#A19D93" stroke="#7A766C" stroke-width="2.5"/>`).join('')}`, [-78, -60, 156, 66]],
    shells: [`<path d="M-95 0 Q-66 -76 0 -86 Q66 -76 95 0 Z" fill="#E6D9BE"/>
      ${[[-60, -18], [-34, -40], [-6, -60], [24, -44], [52, -20], [-20, -16], [12, -22], [34, -66], [-44, -58], [70, -40]].map(([x, y], i) => `<path d="M${x - 9} ${y} Q${x} ${y - 14} ${x + 9} ${y} Z" fill="${i % 2 ? '#F4ECDA' : '#CBB89A'}" stroke="#A8926E" stroke-width="1.5"/>`).join('')}`, [-98, -92, 196, 95]],
    slabcoffin: [`<path d="M-104 -54 L68 -54 L96 -96 L-76 -96 Z" fill="#8A9094" transform="rotate(-8 0 -75) translate(10 -40)"/>
      <path d="M-100 -6 L76 -6 L104 -48 L-72 -48 Z" fill="#5E6468"/>
      <path d="M-88 -12 L70 -12 L92 -42 L-66 -42 Z" fill="#3A4044"/>
      <path d="M-100 -6 L76 -6 L76 8 L-100 8 Z" fill="#7A8084"/><path d="M76 -6 L104 -48 L104 -34 L76 8 Z" fill="#6A7074"/>`, [-108, -150, 216, 160]],
    slabs: [`${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${-84 + i * 4}" y="${-14 - i * 13}" width="${168 - i * 9}" height="12" rx="2" fill="${i % 2 ? '#6E747A' : '#5A6066'}" transform="rotate(${i % 2 ? 1.5 : -1.5} 0 ${-8 - i * 13})"/>`).join('')}`, [-88, -96, 176, 100]],
    pillar: [`<path d="M-46 0 L-38 -360 Q0 -382 38 -360 L46 0 Z" fill="#8C8A82"/>
      <path d="M-30 -330 L-26 -40 M18 -340 L22 -60" stroke="#77756D" stroke-width="3"/>
      <circle cx="0" cy="-320" r="22" fill="#C9DCEA" stroke="#6E6C64" stroke-width="4"/>`, [-52, -385, 104, 390]],
    furnace: [`<ellipse cx="78" cy="-8" rx="20" ry="10" fill="#2B2B2E"/><ellipse cx="104" cy="-6" rx="14" ry="8" fill="#3A3A3E"/><ellipse cx="90" cy="-20" rx="12" ry="7" fill="#232326"/>
      <path d="M-62 0 Q-68 -92 0 -112 Q68 -92 62 0 Z" fill="#9A6A48"/><path d="M-40 -60 Q0 -74 40 -60" stroke="#7E543A" stroke-width="3" fill="none"/>
      <path d="M-24 0 Q-24 -42 0 -46 Q24 -42 24 0 Z" fill="#3A1A10"/>
      <g class="glow"><path d="M-15 0 Q-15 -28 0 -32 Q15 -28 15 0 Z" fill="#F08A24"/><path d="M-7 0 Q-7 -16 0 -18 Q7 -16 7 0 Z" fill="#FFD166"/></g>
      <path d="M-11 -110 L11 -110 L9 -128 L-9 -128 Z" fill="#7A5038"/>
      <g class="smoke"><circle cx="0" cy="-150" r="16" fill="#D8D4CC" opacity=".75"/><circle cx="16" cy="-178" r="21" fill="#D8D4CC" opacity=".5"/></g>`, [-70, -200, 195, 205]],
    facepot: [`<path d="M-42 0 Q-60 -52 -38 -92 L-30 -108 L30 -108 L38 -92 Q60 -52 42 0 Z" fill="#B5703E"/>
      <rect x="-34" y="-114" width="68" height="10" rx="4" fill="#9C5E32"/>
      <path d="M-26 -74 q8 -7 15 0 M11 -74 q8 -7 15 0" stroke="#5A3020" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M0 -70 L-6 -50 L6 -50 Z" fill="#9C5E32" stroke="#5A3020" stroke-width="2"/>
      <ellipse cx="0" cy="-36" rx="9" ry="5" fill="#5A3020"/>
      <path d="M-40 -20 Q0 -10 40 -20" stroke="#9C5E32" stroke-width="3" fill="none"/>`, [-62, -118, 124, 122]],

    /* ---- 原住民族 ---- */
    calendar: [`<rect x="-8" y="-62" width="16" height="62" fill="#6B4226"/>
      <rect x="-82" y="-176" width="164" height="114" rx="6" fill="#B08454" stroke="#6B4226" stroke-width="5"/>
      ${[0, 1, 2].map(r => [0, 1, 2, 3, 4].map(c2 => {
        const x = -62 + c2 * 31, y = -150 + r * 34, k = (r * 5 + c2) % 4;
        return k === 0 ? `<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#3A2414" stroke-width="3"/>`
          : k === 1 ? `<path d="M${x} ${y - 10} L${x} ${y + 6} M${x - 7} ${y - 3} L${x + 7} ${y - 3} M${x} ${y + 6} L${x - 6} ${y + 12} M${x} ${y + 6} L${x + 6} ${y + 12}" stroke="#3A2414" stroke-width="3"/><circle cx="${x}" cy="${y - 13}" r="3.5" fill="#3A2414"/>`
          : k === 2 ? `<path d="M${x - 8} ${y - 8} Q${x + 8} ${y} ${x - 8} ${y + 8}" stroke="#3A2414" stroke-width="3" fill="none"/>`
          : `<path d="M${x - 9} ${y + 8} L${x} ${y - 9} L${x + 9} ${y + 8}" stroke="#3A2414" stroke-width="3" fill="none"/>`;
      }).join('')).join('')}`, [-86, -180, 172, 182]],
    fishrack: [`<path d="M-92 0 L-92 -152 M92 0 L92 -152 M-104 -142 L104 -142" stroke="#7A5232" stroke-width="8" stroke-linecap="round"/>
      ${[-66, -38, -10, 18, 46, 72].map(x => `<g transform="translate(${x} -138)"><path d="M0 0 L0 10" stroke="#5A3A20" stroke-width="2"/>
        <path d="M-6 22 L-22 30 L-6 36 Z M6 22 L22 30 L6 36 Z" fill="#C7DCEA"/><ellipse cx="0" cy="34" rx="7" ry="24" fill="#8FB0C6"/><path d="M0 56 L-7 66 L7 66 Z" fill="#6E93AE"/></g>`).join('')}`, [-108, -160, 216, 164]],
    canoe: [`<path d="M-172 -44 Q-150 -10 -100 0 L100 0 Q150 -10 172 -44 L180 -118 Q162 -64 120 -54 L-120 -54 Q-162 -64 -180 -118 Z" fill="#F4F0E6" stroke="#2B2B2B" stroke-width="3"/>
      <path d="M-128 -40 L128 -40" stroke="#C0392B" stroke-width="6"/>
      ${Array.from({ length: 12 }, (_, i) => `<path d="M${-96 + i * 16} -34 l8 -12 l8 12 Z" fill="${i % 2 ? '#1E1E22' : '#C0392B'}"/>`).join('')}
      ${[-138, 138].map(x => `<circle cx="${x}" cy="-36" r="15" fill="#F4F0E6" stroke="#C0392B" stroke-width="4"/><circle cx="${x}" cy="-36" r="9" fill="none" stroke="#1E1E22" stroke-width="3"/><circle cx="${x}" cy="-36" r="3.5" fill="#C0392B"/>`).join('')}
      <path d="M-180 -118 l-6 -22 M180 -118 l6 -22" stroke="#2B2B2B" stroke-width="3"/><circle cx="-186" cy="-142" r="5" fill="#F4F0E6" stroke="#2B2B2B" stroke-width="2"/><circle cx="186" cy="-142" r="5" fill="#F4F0E6" stroke="#2B2B2B" stroke-width="2"/>`, [-192, -150, 384, 154]]
  };

  function deerSVG() {
    const one = (x, s, flip) => `<g transform="translate(${x} 0) scale(${flip ? -s : s} ${s})">
      <path d="M-40 -60 L-44 0 M-26 -58 L-24 0 M28 -58 L26 0 M40 -60 L44 0" stroke="#8E5A30" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="0" cy="-72" rx="56" ry="28" fill="#B5713E"/>
      ${[[-30, -78], [-14, -86], [4, -80], [20, -88], [-20, -66], [10, -66], [32, -74]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="4" fill="#F4E6CC"/>`).join('')}
      <path d="M40 -86 Q54 -118 58 -130 L72 -126 Q66 -104 56 -78 Z" fill="#B5713E"/>
      <ellipse cx="68" cy="-134" rx="17" ry="12" fill="#B5713E"/><circle cx="82" cy="-132" r="3.5" fill="#2B1D14"/>
      <ellipse cx="58" cy="-146" rx="5" ry="11" fill="#9C5E32" transform="rotate(-30 58 -146)"/>
      <path d="M62 -148 L56 -176 M58 -166 L48 -172 M70 -148 L76 -174 M74 -164 L84 -168" stroke="#7A5232" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="72" cy="-138" r="2.6" fill="#2B1D14"/><path d="M-56 -78 l-8 -6" stroke="#F4E6CC" stroke-width="6" stroke-linecap="round"/></g>`;
    return one(-60, 0.9, false) + one(70, 0.75, true);
  }

  function trainSVG() {
    return `<g>
      <rect x="-210" y="-40" width="420" height="16" rx="4" fill="#2B2B2E"/>
      <rect x="-200" y="-150" width="250" height="100" rx="40" fill="#1F3A2E"/>
      <rect x="-200" y="-150" width="250" height="18" rx="8" fill="#2E5543"/>
      ${[-150, -90, -30].map(x => `<rect x="${x}" y="-150" width="8" height="100" fill="#D9B64E"/>`).join('')}
      <rect x="-186" y="-232" width="34" height="86" fill="#26282B"/><path d="M-200 -240 L-138 -240 L-146 -226 L-192 -226 Z" fill="#1B1C1E"/>
      <ellipse cx="-90" cy="-158" rx="18" ry="14" fill="#D9B64E"/>
      <rect x="40" y="-210" width="140" height="170" rx="6" fill="#4A1F1A"/>
      <rect x="30" y="-222" width="160" height="18" rx="6" fill="#2B1210"/>
      <rect x="62" y="-186" width="44" height="44" rx="4" fill="#F4E3B5" opacity=".85"/><rect x="118" y="-186" width="44" height="44" rx="4" fill="#F4E3B5" opacity=".85"/>
      <text x="110" y="-82" text-anchor="middle" font-size="26" font-weight="900" fill="#D9B64E" font-family="Noto Serif TC, serif">騰雲</text>
      <circle cx="-200" cy="-96" r="18" fill="#D9B64E"/><circle cx="-200" cy="-96" r="9" fill="#F4E3B5"/>
      ${[[-130, 52], [-20, 52], [120, 40]].map(([x, r]) => `<circle cx="${x}" cy="${-r}" r="${r}" fill="#1B1C1E"/><circle cx="${x}" cy="${-r}" r="${r - 10}" fill="#B8322A"/><circle cx="${x}" cy="${-r}" r="8" fill="#D9B64E"/>`).join('')}
      <path d="M-130 -52 L-20 -52" stroke="#C9CED2" stroke-width="8" stroke-linecap="round"/>
      <g class="smoke"><circle cx="-170" cy="-262" r="22" fill="#E8E6E0" opacity=".8"/><circle cx="-142" cy="-290" r="28" fill="#E8E6E0" opacity=".6"/><circle cx="-104" cy="-318" r="34" fill="#E8E6E0" opacity=".4"/></g>
    </g>`;
  }

  function prop(type) { return (PROPS[type] || [''])[0]; }
  function propBox(type, a) {
    if (type === 'zone') return [-a.w / 2, -a.h / 2, a.w, a.h];
    return (PROPS[type] || [null, [-60, -120, 120, 120]])[1];
  }

  /* =========================================================
   * 場景元件
   * ========================================================= */
  const sky = (id, stops) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient></defs><rect width="1600" height="900" fill="url(#${id})"/>`;
  const cloud = (x, y, s, col = '#FFFFFF', op = 0.9) => `<g class="drift"><g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><ellipse cx="0" cy="0" rx="70" ry="26" fill="${col}"/><ellipse cx="-44" cy="8" rx="44" ry="20" fill="${col}"/><ellipse cx="50" cy="6" rx="50" ry="22" fill="${col}"/><ellipse cx="10" cy="-18" rx="42" ry="26" fill="${col}"/></g></g>`;
  const ridge = (pts, fill, op = 1) => `<path d="M${pts.map(p => p.join(' ')).join(' L')} L1600 900 L0 900 Z" fill="${fill}" opacity="${op}"/>`;
  const waveRow = (y, col, amp, cls = 'wave') => {
    let d = `M-100 ${y}`;
    for (let x = -100; x < 1800; x += 80) d += ` q20 ${-amp} 40 0 t40 0`;
    return `<path class="${cls}" d="${d}" stroke="${col}" stroke-width="3" fill="none" opacity=".55"/>`;
  };
  const bird = (x, y, s = 1) => `<path class="flap" d="M${x} ${y} q${10 * s} ${-10 * s} ${20 * s} 0 q${10 * s} ${-10 * s} ${20 * s} 0" stroke="#3A4250" stroke-width="2.5" fill="none"/>`;

  function dutchShip(x, y, s, sail = '#F4EEDC') {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M-120 0 L120 0 L96 40 L-90 40 Z" fill="#5A3A20"/><rect x="-124" y="-10" width="248" height="12" fill="#7A4A2A"/>
      <path d="M90 -10 L124 -34 L128 -10 Z" fill="#7A4A2A"/>
      ${[-60, 10, 70].map((mx, i) => `<path d="M${mx} 0 L${mx} ${-150 + i * 20}" stroke="#3A2A1A" stroke-width="5"/>
        <path d="M${mx - 40} ${-126 + i * 20} Q${mx} ${-110 + i * 20} ${mx + 40} ${-126 + i * 20} L${mx + 34} ${-70 + i * 20} Q${mx} ${-60 + i * 20} ${mx - 34} ${-70 + i * 20} Z" fill="${sail}"/>
        <path d="M${mx - 30} ${-60 + i * 20} Q${mx} ${-48 + i * 20} ${mx + 30} ${-60 + i * 20} L${mx + 26} ${-20 + i * 20} L${mx - 26} ${-20 + i * 20} Z" fill="${sail}"/>`).join('')}
      <g class="flag"><rect x="-60" y="-178" width="40" height="8" fill="#E07B2C"/><rect x="-60" y="-170" width="40" height="8" fill="#F7F3EA"/><rect x="-60" y="-162" width="40" height="8" fill="#2E5C9A"/></g>
    </g>`;
  }

  function junk(x, y, s, flagText = '鄭', hull = '#6B3A22') {
    const sail = (mx, h, w) => `<path d="M${mx} 0 L${mx} ${-h - 20}" stroke="#3A2A1A" stroke-width="5"/>
      <path d="M${mx - 6} ${-h} L${mx + w} ${-h + 10} L${mx + w - 8} -18 L${mx - 6} -18 Z" fill="#C46A3A"/>
      ${[0.2, 0.4, 0.6, 0.8].map(f => `<path d="M${mx - 6} ${-h + (h - 18) * f} L${mx + w - 4} ${-h + 10 + (h - 28) * f}" stroke="#7A3A1E" stroke-width="2.5"/>`).join('')}`;
    return `<g transform="translate(${x} ${y}) scale(${s})">
      ${sail(-40, 150, 70)}${sail(30, 120, 56)}
      <path d="M-130 -16 Q-120 30 -80 34 L90 34 Q130 24 140 -30 L100 -10 L-100 -10 Z" fill="${hull}"/>
      <path d="M-110 2 L120 2" stroke="#D9B64E" stroke-width="4"/><circle cx="-96" cy="12" r="7" fill="#F4E3B5"/><circle cx="-96" cy="12" r="3" fill="#2B1D14"/>
      <g class="flag"><path d="M-40 -170 L-40 -206 L4 -196 L-40 -186 Z" fill="#B8322A"/></g>
      <text x="-30" y="-190" font-size="14" font-weight="900" fill="#F4E3B5" font-family="Noto Serif TC, serif">${flagText}</text>
    </g>`;
  }

  const tree = (x, y, s, col = '#3E7B4F') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-8" y="-70" width="16" height="70" fill="#6B4A2E"/><circle cx="0" cy="-100" r="46" fill="${col}"/><circle cx="-34" cy="-76" r="32" fill="${shade(col, -0.1)}"/><circle cx="34" cy="-80" r="34" fill="${shade(col, 0.08)}"/></g>`;
  const bamboo = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${[-20, 0, 18].map((bx, i) => `<path d="M${bx} 0 Q${bx + 6} -120 ${bx + 14 - i * 8} -230" stroke="#5E9A4E" stroke-width="8" fill="none"/>`).join('')}
    ${[[-30, -150], [10, -200], [30, -130], [-10, -100], [24, -230]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="34" ry="9" fill="#6FAE58" transform="rotate(-20 ${a} ${b})"/>`).join('')}</g>`;
  const thatch = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-80 0 L-80 -20 M80 0 L80 -20 M-40 0 L-40 -20 M40 0 L40 -20" stroke="#6B4A2E" stroke-width="7"/>
    <rect x="-90" y="-90" width="180" height="70" fill="#9C7448"/><rect x="-24" y="-74" width="40" height="54" fill="#4A3220"/>
    <path d="M-120 -82 Q0 -190 120 -82 Z" fill="#C9A46A"/><path d="M-100 -96 Q0 -176 100 -96" stroke="#A8844A" stroke-width="3" fill="none"/></g>`;
  const grass = (x, y, s = 1, col = '#4E8A45') => `<path d="M${x} ${y} l${-8 * s} ${-26 * s} M${x} ${y} l0 ${-34 * s} M${x} ${y} l${9 * s} ${-24 * s}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>`;

  function brickWall(x, y, w, h, col = '#A8503A') {
    let lines = '';
    for (let r = 14; r < h; r += 14) lines += `<path d="M${x} ${y + r} h${w}" stroke="${shade(col, -0.2)}" stroke-width="1.5"/>`;
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}"/>${lines}`;
  }

  function cnRoof(x, y, w, col = '#3A3F4A', ridge = '#B8322A') {
    return `<path d="M${x - w / 2 - 30} ${y} Q${x - w / 2} ${y - 10} ${x - w / 2 + 20} ${y - 50} L${x + w / 2 - 20} ${y - 50} Q${x + w / 2} ${y - 10} ${x + w / 2 + 30} ${y} Q${x} ${y - 16} ${x - w / 2 - 30} ${y} Z" fill="${col}"/>
      <path d="M${x - w / 2 + 10} ${y - 52} L${x + w / 2 - 10} ${y - 52}" stroke="${ridge}" stroke-width="8"/>
      <path d="M${x - w / 2 + 10} ${y - 52} Q${x - w / 2 - 10} ${y - 60} ${x - w / 2 - 14} ${y - 80}" stroke="${ridge}" stroke-width="7" fill="none"/>
      <path d="M${x + w / 2 - 10} ${y - 52} Q${x + w / 2 + 10} ${y - 60} ${x + w / 2 + 14} ${y - 80}" stroke="${ridge}" stroke-width="7" fill="none"/>`;
  }

  /* 史前與原住民族場景用的小元件 */
  const hut = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-58" y="-48" width="116" height="48" fill="#9C7448"/>
    <path d="M-80 -38 Q0 -160 80 -38 Z" fill="#C9A46A"/><path d="M-60 -60 Q0 -140 60 -60" stroke="#A8844A" stroke-width="3" fill="none"/><rect x="-14" y="-40" width="28" height="40" fill="#4A3220"/></g>`;
  const taro = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 L0 -40" stroke="#4E8A45" stroke-width="4"/><path d="M0 -40 Q-32 -48 -28 -70 Q-12 -82 0 -60 Q12 -82 28 -70 Q32 -48 0 -40 Z" fill="#5E9A4E"/><path d="M0 -42 L0 -64" stroke="#7DB86A" stroke-width="2"/></g>`;
  const conifer = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-30" width="10" height="30" fill="#5A3A20"/><path d="M0 -150 L-36 -30 L36 -30 Z" fill="#2E5E44"/><path d="M0 -150 L-24 -82 L24 -82 Z" fill="#3A6E50"/></g>`;
  function slateHouse(x, y, s, roof = 'slate') {
    let rows = '';
    for (let r = -70; r < 0; r += 12) rows += `<path d="M-90 ${r} h180" stroke="#5E6266" stroke-width="2"/>`;
    const top = roof === 'slate'
      ? `<path d="M-112 -74 L0 -126 L112 -74 Z" fill="#5A5F64"/><path d="M-78 -90 L78 -90 M-42 -106 L42 -106" stroke="#474C51" stroke-width="2"/>`
      : `<path d="M-116 -74 L0 -146 L116 -74 Z" fill="#C9A46A"/><path d="M-90 -86 L0 -140 L90 -86" stroke="#A8844A" stroke-width="3" fill="none"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-80" width="180" height="80" fill="#7D8186"/>${rows}${top}<rect x="-18" y="-58" width="36" height="58" fill="#2E2A26"/></g>`;
  }
  const stiltHouse = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-70 0 L-70 -74 M-26 0 L-26 -74 M26 0 L26 -74 M70 0 L70 -74" stroke="#6B4A2E" stroke-width="8"/>
    <rect x="-92" y="-84" width="184" height="12" fill="#7A5A3A"/><rect x="-80" y="-146" width="160" height="62" fill="#A8845A"/>
    <path d="M-112 -138 L0 -216 L112 -138 Z" fill="#C9A46A"/><rect x="-14" y="-130" width="28" height="46" fill="#4A3220"/>
    <path d="M24 0 L40 -72 M40 0 L56 -72 M28 -18 L44 -18 M32 -38 L48 -38 M36 -58 L52 -58" stroke="#5A3A20" stroke-width="3.5"/></g>`;
  const pebbleScatter = (y0, n, col = '#8C887E') => Array.from({ length: n }, (_, i) => `<ellipse cx="${(i * 137) % 1600}" cy="${y0 + (i * 53) % 200}" rx="${8 + (i % 4) * 4}" ry="${5 + (i % 3) * 2}" fill="${col}" opacity=".7"/>`).join('');

  /* =========================================================
   * 場景
   * ========================================================= */
  const SCENES = {
    /* ---- 第 1 章：史前文化 ---- */
    cave() {   // 八仙洞：海蝕洞穴
      return sky('g-cave', [[0, '#8DBFE0'], [0.6, '#F4E4C6']]) +
        `<circle cx="1320" cy="190" r="58" fill="#FFF0C8" opacity=".9"/>` + cloud(1100, 120, 0.9) + cloud(1450, 270, 0.7, '#FFFFFF', 0.7) +
        `<rect x="0" y="440" width="1600" height="200" fill="#3C7FA6"/>` + waveRow(470, '#E8F3F7', 5) + waveRow(525, '#E8F3F7', 7, 'wave wave2') +
        `<path d="M0 60 L260 40 L470 90 L640 170 L760 300 L840 470 L880 640 L0 640 Z" fill="#7A6A58"/>
         <path d="M0 60 L260 40 L470 90 L640 170 L700 232 Q520 160 300 132 Q140 112 0 142 Z" fill="#5E8A5A"/>
         <path d="M60 210 L620 262 M30 336 L720 384 M60 470 L800 520" stroke="#6A5A4A" stroke-width="4" opacity=".6"/>
         <path d="M150 640 Q150 420 330 400 Q520 420 520 640 Z" fill="#2B2420"/><path d="M196 640 Q206 470 330 452 Q466 470 476 640 Z" fill="#1A1512"/>
         <path d="M520 332 Q520 252 590 242 Q660 252 660 332 Z" fill="#2B2420"/>
         <path d="M90 302 Q90 242 150 238 Q210 242 210 302 Z" fill="#2B2420"/>` +
        `<path d="M0 620 Q500 600 900 630 Q1250 650 1600 620 L1600 900 L0 900 Z" fill="#B8AE98"/>
         <path d="M0 700 Q800 680 1600 710 L1600 900 L0 900 Z" fill="#A69C86"/>` + pebbleScatter(640, 26) +
        bird(1000, 220) + bird(1050, 200, 0.8);
    },
    riverside() {   // 大坌坑：淡水河口、觀音山下
      return sky('g-riv', [[0, '#92C6E6'], [0.6, '#EEF0DC']]) + cloud(300, 120, 1) + cloud(1200, 90, 0.8) +
        `<path d="M820 440 L1100 180 L1400 440 Z" fill="#6F9480"/><path d="M940 440 L1100 250 L1260 440 Z" fill="#5E8470"/>
         <path d="M0 440 Q400 410 800 440 L1600 430 L1600 476 L0 486 Z" fill="#88A86E"/>
         <path d="M0 478 Q500 462 1000 478 Q1300 486 1600 472 L1600 560 Q1000 540 0 576 Z" fill="#4E8DB0"/>` + waveRow(505, '#E8F3F7', 4) +
        `<path d="M0 560 Q800 530 1600 556 L1600 900 L0 900 Z" fill="#9DBA6A"/>
         <path d="M0 670 Q800 650 1600 680 L1600 900 L0 900 Z" fill="#B6A276"/>` +
        hut(260, 580, 0.8) + hut(560, 560, 0.6) + hut(1430, 584, 0.75) +
        [1040, 1090, 1140, 1190, 1240, 1290].map((x, i) => taro(x, 618 + (i % 2) * 14, 0.9)).join('') +
        tree(80, 580, 0.8) + Array.from({ length: 16 }, (_, i) => grass(40 + i * 100, 850 + (i % 2) * 18, 0.8, '#7E9A4E')).join('');
    },
    beinan() {   // 卑南：大型聚落
      return sky('g-bei', [[0, '#8EC4E6'], [0.6, '#F2EAD0']]) + cloud(260, 110, 0.9) + cloud(1000, 140, 1) +
        ridge([[0, 330], [220, 240], [420, 280], [600, 210], [820, 290], [1000, 250], [1260, 300], [1600, 260]], '#6E9A72', 0.85) +
        `<path d="M0 470 L1600 460 L1600 900 L0 900 Z" fill="#C9B07E"/>
         <path d="M0 470 L560 466 L560 520 L0 530 Z" fill="#D9B85A"/>
         ${[480, 494, 508, 520].map(y => `<path d="M0 ${y + 4} L560 ${y}" stroke="#B8962E" stroke-width="2"/>`).join('')}
         <path d="M0 610 Q800 590 1600 620 L1600 900 L0 900 Z" fill="#B89E6C"/>` +
        slateHouse(300, 540, 0.7, 'thatch') + slateHouse(760, 506, 0.55, 'thatch') + slateHouse(1100, 520, 0.6, 'thatch') + slateHouse(1420, 546, 0.75, 'thatch') +
        tree(1560, 560, 0.7);
    },
    shisanhang() {   // 十三行：河口邊的干欄式聚落
      return sky('g-ssh', [[0, '#9BC6E2'], [0.6, '#ECEADA']]) + cloud(1300, 120, 0.9) + cloud(380, 150, 0.7) +
        `<path d="M980 430 L1220 210 L1480 430 Z" fill="#7B9C88"/>
         <rect y="420" width="1600" height="140" fill="#4A88AE"/>` + waveRow(450, '#E8F3F7', 4) + waveRow(500, '#E8F3F7', 5, 'wave wave2') +
        `<g transform="translate(600 470)"><path d="M-70 0 Q0 22 70 0 L60 -8 L-60 -8 Z" fill="#5A3A22"/><circle cx="-10" cy="-22" r="9" fill="#B07A4C"/><path d="M-16 -14 L-4 -14 L-4 -6 L-16 -6 Z" fill="#7A6450"/></g>
         <path d="M0 550 Q800 530 1600 556 L1600 900 L0 900 Z" fill="#CDB98E"/>
         <path d="M0 660 Q800 640 1600 670 L1600 900 L0 900 Z" fill="#BCA77A"/>` +
        stiltHouse(240, 600, 0.75) + stiltHouse(1000, 580, 0.6) + stiltHouse(1420, 604, 0.78) +
        `<g class="smoke"><circle cx="760" cy="470" r="20" fill="#D8D4CC" opacity=".5"/><circle cx="780" cy="430" r="26" fill="#D8D4CC" opacity=".35"/></g>` +
        Array.from({ length: 14 }, (_, i) => grass(60 + i * 115, 860, 0.8, '#7E9A4E')).join('');
    },

    /* ---- 第 2 章：原住民族 ---- */
    mountain() {   // 布農族：中央山脈的小米田
      return sky('g-mtn', [[0, '#6FAEDB'], [0.55, '#DDEEF5']]) + cloud(1200, 110, 0.8) +
        ridge([[0, 250], [180, 150], [360, 220], [560, 120], [760, 210], [980, 140], [1200, 220], [1400, 160], [1600, 230]], '#7D97B0', 0.75) +
        `<g class="drift"><path d="M-40 336 Q300 304 600 334 T1200 330 T1660 336 L1660 388 L-40 392 Z" fill="#FFFFFF" opacity=".85"/></g>` +
        ridge([[0, 430], [300, 356], [620, 414], [900, 346], [1250, 404], [1600, 354]], '#4F7A5E') +
        [80, 170, 1290, 1380, 1470, 1550].map((x, i) => conifer(x, 470 + (i % 2) * 12, 0.75)).join('') +
        `<path d="M0 520 Q800 470 1600 520 L1600 900 L0 900 Z" fill="#8FAE5E"/>
         <path d="M760 552 L1600 534 L1600 648 L760 668 Z" fill="#D7B85A"/>
         ${[566, 590, 614, 638].map((y, i) => `<path d="M760 ${y + 8 - i * 2} L1600 ${y - 10}" stroke="#B8962E" stroke-width="3" stroke-dasharray="6 6"/>`).join('')}
         <g transform="translate(300 600) scale(.85)"><rect x="-100" y="-90" width="200" height="90" fill="#8A6A48"/>${[-70, -40, -10, 20, 50, 80].map(xx => `<path d="M${xx} -90 L${xx} 0" stroke="#6E5236" stroke-width="3"/>`).join('')}
           <path d="M-126 -84 L0 -170 L126 -84 Z" fill="#6E747A"/><rect x="-20" y="-64" width="40" height="64" fill="#3A2A1A"/></g>
         <path d="M0 710 Q800 690 1600 715 L1600 900 L0 900 Z" fill="#A08A5A"/>`;
    },
    lanyu() {   // 達悟族：蘭嶼的海岸
      return sky('g-lan', [[0, '#6FB4E0'], [0.6, '#E6F3F6']]) + cloud(420, 120, 0.9) + cloud(1220, 90, 0.8) +
        `<rect y="400" width="1600" height="230" fill="#2E7FB0"/>` + waveRow(430, '#E8F3F7', 4) + waveRow(480, '#E8F3F7', 6, 'wave wave2') + waveRow(540, '#E8F3F7', 7) +
        [[640, 446], [700, 428], [1080, 456]].map(([x, y]) => `<g transform="translate(${x} ${y}) rotate(-12)"><ellipse cx="0" cy="0" rx="16" ry="4.5" fill="#C9D9E6"/><path d="M-4 -2 L-14 -14 L6 -3 Z" fill="#E8F1F7"/></g>`).join('') +
        `<path d="M0 180 L120 150 L260 220 L360 330 L420 470 L0 470 Z" fill="#3E4A3C"/><path d="M0 180 L120 150 L260 220 L300 262 Q160 232 0 252 Z" fill="#5E8A4E"/>
         <path d="M1600 220 L1480 200 L1360 280 L1290 400 L1260 470 L1600 470 Z" fill="#46503F"/><path d="M1600 220 L1480 200 L1380 262 Q1480 272 1600 282 Z" fill="#5E8A4E"/>
         <path d="M0 600 Q800 580 1600 612 L1600 900 L0 900 Z" fill="#A29E96"/>` + pebbleScatter(620, 30, '#7E7A72') +
        `<g transform="translate(470 612)"><path d="M-150 0 L150 0 L140 -26 L-140 -26 Z" fill="#6E6A62"/>
           <path d="M-120 -24 Q-60 -74 0 -64 Q60 -74 120 -24 Z" fill="#B08A5A"/><path d="M-90 -36 Q0 -70 90 -36" stroke="#8E6E44" stroke-width="3" fill="none"/></g>
         <g transform="translate(1180 610)"><path d="M-60 0 L-60 -90 M60 0 L60 -90 M-20 0 L-20 -90 M20 0 L20 -90" stroke="#6B4A2E" stroke-width="7"/>
           <rect x="-76" y="-96" width="152" height="10" fill="#7A5A3A"/><path d="M-96 -92 L0 -160 L96 -92 Z" fill="#C9A46A"/></g>`;
    },
    slatevillage() {   // 排灣族：大武山下的石板屋
      return sky('g-sla', [[0, '#88BEE0'], [0.6, '#EDEFE2']]) + cloud(300, 110, 0.9) + cloud(1300, 150, 0.7) +
        `<path d="M480 420 L860 130 L1260 420 Z" fill="#5D7F6A"/><path d="M780 196 L860 130 L940 196 L900 186 L860 206 L820 186 Z" fill="#7D9C88"/>` +
        ridge([[0, 400], [260, 340], [520, 390], [760, 350], [1040, 400], [1300, 340], [1600, 390]], '#4E7A58') +
        [60, 150, 1460, 1550].map(x => tree(x, 480, 0.7, '#3E6E4A')).join('') +
        `<path d="M0 480 L1600 470 L1600 900 L0 900 Z" fill="#8E928A"/>
         ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 200 - 60} 480 L${i * 230 - 200} 900" stroke="#7A7E76" stroke-width="2"/>`).join('')}
         <path d="M0 620 L1600 610 M0 740 L1600 735" stroke="#7A7E76" stroke-width="2"/>` +
        slateHouse(240, 560, 0.8) + slateHouse(1000, 540, 0.65) + slateHouse(1400, 566, 0.85) +
        `<g transform="translate(640 560)"><rect x="-22" y="-170" width="44" height="170" fill="#7A5232"/>
           <circle cx="0" cy="-138" r="15" fill="#8E6440"/><path d="M-8 -142 h5 M3 -142 h5 M-5 -130 h10" stroke="#3A2414" stroke-width="3"/>
           <path d="M-14 -110 l7 10 l7 -10 l7 10 M-14 -88 l7 10 l7 -10 l7 10 M-14 -66 l7 10 l7 -10 l7 10 M-14 -44 l7 10 l7 -10 l7 10" stroke="#3A2414" stroke-width="3" fill="none"/></g>`;
    },
    amis() {   // 阿美族：花東海岸
      return sky('g-ami', [[0, '#7FBDE6'], [0.6, '#F2EED8']]) + cloud(250, 120, 1) + cloud(1050, 100, 0.8) +
        `<rect x="0" y="400" width="1600" height="150" fill="#3B8DBB"/>` + waveRow(430, '#E8F3F7', 4) + waveRow(480, '#E8F3F7', 5, 'wave wave2') +
        `<path d="M0 470 L0 300 L160 250 L330 290 L500 230 L660 300 L800 380 L860 470 Z" fill="#5E8A62"/>
         <path d="M0 520 Q800 496 1600 526 L1600 900 L0 900 Z" fill="#B9B27A"/>
         <path d="M900 524 L1600 520 L1600 590 L900 600 Z" fill="#8FB45E"/>
         ${[540, 556, 572, 588].map(y => `<path d="M900 ${y + 4} L1600 ${y}" stroke="#6E9A48" stroke-width="2"/>`).join('')}
         <path d="M0 680 Q800 660 1600 690 L1600 900 L0 900 Z" fill="#C9BE88"/>
         <g transform="translate(400 600)"><path d="M-110 0 L-110 -70 M-40 0 L-40 -70 M40 0 L40 -70 M110 0 L110 -70" stroke="#6B4A2E" stroke-width="9"/>
           <rect x="-130" y="-80" width="260" height="12" fill="#7A5A3A"/><path d="M-160 -74 L0 -200 L160 -74 Z" fill="#C9A46A"/>
           <path d="M-130 -90 L0 -190 L130 -90" stroke="#A8844A" stroke-width="3" fill="none"/></g>` +
        bamboo(80, 590, 1) + bamboo(1540, 600, 0.9);
    },

    deck() {
      return sky('g-deck', [[0, '#7FB6E0'], [0.55, '#CFE6EE'], [0.62, '#F4E3C2']]) +
        `<circle cx="1260" cy="170" r="62" fill="#FFF3CF" opacity=".9"/>` +
        cloud(260, 150, 1.1) + cloud(760, 110, 0.8) + cloud(1450, 230, 0.9, '#FFFFFF', 0.7) +
        `<path d="M980 470 Q1060 380 1140 420 Q1200 350 1290 400 Q1360 360 1440 430 L1600 470 Z" fill="#5F8F6E"/>
         <path d="M1040 470 Q1120 420 1200 446 Q1270 410 1340 450 L1480 470 Z" fill="#4C7A5A"/>` +
        `<rect y="468" width="1600" height="160" fill="#2F6F95"/>` +
        waveRow(500, '#CFE6EE', 6) + waveRow(540, '#CFE6EE', 8, 'wave wave2') + waveRow(590, '#E8F3F7', 9) +
        dutchShip(250, 480, 0.55) + bird(520, 260) + bird(570, 240, 0.8) + bird(880, 300, 0.7) +
        `<rect y="600" width="1600" height="300" fill="#8E5E36"/>
         ${[640, 690, 750, 820].map(y => `<path d="M0 ${y} L1600 ${y}" stroke="#6E4526" stroke-width="3"/>`).join('')}
         ${Array.from({ length: 14 }, (_, i) => `<path d="M${i * 130 - 40} 600 L${i * 150 - 200} 900" stroke="#6E4526" stroke-width="2" opacity=".6"/>`).join('')}
         <rect y="560" width="1600" height="22" fill="#6B4226"/><rect y="600" width="1600" height="10" fill="#5A3A20"/>
         ${Array.from({ length: 21 }, (_, i) => `<rect x="${i * 80}" y="580" width="14" height="22" fill="#5A3A20"/>`).join('')}
         <rect x="1520" y="0" width="34" height="620" fill="#5A3A20"/>
         <path d="M1537 40 L1240 600 M1537 120 L1340 600 M1537 40 L1600 520" stroke="#3A2A1A" stroke-width="3"/>
         <path d="M1300 0 Q1420 120 1520 60 L1520 0 Z" fill="#F4EEDC" opacity=".95"/>
         <ellipse cx="160" cy="720" rx="56" ry="22" fill="#5A3A20"/><rect x="104" y="640" width="112" height="80" fill="#7A4A2A"/><ellipse cx="160" cy="640" rx="56" ry="22" fill="#8E5A34"/>
         <path d="M104 664 h112 M104 700 h112" stroke="#3A2A1A" stroke-width="5"/>`;
    },

    tayouan() {
      return sky('g-tay', [[0, '#8EC5E8'], [0.6, '#E6F1F2']]) +
        cloud(300, 130, 1) + cloud(1100, 90, 0.8) +
        ridge([[0, 360], [180, 300], [340, 330], [520, 270], [700, 320], [900, 280], [1100, 330], [1300, 290], [1600, 340]], '#9DB8C6', 0.7) +
        `<rect y="380" width="1600" height="130" fill="#5B9DBF"/>` + waveRow(410, '#E8F3F7', 4) + waveRow(450, '#E8F3F7', 5, 'wave wave2') +
        dutchShip(420, 430, 0.42) + dutchShip(700, 445, 0.32) +
        `<path d="M0 500 Q400 470 800 490 Q1200 470 1600 500 L1600 900 L0 900 Z" fill="#E8D3A2"/>
         <path d="M0 560 Q500 540 1000 560 Q1300 570 1600 550 L1600 900 L0 900 Z" fill="#DCC48E"/>
         <path d="M0 640 Q600 610 1600 650 L1600 900 L0 900 Z" fill="#9DBB6A"/>` +
        `<g>${brickWall(1110, 330, 300, 200)}
          <rect x="1090" y="300" width="70" height="230" fill="#B5594A"/><rect x="1360" y="300" width="70" height="230" fill="#B5594A"/>
          ${[1090, 1110, 1130, 1360, 1380, 1400].map(x => `<rect x="${x}" y="286" width="16" height="16" fill="#B5594A"/>`).join('')}
          <path d="M1170 330 L1170 220 M1300 330 L1300 200 M1170 250 L1300 230 M1170 290 L1300 280" stroke="#8A6A40" stroke-width="7"/>
          <path d="M1235 300 L1235 150" stroke="#3A2A1A" stroke-width="5"/>
          <g class="flag"><rect x="1235" y="150" width="56" height="12" fill="#E07B2C"/><rect x="1235" y="162" width="56" height="12" fill="#F7F3EA"/><rect x="1235" y="174" width="56" height="12" fill="#2E5C9A"/></g>
          ${[[1050, 540], [1090, 548], [1460, 545]].map(([a, b]) => `<rect x="${a}" y="${b}" width="40" height="18" fill="#B5503A"/>`).join('')}</g>` +
        Array.from({ length: 26 }, (_, i) => grass(30 + i * 62, 690 + (i % 3) * 30, 1, i % 2 ? '#5E9A4E' : '#4E8A45')).join('') +
        tree(60, 640, 0.8) + bird(800, 210) + bird(840, 190, 0.8);
    },

    village() {
      return sky('g-vil', [[0, '#9FD0E8'], [0.6, '#F5E9C8']]) +
        cloud(220, 120, 0.9) + cloud(980, 100, 1.1, '#FFFFFF', 0.85) +
        ridge([[0, 330], [200, 260], [420, 300], [640, 230], [860, 290], [1080, 240], [1320, 300], [1600, 250]], '#7FA38A', 0.75) +
        ridge([[0, 420], [300, 380], [600, 410], [900, 370], [1200, 410], [1600, 380]], '#6E9A62') +
        `<path d="M0 480 L1600 470 L1600 900 L0 900 Z" fill="#A9C46E"/>
         <path d="M0 560 Q800 530 1600 570 L1600 900 L0 900 Z" fill="#C9B07A"/>` +
        bamboo(120, 520, 1) + bamboo(1540, 520, 1.1) + thatch(330, 520, 0.9) + thatch(1180, 515, 0.85) + thatch(720, 490, 0.6) +
        tree(560, 500, 0.7, '#4E8A55') + tree(1000, 495, 0.6) +
        Array.from({ length: 22 }, (_, i) => grass(40 + i * 75, 840 + (i % 2) * 22, 0.8, '#7E9A4E')).join('');
    },

    luermen() {
      return sky('g-lue', [[0, '#3E4A7A'], [0.35, '#C97B7A'], [0.6, '#F4C58E']]) +
        `<circle cx="300" cy="400" r="70" fill="#FFD9A0" opacity=".9"/>` +
        cloud(700, 140, 1, '#F2B9A0', 0.6) + cloud(1300, 200, 0.8, '#F2B9A0', 0.5) +
        `<rect y="400" width="1600" height="260" fill="#3F5F7E"/>
         <path d="M900 430 Q1100 410 1300 430 Q1450 440 1600 420 L1600 470 Q1300 460 900 450 Z" fill="#D7C08E"/>
         <path d="M1260 418 L1260 380 L1300 368 L1340 380 L1340 418 Z" fill="#8E5A44" opacity=".8"/>` +
        waveRow(470, '#F4C58E', 5) + waveRow(520, '#F4C58E', 7, 'wave wave2') +
        junk(160, 470, 0.45) + junk(470, 500, 0.6) + junk(1040, 480, 0.4) + junk(1450, 520, 0.5) + junk(760, 460, 0.32) +
        `<path d="M0 640 L1600 640 L1600 900 L0 900 Z" fill="#7A3E22"/>
         ${[690, 750, 820].map(y => `<path d="M0 ${y} L1600 ${y}" stroke="#5A2C18" stroke-width="3"/>`).join('')}
         <rect y="600" width="1600" height="26" fill="#A8322A"/><rect y="626" width="1600" height="14" fill="#7A221C"/>
         ${Array.from({ length: 17 }, (_, i) => `<rect x="${i * 100}" y="570" width="16" height="34" fill="#A8322A"/>`).join('')}
         <path d="M1490 0 L1490 620" stroke="#3A2A1A" stroke-width="22"/>
         <path d="M1300 40 L1480 60 L1480 560 L1320 520 Z" fill="#C46A3A" opacity=".95"/>
         ${[120, 220, 320, 420].map(y => `<path d="M1306 ${y - 20} L1480 ${y}" stroke="#7A3A1E" stroke-width="4"/>`).join('')}`;
    },

    farmland() {
      return sky('g-farm', [[0, '#8CC6EA'], [0.6, '#F1EDD0']]) +
        cloud(400, 120, 1) + cloud(1200, 150, 0.9) +
        ridge([[0, 360], [260, 300], [500, 340], [760, 290], [1000, 330], [1260, 280], [1600, 330]], '#89A98A', 0.8) +
        `<path d="M0 430 L1600 420 L1600 900 L0 900 Z" fill="#B7C66E"/>
         <path d="M0 520 L1600 500 L1600 900 L0 900 Z" fill="#8A6A3E"/>
         ${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 150 - 100} 900 L${i * 120 + 50} 510" stroke="#6E5230" stroke-width="5"/>`).join('')}
         <path d="M0 620 Q800 600 1600 630 L1600 900 L0 900 Z" fill="#A0824E" opacity=".55"/>` +
        [[300, 450], [520, 440], [1080, 440], [1320, 452]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><path d="M-60 0 L0 -70 L60 0 Z" fill="${i % 2 ? '#E9DAB4' : '#D9C79A'}"/><path d="M0 -70 L0 -110" stroke="#5A3A20" stroke-width="4"/><g class="flag"><path d="M0 -110 L36 -100 L0 -90 Z" fill="#B8322A"/></g></g>`).join('') +
        tree(150, 470, 0.7) + tree(1500, 465, 0.8, '#4E8A55') +
        Array.from({ length: 18 }, (_, i) => grass(60 + i * 90, 470 + (i % 3) * 8, 0.8, '#6E9A4E')).join('') + bird(900, 200) + bird(940, 180, 0.8);
    },

    temple() {
      return sky('g-tem', [[0, '#89C2E6'], [0.62, '#F3EBD3']]) +
        cloud(300, 120, 0.9) + cloud(900, 90, 0.7) +
        `<rect x="0" y="400" width="700" height="80" fill="#D7E4E6"/>
         ${Array.from({ length: 6 }, (_, i) => `<rect x="${20 + i * 110}" y="418" width="96" height="46" fill="#F4F6F2" stroke="#B9C6C8" stroke-width="3"/>`).join('')}
         ${[[60, 430], [280, 436], [500, 432]].map(([x, y]) => `<path d="M${x} ${y} l20 -18 l20 18 Z" fill="#FFFFFF"/>`).join('')}
         <path d="M0 480 L1600 470 L1600 900 L0 900 Z" fill="#CDB98E"/>
         <path d="M0 600 L1600 590 L1600 900 L0 900 Z" fill="#BFA77A"/>
         ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 200} 600 L${i * 220 - 100} 900" stroke="#A8915F" stroke-width="2"/>`).join('')}` +
        `<g>${brickWall(720, 380, 190, 110, '#B8463A')}${cnRoof(815, 380, 190)}
          <rect x="795" y="420" width="40" height="70" fill="#5A2A1A"/><rect x="740" y="410" width="34" height="30" fill="#F1E3C2" opacity=".85"/><rect x="856" y="410" width="34" height="30" fill="#F1E3C2" opacity=".85"/>
          ${brickWall(960, 400, 150, 90, '#A9503E')}${cnRoof(1035, 400, 150, '#4A3F3A', '#7A3A2A')}
          <rect x="1018" y="436" width="34" height="54" fill="#5A2A1A"/></g>` +
        `<g>${[[1140, 520], [1190, 512], [1240, 520], [1290, 512], [1165, 496], [1215, 490], [1265, 496]].map(([x, y]) => `<rect x="${x}" y="${y}" width="48" height="22" fill="#B5503A" stroke="#8E3B2A" stroke-width="2"/>`).join('')}
          ${[0, 1, 2].map(i => `<rect x="1330" y="${528 - i * 22}" width="200" height="20" rx="10" fill="#A0784A"/>`).join('')}
          <path d="M1120 540 L1560 540" stroke="#8A6A40" stroke-width="3"/></g>` +
        tree(120, 560, 0.9) + tree(650, 520, 0.6, '#4E8A55');
    },

    yamen() {
      return `<rect width="1600" height="900" fill="#5A3A28"/>
        <rect y="0" width="1600" height="90" fill="#3A2418"/>
        ${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 200}" y="0" width="30" height="90" fill="#2B1A10"/>`).join('')}
        <rect y="90" width="1600" height="14" fill="#B8322A"/>
        <rect x="560" y="150" width="480" height="110" fill="#1E1A18" stroke="#D9B64E" stroke-width="6"/>
        <text x="800" y="230" text-anchor="middle" font-size="70" font-weight="900" fill="#D9B64E" font-family="Noto Serif TC, serif" letter-spacing="14">巡撫部院</text>
        ${[[140, 0], [1420, 0]].map(([x]) => `<rect x="${x}" y="104" width="44" height="560" fill="#A8322A"/><rect x="${x - 6}" y="104" width="56" height="24" fill="#7A221C"/>`).join('')}
        ${[260, 1150].map(x => `<rect x="${x}" y="190" width="190" height="300" fill="#7A5236"/>
           ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 3 }, (_, c2) => `<rect x="${x + 14 + c2 * 58}" y="${204 + r * 56}" width="48" height="46" fill="#F1E3C2" opacity=".85"/>`).join('')).join('')}`).join('')}
        <rect y="600" width="1600" height="300" fill="#8E6A48"/>
        ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 200} 600 L${i * 240 - 160} 900" stroke="#6E4E32" stroke-width="3"/>`).join('')}
        <path d="M0 700 L1600 700 M0 800 L1600 800" stroke="#6E4E32" stroke-width="3"/>
        <rect x="860" y="590" width="270" height="22" fill="#4A2A18"/><rect x="870" y="612" width="18" height="90" fill="#3A2010"/><rect x="1102" y="612" width="18" height="90" fill="#3A2010"/>
        <path d="M876 590 L1114 590 L1100 562 L890 562 Z" fill="#E9DAB4"/>
        <path d="M930 580 q30 -12 60 0 q20 6 40 -4" stroke="#3E7CA6" stroke-width="3" fill="none"/><circle cx="1050" cy="574" r="5" fill="#B8322A"/>
        <path d="M0 0 L0 900" stroke="none"/>`;
    },

    harbor() {
      return sky('g-har', [[0, '#9CC9E4'], [0.55, '#E9EEE6']]) +
        cloud(240, 120, 0.9) + cloud(1340, 110, 1) +
        `<path d="M760 420 L1040 160 L1340 420 Z" fill="#6F9480"/><path d="M880 420 L1040 230 L1200 420 Z" fill="#5E8470"/>
         <path d="M600 420 Q700 380 780 420 Z M1300 420 Q1420 370 1560 420 Z" fill="#6F9480"/>
         <rect y="418" width="1600" height="210" fill="#4F86A6"/>` + waveRow(450, '#E8F3F7', 4) + waveRow(500, '#E8F3F7', 6, 'wave wave2') +
        `<g transform="translate(470 480) scale(.8)"><path d="M-170 0 L170 0 L140 50 L-150 50 Z" fill="#2B2E32"/><rect x="-120" y="-50" width="200" height="50" fill="#E9E4D6"/>
           <rect x="-30" y="-140" width="36" height="92" fill="#B8322A"/><rect x="-30" y="-150" width="36" height="14" fill="#1E1E20"/>
           ${[-100, -60, 30, 60].map(x => `<rect x="${x}" y="-38" width="16" height="16" rx="8" fill="#5A6E80"/>`).join('')}
           <g class="smoke"><circle cx="-12" cy="-170" r="20" fill="#DADAD4" opacity=".7"/><circle cx="16" cy="-200" r="26" fill="#DADAD4" opacity=".5"/></g></g>` +
        junk(1180, 520, 0.35, '清', '#5A3A22') +
        `<path d="M0 600 Q800 580 1600 610 L1600 900 L0 900 Z" fill="#B9A988"/>
         <path d="M0 640 L1600 640 L1600 900 L0 900 Z" fill="#9E8E6E"/>
         ${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 110} 640 L${i * 110} 900" stroke="#857556" stroke-width="2"/>`).join('')}
         <g>${brickWall(80, 450, 260, 190, '#C0614A')}<path d="M60 452 L210 380 L360 452 Z" fill="#5A3A28"/>
           ${[110, 190, 270].map(x => `<rect x="${x}" y="490" width="40" height="60" rx="18" fill="#F1E3C2"/>`).join('')}
           <rect x="170" y="580" width="40" height="60" fill="#4A2A18"/>
           <rect x="120" y="400" width="140" height="34" fill="#1E1E20"/><text x="190" y="425" text-anchor="middle" font-size="22" fill="#D9B64E" font-family="Noto Serif TC, serif">電報局</text></g>
         ${[420, 700, 980].map(x => `<path d="M${x} 640 L${x} 380" stroke="#5A3A20" stroke-width="9"/><path d="M${x - 30} 396 L${x + 30} 396" stroke="#5A3A20" stroke-width="6"/>`).join('')}
         <path d="M340 400 Q380 418 420 396 Q560 420 700 396 Q840 420 980 396 Q1100 420 1220 392" stroke="#2B2B2E" stroke-width="2.5" fill="none"/>`;
    },

    taipei() {
      return sky('g-tpe', [[0, '#3C3F72'], [0.4, '#B9708A'], [0.62, '#F2B57E']]) +
        `<circle cx="1260" cy="360" r="56" fill="#FFD9A0" opacity=".85"/>` + cloud(400, 140, 0.9, '#E4A0A6', 0.5) +
        `<rect x="0" y="380" width="1600" height="120" fill="#6E5A6A"/>
         ${Array.from({ length: 40 }, (_, i) => `<rect x="${i * 40}" y="368" width="24" height="16" fill="#6E5A6A"/>`).join('')}
         <g transform="translate(800 0)">
           <rect x="-170" y="300" width="340" height="200" fill="#8E7660"/>
           <path d="M-60 500 L-60 400 Q0 350 60 400 L60 500 Z" fill="#2B1E1E"/>
           <rect x="-130" y="220" width="260" height="80" fill="#9C8068"/>
           <rect x="-90" y="240" width="40" height="30" rx="14" fill="#2B1E1E"/><rect x="50" y="240" width="40" height="30" rx="14" fill="#2B1E1E"/>
           <rect x="-40" y="236" width="80" height="34" fill="#1E1A18"/><text x="0" y="261" text-anchor="middle" font-size="22" fill="#D9B64E" font-family="Noto Serif TC, serif">承恩門</text>
           ${cnRoof(0, 222, 260, '#3A2E30', '#5A4044')}
         </g>
         <path d="M0 500 L1600 500 L1600 900 L0 900 Z" fill="#7A6658"/>
         <path d="M0 560 L1600 560 L1600 900 L0 900 Z" fill="#8C7868"/>
         ${Array.from({ length: 32 }, (_, i) => `<rect x="${i * 52}" y="684" width="12" height="40" fill="#6B5040"/>`).join('')}
         <path d="M0 692 L1600 690" stroke="#4A3C34" stroke-width="8"/><path d="M0 716 L1600 714" stroke="#4A3C34" stroke-width="8"/>
         ${[[90, 540], [1520, 540]].map(([x, y]) => `<g transform="translate(${x} ${y})"><rect x="-80" y="-120" width="160" height="120" fill="#B05A44"/><path d="M-100 -116 L0 -170 L100 -116 Z" fill="#4A3436"/>
            <rect x="-56" y="-90" width="40" height="40" fill="#F4D58E" opacity=".9"/><rect x="16" y="-90" width="40" height="40" fill="#F4D58E" opacity=".9"/></g>`).join('')}
         ${[[300, 530], [480, 530], [1120, 530], [1300, 530]].map(([x, y]) => `<g class="glow"><path d="M${x} ${y - 80} L${x} ${y - 56}" stroke="#3A2A1A" stroke-width="2"/><ellipse cx="${x}" cy="${y - 40}" rx="16" ry="20" fill="#E8503A"/><ellipse cx="${x}" cy="${y - 40}" rx="30" ry="32" fill="#F7B267" opacity=".22"/></g>`).join('')}
         ${[[200, 450], [1400, 450]].map(([x, y]) => `<path d="M${x} 560 L${x} ${y - 60}" stroke="#3A2A1A" stroke-width="8"/><path d="M${x - 26} ${y - 46} L${x + 26} ${y - 46}" stroke="#3A2A1A" stroke-width="5"/>`).join('')}
         <path d="M226 404 Q800 440 1374 404" stroke="#1E1A18" stroke-width="2.5" fill="none"/>`;
    }
  };

  function scene(id) { return (SCENES[id] || SCENES.deck)(); }

  /* =========================================================
   * 臺灣小地圖（約略經緯度換算，2 公里 ≈ 1 單位）
   * ========================================================= */
  const TAIWAN_PTS = [[83, 5], [93, 14], [106, 21], [98, 30], [99, 44], [95, 60], [87, 78], [80, 104], [75, 127], [63, 147], [56, 165], [50, 184], [48, 194], [42, 192], [39, 180], [35, 168], [24, 160], [18, 155], [13, 133], [11, 108], [12, 91], [22, 75], [31, 62], [40, 47], [51, 32], [60, 20], [70, 15], [78, 12]];
  function smoothPath(pts) {
    const n = pts.length; let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d + 'Z';
  }
  const TAIWAN_D = smoothPath(TAIWAN_PTS);
  function taiwan(opts = {}) {
    const { fill = 'none', stroke = 'currentColor', marker = null, penghu = true, cls = '' } = opts;
    return `<svg class="${cls}" viewBox="-28 -4 146 206" aria-hidden="true">
      <path d="${TAIWAN_D}" fill="${fill}" stroke="${stroke}" stroke-width="2.2" stroke-linejoin="round"/>
      ${penghu ? `<g fill="${stroke}"><circle cx="-14" cy="108" r="2.6"/><circle cx="-9" cy="114" r="1.8"/><circle cx="-17" cy="117" r="1.6"/></g>` : ''}
      ${marker ? `<circle class="map-pulse" cx="${marker[0]}" cy="${marker[1]}" r="9" style="fill:none;stroke:var(--brass);stroke-width:2"/><circle cx="${marker[0]}" cy="${marker[1]}" r="4.5" style="fill:var(--brass)"/>` : ''}
    </svg>`;
  }

  return { character, portrait, prop, propBox, scene, taiwan, shade };
})();
