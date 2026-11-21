// ==========================================================
// 作品詳細ページの表示処理
// URLの ?id=work-01 の部分から作品を探して、work.html に流し込みます。
// 内容の編集は works-data.js で行ってください（ここは基本的に触らなくてOK）
// ==========================================================

const params = new URLSearchParams(location.search);
const index = WORKS.findIndex((w) => w.id === params.get("id"));
const root = document.getElementById("work-detail");

if (index === -1) {
  // IDが見つからないとき
  root.innerHTML = `<p>作品が見つかりませんでした。</p>
    <a href="works.html" class="more-link">← Works</a>`;
} else {
  const w = WORKS[index];
  document.title = `${w.title} | YOUR NAME`; // ← サイト名はここでも変更可

  // 映像（URLがなければ準備中の枠）
  const video = w.video
    ? `<iframe src="${w.video}" title="${w.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
    : `<div class="video-empty">Video — coming soon</div>`;

  // 写真（パスが空なら仮の枠）
  const photos = w.photos
    .map((p, i) =>
      p
        ? `<img src="${p}" alt="${w.title} ${i + 1}">`
        : `<div class="ph-${w.ph}"></div>`
    )
    .join("");

  // 説明文（\n で段落を分ける）
  const desc = w.description
    .split("\n")
    .map((t) => `<p>${t}</p>`)
    .join("");

  // クレジット
  const credits = w.credits
    .map(([role, name]) => `<li>${name}<span>${role}</span></li>`)
    .join("");

  // 前後の作品へのリンク
  const prev = WORKS[index - 1];
  const next = WORKS[index + 1];

  root.innerHTML = `
    <p class="work-meta">${w.category}</p>
    <h1 class="page-title detail-title">${w.title}</h1>

    <div class="detail-video">${video}</div>

    <dl class="detail-info">
      <div><dt>Period</dt><dd>${w.period}</dd></div>
      <div><dt>Client</dt><dd>${w.client}</dd></div>
    </dl>

    <div class="about-block">
      <h2 class="section-title">Description</h2>
      <div class="detail-desc">${desc}</div>
    </div>

    <div class="about-block">
      <h2 class="section-title">Photos</h2>
      <div class="detail-photos">${photos}</div>
    </div>

    <div class="about-block">
      <h2 class="section-title">Skills</h2>
      <ul class="tag-list">${w.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
    </div>

    <div class="about-block">
      <h2 class="section-title">Credits</h2>
      <ul class="skill-list">${credits}</ul>
    </div>

    <nav class="detail-nav">
      ${prev ? `<a href="work.html?id=${prev.id}">← ${prev.title}</a>` : `<span></span>`}
      <a href="works.html">All works</a>
      ${next ? `<a href="work.html?id=${next.id}">${next.title} →</a>` : `<span></span>`}
    </nav>`;
}
