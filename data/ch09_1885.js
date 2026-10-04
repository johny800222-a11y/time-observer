/* 第 9 章　西元 1885 年：清領後期的現代化建設
 * 對應：五下「臺灣建省與現代化」— 清法戰爭後建省、劉銘傳的鐵路、電報郵政、西學堂
 */
window.GAME_DATA.chapters.ch09 = {
  id: 'ch09',
  year: 1885,
  title: '清領後期的現代化建設',
  unit: '五下・臺灣建省與現代化',

  cast: {
    liu:      { name: '劉銘傳', role: '臺灣第一任巡撫',
      look: { skin: '#E7BD94', hairStyle: 'queue', hair: '#1C1A18', hat: 'qing', hatColor: '#2A2626', button: '#C0392B',
              outfit: 'qingrobe', color: '#1F2A44', color2: '#D9B64E', pants: '#151C2E',
              beard: 'vandyke', beardColor: '#1C1A18', expr: 'serious' } },
    veteran:  { name: '老兵 阿勇', role: '打過清法戰爭的士兵',
      look: { skin: '#C99062', hairStyle: 'queue', hair: '#2A2622', hat: 'turban', hatColor: '#2B2B2B',
              outfit: 'yong', color: '#2D4D7A', color2: '#C0392B', patch: '勇', pants: '#26324A',
              beard: 'goatee', beardColor: '#3A3530', expr: 'serious', acc: 'spear' } },
    merchant: { name: '大稻埕茶商', role: '做茶葉生意的商人',
      look: { skin: '#EDC7A0', hairStyle: 'queue', hair: '#1F1C1A', hat: 'guapi', hatColor: '#1E1E22', button: '#C0392B',
              outfit: 'magua', color: '#7A5A3A', color2: '#2E2622', pants: '#2E2622', expr: 'worry', acc: 'abacus' } },
    engineer: { name: '英國工程師', role: '劉銘傳聘請的外國技師',
      look: { skin: '#F4D7BE', hairStyle: 'short', hair: '#B5652D', hat: 'bowler', hatColor: '#2B2B2E',
              outfit: 'suit', color: '#4A4A55', color2: '#F2F2F2', pants: '#3A3A44',
              beard: 'mustache', beardColor: '#B5652D', expr: 'smile', acc: 'paper' } },
    advisor:  { name: '師爺', role: '巡撫的幕僚',
      look: { skin: '#EBC6A0', hairStyle: 'queue', hair: '#2B2826', hat: 'guapi', hatColor: '#1E1E22', button: '#2E7D5B',
              outfit: 'robe', color: '#5D6B4E', color2: '#3F4A35', pants: '#2E3527',
              beard: 'goatee', beardColor: '#8A847C', expr: 'smile', acc: 'book' } },
    seaman:   { name: '輪船水手', role: '往返福州與淡水的船員',
      look: { skin: '#C08656', hairStyle: 'queue', hair: '#1D1B19', hat: 'bandana', hatColor: '#2F4F6F',
              outfit: 'worker', color: '#D8D2C2', color2: '#9C9686', pants: '#2F4F6F', expr: 'worry' } },
    telegraph:{ name: '電報技師', role: '負責架設電報線的技師',
      look: { skin: '#F2D3B8', hairStyle: 'short', hair: '#4A3426', hat: 'flatcap', hatColor: '#5A5048',
              outfit: 'suit', color: '#6A5A48', color2: '#EFE8DA', pants: '#4A4036',
              beard: 'mustache', beardColor: '#4A3426', expr: 'happy', acc: 'paper' } },
    courier:  { name: '驛站信差', role: '傳送公文的小兵',
      look: { skin: '#D19C70', hairStyle: 'queue', hair: '#1E1C1A', hat: 'turban', hatColor: '#7A2E28',
              outfit: 'yong', color: '#6E7F5A', color2: '#E9C46A', patch: '驛', pants: '#3E4733', expr: 'worry', acc: 'letter' } },
    youth:    { name: '年輕人 阿義', role: '對新知識好奇的青年',
      look: { skin: '#EAC29A', hairStyle: 'queue', hair: '#1B1917', outfit: 'robe', color: '#7FA3C2', color2: '#5B7E9C',
              pants: '#3D5266', expr: 'happy', acc: 'book' } },
    teacher:  { name: '私塾先生', role: '教四書五經的老師',
      look: { skin: '#EDCBA8', hairStyle: 'queue', hair: '#DAD4CA', hat: 'guapi', hatColor: '#1E1E22', button: '#C0392B',
              outfit: 'robe', color: '#8A8A86', color2: '#5E5E5A', pants: '#4A4A46',
              beard: 'longbeard', beardColor: '#EDEAE4', expr: 'serious', acc: 'book' } },
    vendor:   { name: '賣燈籠的大嬸', role: '臺北城裡的小販',
      look: { skin: '#E6BA90', hairStyle: 'bun', hair: '#1D1A18', outfit: 'qingwoman', color: '#3E6E7E', color2: '#C9B37E',
              pants: '#2E3A44', expr: 'happy', acc: 'lantern', woman: true } }
  },

  intro: [
    { who: 'system', text: '時空座標鎖定：西元 1885 年，臺北。' },
    { who: 'narrator', text: '轟隆——遠方好像還留著砲聲的回音。你連結上了一位眼神銳利、留著鬍子的官員。' },
    { who: 'narrator', text: '他是剛打完[[清法戰爭]]的將軍[[劉銘傳]]。這一年，清朝決定讓臺灣[[建省]]，由他擔任第一任臺灣[[巡撫]]。' },
    { who: 'host', text: '（法國艦隊差一點就把臺灣搶走了。臺灣是東南沿海的門戶，一定要讓它強大起來！）' }
  ],

  scenes: [
    /* ───────── 場景一：巡撫衙門 ───────── */
    {
      id: 'yamen', bg: 'yamen', host: 'liu',
      title: '巡撫衙門裡的地圖', time: '1886 年', place: '臺北・巡撫衙門',
      enter: [
        { who: 'narrator', text: '衙門的大廳裡，桌上攤著一張臺灣北部的地圖。大家等著巡撫大人下令。' }
      ],
      objective: '聽聽大家的意見，決定第一項建設',
      need: 2,
      actors: [
        { cast: 'liu', host: true, x: 800, y: 805, s: 1.05,
          lines: [
            { who: 'host', text: '（要讓臺灣強大，得先讓人、貨物和軍隊都能快速移動。）' }
          ] },
        { cast: 'veteran', x: 380, y: 810, s: 1,
          clue: '基隆和臺北之間隔著山，運送軍隊又慢又累',
          idle: '那一仗，打得真辛苦。',
          lines: [
            '大人！兩年前法軍攻打[[滬尾]]（淡水），我們拚死守住了！',
            '可是基隆一度被法軍占領。從臺北送軍隊、運大砲過去，要翻山越嶺，又慢又累……'
          ] },
        { cast: 'merchant', x: 1170, y: 810, s: 1,
          clue: '茶葉和煤要運到港口，靠人挑牛車又慢又貴',
          idle: '這運費，又漲了！',
          lines: [
            '大人，我們[[大稻埕]]的茶葉、基隆山裡挖的[[煤礦]]，都要運到港口上船。',
            '現在全靠人挑、靠牛車，又慢又貴，生意難做啊！'
          ] },
        { cast: 'engineer', x: 1400, y: 805, s: 1, flip: true,
          clue: '火車一天能跑好幾百里，運量又大',
          idle: 'Good morning, sir!',
          lines: [
            '巡撫大人，在我的國家英國，大家搭乘一種冒著白煙的鐵車——火車！',
            '只要鋪好鐵軌，火車一天能跑好幾百里，一次還能載好多貨物和人。'
          ] },
        { cast: 'advisor', x: 580, y: 815, s: 0.98,
          idle: '算盤可不能打錯。',
          lines: [
            '大人，要做大事得先有錢。您下令重新丈量全臺灣的土地，叫做「[[清賦]]」。',
            '抓出好多以前沒報稅的田地，官府的收入一下子增加了不少！'
          ] },
        { prop: 'zone', name: '桌上的地圖', x: 990, y: 600, w: 230, h: 120,
          lines: [
            { who: 'narrator', text: '地圖上，基隆港和臺北城之間，隔著一座山——[[獅球嶺]]。' }
          ] }
      ],
      decision: {
        prompt: '基隆港和臺北之間，運輸又慢又辛苦。你命令劉銘傳推動什麼建設？',
        options: [
          { text: '修築鐵路，讓火車載運貨物、旅客和軍隊。', ok: true,
            fb: '1887 年臺灣鐵路開工，工人們挖通了臺灣第一座鐵路隧道——[[獅球嶺隧道]]。基隆到臺北在 1891 年通車，1893 年延伸到新竹，這就是[[臺灣第一條鐵路]]！' },
          { text: '多買幾百頂轎子，請轎夫幫忙抬。',
            fb: '轎子一次只能坐一個人，大砲、茶葉和煤礦可抬不動……速度也比走路快不了多少！' },
          { text: '在山上挖一條運河，讓船開過去。',
            fb: '基隆和臺北之間隔著山嶺，運河要怎麼「爬山」呢？工程太浩大，根本做不到。' }
        ],
        card: { id: 'railway', title: '臺灣第一條鐵路', year: '1887–1893',
          body: '劉銘傳推動興建，1887 年開工，基隆到臺北在 1891 年通車，1893 年延伸到新竹。沿線挖通了臺灣第一座鐵路隧道「獅球嶺隧道」。',
          today: '基隆市還保存著獅球嶺隧道；火車頭「騰雲號」展示在臺北二二八和平紀念公園。' }
      }
    },

    /* ───────── 場景二：滬尾港 ───────── */
    {
      id: 'harbor', bg: 'harbor', host: 'liu',
      title: '滬尾港的遲到公文', time: '1887 年', place: '滬尾（今新北市淡水）',
      enter: [
        { who: 'narrator', text: '鐵路工程開始了。這天，一艘輪船從福州送來一份公文，日期竟然是好多天以前的！' },
        { who: 'host', text: '（臺灣隔著海峽，跟朝廷聯絡全靠船。遇到颱風，消息就斷了。打仗的時候，這可是會出大事的！）' }
      ],
      objective: '在港口打聽消息，想辦法讓通訊變快',
      need: 2,
      actors: [
        { cast: 'liu', host: true, x: 820, y: 805, s: 1.05,
          lines: [ { who: 'host', text: '（有沒有辦法，讓消息不必坐船，也能跨過大海？）' } ] },
        { cast: 'seaman', x: 400, y: 810, s: 1,
          clue: '靠船送信，遇到風浪好幾天都出不了港',
          idle: '今天浪好大……',
          lines: [
            '大人，從福州開船過來，順利的話也要一兩天。',
            '冬天風浪大，有時候好幾天都開不了船，公文只好在港口乾等。'
          ] },
        { cast: 'telegraph', x: 1150, y: 810, s: 1,
          clue: '電報能用電線，幾分鐘就把消息送到遠方',
          idle: '滴、滴、答——',
          lines: [
            '大人請看這個機器！按下電鍵，「滴滴答答」的訊號就會順著電線傳出去，這叫[[電報]]。',
            '只要在海底鋪一條防水的電線——[[海底電纜]]，消息幾分鐘就能傳到對岸！'
          ] },
        { cast: 'courier', x: 600, y: 815, s: 0.98, flip: true,
          clue: '舊的驛站送信慢，需要新式郵政',
          idle: '呼……呼……跑不動了。',
          lines: [
            '報告大人，以前公文都靠驛站的人一站接一站跑，從臺南到臺北要跑好幾天！',
            '聽說大人要辦新式的[[郵政]]，連老百姓的信也能寄，還要發行郵票？'
          ] },
        { prop: 'cable', name: '黑色電纜', x: 1400, y: 815, s: 1,
          lines: [
            { who: 'narrator', text: '一大捆黑色的電纜，外面包著厚厚的防水層，看起來好重。' }
          ] }
      ],
      decision: {
        prompt: '臺灣和對岸的消息傳遞太慢了。你命令劉銘傳怎麼做？',
        options: [
          { text: '訓練一大群信鴿來送信。',
            fb: '鴿子飛越臺灣海峽，遇到大風大雨很容易迷路……重要的軍事消息不能靠運氣！' },
          { text: '架設電報線，並鋪設連接淡水和福州的海底電纜。', ok: true,
            fb: '劉銘傳架設了南北的電報線，1887 年更完成了從滬尾（淡水）通往福州的[[海底電纜]]。1888 年他又成立新式郵政，發行郵票。臺灣和外面的世界連上線了！' },
          { text: '在山頂點烽火，一座接一座傳過去。',
            fb: '烽火只能傳「有敵人來了」這種簡單的訊號，而且海峽那麼寬，對岸根本看不到！' }
        ],
        card: { id: 'telegraph', title: '電報與郵政', year: '1887–1888',
          body: '劉銘傳架設南北電報線，1887 年完成滬尾（淡水）到福州的海底電纜；1888 年設立臺灣郵政總局、發行郵票，改革了通訊方式。',
          today: '今天的網路，也是靠一條條海底電纜和全世界連線喔！' }
      }
    },

    /* ───────── 場景三：臺北城 ───────── */
    {
      id: 'taipei', bg: 'taipei', host: 'liu',
      title: '臺北城的新氣象', time: '1887 年', place: '臺北城・北門外',
      enter: [
        { who: 'narrator', text: '傍晚的臺北城，城門外工人們正在豎立電線桿，鐵軌一段一段往前鋪。' },
        { who: 'host', text: '（鐵路、電報都蓋起來了。可是，這些機器壞了，誰來修？）' }
      ],
      objective: '在城裡走走，看看新建設還缺什麼',
      need: 2,
      actors: [
        { cast: 'liu', host: true, x: 800, y: 805, s: 1.05,
          lines: [ { who: 'host', text: '（建設不能只靠買機器。人才，才是最重要的。）' } ] },
        { cast: 'youth', x: 400, y: 810, s: 1,
          clue: '年輕人想學新知識，卻沒有學校可以學',
          idle: '火車到底是怎麼跑的呢？',
          lines: [
            '大人好！我好想知道火車為什麼會跑、電報為什麼能傳話！',
            '可是城裡的私塾只教四書五經，沒有地方能學這些新知識……'
          ] },
        { cast: 'teacher', x: 200, y: 805, s: 1,
          idle: '之乎者也……',
          lines: [
            '哼！讀聖賢書、考[[科舉]]才是正途。',
            '學那些洋人的奇技淫巧做什麼？'
          ],
          again: [ { who: 'system', text: '觀測器提醒：新舊觀念的衝突，是現代化過程中常見的挑戰。' } ] },
        { cast: 'engineer', x: 1290, y: 812, s: 1,
          clue: '一直請外國技師又貴，技術也學不到',
          idle: 'Tea time!',
          lines: [
            '大人，鐵路和電報要常常保養。現在全靠我們這些外國技師。',
            '不過說實話，請我們一個月的薪水可不便宜喔！'
          ] },
        { cast: 'vendor', x: 1470, y: 815, s: 1, flip: true,
          idle: '燈籠喔～漂亮的燈籠！',
          lines: [
            '大人，這[[臺北城]]才蓋好沒幾年，現在又是鐵路又是電線桿，好熱鬧喔！',
            '聽說明年，街上還要點起不用火的[[電燈]]？那我的燈籠還賣得出去嗎？'
          ] },
        { prop: 'train', name: '火車頭「騰雲號」', x: 1060, y: 712, s: 0.62,
          clue: '火車頭需要懂機械的人操作、維修',
          lines: [
            { who: 'narrator', text: '這是從德國訂購的火車頭「[[騰雲號]]」，黑亮亮的鍋爐、大大的輪子，好威風！' },
            { who: 'host', text: '（這麼複雜的機器，得有人會開、會修才行。）' },
            { who: 'system', text: '時空小知識：騰雲號今天還保存在臺北的二二八和平紀念公園裡，可以去看它喔！' }
          ] },
        { prop: 'lamp', name: '新豎的電線桿', x: 590, y: 790, s: 1,
          lines: [
            { who: 'narrator', text: '一根新豎起的電線桿，上面掛著還沒點亮的燈。' }
          ] }
      ],
      decision: {
        prompt: '新式建設需要懂科學和技術的人才。你命令劉銘傳怎麼做？',
        options: [
          { text: '什麼都不改，大家照樣只讀古書、考科舉。',
            fb: '鐵路壞了、電報斷了，卻沒有人會修……現代化建設會停擺！' },
          { text: '所有工作都請外國人來做，臺灣人不用學。',
            fb: '外國技師非常昂貴，而且技術永遠掌握在別人手上，一點都不長久。' },
          { text: '設立西學堂和電報學堂，培養懂新知識的人才。', ok: true,
            fb: '1887 年劉銘傳在大稻埕設立[[西學堂]]，教英文、數學、地理和科學，隔年又設電報學堂，培養臺灣自己的技術人才。在他的努力下，臺灣成為當時清朝最進步的省分之一！' }
        ],
        card: { id: 'xixuetang', title: '西學堂', year: '1887',
          body: '劉銘傳設立的新式學校，除了漢文，也教英文、數學、地理、歷史、科學與測量；1888 年再設電報學堂，培養電報人才。',
          today: '你在學校上的英文、數學和自然課，和當年西學堂的課程有點像呢！' }
      }
    }
  ],

  outro: [
    { who: 'narrator', text: '1891 年，劉銘傳離開臺灣。他留下的鐵路、電報和學堂，讓臺灣邁向現代化。' },
    { who: 'narrator', text: '四年後（1895 年），清朝在甲午戰爭中戰敗，簽訂[[馬關條約]]，把臺灣割讓給日本……' },
    { who: 'system', text: '偵測到時間軸波動！啟動「歷史修正檢驗」，確認你的觀測紀錄。' }
  ],

  quiz: [
    { tag: '人物連結題',
      q: '1885 年臺灣建省，第一任臺灣巡撫是誰？',
      options: ['沈葆楨', '劉銘傳', '陳永華'], answer: 1,
      explain: '劉銘傳是第一任臺灣巡撫。沈葆楨是 1874 年牡丹社事件後來臺加強海防的官員。' },
    { tag: '因果素養題',
      q: '清朝決定讓臺灣建省，主要是因為哪一場戰爭，讓朝廷發現臺灣很重要？',
      options: ['清法戰爭', '甲午戰爭', '鴉片戰爭'], answer: 0,
      explain: '1884～1885 年清法戰爭，法軍攻打基隆、淡水，朝廷才更重視臺灣，在 1885 年讓臺灣建省。' },
    { tag: '記憶連結題',
      q: '劉銘傳推動的臺灣第一條鐵路，最後通到哪兩地之間？',
      options: ['基隆—新竹', '臺北—高雄', '臺南—嘉義'], answer: 0,
      explain: '1891 年基隆到臺北通車，1893 年延伸到新竹。' },
    { tag: '地理連結題',
      q: '劉銘傳完成的海底電纜，連接了淡水和哪裡？',
      options: ['福州', '上海', '日本長崎'], answer: 0,
      explain: '1887 年完成滬尾（淡水）到福州的海底電纜，消息不用再等船了。' },
    { tag: '是非思辨題', type: 'tf',
      q: '劉銘傳的現代化建設，讓臺灣成為當時清朝最進步的省分之一。',
      answer: true,
      explain: '對！鐵路、電報、郵政、新式學堂，在當時的清朝都是很先進的建設。' }
  ],

  glossary: {
    '清法戰爭': '1884～1885 年清朝和法國的戰爭，法軍曾攻打基隆、淡水並占領澎湖。',
    '劉銘傳': '臺灣第一任巡撫（1885～1891），推動鐵路、電報、郵政、新式學堂等現代化建設。',
    '建省': '1885 年清朝把臺灣從福建省分出來，成為獨立的「臺灣省」。',
    '巡撫': '清朝一個省的最高行政長官。',
    '滬尾': '淡水的舊名。1884 年清軍在這裡擊退法軍，稱為「滬尾之役」。',
    '大稻埕': '臺北淡水河邊的商業區，清末以茶葉貿易聞名。',
    '煤礦': '埋在地下的煤炭，可以當燃料。基隆一帶自古就產煤。',
    '清賦': '劉銘傳重新丈量全臺土地、整理稅收的政策，讓官府收入大增。',
    '獅球嶺': '基隆和臺北之間的山嶺。',
    '獅球嶺隧道': '臺灣第一座鐵路隧道，在基隆，劉銘傳時期挖通。',
    '臺灣第一條鐵路': '劉銘傳推動興建，基隆到臺北 1891 年通車，1893 年延伸到新竹。',
    '騰雲號': '臺灣鐵路的第一批火車頭之一，1887 年在德國製造，今天保存在臺北二二八和平紀念公園。',
    '電報': '用電訊號傳送文字消息的通訊方式，以「滴、答」的長短訊號代表文字。',
    '海底電纜': '鋪在海底的電線。1887 年完成淡水到福州的海底電纜。',
    '郵政': '收送信件的制度。1888 年劉銘傳成立臺灣郵政總局，發行郵票。',
    '西學堂': '1887 年劉銘傳在大稻埕設立的新式學校，教授英文、數學、科學等。',
    '科舉': '古代用考試選拔官員的制度，主要考四書五經。',
    '臺北城': '清朝在 1884 年完工的城池，今天還保留著原貌的北門（承恩門）。',
    '電燈': '1888 年前後，劉銘傳在臺北點亮電燈，是臺灣最早的電燈之一。',
    '馬關條約': '1895 年清朝甲午戰敗後和日本簽訂的條約，把臺灣、澎湖割讓給日本。'
  }
};
