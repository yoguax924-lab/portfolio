// ==========================================================
// Works 一覧ページの表示処理
// 作品データは works-data.js にあります（ここは基本的に触らなくてOK）
// ==========================================================

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

// 出てくる順にカテゴリを重複なしで取り出す（日本語名でもOK）
const categories = [...new Set(WORKS.map((w) => w.category))];

// ジャンプ先のID（cat-0, cat-1 ... と番号で付ける）
const catId = (i) => "cat-" + i;

// カテゴリへのリンク（上部ナビ）
document.getElementById("category-nav").innerHTML =
  `<a href="#all">All</a>` +
  categories.map((c, i) => `<a href="#${catId(i)}">${c}</a>`).join("");

// 全作品の一覧
document.getElementById("works-all").innerHTML = WORKS.map(cardHTML).join("");

// カテゴリ別セクション
document.getElementById("works-categories").innerHTML = categories
  .map((c, i) => {
    const items = WORKS.filter((w) => w.category === c);
    return `
      <section class="works-section" id="${catId(i)}">
        <h2 class="section-title">${c}</h2>
        <div class="works-grid">${items.map(cardHTML).join("")}</div>
      </section>`;
  })
  .join("");
