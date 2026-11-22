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

  // ---------- 詳細レイアウト用の部品（works-data.js に該当の項目があるときだけ表示） ----------
  // 画像があれば <img>、なければ仮の枠。variant を変えると仮の色が少し変わる
  const mediaEl = (src, alt, variant = 0) =>
    src ? `<img src="${src}" alt="${alt}">` : `<div class="ph-${((w.ph - 1 + variant) % 3) + 1}"></div>`;
  const frame = (src, cls, alt) => `<div class="frame ${cls}">${mediaEl(src, alt)}</div>`;
  const lines = (t) => t.split("\n").join("<br>");   // \n で改行

  // 完成カット（gallery）：1枚目=左に大きく、2・3枚目=右に小さく縦2枚、4枚目以降=その下に横長
  let gallerySection = "";
  if (w.gallery) {
    const items = w.gallery
      .map((src, i) => {
        const role = i === 0 ? "g-main" : i <= 2 ? "g-side" : "g-wide";
        return `<div class="frame gallery-item ${role}">${mediaEl(src, `${w.title} ${i + 1}`)}</div>`;
      })
      .join("");
    gallerySection = `
    <div class="about-block">
      <h2 class="section-title">Final Shots</h2>
      <div class="gallery">${items}</div>
    </div>`;
  }

  // 制作過程（process）：画像と「番号 + 小見出し + 説明」を左右に並べ、項目ごとに左右を入れ替える
  let processSection = "";
  if (w.process) {
    const items = w.process
      .map((p, i) => {
        const num = String(i + 1).padStart(2, "0");
        // compare があれば、1つの枠を左右に分けて Before / After を見せる
        const media = p.compare
          ? `<div class="frame r-32 compare">
               <div class="compare-half">${mediaEl(p.compare.before, "Before")}<span class="compare-label">Before</span></div>
               <div class="compare-half">${mediaEl(p.compare.after, "After", 1)}<span class="compare-label">After</span></div>
             </div>`
          : p.slides
            // slides があれば、クリックでページ送りするスライドカードにする
            ? `<div class="frame r-32 slider">
                 ${p.slides
                   .map((s, k) => {
                     // s は "images/xxx.jpg" だけでも、{ src: "...", note: "注釈" } でもOK
                     const src = typeof s === "string" ? s : s.src;
                     const note = typeof s === "string" ? "" : s.note;
                     return `<div class="sl-item${k === 0 ? " active" : ""}">${mediaEl(src, `${p.title} ${k + 1}`, k)}${note ? `<span class="slide-note">${note}</span>` : ""}</div>`;
                   })
                   .join("")}
                 <button class="slider-btn prev" type="button" aria-label="前へ">←</button>
                 <button class="slider-btn next" type="button" aria-label="次へ">→</button>
                 <span class="slider-count">1 / ${p.slides.length}</span>
               </div>`
            : p.video
              // video（mp4）があれば、音なし・ループの自動再生で見せる（GIFのような使い方）
              ? `<div class="frame r-32">
                   ${mediaEl(p.poster, p.title)}
                   <video src="${p.video}" ${p.poster ? `poster="${p.poster}"` : ""} autoplay muted loop playsinline preload="metadata"></video>
                 </div>`
              : frame(p.image, "r-32", p.title);
        return `
        <div class="process-item">
          <div class="process-media">${media}</div>
          <div class="process-text">
            <span class="process-num">${num}</span>
            <h3>${p.title}</h3>
            <p>${lines(p.text)}</p>
          </div>
        </div>`;
      })
      .join("");
    processSection = `
    <div class="about-block">
      <h2 class="section-title">Process</h2>
      <div class="process">${items}</div>
    </div>`;
  }

  // 技術・空間面（tech）：設置図を大きく1枚 + 説明1行、その下に写真を横並び + 説明1行
  let techSection = "";
  if (w.tech) {
    const t = w.tech;
    techSection = `
    <div class="about-block">
      <h2 class="section-title">Technical</h2>
      <figure class="tech-figure">
        ${frame(t.diagram, "r-169", "設置図")}
        <figcaption>${t.diagramCaption}</figcaption>
      </figure>
      ${
        // 写真（photos）を書いたときだけ、設置図の下に横並びで表示
        t.photos
          ? `<figure class="tech-figure">
        <div class="tech-photos">${t.photos.map((p, i) => frame(p, "r-32", `${w.title} 現場 ${i + 1}`)).join("")}</div>
        <figcaption>${t.photosCaption || ""}</figcaption>
      </figure>`
          : ""
      }
    </div>`;
  }

  // 工夫と学び（learnings）：左に細い縦線（アクセントカラー）
  const learningsSection = w.learnings
    ? `
    <div class="about-block">
      <h2 class="section-title">Learnings</h2>
      <blockquote class="learnings">${lines(w.learnings)}</blockquote>
    </div>`
    : "";

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
      <div><dt>Skills</dt><dd><ul class="tag-list">${w.skills.map((s) => `<li><a href="works.html?skill=${encodeURIComponent(s)}">${s}</a></li>`).join("")}</ul></dd></div>
    </dl>

    <div class="about-block">
      <h2 class="section-title">Description</h2>
      <div class="detail-desc">${desc}</div>
    </div>

    ${
      // gallery（完成カット）がある作品はそちらを表示。ない作品は従来の Photos
      w.gallery
        ? gallerySection
        : `<div class="about-block">
      <h2 class="section-title">Photos</h2>
      <div class="detail-photos">${photos}</div>
    </div>`
    }
    ${processSection}
    ${techSection}
    ${learningsSection}

    <div class="about-block">
      <h2 class="section-title">Credits</h2>
      <ul class="skill-list">${credits}</ul>
    </div>

    <nav class="detail-nav">
      ${prev ? `<a href="work.html?id=${prev.id}">← ${prev.title}</a>` : `<span></span>`}
      <a href="works.html">All works</a>
      ${next ? `<a href="work.html?id=${next.id}">${next.title} →</a>` : `<span></span>`}
    </nav>`;

  // スライドカード：画像をクリック（または矢印ボタン）でページ送り。
  // 最初・最後で止まり、動ける方向の矢印だけを表示する（最初は → だけ、最後は ← だけ）
  root.querySelectorAll(".slider").forEach((slider) => {
    const items = slider.querySelectorAll(".sl-item");
    const count = slider.querySelector(".slider-count");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    let cur = 0;
    const show = (n) => {
      if (n < 0 || n >= items.length) return;   // 範囲外には動かない
      items[cur].classList.remove("active");
      cur = n;
      items[cur].classList.add("active");
      count.textContent = `${cur + 1} / ${items.length}`;
      prevBtn.hidden = cur === 0;                  // 最初のページでは ← を隠す
      nextBtn.hidden = cur === items.length - 1;   // 最後のページでは → を隠す
    };
    show(0);
    prevBtn.hidden = true;
    nextBtn.hidden = items.length < 2;
    slider.addEventListener("click", (e) => {
      // ← ボタンなら前へ、それ以外（→ボタン・画像クリック）は次へ
      show(e.target.closest(".prev") ? cur - 1 : cur + 1);
    });
  });

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
