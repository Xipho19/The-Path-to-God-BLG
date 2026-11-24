/* 无依赖逻辑测试：node tests/engine.test.js */
const assert = require("assert");

require("../js/data/stages.t1.js");
require("../js/data/stages.gen.js");
const eng = require("../js/engine/engine.js");

const BLG = globalThis.BLG;
const stageIds = ["t1_g1", "t1_g2", "t1_g3", "t1_g4"];

function play(stageId, mode) {
  const stage = BLG.stages[stageId];
  const run = eng.createRun(stage);
  const pick = (list) => {
    if (mode === "worst") {
      return list.reduce((a, b) => ((b.effect ? b.effect.adv : b.bonus) < (a.effect ? a.effect.adv : a.bonus) ? b : a));
    }
    return list.find((x) => x.historical) || list[0];
  };

  eng.applyBP(run, stage, pick(stage.bpOptions));
  stage.rounds.forEach((round) => {
    eng.applyChoice(run, round, pick(round.options));
  });

  if (stage.theater) {
    const sel = {};
    stage.theater.calls.forEach((call) => {
      sel[call.id] = pick(call.options).id;
    });
    eng.resolveTheater(run, stage, sel);
  }

  return { run, result: eng.buildResult(run, stage) };
}

// 1. 数据完整性
stageIds.forEach((id) => {
  const s = BLG.stages[id];
  assert(s, "missing stage " + id);
  if (s.type === "play") {
    assert(s.bpOptions.some((o) => o.historical), id + " needs historical BP");
    s.rounds.forEach((r) => {
      assert(r.options.length >= 2, id + " round " + r.time + " needs options");
      assert(r.options.some((o) => o.historical), id + " round " + r.time + " needs historical option");
    });
    s.theater.calls.forEach((c) => {
      assert(c.options.some((o) => o.historical), id + " theater call " + c.id + " needs historical");
    });
  }
});

// 2. 历史线必须赢，并且评级不低于 A
["t1_g1", "t1_g3", "t1_g4"].forEach((id) => {
  Math.random = () => 0.5;
  const { result } = play(id, "history");
  assert.strictEqual(result.win, true, id + " historical should win");
  assert(["S", "A"].includes(result.rating.grade), id + " historical grade too low: " + result.rating.grade);
});

// 3. 全错线应当失败（至少 G3/G4 要能输）
["t1_g3", "t1_g4"].forEach((id) => {
  Math.random = () => 0.5;
  const { result } = play(id, "worst");
  assert.strictEqual(result.win, false, id + " worst line should lose");
});

// 4. 解锁链（DK → T1 → GEN）
const p = eng.defaultProgress();
assert.strictEqual(eng.isUnlocked(p, "dk_g1"), true);
assert.strictEqual(eng.isUnlocked(p, "t1_g1"), false);
p.stages.dk_g1 = { done: true, best: 90, plays: 1 };
assert.strictEqual(eng.isUnlocked(p, "dk_g2"), true);
p.stages.dk_g2 = { done: true, best: 90, plays: 1 };
assert.strictEqual(eng.isUnlocked(p, "dk_g3"), true);
assert.strictEqual(eng.isUnlocked(p, "t1_g1"), false);
p.stages.dk_g3 = { done: true, best: 90, plays: 1 };
assert.strictEqual(eng.isUnlocked(p, "t1_g1"), true);
assert.strictEqual(eng.isUnlocked(p, "t1_g2"), false);
p.stages.t1_g1 = { done: true, best: 90, plays: 1 };
assert.strictEqual(eng.isUnlocked(p, "t1_g2"), true);
p.stages.t1_g2 = { done: true, best: 100, plays: 1 };
assert.strictEqual(eng.isUnlocked(p, "t1_g3"), true);
p.stages.t1_g3 = { done: true, best: 90, plays: 1 };
p.stages.t1_g4 = { done: true, best: 90, plays: 1 };
assert.strictEqual(eng.isUnlocked(p, "gen_g1"), true);
assert.strictEqual(eng.isUnlocked(p, "gen_g2"), false);

// 4b. 旧版只有 T1 的存档：已完成关卡不能被前置条件反锁
const legacy = eng.defaultProgress();
legacy.stages.t1_g1 = { done: true, best: 85, plays: 1 };
assert.strictEqual(eng.isUnlocked(legacy, "t1_g1"), true);

// 5. 评分区间
Math.random = () => 0.5;
const { result } = play("t1_g4", "history");
assert(result.rating.score >= 0 && result.rating.score <= 100);
assert(result.rating.tasksDone === BLG.stages.t1_g4.tasks.length);

// 6. 事件池与三星
Math.random = () => 0.5;
const g4 = BLG.stages.gen_g4;
assert.strictEqual(g4.eventPool.length, 9, "GEN G4 needs 9 events");
const evRun = eng.createRun(g4, { recentEvents: [] });
assert(evRun.events.prep && evRun.events.round && evRun.events.post, "event types missing");
assert.strictEqual(evRun.events.eventRound, 1, "round event insertion");
eng.applyEventChoice(evRun, evRun.events.prep, evRun.events.prep.options[1].id, "prep");
eng.applyEventChoice(evRun, evRun.events.round, evRun.events.round.options[0].id, "round");
assert(evRun.eventTasks.length >= 2, "event tasks should be marked");
eng.applyBP(evRun, g4, g4.bpOptions.find((o) => o.historical));
g4.rounds.forEach((r) => eng.applyChoice(evRun, r, r.options.find((o) => o.historical)));
const theaterSel = {};
g4.theater.calls.forEach((c) => { theaterSel[c.id] = c.options.find((o) => o.historical).id; });
eng.resolveTheater(evRun, g4, theaterSel);
const evResult = eng.buildResult(evRun, g4);
assert.strictEqual(evResult.win, true);
assert(evResult.stars >= 2, "event run should earn stars: " + evResult.stars);
assert(evResult.events && evResult.eventChoices.prep, "result should carry event data");

const plainRun = eng.createRun(g4, { recentEvents: [] });
eng.applyBP(plainRun, g4, g4.bpOptions.find((o) => o.historical));
g4.rounds.forEach((r) => eng.applyChoice(plainRun, r, r.options.find((o) => o.historical)));
eng.resolveTheater(plainRun, g4, theaterSel);
assert.strictEqual(eng.buildResult(plainRun, g4).stars <= 2, true, "without event tasks cannot get 3 stars");

// 7. 双份存档：主存档丢失时从备份恢复
const mem = {};
globalThis.localStorage = {
  getItem: (k) => (k in mem ? mem[k] : null),
  setItem: (k, v) => { mem[k] = String(v); },
  removeItem: (k) => { delete mem[k]; }
};
const save = eng.defaultProgress();
save.stages.gen_g2 = { done: true, best: 90, plays: 1 };
eng.saveProgress(save);
delete mem["blg2026.progress.v1"];
const recovered = eng.loadProgress();
assert.strictEqual(recovered.stages.gen_g2.done, true);

console.log("engine tests: ok");
console.log("G3 history:", play("t1_g3", "history").result.rating);
console.log("G4 history:", result.rating);
