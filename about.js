// ==========================================================
// About me の Skills を、作品のスキルから自動で作る
// 作品データ（works-data.js）の skills に書いたものが、そのまま並びます。
// スキル名をクリックすると、Works のスキル絞り込みへ移動します。
// スキルを増やす・直すときは、works-data.js の各作品の skills を書き換えてください。
// ==========================================================
const skills = [...new Set(WORKS.flatMap((w) => w.skills || []))];

document.getElementById("skill-list").innerHTML = skills
  .map((s) => `<li><a href="works.html?skill=${encodeURIComponent(s)}">${s}</a></li>`)
  .join("");
