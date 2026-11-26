// ==========================================================
// サイト全体の共通設定
//
// ★名前などを変えるときは、ここだけ書き換えればOKです。
//   → ヘッダーの名前、フッターのコピーライト、各ページのタブの文字に反映されます。
// ==========================================================
const SITE = {
  name: "Yuri TAKASU",                          // 名前（ヘッダー・フッター・タブの文字に使われる）
  tagline: "VJ / Projection Mapping / Art",   // トップページのタブの文字に使う説明
  year: "2026",                               // フッターの © の年

  // ▼ 自己紹介（トップページと About me の両方に表示される）
  nameJa: "高須悠理",
  // プロフィール文：` ` の中で改行すると、画面でも改行されます
  profile: `愛知県西尾市出身。
空間で体験する映像と、それを支える仕組みをつくっています。
大学ではメディアを軸に、分野を横断してデザインを学びました。TouchDesignerを始めとしたクリエイティブコーディングでの映像制作に加え、Kinectやセンサー、Arduinoを使って、人の動きや音に反応する作品を手がけてきました。プロジェクションマッピングの関連展示では、アルバイトとしてインタラクティブなフロアマッピングの開発を中心となって担当し、設営の現場で調整できるUIまで設計しました。制作と並行して、VJイベントを何度も主催し、機材の手配から設営、本番のオペレーションまで行っています。自主企画展の開催や、クラウドファンディングによる展示の実施など、作品を届けるところまで自分で動かすことを大切にしています。
映像をつくることと、それを現場で確実に動かすこと。その両方に関わる仕事を目指しています。`,
};

// ---------- ここから下は反映の処理（触らなくてOK） ----------

// ヘッダーなどの名前
document.querySelectorAll('[data-site="name"]').forEach((el) => (el.textContent = SITE.name));

// フッターのコピーライト
document.querySelectorAll('[data-site="copyright"]').forEach((el) => (el.textContent = `© ${SITE.year} ${SITE.name}`));

// 自己紹介の名前と文章（改行は <br> にする）
document.querySelectorAll('[data-site="nameJa"]').forEach((el) => (el.textContent = SITE.nameJa));
document.querySelectorAll('[data-site="profile"]').forEach((el) => (el.innerHTML = SITE.profile.split("\n").join("<br>")));

// ブラウザのタブの文字：<title data-page="Works"> → 「Works | 名前」
// （data-page がないトップページは「名前 | 説明」）
const titleEl = document.querySelector("title");
if (titleEl) {
  const page = titleEl.dataset.page;
  document.title = page ? `${page} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
}
