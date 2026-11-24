/* 纯逻辑层：ADV、心态、团战评分、复刻度、进度存档 */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  const KEY = "blg2026.progress.v1";
  const BACKUP_KEY = "blg2026.progress.backup.v1";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function defaultProgress() {
    return {
      firstLaunch: Date.now(),
      stages: {},
      ad: { date: "", count: 0 },
      lastPlayed: null,
      recentEvents: []
    };
  }

  function today() {
    const d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function readProgress(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p || typeof p !== "object" || typeof p.stages !== "object") return null;
      const base = defaultProgress();
      return Object.assign(base, p, {
        stages: p.stages || {},
        ad: p.ad || base.ad
      });
    } catch (e) {
      return null;
    }
  }

  function loadProgress() {
    const primary = readProgress(KEY);
    const backup = readProgress(BACKUP_KEY);
    if (!primary) return backup || defaultProgress();
    if (backup && (backup.updatedAt || 0) > (primary.updatedAt || 0)) return backup;
    return primary;
  }

  function saveProgress(p) {
    try {
      p.updatedAt = Date.now();
      const raw = JSON.stringify(p);
      localStorage.setItem(KEY, raw);
      localStorage.setItem(BACKUP_KEY, raw);
    } catch (e) {
      /* 本地存储不可用时静默降级 */
    }
  }

  function resetProgress() {
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(BACKUP_KEY);
    } catch (e) {}
    return defaultProgress();
  }

  function exportProgress(p) {
    return JSON.stringify(p);
  }

  function importProgress(raw) {
    const p = JSON.parse(raw);
    if (!p || typeof p !== "object" || !p.stages || typeof p.stages !== "object") {
      throw new Error("invalid save");
    }
    const base = defaultProgress();
    const merged = Object.assign(base, p, {
      stages: p.stages || {},
      ad: p.ad || base.ad
    });
    saveProgress(merged);
    return merged;
  }

  function stageDone(progress, id) {
    return !!(progress.stages[id] && progress.stages[id].done);
  }

  function isUnlocked(progress, id) {
    /* 已完成的关卡始终可进入：兼容旧版本只有 T1 的存档 */
    if (stageDone(progress, id)) return true;
    if (id === "dk_g1") return true;
    if (id === "dk_g2") return stageDone(progress, "dk_g1");
    if (id === "dk_g3") return stageDone(progress, "dk_g2");
    if (id === "t1_g1") return stageDone(progress, "dk_g3");
    if (id === "t1_g2") return stageDone(progress, "t1_g1");
    if (id === "t1_g3") return stageDone(progress, "t1_g2");
    if (id === "t1_g4") return stageDone(progress, "t1_g3");
    if (id === "gen_g1") return stageDone(progress, "t1_g4");
    if (id === "gen_g2") return stageDone(progress, "gen_g1");
    if (id === "gen_g3") return stageDone(progress, "gen_g2");
    if (id === "gen_g4") return stageDone(progress, "gen_g3");
    return false;
  }

  function pickEvent(pool, recent) {
    if (!pool || !pool.length) return null;
    const fresh = pool.filter((e) => recent.indexOf(e.id) < 0);
    const list = fresh.length ? fresh : pool;
    return list[Math.floor(Math.random() * list.length)];
  }

  function drawEvents(stage, progress) {
    const pool = stage.eventPool || [];
    if (!pool.length) return null;
    const recent = (progress && progress.recentEvents) || [];
    const pick = (type) => pickEvent(pool.filter((e) => e.type === type), recent);
    const round = pick("round");
    const eventRound = round
      ? (round.insertBefore == null ? Math.floor(Math.random() * stage.rounds.length) : round.insertBefore)
      : -1;
    return { prep: pick("prep"), round, post: pick("post"), eventRound };
  }

  function createRun(stage, progress) {
    return {
      stageId: stage.id,
      adv: clamp(stage.startAdv == null ? 50 : stage.startAdv, 0, 100),
      mind: clamp(stage.startMind == null ? 55 : stage.startMind, 0, 100),
      roundIndex: 0,
      tasks: {},
      bp: null,
      theater: null,
      finished: false,
      win: null,
      log: [],
      events: drawEvents(stage, progress),
      eventChoices: {},
      eventTasks: []
    };
  }

  function applyEventChoice(run, event, optionId, slot) {
    if (!event) return run;
    const option = (event.options || []).find((o) => o.id === optionId);
    if (!option) return run;
    const eff = option.effect || {};
    run.adv = clamp(run.adv + (eff.adv || 0), 0, 100);
    run.mind = clamp(run.mind + (eff.mind || 0), 0, 100);
    if (option.task) {
      markTask(run, option.task);
      if (run.eventTasks.indexOf(option.task) < 0) run.eventTasks.push(option.task);
    }
    run.eventChoices[slot] = {
      eventId: event.id,
      optionId: option.id,
      label: option.label,
      result: option.result || ""
    };
    run.log.push({ kind: "event", slot, label: option.label, adv: run.adv, mind: run.mind });
    return run;
  }

  function markTask(run, id) {
    if (id) run.tasks[id] = true;
  }

  function applyBP(run, stage, option) {
    if (!option || run.bp) return run;
    run.bp = option.id;
    run.adv = clamp(run.adv + (option.effect.adv || 0), 0, 100);
    run.mind = clamp(run.mind + (option.effect.mind || 0), 0, 100);
    if (option.task) markTask(run, option.task);
    run.log.push({ kind: "bp", label: option.label, adv: run.adv, mind: run.mind });
    return run;
  }

  function applyChoice(run, round, option) {
    run.adv = clamp(run.adv + (option.effect.adv || 0), 0, 100);
    run.mind = clamp(run.mind + (option.effect.mind || 0), 0, 100);
    if (option.task) markTask(run, option.task);
    run.log.push({
      kind: "choice",
      time: round.time,
      label: option.label,
      adv: run.adv,
      mind: run.mind,
      historical: !!option.historical
    });
    return run;
  }

  /**
   * 团战剧场：三次教练呼叫。
   * selections: { target: "peyz", style: "counter", loot: "end" }
   */
  function resolveTheater(run, stage, selections) {
    const t = stage.theater;
    let bonus = 0;
    const hits = [];
    let historicalCount = 0;

    t.calls.forEach((call) => {
      const chosen = (call.options || []).find((o) => o.id === selections[call.id]);
      if (!chosen) return;
      bonus += chosen.bonus || 0;
      if (chosen.historical) {
        historicalCount += 1;
        hits.push(chosen.label);
      }
    });

    let score = 32 + bonus;
    if (historicalCount >= 3) score += 8;
    else if (historicalCount === 2) score += 5;
    if (run.mind >= 50) score += 4;
    else if (run.mind < 30) score -= 6;
    score += Math.floor(Math.random() * 5) - 2; // -2 ~ +2
    score = clamp(score, 0, 100);

    const advDelta = score >= 70 ? 10 : score >= 55 ? 5 : score >= 45 ? -2 : -8;
    const mindDelta = score >= 70 ? 6 : score >= 55 ? 3 : score >= 45 ? -2 : -6;
    run.adv = clamp(run.adv + advDelta, 0, 100);
    run.mind = clamp(run.mind + mindDelta, 0, 100);

    const verdict =
      score >= 70 ? "大胜" :
      score >= 55 ? "小胜" :
      score >= 45 ? "互换" : "溃败";

    const summary =
      score >= 70 ? "BLG 的阵型完整，T1 被一波打穿。" :
      score >= 55 ? "BLG 拿到团战胜利，但没能一波结束。" :
      score >= 45 ? "双方互换技能，团战没有拉开差距。" :
      "BLG 的进场被对手化解，团战溃败。";

    const result = {
      score,
      verdict,
      summary,
      hits,
      historicalCount,
      advDelta,
      mindDelta,
      target: t.target || 55,
      passed: score >= (t.target || 55)
    };
    run.theater = result;
    if (result.passed) markTask(run, "theater");
    run.log.push({ kind: "theater", label: verdict, score, adv: run.adv, mind: run.mind });
    return result;
  }

  function computeRating(run, stage) {
    const tasks = stage.tasks || [];
    const done = tasks.filter((t) => run.tasks[t.id]).length;
    const taskScore = tasks.length ? done / tasks.length : 1;
    const advScore = clamp((run.adv - 35) / 50, 0, 1);
    const theaterScore = stage.theater
      ? clamp((run.theater && run.theater.score ? run.theater.score : 0) / 100, 0, 1)
      : 1;

    const total = stage.theater
      ? taskScore * 60 + advScore * 20 + theaterScore * 20
      : taskScore * 70 + advScore * 30;

    const score = Math.round(total);
    const grade = score >= 85 ? "S" : score >= 70 ? "A" : score >= 55 ? "B" : "C";

    return {
      score,
      grade,
      tasksDone: done,
      tasksTotal: tasks.length,
      parts: {
        tasks: Math.round(taskScore * 100),
        adv: Math.round(advScore * 100),
        theater: Math.round(theaterScore * 100)
      }
    };
  }

  function canWin(run) {
    return run.adv >= 40 && run.mind > 0;
  }

  function computeStars(run, stage, rating, win) {
    if (!win) return 0;
    const base = stage.tasks || [];
    const baseAll = base.length === 0 || base.every((t) => run.tasks[t.id]);
    const eventDone = (run.eventTasks || []).filter((id) => run.tasks[id]).length;
    if (baseAll && eventDone >= 1 && rating.score >= 85) return 3;
    if (rating.score >= 70 || baseAll) return 2;
    return 1;
  }

  function buildResult(run, stage) {
    const win = canWin(run);
    const rating = computeRating(run, stage);
    return {
      stageId: stage.id,
      win,
      adv: run.adv,
      mind: run.mind,
      tasks: run.tasks,
      theater: run.theater,
      log: run.log,
      rating,
      stars: computeStars(run, stage, rating, win),
      events: run.events,
      eventChoices: run.eventChoices,
      eventTasks: run.eventTasks,
      canonical: stage.result === "win" ? win : !win
    };
  }

  function recordResult(progress, stage, result) {
    const prev = progress.stages[stage.id] || { done: false, best: 0, plays: 0, stars: 0 };
    const best = Math.max(prev.best || 0, result.rating.score);
    progress.stages[stage.id] = {
      done: prev.done || result.win || stage.type === "cutscene",
      best,
      plays: (prev.plays || 0) + 1,
      stars: Math.max(prev.stars || 0, result.stars || 0)
    };
    if (result.events) {
      const ids = [result.events.prep, result.events.round, result.events.post]
        .filter(Boolean)
        .map((e) => e.id);
      const recent = (progress.recentEvents || []).concat(ids);
      progress.recentEvents = recent.slice(-6);
    }
    progress.lastPlayed = stage.id;
    saveProgress(progress);
    return progress;
  }

  function canShowAd(progress, slot) {
    const p = progress;
    if (p.ad.date !== today()) {
      p.ad.date = today();
      p.ad.count = 0;
    }
    if (p.ad.count >= 3) return { ok: false, reason: "今天的激励视频次数已用完" };
    const first = p.firstLaunch || 0;
    const search = typeof location !== "undefined" ? location.search : "";
    if (Date.now() - first < 10 * 60 * 1000 && !/[?&]ads=1/.test(search)) {
      return { ok: false, reason: "首次体验前 10 分钟不展示广告" };
    }
    return { ok: true, remaining: 3 - p.ad.count };
  }

  function consumeAd(progress) {
    progress.ad.count = (progress.ad.count || 0) + 1;
    saveProgress(progress);
  }

  const api = {
    clamp,
    today,
    defaultProgress,
    loadProgress,
    saveProgress,
    resetProgress,
    exportProgress,
    importProgress,
    stageDone,
    isUnlocked,
    createRun,
    applyEventChoice,
    applyBP,
    applyChoice,
    resolveTheater,
    computeRating,
    canWin,
    buildResult,
    recordResult,
    canShowAd,
    consumeAd
  };

  BLG.engine = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
