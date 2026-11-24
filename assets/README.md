# assets

当前已接入：

```
assets/
  teams/       blg.png, t1.png, hle.png, gen.png, dk.png,
               ig.png, tes.png, lyon.png, kc.png           # LPL 官网 CDN，200×200，已裁透明边
  players/     bin.png, xun.png, knight.png, viper.png, on.png,
               doran.png, oner.png, faker.png, peyz.png, keria.png，
               zeus.png, kanavi.png, zeka.png, gumayusi.png, delight.png,
               kiin.png, canyon.png, chovy.png, ruler.png, duro.png,
               siwoo.png, lucid.png, showmaker.png, smash.png,
               career.png                                    # LPL 官网，180×180
  champions/   ksante.jpg, orianna.jpg, ahri.jpg, pantheon.jpg,
               seraphine.jpg, vayne.jpg, syndra.jpg, poppy.jpg,
               locke.jpg, naafiri-splash.jpg                  # Riot Data Dragon 16.23.1
               icons/  30 张 96×96 方图标，含 Locke
  stages/      dk_g1.jpg, dk_g2.jpg, dk_g3.jpg,
               t1_g1.jpg, t1_g3.jpg, t1_g4.jpg,
               gen_g2.jpg, gen_g3.jpg, gen_g4.jpg,
               gen_win.jpg, gen_win_full.jpg                  # 对局背景 + GEN 夺冠海报，项目方提供
  ui/          trophy-2026.png, share-card-bg.jpg               # 夺冠页奖杯 + 战报卡背景，项目方提供
  SOURCES.md   素材来源、MemberId 对照与授权提醒
```

仍待补充：

```
  stages/      t1_*.jpg, gen_*.jpg                              # 其余关卡背景
  audio/       bgm.mp3, hit.mp3
```

接入前确认：

- 选手肖像逐人授权；LPL 照片列表需先做 MemberId 与选手名映射；
- 队伍 Logo 与赛事标识在授权范围内；
- Riot 英雄素材符合官方使用规范；
- 音频不使用未经授权的转播原声。
