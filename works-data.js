// ==========================================================
// トップページのスライド（ヒーロー）
//   work    : 載せる作品のID（WORKS の id と同じにする。例 "work-01"）。クリックでその作品へ飛ぶ
// 画像と文字は、作品データから自動で入ります（一覧のサムネイル image と、タイトルの1行目）。
//   → 作品側を書き換えれば、スライドにも反映されます。
// 次の項目は、書いたときだけ作品データより優先されます（書かなければ自動）。
//   caption : 左下に出す文字
//   image   : 画像のパス
// スライドを増やすときは { work: "work-05" }, を足す。切替間隔は script.js の INTERVAL。
// ==========================================================
const SLIDES = [
  { work: "work-01" },
  { work: "work-02" },
  { work: "work-03" },
  { work: "work-04" },
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
//        "stack"   : 全部を1列に縦並び（横長の写真を大きく見せたいとき）
//        "row"     : 全部を1列に横並び（2〜4枚向き。galleryWidth / galleryColGap で幅と間隔を調整）
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
      { title: "水面と鯉の映像をつくる",     text: "揺れる水面の光と泳ぐ鯉を、TouchDesigner内でリアルタイムに生成。\n人が踏んだ位置から光とパーティクル、波紋が広がり、鯉が泳ぎ去る。", image: "images/work-01-process-2.png" },
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
    skills: ["TouchDesigner", "Python"],
    image: "images/slide-01.jpg",
    ph: 1,
  },
  {
    id: "work-02",
    title: "密会\nclub party",
    category: "VJ",
    period: "2024.4~",
    client: "主催イベント",
    credits: [
      ["Host / VJ / Flyer", "Yuri TAKASU"],
      ["Host / PA / Flyer", "Haruto Ono"],
      ["Host", "Shuto Kimura"],
      ["Flyer", "Minato Hayashi"],
      ["Flyer", "Ako"],
      ["Flyer", "Asa"],
    ],
    video: "images/work02-shots-5.jpg",   // 静止画（サムネイルと同じ）
    // 元のYouTube（戻すときは video に入れる）：https://youtu.be/TFOIYgORErk?list=PLjZIZmVuXysXZB9AJ3JKTG2-aMRLnZyIy
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work02-shots-4.png",
      "images/work02-shots-3.jpg",   // 縦長
      "images/work02-shots-2.jpg",   // 横長
      "images/work02-shots-1.jpg",   // 横長
      "images/work02-shots-5.jpg",
    ],
    // 完成カットの下に、正方形のグリッドで並べる（PCは4列）
    galleryGrid: [
      "images/p1.jpg", "images/p2.jpg", "images/p3.jpg", "images/p4.jpg",
      "images/p5.jpg", "images/p6.jpg", "images/p7.jpg", "images/p8.jpg",
    ],
    // 上に動画、下に写真2枚を横並び。上から順に表示。images は省略・空でもOK
    // 各まとまりの小見出し（書かなければ出ません）
    mediaPairsTitle: "VJ Works",   // 動画の組
    galleryTitle: "Event",          // 会場の写真
    galleryGridTitle: "Flyers",     // グリッド
    // title = 組の名前 / text = 動画の説明（空なら出ません）
    mediaPairs: [
      { title: "波紋コントロール", text: "", video: "videos/work02-gl.mp4", images: ["images/work02-gl-1.jpg", "images/work02-gl-2.jpg"] },
      { title: "顔モデルコントロール", text: "", video: "videos/work02-face.mp4", images: ["images/work02-face-1.png", "images/work02-face-2.png"] },
    ],
    description: "札幌市立大学軽音サークルから派生したクラブパーティー系イベント。DJ・VJを中心に有志の学生がパフォーマンスを行い、お互いのクリエイティビティを刺激する交流の場。\n作ったものを自由に発表する場を作りたいと思い友人と立ち上げ、学年やカテゴリーの垣根なしに周囲を巻き込んでいった。卒業後も引き継がれ活発に活動している。\n継続的に開催され、2026年11月現在では第8回。\n主に大学キャンパス内シアタールームで開催。外部での活動実績は「密会 ACT5.0 at Event Space EDiT」「北の美大展（仮）」。",
    learnings: "人を集める、場所の確保、広報、設営など本来の目的である作品発表以外のことがイベントには必要であるということとその大変さを身をもって学んだ。同時に色々な人と協力して一つの舞台を作り上げることの感動も味わった。私が卒業した今も在学生が引き継いで楽しんでくれていることも嬉しい。",
    skills: ["TouchDesigner", "Blender", "Python"],
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
      "images/work04-shots-7.jpg",
      "images/work04-shots-4.JPG",
      "images/work04-shots-5.JPG",
      "images/work04-shots-6.JPG",
      "images/work04-shots-2.JPG",
    ],
    description: "自然環境の中で形を変化させ続ける水の循環を有機的なものとして捉え、各状態の水を録音。それを独自のシステムにより、人の可聴領域外に変換し、パラメトリック・スピーカーから線的な水音を生成。水槽にサウンドビームを送ることで、水面に帰す。それは、線的な音響として空間に存在し、空間に水音の微弱な跳ね返りと循環を生む。サウンドビームによって発生した瀬を、スクリーンに投影することで、人の耳には聞こえない音の存在を漂わせる。\n北の美大展（仮）とは、美大や現代美術館のない北海道における文化インフラとしての美術教育やアーティスト養成について再考し、若手アーティスト・クリエイターの発掘の場となる、大学を横断した有志学生グループ展。クラウドファンディングを行い、目標金額を超える338,000円の支援を得た。",
    skills: ["Arduino"],
    image: "images/work04-main.JPG",
    ph: 1,
  },
  {
    id: "work-05",
    title: "passing(study)\n自主展示「アートとデザイン展」",
    category: "Installation",
    period: "2024.04",
    client: "アートとデザイン展",
    credits: [
      ["Concept / Development", "Yuri Takasu"],
    ],
    video: "https://youtu.be/WEvTFN6MC-g",
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work05-shots-1.jpg",
      "images/work05-shots-2.jpg",
      "images/work05-shots-3.jpg",
      "images/work05-shots-4.jpg",
    ],
    description: "LEDパネルと距離センサーを使ったインタラクティブコンテンツ。「HELLO」と語りかけてくるが、近づくにつれて態度が変わっていき、最終的に「NO」と言う。文字とビープ音のみの表示でも機械にパーソナルスペースがあるかのように思えてくる。",
    skills: ["Arduino"],
    image: "images/work05-shots-1.jpg",   // 一覧のサムネイル
    ph: 2,
  },
  {
    id: "work-06",
    title: "instagram ARフィルター\n「アートとデザイン展」広報",
    category: "Graphics",
    period: "2024.07",
    client: "アートとデザイン展",
    credits: [
      ["3D Animation / Development", "Yuri TAKASU"],
      ["Flyer", "Minato Hayashi"],
    ],
    video: "videos/work-06-main.mp4",
    // 完成カット：galleryLayout: "row" = 全部を1列に横並び
    galleryLayout: "row",
    galleryWidth: "100%",   // 写真全体の幅（省略 = 100%）。縦長の写真が大きすぎるときに小さくできる。中央に寄ります
    galleryColGap: "32px", // 左右（中央）の写真の間隔（省略 = 16px）
    // galleryGap: "40px", // 上下の写真の間隔（省略 = 16px）
    gallery: [
      "images/work06-shots-3.jpg",
      "images/work06-shots-1.jpg",
      "images/work06-shots-2.jpg",
    ],
    description: "自主展示「アートとデザイン展」のinstagram広報用に作成したARフィルター。フライヤーを撮影すると文字が浮かび上がり、中心へ吸い込まれていくアニメーションが再生される。\nBlenderでFBXデータを作成し、Meta Spark Studioで実装。",
    skills: ["Blender"],
    image: "images/work06-main.jpg",
    ph: 3,
  },
  {
    id: "work-07",
    title: "朝食を食べよう！\n札幌市本気めしプロジェクト",
    category: "Video",
    period: "2022.12",
    client: "札幌市南区保健福祉部健康・子ども課",
    credits: [
      ["Production", "札幌市南区保健福祉部健康・子ども課"],
      ["Production", "札幌市立大学"],
      ["Edit / Illust / Cast", "Yuri TAKASU"],
      ["Cast", "Satomi Hara"],
    ],
    video: "https://www.youtube.com/watch?v=0Jje3sFNInw&t=2s",
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work07-shots-1.png",
      "images/work07-shots-2.png",
      "images/work07-shots-3.png",
      "images/work07-main.png",      // main を4番目に入れる
      "images/work07-shots-4.png",
      "images/work07-shots-5.png",
    ],
    // 工夫と学び：2〜3行の文章（\n で改行）
    learnings: "色の見え方の違いに関わらず内容が伝わるよう、カラーユニバーサルデザインの考え方に沿って配色した。誰が見ても同じように伝わることを意識し、見る人の立場に立って編集する難しさを学んだ。",
    description: "札幌市南区健康・子ども課と札幌市立大学デザイン学部学生の協働で制作した食育動画「朝ごはんを食べよう！」。学生ならではの視点で、同世代の若者へ向けて朝食の大切さをわかりやすく説明する「解説編」、料理が苦手でも、時間がない中でも簡単に作ることができる朝食レシピを紹介した「料理編」の2本。",
    skills: ["Premiere Pro", "Illustrator"],
    image: "images/work07-main.png",   // 一覧のサムネイル
    ph: 1,
  },
  {
    id: "work-08",
    title: "まるでそれは爆弾のように",
    category: "Video",
    period: "2022.10",
    client: "自主制作",
    credits: [
      ["Edit / Cast", "Yuri TAKASU"],
      ["Cast", "Teppei Kikuchi"],
      ["Cast", "Sakura Narimatsu"],
      ["Cast", "Satomi Hara"],
    ],
    video: "https://youtu.be/w0vCLYe57Ds",
    // 完成カット：galleryLayout: "stack" = 全部を1列に縦並び
    galleryLayout: "stack",
    gallery: [
      "images/work08-shots-1.png",
      "images/work08-shots-2.png",
      "images/work08-shots-3.png",
      "images/work08-shots-4.png",
    ],
    description: "演劇部にて撮影した架空の映画予告。爆発の合成にこだわった。",
    skills: ["Premiere Pro", "After Effects"],
    image: "images/work08-shots-1.png",   // 一覧のサムネイル
    ph: 2,
  },
  {
    id: "work-09",
    title: "き（こ）え る 声\nART INTERFACE KOTONI 2026",
    category: "Installation",
    period: "2026.01",
    client: "ART INTERFACE KOTONI 2026",
    credits: [
      ["Organizer", "特定非営利活動法人 コンカリーニョ"],
      ["Co-organizer", "公益財団法人 北海道文化財団"],
      ["Supported by", "札幌市・札幌市教育委員会・北海道"],
      ["Art Director", "Tsubasa Sato"],
      ["Flyer / Poster Design", "saito nono・Michael"],
      ["Photo", "Haruto Tsuji"],
    ],
    video: "images/work09-main.jpeg",   // 静止画（動画の代わりに画像を表示）
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work09-shots-1.jpg",
      "images/work09-shots-2.jpg",
    ],
    description: "ぼやけた文字で詩が転写されている布の裏からぶつ切りの声が聞こえる作品。\nあなたにきこえる私の声は私のほんの一部。なにもきこえなくてもいいし、はっきりきこえていてもいい。どうでもいいけど、私のほんの一部。大切な一部。\n布：全長5m　音声：パラメトリックスピーカー",
    image: "images/work09-main.jpeg",   // 一覧のサムネイル
    imagePos: "center bottom",          // サムネイルで見せる位置（下の方）。省略 = 中央
    ph: 3,
  },
  {
    id: "work-10",
    title: "square pop",
    category: "Graphics",
    period: "2023.06",
    client: "study",
    credits: [
      ["Develop / Music", "Yuri TAKASU"],
    ],
    video: "https://youtube.com/shorts/KMu0RClWXpk?feature=share",
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work10-shots-1.jpg",
      "images/work10-shots-2.jpg",
      "images/work10-shots-3.jpg",
    ],
    description: "Processingを使用した大学課題作品。音に合わせて四角形がポップするプログラム。",
    skills: ["Processing"],
    image: "images/work10-shots-1.jpg",   // 一覧のサムネイル
    ph: 1,
  },
  {
    id: "work-11",
    title: "プロジェクションマッピング練習作",
    category: "Projection Mapping",
    period: "2026.01",
    client: "study",
    credits: [
      ["Development", "Yuri TAKASU"],
    ],
    video: "videos/work11-main.mp4",
    poster: "images/work11-main.jpg",   // 動画の再生前に出す画像
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work11-shots-1.jpg",
      "images/work11-shots-2.jpg",
    ],
    description: "Touchdesignerで作成した練習作。一つのプロジェクターで複数のオブジェクトに映像を投影。スピーカーのコーンを光らせたり立てかけた木材を電光掲示板のように見せたりとプロジェクションマッピング特有の効果を目指した",
    skills: ["TouchDesigner"],
    image: "images/work11-main.jpg",   // 一覧のサムネイル
    ph: 2,
  },
  {
    id: "work-12",
    title: "wave clock",
    category: "Graphics",
    period: "2026.01",
    client: "自主制作",
    credits: [
      ["Development", "Yuri TAKASU"],
    ],
    video: "videos/work-12-main.mp4",
    // 完成カット：galleryLayout: "stack" = 全部を1列に縦並び
    galleryLayout: "stack",
    gallery: [
      "images/work-12-shots-1.png",
      "images/work-12-shots-2.png",
      "images/work-12-shots-3.png",
      "images/work-12-shots-4.png",
    ],
    description: "ジェネラティブアート的なグラフィックの習作。線を徐々に回転させたり伸び縮みさせて奥行きのある画を作る。変化はランダムに行われるので実行するごとに結果が変わる。破綻せずバリエーションの出せる変数の設定を学んだ。",
    skills: ["Processing"],
    image: "images/work-12-shots-5.png",   // 一覧のサムネイル
    imageZoom: 1.2,                         // サムネイルを中央基準で拡大（1.2倍）。省略 = 等倍
    ph: 3,
  },
  {
    id: "work-13",
    title: "北大短歌第十二号　表紙デザイン\n北海道大学短歌会機関紙",
    category: "Graphics",
    period: "2025.06",
    client: "北海道大学短歌会",
    credits: [
      ["Publisher", "北海道大学短歌会"],
      ["Printing", "ちょ古っ都製本工房"],
      ["Editor", "Miyu Osaki"],
      ["Cover Design", "Yuri TAKASU"],
    ],
    video: "images/work-13-main.jpg",   // 静止画（動画の代わりに画像を表示）
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work-13-shots-1.jpg",
      "images/work-13-shots-2.png",
    ],
    description: "北海道大学短歌会の発行する機関誌『北大短歌』十二号の表紙デザイン。本号のテーマである「記号」にちなみ、直線と斜線だけで組み立てた幾何学的なレタリングを採用。文字を部品に分解して重ね、読める・読めないの境目にある模様のような画面をつくった。",
    skills: ["Illustrator"],
    image: "images/work-13-main.jpg",   // 一覧のサムネイル
    ph: 1,
  },
  {
    id: "work-14",
    title: "dot camera",
    category: "Graphics",
    period: "2023.07",
    client: "study",
    credits: [
      ["Development", "Yuri TAKASU"],
    ],
    video: "videos/work-14-main.mp4",
    // 完成カット：galleryLayout を書かない = 2列で縦横そのままの比率に並ぶ（何枚でもOK）
    gallery: [
      "images/work-14-shots-1.jpg",
      "images/work-14-shots-2.jpg",
    ],
    description: "カメラ映像をドットに置き換えるプログラム。",
    skills: ["Processing"],
    image: "images/work-14-shots-1.jpg",   // 一覧のサムネイル
    ph: 2,
  },
];

