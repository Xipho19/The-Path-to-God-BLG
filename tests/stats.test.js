/* 官方数据快照测试：node tests/stats.test.js */
const assert = require("assert");

require("../js/data/stats.worlds2026.js");
const stats = globalThis.BLG.stats;

assert.strictEqual(stats.players.length, 40, "players count");
assert.strictEqual(stats.teams.length, 8, "teams count");
assert.strictEqual(stats.meta.seasonId, 246);
assert.strictEqual(stats.meta.stageId, 18);

function player(name) {
  const p = stats.players.find((x) => x.name === name);
  assert(p, "missing player " + name);
  return p;
}

const knight = player("Knight");
assert.deepStrictEqual(knight.radarAxes.map((a) => a.value), [9.73, 1345.82, 1.55, 0.25, 0.75]);
assert.deepStrictEqual(knight.radarAxes.map((a) => a.rank), [1, 1, 6, 5, 1]);
assert.strictEqual(knight.ranks.kda, 1);
assert.strictEqual(knight.ranks.totalKills, 2);
assert.strictEqual(knight.ranks.damagePercent, 5);

const bin = player("Bin");
assert.deepStrictEqual(bin.radarAxes.map((a) => a.value), [4.12, 1140.18, 0.24, 0.17, 0.55]);
assert.deepStrictEqual(bin.radarAxes.map((a) => a.rank), [2, 1, 5, 8, 4]);
assert.strictEqual(bin.ranks.totalKills, 1);
assert.strictEqual(bin.ranks.totalDeath, 7);

const on = player("ON");
assert.deepStrictEqual(on.radarAxes.map((a) => a.rank), [3, 1, 1, 2, 5]);
assert.strictEqual(on.radarAxes[1].label, "分均购买控制守卫");
assert.strictEqual(on.radarAxes[2].label, "场均插眼");

const blg = stats.teams.find((t) => t.name === "BLG");
assert(blg, "missing BLG");
assert.deepStrictEqual(blg.radarAxes.map((a) => a.value), [2227, 896.45, 0.55, 0.82, 0.79]);
assert.deepStrictEqual(blg.radarAxes.map((a) => a.rank), [8, 1, 3, 1, 6]);
assert.strictEqual(blg.ranks.goldPerGameTeam, 1);
assert.strictEqual(blg.ranks.timePerGameTeam, 8);

console.log("stats tests: ok");
