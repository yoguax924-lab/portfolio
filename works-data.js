// ==========================================================
// トップページのスライド（ヒーロー）
//   caption : 左下に出す文字
//   work    : クリックで飛ぶ作品のID（WORKS の id と同じにする。例 "work-01"）
//             空 "" にするとリンクなし
//   image   : 画像のパス（例 "images/slide1.jpg"）。仮のうちは ""
//   bg      : image が "" のときの仮の背景（グラデーション）
// スライドを増やすときは { ... }, をコピー。切替間隔は script.js の INTERVAL。
// ==========================================================
const SLIDES = [
  { caption: "Work 01 — 松本城プロジェクションマッピング", work: "work-01", image: "images/slide-01.jpg", bg: "linear-gradient(135deg, #1a1a2e, #0f3460)" },
  { caption: "Work 02 — mikkae-club party", work: "work-02", image: "images/slide-02.jpg", bg: "linear-gradient(135deg, #2b1055, #7597de)" },
  { caption: "Work 03 — pass", work: "work-03", image: "images/slide-03.jpg", bg: "linear-gradient(135deg, #000000, #434343)" },
];

// ==========================================================
// 作品データ（一覧ページ・詳細ページ共通）
//
// ★作品を追加・編集するときは、この WORKS だけ触ればOKです。
//   → Works一覧、カテゴリ別セクション、作品詳細ページが自動で作られます。
//
// 1作品 = { ... }, 1つ分。コピーして増やしてください。
// ※ title の中に \n を入れると、その位置で改行されます（詳細ページ・一覧のタイトルに反映）
//
//   id          : 作品ごとの固有ID（半角英数字。重複させない）
//                 詳細ページのURLになります → work.html?id=work-01
//   title       : 作品名
//   category    : カテゴリ名（同じ名前の作品が同じカテゴリにまとまります）
//   period      : 制作時期（例 "2025.03"）
//   client      : クライアント / イベント名（詳細ページでは「Client / Event」と表示。なければ "Personal Work" など）
//   role        : （任意）担当範囲。書くと Client の右に「Role」として表示。書かなければ表示されません
//   credits     : クレジット。[ ["役割", "名前"], ... ] の形で並べる
//   video       : 画面トップに出すメディア。書いたURL・パスの種類で表示が自動で切り替わります
//                 YouTube  → "https://www.youtube.com/watch?v=動画ID" / "https://youtu.be/動画ID"（アドレスバーのURLをそのまま貼ればOK）
//                 Vimeo    → "https://player.vimeo.com/video/動画ID"
//                 mp4など  → "videos/work-XX-main.mp4"（.mp4 / .webm。再生ボタン付きの動画）
//                 静止画   → "images/work-XX-main.jpg"（.jpg / .png / .webp など）
//                 なし     → ""（「coming soon」の枠が出ます）
//   poster      : （任意）動画を再生する前に見せる画像のパス。
//                 YouTubeは省略すると自動サムネイル、mp4は省略すると最初のコマ（ブラウザ次第）
//                 ※ YouTubeは最初は再生ボタン付きの画像で、クリックすると読み込まれます
//   hide        : （任意）表示しないセクションの名前の一覧。データを消さずに非表示にできます
//                 例 hide: ["process", "tech"]
//                 指定できる名前：description / gallery / process / tech / learnings / credits
//                 （各セクションは、その項目を書かなければ最初から表示されません。hide はあとから一時的に隠したいとき用）
//   description : 作品の説明。改行したい所に \n を入れると段落が分かれます
//   skills      : 使用スキル・ツールの一覧
//   image       : 一覧に出すサムネイル画像のパス。仮のうちは ""
//                 ※ ファイル名の付け方は images/README.txt の命名規則を参照
//                   サムネイル → images/{id}-thumb.jpg   写真 → images/{id}-01.jpg
//   ph          : 仮サムネイルの色（1〜3）。image を入れたら無視されます
//
// ----------------------------------------------------------
// 【テンプレート】work-01 をコピーして作ります。必要な項目だけ残してください。
//
//  ● 必ず要るもの : id / title / category / period / client / image / ph
//  ● あとは全部「任意」。書かなければ、そのセクションは表示されません。
//
//  ● 完成カット（gallery）   写真は何枚でもOK（縦横混在もOK）。並べ方は galleryLayout で選ぶ
//        galleryLayout を省略 / "masonry" : 2列。縦横そのままの比率で並ぶ（標準・何枚でも）
//        "mosaic"  : 縦長2枚を左・横長2枚を右に積む（ちょうど4枚。並び順は 縦,縦,横,横）
//        "feature" : 1枚目を左に大きく、2・3枚目を右に小さく縦2枚、4枚目以降を下に横長
//  ● 制作過程（process）     項目数は自由（3〜5がおすすめ）。1項目のメディアは次のどれか1つ
//        image: "画像"                            … 静止画1枚
//        video: "動画.mp4", poster: "画像"        … 音なしループの動画
//        compare: { before: "画像", after: "画像" } … Before/After
//        slides: [ "画像", "画像", ... ]           … クリックでページ送り（枚数は自由。
//                                                    { src: "画像", note: "注釈" } で注釈も付けられる）
//  ● 技術・空間面（tech）     diagram（設置図）だけでも、photos / photosCaption を足してもOK
//  ● 工夫と学び（learnings）  文章（\n で改行）
//
//  ● 項目を使わないとき : その行を消す、またはコメントにする。
//    一時的に隠したいだけなら hide: ["process", "tech", "learnings"] のように書く。
// ----------------------------------------------------------
// ==========================================================
const WORKS = [
  {
    id: "work-01",
    title: "体験型フロアマッピング\n「国宝 松本城天守 プロジェクションマッピング 2024-2025」関連展示",
    category: "Projection Mapping",
    period: "2025.12",
    client: "「国宝 松本城天守 プロジェクションマッピング 2024-2025」",
    credits: [
      ["Interactive Programming", "Daisuke Funato"],
      ["Interactive Programming", "Yuri Takasu"],
    ],
    video: "https://youtu.be/46IEQ6L6b9c",  // ← 仮。YouTubeの普通のURLに差し替え（再生ボタンのデザイン確認用）
    description: "松本城プロジェクションマッピングの会場横で展示した、インタラクティブなフロアマッピング。地面に映した鯉の泳ぐ水面を人が歩き、踏むと光と波紋が広がって、鯉が泳ぎ去る。",

    // ----- 以下は「詳細レイアウト」用の項目（この作品だけ使用。書かなければ表示されません） -----
    // 完成カット：3〜4枚。1枚目=左に大きく / 2・3枚目=右に小さく縦2枚 / 4枚目=その下に横長。説明は付けません
    // galleryLayout: "mosaic" = 縦長2枚（1・2枚目）を左、横長2枚（3・4枚目）を右に縦積み。縦横が混ざっているとき用
    galleryLayout: "mosaic",
    gallery: [
      "images/work-01-shots-2.jpg",   // 縦長
      "images/work-01-shots-3.jpg",   // 縦長
      "images/work-01-shots-1.jpg",   // 横長
      "images/work-01-shots-4.jpg",   // 横長
    ],

    // 制作過程：3〜5項目。画像と「番号付き小見出し＋1〜2行の説明」を左右に並べ、項目ごとに左右が入れ替わります
    //   title   : 小見出し（番号 01, 02… は自動で付きます）
    //   text    : 説明（1〜2行。\n で改行）。各項目の文字数はなるべく揃えると見た目がきれいです
    //   image   : 画像のパス
    //   compare : Before/After を見せる項目だけ { before: "画像", after: "画像" } を書く（image の代わり）
    process: [
      { title: "人の位置を取り出し、鯉の反応を確かめる", text: "Kinectの入力から映像の生成まで、TouchDesigner内で完結。\n人のシルエットを取り出し、Pythonスクリプトで中心の座標を取得している。\n鯉が近づくと泳ぎ去る動きを見ながら、反応する距離を調整した。", video: "videos/work-01-process-1.mp4", poster: "images/work-01-process-1.jpg" },
      // video を書くと mp4 を音なし・ループで自動再生します（image の代わりに書く）。poster は読み込み前に見せる画像（省略可）
      { title: "水面と鯉の映像をつくる",     text: "揺れる水面の光と泳ぐ鯉を、TouchDesigner内でリアルタイムに生成。\n人が踏んだ位置から光とパーティクル、波紋が広がり、鯉が泳ぎ去る。", video: "videos/work-01-process-2.mp4", poster: "images/work-01-process-2.png" },
      // slides を書くと、クリックでページ送りするスライドカードになります（枚数は自由。画像の代わりに書く）
      { title: "現地でのパラメーター調整用UI",   text: "設営の際に調整が必要になるパラメーターをあらかじめUIで操作可能にしておいた。\n様々な状況に柔軟に対応できる汎用設計。", slides: [
        { src: "images/work-01-process-3-1.jpg", note: "投影した形の調整用(PJ二台分割まで対応)" },   // note = 画像に重ねて出す注釈（省略可）
        { src: "images/work-01-process-3-2.jpg", note: "カメラのパラメーター用" }, 
      ] },
    ],

    // 技術・空間面：設置図（機材の位置・投影範囲がわかる図）を大きく1枚 + 1行説明、その下に写真2枚 + 1行説明
    tech: {
      diagram: "images/work-01-system.svg",                                   // 設置図の画像
      diagramCaption: "",
      // 設置図の下に写真を横に並べたいときは、次の2行を書く（書かなければ表示されません）
      // photos: ["", ""],                           // 左：設営中の様子 / 右：本番の会場
      // photosCaption: "左：設営中の様子　右：本番の会場",
    },

    // 工夫と学び：2〜3行の文章（\n で改行）。左にアクセントカラーの縦線が付きます
    learnings: "インタラクティブな作品は、画面で見た動きよりも、実際に体験したときの手応えが大切になる。また現場では、設営の段階で細かい調整が欠かせない。それらを現場で実現できるように、調整用のUIを含めたシステムを設計した。体験する人と、現場で動かす人の両方を想像して仕組みをつくることの大切さを学んだ。",
    skills: ["TouchDesigner", "Kinect", "python"],
    image: "images/slide-01.jpg",
    ph: 1,
  },
  {
    id: "work-02",
    title: "密会\nclub party",
    category: "VJ",
    period: "2025.11",
    client: "主催イベント",
    credits: [
      ["Host/VJ", "yuri Takasu"],
      ["Host/PA", "haruto Ono"],
      ["Host", "shuto Kimura"],
    ],
    video: "https://youtu.be/TFOIYgORErk?list=PLjZIZmVuXysXZB9AJ3JKTG2-aMRLnZyIy",
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work02-shots-4.jpg",   // 横長
      "images/work02-shots-3.jpg",   // 縦長
      "images/work02-shots-2.jpg",   // 横長
      "images/work02-shots-1.jpg",   // 横長
      "images/work02-shots-5.jpg",
    ],
    description: "札幌市立大学有志によるパーティーを主催。学内中心。外でもやった。VJDJ。",
    learnings: "イベント運営について",
    skills: ["TouchDesigner"],
    image: "images/work02-shots-5.jpg",
    ph: 2,
  },
  {
    id: "work-03",
    title: "mazelike\n札幌国際芸術祭クロージングイベントVJ",
    category: "VJ",
    period: "2024.02",
    client: "O.O.T.C. presents Underground Park in 札幌Sound Lab mole (SIAF2024)",
    credits: [
      ["Concept / Logo Design/ 2D Animation", "RJII"],
      ["Concept / 3D Scenography / Development", "simiz"],
      ["3D Scenography / Development", "yuri Takasu"],
    ],
    video: "images/work03-main.jpg",   // 静止画（動画の代わりに画像を表示）
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work03-shots-1.jpg",
      "images/work03-shots-2.jpg",
      "images/work03-shots-3.jpg",
      "images/work03-shots-4.jpg",
      "images/work03-shots-5.jpg",
      "images/work03-shots-6.jpg",
      "images/work03-shots-7.jpg",
    ],
    description: "3Dアクションゲームをベースとし、空間内のキャラクターをゲームコントローラーで操作するVJ表現作品。空間内には音に反応し大きさを変えるオブジェクトや、キャラクターが登ることができるオブジェクトなど様々な目を引くオブジェクトが存在し、その中をキャラクター操作を通して鑑賞、画面上に出力する。アクションゲームという身近なメディアを介することでゲームの展開や文脈を想起し、友達のゲームプレイを見ているときのように「見入る」ことに繋がる。従来のVJ表現のように音楽との同時性・対話性を保ちながら「見入る」映像を出力することで、音楽と映像の関係性を再考させる。",
    skills: ["Unity", "C#"],
    image: "images/work03-main.jpg",
    ph: 3,
  },
  {
    id: "work-04",
    title: "微環\n自主展示「北の美大展（仮）」本郷新記念札幌彫刻美術館",
    category: "Installation",
    period: "2025.02",
    client: "北の美大展（仮）",
    credits: [
      ["Concept / Development", "yuri TAKASU"],
      ["Concept / Sound", "Rico Iwai"],
      ["flyer", "minato Hayasi"],
    ],
    video: "images/work04-main.JPG",   // 静止画（動画の代わりに画像を表示）
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work04-shots-7.JPG",
      "images/work04-shots-4.JPG",
      "images/work04-shots-5.JPG",
      "images/work04-shots-6.JPG",
      "images/work04-shots-2.JPG",
    ],
    description: "自然環境の中で形を変化させ続ける水の循環を有機的なものとして捉え、各状態の水を録音。それを独自のシステムにより、人の可聴領域外に変換し、パラメトリック・スピーカーから線的な水音を生成。水槽にサウンドビームを送ることで、水面に帰す。それは、線的な音響として空間に存在し、空間に水音の微弱な跳ね返りと循環を生む。サウンドビームによって発生した瀬を、スクリーンに投影することで、人の耳には聞こえない音の存在を漂わせる。",
    skills: ["Arduino"],
    image: "images/work04-main.JPG",
    ph: 1,
  },
  {
    id: "work-05",
    title: "passing(study)\n自主展示「アートとデザイン展」",
    category: "Installation",
    period: "2024.04",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "https://youtu.be/WEvTFN6MC-g",
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work05-shots-1.jpg",
      "images/work05-shots-2.jpg",
      "images/work05-shots-3.jpg",
      "images/work05-shots-4.jpg",
    ],
    description: "ここに作品の説明を書きます。",
    skills: ["arduino"],
    image: "images/work05-shots-1.jpg",   // 一覧のサムネイル
    ph: 2,
  },
  {
    id: "work-06",
    title: "作品タイトル 06",
    category: "Installation",
    period: "2024.07",
    client: "Personal Work",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 3,
  },
  {
    id: "work-07",
    title: "作品タイトル 07",
    category: "Projection Mapping",
    period: "2024.06",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 1,
  },
  {
    id: "work-08",
    title: "作品タイトル 08",
    category: "VJ",
    period: "2024.05",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 2,
  },
  {
    id: "work-09",
    title: "作品タイトル 09",
    category: "Installation",
    period: "2023.04",
    client: "Personal Work",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 3,
  },
  {
    id: "work-10",
    title: "作品タイトル 10",
    category: "Projection Mapping",
    period: "2023.03",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 1,
  },
];

// ---------- ここから下は表示用の共通処理（触らなくてOK） ----------
// カード1枚分のHTMLを作る（クリックで詳細ページへ）
function cardHTML(w) {
  const thumb = w.image
    ? `<img src="${w.image}" alt="${w.title}">`
    : `<div class="ph-${w.ph}"></div>`;
  return `
    <a href="work.html?id=${w.id}" class="work-card">
      <div class="work-thumb">${thumb}</div>
      <p class="work-title">${w.title.replace(/\n/g, "<br>")}</p>
      <p class="work-meta">${w.category} / ${w.period}</p>
    </a>`;
}
