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
  document.title = `${w.title} | ${SITE.name}`; // サイト名は site.js の name

  // 映像：最初は自分のデザインの再生ボタン付き画像だけを見せて、
  // クリックされたらYouTube/Vimeoの動画を読み込む（再生前にYouTubeのロゴ等を出さないため）。
  // URLがなければ準備中の枠。
  // YouTubeは普通のURL（watch?v=... や youtu.be/...）でも埋め込み用URLでもOK。
  // 動画IDを取り出して、埋め込み用URL（embed）に自動で直す
  const youtubeId = (url) => (url.match(/(?:embed\/|v=|youtu\.be\/|shorts\/)([\w-]{11})/) || [])[1];
  const ytId = w.video ? youtubeId(w.video) : null;
  const embedUrl = ytId ? `https://www.youtube.com/embed/${ytId}` : w.video;
  let video = `<div class="video-empty">Video — coming soon</div>`;
  if (w.video) {
    const id = ytId;
    // 再生前の画像：poster があればそれ、なければYouTubeの自動サムネイル、それも無理なら仮の色
    const poster = w.poster
      ? `<img src="${w.poster}" alt="">`
      : id
        ? `<img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt=""
             onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${id}/hqdefault.jpg'">`
        : `<div class="ph-${w.ph}"></div>`;
    video = `<button class="video-facade" aria-label="動画を再生">
      ${poster}<span class="play-icon"></span><span class="play-label">Play</span></button>`;
  }

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
      <ul class="tag-list">${w.skills.map((s) => `<li><a href="works.html?skill=${encodeURIComponent(s)}">${s}</a></li>`).join("")}</ul>
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

  // 再生ボタンが押されたら、その場で動画に差し替えて自動再生する
  const facade = root.querySelector(".video-facade");
  if (facade) {
    facade.addEventListener("click", () => {
      const url = new URL(embedUrl, location.href);
      url.searchParams.set("autoplay", "1");      // クリックで即再生
      url.searchParams.set("rel", "0");           // 終了後の関連動画を減らす（YouTube）
      url.searchParams.set("modestbranding", "1");// YouTubeロゴを控えめに
      url.searchParams.set("playsinline", "1");   // スマホでも枠内で再生
      facade.parentElement.innerHTML =
        `<iframe src="${url}" title="${w.title}" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    });
  }
}
