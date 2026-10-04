/* 五年級社會・臺灣歷史章節地圖與教學進度
 * 章節依歷史先後排列（各版本教科書也都依時間先後教）。
 * books：三家出版社（108 課綱版）對應的學期、單元、課次與「大約」教學月份。
 *   - 月份是依一般學校進度推估（上學期 9～1 月、下學期 2～6 月），實際以老師安排為準。
 *   - 南一版的日治時期不在五年級，標成 grade: '六年級'。
 *   - 單元名稱查自各版本 114 學年目次（康軒、南一、翰林）。
 * status：'play' = 可遊玩；'soon' = 建造中。
 * map：在臺灣小地圖上的位置（約 0~110 × 0~200，對應 art.js 的 TAIWAN 輪廓）
 */
window.GAME_DATA = window.GAME_DATA || { chapters: {} };

window.GAME_DATA.books = {
  kangxuan: '康軒',
  nani: '南一',
  hanlin: '翰林'
};

window.GAME_DATA.units = [
  { id: 'ch01', term: '五上', year: '約 3 萬年前', title: '遠古的足跡：史前文化', host: '長濱、大坌坑、卑南、十三行的人們',
    status: 'play', unit: '臺灣的史前文化', map: [78, 115],
    topics: ['長濱文化', '大坌坑文化', '卑南文化', '十三行文化'],
    books: {
      kangxuan: { grade: '五上', unit: '第三單元 尋根探源話臺灣', lesson: '第 2 課 探訪史前人類與原住民族', months: [11] },
      nani:     { grade: '五上', unit: '第一單元 臺灣我來了', lesson: '第 3 課 當人類來到臺灣島', months: [9, 10] },
      hanlin:   { grade: '五上', unit: '第一單元 臺灣的位置與先民足跡', lesson: '102 史前人們如何善用資源維持生活', months: [9] }
    } },
  { id: 'ch02', term: '五上', year: '約 1600 年', title: '山海之子：原住民族的智慧', host: '布農族、達悟族、排灣族、阿美族',
    status: 'play', unit: '原住民族的生活與文化', map: [56, 104],
    topics: ['南島語族', '輪耕與飛魚季', '石板屋', '年齡階級'],
    books: {
      kangxuan: { grade: '五上', unit: '第三單元 尋根探源話臺灣', lesson: '第 1～2 課 山海環境與居民的生活、探訪史前人類與原住民族', months: [11] },
      nani:     { grade: '五上', unit: '第二單元 島嶼上的生活樣貌', lesson: '第 1～2 課 島嶼上的子民、島上居民的生活', months: [10] },
      hanlin:   { grade: '五上', unit: '第一單元 臺灣的位置與先民足跡', lesson: '103 原住民族的文化與環境有何關聯', months: [9, 10] }
    } },
  { id: 'ch03', term: '五上', year: '1624', title: '大航海時代的命運港口', host: '荷蘭長官 宋克',
    status: 'play', unit: '大航海時代的臺灣', map: [16, 133],
    topics: ['熱蘭遮城', '鹿皮與砂糖貿易', '新港文字'],
    books: {
      kangxuan: { grade: '五上', unit: '第四單元 大航海時代的臺灣', lesson: '第 1～2 課', months: [12] },
      nani:     { grade: '五上', unit: '第四單元 看見福爾摩沙', lesson: '第 1～2 課 潟湖上的海上貿易、大航海時期來臺的人們', months: [12] },
      hanlin:   { grade: '五上', unit: '第二單元 臺灣登上國際舞台', lesson: '201 臺灣為什麼在大航海時代崛起', months: [10] }
    } },
  { id: 'ch04', term: '五上', year: '1626', title: '雞籠與淡水的西班牙城堡', host: '西班牙艦隊司令',
    status: 'soon', unit: '大航海時代的臺灣', map: [92, 15],
    topics: ['聖薩爾瓦多城', '聖多明哥城（紅毛城）', '1642 荷蘭驅逐西班牙'],
    books: {
      kangxuan: { grade: '五上', unit: '第四單元 大航海時代的臺灣', lesson: '第 2 課 臺灣的位置與大航海時代', months: [12] },
      nani:     { grade: '五上', unit: '第四單元 看見福爾摩沙', lesson: '第 2 課 大航海時期來臺的人們', months: [12] },
      hanlin:   { grade: '五上', unit: '第二單元 臺灣登上國際舞台', lesson: '201 臺灣為什麼在大航海時代崛起', months: [10] }
    } },
  { id: 'ch05', term: '五上', year: '1661', title: '明鄭時期的荒地大開墾', host: '鄭成功、陳永華',
    status: 'play', unit: '鄭氏時期的臺灣', map: [18, 129],
    topics: ['鹿耳門登陸', '屯田制與營盤地名', '全臺首學'],
    books: {
      kangxuan: { grade: '五上', unit: '第四單元 大航海時代的臺灣', lesson: '第 3 課 大航海時代對臺灣的改變', months: [1] },
      nani:     { grade: '五上', unit: '第四單元 看見福爾摩沙', lesson: '第 3 課 大航海時期對臺的影響', months: [1] },
      hanlin:   { grade: '五上', unit: '第二單元 臺灣登上國際舞台', lesson: '202 大航海時代在臺灣留下哪些影響', months: [10, 11] }
    } },
  { id: 'ch06', term: '五下', year: '1684', title: '唐山過臺灣：渡海與開墾', host: '渡海的移民',
    status: 'soon', unit: '清帝國時期的移墾社會', map: [27, 74],
    topics: ['黑水溝', '水圳開發', '一府二鹿三艋舺'],
    books: {
      kangxuan: { grade: '五下', unit: '第二單元 清帝國時期臺灣發展重心的變化', lesson: '第 1 課 移民的開墾如何改變生活空間', months: [3] },
      nani:     { grade: '五下', unit: '第一單元 唐山到臺灣', lesson: '第 1～3 課', months: [2, 3] },
      hanlin:   { grade: '五上', unit: '第三單元 成為清帝國的領土', lesson: '301 早期移民如何在臺灣建立家園', months: [11] }
    } },
  { id: 'ch07', term: '五下', year: '1860', title: '開港通商：茶、糖、樟腦', host: '大稻埕的茶商',
    status: 'soon', unit: '開港通商與西方文化', map: [79, 15],
    topics: ['淡水、安平開港', '三大出口品', '馬偕來臺'],
    books: {
      kangxuan: { grade: '五下', unit: '第二單元 清帝國時期臺灣發展重心的變化', lesson: '第 2 課 開港通商如何影響經濟與文化', months: [3, 4] },
      nani:     { grade: '五下', unit: '第二單元 開港通商後的臺灣', lesson: '第 1 課 開港通商', months: [3, 4] },
      hanlin:   { grade: '五上', unit: '第三單元 成為清帝國的領土', lesson: '302 開港通商為什麼改變了臺灣的發展', months: [12] }
    } },
  { id: 'ch08', term: '五下', year: '1874', title: '牡丹社事件與海防', host: '欽差大臣 沈葆楨',
    status: 'soon', unit: '清帝國的治臺政策轉變', map: [44, 181],
    topics: ['牡丹社事件', '億載金城', '開山撫番'],
    books: {
      kangxuan: { grade: '五下', unit: '第二單元 清帝國時期臺灣發展重心的變化', lesson: '第 3 課 開港後清帝國的統治措施有什麼變化', months: [4] },
      nani:     { grade: '五下', unit: '第二單元 開港通商後的臺灣', lesson: '第 2 課 臺灣地位的改變', months: [4] },
      hanlin:   { grade: '五上', unit: '第三單元 成為清帝國的領土', lesson: '302 開港通商為什麼改變了臺灣的發展', months: [12] }
    } },
  { id: 'ch09', term: '五下', year: '1885', title: '清領後期的現代化建設', host: '臺灣巡撫 劉銘傳',
    status: 'play', unit: '臺灣建省與現代化', map: [82, 19],
    topics: ['臺灣建省', '第一條鐵路', '電報、郵政與西學堂'],
    books: {
      kangxuan: { grade: '五下', unit: '第二單元 清帝國時期臺灣發展重心的變化', lesson: '第 3 課 開港後清帝國的統治措施有什麼變化', months: [4] },
      nani:     { grade: '五下', unit: '第二單元 開港通商後的臺灣', lesson: '第 2 課 臺灣地位的改變', months: [4] },
      hanlin:   { grade: '五上', unit: '第三單元 成為清帝國的領土', lesson: '302 開港通商為什麼改變了臺灣的發展', months: [12] }
    } },
  { id: 'ch10', term: '五下', year: '1895', title: '日本統治下的新建設', host: '水利技師',
    status: 'soon', unit: '日本統治時期', map: [24, 122],
    topics: ['馬關條約', '嘉南大圳', '縱貫鐵路'],
    books: {
      kangxuan: { grade: '五下', unit: '第四單元 日治時期的建設、社會文化與生活的關係', lesson: '第 1 課 日治時期的建設帶來什麼影響', months: [5, 6] },
      nani:     { grade: '六年級', unit: '南一版五年級沒有這個單元', lesson: '', months: [] },
      hanlin:   { grade: '五下', unit: '第一單元 日本統治下的臺灣', lesson: '第 2 課 日治時期的建設帶來哪些改變', months: [2, 3] }
    } },
  { id: 'ch11', term: '五下', year: '1921', title: '文化啟蒙的年代', host: '臺灣文化協會成員',
    status: 'soon', unit: '日本統治時期的社會變遷', map: [80, 18],
    topics: ['臺灣文化協會', '新式教育', '社會運動'],
    books: {
      kangxuan: { grade: '五下', unit: '第三單元 日治時期人民與政府的關係', lesson: '第 2 課 殖民統治下臺灣人如何爭取權利', months: [5] },
      nani:     { grade: '六年級', unit: '南一版五年級沒有這個單元', lesson: '', months: [] },
      hanlin:   { grade: '五下', unit: '第一單元 日本統治下的臺灣', lesson: '第 3 課 日治時期對臺灣社會有什麼影響', months: [3] }
    } }
];
