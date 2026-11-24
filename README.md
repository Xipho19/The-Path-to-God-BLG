# 登神之路：BLG 2026

竖屏 H5 电竞战术模拟原型。玩家是 BLG 主教练，不做微操，只做 BP、节奏与心态的决定，复刻 2026 全球总决赛：八强 DK 3:0 → 半决赛 T1 3:1 → 决赛 GEN 3:1。

当前版本完整收录三场系列赛：

- **八强 DK 3:0**：G1 耐心反打、G2 盲视野伊泽瑞尔、G3 Bin 贾克斯
- **半决赛 T1 3:1**：G1 耐心、G2 互动过场、G3 草丛、G4 四打五反打
- **决赛 GEN 3:1**：G1 互动过场、G2 Xun 冥犬、G3 岩雀/牛头、G4 41:03 抢龙
- 9 局可玩 + 2 段互动过场，系列赛按局自动保存
- 首页「开始执教」→ 选关页：DK → T1 → GEN 顺序解锁，完成上一关才开放下一关
- BP、三个关键回合、团战剧场、S/A/B/C 复刻度、激励视频 Mock、战报卡
- **数据中心**：战队/选手/对位三页，对位可在 T1、DK、GEN、IG、TES、LYON、KC 间切换；官方排名、五维雷达、英雄池
- Hextech 转播风按钮系统：切角、金属底、青色能量边、金色选中态、扫光与按压反馈
- LPL 官方队标与选手头像、Riot Data Dragon 英雄加载图（详见 `assets/SOURCES.md`）

## 运行

不依赖构建工具，直接双击 `index.html` 即可；也可以起本地服务器：

```bash
python -m http.server 4173
# 打开 http://127.0.0.1:4173
```

首次体验前 10 分钟默认不显示广告；调试广告可加 `?ads=1`：

```
http://127.0.0.1:4173/index.html?ads=1
```

## 目录

```
index.html
styles.css
js/
  data/teams.js          # 队伍、选手、队色、英雄池
  data/stages.dk.js      # DK 三局数据：BP、回合、剧场、任务
  data/stages.t1.js      # T1 四局数据：BP、回合、剧场、任务
  data/stages.gen.js     # GEN 四局数据：G1 过场 + G2–G4
  data/intel.dk.js       # DK 作战室数据
  data/intel.t1.js       # T1 作战室数据
  data/intel.gen.js      # GEN 作战室数据
  data/stats.worlds2026.js # 2026全球总决赛淘汰赛官方数据快照（40人/8队）
  data/share-card-bg.js  # 战报卡背景 data URI（避免 file:// 下 canvas 污染）
  engine/engine.js       # ADV、心态、团战评分、复刻度、存档
  platform/platform.js   # 登录/分享/激励视频适配层（当前 Mock）
  ui/ui.js               # 竖屏界面与流程
  main.js                # 启动
tests/engine.test.js     # 无依赖逻辑测试
assets/
  teams/                 # BLG/T1/HLE/GEN/DK 队标（LPL 官网 CDN）
  players/               # 25 名选手官方头像，180×180 PNG
  champions/             # 9 张英雄加载图 + 30 张方图标（Riot Data Dragon）
  stages/                # 对局背景与 GEN 夺冠海报
  ui/                    # 夺冠页奖杯 trophy-2026.png
  maps/                  # 召唤师峡谷地图 sr.png（Riot Data Dragon）
  SOURCES.md             # 素材来源、MemberId 对照与授权说明
shots/                   # 本地截图，不参与运行
```

## 素材

- 队标：英雄联盟赛事官网（lpl.qq.com）队伍列表所引用的图片 CDN，已裁透明边并居中。
- 选手头像：LPL `LOL_MATCH2_TEAM_MEMBER_LIST.js` 的 `MemberId`/`NickName`/`UserPhoto550`，已核对 BLG、T1、HLE、GEN、DK 共 25 人；原始 250×250 透明 PNG，压缩为 180×180。
- 关卡背景：`assets/stages/dk_g1.jpg`（Xun）、`dk_g2.jpg`、`dk_g3.jpg`、`t1_g1.jpg`、`t1_g3.jpg`（Xun）、`t1_g4.jpg`（ON）、`gen_g2.jpg`（Xun）、`gen_g3.jpg`（Viper）、`gen_g4.jpg`（ON）为项目方提供，用于对应关卡的简报、BP、局内、团战剧场与结算页。
- 夺冠海报：`assets/stages/gen_win.jpg` 原图完整置底，`gen_win_full.jpg` 加上顶部蓝色延伸后作为 GEN 系列赛夺冠页的整页背景。
- 战报卡背景：`assets/ui/share-card-bg.jpg` 以 data URI 内嵌到 `js/data/share-card-bg.js`，避免本地 `file://` 下 canvas 被污染，保证“保存图片”可用。
- 英雄图：Riot Data Dragon 16.23.1 的 champion loading 图，308×560 JPEG。
- 所有来源、原始 URL、MemberId 对照表与授权提醒见 `assets/SOURCES.md`。
- 真实赛况与推演数据的边界见 `DATA_NOTES.md`：比分、BP、关键时间点为公开报道；队内通讯、经济/视野/资源数值为模拟。

> 正式上线前仍需确认队伍 Logo、赛事标识、英雄素材的商用范围，以及选手肖像的逐人授权；不要直接打包官网数据文件或使用未经授权的转播素材。

