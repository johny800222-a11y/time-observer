/* 第 5 章　西元 1661 年：明鄭時期的荒地大開墾
 * 對應：五上「鄭氏時期的臺灣」— 鹿耳門登陸驅荷、屯田制（營盤地名）、陳永華興學與建設
 */
window.GAME_DATA.chapters.ch05 = {
  id: 'ch05',
  year: 1661,
  title: '明鄭時期的荒地大開墾',
  unit: '五上・鄭氏時期的臺灣',

  cast: {
    koxinga: { name: '鄭成功', role: '人稱「國姓爺」的艦隊主帥',
      look: { skin: '#EBC39C', hairStyle: 'bun', hair: '#1A1614', hat: 'helmet', hatColor: '#C9A23F',
              outfit: 'armor', color: '#A8322D', color2: '#D9B64E', pants: '#3A2622',
              beard: 'mustache', beardColor: '#1A1614', expr: 'serious', acc: 'sword' } },
    hebin:   { name: '何斌', role: '曾替荷蘭人工作的通譯',
      look: { skin: '#EAC29C', hairStyle: 'bun', hair: '#25201C', hat: 'wrap', hatColor: '#2B2B30',
              outfit: 'robe', color: '#6B5A86', color2: '#E3D3B0', pants: '#33293F',
              beard: 'goatee', beardColor: '#25201C', expr: 'smile', acc: 'scroll' } },
    boatman: { name: '老船夫', role: '熟悉潮汐的掌舵人',
      look: { skin: '#B98256', hairStyle: 'bun', hair: '#D8D2C6', hat: 'straw', hatColor: '#CFAE66',
              outfit: 'worker', color: '#7A8C6E', color2: '#56664C', pants: '#4B5A43',
              beard: 'goatee', beardColor: '#E5E0D6', expr: 'smile', acc: 'oar' } },
    soldier: { name: '鄭軍士兵', role: '從金門、廈門出發的將士',
      look: { skin: '#D7A47A', hairStyle: 'bun', hair: '#1E1A17', hat: 'soldiercap', hatColor: '#7A2E28',
              outfit: 'armor', color: '#6E3B2E', color2: '#A9853F', pants: '#3A2A22', expr: 'serious', acc: 'spear' } },
    general: { name: '鄭軍將領', role: '帶領一營士兵的將領',
      look: { skin: '#D9A880', hairStyle: 'bun', hair: '#1C1816', hat: 'helmet', hatColor: '#8E8A80',
              outfit: 'armor', color: '#3F5873', color2: '#B9A16A', pants: '#2B3442',
              beard: 'full', beardColor: '#1C1816', expr: 'worry', acc: 'spear' } },
    oldfarmer: { name: '漢人老農', role: '荷蘭時期就來臺開墾的農夫',
      look: { skin: '#C48A5C', hairStyle: 'bun', hair: '#CFC8BA', hat: 'straw', hatColor: '#D8B46A',
              outfit: 'worker', color: '#5D7EA0', color2: '#3E4F66', pants: '#3E4F66',
              beard: 'goatee', beardColor: '#DDD6CA', expr: 'smile', acc: 'hoe' } },
    pingpu:  { name: '平埔族長老', role: '世居這片草原的族人',
      look: { skin: '#B07448', hairStyle: 'long', hair: '#3A3632', hat: 'featherband', hatColor: '#2E7D5B',
              outfit: 'siraya', color: '#3A322B', color2: '#2E7D5B', pants: '#B07448', expr: 'serious', acc: 'staff' } },
    chen:    { name: '陳永華', role: '鄭經最信任的參謀',
      look: { skin: '#EDC7A2', hairStyle: 'bun', hair: '#1D1917', hat: 'scholar', hatColor: '#1D1D22',
              outfit: 'robe', color: '#2F4A6D', color2: '#D9C38E', pants: '#22324A',
              beard: 'longbeard', beardColor: '#1D1917', expr: 'smile', acc: 'fan' } },
    scholar: { name: '讀書人 林先生', role: '從大陸來臺的文人',
      look: { skin: '#F0CDA9', hairStyle: 'bun', hair: '#22201E', hat: 'scholar', hatColor: '#2A2A30',
              outfit: 'robe', color: '#BFC9C2', color2: '#7F8F86', pants: '#5E6B64',
              beard: 'goatee', beardColor: '#22201E', expr: 'worry', acc: 'book' } },
    boy:     { name: '東寧的孩子 阿明', role: '想讀書的小男孩',
      look: { skin: '#E3B48A', hairStyle: 'kidbun', hair: '#1A1714', outfit: 'worker', color: '#C46A3A', color2: '#8C4A28',
              pants: '#4B3A2E', expr: 'happy', kid: true } },
    salter:  { name: '鹽工 阿海', role: '在海邊製鹽的工人',
      look: { skin: '#B57A4C', hairStyle: 'bun', hair: '#1B1916', hat: 'bandana', hatColor: '#E8E2D2',
              outfit: 'worker', color: '#E2DCCB', color2: '#B9B19C', pants: '#4D5F70', expr: 'happy', acc: 'rake' } },
    potter:  { name: '燒瓦師傅', role: '燒製磚瓦的工匠',
      look: { skin: '#C99366', hairStyle: 'bun', hair: '#262220', hat: 'bandana', hatColor: '#7A4B33',
              outfit: 'worker', color: '#8E5B3E', color2: '#6A4330', pants: '#3E3029', expr: 'smile', acc: 'brick' } }
  },

  intro: [
    { who: 'system', text: '時空座標鎖定：西元 1661 年 4 月，臺灣海峽・鹿耳門外。' },
    { who: 'narrator', text: '你睜開眼睛，眼前是密密麻麻的戰船，船帆上飄著大大的「鄭」字旗。' },
    { who: 'narrator', text: '你的意識連結上了這支艦隊的主帥——[[鄭成功]]，大家都叫他「[[國姓爺]]」。' },
    { who: 'system', text: '還記得 1624 年在日本出生的小嬰兒「福松」嗎？他已經 37 歲了！' },
    { who: 'host', text: '（清朝的軍隊越來越強，金門、廈門快守不住了。臺灣土地肥沃，若能趕走荷蘭人，就能在那裡建立長久的基地……）' }
  ],

  scenes: [
    /* ───────── 場景一：鹿耳門外 ───────── */
    {
      id: 'luermen', bg: 'luermen', host: 'koxinga',
      title: '鹿耳門外的潮水', time: '1661 年 4 月', place: '鹿耳門外海',
      enter: [
        { who: 'narrator', text: '天剛亮，數百艘戰船停在海上。遠遠的沙洲後面，就是荷蘭人的熱蘭遮城。' }
      ],
      objective: '打聽情報，找出艦隊進入台江內海的方法',
      need: 2,
      actors: [
        { cast: 'koxinga', host: true, x: 800, y: 800, s: 1.05,
          lines: [
            { who: 'host', text: '（熱蘭遮城的大砲又多又猛，從正面硬闖一定損失慘重。）' },
            { who: 'host', text: '（有沒有荷蘭人想不到的路呢？）' }
          ] },
        { cast: 'hebin', x: 1140, y: 800, s: 1,
          clue: '鹿耳門水道又淺又彎，荷蘭人幾乎沒有防守',
          idle: '這張圖，可是我的寶貝。',
          lines: [
            '國姓爺，我是[[何斌]]，以前在大員替荷蘭人當通譯。這張水道圖，是我偷偷畫下來的。',
            '熱蘭遮城的大砲對準南邊的大港，正面衝進去會被打成碎片。',
            '可是北邊的[[鹿耳門]]水道又淺又彎，荷蘭人覺得大船過不去，所以幾乎沒有防守！'
          ],
          again: [ '只要通過鹿耳門，就能直接進入台江內海，繞到荷蘭人背後！' ] },
        { cast: 'boatman', x: 380, y: 805, s: 1,
          clue: '漲潮時海水變深，大船就能通過淺水道',
          idle: '看這浪，潮水快來了……',
          lines: [
            '我在海上撐了一輩子船，看潮水最準啦！',
            '鹿耳門平常水很淺，船底一不小心就卡在沙上。',
            '不過每到[[漲潮]]的時候，海水會漲高好幾尺，大船就過得去囉！'
          ] },
        { cast: 'soldier', x: 580, y: 810, s: 0.98, flip: true,
          clue: '軍糧只夠幾天，必須速戰速決',
          idle: '為國姓爺效命！',
          lines: [
            '報告國姓爺！我們有兩萬多名將士、幾百艘戰船。',
            '不過……船上的糧食只夠吃幾天，要速戰速決才行！'
          ] },
        { prop: 'seachart', name: '鹿耳門水道圖', x: 1000, y: 745, s: 0.9,
          lines: [
            { who: 'narrator', text: '水道圖上，鹿耳門彎彎曲曲，兩旁是淺淺的沙洲。旁邊用小字寫著：「潮漲水深」。' }
          ] },
        { prop: 'cannon', name: '鄭軍火砲', x: 1420, y: 810, s: 1,
          lines: [
            { who: 'narrator', text: '鄭軍的火砲擦得亮晶晶。不過要打穿熱蘭遮城的厚城牆，可沒那麼簡單。' }
          ] }
      ],
      decision: {
        prompt: '熱蘭遮城的大砲守著大港。你命令鄭成功的艦隊，用什麼方法進入台江內海？',
        options: [
          { text: '從大港正面衝過去，跟城堡的大砲硬碰硬。',
            fb: '熱蘭遮城的大砲正對著大港，木造戰船衝過去會損失慘重……歷史上的鄭成功，可沒有這麼冒險！' },
          { text: '等待漲潮，從防守薄弱的鹿耳門水道開進去。', ok: true,
            fb: '趁著漲潮，鄭成功的艦隊順利穿過鹿耳門，在赤崁附近登陸，先拿下[[普羅民遮城]]，再包圍熱蘭遮城。經過九個多月，荷蘭長官[[揆一]]在 1662 年投降，荷蘭人離開了臺灣。' },
          { text: '趁退潮的時候，摸黑偷偷開進去。',
            fb: '退潮時鹿耳門的水太淺，大船一開進去就會卡在沙洲上動彈不得，變成大砲的活靶！' }
        ],
        card: { id: 'luermen', title: '鹿耳門登陸', year: '1661–1662',
          body: '鹿耳門是從外海進入台江內海的水道。1661 年鄭成功趁漲潮從這裡進入，包圍熱蘭遮城；1662 年荷蘭人投降，結束 38 年的統治。',
          today: '臺南市安南區有「鹿耳門溪」和紀念鄭成功登陸的地點。' }
      }
    },

    /* ───────── 場景二：荒地上的營盤 ───────── */
    {
      id: 'farmland', bg: 'farmland', host: 'koxinga',
      title: '荒地上的營盤', time: '1662 年', place: '臺灣南部的荒野',
      enter: [
        { who: 'narrator', text: '荷蘭人走了，可是新的難題馬上出現……' },
        { who: 'host', text: '（幾萬名將士和家眷都要吃飯。清朝又下令[[海禁]]，不准沿海百姓跟我們往來，糧食從哪裡來？）' }
      ],
      objective: '和將士、百姓聊聊，想辦法解決糧食問題',
      need: 2,
      actors: [
        { cast: 'koxinga', host: true, x: 820, y: 800, s: 1.05,
          lines: [ { who: 'host', text: '（光靠打仗贏不了長久。要在這裡生根，先得讓大家吃得飽。）' } ] },
        { cast: 'general', x: 440, y: 805, s: 1,
          clue: '仗打完了，士兵閒著吃軍糧，糧倉快見底',
          idle: '糧倉又少了一大半……',
          lines: [
            '國姓爺，弟兄們打仗很勇猛，可是現在沒有仗打，每天閒著吃軍糧。',
            '再這樣下去，糧倉就要見底了！'
          ] },
        { cast: 'oldfarmer', x: 1150, y: 810, s: 1,
          clue: '南部土地肥沃，只要有人開墾，稻子一年可收兩次',
          idle: '好天氣，適合下田！',
          lines: [
            '荷蘭人在的時候，我就在這裡種田了。',
            '這裡的土很肥、天氣又暖，只要有人開墾、有水灌溉，稻子一年可以收兩次呢！',
            '可惜啊，荒地太多，人手太少。'
          ] },
        { cast: 'pingpu', x: 1400, y: 805, s: 1, flip: true,
          idle: '這是我們的獵場。',
          lines: [
            '這片草原，是我們族人世世代代打鹿的獵場。',
            '你們要開墾可以，但別把我們的土地都占光了。'
          ],
          again: [ { who: 'system', text: '觀測器提醒：開墾帶來糧食，卻也讓原住民族的土地越來越少。歷史常常有不同的面向喔。' } ] },
        { prop: 'tools', name: '鋤頭與犁', x: 620, y: 805, s: 1,
          clue: '士兵的手，也能拿起鋤頭耕田',
          lines: [
            { who: 'narrator', text: '帳篷旁堆著一堆鋤頭和犁，都還沒什麼人用過。' },
            { who: 'host', text: '（士兵們的手，能不能從拿刀，變成拿鋤頭呢？）' }
          ] },
        { prop: 'campflag', name: '營旗', x: 220, y: 790, s: 1,
          lines: [
            { who: 'narrator', text: '旗子上寫著一個大大的「營」字。軍隊駐紮的地方，叫做[[營盤]]。' }
          ] }
      ],
      decision: {
        prompt: '糧食不夠吃，又沒辦法從大陸運糧。你命令鄭成功採取什麼辦法？',
        options: [
          { text: '繼續等，看看清朝會不會解除海禁。',
            fb: '清朝的海禁非常嚴格，一等就是二十年……士兵們會先餓肚子！' },
          { text: '把軍隊解散，大家各自回大陸。',
            fb: '回到大陸會被清軍抓走，而且鄭成功來臺灣，就是要建立長久的基地呀！' },
          { text: '實施「屯田制」：士兵平時開墾種田，打仗時再拿起武器。', ok: true,
            fb: '鄭成功下令各營軍隊分散到各地開墾，這就是[[屯田制]]，也叫「寓兵於農」。軍隊駐紮的營盤後來變成村莊，名字一直留到今天：[[左營]]、新營、林鳳營、前鎮……下次看到這些地名，你就知道它們的身世了！' }
        ],
        card: { id: 'tuntian', title: '屯田制', year: '1661 起',
          body: '鄭氏時期讓軍隊平時開墾種田、戰時作戰的制度（寓兵於農）。開墾範圍從臺南往南、北擴展。',
          today: '高雄「左營」「前鎮」、臺南「新營」「林鳳營」等地名，都和當年的軍隊營盤有關。' }
      }
    },

    /* ───────── 場景三：東寧城 ───────── */
    {
      id: 'tungning', bg: 'temple', host: 'chen',
      title: '東寧城的新建設', time: '1665 年', place: '東寧（今臺南）',
      hostSwitch: {
        from: 'koxinga', to: 'chen',
        text: '1662 年，鄭成功在臺灣病逝，他的兒子鄭經接手。觀測器將你的意識轉移到鄭經最信任的參謀——陳永華。'
      },
      enter: [
        { who: 'narrator', text: '時空快轉到 1665 年。鄭經把這裡改名為[[東寧]]，田地開墾得越來越多，大家終於吃得飽了。' },
        { who: 'host', text: '（要讓這個地方長長久久，光有飯吃還不夠。還缺了什麼呢？）' }
      ],
      objective: '走訪東寧城，找出還需要建設的地方',
      need: 2,
      actors: [
        { cast: 'chen', host: true, x: 800, y: 805, s: 1.05,
          lines: [
            { who: 'host', text: '（我是[[陳永華]]。這幾年我教百姓曬鹽、燒磚瓦，生活好多了。）' },
            { who: 'host', text: '（可是，治理國家需要人才。人才，從哪裡來？）' }
          ] },
        { cast: 'scholar', x: 420, y: 805, s: 1,
          clue: '東寧沒有學校，將來沒有人才能管理地方',
          idle: '唉，書都快被蟲咬光了。',
          lines: [
            '陳大人，這裡沒有學校，孩子們都沒地方讀書。',
            '這樣下去，將來誰來當官、誰來管理地方呢？'
          ] },
        { cast: 'boy', x: 600, y: 815, s: 1,
          clue: '孩子們想讀書認字，卻連一間學堂都沒有',
          idle: '我想認字！',
          lines: [
            '陳大人好！我好想認字喔！',
            '可是爹說，這裡連一間學堂都沒有……'
          ] },
        { cast: 'salter', x: 1150, y: 810, s: 1,
          idle: '今天太陽好，鹽曬得特別快！',
          lines: [
            '以前我們用大鍋煮海水做鹽，要燒好多木柴，好辛苦。',
            '陳大人教我們在海邊築鹽田，用太陽把海水曬乾，這叫[[曬鹽]]，又快又省柴！'
          ] },
        { cast: 'potter', x: 1380, y: 810, s: 1, flip: true,
          idle: '火候最重要！',
          lines: [
            '陳大人還教我們燒[[磚瓦]]。用磚瓦蓋房子，比茅草屋堅固多了，颱風來也不怕！'
          ] },
        { prop: 'zone', name: '空地上的建材', x: 1340, y: 500, w: 420, h: 120,
          clue: '一塊空地已備好建材，等著蓋一座重要的建築',
          lines: [
            { who: 'narrator', text: '一大塊空地上，堆滿了木材和紅磚，正等著蓋一座重要的建築……' }
          ] }
      ],
      decision: {
        prompt: '東寧的百姓吃飽了，可是沒有學校。你讓陳永華向鄭經提出什麼建議？',
        options: [
          { text: '興建孔廟、設立學校，推行教育、培養人才。', ok: true,
            fb: '1666 年，陳永華在東寧興建[[孔廟]]，旁邊設立明倫堂作為學校，這是臺灣第一座孔廟，被稱為「[[全臺首學]]」。三百多年後的今天，它就是臺南孔廟！' },
          { text: '把錢全拿去造更多戰船，讀書不重要。',
            fb: '只有軍隊卻沒有人才，誰來治理地方？陳永華認為，要讓臺灣長久發展，一定要培養人才。' },
          { text: '把孩子們都送回大陸讀書。',
            fb: '清朝實施海禁，船根本過不去，而且路途遙遠又危險！' }
        ],
        card: { id: 'confucius', title: '全臺首學', year: '1666',
          body: '陳永華建議興建臺灣第一座孔廟，並設明倫堂推行教育。他也教百姓曬鹽、燒磚瓦，讓東寧更加繁榮。',
          today: '臺南孔廟，門口的匾額寫著「全臺首學」。' }
      }
    }
  ],

  outro: [
    { who: 'narrator', text: '在鄭氏家族的經營下，臺灣南部的田地越開越多，漢人也越來越多。' },
    { who: 'narrator', text: '二十多年後的 1683 年，清朝派施琅率軍攻臺，鄭氏投降，臺灣進入清帝國統治的時代……' },
    { who: 'system', text: '偵測到時間軸波動！啟動「歷史修正檢驗」，確認你的觀測紀錄。' }
  ],

  quiz: [
    { tag: '記憶連結題',
      q: '鄭成功的艦隊趁著什麼時機、從哪裡進入台江內海？',
      options: ['漲潮時，從鹿耳門', '退潮時，從淡水', '颱風天，從基隆'], answer: 0,
      explain: '鹿耳門水道很淺，要等漲潮海水變深，大船才過得去。' },
    { tag: '概念理解題',
      q: '「屯田制」是什麼意思？',
      options: ['士兵平時種田、打仗時作戰', '把所有田地收歸國家', '只准原住民耕種'], answer: 0,
      explain: '屯田制又叫「寓兵於農」，讓軍隊自己生產糧食。' },
    { tag: '地名解碼題',
      q: '下列哪一個地名，和鄭氏時期軍隊開墾的營盤有關？',
      options: ['板橋', '左營', '鹿港'], answer: 1,
      explain: '左營、新營、林鳳營、前鎮等地名，都是當年軍隊屯墾的營盤。' },
    { tag: '是非思辨題', type: 'tf',
      q: '被稱為「全臺首學」的臺南孔廟，是陳永華建議興建的。',
      answer: true,
      explain: '對！1666 年陳永華建議興建孔廟、設立學校，推行教育。' },
    { tag: '是非思辨題', type: 'tf',
      q: '鄭成功在 1662 年趕走的是西班牙人。',
      answer: false,
      explain: '錯！鄭成功趕走的是荷蘭人。西班牙人在 1642 年就已經被荷蘭人趕出北臺灣了。' }
  ],

  glossary: {
    '鄭成功': '1624 年生於日本平戶，1661 年率軍來臺，1662 年趕走荷蘭人，同年病逝。',
    '國姓爺': '南明皇帝賜鄭成功姓「朱」（皇帝的姓），所以人們尊稱他「國姓爺」。',
    '何斌': '曾替荷蘭人擔任通譯的漢人，把鹿耳門水道的情報提供給鄭成功。',
    '鹿耳門': '臺南外海進入台江內海的水道，水淺彎曲，需趁漲潮才能讓大船通過。',
    '漲潮': '海水因為月球、太陽的引力而上漲的現象，一天大約有兩次。',
    '普羅民遮城': '荷蘭人在赤崁建的城堡，就是今天的赤崁樓。',
    '揆一': '荷蘭在臺灣的最後一任長官，1662 年向鄭成功投降。',
    '海禁': '禁止百姓出海、和海外往來的命令。清朝用它切斷鄭氏的補給。',
    '營盤': '軍隊駐紮的地方。鄭氏時期的營盤後來很多都變成了村莊。',
    '屯田制': '讓軍隊平時開墾種田、戰時作戰的制度，又叫「寓兵於農」。',
    '左營': '高雄的地名，來自鄭氏時期軍隊「左營」駐紮屯墾的地方。',
    '東寧': '鄭經時期對臺灣的稱呼，政治中心在今天的臺南。',
    '陳永華': '鄭經的重要參謀，推動興建孔廟、設學校，並教百姓曬鹽、燒磚瓦。',
    '曬鹽': '在海邊築鹽田，引海水進來讓太陽曬乾製鹽，比用柴火煮海水省力。',
    '磚瓦': '用黏土燒成的建材，比茅草堅固耐用。',
    '孔廟': '祭祀孔子的廟，古代常和學校設在一起。',
    '全臺首學': '指臺南孔廟，因為它是臺灣第一座孔廟和官方學校。'
  }
};
