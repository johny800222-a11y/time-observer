/* 第 2 章　山海之子：原住民族的智慧
 * 對應：康軒 五上 第三單元（山海環境與居民的生活／探訪史前人類與原住民族）
 *       南一 五上 第二單元 島嶼上的生活樣貌／翰林 五上 第一單元 103
 * 學習重點：南島語族、16 族；原住民族依山、海環境發展出的生活智慧——
 *           布農族（山田燒墾與輪耕、八部合音、木刻畫曆、射耳祭、洪水傳說）
 *           達悟族（飛魚季規範、拼板舟、地下屋）
 *           排灣族（就地取材的石板屋、頭目制度、琉璃珠、百步蛇、五年祭）
 *           阿美族（年齡階級、母系社會、豐年祭）；名稱的演變。
 * 角色以族群與身分稱呼，不虛構個人姓名；並提醒玩家這些文化至今仍在傳承。
 */
window.GAME_DATA.chapters.ch02 = {
  id: 'ch02',
  year: 1600,
  yearLabel: '約 1600 年',
  title: '山海之子：原住民族的智慧',
  unit: '五上・原住民族的生活與文化',

  cast: {
    bunun:      { name: '布農族獵人', role: '住在中央山脈的族人',
      look: { skin: '#B07648', hairStyle: 'short', hair: '#1A1410', hat: 'furcap', hatColor: '#7A5A3A', outfit: 'vest',
              color: '#F2EEE4', color2: '#1F2A3A', pants: '#1F2A3A', bareArms: true, expr: 'worry', acc: 'bow' } },
    bununelder: { name: '布農族長老', role: '熟悉祖先規矩的老人',
      look: { skin: '#A86E44', hairStyle: 'short', hair: '#CFC8BA', hat: 'furcap', hatColor: '#5E4630', outfit: 'vest',
              color: '#F2EEE4', color2: '#1F2A3A', pants: '#1F2A3A', bareArms: true, beard: 'goatee', beardColor: '#DDD6CA', expr: 'smile', acc: 'staff' } },
    bununwoman: { name: '布農族婦女', role: '照顧小米田的人',
      look: { skin: '#B47A4C', hairStyle: 'womanlong', hair: '#1A1410', hat: 'bandana', hatColor: '#1F2A3A', outfit: 'dress',
              color: '#2B3A55', color2: '#C0392B', pants: '#B47A4C', expr: 'smile', acc: 'millet' } },
    bununkid:   { name: '布農族的孩子', role: '正在練習射箭',
      look: { skin: '#B98252', hairStyle: 'kid', hair: '#1A1410', outfit: 'vest', color: '#F2EEE4', color2: '#1F2A3A',
              pants: '#1F2A3A', bareArms: true, expr: 'happy', acc: 'bow', kid: true } },
    bununsinger:{ name: '布農族男子', role: '負責祭儀歌唱',
      look: { skin: '#A9744A', hairStyle: 'short', hair: '#1A1410', outfit: 'vest', color: '#F2EEE4', color2: '#1F2A3A',
              pants: '#1F2A3A', bareArms: true, expr: 'happy' } },

    taoelder:   { name: '達悟族長老', role: '帶領族人出海的老人',
      look: { skin: '#A86E44', hairStyle: 'long', hair: '#B9B2A4', outfit: 'tao', color: '#F2EEE4', color2: '#1F3A6E',
              pants: '#A86E44', bareArms: true, expr: 'worry', acc: 'fish' } },
    taobuilder: { name: '造船的男人', role: '正在打造拼板舟',
      look: { skin: '#A26A40', hairStyle: 'long', hair: '#1A1410', outfit: 'tao', color: '#F2EEE4', color2: '#1F3A6E',
              pants: '#A26A40', bareArms: true, expr: 'happy', acc: 'hammer' } },
    taofisher:  { name: '老漁夫', role: '捕了一輩子飛魚',
      look: { skin: '#9E6840', hairStyle: 'long', hair: '#D2CBBE', outfit: 'tao', color: '#F2EEE4', color2: '#1F3A6E',
              pants: '#9E6840', bareArms: true, beard: 'goatee', beardColor: '#DDD6CA', expr: 'serious', acc: 'oar' } },
    taowoman:   { name: '達悟族婦女', role: '照顧水芋田',
      look: { skin: '#A86E44', hairStyle: 'womanlong', hair: '#1A1410', outfit: 'dress', color: '#1F3A6E', color2: '#F2EEE4',
              pants: '#A86E44', bareArms: true, expr: 'smile', acc: 'basket' } },
    taokid:     { name: '達悟族的孩子', role: '在海邊玩耍',
      look: { skin: '#AE7448', hairStyle: 'kid', hair: '#1A1410', outfit: 'tao', color: '#F2EEE4', color2: '#1F3A6E',
              pants: '#AE7448', bareArms: true, expr: 'happy', kid: true } },

    paiwan:     { name: '排灣族頭目', role: '照顧族人的領袖',
      look: { skin: '#B9824F', hairStyle: 'short', hair: '#1A1410', hat: 'eaglefeather', hatColor: '#1E1E22', outfit: 'paiwan',
              color: '#1E1E22', color2: '#C0392B', pants: '#1E1E22', necklace: true, expr: 'serious' } },
    paiwanbuilder: { name: '蓋房子的工匠', role: '部落裡的建屋高手',
      look: { skin: '#B07648', hairStyle: 'short', hair: '#1A1410', hat: 'bandana', hatColor: '#C0392B', outfit: 'paiwan',
              color: '#2A2A2E', color2: '#2E7D5B', pants: '#2A2A2E', expr: 'happy', acc: 'hammer' } },
    paiwanyouth:{ name: '排灣族青年', role: '剛從山下回來',
      look: { skin: '#B47A4C', hairStyle: 'short', hair: '#1A1410', outfit: 'paiwan', color: '#2A2A2E', color2: '#C0392B',
              pants: '#2A2A2E', expr: 'worry', acc: 'spear' } },
    paiwanwoman:{ name: '戴琉璃珠的婦女', role: '貴族家庭的長女',
      look: { skin: '#BE8658', hairStyle: 'womanlong', hair: '#1A1410', hat: 'flowerband', hatColor: '#E9C46A', outfit: 'dress',
              color: '#1E1E22', color2: '#C0392B', pants: '#BE8658', necklace: true, expr: 'smile' } },
    paiwanelder:{ name: '排灣族長老', role: '會說祖先的故事',
      look: { skin: '#A86E44', hairStyle: 'short', hair: '#CFC8BA', outfit: 'paiwan', color: '#1E1E22', color2: '#E9C46A',
              pants: '#1E1E22', beard: 'goatee', beardColor: '#DDD6CA', expr: 'smile', acc: 'staff' } },
    paiwankid:  { name: '排灣族的孩子', role: '期待祭典的小朋友',
      look: { skin: '#BE8658', hairStyle: 'kid', hair: '#1A1410', outfit: 'paiwan', color: '#1E1E22', color2: '#C0392B',
              pants: '#1E1E22', expr: 'happy', kid: true } },

    amis:       { name: '阿美族頭目', role: '海岸部落的領袖',
      look: { skin: '#B47A4C', hairStyle: 'short', hair: '#1A1410', hat: 'amisfeather', hatColor: '#C0392B', outfit: 'amis',
              color: '#C0392B', color2: '#F2E6C8', pants: '#1E1E22', bareArms: true, expr: 'smile', acc: 'staff' } },
    amisyouth:  { name: '阿美族青年', role: '屬於年輕的年齡階級',
      look: { skin: '#AE7448', hairStyle: 'short', hair: '#1A1410', hat: 'featherband', hatColor: '#C0392B', outfit: 'amis',
              color: '#C0392B', color2: '#F2E6C8', pants: '#1E1E22', bareArms: true, expr: 'happy' } },
    amiselder:  { name: '阿美族長老', role: '年紀最大的階級',
      look: { skin: '#A86E44', hairStyle: 'short', hair: '#CFC8BA', outfit: 'amis', color: '#9E3028', color2: '#F2E6C8',
              pants: '#1E1E22', bareArms: true, beard: 'goatee', beardColor: '#DDD6CA', expr: 'serious', acc: 'staff' } },
    amiswoman:  { name: '阿美族婦女', role: '家裡的當家',
      look: { skin: '#BE8658', hairStyle: 'womanlong', hair: '#1A1410', hat: 'amisband', hatColor: '#C0392B', outfit: 'dress',
              color: '#C0392B', color2: '#1E1E22', pants: '#BE8658', necklace: true, expr: 'happy', acc: 'basket' } },
    amiskid:    { name: '阿美族的孩子', role: '最愛跳舞',
      look: { skin: '#B98252', hairStyle: 'kid', hair: '#1A1410', outfit: 'amis', color: '#C0392B', color2: '#F2E6C8',
              pants: '#1E1E22', bareArms: true, expr: 'happy', kid: true } }
  },

  intro: [
    { who: 'system', text: '時空座標鎖定：約西元 1600 年，大航海時代的船隊還沒到來的臺灣。' },
    { who: 'narrator', text: '這時候的臺灣，高山、平原和海岸邊，住著許多不同的族群。他們說著不同的語言，有各自的祭典和生活智慧。' },
    { who: 'system', text: '臺灣的原住民族屬於[[南島語族]]。從臺灣往南到紐西蘭、往東到復活節島、往西到馬達加斯加，都住著說南島語的族群！' },
    { who: 'system', text: '目前政府認定的原住民族共有 [[16 族]]。觀測器將帶你拜訪其中四族，看看他們怎麼和山、海一起生活。' },
    { who: 'system', text: '提醒你：這些文化不只存在過去，今天族人們仍然傳承著這些智慧喔！' },
    { who: 'narrator', text: '第一站：高高的中央山脈。你的意識連結上了一位布農族的獵人。' }
  ],

  scenes: [
    /* ───────── 場景一：布農族 ───────── */
    {
      id: 'bunun', bg: 'mountain', host: 'bunun',
      title: '山上的小米田', time: '春天・小米播種前', place: '中央山脈的布農族部落',
      enter: [
        { who: 'narrator', text: '雲海就在腳下！布農族住在很高的山上，被稱為「中央山脈的守護者」。' },
        { who: 'host', text: '（這塊小米田已經種了好幾年，去年的小米長得又矮又瘦……今年該怎麼辦？）' }
      ],
      objective: '和部落的人聊聊，想辦法讓小米長得好',
      need: 2,
      actors: [
        { cast: 'bunun', host: true, x: 800, y: 805, s: 1.05,
          lines: [
            { who: 'host', text: '（我們種小米和芋頭，也上山打獵。山林就是我們的家。）' },
            { who: 'host', text: '（獵到的肉，要和族人一起分享，這是祖先的規矩。）' }
          ] },
        { cast: 'bununelder', x: 430, y: 805, s: 1,
          clue: '田地種久了會變貧瘠，要讓土地休息',
          idle: '土地也會累的。',
          lines: [
            '孩子，土地跟人一樣，也是會累的。',
            '同一塊田種了好幾年，養分用光了，小米就長不好。要讓它休息，長回草木，恢復力氣。'
          ],
          again: [
            '我再說一個祖先的故事：很久以前發生大洪水，族人逃到[[玉山]]山頂避難，最後靠著螃蟹打敗了巨蛇，洪水才退去。',
            { who: 'system', text: '這是布農族的[[洪水傳說]]。原住民族沒有文字，故事都靠口耳相傳。' }
          ] },
        { cast: 'bununkid', x: 610, y: 815, s: 1,
          idle: '我一定會射中！',
          lines: [
            '我在練習射箭！春天的[[射耳祭]]，男孩子要跟著大人射鹿的耳朵。',
            '射中了，代表以後會成為很厲害的獵人！'
          ] },
        { cast: 'bununwoman', x: 1000, y: 810, s: 1,
          clue: '開新田時，砍下草木燒成灰當肥料',
          idle: '小米快快長大喔。',
          lines: [
            '每次開一塊新田，我們先把草木砍下來曬乾，再放火燒成灰。',
            '草木灰就是最好的肥料！這叫[[山田燒墾]]，然後就可以種下小米和芋頭。'
          ] },
        { cast: 'bununsinger', x: 1400, y: 810, s: 1, flip: true,
          idle: '嗚——嗚——',
          lines: [
            '小米播種之前，我們男人會圍成一圈，唱「祈禱小米豐收歌」。',
            '大家的聲音越和諧，小米就會長得越好！',
            { who: 'system', text: '這就是聞名世界的[[八部合音]]，曾讓國外的音樂家大吃一驚！' }
          ] },
        { prop: 'calendar', name: '刻滿圖案的木板', x: 160, y: 775, s: 0.85,
          lines: [
            { who: 'narrator', text: '屋外立著一塊刻滿圖案的木板，有人、有月亮，還有一些奇怪的符號。' },
            { who: 'system', text: '這是布農族的[[木刻畫曆]]，用圖案記下一年之中什麼時候播種、收割、舉行祭典。' }
          ] },
        { prop: 'zone', name: '小米田', x: 1180, y: 600, w: 420, h: 110,
          clue: '這塊田種了好多年，小米越長越差',
          lines: [
            { who: 'narrator', text: '小米長得稀稀疏疏，土壤看起來乾乾的，一點力氣也沒有。' },
            { who: 'host', text: '（再這樣種下去，恐怕連種子都收不回來……）' }
          ] }
      ],
      decision: {
        prompt: '小米田種了好幾年，小米越長越差。你讓布農族獵人和家人怎麼做？',
        options: [
          { text: '讓這塊田休息，到別處開墾新田；過幾年土地恢復了再回來種。', ok: true,
            fb: '族人在不同的田地之間輪流耕作，讓土地有時間休息、長回草木，這就是[[輪耕]]（休耕）。配合山田燒墾，山林可以一直養活族人，這是原住民族和自然共存的智慧！' },
          { text: '不管它，同一塊田一直種下去。',
            fb: '土地的養分被用光了，小米只會越長越差，最後什麼都種不出來……' },
          { text: '把整座山的樹都燒光，全部變成田。',
            fb: '山林是動物的家，也是族人打獵、採集的地方。森林燒光了，下大雨時土石還會崩落，族人的生活也會跟著毀掉！' }
        ],
        card: { id: 'bunun', title: '山田燒墾與輪耕', year: '布農族',
          body: '山區的原住民族把草木砍下燒成灰當肥料，種植小米、芋頭等作物；田地種了幾年就休耕，換地耕作，讓土地恢復。布農族還有八部合音、射耳祭和木刻畫曆。',
          today: '每年春天，布農族部落仍會舉行射耳祭，八部合音也常在國內外演出。' }
      }
    },

    /* ───────── 場景二：達悟族 ───────── */
    {
      id: 'tao', bg: 'lanyu', host: 'taoelder',
      title: '人之島的飛魚季', time: '春天・飛魚季', place: '蘭嶼',
      hostSwitch: {
        from: 'bunun', to: 'taoelder',
        text: '觀測器跨過大海，來到臺灣東南方的小島——蘭嶼。你的意識轉移到一位達悟族長老身上。'
      },
      enter: [
        { who: 'narrator', text: '蘭嶼四面環海，達悟族人把這座島叫做「人之島」。春天到了，海面上出現一群群的飛魚。' },
        { who: 'host', text: '（飛魚是上天送給我們的禮物。要怎麼抓，才能年年都有飛魚吃呢？）' }
      ],
      objective: '向族人請教，怎麼捕魚才能年年都有魚',
      need: 2,
      actors: [
        { cast: 'taoelder', host: true, x: 800, y: 805, s: 1.05,
          lines: [
            { who: 'host', text: '（我們的生活和大海分不開。男人出海捕魚，女人照顧芋頭田。）' }
          ] },
        { cast: 'taofisher', x: 330, y: 805, s: 1,
          clue: '只在飛魚季捕飛魚，其他時候讓魚休養',
          idle: '大海會照顧懂規矩的人。',
          lines: [
            '祖先傳下來的規矩可不能忘：飛魚季的時候才捕飛魚。',
            '季節過了，就讓魚群休息、長大，明年牠們才會再回來。'
          ] },
        { cast: 'taokid', x: 560, y: 815, s: 1,
          clue: '吃不完的飛魚曬成魚乾，慢慢吃',
          idle: '飛魚飛起來了！',
          lines: [
            '奶奶說，吃不完的飛魚要剖開，掛起來曬成魚乾。',
            '這樣就可以存起來，慢慢吃好久好久！'
          ] },
        { cast: 'taobuilder', x: 1250, y: 810, s: 1, flip: true,
          idle: '這塊木板要再削薄一點。',
          lines: [
            '我在做[[拼板舟]]！它是用好多塊木板拼起來的，不用一根鐵釘，全靠木釘接合。',
            '船上畫著像眼睛的圖案，叫做「船眼」，保佑我們出海平安。'
          ] },
        { cast: 'taowoman', x: 1440, y: 812, s: 1,
          idle: '芋頭長得真好。',
          lines: [
            '我們在水田裡種芋頭，芋頭是我們重要的主食。',
            '男人出海、女人種田，大家分工合作。'
          ] },
        { prop: 'fishrack', name: '曬魚架', x: 150, y: 780, s: 0.9,
          clue: '曬魚架上的魚乾可以保存很久',
          lines: [ { who: 'narrator', text: '木架上掛滿了剖開的飛魚，在海風和太陽下慢慢曬乾。' } ] },
        { prop: 'canoe', name: '拼板舟', x: 1012, y: 712, s: 0.72,
          lines: [
            { who: 'narrator', text: '沙灘上停著漂亮的拼板舟，紅、黑、白三種顏色的花紋好醒目。' },
            { who: 'system', text: '新船完成時，達悟族人會舉行盛大的下水典禮，全村一起慶祝。' }
          ] },
        { prop: 'zone', name: '低低的房子', x: 470, y: 575, w: 300, h: 80,
          lines: [
            { who: 'narrator', text: '房子大半蓋在地面下，只露出低低的屋頂。' },
            { who: 'system', text: '這是達悟族的[[地下屋]]，可以抵擋蘭嶼強烈的颱風和海風，還冬暖夏涼！' }
          ] }
      ],
      decision: {
        prompt: '海上出現一大群飛魚。你讓達悟族長老帶領族人怎麼捕魚？',
        options: [
          { text: '一年四季都拚命捕，抓越多越好。',
            fb: '魚群來不及長大、繁殖，總有一天大海會變得空蕩蕩……' },
          { text: '遵守祖先的規範：只在飛魚季捕飛魚，吃不完就曬成魚乾，季節過了讓魚休息。', ok: true,
            fb: '達悟族在春天舉行[[飛魚祭]]（招魚祭）迎接飛魚，整個飛魚季都遵守祖先的禁忌和規範；到了秋天舉行飛魚終食祭，之後就不再吃飛魚。這套規矩讓海洋資源年年恢復，是達悟族和大海共存的智慧！' },
          { text: '把島上的大樹全砍了，造一艘超大的船，一次抓光所有飛魚。',
            fb: '造船的大樹要長好多年，族人需要時才砍，非常珍惜。一次把飛魚抓光，明年就沒有魚了！' }
        ],
        card: { id: 'tao', title: '達悟族的飛魚季', year: '達悟族',
          body: '蘭嶼的達悟族（也稱雅美族）在飛魚季捕飛魚，遵守祖先的禁忌與規範；住在能抵擋颱風的地下屋，搭乘不用鐵釘的拼板舟出海。',
          today: '每年春天，蘭嶼各部落仍會舉行招魚祭，迎接飛魚季開始。' }
      }
    },

    /* ───────── 場景三：排灣族 ───────── */
    {
      id: 'paiwan', bg: 'slatevillage', host: 'paiwan',
      title: '大武山下的石板屋', time: '要蓋新家屋的時候', place: '南部山區的排灣族部落',
      hostSwitch: {
        from: 'taoelder', to: 'paiwan',
        text: '觀測器飛回臺灣本島，來到南部的大武山一帶。你的意識轉移到一位排灣族頭目身上。'
      },
      enter: [
        { who: 'narrator', text: '排灣族的社會有[[頭目]]和貴族，頭目負責照顧族人、主持部落的大事。頭飾上的熊鷹羽毛，代表尊貴的身分。' },
        { who: 'host', text: '（部落的人越來越多，要蓋新的家屋了。山上風大雨大，房子一定要夠堅固……）' }
      ],
      objective: '在部落裡打聽，新家屋該用什麼材料蓋',
      need: 2,
      actors: [
        { cast: 'paiwan', host: true, x: 800, y: 805, s: 1.05,
          lines: [ { who: 'host', text: '（身為頭目，我要讓族人住得安全、過得安心。）' } ] },
        { cast: 'paiwanelder', x: 230, y: 805, s: 1,
          idle: '祖先在看著我們。',
          lines: [
            '[[百步蛇]]是我們排灣族的祖先象徵。',
            '所以我們把百步蛇的花紋刻在家屋的柱子、衣服和陶壺上，表示尊敬。'
          ] },
        { cast: 'paiwankid', x: 420, y: 815, s: 1,
          idle: '五年祭快到了嗎？',
          lines: [
            '聽說每五年，祖靈會回到部落來看大家！',
            '那時候要舉行[[五年祭]]，勇士們會用長長的竹竿刺藤球，好熱鬧喔！'
          ] },
        { cast: 'paiwanyouth', x: 610, y: 810, s: 1,
          clue: '茅草屋擋不住大雨和颱風',
          idle: '上次颱風好可怕。',
          lines: [
            '頭目，上次颱風來的時候，山下那間茅草屋的屋頂整個被吹走了！',
            '而且一下大雨就漏水，住起來好辛苦。'
          ] },
        { cast: 'paiwanbuilder', x: 1190, y: 810, s: 1, flip: true,
          clue: '附近山上有很多可以剝成石板的板岩',
          idle: '這石頭真好剝！',
          lines: [
            '頭目，我們附近的山上有好多黑灰色的石頭，叫做[[板岩]]。',
            '它可以一片一片剝下來，又平又硬，用來蓋房子最適合了！'
          ] },
        { cast: 'paiwanwoman', x: 1400, y: 812, s: 1,
          idle: '每顆珠子都有故事。',
          lines: [
            '這串是祖先傳下來的[[琉璃珠]]，每一種花紋都有不同的意義。',
            '像這顆「孔雀之珠」，象徵愛情，是很珍貴的禮物喔！'
          ] },
        { prop: 'slabs', name: '一疊石板', x: 1000, y: 770, s: 0.9,
          clue: '石板又平又硬，可以疊成牆和屋頂',
          lines: [
            { who: 'narrator', text: '一疊剛剝下來的石板，每一片都又平又硬，敲起來叩叩作響。' },
            { who: 'host', text: '（就在身邊的材料……說不定就是最好的材料。）' }
          ] }
      ],
      decision: {
        prompt: '部落要蓋新的家屋。你讓排灣族頭目選用什麼材料？',
        options: [
          { text: '從遙遠的平地扛木頭和磚塊上山來蓋。',
            fb: '山路又陡又遠，扛磚上山太辛苦了！而且這時候部落附近根本沒有燒磚的窯。' },
          { text: '用樹葉搭一個簡單的棚子就好。',
            fb: '樹葉棚子擋不住山上的大風大雨，颱風一來就被吹走了！' },
          { text: '就地取材，用附近山上的板岩，疊成石板屋。', ok: true,
            fb: '族人把板岩剝成石板，一片片疊成牆壁和屋頂，蓋出堅固的[[石板屋]]，能擋風雨，還冬暖夏涼。用身邊環境裡的材料蓋房子，叫做[[就地取材]]。今天屏東的老七佳部落，還保留著完整的石板屋聚落！' }
        ],
        card: { id: 'paiwan', title: '排灣族的石板屋', year: '排灣族',
          body: '排灣族（和魯凱族）就地取材，用板岩疊成石板屋。社會有頭目和貴族，以百步蛇、琉璃珠、陶壺為重要文化象徵，每五年舉行五年祭。',
          today: '屏東縣春日鄉的老七佳部落，是保存最完整的石板屋聚落之一。' }
      }
    },

    /* ───────── 場景四：阿美族 ───────── */
    {
      id: 'amis', bg: 'amis', host: 'amis',
      title: '海岸邊的豐年祭', time: '夏天・小米收成後', place: '花東海岸的阿美族部落',
      hostSwitch: {
        from: 'paiwan', to: 'amis',
        text: '觀測器沿著東海岸往北，來到花東的海岸平原。你的意識轉移到人口最多的原住民族——阿美族的頭目身上。'
      },
      enter: [
        { who: 'narrator', text: '小米收成了！部落正準備舉行一年中最盛大的祭典——[[豐年祭]]，感謝祖靈、慶祝豐收。' },
        { who: 'host', text: '（祭典有好多工作：搭建會所、準備食物、練習歌舞、守衛部落……要怎麼分配才好？）' }
      ],
      objective: '問問族人，祭典的工作該怎麼分配',
      need: 2,
      actors: [
        { cast: 'amis', host: true, x: 800, y: 805, s: 1.05,
          lines: [ { who: 'host', text: '（部落的大事，要靠大家一起完成。）' } ] },
        { cast: 'amiselder', x: 400, y: 805, s: 1,
          clue: '長老負責教導年輕人、決定部落大事',
          idle: '年輕人要好好學。',
          lines: [
            '頭目，我們長老負責教導年輕人，也和你一起商量部落的大事。',
            '年輕人要聽從長輩的帶領，一代傳一代，部落才會強壯。'
          ] },
        { cast: 'amiskid', x: 590, y: 815, s: 1,
          idle: '跳舞囉！',
          lines: [
            '豐年祭的時候，大家會手牽手圍成大圓圈唱歌跳舞！',
            '我最喜歡豐年祭了，可以跳一整個晚上！'
          ] },
        { cast: 'amisyouth', x: 1080, y: 810, s: 1, flip: true,
          clue: '同年齡的男子組成一級，一起受訓、分擔工作',
          idle: '交給我們吧！',
          lines: [
            '我們這一批年紀差不多的男生，從小一起在會所受訓，算是同一個階級。',
            '我們這一級負責跑腿、搬東西，還要練習打獵和捕魚！'
          ] },
        { cast: 'amiswoman', x: 1340, y: 812, s: 1,
          idle: '糯米糕快蒸好了！',
          lines: [
            '在我們阿美族，家裡通常是由女性當家，財產也大多傳給女兒喔！',
            { who: 'system', text: '這種由女性繼承家業的社會，叫做[[母系社會]]。' }
          ] },
        { prop: 'zone', name: '會所', x: 400, y: 500, w: 320, h: 200,
          clue: '年輕男子在會所一起學習部落的事',
          lines: [
            { who: 'narrator', text: '這是部落的會所，年輕男子在這裡集合、受訓，學習部落的規矩和本領。' }
          ] },
        { prop: 'zone', name: '海邊', x: 1320, y: 470, w: 400, h: 120,
          lines: [
            { who: 'narrator', text: '藍藍的大海就在部落旁邊。阿美族人也很會捕魚，有些部落還會舉行[[海祭]]。' }
          ] }
      ],
      decision: {
        prompt: '豐年祭有好多工作。你讓阿美族頭目怎麼分配？',
        options: [
          { text: '依照年齡階級分工：長老指導、青年出力搬運和守衛、少年跑腿學習。', ok: true,
            fb: '阿美族男子依照年齡分成不同的[[年齡階級]]，每一級都有自己的責任，從小在會所一起學習。靠著年齡階級，部落的大小事都能井然有序！豐年祭時，大家一起唱歌跳舞，感謝祖靈的照顧。' },
          { text: '全部交給頭目一個人做。',
            fb: '祭典的工作那麼多，頭目一個人怎麼做得完？阿美族靠的是大家分工合作。' },
          { text: '誰想做就做，不想做就去玩。',
            fb: '沒有分工，搭會所的竹子沒人砍、守衛也沒人站……祭典根本辦不起來！' }
        ],
        card: { id: 'amis', title: '阿美族的年齡階級', year: '阿美族',
          body: '阿美族是人口最多的原住民族，主要住在花東縱谷和海岸。男子依年齡分成不同階級、分擔部落工作；家中常由女性當家。每年夏天舉行豐年祭，感謝祖靈。',
          today: '每年 7～8 月，花蓮、臺東的阿美族部落陸續舉行豐年祭。' }
      }
    }
  ],

  outro: [
    { who: 'narrator', text: '你拜訪了布農族、達悟族、排灣族和阿美族。高山、大海、平原，每個族群都發展出適合環境的生活方式。' },
    { who: 'system', text: '還有泰雅族的紋面與織布、賽夏族的矮靈祭、鄒族的戰祭……臺灣原住民族的文化非常多元。' },
    { who: 'system', text: '以前，外來的政府曾用「生番、熟番」「高砂族」「山地同胞」等名稱稱呼他們；1994 年起才正名為「原住民」，後來稱為「原住民族」。每年 8 月 1 日是原住民族日。' },
    { who: 'narrator', text: '不久之後，一艘艘巨大的帆船出現在海平面上……大航海時代就要來了！' },
    { who: 'system', text: '偵測到時間軸波動！啟動「歷史修正檢驗」，確認你的觀測紀錄。' }
  ],

  quiz: [
    { tag: '族群連結題',
      q: '臺灣的原住民族屬於哪一個語族？',
      options: ['南島語族', '漢藏語族', '印歐語族'], answer: 0,
      explain: '南島語族的分布北起臺灣，南到紐西蘭，東到復活節島，西到馬達加斯加。' },
    { tag: '數字記憶題',
      q: '目前政府認定的臺灣原住民族共有幾族？',
      options: ['9 族', '16 族', '30 族'], answer: 1,
      explain: '2014 年卡那卡那富族和拉阿魯哇族正名後，共有 16 族。' },
    { tag: '生活智慧題',
      q: '布農族的田地種了幾年後就換地耕作，讓土地休息恢復。這種方式叫做什麼？',
      options: ['輪耕（休耕）', '梯田', '溫室栽培'], answer: 0,
      explain: '輪耕讓土地有時間恢復養分，是原住民族和山林共存的智慧。' },
    { tag: '族群文化題',
      q: '住在蘭嶼、搭乘拼板舟、舉行飛魚祭的是哪一族？',
      options: ['阿美族', '達悟族', '排灣族'], answer: 1,
      explain: '達悟族（也稱雅美族）住在蘭嶼，飛魚季的規範讓海洋資源年年恢復。' },
    { tag: '因果素養題',
      q: '排灣族用板岩蓋石板屋，最主要的原因是什麼？',
      options: ['就地取材，石板堅固又能擋風雨', '板岩是從外國買來的高級建材', '石板屋比較容易搬家'], answer: 0,
      explain: '板岩就在部落附近的山上，用它蓋房子又方便又堅固，這就是就地取材。' },
    { tag: '是非思辨題', type: 'tf',
      q: '阿美族的男子依照年齡分成不同的階級，分擔部落的工作。',
      answer: true,
      explain: '對！這就是阿美族的年齡階級制度，每一級都有自己的責任。' }
  ],

  glossary: {
    '南島語族': '說南島語系語言的族群，分布北起臺灣、南到紐西蘭、東到復活節島、西到馬達加斯加。',
    '16 族': '阿美、泰雅、排灣、布農、卑南、魯凱、鄒、賽夏、雅美（達悟）、邵、噶瑪蘭、太魯閣、撒奇萊雅、賽德克、拉阿魯哇、卡那卡那富。',
    '玉山': '臺灣最高的山，布農族傳說中族人躲避洪水的地方。',
    '洪水傳說': '布農族的起源傳說之一：大洪水時族人逃到玉山頂避難，最後螃蟹打敗巨蛇，洪水才退去。',
    '射耳祭': '布農族最盛大的祭典，大約在每年 4～5 月舉行，男孩會練習射獵物的耳朵。',
    '山田燒墾': '把山坡上的草木砍下燒成灰當肥料，再種植作物的耕作方式。',
    '八部合音': '布農族「祈禱小米豐收歌」，由男子圍圈合唱，聲音層層交疊，非常和諧。',
    '木刻畫曆': '布農族刻有圖案的木板，用來記錄一年中的農事與祭典時間。',
    '輪耕': '田地種了幾年就休耕，換到別處耕作，讓土地恢復養分。',
    '拼板舟': '達悟族用許多木板拼成的船，以木釘接合，船身畫有紅、黑、白花紋。',
    '地下屋': '達悟族的傳統房屋，大半蓋在地面下，可以抵擋颱風和強風。',
    '飛魚祭': '達悟族迎接飛魚季的祭典（招魚祭），大約在每年 2～3 月舉行。',
    '頭目': '部落的領袖，負責照顧族人、主持部落大事。',
    '百步蛇': '排灣族、魯凱族心中的祖先象徵，常被刻在家屋、衣服和陶壺上。',
    '五年祭': '排灣族每五年舉行一次的祭典，迎接祖靈回到部落，有刺球儀式。',
    '板岩': '可以剝成一片片薄石板的岩石，是石板屋的建材。',
    '琉璃珠': '排灣族珍貴的珠飾，每種花紋都有不同的意義，例如象徵愛情的孔雀之珠。',
    '石板屋': '用板岩疊成牆壁和屋頂的房子，排灣族、魯凱族的傳統家屋。',
    '就地取材': '利用身邊環境裡現成的材料來生活或建造。',
    '豐年祭': '阿美族每年夏天收成後舉行的祭典，感謝祖靈、慶祝豐收。',
    '母系社會': '由女性當家、財產大多由女兒繼承的社會。',
    '海祭': '阿美族有些部落在海邊舉行的祭儀，祈求漁獲豐收、出海平安。',
    '年齡階級': '阿美族男子依年齡分成不同階級，每一級分擔不同的部落工作。'
  }
};
