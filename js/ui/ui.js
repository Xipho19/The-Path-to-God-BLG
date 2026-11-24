/* 竖屏 UI：首页、系列赛、BP、三回合、团战剧场、结算、过场 */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");

  const G = {
    progress: null,
    stage: null,
    run: null,
    selectedBP: null,
    lastOutcome: null,
    theaterSel: {},
    theaterResult: null,
    result: null,
    adHint: "",
    confettiPlayed: false,
    cs: null,
    statsTab: "team",
    statsPlayerId: 2687,
    cmpRole: "TOP",
    cmpTeamId: 692,
    seriesId: "dk"
  };

  let toastTimer = null;

  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* keepScroll=true 用于选项后的原地刷新，避免操作时跳回页首 */
  function setScreen(html, cls, stage, keepScroll) {
    document.querySelectorAll(".confetti-canvas").forEach((c) => c.remove());
    const y = window.scrollY || window.pageYOffset || 0;
    const hasBg = !!(stage && stage.bg);
    app.className = "app " + (cls || "") + (hasBg ? " has-stage-bg" : "");
    app.style.removeProperty("--stage-bg");
    if (hasBg) app.style.setProperty("--stage-bg", `url("${stage.bg}")`);
    app.innerHTML = html;
    if (toastEl) toastEl.classList.remove("show");
    window.scrollTo(0, keepScroll ? y : 0);
  }

  function topbar(title, backAction, right) {
    return `
      <div class="topbar">
        <button class="icon-btn" type="button" onclick="${backAction || "BLG.ui.home()"}" aria-label="返回">‹</button>
        <div class="topbar-title">${esc(title)}</div>
        <div class="topbar-right">${right || ""}</div>
      </div>`;
  }

  function bar(value, kind) {
    const v = Math.max(0, Math.min(100, value));
    return `<div class="bar ${kind}"><span style="width:${v}%"></span></div>`;
  }

  function fx(effect) {
    const a = effect.adv || 0;
    const m = effect.mind || 0;
    return `
      <span class="fx ${a >= 0 ? "up" : "down"}">ADV ${a >= 0 ? "+" : ""}${a}</span>
      <span class="fx ${m >= 0 ? "up" : "down"}">冷静 ${m >= 0 ? "+" : ""}${m}</span>`;
  }

  function eventCard(event, choice, slot) {
    if (!event) return "";
    const slotLabel = slot === "prep" ? "赛前" : slot === "round" ? "局内" : "赛后";
    const options = (event.options || []).map((o) => `
      <button class="event-opt" type="button" onclick="BLG.ui.chooseEvent('${slot}','${o.id}')">
        <b>${esc(o.label)}</b>
        ${o.desc ? `<span>${esc(o.desc)}</span>` : ""}
        ${slot === "post" ? "" : `<em>${fx(o.effect || {})}</em>`}
      </button>`).join("");
    return `
      <div class="card event-card ${choice ? "done" : ""}">
        <div class="event-eyebrow">本局变奏 · ${slotLabel}</div>
        <h2 class="event-title">${esc(event.title)}</h2>
        <p class="event-line">${esc(event.line)}</p>
        ${choice
          ? `<div class="event-result">✓ ${esc(choice.label)}${choice.result ? " · " + esc(choice.result) : ""}</div>`
          : `<div class="event-options">${options}</div>`}
        ${slot === "post" ? `<p class="event-note">赛后选择不影响本局评级。</p>` : ""}
      </div>`;
  }

  function chooseEvent(slot, optionId) {
    const ev = G.run && G.run.events && G.run.events[slot];
    if (!ev || G.run.eventChoices[slot]) return;
    BLG.engine.applyEventChoice(G.run, ev, optionId, slot);
    if (slot === "prep") renderBP(true);
    else if (slot === "round") renderMatch(true);
    else if (slot === "post") renderResult(true);
  }

  function statusOf(id) {
    const p = G.progress;
    const done = BLG.engine.stageDone(p, id);
    const unlocked = BLG.engine.isUnlocked(p, id);
    if (done) return { label: "已完成", cls: "done", unlocked: true };
    if (unlocked) return { label: "可挑战", cls: "ready", unlocked: true };
    return { label: "未解锁", cls: "locked", unlocked: false };
  }

  function mvps(stageId) {
    const map = {
      dk_g1: { name: "Xun", photo: "assets/players/xun.png", note: "冥犬 12/1/8，先锋团与远古龙两次接管" },
      dk_g2: { name: "Viper", photo: "assets/players/viper.png", note: "伊泽瑞尔盲视野 Q 拿一血，下路打穿" },
      dk_g3: { name: "Bin", photo: "assets/players/bin.png", note: "贾克斯 12/4/5，1v2 双杀后接管边线" },
      t1_g1: { name: "Knight", photo: "assets/players/knight.png", note: "先锋团捏大招，卷住 Peyz 与 Faker" },
      t1_g3: { name: "Xun", photo: "assets/players/xun.png", note: "潘森草丛控住 Faker，跳大终结比赛" },
      t1_g4: { name: "ON", photo: "assets/players/on.png", note: "萨勒芬妮两次多人大招，把团战开成名场面" },
      gen_g2: { name: "Xun", photo: "assets/players/xun.png", note: "冥犬 8/1/9，对位经济差 +6256" },
      gen_g3: { name: "Viper", photo: "assets/players/viper.png", note: "岩雀封路，BLG 拿下冠军点" },
      gen_g4: { name: "ON", photo: "assets/players/on.png", note: "妮蔻多次开团，最后一波击飞 Chovy" }
    };
    return map[stageId] || { name: "Knight", photo: "assets/players/knight.png", note: "关键局稳定输出" };
  }

  function stageIndex(stageId) {
    const stage = BLG.stages[stageId];
    const list = (stage && BLG.series[stage.series] && BLG.series[stage.series].stages) || [];
    return list.indexOf(stageId);
  }

  function seriesScoreFor(stageId) {
    const map = {
      dk_g1: "0 : 0", dk_g2: "1 : 0", dk_g3: "2 : 0",
      t1_g1: "0 : 0", t1_g3: "1 : 1", t1_g4: "2 : 1",
      gen_g1: "0 : 0", gen_g2: "0 : 1", gen_g3: "1 : 1", gen_g4: "2 : 1"
    };
    return map[stageId] || "0 : 0";
  }

  function teamLogo(teamId, cls) {
    return `<img class="team-logo ${cls || ""}" src="assets/teams/${esc(teamId)}.png" alt="${esc(teamId.toUpperCase())}" onerror="this.style.display='none'">`;
  }

  function playerById(teamId, playerId) {
    const team = BLG.teamById(teamId);
    if (!team) return null;
    return team.players.find((p) => p.id === playerId) || null;
  }

  function playerFace(teamId, playerId, cls) {
    const p = playerById(teamId, playerId);
    if (!p) return "";
    return `<img class="${cls || "war-face"}" src="${esc(p.photo)}" alt="${esc(p.name)}" onerror="this.style.display='none'">`;
  }

  function champIcon(icon, name, cls) {
    if (!icon) {
      return `<span class="champ-icon-fallback ${cls || ""}" title="${esc(name)}">?</span>`;
    }
    return `<img class="${cls || "war-champ"}" src="assets/champions/icons/${esc(icon)}.png" alt="${esc(name)}" title="${esc(name)}" onerror="this.style.display='none'">`;
  }

  function mapMarker(focus) {
    const pos = {
      top: "left: 20%; top: 20%;",
      jungle: "left: 40%; top: 40%;",
      mid: "left: 50%; top: 50%;",
      bot: "left: 80%; top: 80%;",
      dragon: "left: 68%; top: 70%;",
      baron: "left: 32%; top: 30%;",
      grubs: "left: 45%; top: 30%;",
      herald: "left: 32%; top: 30%;"
    };
    return pos[focus] || pos.mid;
  }

  function warRoom(stage, round) {
    const data = BLG.intel && BLG.intel[stage.id] ? BLG.intel[stage.id][round.time] : null;
    if (!data) return "";

    const gold = data.gold || 0;
    const goldLabel = (gold >= 0 ? "+" : "") + (gold / 1000).toFixed(1) + "k";
    const goldClass = gold >= 0 ? "up" : "down";
    const focusLabel = {
      top: "上半区", jungle: "野区", mid: "中路", bot: "下半区",
      dragon: "小龙区", baron: "大龙区"
    }[data.focus] || "中路";

    const objective = (label, val, max, cls) => `
      <div class="war-objective ${cls || ""}">
        <span class="wo-label">${esc(label)}</span>
        <span class="wo-pips">${Array.from({ length: max }).map((_, i) => `<i class="${i < val ? "on" : ""}"></i>`).join("")}</span>
        <b>${val}</b>
      </div>`;

    const duel = data.duel || {};
    const blueDuel = duel.blue || { player: "bin", champ: "—", icon: null };
    const redDuel = duel.red || { player: "faker", champ: "—", icon: null };
    const blueP = playerById("blg", blueDuel.player);
    const opponent = opponentOf(stage);
    const redP = playerById(opponent, redDuel.player);
    const oppName = (BLG.teamById(opponent) || {}).name || opponent.toUpperCase();

    return `
      <div class="war-room">
        <div class="war-top">
          <div class="war-map" aria-label="战术小地图：${esc(focusLabel)}">
            <div class="map-stage">
              <img class="sr-map" src="assets/maps/sr.png" alt="召唤师峡谷地图">
              <div class="map-tint"></div>
              <div class="map-scan"></div>
              <span class="map-base-label blue">BLG</span>
              <span class="map-base-label red">${esc(oppName)}</span>
              <span class="map-pit dragon">龙</span>
              <span class="map-pit baron">大龙</span>
              <span class="map-marker" style="${mapMarker(data.focus)}"></span>
              ${data.contest ? `<span class="map-marker enemy" style="${mapMarker(data.contest)}"></span>` : ""}
            </div>
            <span class="map-focus-label">战术重心 · ${esc(focusLabel)}</span>
            <div class="map-legend">
              <span class="lg-dot blue"></span>我方
              <span class="lg-dot red ${data.contest ? "" : "off"}"></span>${data.contest ? "敌方争夺" : "敌方未侦察"}
            </div>
          </div>
          <div class="war-economy">
            <div class="war-gold ${goldClass}">
              <span>经济差</span>
              <b>${esc(goldLabel)}</b>
            </div>
            <div class="war-vision">
              <span>视野控制</span>
              <b>${data.vision || 0}%</b>
              <div class="vision-bar"><i style="width:${data.vision || 0}%"></i></div>
            </div>
          </div>
        </div>

        <div class="war-objectives">
          ${objective("小龙", data.dragons || 0, 4, "dragon")}
          ${objective("巢虫", data.grubs || 0, 6, "grub")}
          ${objective("防御塔", data.towers || 0, 11, "tower")}
          ${objective("大龙", data.baron || 0, 1, "baron")}
        </div>

        <div class="war-duel">
          <div class="duel-side blue">
            ${playerFace("blg", blueDuel.player, "duel-face")}
            <div class="duel-meta">
              <b>${esc(blueP ? blueP.name : "")}</b>
              <span>${esc(blueDuel.champ)}</span>
            </div>
            ${champIcon(blueDuel.icon, blueDuel.champ, "duel-champ")}
          </div>
          <div class="duel-vs">对位</div>
          <div class="duel-side red">
            ${champIcon(redDuel.icon, redDuel.champ, "duel-champ")}
            <div class="duel-meta">
              <b>${esc(redP ? redP.name : "")}</b>
              <span>${esc(redDuel.champ)}</span>
            </div>
            ${playerFace(opponent, redDuel.player, "duel-face")}
          </div>
        </div>

        <div class="war-comms">
          <div class="comms-head">
            <span class="comms-dot"></span> 队内通讯 · 情境推演
            <span class="comms-tag">非真实语音</span>
          </div>
          ${(data.comms || []).map((c) => `
            <div class="comm-line">
              <span class="comm-time">${esc(c.time)}</span>
              <b class="comm-who">${esc(c.who)}</b>
              <span class="comm-text">${esc(c.text)}</span>
            </div>`).join("")}
        </div>
        <div class="war-disclaimer">节点时间来自公开报道；经济、视野、资源与通讯文字为模拟</div>
      </div>`;
  }

  function trophyIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/>
      <path d="M8 6H5v1.5A3.5 3.5 0 0 0 8.5 11"/>
      <path d="M16 6h3v1.5A3.5 3.5 0 0 1 15.5 11"/>
      <path d="M12 13v4"/>
      <path d="M9 21h6"/>
      <path d="M10 17h4v4h-4z"/>
    </svg>`;
  }

  const DRAFT_PLAYERS = {
    t1_g1: { blue: ["on", "knight", "bin", "xun", "viper"], red: ["oner", "faker", "doran", "peyz", "keria"] },
    t1_g3: { blue: ["viper", "xun", "bin", "on", "knight"], red: ["keria", "oner", "doran", "peyz", "faker"] },
    t1_g4: { blue: ["bin", "xun", "knight", "viper", "on"], red: ["doran", "oner", "faker", "peyz", "keria"] },
    dk_g1: { blue: ["on", "xun", "bin", "viper", "knight"], red: ["lucid", "career", "siwoo", "smash", "showmaker"] },
    dk_g2: { blue: ["lucid", "smash", "career", "showmaker", "siwoo"], red: ["xun", "viper", "bin", "knight", "on"] },
    dk_g3: { blue: ["siwoo", "lucid", "showmaker", "smash", "career"], red: ["viper", "on", "bin", "xun", "knight"] },
    gen_g2: { blue: ["ruler", "duro", "canyon", "chovy", "kiin"], red: ["knight", "on", "xun", "bin", "viper"] },
    gen_g3: { blue: ["kiin", "canyon", "chovy", "duro", "ruler"], red: ["bin", "xun", "knight", "on", "viper"] },
    gen_g4: { blue: ["xun", "viper", "on", "bin", "knight"], red: ["duro", "ruler", "canyon", "chovy", "kiin"] }
  };

  function draftBoard(stage) {
    if (!stage.draft) return "";
    const map = DRAFT_PLAYERS[stage.id] || {};
    const side = (data, cls) => {
      const team = BLG.teamById(data.team);
      const ids = map[cls] || [];
      return `
        <div class="draft-side ${cls}">
          <div class="draft-team">
            ${teamLogo(data.team, "draft-logo")}
            <span>${esc(data.label)}</span>
          </div>
          <div class="draft-champs">
            ${data.champs.map((c, i) => {
              const player = team && ids[i] ? team.players.find((p) => p.id === ids[i]) : null;
              const label = player ? player.name : c.name;
              return `
                <div class="draft-champ ${c.icon ? "" : "empty"}" title="${esc(player ? player.name + " · " + c.name : c.name)}">
                  ${c.icon
                    ? `<img src="assets/champions/icons/${esc(c.icon)}.png" alt="${esc(c.name)}" onerror="this.style.display='none'">`
                    : `<span class="draft-unknown">?</span>`}
                  <span class="draft-name">${esc(label)}</span>
                </div>`;
            }).join("")}
          </div>
        </div>`;
    };
    return `
      <div class="card draft-board">
        <div class="draft-eyebrow">历史阵容 · 本局 BP</div>
        ${side(stage.draft.blue, "blue")}
        <div class="draft-vs">VS</div>
        ${side(stage.draft.red, "red")}
      </div>`;
  }

  function nextStageId(stageId) {
    const stage = BLG.stages[stageId];
    const list = (stage && BLG.series[stage.series] && BLG.series[stage.series].stages) || [];
    const i = list.indexOf(stageId);
    return i >= 0 && i < list.length - 1 ? list[i + 1] : null;
  }

  function opponentOf(stage) {
    const s = BLG.series[stage.series];
    return s && s.opponent ? s.opponent : "t1";
  }

  /* ---------------- 首页 ---------------- */

  function home() {
    G.stage = null;
    G.run = null;
    G.result = null;
    G.cs = null;

    const done = Object.keys(G.progress.stages || {}).filter((k) => G.progress.stages[k].done).length;
    const total = Object.values(BLG.series).reduce((n, s) => n + s.stages.length, 0);
    const genOpen = BLG.engine.isUnlocked(G.progress, "gen_g1");
    setScreen(`
      <div class="home-hero">
        <div class="brand-row">
          <img class="brand-logo" src="assets/teams/blg.png" alt="BLG" onerror="this.style.display='none'">
          <span class="brand-sep">×</span>
          <span class="brand-sub">登神之路</span>
        </div>
        <div class="hero-kicker"><span class="live-dot"></span> 2026 WORLD CHAMPIONSHIP · KNOCKOUT</div>
        <h1 class="hero-title">让历史<br><span>再一次发生。</span></h1>
        <p class="hero-lead">
          你是 BLG 的第六人。不做微操，只做 BP、节奏与心态的决定。
          从八强到决赛，复刻 2026 全球总决赛。
        </p>
        <div class="hero-tags">
          <span>教练视角</span><span>竖屏 H5</span><span>历史锁定</span>
        </div>
        <div class="hero-rail">
          <span><b>3</b> 场系列赛</span>
          <span><b>9</b> 局可玩</span>
          <span><b>3:1</b> 历史决赛</span>
        </div>
        <button class="btn btn-primary btn-hero" type="button" onclick="BLG.ui.levels()">开始执教</button>
        <div class="hero-progress">
          <span>已完成 ${done} / ${total} 局</span>
          <span class="dot">·</span>
          <span>从 DK 开始 · 逐关解锁</span>
        </div>
      </div>

      <button class="data-entry" type="button" onclick="BLG.ui.stats()">
        <span class="data-entry-icon">▥</span>
        <span class="data-entry-body">
          <b>数据中心</b>
          <small>战队数据 / 选手数据 / 选手对位 · 官方赛事数据</small>
        </span>
        <span class="data-entry-arrow">›</span>
      </button>

      <div class="home-footer">
        <span>原型 v0.1 · 数据为 2026 赛季快照</span>
        <div class="home-footer-links">
          <button class="text-btn" type="button" onclick="BLG.ui.dataNotes()">赛况说明</button>
          <button class="text-btn" type="button" onclick="BLG.ui.exportSave()">导出存档</button>
          <button class="text-btn" type="button" onclick="BLG.ui.importSave()">导入存档</button>
          <button class="text-btn" type="button" onclick="BLG.ui.reset()">重置进度</button>
        </div>
      </div>
    `);
  }

  /* ---------------- 系列赛 ---------------- */

  /* ---------------- 选关 ---------------- */

  function levels() {
    const order = ["dk", "t1", "gen"];
    const p = G.progress;

    const cards = order.map((id, i) => {
      const s = BLG.series[id];
      if (!s) return "";
      const first = s.stages[0];
      const unlocked = BLG.engine.isUnlocked(p, first);
      const doneCount = s.stages.filter((sid) => BLG.engine.stageDone(p, sid)).length;
      const allDone = doneCount === s.stages.length;
      const opponent = s.opponent || "t1";
      const oppName = (BLG.teamById(opponent) || {}).name || opponent.toUpperCase();
      const status = allDone ? "已完成" : unlocked ? "可挑战" : "未解锁";
      const stars = s.stages.reduce((n, sid) => n + (((p.stages[sid] || {}).stars) || 0), 0);
      return `
        <button class="level-card ${allDone ? "done" : unlocked ? "ready" : "locked"}" type="button" onclick="BLG.ui.openLevel('${id}')">
          <span class="level-index">0${i + 1}</span>
          <div class="level-logos">
            <img src="assets/teams/blg.png" alt="BLG" onerror="this.style.display='none'">
            <img src="assets/teams/${esc(opponent)}.png" alt="${esc(oppName)}" onerror="this.style.display='none'">
          </div>
          <div class="level-info">
            <span class="level-kicker">${esc(s.name)}</span>
            <b>${esc(oppName)} · ${esc(s.score)}</b>
            <small>${esc(s.tagline)}</small>
            <em>${doneCount}/${s.stages.length} 局 · ${status}${stars ? ` · ★ ${stars}` : ""}</em>
          </div>
          <span class="level-arrow">${unlocked ? "›" : "锁"}</span>
        </button>`;
    }).join("");

    setScreen(`
      ${topbar("选择关卡", "BLG.ui.home()", `<span class="pill">9 局可玩</span>`)}
      <div class="levels-head">
        <div class="card-eyebrow">KNOCKOUT STAGE</div>
        <h1 class="levels-title">冠军之路</h1>
        <p class="levels-sub">从八强到决赛。完成上一关，才解锁下一关。</p>
      </div>
      <div class="level-list">${cards}</div>
      <p class="levels-tip">当前版本：DK 3:0 → T1 3:1 → GEN 3:1</p>
    `, "screen-levels");
  }

  function openLevel(id) {
    const s = BLG.series[id];
    if (!s) return;
    const first = s.stages[0];
    if (!BLG.engine.isUnlocked(G.progress, first)) {
      toast("先完成上一关");
      return;
    }
    series(id);
  }

  function series(seriesId) {
    const id = seriesId || G.seriesId || "dk";
    const s = BLG.series[id];
    if (!s) return home();
    G.seriesId = id;

    const p = G.progress;
    const doneCount = s.stages.filter((sid) => BLG.engine.stageDone(p, sid)).length;
    const opponent = s.opponent || "t1";
    const oppTeam = BLG.teamById(opponent);
    const oppName = oppTeam ? oppTeam.name : opponent.toUpperCase();
    const isT1 = id === "t1";

    const cards = s.stages.map((sid) => {
      const st = BLG.stages[sid];
      const status = statusOf(sid);
      const rec = p.stages[sid] || {};
      const best = rec.best || 0;
      const stars = rec.stars || 0;
      return `
        <button class="stage-card ${status.cls} ${st.type === "cutscene" ? "cut" : ""}" type="button" onclick="BLG.ui.openStage('${sid}')">
          <div class="stage-left">
            <span class="stage-code">${esc(st.code)}</span>
            <span class="stage-title">${esc(st.title)}</span>
            <span class="stage-sub">${esc(st.subtitle)}</span>
          </div>
          <div class="stage-right">
            <span class="stage-status">${status.label}</span>
            ${best ? `<span class="stage-best">最佳 ${best}</span>` : ""}
            ${stars ? `<span class="stage-stars" title="三星进度">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span>` : ""}
          </div>
        </button>`;
    }).join("");

    setScreen(`
      ${topbar(s.name, "BLG.ui.levels()", `<span class="pill ${isT1 ? "red" : ""}">历史 ${esc(s.score)}</span>`)}
      <div class="broadcast-strip">
        <span class="live-dot"></span>
        <span class="bc-live">LIVE</span>
        <span class="bc-round">${id === "dk" ? "QUARTERFINALS" : id === "t1" ? "SEMIFINALS" : "FINAL"} · BO5</span>
        <span class="bc-event">WORLDS 2026</span>
      </div>
      <div class="series-head">
        <div class="matchup">
          <div class="team blue">
            <img class="team-logo" src="assets/teams/blg.png" alt="BLG" onerror="this.style.display='none'">
            <span class="team-mark">BLG</span><span class="team-sub">LPL</span>
          </div>
          <div class="vs">VS</div>
          <div class="team red">
            <img class="team-logo" src="assets/teams/${esc(opponent)}.png" alt="${esc(oppName)}" onerror="this.style.display='none'">
            <span class="team-mark">${esc(oppName)}</span><span class="team-sub">LCK</span>
          </div>
        </div>
        <p class="series-tagline">${esc(s.tagline)}</p>
        <div class="series-meta">
          <span>已完成 ${doneCount} / ${s.stages.length}</span>
          <span>${isT1 ? "心魔 65" : id === "dk" ? "目标：3:0" : "目标：让一追三"}</span>
        </div>
      </div>
      <div class="stage-list">${cards}</div>
      <div class="card note-card">
        <div class="card-eyebrow">规则</div>
        <p class="muted">${esc(s.note)}</p>
      </div>
      <div class="debug-row">
        <button class="text-btn" type="button" onclick="BLG.ui.unlockAll()">调试：解锁全部</button>
      </div>
    `, "screen-series");
  }

  /* ---------------- 赛前简报 ---------------- */

  function openStage(id) {
    const stage = BLG.stages[id];
    if (!stage) return;
    if (!BLG.engine.isUnlocked(G.progress, id)) {
      toast("先完成前一局");
      return;
    }
    G.stage = stage;
    if (stage.type === "cutscene") {
      startCutscene(stage);
    } else {
      brief(stage);
    }
  }


  function brief(stage) {
    const tasks = stage.tasks.map((t) => `<li>${esc(t.label)}</li>`).join("");
    const best = (G.progress.stages[stage.id] && G.progress.stages[stage.id].best) || 0;

    setScreen(`
      ${topbar(stage.code, `BLG.ui.series('${stage.series}')`, `<span class="pill">${best ? "最佳 " + best : "未挑战"}</span>`)}
      <div class="brief">
        <div class="stage-hero">
          <img src="${esc(stage.heroPhoto || stage.hero || "assets/champions/ksante.jpg")}" alt="" onerror="this.style.visibility='hidden'">
          <div class="stage-hero-overlay"></div>
          <div class="stage-hero-text">
            <div class="card-eyebrow">${esc(stage.date)} · 历史结果：BLG 胜</div>
            <h1 class="brief-title">${esc(stage.title)}</h1>
            <p class="brief-sub">${esc(stage.subtitle)}</p>
          </div>
        </div>
        ${draftBoard(stage)}
        <div class="brief-lines">
          ${stage.report.lines.map((l) => `<p>${esc(l)}</p>`).join("")}
        </div>
        <div class="card">
          <div class="card-eyebrow">本局任务</div>
          <ul class="task-list">${tasks}</ul>
        </div>
        ${stage.eventPool ? `
        <div class="card note-card">
          <div class="card-eyebrow">本局变奏</div>
          <p class="muted">本局会从赛前、局内、赛后事件池各抽 1 个变奏事件。完成变奏任务并拿到 S 评级，可解锁三星。</p>
        </div>` : ""}
        <div class="card note-card">
          <div class="card-eyebrow">BP 提示</div>
          <p class="muted">${esc(stage.bpNote)}</p>
        </div>
        <button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.openBP()">进入 BP</button>
      </div>
    `, "screen-brief", stage);
  }

  /* ---------------- BP ---------------- */

  function openBP() {
    if (!G.stage || G.stage.type !== "play") return;
    G.run = BLG.engine.createRun(G.stage, G.progress);
    G.selectedBP = null;
    G.lastOutcome = null;
    G.theaterSel = {};
    G.theaterResult = null;
    G.result = null;
    G.adHint = "";
    G.confettiPlayed = false;
    renderBP();
  }

  function renderBP(keepScroll) {
    const stage = G.stage;
    const selected = G.selectedBP;
    const prepEvent = G.run && G.run.events && G.run.events.prep;
    const prepChoice = G.run && G.run.eventChoices.prep;
    const canLockBP = selected && (!prepEvent || prepChoice);
    const opponent = opponentOf(stage);
    const oppTeam = BLG.teamById(opponent);
    const oppName = oppTeam ? oppTeam.name : opponent.toUpperCase();
    const cards = stage.bpOptions.map((o) => `
      <button class="bp-card ${selected === o.id ? "selected" : ""}" type="button" onclick="BLG.ui.selectBP('${o.id}')">
        <span class="bp-label">${esc(o.label)}</span>
        <span class="bp-desc">${esc(o.desc)}</span>
        <span class="bp-fx">${fx(o.effect)}</span>
      </button>`).join("");

    setScreen(`
      ${topbar("BP · " + stage.code, "BLG.ui.briefAgain()", `<span class="pill">历史结果：胜</span>`)}
      <div class="bp-broadcast">
        <div class="bp-team">${teamLogo("blg", "bp-logo")}<span>BLG</span></div>
        <div class="bp-score">${seriesScoreFor(stage.id)}</div>
        <div class="bp-team red"><span>${esc(oppName)}</span>${teamLogo(opponent, "bp-logo")}</div>
      </div>
      <div class="bp-head">
        <div class="card-eyebrow">赛前 BP · 教练席</div>
        <h1 class="brief-title">${esc(stage.title)}</h1>
        <p class="brief-sub">${esc(stage.bpNote)}</p>
      </div>
      ${prepEvent ? eventCard(prepEvent, prepChoice, "prep") : ""}
      <div class="bp-list">${cards}</div>
      <div class="bp-actions">
        <button class="btn btn-ghost" type="button" onclick="BLG.ui.historyBP()">使用历史阵容</button>
        <button class="btn btn-primary" type="button" ${canLockBP ? "" : "disabled"} onclick="BLG.ui.lockBP()">锁定阵容</button>
      </div>
      <p class="hint">BP 会改变开局 ADV 与团队冷静值。锁定后进入三回合指挥。</p>
    `, "screen-bp", stage, keepScroll);
  }

  function selectBP(id) {
    G.selectedBP = id;
    renderBP(true);
  }

  function historyBP() {
    const o = G.stage.bpOptions.find((x) => x.historical);
    if (!o) return;
    const prep = G.run && G.run.events && G.run.events.prep;
    if (prep && !G.run.eventChoices.prep) {
      BLG.engine.applyEventChoice(G.run, prep, prep.options[0].id, "prep");
    }
    G.selectedBP = o.id;
    lockBP();
  }

  function lockBP() {
    if (!G.selectedBP) return;
    const prep = G.run && G.run.events && G.run.events.prep;
    if (prep && !G.run.eventChoices.prep) {
      toast("先处理赛前变奏");
      return;
    }
    const o = G.stage.bpOptions.find((x) => x.id === G.selectedBP);
    BLG.engine.applyBP(G.run, G.stage, o);
    G.run.roundIndex = 0;
    G.run.roundLocked = false;
    G.lastOutcome = null;
    renderMatch();
  }

  function briefAgain() {
    if (G.stage) brief(G.stage);
    else series();
  }

  /* ---------------- 局内三回合 ---------------- */

  function renderMatch(keepScroll) {
    const stage = G.stage;
    const run = G.run;
    if (!stage || !run) return series();

    const round = stage.rounds[run.roundIndex];
    const locked = run.roundLocked;
    const outcome = G.lastOutcome;
    const roundEvent = run.events && run.events.round && run.events.eventRound === run.roundIndex
      ? run.events.round
      : null;
    const roundEventChoice = run.eventChoices.round;
    const eventBlocked = !!roundEvent && !roundEventChoice;
    const opponent = opponentOf(stage);
    const oppTeam = BLG.teamById(opponent);
    const oppName = oppTeam ? oppTeam.name : opponent.toUpperCase();

    const options = round.options.map((o) => `
      <button class="opt ${locked ? (outcome && outcome.id === o.id ? "selected" : "dim") : eventBlocked ? "dim" : ""}"
              type="button"
              ${locked || eventBlocked ? "disabled" : ""}
              onclick="BLG.ui.choose('${o.id}')">
        <span class="opt-head">
          <span class="opt-label">${esc(o.label)}</span>
          <span class="opt-fx">${fx(o.effect)}</span>
        </span>
        <span class="opt-desc">${esc(o.desc)}</span>
      </button>`).join("");

    const tasks = stage.tasks.map((t) => `
      <span class="task-chip ${run.tasks[t.id] ? "done" : ""}">${run.tasks[t.id] ? "✓ " : ""}${esc(t.label)}</span>
    `).join("");

    const resultPanel = locked && outcome ? `
      <div class="result-panel ${outcome.historical ? "gold" : ""}">
        <div class="result-eyebrow">${outcome.historical ? "历史线触发" : "本回合结果"}</div>
        <p>${esc(outcome.result || "回合结束。")}</p>
        <button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.nextRound()">
          ${run.roundIndex >= stage.rounds.length - 1 ? "进入团战剧场" : "下一回合"}
        </button>
      </div>` : "";

    const pips = stage.rounds.map((_, i) => `
      <span class="pip ${i < run.roundIndex ? "done" : ""} ${i === run.roundIndex ? "current" : ""}"></span>
    `).join("");

    setScreen(`
      ${topbar(stage.code + " · 局内", "BLG.ui.confirmQuit()", `<span class="pill">${run.roundIndex + 1}/${stage.rounds.length}</span>`)}
      <div class="match-scoreline">
        <div class="ms-team">${teamLogo("blg", "ms-logo")}<span>BLG</span></div>
        <div class="ms-mid"><span>${esc(stage.code)}</span><b>${seriesScoreFor(stage.id)}</b></div>
        <div class="ms-team red"><span>${esc(oppName)}</span>${teamLogo(opponent, "ms-logo")}</div>
      </div>
      <div class="hud">
        <div class="hud-row">
          <span class="hud-label">BLG ADVANTAGE</span>
          <span class="hud-value">${run.adv}</span>
        </div>
        ${bar(run.adv, "adv")}
        <div class="hud-row second">
          <span class="hud-label">TEAM COMPOSURE</span>
          <span class="hud-value">${run.mind}</span>
        </div>
        ${bar(run.mind, "mind")}
        <div class="round-pips">${pips}</div>
      </div>

      ${warRoom(stage, round)}

      ${roundEvent ? eventCard(roundEvent, roundEventChoice, "round") : ""}

      <div class="round-card">
        <div class="round-time">${esc(round.time)}</div>
        <h1 class="round-title">${esc(round.title)}</h1>
        <p class="round-line">${esc(round.line)}</p>
      </div>

      <div class="opt-list">${options}</div>
      ${resultPanel}

      <div class="task-strip">
        <div class="card-eyebrow">本局任务</div>
        <div class="task-chips">${tasks}</div>
      </div>
    `, "screen-match", stage, keepScroll);
  }

  function choose(id) {
    if (!G.run || G.run.roundLocked) return;
    if (G.run.events && G.run.events.round && G.run.events.eventRound === G.run.roundIndex && !G.run.eventChoices.round) {
      toast("先处理局内变奏");
      return;
    }
    const round = G.stage.rounds[G.run.roundIndex];
    const option = round.options.find((o) => o.id === id);
    if (!option) return;
    BLG.engine.applyChoice(G.run, round, option);
    G.run.roundLocked = true;
    G.lastOutcome = option;
    renderMatch(true);
  }

  function nextRound() {
    if (!G.run || !G.run.roundLocked) return;
    if (G.run.roundIndex < G.stage.rounds.length - 1) {
      G.run.roundIndex += 1;
      G.run.roundLocked = false;
      G.lastOutcome = null;
      renderMatch();
      return;
    }
    if (G.stage.theater) {
      G.theaterSel = {};
      G.theaterResult = null;
      renderTheater();
    } else {
      finish();
    }
  }

  function confirmQuit() {
    if (window.confirm("退出本局？当前进度不会保存。")) {
      series(G.stage ? G.stage.series : "t1");
    }
  }

  /* ---------------- 团战剧场 ---------------- */

  function renderTheater(keepScroll) {
    const stage = G.stage;
    const t = stage.theater;
    const sel = G.theaterSel;
    const done = t.calls.every((c) => sel[c.id]);

    const calls = t.calls.map((call) => `
      <div class="theater-call">
        <div class="call-label">${esc(call.label)}</div>
        <div class="chips">
          ${call.options.map((o) => `
            <button class="chip ${sel[call.id] === o.id ? "selected" : ""}" type="button" onclick="BLG.ui.selectCall('${call.id}','${o.id}')">
              ${esc(o.label)}
            </button>`).join("")}
        </div>
      </div>`).join("");

    const result = G.theaterResult;
    const resultBlock = result ? `
      <div class="theater-result">
        <div class="verdict">${esc(result.verdict)}</div>
        <div class="theater-score">${result.score} <span>/ 100</span></div>
        <p>${esc(result.summary)}</p>
        <div class="theater-hits">历史命中：${result.historicalCount} / 3</div>
        <button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.finish()">继续 → 结算</button>
      </div>` : `
      <button class="btn btn-primary btn-block" type="button" ${done ? "" : "disabled"} onclick="BLG.ui.runTheater()">执行团战</button>
      <p class="hint">选择三个呼叫。目标评分 ≥ ${t.target || 55}。</p>`;

    setScreen(`
      ${topbar("团战剧场", "BLG.ui.confirmQuit()", `<span class="pill">${esc(t.time)}</span>`)}
      <div class="theater-head">
        <div class="card-eyebrow">慢镜头 · 教练呼叫</div>
        <h1 class="theater-title">${esc(t.title)}</h1>
        <p class="round-line">${esc(t.line)}</p>
      </div>
      <div class="theater-calls">${calls}</div>
      ${resultBlock}
    `, "screen-theater", G.stage, keepScroll);
  }

  function selectCall(callId, optionId) {
    G.theaterSel[callId] = optionId;
    renderTheater(true);
  }

  function runTheater() {
    if (!G.run) return;
    G.theaterResult = BLG.engine.resolveTheater(G.run, G.stage, G.theaterSel);
    renderTheater(true);
  }

  /* ---------------- 结算 ---------------- */

  function finish() {
    if (!G.run) return;
    if (G.stage.theater && !G.run.theater) {
      renderTheater();
      return;
    }
    const result = BLG.engine.buildResult(G.run, G.stage);
    G.result = result;
    BLG.engine.recordResult(G.progress, G.stage, result);
    renderResult();
  }

  function launchGoldConfetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const old = document.querySelector(".confetti-canvas");
    if (old) old.remove();

    const canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#f6c768", "#ffe6a8", "#e0b34a", "#fff4c2", "#caa23f"];
    const rand = (a, b) => a + Math.random() * (b - a);
    const pieces = [];
    for (let i = 0; i < 130; i++) {
      const early = i % 4 === 0;
      pieces.push({
        x: rand(-20, W + 20),
        y: early ? rand(-H * 0.1, H * 0.2) : rand(-H * 0.6, -10),
        w: rand(5, 10),
        h: rand(16, 30),
        vy: rand(60, 140),
        vx: rand(-24, 24),
        rot: rand(0, Math.PI * 2),
        vr: rand(-3, 3),
        sway: rand(10, 30),
        phase: rand(0, Math.PI * 2),
        color: colors[i % colors.length],
        delay: rand(0, 0.9)
      });
    }

    let start = null;
    let last = null;
    const draw = (ts) => {
      if (!canvas.isConnected) {
        window.removeEventListener("resize", resize);
        return;
      }
      if (start == null) start = ts;
      if (last == null) last = ts;
      const t = (ts - start) / 1000;
      const dt = Math.min(0.1, (ts - last) / 1000);
      last = ts;
      ctx.clearRect(0, 0, W, H);
      let alive = false;

      pieces.forEach((p) => {
        if (t < p.delay) {
          alive = true;
          return;
        }
        p.vy += 95 * dt;
        p.y += p.vy * dt;
        p.x += (p.vx + Math.sin(t * 2 + p.phase) * p.sway) * dt;
        p.rot += p.vr * dt;
        if (p.y < H + 40) alive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, Math.min(1, 1 - Math.max(0, t - 5) / 1.4));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(-p.w / 2, -p.h / 2);
        ctx.quadraticCurveTo(-p.w / 2 + p.w * 0.7, 0, -p.w / 2, p.h / 2);
        ctx.quadraticCurveTo(p.w / 2 - p.w * 0.2, 0, p.w / 2, -p.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha *= 0.35;
        ctx.fillStyle = "#fffbe8";
        ctx.fillRect(-p.w / 4, -p.h / 2 + 2, p.w / 4, p.h * 0.5);
        ctx.restore();
      });

      if (alive && t < 7) {
        requestAnimationFrame(draw);
      } else {
        window.removeEventListener("resize", resize);
        canvas.remove();
      }
    };
    requestAnimationFrame(draw);
  }

  function renderResult(keepScroll) {
    const stage = G.stage;
    const result = G.result;
    if (!stage || !result) return series();

    const win = result.win;
    const rating = result.rating;
    const mvp = mvps(stage.id);
    const tasksDone = stage.tasks.filter((t) => result.tasks[t.id]).length;
    const theater = result.theater;
    const nextId = nextStageId(stage.id);
    const next = nextId ? BLG.stages[nextId] : null;
    const isFinal = !next;
    const canAd = BLG.engine.canShowAd(G.progress, BLG.platform.slots.RESULT);
    const stars = result.stars || 0;
    const postEvent = result.events && result.events.post;
    const postChoice = result.eventChoices && result.eventChoices.post;
    const eventRows = ["prep", "round"].map((slot) => {
      const ev = result.events && result.events[slot];
      if (!ev) return "";
      const ch = result.eventChoices && result.eventChoices[slot];
      return `<div class="event-summary"><b>${esc(ev.title)}</b><span>${ch ? "✓ " + esc(ch.label) : "未处理"}</span></div>`;
    }).join("");

    setScreen(`
      ${topbar("赛后复盘", `BLG.ui.series('${stage.series}')`, `<span class="pill">${win ? (stage.resultTag || "复刻成功") : "本局失守"}</span>`)}
      <div class="result-hero ${win ? "win" : "loss"}">
        ${win ? `<div class="result-trophy"><img src="assets/ui/trophy-2026.png" alt="2026 全球总决赛冠军奖杯"></div>` : ""}
        <div class="result-eyebrow">${esc(stage.report.score)}</div>
        <div class="grade-ring grade-${rating.grade}">
          <span class="grade-letter">${rating.grade}</span>
          <span class="grade-sub">复刻度 ${rating.score}</span>
        </div>
        ${win ? `<div class="result-stars">${[0, 1, 2].map((i) => `<span class="${i < stars ? "on" : ""}">★</span>`).join("")}</div>` : ""}
        <h1 class="result-title">${win ? (stage.resultTitle || "历史，按原样发生。") : "这一局，还没有复刻成功。"}</h1>
        <p class="result-sub">${win ? (stage.resultSub || stage.report.lines[stage.report.lines.length - 1]) : "调整 BP 或关键呼叫，再试一次。历史结果不会改变，但过程可以更好。"}</p>
      </div>

      <div class="stat-grid">
        <div class="stat"><span>优势值</span><strong>${result.adv}</strong></div>
        <div class="stat"><span>冷静值</span><strong>${result.mind}</strong></div>
        <div class="stat"><span>任务</span><strong>${tasksDone}/${stage.tasks.length}</strong></div>
        <div class="stat"><span>团战</span><strong>${theater ? theater.score : "—"}</strong></div>
      </div>

      <div class="card mvp-card">
        <div class="card-eyebrow">本局 MVP</div>
        <div class="mvp-row">
          <span class="mvp-photo-wrap">
            <img class="mvp-photo" src="${esc(mvp.photo)}" alt="${esc(mvp.name)}" onerror="this.style.display='none'">
          </span>
          <div class="mvp-text">
            <span class="mvp-name">${esc(mvp.name)}</span>
            <span class="mvp-note">${esc(mvp.note)}</span>
          </div>
        </div>
      </div>

      ${eventRows ? `<div class="card event-recap"><div class="card-eyebrow">本局变奏</div>${eventRows}</div>` : ""}
      ${postEvent ? eventCard(postEvent, postChoice, "post") : ""}

      ${G.adHint ? `<div class="card hint-card"><div class="card-eyebrow">教练复盘提示</div><p>${esc(G.adHint)}</p></div>` : ""}

      <div class="result-actions">
        ${win && next ? `<button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.nextStage()">下一局 · ${esc(next.title)}</button>` : ""}
        ${win && isFinal ? `<button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.seriesWin('${stage.series}')">系列赛完成 · ${esc(BLG.series[stage.series].score)}</button>` : ""}
        <button class="btn btn-ghost btn-block" type="button" onclick="BLG.ui.retry()">重试本局</button>
        <button class="btn btn-ghost btn-block" type="button" onclick="BLG.ui.share()">生成战报卡</button>
        ${canAd.ok ? `<button class="btn btn-ad btn-block" type="button" onclick="BLG.ui.watchAd()">看视频 · 获取复盘提示（${canAd.remaining} 次）</button>` : ""}
      </div>

      <p class="hint">${canAd.ok ? "激励视频为可选，不影响通关与评级。" : esc(canAd.reason || "")}</p>
    `, "screen-result", stage, keepScroll);

    if (win && stage.id === "gen_g4" && !G.confettiPlayed) {
      G.confettiPlayed = true;
      launchGoldConfetti();
    }
  }

  function watchAd() {
    const slot = BLG.platform.slots.RESULT;
    const check = BLG.engine.canShowAd(G.progress, slot);
    if (!check.ok) {
      toast(check.reason);
      return;
    }
    BLG.platform.showRewardedAd(slot, (ok) => {
      if (!ok) {
        toast("已跳过，没有获得提示");
        return;
      }
      BLG.engine.consumeAd(G.progress);
      G.adHint = G.stage.report.lines[0] || "回看关键回合，优先完成历史任务。";
      toast("已获得复盘提示");
      renderResult(true);
    });
  }

  function retry() {
    if (!G.stage) return series();
    openBP();
  }

  function nextStage() {
    const id = nextStageId(G.stage.id);
    if (!id) return seriesWin(G.stage.series);
    openStage(id);
  }

  function seriesWin(seriesId) {
    const id = seriesId || (G.stage ? G.stage.series : "t1");
    const s = BLG.series[id] || BLG.series.t1;
    const opponent = s.opponent || "t1";
    const oppName = (BLG.teamById(opponent) || {}).name || opponent.toUpperCase();
    const lastStage = BLG.stages[s.stages[s.stages.length - 1]];
    const date = lastStage ? lastStage.date : "";
    const mvp = s.mvp || { name: "Knight", photo: "assets/players/knight.png" };

    setScreen(`
      <div class="win-screen">
        <div class="win-trophy${s.winBg ? " win-trophy-photo" : ""}">
          ${s.winBg ? `<img src="assets/ui/trophy-2026.png" alt="2026 全球总决赛冠军奖杯">` : trophyIcon()}
        </div>
        <div class="win-eyebrow">${esc(s.name)} · ${esc(date)}</div>
        <div class="win-logos">
          <img src="assets/teams/blg.png" alt="BLG" onerror="this.style.display='none'">
          <span class="win-vs">VS</span>
          <img src="assets/teams/${esc(opponent)}.png" alt="${esc(oppName)}" onerror="this.style.display='none'">
        </div>
        <div class="win-score">BLG <span>${esc(s.score)}</span> ${esc(oppName)}</div>
        <h1 class="win-title">${esc(s.winTitle || "十三年，到此为止。")}</h1>
        <p class="win-text">${esc(s.winText || "")}</p>
        <div class="win-mvp">
          <img src="${esc(mvp.photo)}" alt="${esc(mvp.name)}" onerror="this.style.display='none'">
          系列赛 MVP · ${esc(mvp.name)}
        </div>
        <button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.shareSeries('${id}')">生成系列赛战报</button>
        <button class="btn btn-ghost btn-block" type="button" onclick="BLG.ui.series('${id}')">返回系列赛</button>
        <p class="hint">${s.next ? "下一站：" + esc(s.next) : "三场系列赛全部完成"}</p>
      </div>
    `, "screen-win", s.winBg ? { bg: s.winBg } : null);
  }

  /* ---------------- 互动过场 G2 ---------------- */

  function startCutscene(stage) {
    G.cs = { stage, index: 0, focus: null };
    renderCutscene();
  }

  function renderCutscene(keepScroll) {
    const cs = G.cs;
    if (!cs) return series();
    const stage = cs.stage;
    const panel = stage.panels[cs.index];
    const last = cs.index >= stage.panels.length - 1;
    const focus = cs.focus ? stage.choices.find((c) => c.id === cs.focus) : null;

    const choices = last ? `
      <div class="cs-choices">
        <div class="card-eyebrow">选择你要看的镜头</div>
        ${stage.choices.map((c) => `
          <button class="cs-choice ${cs.focus === c.id ? "selected" : ""}" type="button" onclick="BLG.ui.cutsceneChoose('${c.id}')">
            ${esc(c.label)}
          </button>`).join("")}
        ${focus ? `<p class="cs-focus">${esc(focus.line)}</p>` : ""}
        ${focus ? `<button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.cutsceneFinish()">继续</button>` : ""}
      </div>` : `
      <button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.cutsceneNext()">下一幕</button>`;

    setScreen(`
      ${topbar("互动过场 · " + stage.code, `BLG.ui.series('${stage.series}')`, `<span class="pill">${cs.index + 1}/${stage.panels.length}</span>`)}
      <div class="cs-art art-${esc(panel.art)}">
        ${panel.bg ? `<img class="cs-bg" src="${esc(panel.bg)}" alt="" onerror="this.style.visibility='hidden'">` : ""}
        <div class="cs-grid"></div>
        <div class="cs-glow"></div>
        <span class="cs-art-label">${esc(panel.eyebrow)}</span>
      </div>
      <div class="cs-body">
        <div class="card-eyebrow">${esc(panel.eyebrow)}</div>
        <h1 class="cs-title">${esc(panel.title)}</h1>
        <p class="cs-text">${esc(panel.text)}</p>
        <div class="cs-dots">
          ${stage.panels.map((_, i) => `<span class="${i === cs.index ? "active" : ""}"></span>`).join("")}
        </div>
        ${choices}
      </div>
    `, "screen-cutscene", stage, keepScroll);
  }

  function cutsceneNext() {
    if (!G.cs) return;
    if (G.cs.index < G.cs.stage.panels.length - 1) {
      G.cs.index += 1;
      renderCutscene();
    }
  }

  function cutsceneChoose(id) {
    if (!G.cs) return;
    G.cs.focus = id;
    renderCutscene(true);
  }

  function cutsceneFinish() {
    if (!G.cs) return;
    const stage = G.cs.stage;
    const prev = G.progress.stages[stage.id] || { done: false, best: 0, plays: 0 };
    G.progress.stages[stage.id] = { done: true, best: 100, plays: (prev.plays || 0) + 1 };
    BLG.engine.saveProgress(G.progress);
    G.cs = null;

    const nextId = nextStageId(stage.id);
    const next = nextId ? BLG.stages[nextId] : null;
    const score = stage.resultLine || "T1 1 : 1 BLG";
    const title = stage.endTitle || "有些局，剧本不在你手里。";
    const text = stage.endText || "Faker 用两记世界波把系列赛拉回同一起跑线。下一局，BLG 需要把比赛拿回来。";

    setScreen(`
      <div class="cs-end">
        <div class="card-eyebrow">比分</div>
        <div class="cs-score">${esc(score)}</div>
        <h1 class="cs-end-title">${esc(title)}</h1>
        <p class="cs-end-text">${esc(text)}</p>
        ${next ? `<button class="btn btn-primary btn-block" type="button" onclick="BLG.ui.openStage('${nextId}')">进入 ${esc(next.code)} · ${esc(next.title)}</button>` : ""}
        <button class="btn btn-ghost btn-block" type="button" onclick="BLG.ui.series('${stage.series}')">返回系列赛</button>
      </div>
    `, "screen-cutscene-end", stage);
  }

  /* ---------------- 战报卡 ---------------- */

  function share() {
    if (!G.result) return;
    const stage = G.stage;
    const mvp = mvps(stage.id);
    const historical = G.result.log
      .filter((x) => x.kind === "choice" && x.historical)
      .map((x) => x.label);
    const call = historical.length ? historical[historical.length - 1] : (G.result.log[0] && G.result.log[0].label) || "历史线";
    const tasksDone = stage.tasks.filter((t) => G.result.tasks[t.id]).length;

    BLG.platform.shareCard({
      score: stage.report.score,
      subtitle: (BLG.series[stage.series] ? BLG.series[stage.series].name + " · " + BLG.series[stage.series].tagline : ""),
      series: stage.report.score,
      stage: stage.code + " · " + stage.title,
      grade: G.result.rating.grade,
      rating: G.result.rating.score,
      mvp: mvp.name,
      call,
      tasks: tasksDone + " / " + stage.tasks.length
    });
  }

  function shareSeries(seriesId) {
    const id = seriesId || (G.stage ? G.stage.series : "t1");
    const s = BLG.series[id] || BLG.series.t1;
    const opponent = s.opponent || "t1";
    const oppName = (BLG.teamById(opponent) || {}).name || opponent.toUpperCase();
    const mvp = s.mvp || { name: "Knight", photo: "assets/players/knight.png" };
    const lastStage = BLG.stages[s.stages[s.stages.length - 1]];

    BLG.platform.shareCard({
      score: `BLG ${s.score} ${oppName}`,
      subtitle: s.name + " · " + s.tagline,
      series: `BLG ${s.score} ${oppName}`,
      stage: "系列赛 · " + (s.winTitle || "十三年，到此为止。"),
      grade: "S",
      rating: 92,
      mvp: mvp.name,
      call: lastStage ? lastStage.code + "：" + lastStage.title : "系列赛",
      tasks: "12 / 12"
    });
  }

  /* ---------------- 调试 ---------------- */

  /* ---------------- 数据中心 ---------------- */

  function fmtNum(v, digits) {
    if (v == null || Number.isNaN(v)) return "—";
    return Number(v).toFixed(digits == null ? 2 : digits);
  }

  function fmtInt(v) {
    if (v == null || Number.isNaN(v)) return "—";
    return Math.round(v).toLocaleString("en-US");
  }

  function fmtPct(v) {
    return v == null ? "—" : Math.round(v * 100) + "%";
  }

  function fmtTime(sec) {
    if (sec == null) return "—";
    const s = Math.round(sec);
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function dataTile(label, value, rank, rankUnit) {
    const first = Number(rank) === 1;
    return `
      <div class="data-tile ${first ? "dt-first" : ""}">
        <span class="dt-label">${esc(label)}</span>
        <b class="dt-value">${value}</b>
        <em class="dt-rank">${rank ? (rankUnit || "第") + " " + rank : "—"}</em>
      </div>`;
  }

  function radarSvg(labels, primary, secondary, opts) {
    const cx = 220;
    const cy = 165;
    const R = 80;
    const n = labels.length;
    const meta = (opts && opts.meta) || [];
    const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const point = (i, v) => {
      const a = angle(i);
      return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
    };
    const poly = (vals) => vals.map((v, i) => point(i, Math.max(0.04, Math.min(1, v))).map((x) => x.toFixed(1)).join(",")).join(" ");

    const grids = [0.25, 0.5, 0.75, 1].map((lv) => `
      <polygon points="${labels.map((_, i) => point(i, lv).map((x) => x.toFixed(1)).join(",")).join(" ")}"
        fill="none" stroke="rgba(143,163,196,0.18)" stroke-width="1"/>`).join("");

    const axes = labels.map((_, i) => {
      const [x, y] = point(i, 1);
      return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(143,163,196,0.14)" stroke-width="1"/>`;
    }).join("");

    const labelEls = labels.map((label, i) => {
      const [x, y] = point(i, 1.52);
      const a = angle(i);
      const anchor = Math.cos(a) > 0.35 ? "start" : Math.cos(a) < -0.35 ? "end" : "middle";
      const item = meta[i] || {};
      const value = item.value == null || item.value === "" ? "" : item.value;
      const rank = item.rank ? "第 " + item.rank : "";
      return `<text class="radar-axis ${Number(item.rank) === 1 ? "radar-first" : ""}" x="${x.toFixed(1)}" y="${(y + 2).toFixed(1)}" text-anchor="${anchor}"
        fill="rgba(219,232,255,0.8)" font-size="10.5" font-weight="700">
        <tspan x="${x.toFixed(1)}" y="${(y + 2).toFixed(1)}">${esc(label)}</tspan>
        ${value ? `<tspan x="${x.toFixed(1)}" y="${(y + 14).toFixed(1)}" class="radar-axis-value">${esc(value)}</tspan>` : ""}
        ${rank ? `<tspan x="${x.toFixed(1)}" y="${(y + 25).toFixed(1)}" class="radar-axis-rank">${esc(rank)}</tspan>` : ""}
      </text>`;
    }).join("");

    return `
      <svg class="radar-svg" viewBox="0 0 440 360" role="img" aria-label="${esc(opts && opts.aria ? opts.aria : "数据雷达图")}">
        <defs>
          <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2f6bff" stop-opacity="0.5"/>
            <stop offset="1" stop-color="#59e1ff" stop-opacity="0.18"/>
          </linearGradient>
        </defs>
        ${grids}${axes}
        <polygon points="${poly(secondary)}" fill="rgba(246,199,104,0.06)" stroke="rgba(246,199,104,0.55)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <polygon points="${poly(primary)}" fill="url(#radarFill)" stroke="#59e1ff" stroke-width="1.8"/>
        ${primary.map((v, i) => {
          const [x, y] = point(i, Math.max(0.04, Math.min(1, v)));
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#59e1ff" stroke="#06101f" stroke-width="1"/>`;
        }).join("")}
        ${labelEls}
      </svg>`;
  }

  function playerRadarValue(key, value) {
    if (value == null) return "—";
    if (key === "kda") return fmtNum(value);
    if (key === "goldGapPerGame") return (value >= 0 ? "+" : "") + fmtNum(value);
    if (key === "wardPlacedPerBo") return fmtNum(value);
    if (key === "controlWardPurchasePerMinuteTeam") return fmtNum(value);
    return fmtPct(value);
  }

  function teamRadarValue(key, value) {
    if (value == null) return "—";
    if (key === "timePerGameTeam") return fmtTime(value);
    if (key === "bloodyTeam") return fmtNum(value);
    if (key === "earlyGameGoldGapPerGameTeam") return (value >= 0 ? "+" : "") + fmtNum(value);
    return fmtPct(value);
  }

  function statsTab(tab) {
    G.statsTab = tab;
    renderStats();
  }

  function selectStatsPlayer(id) {
    G.statsPlayerId = Number(id);
    renderStats();
  }

  function selectCmpRole(role) {
    G.cmpRole = role;
    renderStats();
  }

  function selectCmpTeam(id) {
    G.cmpTeamId = Number(id);
    renderStats();
  }

  function stats() {
    G.statsTab = "team";
    renderStats();
  }

  function renderStats() {
    if (!BLG.stats) {
      setScreen(`${topbar("数据中心", "BLG.ui.home()")}<p class="muted">数据未加载。</p>`, "screen-stats");
      return;
    }
    const st = BLG.stats;
    const tab = G.statsTab || "team";
    const tabs = [
      ["team", "战队数据"],
      ["player", "选手数据"],
      ["h2h", "选手对位"]
    ].map(([id, label]) => `
      <button class="data-tab ${tab === id ? "active" : ""}" type="button" onclick="BLG.ui.statsTab('${id}')">${label}</button>`).join("");

    let body = "";
    if (tab === "team") body = statsTeamBody();
    else if (tab === "player") body = statsPlayerBody();
    else body = statsH2HBody();

    setScreen(`
      ${topbar("数据中心", "BLG.ui.home()", `<span class="pill">2026 全球总决赛</span>`)}
      <div class="data-stage">
        <div class="ds-eyebrow">DATA CENTER · ${esc(st.meta.stageName)}</div>
        <div class="data-tabs">${tabs}</div>
        <div class="data-legend"><i></i>金色 = 同位置 / 赛段第 1</div>
      </div>
      ${body}
      <p class="data-source">
        数据来源：${esc(st.meta.source)} · ${esc(st.meta.stageName)} · 更新 ${esc(st.meta.updated)}
      </p>
    `, "screen-stats");
  }

  function statsTeamBody() {
    const st = BLG.stats;
    const t = st.teams.find((x) => x.name === "BLG") || st.teams[0];
    const tiles = [
      ["场均击杀", fmtNum(t.killPerGameTeam), t.ranks.killPerGameTeam],
      ["场均经济", fmtInt(t.goldPerGameTeam), t.ranks.goldPerGameTeam],
      ["场均推塔", fmtNum(t.turretDestroyPerGameTeam), t.ranks.turretDestroyPerGameTeam],
      ["场均插眼", fmtNum(t.wardPlacedPerGameTeam), t.ranks.wardPlacedPerGameTeam],
      ["场均排眼", fmtNum(t.wardKilledPerGameTeam), t.ranks.wardKilledPerGameTeam],
      ["场均时长", fmtTime(t.timePerGameTeam), t.ranks.timePerGameTeam],
      ["一血率", fmtPct(t.firstBloodRateTeam), t.ranks.firstBloodRateTeam],
      ["一塔率", fmtPct(t.firstTorrentRateTeam), t.ranks.firstTorrentRateTeam],
      ["一龙率", fmtPct(t.firstDragonControlRate), t.ranks.firstDragonControlRate],
      ["大龙控制率", fmtPct(t.baronControlRate), t.ranks.baronControlRate],
      ["小龙控制率", fmtPct(t.drakeControlRate), t.ranks.drakeControlRate],
      ["先锋控制率", fmtPct(t.riftHeraldControlRate), t.ranks.riftHeraldControlRate]
    ].map(([label, value, rank]) => dataTile(label, value, rank, "赛段第")).join("");

    const table = st.teams.slice().sort((a, b) => b.winningRate - a.winningRate || b.killPerGameTeam - a.killPerGameTeam).map((x, i) => `
      <div class="team-row ${x.name === "BLG" ? "is-blg" : ""}">
        <span class="tr-rank">${i + 1}</span>
        <span class="tr-team"><img src="${esc(x.logo)}" alt="" onerror="this.style.display='none'">${esc(x.name)}</span>
        <span class="tr-record">${x.matchWinCount}-${x.matchCount - x.matchWinCount}</span>
        <span class="tr-num">${fmtNum(x.killPerGameTeam)}</span>
        <span class="tr-num">${fmtPct(x.drakeControlRate)}</span>
      </div>`).join("");

    return `
      <div class="data-hero">
        <img class="data-team-logo" src="${esc(t.logo)}" alt="BLG" onerror="this.style.display='none'">
        <div class="data-hero-main">
          <div class="dh-eyebrow">BLG · 2026 全球总决赛</div>
          <h1 class="data-title">${esc(t.name)}</h1>
          <p class="data-sub">${t.matchWinCount} 胜 ${t.matchCount - t.matchWinCount} 负 · 小局 ${t.gameWinCount}-${t.gameCount - t.gameWinCount} · ${t.gameCount} 局</p>
        </div>
        <div class="data-hero-badge"><b>${Math.round(t.winningRate * 100)}%</b><span>系列赛胜率</span></div>
      </div>
      <div class="data-grid">${tiles}</div>
      <div class="card radar-card">
        <div class="radar-head">
          <div><div class="card-eyebrow">战队五维</div><b>BLG vs 赛段平均</b></div>
          <div class="radar-legend"><span class="rl-dot blue"></span>BLG<span class="rl-dot gold"></span>平均</div>
        </div>
        ${radarSvg(
          t.radarAxes.map((a) => a.label),
          t.radar,
          st.teamAvg,
          {
            aria: "BLG战队数据雷达图",
            meta: t.radarAxes.map((a) => ({ value: teamRadarValue(a.key, a.value), rank: a.rank }))
          }
        )}
        <div class="radar-note">数值为官方原始值 · 排名采用 LPL 官方页面展示</div>
      </div>
      <div class="card data-table">
        <div class="card-eyebrow">八强战队对比</div>
        <div class="team-table-head"><span>#</span><span>战队</span><span>战绩</span><span>击杀</span><span>小龙</span></div>
        ${table}
      </div>`;
  }

  function statsPlayerBody() {
    const st = BLG.stats;
    const blgPlayers = st.players.filter((p) => String(p.teamId) === "57");
    const p = blgPlayers.find((x) => x.id === G.statsPlayerId) || blgPlayers[0];
    if (!p) return '<p class="muted">暂无选手数据。</p>';

    const selector = blgPlayers.map((x) => `
      <button class="player-chip ${x.id === p.id ? "active" : ""}" type="button" onclick="BLG.ui.selectStatsPlayer(${x.id})">
        <span class="pc-photo"><img src="${esc(x.photo)}" alt="${esc(x.name)}" onerror="this.style.display='none'"></span>
        <span class="pc-name">${esc(x.name)}</span>
        <span class="pc-role">${esc(x.roleName)}</span>
      </button>`).join("");

    const tiles = [
      ["总击杀", fmtInt(p.totalKills), p.ranks.totalKills],
      ["总死亡", fmtInt(p.totalDeath), p.ranks.totalDeath],
      ["总助攻", fmtInt(p.totalAssists), p.ranks.totalAssists],
      ["分均伤害", fmtNum(p.damagePerMinute), p.ranks.damagePerMinute],
      ["伤害占比", fmtPct(p.damagePercent), p.ranks.damagePercent],
      ["伤害转化率", fmtPct(p.damagePerGold), p.ranks.damagePerGold],
      ["分均承伤", fmtNum(p.damageTakenPerMinute), p.ranks.damageTakenPerMinute],
      ["承伤占比", fmtPct(p.damageTakenPercent), p.ranks.damageTakenPercent],
      ["参团率", fmtPct(p.killParticipantPercent), p.ranks.killParticipantPercent],
      ["分均经济", fmtNum(p.goldPerMinute), p.ranks.goldPerMinute],
      ["经济占比", fmtPct(p.goldPercent), p.ranks.goldPercent],
      ["视野得分", fmtNum(p.visionScorePerGame), p.ranks.visionScorePerGame]
    ].map(([label, value, rank]) => dataTile(label, value, rank, "同位置第")).join("");

    const heroes = (p.heroPool || []).map((h) => `
      <div class="hero-stat">
        <img src="${esc(h.icon)}" alt="${esc(h.cn)}" onerror="this.style.display='none'">
        <b>${esc(h.cn)}</b>
        <span>${h.games} 场 · ${Math.round(h.winRate * 100)}%</span>
      </div>`).join("");

    return `
      <div class="data-hero player">
        <img class="data-player-photo" src="${esc(p.photo)}" alt="${esc(p.name)}" onerror="this.style.display='none'">
        <div class="data-hero-main">
          <div class="dh-eyebrow">${esc(p.teamName)} · ${esc(p.roleName)}</div>
          <h1 class="data-title">${esc(p.name)}</h1>
          <p class="data-sub">KDA ${fmtNum(p.kda)} · ${p.matchCount} 场系列赛 · MVP ${p.mvpCount}</p>
        </div>
        <div class="data-hero-badge"><b>${fmtNum(p.kda)}</b><span>K/D/A</span></div>
      </div>
      <div class="player-selector">${selector}</div>
      <div class="data-grid">${tiles}</div>
      <div class="card radar-card">
        <div class="radar-head">
          <div><div class="card-eyebrow">选手五维</div><b>${esc(p.name)} vs 同位置平均</b></div>
          <div class="radar-legend"><span class="rl-dot blue"></span>${esc(p.name)}<span class="rl-dot gold"></span>平均</div>
        </div>
        ${radarSvg(
          p.radarAxes.map((a) => a.label),
          p.radar,
          st.roleAvg[p.role] || [0, 0, 0, 0, 0],
          {
            aria: p.name + "选手数据雷达图",
            meta: p.radarAxes.map((a) => ({ value: playerRadarValue(a.key, a.value), rank: a.rank }))
          }
        )}
        <div class="radar-note">数值为官方原始值 · 排名采用 LPL 官方页面展示</div>
      </div>
      <div class="card data-table">
        <div class="card-eyebrow">使用英雄 · 淘汰赛</div>
        <div class="hero-stat-scroll">${heroes || '<p class="muted">暂无英雄数据</p>'}</div>
      </div>`;
  }

  function statsH2HBody() {
    const st = BLG.stats;
    const roles = st.roleOrder;
    const role = G.cmpRole || "TOP";
    const left = st.players.find((p) => String(p.teamId) === "57" && p.role === role);
    const opponentOrder = ["692", "591", "137", "2", "42", "699", "1127"];
    const opponents = opponentOrder.map((id) => st.teams.find((t) => String(t.id) === id)).filter(Boolean);
    const rightTeam = opponents.find((t) => String(t.id) === String(G.cmpTeamId)) || opponents[0];
    const right = st.players.find((p) => String(p.teamId) === String(rightTeam.id) && p.role === role);

    const roleTabs = roles.map((r) => `
      <button class="role-tab ${r === role ? "active" : ""}" type="button" onclick="BLG.ui.selectCmpRole('${r}')">${esc(st.roleName[r])}</button>`).join("");

    const teamPicker = `
      <div class="h2h-team-picker">
        <span class="h2h-team-picker-label">对手</span>
        ${opponents.map((t) => `
          <button class="h2h-team-chip ${String(t.id) === String(rightTeam.id) ? "active" : ""}" type="button" onclick="BLG.ui.selectCmpTeam('${t.id}')">
            <img src="${esc(t.logo)}" alt="" onerror="this.style.display='none'">
            ${esc(t.name)}
          </button>`).join("")}
      </div>`;

    if (!left || !right) {
      return `${roleTabs}${teamPicker}<p class="muted">该战队暂无${esc(st.roleName[role])}位置的对位数据。</p>`;
    }

    const metricByRole = {
      TOP: [
        ["K/D/A", "kda", (v) => fmtNum(v)],
        ["参团率", "killParticipantPercent", fmtPct],
        ["伤害占比", "damagePercent", fmtPct],
        ["承伤占比", "damageTakenPercent", fmtPct],
        ["对位经济差", "goldGapPerGame", (v) => (v >= 0 ? "+" : "") + fmtNum(v)]
      ],
      JUG: [
        ["K/D/A", "kda", (v) => fmtNum(v)],
        ["参团率", "killParticipantPercent", fmtPct],
        ["伤害占比", "damagePercent", fmtPct],
        ["承伤占比", "damageTakenPercent", fmtPct],
        ["对位经济差", "goldGapPerGame", (v) => (v >= 0 ? "+" : "") + fmtNum(v)]
      ],
      MID: [
        ["K/D/A", "kda", (v) => fmtNum(v)],
        ["参团率", "killParticipantPercent", fmtPct],
        ["伤害占比", "damagePercent", fmtPct],
        ["伤害转化率", "damagePerGold", fmtPct],
        ["对位经济差", "goldGapPerGame", (v) => (v >= 0 ? "+" : "") + fmtNum(v)]
      ],
      ADC: [
        ["K/D/A", "kda", (v) => fmtNum(v)],
        ["参团率", "killParticipantPercent", fmtPct],
        ["伤害占比", "damagePercent", fmtPct],
        ["伤害转化率", "damagePerGold", fmtPct],
        ["对位经济差", "goldGapPerGame", (v) => (v >= 0 ? "+" : "") + fmtNum(v)]
      ],
      SUP: [
        ["K/D/A", "kda", (v) => fmtNum(v)],
        ["参团率", "killParticipantPercent", fmtPct],
        ["承伤占比", "damageTakenPercent", fmtPct],
        ["场均插眼", "wardPlacedPerBo", fmtNum],
        ["分均购买控制守卫", "controlWardPurchasePerMinuteTeam", fmtNum]
      ]
    };

    const metrics = metricByRole[role] || metricByRole.MID;
    const rows = metrics.map(([label, key, fmt]) => {
      const la = (left.radarAxes || []).find((a) => a.key === key) || {};
      const ra = (right.radarAxes || []).find((a) => a.key === key) || {};
      const lv = la.value != null ? la.value : left[key];
      const rv = ra.value != null ? ra.value : right[key];
      const lp = la.normalized != null ? la.normalized : 0.01;
      const rp = ra.normalized != null ? ra.normalized : 0.01;
      const total = lp + rp || 1;
      const lw = (lp / total) * 100;
      const rw = (rp / total) * 100;
      const lRank = la.rank || left.ranks[key];
      const rRank = ra.rank || right.ranks[key];
      return `
        <div class="cmp-metric">
          <div class="cmp-top"><span>${esc(label)}</span><span class="cmp-ranks">${lRank ? "第" + lRank : ""} / ${rRank ? "第" + rRank : ""}</span></div>
          <div class="cmp-row">
            <span class="cmp-val left ${Number(lRank) === 1 ? "is-first" : ""}">${fmt(lv)}</span>
            <div class="cmp-track">
              <i class="cmp-fill left" style="width:${lw.toFixed(1)}%"></i>
              <i class="cmp-fill right" style="width:${rw.toFixed(1)}%"></i>
            </div>
            <span class="cmp-val right ${Number(rRank) === 1 ? "is-first" : ""}">${fmt(rv)}</span>
          </div>
        </div>`;
    }).join("");

    return `
      <div class="role-tabs">${roleTabs}</div>
      ${teamPicker}
      <div class="h2h-hero">
        <div class="h2h-side blue">
          <img class="h2h-photo" src="${esc(left.photo)}" alt="${esc(left.name)}" onerror="this.style.display='none'">
          <span class="h2h-team"><img src="${esc(left.teamLogo)}" alt="" onerror="this.style.display='none'">${esc(left.teamName)}</span>
          <b>${esc(left.name)}</b>
          <span>${esc(left.roleName)} · KDA ${fmtNum(left.kda)}</span>
        </div>
        <div class="h2h-vs">VS</div>
        <div class="h2h-side red">
          <img class="h2h-photo" src="${esc(right.photo)}" alt="${esc(right.name)}" onerror="this.style.display='none'">
          <span class="h2h-team"><img src="${esc(right.teamLogo)}" alt="" onerror="this.style.display='none'">${esc(right.teamName)}</span>
          <b>${esc(right.name)}</b>
          <span>${esc(right.roleName)} · KDA ${fmtNum(right.kda)}</span>
        </div>
      </div>
      <div class="card cmp-card">
        <div class="card-eyebrow">同位置对比 · ${esc(st.roleName[role])}</div>
        ${rows}
        <div class="cmp-note">条形长度按同位置标准化值计算，数值为官方原始数据。</div>
      </div>`;
  }

  function dataNotes() {
    const old = document.getElementById("notes-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "notes-overlay";
    overlay.className = "notes-overlay";
    overlay.innerHTML = `
      <div class="notes-card">
        <div class="notes-head">
          <strong>赛况与推演说明</strong>
          <button class="icon-btn" id="notes-close" type="button" aria-label="关闭">×</button>
        </div>
        <p class="notes-lead">
          游戏里的信息分两类：公开报道中的真实赛况，以及为了让“教练视角”可玩而做的推演。
        </p>
        <div class="notes-block real">
          <b>真实</b>
          <ul>
            <li>三场系列赛比分与晋级结果：DK 3:0、T1 3:1、GEN 3:1。</li>
            <li>BP、首发阵容、选手 MemberId 与官方头像。</li>
            <li>关键时间点与事件：22:05 Faker 游龙、26:48 脸探草丛、8:21 萨勒芬妮大四人、41:03 抢大龙等。</li>
            <li>DK 三局时长、12:1 小龙、Knight 决赛 FMVP 等公开数据。</li>
          </ul>
        </div>
        <div class="notes-block sim">
          <b>推演</b>
          <ul>
            <li>“队内通讯”文字、说话人分配与精确到秒的时间：不是官方语音。</li>
            <li>经济差、视野百分比、资源计数、地图重心：为关卡节奏设计的模拟态势。</li>
            <li>ADV、冷静值、团战评分、历史任务与复刻度：玩法数值。</li>
          </ul>
        </div>
        <div class="notes-block source">
          <b>来源</b>
          <p>直播吧、4Gamers、澎湃新闻、IT之家、Dot Esports、GosuGamers 等公开报道；未使用官方队内语音、转播画面或未公开训练数据。</p>
        </div>
        <button class="btn btn-primary btn-block" id="notes-ok" type="button">知道了</button>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector("#notes-close").addEventListener("click", close);
    overlay.querySelector("#notes-ok").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
  }

  function exportSave() {
    const raw = BLG.engine.exportProgress(G.progress);
    const old = document.getElementById("save-overlay");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "save-overlay";
    overlay.className = "notes-overlay";
    overlay.innerHTML = `
      <div class="notes-card">
        <div class="notes-head">
          <strong>导出存档</strong>
          <button class="icon-btn" id="save-close" type="button" aria-label="关闭">×</button>
        </div>
        <p class="notes-lead">复制下面的存档码。换浏览器、换地址或清除缓存后，在本页点“导入存档”即可恢复。</p>
        <textarea class="save-code" id="save-code" readonly>${esc(raw)}</textarea>
        <button class="btn btn-primary btn-block" id="save-copy" type="button">复制存档码</button>
      </div>`;
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector("#save-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelector("#save-copy").addEventListener("click", async () => {
      const ta = overlay.querySelector("#save-code");
      try {
        await navigator.clipboard.writeText(raw);
        toast("存档码已复制");
      } catch (e) {
        ta.focus();
        ta.select();
        try {
          document.execCommand("copy");
          toast("存档码已复制");
        } catch (err) {
          toast("请长按文本框手动复制");
        }
      }
    });
  }

  function importSave() {
    const raw = window.prompt("粘贴存档码：");
    if (!raw) return;
    try {
      G.progress = BLG.engine.importProgress(raw.trim());
      home();
      toast("存档已导入");
    } catch (e) {
      toast("存档码无效，请重新复制");
    }
  }

  function reset() {
    if (!window.confirm("重置所有进度？")) return;
    G.progress = BLG.engine.resetProgress();
    home();
    toast("进度已重置");
  }

  function unlockAll() {
    ["dk_g1", "dk_g2", "dk_g3", "t1_g1", "t1_g2", "t1_g3", "t1_g4", "gen_g1", "gen_g2", "gen_g3", "gen_g4"].forEach((id) => {
      G.progress.stages[id] = { done: true, best: 85, plays: 1 };
    });
    BLG.engine.saveProgress(G.progress);
    series(G.seriesId || "dk");
    toast("已解锁全部关卡");
  }

  const ui = {
    init() {
      G.progress = BLG.engine.loadProgress();
      home();
    },
    home,
    series,
    openStage,
    briefAgain,
    openBP,
    selectBP,
    chooseEvent,
    historyBP,
    lockBP,
    choose,
    nextRound,
    confirmQuit,
    selectCall,
    runTheater,
    finish,
    retry,
    nextStage,
    seriesWin,
    levels,
    openLevel,
    watchAd,
    share,
    shareSeries,
    startCutscene,
    cutsceneNext,
    cutsceneChoose,
    cutsceneFinish,
    exportSave,
    importSave,
    reset,
    unlockAll,
    dataNotes,
    stats,
    statsTab,
    selectStatsPlayer,
    selectCmpRole,
    selectCmpTeam,
    toast
  };

  BLG.ui = ui;
})();