## 玩法

```
首页 → 开始执教 → 选择关卡（DK / T1 / GEN）→ 赛前简报 → BP → 三个关键回合 → 团战剧场 → 赛后复盘
```

- **BP**：快速 BP（3 Ban + 5 Pick），影响开局 ADV 与团队冷静值。
- **三个关键回合**：开局部署、中期资源、决胜团；每个选项改变 ADV/冷静，历史线会触发金色演出。
- **教练作战室**：每个回合显示小地图、经济差、视野、小龙/巢虫/防御塔/大龙、双方焦点对位（选手头像 + 英雄）与教练组通讯。
- **数据中心**：战队/选手/对位三页；对位页可在 T1、DK、GEN、IG、TES、LYON、KC 之间切换对手；数据来自 LPL 官网 2026 全球总决赛淘汰赛，排名采用官方页面展示；同位置/赛段第 1 的数据用金色高亮。
- **团战剧场**：三次教练呼叫——打谁、怎么打、拿什么；评分 ≥ 目标值才算完成剧场任务。
- **复刻度**：历史任务 60% + 经济曲线 20% + 团战评价 20%，S/A/B/C。
- **本局变奏（GEN · G4 样例）**：赛前、局内、赛后各抽 1 个事件。赛前事件接在 BP 前，局内事件随机插入某一回合前，赛后事件在结算页；事件会改变 ADV/冷静并附带隐藏任务。
- **三星**：胜利 1 星；复刻度 A 或全部历史任务 2 星；全部历史任务 + 至少 1 个变奏任务 + S 评级 3 星。选关页与系列赛页显示星数。
- **夺冠礼花（GEN · G4）**：结算页金色飘带从屏幕上方飘落，约 7 秒；系统开启“减少动态效果”时自动跳过。
- **夺冠结算文案（GEN · G4）**：标题为“新王登基。”，副文案强调 41:03 推平基地与队史首冠，右上角标签为“夺冠”；其他局仍使用通用复盘文案。
- **失败**：免费无限重试，不消耗体力、不强制广告。

## 存档

- 主存档与自动备份都写在 localStorage；主存档缺失或损坏时从备份恢复。
- 存档按“浏览器 + 地址”隔离：`file://`、`http://127.0.0.1:4173`、不同端口或不同浏览器之间互不相通。
- 首页底部提供 **导出存档 / 导入存档**，换浏览器或换地址时可复制 JSON 存档码迁移。
- 已完成的关卡不会再被前置关卡反锁，兼容旧版本只有 T1 的存档。

## 改内容

关卡全部数据化，改 `js/data/stages.dk.js`、`stages.t1.js`、`stages.gen.js` 即可：

```js
{
  id: "t1_g3",
  type: "play",
  startAdv: 52,
  startMind: 55,
  bpOptions: [ ... ],
  rounds: [ { time, title, line, options: [ { id, label, desc, effect: { adv, mind }, historical, task } ] } ],
  theater: { calls: [ { id, label, options: [ { id, label, historical, bonus } ] } ], target: 58 },
  tasks: [ { id, label } ]
}
```

- `historical: true` 的选项会触发“历史线”标记，影响复刻度与战报卡文案。
- `task` 对应 `tasks` 里的 id，完成即计入评分。
- 所有赛果锁定；G2 这种败局只做过场，不做可玩关。

## 平台接入

`js/platform/platform.js` 是唯一需要替换的层：

- `login()`：平台账号；
- `showRewardedAd(slot, cb)`：平台激励视频；
- `shareCard(data)`：战报卡生成 / 分享 SDK；
- `track(event, props)`：埋点。

广告位按策划案保留安全位：训练室、失败结算、局间、系列赛结算；**BP、团战剧场、剧情演出中禁止调用**。

## 测试

```bash
npm test
# 或分开：
node tests/engine.test.js
node tests/stats.test.js
```

覆盖：数据完整性、历史线必胜、全错线可失败、解锁链、旧版 T1 存档兼容、双份存档恢复、评分区间、GEN · G4 事件池与三星；以及官方数据快照（40 人/8 队、Knight/Bin/ON 雷达值与官方排名、BLG 战队雷达）。

浏览器端可用任意静态服务器 + Playwright 跑完整系列赛；本仓库不把 Playwright 作为运行依赖。

## 已知限制

- 队伍 Logo、选手头像与英雄图已接入；头像已按 LPL MemberId 核对，但正式上线仍需逐人确认肖像授权。
- 关卡背景目前接入 DK · G1 / G2 / G3、T1 · G1 / G3 / G4、GEN · G2 / G3 / G4，其余关卡沿用统一的 Hextech 背景。
- 事件池目前只在 GEN · G4 做了可玩样例；其他关卡仍是固定三回合。
- 广告、登录、分享均为 Mock；真实平台 SDK 需要平台文档与测试账号。
- 存档使用 localStorage，已加自动备份与导入导出；跨设备仍需接平台云存档。
- LPL 官网数据文件与图片 CDN 仅用于原型，正式包应改为授权 CDN 或构建期缓存。

## 下一步

1. 接平台 SDK 与激励视频。
2. 替换正式美术与音频。
3. 为剩余 T1、GEN 关卡补同规格的背景图。
4. 把事件池与三星扩展到 DK、T1 的全部可玩局。
5. 接入平台云存档，替代纯本地 localStorage。
