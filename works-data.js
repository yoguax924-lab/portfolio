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
//
//   id          : 作品ごとの固有ID（半角英数字。重複させない）
//                 詳細ページのURLになります → work.html?id=work-01
//   title       : 作品名
//   category    : カテゴリ名（同じ名前の作品が同じカテゴリにまとまります）
//   period      : 制作時期（例 "2025.03"）
//   client      : クライアント（なければ "Personal Work" など）
//   credits     : クレジット。[ ["役割", "名前"], ... ] の形で並べる
//   video       : 映像の埋め込みURL。なければ ""（「準備中」の枠が出ます）
//                 YouTube → ブラウザのアドレスバーのURLをそのまま貼ればOK
//                           例 "https://www.youtube.com/watch?v=動画ID" / "https://youtu.be/動画ID"
//                 Vimeo   → "https://player.vimeo.com/video/動画ID"
//   poster      : （任意）動画を再生する前に見せる画像のパス。
//                 省略すると、YouTubeの自動サムネイルが使われます
//                 ※ 動画は最初は再生ボタン付きの画像で、クリックすると読み込まれます
//   photos      : 写真のパス一覧（例 "images/work01-1.jpg"）。
//                 "" のままだと仮の枠が表示されます。枚数は自由です
//   description : 作品の説明。改行したい所に \n を入れると段落が分かれます
//   skills      : 使用スキル・ツールの一覧
//   image       : 一覧に出すサムネイル画像のパス。仮のうちは ""
//                 ※ ファイル名の付け方は images/README.txt の命名規則を参照
//                   サムネイル → images/{id}-thumb.jpg   写真 → images/{id}-01.jpg
//   ph          : 仮サムネイルの色（1〜3）。image を入れたら無視されます
// ==========================================================
const WORKS = [
  {
    id: "work-01",
    title: "作品タイトル 01",
    category: "Projection Mapping",
    period: "2025.12",
    client: "クライアント名",
    credits: [
      ["Interactive Programming", "Daisuke FunatoE"],
      ["Interactive Programming", "Yuri Takasu"],
    ],
    video: "https://youtu.be/46IEQ6L6b9c",  // ← 仮。YouTubeの普通のURLに差し替え（再生ボタンのデザイン確認用）
    photos: ["", "", ""],
    description: "ここに作品の説明を書きます。",

    // ----- 以下は「詳細レイアウト」用の項目（この作品だけ使用。書かなければ表示されません） -----
    // 完成カット：3〜4枚。1枚目=左に大きく / 2・3枚目=右に小さく縦2枚 / 4枚目=その下に横長。説明は付けません
    gallery: ["", "", "", ""],   // 例 "images/work-01-final-01.jpg"

    // 制作過程：3〜5項目。画像と「番号付き小見出し＋1〜2行の説明」を左右に並べ、項目ごとに左右が入れ替わります
    //   title   : 小見出し（番号 01, 02… は自動で付きます）
    //   text    : 説明（1〜2行。\n で改行）。各項目の文字数はなるべく揃えると見た目がきれいです
    //   image   : 画像のパス
    //   compare : Before/After を見せる項目だけ { before: "画像", after: "画像" } を書く（image の代わり）
    process: [
      { title: "コンセプト設計", text: "ここに1〜2行の説明を書きます。\n文字数は他の項目と揃えます。", image: "" },
      { title: "映像の制作",     text: "ここに1〜2行の説明を書きます。\n文字数は他の項目と揃えます。", compare: { before: "", after: "" } },
      // slides を書くと、クリックでページ送りするスライドカードになります（枚数は自由。画像の代わりに書く）
      { title: "現地での調整",   text: "ここに1〜2行の説明を書きます。\n文字数は他の項目と揃えます。", slides: [
        { src: "images/work-01-1.jpg", note: "1枚目の注釈をここに書きます。" },   // note = 画像に重ねて出す注釈（省略可）
        { src: "images/work-01-2.jpg", note: "2枚目の注釈をここに書きます。" },
      ] },
    ],

    // 技術・空間面：設置図（機材の位置・投影範囲がわかる図）を大きく1枚 + 1行説明、その下に写真2枚 + 1行説明
    tech: {
      diagram: "images/work-01-system.svg",                                   // 設置図の画像
      diagramCaption: "設置図の説明を1行で書きます。",
      photos: ["", ""],                              // 左：設営中の様子 / 右：本番の会場
      photosCaption: "左：設営中の様子　右：本番の会場",
    },

    // 工夫と学び：2〜3行の文章（\n で改行）。左にアクセントカラーの縦線が付きます
    learnings: "ここに工夫した点や学んだことを2〜3行で書きます。\n2行目の文章です。\n3行目の文章です。",
    skills: ["TouchDesigner", "Kinect"],
    image: "images/slide-01.jpg",
    ph: 1,
  },
  {
    id: "work-02",
    title: "作品タイトル 02",
    category: "VJ",
    period: "2025.11",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    photos: ["", "", "", ""],
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 2,
  },
  {
    id: "work-03",
    title: "作品タイトル 03",
    category: "Installation",
    period: "2025.10",
    client: "Personal Work",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    photos: ["", ""],
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 3,
  },
  {
    id: "work-04",
    title: "作品タイトル 04",
    category: "Projection Mapping",
    period: "2025.09",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    photos: ["", "", ""],
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
    ph: 1,
  },
  {
    id: "work-05",
    title: "作品タイトル 05",
    category: "VJ",
    period: "2024.08",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
    ],
    video: "",
    photos: ["", "", "", ""],
    description: "ここに作品の説明を書きます。",
    skills: ["TouchDesigner", "Resolume"],
    image: "",
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
    photos: ["", ""],
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
    photos: ["", "", ""],
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
    photos: ["", "", "", ""],
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
    photos: ["", ""],
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
    photos: ["", "", ""],
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
      <p class="work-title">${w.title}</p>
      <p class="work-meta">${w.category} / ${w.period}</p>
    </a>`;
}