// ---------- スライドに、作品の画像とタイトルを入れる（触らなくてOK） ----------
SLIDES.forEach((s) => {
  const w = WORKS.find((x) => x.id === s.work);
  if (!w) return;
  if (!s.image) s.image = w.image || "";
  // 文字は「カテゴリ — タイトル」。スマホでは、カテゴリとタイトルが上下に分かれて並ぶ（style.css の .cap-*）
  if (!s.caption) s.caption = `<span class="cap-cat">${w.category}</span><span class="cap-sep"> — </span><span class="cap-title">${w.title.replace(/\n/g, " ")}</span>`;
  if (!s.bg) s.bg = "linear-gradient(135deg, #1a1a2e, #0f3460)";
});

// ---------- ここから下は表示用の共通処理（触らなくてOK） ----------
// カード1枚分のHTMLを作る（クリックで詳細ページへ）
function cardHTML(w) {
  // imagePos：サムネイルで見せる位置（例 "center bottom" = 下の方）。省略すると中央
  // imageZoom：サムネイルを中央を基準に拡大する倍率（例 1.2 = 1.2倍）。省略すると等倍
  const thumb = w.image
    ? `<img src="${w.image}" alt="${w.title.replace(/\n/g, " ")}"${w.imagePos || w.imageZoom ? ` style="${w.imagePos ? `object-position:${w.imagePos};` : ""}${w.imageZoom ? `--z:${w.imageZoom}` : ""}"` : ""}>`
    : `<div class="ph-${w.ph}"></div>`;
  return `
    <a href="work.html?id=${w.id}" class="work-card">
      <div class="work-thumb">${thumb}</div>
      <p class="work-title">${w.title.replace(/\n/g, "<br>")}</p>
      <p class="work-meta">${w.category} / ${w.period}</p>
    </a>`;
}
