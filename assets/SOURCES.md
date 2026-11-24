# 素材来源与授权说明

本目录素材仅用于本项目原型开发与内部演示。正式上线前，需由法务/发行确认以下素材的使用范围，并保留授权文件。

## 战队 Logo

来源：英雄联盟赛事官网（LPL）公开页面所引用的图片 CDN。

- 官网：https://lpl.qq.com/
- 队伍列表数据：https://lpl.qq.com/web201612/data/LOL_MATCH2_TEAM_LIST.js
- 图片 CDN：https://img.crawler.qq.com/lolwebvideo/

已下载：

| 文件 | 队伍 | TeamId | 原始地址 |
|---|---|---|---|
| `teams/blg.png` | BLG | 57 | `//img.crawler.qq.com/lolwebvideo/20250618144525/49342dadcecf162e8ac94fad6eb91540/0` |
| `teams/t1.png` | T1 | 692 | `//img.crawler.qq.com/lolwebvideo/20261012145143/b58fb16d179951a99c63df0847f6e45d/0` |
| `teams/hle.png` | HLE | 20 | `//img.crawler.qq.com/lolwebvideo/20261012145202/6a8abd94449997cfe0d5b1c61f8aa544/0` |
| `teams/gen.png` | GEN | 137 | `//img.crawler.qq.com/lolwebvideo/20261012145108/f80d2a3624e106aa55e7990951176f39/0` |
| `teams/dk.png` | DK | 591 | `//img.crawler.qq.com/lolwebvideo/20261012150311/976636ab1dab3a6cfe949f39c40f6eac/0` |
| `teams/ig.png` | IG | 2 | `//img.crawler.qq.com/lolwebvideo/20230103152918/562affbb9f99b0e472644f93a19291e7/0` |
| `teams/tes.png` | TES | 42 | `//img.crawler.qq.com/lolwebvideo/20240920155538/5beb948638f00bcda68fc4942e3f0a51/0` |
| `teams/lyon.png` | LYON | 699 | `//img.crawler.qq.com/lolwebvideo/20261012144758/cc058a14de10abc011efced2797d2ed0/0` |
| `teams/kc.png` | KC | 1127 | `//img.crawler.qq.com/lolwebvideo/20261012145032/e5422f7e21dd6bf63a718bdc2d1a2090/0` |

处理：仅裁掉透明边、居中并缩放至 200×200，未改变队标图形与颜色。

## 数据中心（赛事统计）

来源：LPL 赛事官网公开数据接口 / TJStats。

- 赛季：2026（seasonId 246）
- 阶段：全球总决赛淘汰赛（stageId 18）
- 接口：
  - `/compound/seasonStage`：赛季/阶段列表
  - `/compound/public/team`：战队统计
  - `/compound/public/player`：选手统计
  - `/compound/teamHexagram`、`/compound/hexagram`：战队/选手雷达
  - `/compound/playerUseHero`：选手英雄池
- 快照：40 名选手、8 支战队；生成文件 `js/data/stats.worlds2026.js`
- 排名说明：选手为同位置排名，战队为赛段排名，由公开数据在同一数据池内计算。

## 召唤师峡谷地图

来源：Riot Games Data Dragon。

- 版本：16.23.1
- 地址：`https://ddragon.leagueoflegends.com/cdn/16.23.1/img/map/map11.png`
- 文件：`maps/sr.png`
- 规格：512×512 PNG

用途：局内“教练作战室”的战术小地图底图；上方叠加青色“我方战术重心”、红色“敌方争夺点”、BLG/T1 基地与龙坑/大龙坑标记。

## 英雄加载图

来源：Riot Games Data Dragon（官方公开素材 CDN）。

- 版本：16.23.1（2026 赛季）
- 地址：`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/<ChampionId>_0.jpg`
- 已下载：`ksante.jpg`、`orianna.jpg`、`ahri.jpg`、`pantheon.jpg`、`seraphine.jpg`、`vayne.jpg`、`syndra.jpg`、`poppy.jpg`、`locke.jpg`
- 横幅：`naafiri-splash.jpg`，来源 `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Naafiri_0.jpg`（1215×717），缩放为 1000×590，用于 DK · G1 简报头图
- 方图标：`icons/` 下 30 张 96×96 PNG，含 2026 新英雄 Locke（洛克）
- 规格：加载图 308×560 JPEG，单张约 45–60KB

英雄名称与版权归 Riot Games 所有；使用需遵守 Riot 的粉丝内容/游戏素材规范。

## 关卡背景

