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

  // ▼ 自己紹介（nameJa はトップと About me の両方に表示される）
  nameJa: "高須悠理",
  // トップページ用の短い紹介文
  profileShort: `愛知県西尾市出身。
主にクリエイティブコーディングを用いて新たな空間体験を研究しています。`,
  // About me 用の全文
  // プロフィール文：` ` の中で改行すると、画面でも改行されます
  profile: `愛知県西尾市出身。
主にクリエイティブコーディングを用いて新たな空間体験を研究しています。
大学ではメディアを軸に、分野を横断してデザインを学びました。
「表現したいこと」を優先し、そのために新しい技術を取り入れる姿勢を大切にしています。
エンターテインメント性のあるインタラクティブコンテンツからファインアート的なインスタレーション・文学まで、興味のあることには幅広く挑戦してきました。
表現にはコミュニティおよび場の存在も重要と考えており、クラブパーティー「密会」の主催やグループ展覧会の運営など、同志とのつながりを大事にしてきました。
`,
};

// ---------- ここから下は反映の処理（触らなくてOK） ----------

// ヘッダーなどの名前
document.querySelectorAll('[data-site="name"]').forEach((el) => (el.textContent = SITE.name));

// フッターのコピーライト
document.querySelectorAll('[data-site="copyright"]').forEach((el) => (el.textContent = `© ${SITE.year} ${SITE.name}`));

// 自己紹介の名前と文章（改行は <br> にする）
document.querySelectorAll('[data-site="nameJa"]').forEach((el) => (el.textContent = SITE.nameJa));
document.querySelectorAll('[data-site="profile"]').forEach((el) => (el.innerHTML = SITE.profile.split("\n").join("<br>")));

document.querySelectorAll('[data-site="profileShort"]').forEach((el) => (el.innerHTML = SITE.profileShort.split("\n").join("<br>")));

// ブラウザのタブの文字：<title data-page="Works"> → 「Works | 名前」
// （data-page がないトップページは「名前 | 説明」）
const titleEl = document.querySelector("title");
if (titleEl) {
  const page = titleEl.dataset.page;
  document.title = page ? `${page} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
}
