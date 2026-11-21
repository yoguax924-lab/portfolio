// ==========================================================
// ハンバーガーメニュー（モバイル表示用）
// ボタンを押すとメニューが開閉します。全ページで読み込まれます。
// 見た目は style.css の「ハンバーガーメニュー」部分で変更できます。
// ==========================================================
const menuButton = document.querySelector(".menu-toggle");
const menuNav = document.querySelector(".site-nav");

function setMenu(open) {
  menuNav.classList.toggle("open", open);
  menuButton.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", open);
  document.body.classList.toggle("menu-open", open); // 開いている間は背景をスクロールさせない
}

menuButton.addEventListener("click", () => setMenu(!menuNav.classList.contains("open")));

// メニュー内のリンクを押したら閉じる
menuNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Escキーで閉じる
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// 画面を広げてPC表示に戻ったら閉じておく（640px は style.css のスマホ幅と合わせる）
window.addEventListener("resize", () => { if (window.innerWidth > 640) setMenu(false); });
