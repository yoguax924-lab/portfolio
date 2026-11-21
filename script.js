// ==========================================================
// ヒーローのスライドショー
// .slide を一定間隔で切り替えます（フェードはCSS側で設定）
// ==========================================================

// 切り替え間隔（ミリ秒）。5000 = 5秒
const INTERVAL = 5000;

const slides = document.querySelectorAll(".slide");
let current = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length; // 最後まで行ったら最初に戻る
    slides[current].classList.add("active");
  }, INTERVAL);
}