- `stages/dk_g1.jpg`：DK · G1 全场背景，项目方提供的 Xun 官方造型照（原始 2000×3000）。
- `stages/dk_g2.jpg`：DK · G2 全场背景，项目方提供的 BLG 选手造型照（原始 474×711 WebP）。
- `stages/dk_g3.jpg`：DK · G3 全场背景，项目方提供的 BLG 选手造型照（原始 2048×3071）。
- `stages/t1_g1.jpg`：T1 · G1 全场背景，项目方提供的 BLG 选手造型照（原始 700×1050，图内含 @Score赛高 水印）。
- `stages/t1_g3.jpg`：T1 · G3 全场背景，项目方提供的 Xun 造型照（原始 2000×3000，与 `dk_g1.jpg` 为同一张）。
- `stages/t1_g4.jpg`：T1 · G4 全场背景，项目方提供的 ON 造型照（原始 690×1035，图内含 @Score赛高 水印）。
- `stages/gen_g2.jpg`：GEN · G2 全场背景，项目方提供的 Xun 造型照（原始 2000×3000，与 `dk_g1.jpg`、`t1_g3.jpg` 为同一张）。
- `stages/gen_g3.jpg`：GEN · G3 全场背景，项目方提供的 Viper 造型照（原始 474×711 WebP，与 `dk_g2.jpg` 为同一张）。
- `stages/gen_g4.jpg`：GEN · G4 全场背景，项目方提供的 ON 造型照（原始 690×1035，与 `t1_g4.jpg` 为同一张）。
- `stages/gen_win.jpg`：项目方提供的 BLG 2026 全球总决赛冠军海报原图（568×680）。
- `stages/gen_win_full.jpg`：夺冠页整页背景（780×1800），由原海报完整置底 + 顶部蓝色模糊延伸生成，保证海报本身不裁切。
- `ui/trophy-2026.png`：夺冠页与赛后结算页奖杯，项目方提供的 2026 全球总决赛奖杯图；已去除白色背景、裁切并缩放为 360×550 透明 PNG。
- `ui/share-card-bg.jpg`：战报卡背景，项目方提供的 BLG 冠军海报（613×777）。战报卡在 `file://` 下绘制到 canvas 会被浏览器判定为跨域，因此通过 `js/data/share-card-bg.js` 内嵌为 data URI 使用。
- 处理：DK G1/G3、T1 G3、GEN G2 等比缩放至 1000×1500；其余保持原尺寸转 JPEG 质量 90；页面内叠加蓝黑渐变以保证文字可读性。
- 该图属于选手肖像素材，正式上线前需确认拍摄方/选手本人的使用授权。

## 选手照片

来源：LPL 官网队伍成员数据。

- 数据文件：https://lpl.qq.com/web201612/data/LOL_MATCH2_TEAM_MEMBER_LIST.js
- 该文件同时包含 `MemberId`、`NickName`、`TeamId`、`UserPhoto550`，可直接完成 MemberId ↔ 选手名映射。
- 照片 CDN：`//img.crawler.qq.com/lolwebvideo/...`
- 已下载 25 名选手，原始 250×250 透明 PNG，统一缩放为 180×180 并压缩，总体积约 0.9MB。

### MemberId 对照表

| 队伍 | 选手 | MemberId | 文件 |
|---|---|---|---|
| BLG | Bin | 2687 | `players/bin.png` |
| BLG | Xun | 3114 | `players/xun.png` |
| BLG | Knight | 2562 | `players/knight.png` |
| BLG | Viper | 193 | `players/viper.png` |
| BLG | ON | 3509 | `players/on.png` |
| T1 | Doran | 2829 | `players/doran.png` |
| T1 | Oner | 3832 | `players/oner.png` |
| T1 | Faker | 1651 | `players/faker.png` |
| T1 | Peyz | 4002 | `players/peyz.png` |
| T1 | Keria | 3139 | `players/keria.png` |
| HLE | Zeus | 4247 | `players/zeus.png` |
| HLE | Kanavi | 2771 | `players/kanavi.png` |
| HLE | Zeka | 3018 | `players/zeka.png` |
| HLE | Gumayusi | 3833 | `players/gumayusi.png` |
| HLE | Delight | 4364 | `players/delight.png` |
| GEN | Kiin | 1875 | `players/kiin.png` |
| GEN | Canyon | 2831 | `players/canyon.png` |
| GEN | Chovy | 2216 | `players/chovy.png` |
| GEN | Ruler | 643 | `players/ruler.png` |
| GEN | Duro | 4462 | `players/duro.png` |
| DK | Siwoo | 1000866 | `players/siwoo.png` |
| DK | Lucid | 4432 | `players/lucid.png` |
| DK | ShowMaker | 2832 | `players/showmaker.png` |
| DK | Smash | 1000838 | `players/smash.png` |
| DK | Career | 1000668 | `players/career.png` |

> 选手照片属于选手个人肖像，正式上线前仍需逐人确认授权范围；原型阶段仅用于本地演示。

## 未使用的内容

- 未下载、未使用任何比赛转播视频、解说音频、官方节目画面；
- 未使用真实社交媒体评论或用户头像；
- 战报卡、解说文案、UI 图形均为原创或 CSS/SVG 绘制。

## 上线前检查

1. 与 BLG/腾竞/Riot 确认队伍 Logo、赛事标识、英雄素材的商用范围；
2. 选手肖像逐人签约；
3. 不把官网数据文件直接打包进正式包，改为构建期缓存或授权 CDN；
4. 在游戏内“关于/素材说明”页面标注来源与版权归属。
