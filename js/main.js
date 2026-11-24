/* 启动 */
(function () {
  function boot() {
    if (!globalThis.BLG || !BLG.ui) {
      document.getElementById("app").innerHTML =
        '<p style="padding:24px;color:#fff">加载失败：请检查 js 目录是否完整。</p>';
      return;
    }
    BLG.ui.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
