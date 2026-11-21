// ==========================================================
// 固定ヘッダー：少しスクロールしたら背景色を付ける
// （最初は透明でヒーロー画像に重なり、本文に重なる時は読みやすくする）
// ==========================================================
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 50); // 50 = 切り替わる位置(px)
window.addEventListener("scroll", onScroll);
onScroll();

// ==========================================================
// ヒーローのスライドショー
// .slide を一定間隔で切り替えます（フェードはCSS側で設定）
// ==========================================================

// 切り替え間隔（ミリ秒）。5000 = 5秒
const INTERVAL = 5000;

// スライドを SLIDES（works-data.js）から作る。画像があれば画像、なければ仮の背景
const hero = document.querySelector(".hero");
hero.insertAdjacentHTML("afterbegin", SLIDES.map((s, i) => {
  const bg = s.image ? `url('${s.image}') center/cover` : s.bg;
  const cls = `slide${i === 0 ? " active" : ""}`;
  const inner = `<p class="slide-caption">${s.caption}</p>`;
  // work があれば作品詳細ページへのリンクにする（なければただの表示）
  return s.work
    ? `<a href="work.html?id=${s.work}" class="${cls} slide-link" style="background: ${bg};">${inner}</a>`
    : `<div class="${cls}" style="background: ${bg};">${inner}</div>`;
}).join(""));

// トップの Works 抜粋：WORKS の先頭から何件表示するか
const HOME_WORKS_COUNT = 2;
document.getElementById("home-works").innerHTML = WORKS.slice(0, HOME_WORKS_COUNT).map(cardHTML).join("");

const slides = document.querySelectorAll(".slide");
let current = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length; // 最後まで行ったら最初に戻る
    slides[current].classList.add("active");
  }, INTERVAL);
}
