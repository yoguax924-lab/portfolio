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
//                 YouTube → "https://www.youtube.com/embed/動画ID"
//                 Vimeo   → "https://player.vimeo.com/video/動画ID"
//   photos      : 写真のパス一覧（例 "images/work01-1.jpg"）。
//                 "" のままだと仮の枠が表示されます。枚数は自由です
//   description : 作品の説明。改行したい所に \n を入れると段落が分かれます
//   skills      : 使用スキル・ツールの一覧
//   image       : 一覧に出すサムネイル画像のパス。仮のうちは ""
//   ph          : 仮サムネイルの色（1〜3）。image を入れたら無視されます
// ==========================================================
const WORKS = [
  {
    id: "work-01",
    title: "作品タイトル 01",
    category: "Projection Mapping",
    period: "2025.03",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Visual", "YOUR NAME"],
      ["Sound", "サウンド担当の名前"],
    ],
    video: "",
    photos: ["", "", ""],
    description: "ここに作品の説明を書きます。コンセプトや制作の背景など。\n改行したいときは、文中に \\n を入れると段落が分かれます。",
    skills: ["TouchDesigner", "MadMapper", "After Effects"],
    image: "",
    ph: 1,
  },
  {
    id: "work-02",
    title: "作品タイトル 02",
    category: "VJ",
    period: "2025.01",
    client: "Personal Work",
    credits: [
      ["VJ", "YOUR NAME"],
    ],
    video: "",
    photos: ["", ""],
    description: "ここに作品の説明を書きます。",
    skills: ["Resolume", "TouchDesigner"],
    image: "",
    ph: 2,
  },
  {
    id: "work-03",
    title: "作品タイトル 03",
    category: "Installation",
    period: "2024.10",
    client: "クライアント名",
    credits: [
      ["Direction", "YOUR NAME"],
      ["Technical", "テクニカル担当の名前"],
    ],
    video: "",
    photos: ["", "", "", ""],
    description: "ここに作品の説明を書きます。",
    skills: ["Blender", "TouchDesigner", "Arduino"],
    image: "",
    ph: 3,
  },
];
