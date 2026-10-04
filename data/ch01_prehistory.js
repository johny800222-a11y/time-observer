/* 第 1 章　遠古的足跡：史前文化
 * 對應：康軒 五上 第三單元第 2 課／南一 五上 第一單元第 3 課／翰林 五上 第一單元 102
 * 學習重點：史前時代＝沒有文字記錄；依器具材質與製作方式分成舊石器→新石器→金屬器時代；
 *           長濱文化（打製石器、用火）、大坌坑文化（粗繩紋陶、磨製石器、定居農耕）、
 *           卑南文化（石板棺、玉器）、十三行文化（煉鐵、對外貿易）。
 * 史前人物沒有留下名字，本章角色名稱為虛構，遊戲中也會向玩家說明。
 */
window.GAME_DATA.chapters.ch01 = {
  id: 'ch01',
  warpAgo: 30000,                 // 時空跳躍改成「距今 ○○ 年前」倒數
  yearLabel: '約 3 萬年前',
  title: '遠古的足跡：史前文化',
  unit: '五上・臺灣的史前文化',

  cast: {
    ayan:   { name: '阿岩', role: '住在海邊洞穴的獵人',
      look: { skin: '#B98252', hairStyle: 'wild', hair: '#2A1E14', outfit: 'hide', color: '#8E6B44', color2: '#5A4128',
              pants: '#B98252', bareArms: true, expr: 'worry', acc: 'stonetool' } },
    granny: { name: '洞穴裡的老奶奶', role: '最會做石器的長輩',
      look: { skin: '#B07A4E', hairStyle: 'wild', hair: '#CFC8BA', outfit: 'hide', color: '#9C7B52', color2: '#6B5236',
              pants: '#B07A4E', bareArms: true, expr: 'smile' } },
    shan:   { name: '獵人夥伴', role: '剛打獵回來的年輕人',
      look: { skin: '#A9744A', hairStyle: 'wild', hair: '#1E1610', outfit: 'hide', color: '#7A5A3A', color2: '#4A3420',
              pants: '#A9744A', bareArms: true, beard: 'goatee', beardColor: '#1E1610', expr: 'worry', acc: 'woodspear' } },
    shellwoman: { name: '撿貝殼的婦人', role: '在礁石邊找食物',
      look: { skin: '#B98454', hairStyle: 'womanlong', hair: '#2A1E14', outfit: 'hide', color: '#A88A5E', color2: '#7A6040',
              pants: '#B98454', bareArms: true, expr: 'happy', acc: 'basket' } },
    cavekid: { name: '洞穴裡的孩子', role: '喜歡烤火的小朋友',
      look: { skin: '#BE8A5A', hairStyle: 'wild', hair: '#2A1E14', outfit: 'hide', color: '#9C7B52', color2: '#6B5236',
              pants: '#BE8A5A', bareArms: true, expr: 'happy', kid: true } },

    he:     { name: '阿禾', role: '河口村落的婦人',
      look: { skin: '#C38A5C', hairStyle: 'bun', hair: '#1E1814', outfit: 'barkcloth', color: '#D8C29A', color2: '#8A6A40',
              pants: '#6B5A42', bareArms: true, expr: 'worry', acc: 'basket' } },
    oldwoman: { name: '村裡的老婆婆', role: '常在火堆邊工作',
      look: { skin: '#BE8658', hairStyle: 'bun', hair: '#D2CBBE', outfit: 'barkcloth', color: '#CDB68A', color2: '#7A5A36',
              pants: '#6B5A42', bareArms: true, expr: 'smile' } },
    cordkid: { name: '玩繩子的孩子', role: '好奇心旺盛的小朋友',
      look: { skin: '#C99062', hairStyle: 'kid', hair: '#1E1814', outfit: 'barkcloth', color: '#E2CFA6', color2: '#8A6A40',
              pants: '#C99062', bareArms: true, expr: 'happy', kid: true } },
    fisher: { name: '捕魚的男人', role: '剛從河邊回來',
      look: { skin: '#B07A4C', hairStyle: 'long', hair: '#1E1814', outfit: 'barkcloth', color: '#C2AA7E', color2: '#6B4A2E',
              pants: '#5E4E3A', bareArms: true, expr: 'worry', acc: 'woodspear' } },
    axeman: { name: '磨石斧的男人', role: '負責砍樹開墾',
      look: { skin: '#A9744A', hairStyle: 'bun', hair: '#1E1814', outfit: 'barkcloth', color: '#B59C70', color2: '#6B4A2E',
              pants: '#5E4E3A', bareArms: true, expr: 'happy', acc: 'stoneaxe' } },

    yu:     { name: '阿玉', role: '卑南村落的玉器工匠',
      look: { skin: '#C08A58', hairStyle: 'long', hair: '#1C1612', outfit: 'barkcloth', color: '#B9A27A', color2: '#2E7D5B',
              pants: '#5A4A38', bareArms: true, earring: 'jade', expr: 'worry' } },
    beinanchief: { name: '村落長老', role: '受族人尊敬的老人',
      look: { skin: '#B88050', hairStyle: 'long', hair: '#CFC8BA', outfit: 'barkcloth', color: '#A88E64', color2: '#7A2E28',
              pants: '#5A4A38', bareArms: true, earring: 'jade', beard: 'goatee', beardColor: '#DDD6CA', expr: 'serious', acc: 'staff' } },
    northtrader: { name: '北方來的客人', role: '帶著綠色石頭來交換',
      look: { skin: '#B98454', hairStyle: 'bun', hair: '#1C1612', outfit: 'barkcloth', color: '#9C8A6A', color2: '#3E5C76',
              pants: '#4A4036', bareArms: true, expr: 'smile', acc: 'basket' } },
    jadekid: { name: '戴玉耳環的孩子', role: '愛炫耀新耳環',
      look: { skin: '#C99062', hairStyle: 'kid', hair: '#1C1612', outfit: 'barkcloth', color: '#D2BC90', color2: '#2E7D5B',
              pants: '#C99062', bareArms: true, earring: 'jade', expr: 'happy', kid: true } },
    milletwoman: { name: '種小米的婦人', role: '剛從田裡回來',
      look: { skin: '#BE8658', hairStyle: 'womanlong', hair: '#1C1612', outfit: 'dress', color: '#8A7454', color2: '#2E7D5B',
              pants: '#BE8658', bareArms: true, expr: 'happy', acc: 'millet' } },

    tie:    { name: '阿鐵', role: '十三行的工匠',
      look: { skin: '#B07A4C', hairStyle: 'short', hair: '#1C1612', hat: 'bandana', hatColor: '#7A4B33', outfit: 'barkcloth',
              color: '#8C7458', color2: '#4A3424', pants: '#4A3E32', bareArms: true, expr: 'worry', acc: 'hammer' } },
    neighbor: { name: '村裡的漁夫', role: '工具又壞掉了',
      look: { skin: '#A9744A', hairStyle: 'long', hair: '#1C1612', outfit: 'barkcloth', color: '#A8926A', color2: '#5A4128',
              pants: '#4A3E32', bareArms: true, expr: 'worry', acc: 'stoneaxe' } },
    oldsmith: { name: '老師傅', role: '見多識廣的長輩',
      look: { skin: '#B07A4C', hairStyle: 'bun', hair: '#CFC8BA', outfit: 'barkcloth', color: '#7A6450', color2: '#3A2A1E',
              pants: '#3E342A', bareArms: true, beard: 'full', beardColor: '#D8D2C6', expr: 'smile', acc: 'staff' } },
    beadwoman: { name: '戴瑪瑙珠的婦人', role: '剛做完一筆交易',
      look: { skin: '#BE8658', hairStyle: 'womanlong', hair: '#1C1612', outfit: 'dress', color: '#5E4A3A', color2: '#C0392B',
              pants: '#BE8658', bareArms: true, necklace: true, expr: 'happy', acc: 'basket' } },
    stiltkid: { name: '河口的孩子', role: '住在高腳屋裡',
      look: { skin: '#C99062', hairStyle: 'kid', hair: '#1C1612', outfit: 'barkcloth', color: '#C2AA7E', color2: '#5A4128',
              pants: '#C99062', bareArms: true, expr: 'happy', kid: true } }
  },

  intro: [
    { who: 'system', text: '時空座標鎖定：距今約 3 萬年前，臺灣東海岸。' },
    { who: 'system', text: '注意！這個時代還沒有文字，沒有人寫下任何紀錄，所以叫做[[史前時代]]。' },
    { who: 'narrator', text: '[[考古學家]]只能從地底挖出的[[遺址]]，還有石器、陶器這些[[遺物]]，推測古人怎麼生活。今天，你可以用觀測器親眼看見！' },
    { who: 'system', text: '史前人物沒有留下名字，這一章的人名是觀測器幫他們取的喔。' },
    { who: 'narrator', text: '海浪拍打著岩壁，你的意識連結上了一位住在海邊洞穴裡的獵人——阿岩。' },
    { who: 'host', text: '（昨天大家合力抓到一頭鹿，可是要怎麼把牠切開呢……）' }
  ],

  scenes: [
    /* ───────── 場景一：長濱文化 ───────── */
    {
      id: 'cave', bg: 'cave', host: 'ayan', era: '3萬年前',
      title: '八仙洞的獵人', time: '舊石器時代・距今約 3 萬年前', place: '八仙洞（今臺東長濱）',
      enter: [
        { who: 'narrator', text: '岩壁上有好幾個被海浪侵蝕出來的大洞穴。阿岩和家人就住在這裡，可以遮風避雨。' },
        { who: 'host', text: '（鹿皮好厚，用手根本撕不開。得想辦法做出鋒利的工具！）' }
      ],
      objective: '問問洞穴裡的人，怎麼做出切肉的工具',
      need: 2,
      actors: [
        { cast: 'ayan', host: true, x: 800, y: 800, s: 1.05,
          lines: [
            { who: 'host', text: '（我們靠打獵、捕魚、撿貝殼和採野果過日子。）' },
            { who: 'host', text: '（食物多的地方就多住一陣子，食物少了就換個地方。）' }
          ] },
        { cast: 'granny', x: 430, y: 805, s: 1,
          clue: '拿石頭用力敲石頭，可以敲出鋒利的邊',
          idle: '叩、叩、叩……',
          lines: [
            '孩子，過來看奶奶怎麼做。',
            '拿一顆硬石頭，用力去敲另一顆石頭，敲掉一些碎片，邊緣就會變得很鋒利。',
            '這是祖先一代一代教下來的本事喔！'
          ] },
        { cast: 'cavekid', x: 610, y: 815, s: 1,
          idle: '火好暖喔！',
          lines: [
            '火好溫暖喔！晚上有火在，野獸就不敢靠近。',
            '肉烤過以後也比較好吃，嘿嘿！',
            { who: 'system', text: '[[長濱文化]]的人已經知道用火：取暖、烤熟食物，還能嚇跑野獸。' }
          ] },
        { cast: 'shan', x: 1180, y: 805, s: 1, flip: true,
          clue: '需要能割開獸皮、切肉的鋒利工具',
          idle: '這頭鹿好重！',
          lines: [
            '阿岩，我們追了一整天才抓到這頭鹿！',
            '可是牠的皮又厚又韌，用牙齒咬、用手撕都不行，要是有鋒利的東西就好了。'
          ] },
        { cast: 'shellwoman', x: 1390, y: 810, s: 1,
          idle: '今天貝殼好多！',
          lines: [
            '退潮的時候，礁石上有好多貝殼和螃蟹，撿都撿不完。',
            '我們也會用動物的骨頭和鹿角，做成尖尖的工具來刺魚、縫東西。'
          ] },
        { prop: 'campfire', name: '洞口的火堆', x: 330, y: 690, s: 0.9,
          lines: [ { who: 'narrator', text: '洞口的火堆劈啪作響，大家晚上就圍著它睡覺。' } ] },
        { prop: 'pebbles', name: '海邊的礫石', x: 1000, y: 770, s: 1,
          clue: '海邊有很多又硬又好拿的礫石',
          lines: [
            { who: 'narrator', text: '海邊堆滿了被海浪磨得圓圓的石頭，叫做礫石，又硬又重。' },
            { who: 'host', text: '（這種石頭到處都撿得到……）' }
          ] }
      ],
      decision: {
        prompt: '鹿皮又厚又韌。你讓阿岩用什麼方法，做出鋒利的工具？',
        options: [
          { text: '拿石頭互相敲打，敲出鋒利的邊緣。', ok: true,
            fb: '阿岩用力敲打礫石，敲出銳利的刀口，做成可以砍、切、刮的[[打製石器]]。考古學家在八仙洞挖到很多這樣的石器，這個文化就叫做[[長濱文化]]，是臺灣目前已知最早的史前文化！' },
          { text: '用泥土捏成刀子，放進火裡燒硬。',
            fb: '燒陶的技術要到[[新石器時代]]才出現。而且陶做的刀子一用力就碎了，根本割不開鹿皮！' },
          { text: '把礦石放進爐子裡，煉成一把鐵刀。',
            fb: '煉鐵是幾萬年後的[[金屬器時代]]才有的技術！這時候的人只會用石頭、骨頭和木頭做工具。' }
        ],
        card: { id: 'changbin', title: '長濱文化', year: '舊石器時代',
          body: '臺灣目前已知最早的史前文化（距今約 5 萬～5 千年前），在臺東長濱的八仙洞被發現。人們住在海邊洞穴，已經知道用火，使用敲打做成的打製石器，靠採集、狩獵和捕魚維生。',
          today: '臺東縣長濱鄉的八仙洞是國定遺址，可以看到海浪侵蝕出來的洞穴。' }
      }
    },

    /* ───────── 場景二：大坌坑文化 ───────── */
    {
      id: 'riverside', bg: 'riverside', host: 'he', era: '6千年前',
      title: '河口村落的陶罐', time: '新石器時代・距今約 6000 年前', place: '大坌坑（今新北八里）',
      hostSwitch: {
        from: 'ayan', to: 'he',
        text: '時間快轉兩萬多年！觀測器把你的意識轉移到北部淡水河口、觀音山腳下一個小村落裡的婦人——阿禾。'
      },
      enter: [
        { who: 'narrator', text: '這裡的人不再到處搬家。他們在河口邊蓋房子[[定居]]下來，還在屋旁種起了芋頭。' },
        { who: 'host', text: '（今年芋頭和果子收成好多，還要裝水煮湯……該用什麼東西來裝呢？）' }
      ],
      objective: '在村子裡走走，想辦法做出能裝東西、能煮湯的容器',
      need: 2,
      actors: [
        { cast: 'he', host: true, x: 800, y: 805, s: 1.05,
          lines: [
            { who: 'host', text: '（竹籃裝芋頭還可以，可是裝水會漏光。）' },
            { who: 'host', text: '（要是有一種罐子，可以裝水，還能直接放到火上煮就好了。）' }
          ] },
        { cast: 'oldwoman', x: 430, y: 805, s: 1,
          clue: '黏土可以捏成形狀，被火燒過會變硬',
          idle: '這泥巴黏黏的……',
          lines: [
            '阿禾啊，下過雨以後，河邊的泥土黏黏的，可以捏成各種形狀。',
            '我還發現一件怪事：掉進火堆裡的泥塊，燒過以後變得又硬又不怕水！'
          ] },
        { cast: 'cordkid', x: 610, y: 815, s: 1,
          clue: '把繩子壓在泥土上，會印出條紋',
          idle: '你看你看！',
          lines: [
            '阿禾阿姨你看！我把繩子壓在泥巴上，印出好多條紋耶！',
            '一條一條的，好像小蛇爬過去喔！'
          ] },
        { cast: 'fisher', x: 1000, y: 810, s: 1,
          clue: '需要不會漏水、可以放在火上煮的容器',
          idle: '魚湯、魚湯！',
          lines: [
            '我抓到好多魚，想煮一鍋魚湯給大家喝。',
            '可是竹筒太小，葉子包著又會漏水……有沒有不會漏水、又能放在火上的容器呢？'
          ] },
        { cast: 'axeman', x: 1400, y: 810, s: 1, flip: true,
          idle: '磨啊磨……',
          lines: [
            '我把石頭放在砂岩上，加水慢慢磨，磨成光滑又鋒利的石斧，這叫[[磨製石器]]。',
            '用它砍樹開墾，比以前敲出來的石器好用多了，也不容易壞！'
          ] },
        { prop: 'shells', name: '貝殼堆', x: 200, y: 760, s: 0.9,
          lines: [
            { who: 'narrator', text: '村子旁邊，吃剩的貝殼越堆越高，變成一座小山。' },
            { who: 'system', text: '考古學家把這種貝殼堆叫做[[貝塚]]。臺北的[[圓山文化]]，就留下了很大的貝塚喔！' }
          ] },
        { prop: 'zone', name: '芋頭田', x: 1165, y: 595, w: 300, h: 100,
          lines: [
            { who: 'narrator', text: '房子旁邊種著一排排芋頭，這是早期的[[農業]]。' },
            { who: 'system', text: '考古學家還在臺南科學園區的遺址，挖到四千多年前的稻米和小米呢！' }
          ] }
      ],
      decision: {
        prompt: '收成的食物要保存，還要能裝水煮湯。你讓阿禾用什麼方法做容器？',
        options: [
          { text: '用石頭敲出一個大石碗。',
            fb: '敲打石頭只能做出粗糙的工具，很難敲出不漏水的碗，而且又重又容易裂開！' },
          { text: '用黏土捏成罐子，壓上繩子花紋，再用火燒硬。', ok: true,
            fb: '阿禾燒出了表面有繩子花紋的陶罐，考古學家叫它[[粗繩紋陶]]。會燒陶器、使用磨製石器、定居種植作物，這些都是[[新石器時代]]的特色，這個文化就是[[大坌坑文化]]！' },
          { text: '去買一個塑膠水桶來裝。',
            fb: '塑膠是現代工廠才做得出來的東西！史前時代可沒有商店，也沒有工廠喔。' }
        ],
        card: { id: 'dabenkeng', title: '大坌坑文化', year: '新石器時代早期',
          body: '在新北八里的大坌坑遺址發現，是臺灣新石器時代早期的代表。人們燒製表面有繩紋的粗繩紋陶，使用磨製石器，在河口、海邊定居並種植作物。',
          today: '大坌坑遺址在新北市八里區觀音山腳下，附近的十三行博物館展示了八里一帶的史前文物。' }
      }
    },

    /* ───────── 場景三：卑南文化 ───────── */
    {
      id: 'beinan', bg: 'beinan', host: 'yu', era: '3千年前',
      title: '卑南村落的玉器', time: '新石器時代・距今約 3000 年前', place: '卑南（今臺東市）',
      hostSwitch: {
        from: 'he', to: 'yu',
        text: '時間再快轉三千年。觀測器把你的意識轉移到臺灣東部、卑南山下一座大村落裡的玉器工匠——阿玉。'
      },
      enter: [
        { who: 'narrator', text: '這座村落好大！一排排房子用石板和木頭搭建，空地上立著一根高高的石柱。' },
        { who: 'host', text: '（村裡最受尊敬的老人過世了。大家要為他準備最珍貴的陪葬品……）' }
      ],
      objective: '和村落裡的人聊聊，決定要做什麼陪葬品',
      need: 2,
      actors: [
        { cast: 'yu', host: true, x: 800, y: 805, s: 1.05,
          lines: [
            { who: 'host', text: '（我是村裡的工匠，最會把石頭磨成漂亮的東西。）' },
            { who: 'host', text: '（給老人家的陪葬品，一定要用最好的材料。）' }
          ] },
        { cast: 'beinanchief', x: 430, y: 805, s: 1,
          clue: '過世的家人會葬在家屋底下的石板棺裡',
          idle: '祖先會保佑我們。',
          lines: [
            '我們會把過世的家人，葬在家屋地底下用石板拼成的[[石板棺]]裡。',
            '這樣他們就能一直陪在家人身邊。我們也會放進他生前最珍貴的東西。'
          ] },
        { cast: 'jadekid', x: 610, y: 815, s: 1,
          clue: '玉可以磨成耳環等漂亮的裝飾品',
          idle: '我的耳環好看嗎？',
          lines: [
            '你看我的耳環！綠綠的、亮亮的，是用玉磨成的，叫做[[玉玦]]。',
            '旁邊有一個小缺口，戴的時候從耳洞穿過去就好了！'
          ] },
        { cast: 'northtrader', x: 1170, y: 810, s: 1, flip: true,
          clue: '北方花蓮產的臺灣玉，又硬又美',
          idle: '上好的玉石喔！',
          lines: [
            '我從北邊的花蓮來，帶來一種綠色的寶石——臺灣玉。',
            '它又硬又亮，要磨好幾個月才能磨成形，可是越磨越漂亮！'
          ] },
        { cast: 'milletwoman', x: 1400, y: 812, s: 1,
          idle: '今年小米長得真好。',
          lines: [
            '我們在村子外面種田，也會上山打獵、到河邊捕魚。',
            '這裡人很多，大家一起生活、一起工作，熱鬧得很！'
          ] },
        { prop: 'pillar', name: '高高的石柱', x: 180, y: 770, s: 0.9,
          lines: [
            { who: 'narrator', text: '一根比大人還高好幾倍的石柱立在空地上，頂端有一個圓洞。' },
            { who: 'system', text: '三千年後，這根石柱的圓洞只剩下一半，像一彎月亮，人們叫它[[月形石柱]]，今天還站在卑南遺址公園裡！' }
          ] },
        { prop: 'slabcoffin', name: '石板', x: 990, y: 700, s: 0.8,
          lines: [ { who: 'narrator', text: '幾塊又長又平的石板整齊排好，是用來拼成石板棺的。' } ] }
      ],
      decision: {
        prompt: '村裡要為過世的長者準備最珍貴的陪葬品。你讓阿玉用什麼材料、怎麼做？',
        options: [
          { text: '隨便撿幾顆河邊的石頭放進去就好。',
            fb: '這位長者是大家最尊敬的人，族人會用最珍貴、最費工的東西陪葬，表達心中的敬意。' },
          { text: '用黃金打造一條金項鍊。',
            fb: '這時候的人還不會冶煉金屬，要等到更晚的[[金屬器時代]]才會出現金屬工具和飾品！' },
          { text: '把從花蓮來的臺灣玉，慢慢磨成玉玦和精美的玉器。', ok: true,
            fb: '阿玉用砂和石頭一點一點磨出精美的玉器，像國寶「[[人獸形玉玦]]」就是這樣做出來的。族人把玉器放進石板棺裡陪葬，這就是[[卑南文化]]。東南亞也發現了相似的玉器，證明臺灣和島外很早就有往來！' }
        ],
        card: { id: 'beinan', title: '卑南文化', year: '新石器時代晚期',
          body: '在臺東卑南遺址發現（距今約 3500～2300 年前），留下環太平洋最大的石板棺墓葬群和精美的玉器，例如國寶人獸形玉玦，還有月形石柱。',
          today: '1980 年興建臺東火車站時意外挖到卑南遺址，現在有國立臺灣史前文化博物館和卑南遺址公園。' }
      }
    },

    /* ───────── 場景四：十三行文化 ───────── */
    {
      id: 'shisanhang', bg: 'shisanhang', host: 'tie', era: '1千年前',
      title: '十三行的煉鐵爐', time: '金屬器時代・距今約 1000 年前', place: '十三行（今新北八里）',
      hostSwitch: {
        from: 'yu', to: 'tie',
        text: '時間再快轉兩千年，回到北部的淡水河口。觀測器把你的意識轉移到一位很會用火的工匠——阿鐵。'
      },
      enter: [
        { who: 'narrator', text: '河口的村子裡冒著白煙。這裡的人正在做一件以前從來沒有人做到的事……' },
        { who: 'host', text: '（石頭做的工具，用久了就會崩、會斷。有沒有更堅硬的材料呢？）' }
      ],
      objective: '向村裡的人打聽，怎麼做出更堅硬的工具',
      need: 2,
      actors: [
        { cast: 'tie', host: true, x: 800, y: 805, s: 1.05,
          lines: [ { who: 'host', text: '（我們種田、捕魚、打獵，每天都要用工具。工具好，生活才會好。）' } ] },
        { cast: 'neighbor', x: 1160, y: 810, s: 1, flip: true,
          clue: '石器容易崩壞，需要更堅硬的工具',
          idle: '唉，又崩了一角。',
          lines: [
            '阿鐵你看，我的石斧又崩了一個缺口！',
            '砍不到幾棵樹就壞掉，要是有更硬、更不容易斷的工具就好了。'
          ] },
        { cast: 'oldsmith', x: 430, y: 805, s: 1,
          clue: '含鐵的礦石用高溫燒，可以煉出鐵',
          idle: '火要夠旺才行。',
          lines: [
            '我年輕的時候聽外地人說過：有一種沉甸甸的礦石，裡面藏著「鐵」。',
            '只要把火燒得非常非常熱，鐵就會從石頭裡跑出來，打一打就能做成工具！'
          ] },
        { cast: 'beadwoman', x: 1390, y: 812, s: 1,
          idle: '這串珠子真漂亮。',
          lines: [
            '我用鹿皮和外地坐船來的人交換，換到了[[玻璃手環]]和這串瑪瑙珠！',
            '他們還給我一枚中間有方孔的銅錢，說是從很遠的地方帶來的。'
          ] },
        { cast: 'stiltkid', x: 610, y: 815, s: 1,
          idle: '我家住高高的！',
          lines: [
            '我家的房子底下有好多柱子撐著，地板離地面高高的，這叫[[干欄式住屋]]。',
            '下大雨淹水也不怕，還很通風喔！'
          ] },
        { prop: 'furnace', name: '泥土砌的爐子', x: 990, y: 700, s: 0.9,
          clue: '泥土爐子可以把火燒得非常熱',
          lines: [
            { who: 'narrator', text: '一座用泥土砌成的爐子，火燒得好旺，爐口熱得讓人不敢靠近。' },
            { who: 'host', text: '（這麼熱的爐子，說不定可以把礦石燒化……）' }
          ] },
        { prop: 'facepot', name: '有臉的陶罐', x: 200, y: 790, s: 0.9,
          lines: [
            { who: 'narrator', text: '咦？這個陶罐上有一張人臉，眼睛、鼻子、嘴巴都有！' },
            { who: 'system', text: '這就是[[人面陶罐]]，是十三行博物館最有名的文物之一。' }
          ] }
      ],
      decision: {
        prompt: '石器太容易崩壞了。你讓阿鐵用什麼方法，做出更堅硬的工具？',
        options: [
          { text: '把石頭磨得更光滑一點就好。',
            fb: '磨製石器雖然比較精細，但石頭就是會崩、會斷。十三行的人找到了更好的材料！' },
          { text: '把含鐵的礦石放進爐子，用高溫煉出鐵，打造鐵器。', ok: true,
            fb: '阿鐵的爐子冒出火光，煉出了鐵，敲打成鐵刀和工具！考古學家在十三行挖到[[煉鐵作坊]]和鐵渣，證明這裡的人已經會煉鐵，屬於[[金屬器時代]]的[[十三行文化]]。他們還和外地人交換玻璃、瑪瑙和銅錢，和島外有貿易往來！' },
          { text: '把陶罐打破，用碎片當刀子。',
            fb: '陶片又薄又脆，一用力就碎掉了，比石器還不耐用呢！' }
        ],
        card: { id: 'shisanhang', title: '十三行文化', year: '金屬器時代',
          body: '在新北八里十三行遺址發現（金屬器時代約距今 2000～400 年前），留下煉鐵作坊和鐵渣，代表當時已會煉鐵；出土的玻璃手環、瑪瑙珠和銅錢，說明他們和島外有貿易往來。',
          today: '新北市立十三行博物館（八里），可以看到著名的人面陶罐。' }
      }
    }
  ],

  outro: [
    { who: 'narrator', text: '從阿岩敲打石頭，到阿鐵煉出鐵器，你走過了臺灣好幾萬年的史前時代！' },
    { who: 'system', text: '考古學家依照工具的材料和製作方法，把史前時代分成：[[舊石器時代]] → 新石器時代 → 金屬器時代。' },
    { who: 'narrator', text: '在這座島上，一群群的人們也在山林與海洋之間，發展出各自的語言和文化……他們就是臺灣的原住民族。' },
    { who: 'system', text: '偵測到時間軸波動！啟動「歷史修正檢驗」，確認你的觀測紀錄。' }
  ],

  quiz: [
    { tag: '概念理解題',
      q: '為什麼這段時間叫做「史前時代」？',
      options: ['還沒有文字記錄的時代', '還沒有人類居住的時代', '恐龍生活的時代'], answer: 0,
      explain: '史前時代已經有人類生活，只是還沒有文字記錄，所以要靠考古學家挖出的遺址和遺物來了解。' },
    { tag: '時代排序題',
      q: '考古學家把臺灣的史前文化分成三個時代，由早到晚的正確順序是？',
      options: ['舊石器→新石器→金屬器', '新石器→舊石器→金屬器', '金屬器→舊石器→新石器'], answer: 0,
      explain: '先會敲打石頭（舊石器），再會磨石頭、燒陶器（新石器），最後才會煉金屬（金屬器）。' },
    { tag: '記憶連結題',
      q: '在臺東八仙洞發現、已經會用火和打製石器的是哪一個文化？',
      options: ['長濱文化', '卑南文化', '十三行文化'], answer: 0,
      explain: '長濱文化屬於舊石器時代，是臺灣目前已知最早的史前文化。' },
    { tag: '特徵判斷題',
      q: '考古學家在某個遺址挖到「石板棺」和精美的「玉器」，這最可能是哪一個文化？',
      options: ['大坌坑文化', '卑南文化', '長濱文化'], answer: 1,
      explain: '卑南文化的人把過世的家人葬在石板棺裡，並用玉器陪葬。' },
    { tag: '是非思辨題', type: 'tf',
      q: '大坌坑文化的人已經會燒製陶器，最有名的是表面有繩子花紋的粗繩紋陶。',
      answer: true,
      explain: '對！粗繩紋陶是大坌坑文化的代表，也是新石器時代的特色。' },
    { tag: '是非思辨題', type: 'tf',
      q: '十三行文化的人只會使用石器，還不會煉鐵。',
      answer: false,
      explain: '錯！十三行遺址挖到煉鐵作坊和鐵渣，證明他們已經會煉鐵，屬於金屬器時代。' }
  ],

  glossary: {
    '史前時代': '已經有人類生活，但還沒有文字記錄的時代。',
    '考古學家': '研究古代人類留下的遺址和遺物，推測過去生活情形的專家。',
    '遺址': '古代人類生活過、留下痕跡的地方，例如住過的洞穴、村落或墓地。',
    '遺物': '古代人類留下的東西，例如石器、陶器、骨器和玉器。',
    '舊石器時代': '史前時代最早的階段，人們使用敲打做成的打製石器，靠採集、狩獵、捕魚維生。',
    '新石器時代': '人們開始使用磨製石器、燒製陶器，並且定居、種植作物的時代。',
    '金屬器時代': '人們已經會煉製、使用金屬工具（例如鐵器）的時代。',
    '長濱文化': '臺灣目前已知最早的史前文化，屬於舊石器時代，在臺東長濱八仙洞發現。',
    '打製石器': '用石頭互相敲打，敲出鋒利邊緣的石器，表面比較粗糙。',
    '定居': '在固定的地方長期住下來，不再四處遷移。',
    '磨製石器': '把石頭磨得光滑鋒利的石器，例如石斧、石錛。',
    '貝塚': '古人把吃剩的貝殼堆在一起，日積月累形成的貝殼堆。',
    '圓山文化': '臺北盆地的新石器時代文化，留下了大型貝塚。',
    '農業': '種植作物、生產糧食的工作。',
    '粗繩紋陶': '表面壓有繩子花紋的陶器，是大坌坑文化的代表。',
    '大坌坑文化': '臺灣新石器時代早期的代表文化，在新北八里發現，會燒製粗繩紋陶。',
    '石板棺': '用石板拼成的棺木。卑南文化把過世的家人葬在家屋底下的石板棺裡。',
    '玉玦': '有一個小缺口的環狀玉飾，常當作耳環配戴。',
    '月形石柱': '卑南遺址的史前石柱，頂端的圓洞只剩一半，像一彎月亮。',
    '人獸形玉玦': '卑南遺址出土的國寶玉器，造型是兩個人頂著一隻動物。',
    '卑南文化': '臺灣東部新石器時代晚期的文化，以石板棺和精美玉器聞名。',
    '玻璃手環': '十三行遺址出土的外來物品，證明當時有對外貿易。',
    '干欄式住屋': '用柱子把地板撐高離地的房子，可以防潮、防淹水。',
    '人面陶罐': '十三行遺址出土、上面有人臉圖案的陶罐。',
    '煉鐵作坊': '把含鐵的礦石用高溫煉成鐵的工作場所，十三行遺址就有發現。',
    '十三行文化': '臺灣北部的金屬器時代文化，在新北八里發現，已會煉鐵並有對外貿易。'
  }
};
