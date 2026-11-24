/* 平台适配层：浏览器 Mock。接平台时替换这里，不改游戏逻辑。 */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  const slots = {
    HOME: "AD_HOME_01",
    FAIL: "AD_FAIL_01",
    BREAK: "AD_BREAK_01",
    RESULT: "AD_RESULT_01",
    DAILY: "AD_DAILY_01"
  };

  function track(event, props) {
    if (window.console && console.info) {
      console.info("[track]", event, props || {});
    }
  }

  function login() {
    return Promise.resolve({ id: "local-guest", name: "BLG 教练" });
  }

  function showRewardedAd(slot, onDone) {
    track("ad_request", { slot });

    const old = document.getElementById("ad-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "ad-overlay";
    overlay.className = "ad-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = `
      <div class="ad-card">
        <div class="ad-label">广告 · 激励视频</div>
        <div class="ad-brand">BLG · 电竞补给站</div>
        <div class="ad-copy">这里将是平台配置的激励视频。<br>原型中用 3 秒占位模拟。</div>
        <div class="ad-count" id="ad-count">3</div>
        <div class="ad-actions">
          <button class="btn btn-ghost" id="ad-skip" type="button">跳过</button>
          <button class="btn btn-primary" id="ad-claim" type="button" disabled>领取奖励</button>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    let left = 3;
    const count = overlay.querySelector("#ad-count");
    const claim = overlay.querySelector("#ad-claim");
    const skip = overlay.querySelector("#ad-skip");

    const close = (ok) => {
      clearInterval(timer);
      overlay.remove();
      track(ok ? "ad_complete" : "ad_skip", { slot });
      if (typeof onDone === "function") onDone(ok);
    };

    const timer = setInterval(() => {
      left -= 1;
      if (left > 0) {
        count.textContent = String(left);
      } else {
        count.textContent = "✓";
        claim.disabled = false;
      }
    }, 1000);

    skip.addEventListener("click", () => close(false));
    claim.addEventListener("click", () => close(true));
  }

  function drawRoundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function drawShareCard(data, bgImg) {
    const W = 1080;
    const H = 1440;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    if (bgImg) {
      // 冠军海报背景：cover + 轻微模糊 + 暗色压层
      const scale = Math.max(W / bgImg.width, H / bgImg.height);
      const dw = bgImg.width * scale;
      const dh = bgImg.height * scale;
      ctx.save();
      ctx.filter = "blur(1px)";
      ctx.drawImage(bgImg, (W - dw) / 2, (H - dh) / 2, dw, dh);
      ctx.restore();

      const shade = ctx.createLinearGradient(0, 0, 0, H);
      shade.addColorStop(0, "rgba(4,9,18,0.36)");
      shade.addColorStop(0.42, "rgba(5,11,23,0.54)");
      shade.addColorStop(1, "rgba(4,9,18,0.86)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, W, H);

      const leftShade = ctx.createLinearGradient(0, 0, W * 0.72, 0);
      leftShade.addColorStop(0, "rgba(4,9,18,0.5)");
      leftShade.addColorStop(1, "rgba(4,9,18,0)");
      ctx.fillStyle = leftShade;
      ctx.fillRect(0, 0, W, H);
    } else {
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#071021");
      bg.addColorStop(0.55, "#0d1d3a");
      bg.addColorStop(1, "#08101f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 装饰网格
      ctx.strokeStyle = "rgba(120,170,255,0.09)";
      ctx.lineWidth = 2;
      for (let x = 0; x < W; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // 光晕
      const glow = ctx.createRadialGradient(820, 180, 20, 820, 180, 520);
      glow.addColorStop(0, "rgba(84,140,255,0.55)");
      glow.addColorStop(1, "rgba(84,140,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.textAlign = "left";
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "600 30px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillText("登神之路 · BLG 2026", 72, 92);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 104px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillText(data.score || "BLG 3:1 T1", 72, 228);

    ctx.fillStyle = "#cfe0ff";
    ctx.font = "600 38px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillText(data.subtitle || "半决赛 · 十三年魔咒", 76, 292);
    ctx.shadowBlur = 0;

    // 评级块
    drawRoundRect(ctx, 72, 372, 300, 300, 28);
    ctx.fillStyle = "rgba(47,107,255,0.22)";
    ctx.fill();
    ctx.strokeStyle = "rgba(159,194,255,0.55)";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 190px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.grade || "S", 222, 568);
    ctx.font = "600 30px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillStyle = "#9fc2ff";
    ctx.fillText("复刻评级", 222, 630);
    ctx.textAlign = "left";

    // 信息面板
    drawRoundRect(ctx, 48, 700, W - 96, 580, 26);
    ctx.fillStyle = "rgba(4,10,22,0.55)";
    ctx.fill();
    ctx.strokeStyle = "rgba(89,225,255,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 信息
    const rows = [
      ["系列赛", data.series || "BLG 3:1 T1"],
      ["本局", data.stage || "G4 · 四打五，然后反打"],
      ["复刻度", (data.rating || 0) + " / 100"],
      ["MVP", data.mvp || "Knight"],
      ["关键呼叫", data.call || "蹲草，等 Faker 脸探"]
    ];

    let y = 760;
    rows.forEach(([k, v]) => {
      ctx.fillStyle = "rgba(255,255,255,0.52)";
      ctx.font = "600 26px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
      ctx.fillText(k, 76, y);
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 38px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
      ctx.fillText(String(v), 300, y);
      y += 84;
    });

    // 任务完成
    ctx.fillStyle = "rgba(255,255,255,0.52)";
    ctx.font = "600 26px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillText("历史任务", 76, y + 12);
    ctx.fillStyle = "#9fc2ff";
    ctx.font = "700 34px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillText((data.tasks || "3 / 4") + " 完成", 300, y + 12);

    // 底部
    ctx.fillStyle = "rgba(255,255,255,0.38)";
    ctx.font = "500 24px system-ui, -apple-system, 'Microsoft YaHei', sans-serif";
    ctx.fillText("BLG 夺冠之路  |  我的复刻战报", 76, H - 76);
    ctx.textAlign = "right";
    ctx.fillText("历史结果不可改写", W - 76, H - 76);
    ctx.textAlign = "left";

    let url;
    try {
      url = canvas.toDataURL("image/png");
    } catch (e) {
      if (BLG.ui && BLG.ui.toast) BLG.ui.toast("战报卡生成失败，请刷新页面重试");
      return;
    }
    const overlay = document.createElement("div");
    overlay.className = "share-overlay";
    overlay.innerHTML = `
      <div class="share-card">
        <div class="share-head">
          <strong>战报卡已生成</strong>
          <button class="icon-btn" id="share-close" type="button" aria-label="关闭">×</button>
        </div>
        <img src="${url}" alt="BLG 复刻战报卡">
        <div class="share-actions">
          <a class="btn btn-primary" download="BLG-复刻战报.png" href="${url}">保存图片</a>
          <button class="btn btn-ghost" id="share-copy" type="button">复制文案</button>
        </div>
        <p class="share-tip">上线后这里接平台分享 SDK；原型先保存图片。</p>
      </div>`;
    document.body.appendChild(overlay);

    overlay.querySelector("#share-close").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#share-copy").addEventListener("click", () => {
      const text = `${data.score || "BLG 3:1 T1"}｜复刻度 ${data.grade || "S"}｜关键呼叫：${data.call || "蹲草，等 Faker 脸探"}｜#BLG夺冠之路#`;
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      if (BLG.ui && BLG.ui.toast) BLG.ui.toast("文案已复制");
    });

    track("share_card", { grade: data.grade, stage: data.stage });
  }

  function shareCard(data) {
    const img = new Image();
    img.onload = () => drawShareCard(data, img);
    img.onerror = () => drawShareCard(data, null);
    img.src = (BLG && BLG.shareCardBg) || "assets/ui/share-card-bg.jpg";
  }

  BLG.platform = {
    slots,
    isMock: true,
    track,
    login,
    showRewardedAd,
    shareCard
  };
})();
