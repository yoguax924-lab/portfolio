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
};

// ---------- ここから下は反映の処理（触らなくてOK） ----------

// ヘッダーなどの名前
document.querySelectorAll('[data-site="name"]').forEach((el) => (el.textContent = SITE.name));

// フッターのコピーライト
document.querySelectorAll('[data-site="copyright"]').forEach((el) => (el.textContent = `© ${SITE.year} ${SITE.name}`));

// ブラウザのタブの文字：<title data-page="Works"> → 「Works | 名前」
// （data-page がないトップページは「名前 | 説明」）
const titleEl = document.querySelector("title");
if (titleEl) {
  const page = titleEl.dataset.page;
  document.title = page ? `${page} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
}
