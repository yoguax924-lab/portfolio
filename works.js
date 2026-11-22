// ==========================================================
// Works 一覧ページの表示処理
// 作品データは works-data.js にあります（ここは基本的に触らなくてOK）
// ==========================================================

// 出てくる順にカテゴリを重複なしで取り出す（日本語名でもOK）
const categories = [...new Set(WORKS.map((w) => w.category))];

// ジャンプ先のID（cat-0, cat-1 ... と番号で付ける）
const catId = (i) => "cat-" + i;

// カテゴリへのリンク（上部ナビ）
document.getElementById("category-nav").innerHTML =
  `<span class="skill-label">Type</span>` +   // 「Skill」と同じ見た目のラベル
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

// ==========================================================
// スキルでの絞り込み
// 上のスキルをクリックすると、そのスキルを使った作品だけを表示します。
// （カテゴリ別セクションは非表示。「All」ボタン、または同じスキルをもう一度押すと解除）
// URLに ?skill=名前 を付けても絞り込めます（詳細ページのスキルタグからのリンク用）
// ==========================================================
const skills = [...new Set(WORKS.flatMap((w) => w.skills))];

const skillNav = document.getElementById("skill-nav");
skillNav.innerHTML =
  `<span class="skill-label">Skill</span>` +
  `<button type="button" data-skill="">All</button>` + // 絞り込みを解除するボタン
  skills.map((s) => `<button type="button" data-skill="${s}">${s}</button>`).join("");

function applySkill(skill) {
  const list = skill ? WORKS.filter((w) => w.skills.includes(skill)) : WORKS;
  document.getElementById("works-all").innerHTML = list.map(cardHTML).join("");
  document.getElementById("all-title").textContent = skill ? `Skill — ${skill}` : "All";
  // 絞り込み中はカテゴリ別セクションを隠す（Type のリンクは表示したまま）
  document.getElementById("works-categories").classList.toggle("is-hidden", !!skill);
  // 選択中のスキルを目立たせる
  skillNav.querySelectorAll("button").forEach((b) =>
    b.classList.toggle("active", b.dataset.skill === (skill || ""))
  );
  // URLも更新（リロードしても同じ絞り込みが残る）
  history.replaceState(null, "", skill ? `?skill=${encodeURIComponent(skill)}` : location.pathname);
}

let currentSkill = null;
skillNav.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const s = b.dataset.skill || null;           // All は空 → null（解除）
  currentSkill = currentSkill === s ? null : s;  // 同じものを押したら解除
  applySkill(currentSkill);
});

// 絞り込み中に Type のリンクを押したら、絞り込みを解除してからそのセクションへ移動する
document.getElementById("category-nav").addEventListener("click", (e) => {
  if (e.target.closest("a") && currentSkill) {
    currentSkill = null;
    applySkill(null);   // カテゴリ別セクションを再表示（このあとリンクの移動が行われる）
  }
});

// URLに ?skill= があれば最初から絞り込む
const initial = new URLSearchParams(location.search).get("skill");
if (initial && skills.includes(initial)) { currentSkill = initial; applySkill(initial); }
