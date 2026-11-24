/* 八强 DK：三局可玩。赛果锁定 3:0。 */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  const opt = (id, label, desc, adv, mind, extra) => Object.assign({
    id, label, desc, effect: { adv, mind }
  }, extra || {});

  BLG.stages = BLG.stages || {};

  BLG.stages.dk_g1 = {
    id: "dk_g1",
    series: "dk",
    code: "DK · G1",
    title: "先输一波，再赢回来",
    subtitle: "Xun 的冥犬，Knight 的城墙",
    date: "2026-11-06",
    type: "play",
    result: "win",
    hero: "assets/champions/naafiri-splash.jpg",
    bg: "assets/stages/dk_g1.jpg",
    draft: {
      blue: { team: "blg", label: "BLG · 蓝色方", champs: [
        { name: "泰坦", icon: "nautilus" },
        { name: "百裂冥犬", icon: "naafiri" },
        { name: "安蓓萨", icon: "ambessa" },
        { name: "蛇女", icon: "cassiopeia" },
        { name: "加里奥", icon: "galio" }
      ]},
      red: { team: "dk", label: "DK · 红色方", champs: [
        { name: "奇亚娜", icon: "qiyana" },
        { name: "芮尔", icon: "rell" },
        { name: "兰博", icon: "rumble" },
        { name: "飞机", icon: "corki" },
        { name: "阿卡丽", icon: "akali" }
      ]}
    },
    startAdv: 48,
    startMind: 58,
    bpNote: "BLG 蓝色方。DK 前三手会抢奇亚娜/兰博，BLG 需要把加里奥的进场留到先锋团。",
    bpOptions: [
      { id: "galio", label: "一抢加里奥", desc: "历史线：Knight 拿到加里奥，BLG 用城墙反打 DK 的冲阵。", effect: { adv: 3, mind: 4 }, historical: true, task: "galio_pick" },
      { id: "bot", label: "保 Viper 蛇女", desc: "把 BP 资源押给下路，让 Viper 打持续输出。", effect: { adv: 1, mind: 0 } },
      { id: "ambessa", label: "先抢安蓓萨", desc: "保证 Bin 的对线强度，把进场交给中野。", effect: { adv: -2, mind: 1 } }
    ],
    rounds: [
      {
        time: "03:30",
        title: "下路一换一，上路先崩",
        line: "Lucid 奇亚娜抓下拿一血，Viper 死前换掉 Smash；同一时间 Siwoo 兰博上路单杀 Bin。BLG 开局不顺。",
        options: [
          opt("trade", "接受互换，保上路发育", "历史线：BLG 不急着反打，先把 Bin 的线权稳住。", -2, 2, { historical: true, task: "early_trade", result: "BLG 稳住下路，Bin 虽然被抓，但没有继续送；Knight 在中路找到单杀机会。" }),
          opt("dive", "继续压上", "让 Xun 反蹲上路，强行帮 Bin 打回来。", -6, -4, { result: "DK 早有准备，Lucid 反蹲成功，BLG 上路再死一次。" }),
          opt("bot", "四包二下路", "把重心转到下路，争取先杀 Smash。", 3, -2, { result: "BLG 下路逼出技能，但 DK 及时撤退，只拿到一点线权。" })
        ]
      },
      {
        time: "15:55",
        title: "先锋团：加里奥进场",
        line: "先锋刷新，DK 想接。Xun 的冥犬已经绕到侧面，Knight 的加里奥大招还在。",
        options: [
          opt("herald", "接先锋团，等加里奥进场", "历史线：Xun 先拿先锋，Knight 加里奥进场开吸，BLG 打回节奏。", 10, 6, { historical: true, task: "herald_fight", result: "Xun 拿到先锋，Knight 加里奥进场，BLG 击杀 Lucid，打出 1 换 3。" }),
          opt("give", "放先锋", "不接团，换下路两波线。", -3, 1, { result: "DK 拿到先锋，BLG 换到一点经济，但节奏仍在 DK 手里。" }),
          opt("force", "先手强开", "不等 DK 站位，直接让泰坦开团。", -6, -3, { result: "BLG 先手被 DK 反打，ShowMaker 阿卡丽进场收割。" })
        ]
      },
      {
        time: "30:00",
        title: "远古龙前的最后一波",
        line: "BLG 经济反超，土龙魂听牌。DK 想靠远古龙翻回来。",
        options: [
          opt("elder", "让 Xun 拼远古龙", "历史线：Xun 冥犬抢下远古龙，随后三杀结束比赛。", 12, 6, { historical: true, task: "elder_steal", result: "Xun 抢下远古龙，BLG 一波推进，Xun 三杀，33:21 结束。" }),
          opt("baron", "大龙逼团", "先拿大龙，再回头处理远古龙。", 4, 1, { result: "BLG 拿下大龙，但 DK 换到远古龙，比赛被拖长。" }),
          opt("split", "Bin 单带", "让 Bin 去边线，正面避战。", -2, 0, { result: "Bin 带掉一座塔，但 DK 拿到远古龙，BLG 失去终结机会。" })
        ]
      }
    ],
    theater: {
      time: "33:21",
      title: "最后一波：冥犬进场",
      line: "BLG 带着远古龙 buff 推上 DK 高地。Xun 的冥犬从侧面进场，Knight 的加里奥随时准备落大。",
      calls: [
        { id: "target", label: "打谁", options: [
          { id: "smash", label: "Smash", historical: true, bonus: 6 },
          { id: "showmaker", label: "ShowMaker", bonus: 5 },
          { id: "front", label: "前排", bonus: 2 }
        ]},
        { id: "style", label: "怎么打", options: [
          { id: "flank", label: "绕后开团", historical: true, bonus: 6 },
          { id: "engage", label: "正面开团", bonus: 3 },
          { id: "counter", label: "反打", bonus: 2 }
        ]},
        { id: "loot", label: "拿什么", options: [
          { id: "end", label: "一波结束", historical: true, bonus: 5 },
          { id: "baron", label: "大龙", bonus: 3 },
          { id: "soul", label: "土龙魂", bonus: 2 }
        ]}
      ],
      target: 58
    },
    tasks: [
      { id: "galio_pick", label: "一抢加里奥" },
      { id: "herald_fight", label: "先锋团打回节奏" },
      { id: "elder_steal", label: "Xun 抢远古龙" },
      { id: "theater", label: "团战剧场评分 ≥ 58" }
    ],
    report: {
      score: "BLG 1 : 0 DK",
      lines: [
        "开局 BLG 下路一换一、上路被单杀，但 Knight 的加里奥在先锋团把节奏接了回来。",
        "Xun 的冥犬 12/1/8，Knight 加里奥 4/0/15。BLG 24:9、5:0 小龙、2:0 大龙、11:3 防御塔，33:21 结束。"
      ]
    }
  };

  BLG.stages.dk_g2 = {
    id: "dk_g2",
    series: "dk",
    code: "DK · G2",
    title: "盲视野的一 Q",
    subtitle: "Viper 的伊泽瑞尔，把下路打穿",
    date: "2026-11-06",
    type: "play",
    result: "win",
    hero: "assets/champions/ezreal.jpg",
    bg: "assets/stages/dk_g2.jpg",
    draft: {
      blue: { team: "dk", label: "DK · 蓝色方", champs: [
        { name: "皇子", icon: "jarvaniv" },
        { name: "芸阿娜", icon: "yunara" },
        { name: "璐璐", icon: "lulu" },
        { name: "瑞兹", icon: "ryze" },
        { name: "凯南", icon: "kennen" }
      ]},
      red: { team: "blg", label: "BLG · 红色方", champs: [
        { name: "盲僧", icon: "leesin" },
        { name: "伊泽瑞尔", icon: "ezreal" },
        { name: "纳尔", icon: "gnar" },
        { name: "发条", icon: "orianna" },
        { name: "女坦", icon: "leona" }
      ]}
    },
    startAdv: 52,
    startMind: 60,
    bpNote: "DK 蓝色方先抢皇子。BLG 红色方可以给 Viper 留伊泽瑞尔，但下路要自己打出优势。",
    bpOptions: [
      { id: "ezreal", label: "一抢伊泽瑞尔", desc: "历史线：Viper 拿到伊泽瑞尔，BLG 围绕下路打节奏。", effect: { adv: 4, mind: 4 }, historical: true, task: "ezreal_pick" },
      { id: "leona", label: "先拿女坦", desc: "保证 ON 的开团，把输出留给后手。", effect: { adv: 2, mind: 1 } },
      { id: "gnar", label: "保 Bin 纳尔", desc: "让 Bin 在上路先拿线权。", effect: { adv: 1, mind: 0 } }
    ],
    rounds: [
      {
        time: "03:16",
        title: "隔墙盲 Q",
        line: "Viper 的伊泽瑞尔在下路隔墙盲视野出 Q。Smash 的芸阿娜正好站在那个位置。",
        options: [
          opt("blindq", "让 Viper 出盲 Q", "历史线：Viper 盲视野 Q 中 Smash，拿下一血。", 8, 4, { historical: true, task: "blind_q", result: "Viper 盲 Q 命中，单杀 Smash 拿一血；Lucid 赶来换掉 Viper，双方 1 换 1。" }),
          opt("lane", "正常对线", "不冒风险，先把线控住。", -1, 1, { result: "BLG 下路稳住，但没有打出额外优势。" }),
          opt("dive", "直接越塔", "让 Xun 来下，强行越 Smash。", -5, -3, { result: "DK 反蹲到位，BLG 越塔失败，下路反而落后。" })
        ]
      },
      {
        time: "09:48",
        title: "小龙团：风龙魂",
        line: "双方在小龙坑接团。Lucid 的皇子先手进场，BLG 需要把阵型拉开。",
        options: [
          opt("soul", "接团，拿风龙魂", "历史线：BLG 拉扯掉皇子，Viper 点掉 Smash，2 换 3 拿龙。", 8, 5, { historical: true, task: "wind_soul", result: "Lucid 皇子被拉扯反杀，Viper 点掉 Smash，BLG 2 换 3 拿下风龙魂。" }),
          opt("give", "放小龙", "不接团，换中塔。", -3, 1, { result: "DK 拿到小龙，BLG 换到一点中路经济。" }),
          opt("mid", "先抓中路璐璐", "让 Knight 先手找 Career 的璐璐。", 6, 3, { result: "Knight 发条拉回璐璐，BLG 四人集火，先拿一个人头。" })
        ]
      },
      {
        time: "23:00",
        title: "风龙魂之后，转远古龙",
        line: "BLG 已经拿到风龙魂。DK 想靠大龙逼团，BLG 需要决定先拿哪个。",
        options: [
          opt("elder", "先拿远古龙", "历史线：BLG 23 分钟风龙魂，29 分钟远古龙，32:11 结束。", 10, 6, { historical: true, task: "elder", result: "BLG 稳稳控下远古龙，Viper 伊泽瑞尔输出拉满，32:11 推平 DK。" }),
          opt("baron", "先打大龙", "用大龙逼 DK 接团。", 4, 1, { result: "BLG 拿下大龙，但 DK 换到远古龙，比赛继续。" }),
          opt("push", "直接推中", "趁 DK 没落位，直接上高地。", -2, 0, { result: "BLG 推掉中路二塔，但 DK 把兵线清掉，没能一波。" })
        ]
      }
    ],
    theater: {
      time: "32:11",
      title: "最后一波：伊泽瑞尔的输出位",
      line: "BLG 带着远古龙推进。Viper 的伊泽瑞尔站在侧翼，DK 的前排已经扛不住。",
      calls: [
        { id: "target", label: "打谁", options: [
          { id: "smash", label: "Smash", historical: true, bonus: 6 },
          { id: "lucid", label: "Lucid", bonus: 4 },
          { id: "front", label: "前排", bonus: 2 }
        ]},
        { id: "style", label: "怎么打", options: [
          { id: "counter", label: "反打", historical: true, bonus: 6 },
          { id: "engage", label: "先手", bonus: 3 },
          { id: "poke", label: "拉扯", bonus: 4 }
        ]},
        { id: "loot", label: "拿什么", options: [
          { id: "end", label: "一波结束", historical: true, bonus: 5 },
          { id: "elder", label: "远古龙", bonus: 3 },
          { id: "baron", label: "大龙", bonus: 2 }
        ]}
      ],
      target: 58
    },
    tasks: [
      { id: "ezreal_pick", label: "一抢伊泽瑞尔" },
      { id: "blind_q", label: "盲视野 Q 拿一血" },
      { id: "wind_soul", label: "拿风龙魂" },
      { id: "elder", label: "控下远古龙" },
      { id: "theater", label: "团战剧场评分 ≥ 58" }
    ],
    report: {
      score: "BLG 2 : 0 DK",
      lines: [
        "Viper 的伊泽瑞尔在下路盲视野 Q 中 Smash，拿下一血。",
        "BLG 23 分钟风龙魂、29 分钟远古龙。Viper 5/2/7，Knight 2/0/8，Xun 4/2/5，32:11 结束。"
      ]
    }
  };

  BLG.stages.dk_g3 = {
    id: "dk_g3",
    series: "dk",
    code: "DK · G3",
    title: "Bin 的贾克斯",
    subtitle: "被团灭之后，把边线打成主战场",
    date: "2026-11-06",
    type: "play",
    result: "win",
    hero: "assets/champions/jax.jpg",
    bg: "assets/stages/dk_g3.jpg",
    draft: {
      blue: { team: "dk", label: "DK · 蓝色方", champs: [
        { name: "奥拉夫", icon: "olaf" },
        { name: "潘森", icon: "pantheon" },
        { name: "维克托", icon: "viktor" },
        { name: "厄斐琉斯", icon: "aphelios" },
        { name: "锤石", icon: "thresh" }
      ]},
      red: { team: "blg", label: "BLG · 红色方", champs: [
        { name: "卢锡安", icon: "lucian" },
        { name: "米利欧", icon: "milio" },
        { name: "贾克斯", icon: "jax" },
        { name: "巨魔", icon: "trundle" },
        { name: "狐狸", icon: "ahri" }
      ]}
    },
    startAdv: 50,
    startMind: 55,
    bpNote: "DK 蓝色方。BLG 红色方要把贾克斯留给 Bin，并用巨魔/狐狸打前期节奏。",
    bpOptions: [
      { id: "jax", label: "一抢 Bin 贾克斯", desc: "历史线：Bin 拿到贾克斯，BLG 把边线交给他。", effect: { adv: 4, mind: 5 }, historical: true, task: "jax_pick" },
      { id: "ahri", label: "给 Knight 狐狸", desc: "先保证中路的游走与开团。", effect: { adv: 2, mind: 2 } },
      { id: "lucian", label: "先拿卢锡安", desc: "让 Viper 在下路打对线压制。", effect: { adv: 1, mind: 0 } }
    ],
    rounds: [
      {
        time: "02:24",
        title: "上路 1v2",
        line: "Lucid 潘森越上，Siwoo 奥拉夫先手。Bin 的贾克斯在塔下，只有一丝血。",
        options: [
          opt("outplay", "让 Bin 反打", "历史线：Bin 贾克斯塔下反杀 Lucid 与 Siwoo，拿双杀。", 10, 6, { historical: true, task: "bin_1v2", result: "Bin 贾克斯反击风暴晕住两人，塔下双杀，BLG 上路起飞。" }),
          opt("safe", "放塔保命", "让 Bin 后撤，放弃一血塔。", -4, 1, { result: "Bin 后撤成功，但 DK 拿到上路一血塔。" }),
          opt("jungle", "让 Xun 反蹲", "把 Xun 叫到上路，打 2v2。", 3, 1, { result: "Xun 赶到反蹲，双方打出 1 换 1，Bin 没有拿到额外优势。" })
        ]
      },
      {
        time: "15:58",
        title: "先锋团：DK 的 2 换 5",
        line: "先锋团，Bin 先杀 Siwoo，但 ShowMaker 维克托进场狂轰三杀。DK 打出 2 换 5，把经济追平。",
        options: [
          opt("accept", "接受团灭，稳住心态", "历史线：BLG 被团灭，但没有继续接团，等 Bin 的边线。", -10, -6, { historical: true, task: "survive_herald", result: "DK 2 换 5 团灭 BLG，经济追平；BLG 选择稳一手，等 Bin 的贾克斯单带。" }),
          opt("give", "放先锋", "不接团，换小龙。", -3, 1, { result: "BLG 放掉先锋，DK 拿到资源，但没有爆发团战。" }),
          opt("force", "继续强开", "不想放节奏，继续接团。", -6, -5, { result: "BLG 阵型被维克托打散，再输一波团战。" })
        ]
      },
      {
        time: "23:50",
        title: "龙魂团：贾克斯绕后",
        line: "小龙刷新，BLG 听牌土龙魂。Bin 的贾克斯已经从侧面绕过来。",
        options: [
          opt("flank", "Bin 绕后", "历史线：Bin 贾克斯绕后三杀，BLG 1 换 4 拿大龙。", 14, 8, { historical: true, task: "jax_flank", result: "Bin 贾克斯绕后三杀，BLG 1 换 4 拿下大龙，经济领先 5.6k。" }),
          opt("front", "正面接团", "让 Xun 巨魔先手，Bin 从正面进。", -4, -2, { result: "BLG 正面被 DK 拉扯，Bin 没有找到进场角度。" }),
          opt("split", "让 Bin 继续单带", "正面放龙，Bin 换高地。", 2, 1, { result: "Bin 带掉一座高地塔，但 DK 拿到小龙，比赛继续。" })
        ]
      }
    ],
    theater: {
      time: "32:20",
      title: "最后一波：贾克斯进场",
      line: "BLG 开大龙逼团。Bin 的贾克斯 TP 绕后，DK 的阵型被切成两半。",
      calls: [
        { id: "target", label: "打谁", options: [
          { id: "smash", label: "Smash", historical: true, bonus: 6 },
          { id: "lucid", label: "Lucid", bonus: 5 },
          { id: "front", label: "前排", bonus: 2 }
        ]},
        { id: "style", label: "怎么打", options: [
          { id: "flank", label: "绕后开团", historical: true, bonus: 6 },
          { id: "engage", label: "正面开团", bonus: 3 },
          { id: "counter", label: "反打", bonus: 2 }
        ]},
        { id: "loot", label: "拿什么", options: [
          { id: "end", label: "一波结束", historical: true, bonus: 5 },
          { id: "baron", label: "大龙", bonus: 3 },
          { id: "soul", label: "土龙魂", bonus: 2 }
        ]}
      ],
      target: 58
    },
    tasks: [
      { id: "jax_pick", label: "一抢 Bin 贾克斯" },
      { id: "bin_1v2", label: "Bin 上路 1v2 双杀" },
      { id: "survive_herald", label: "先锋团被团灭后稳住" },
      { id: "jax_flank", label: "龙魂团贾克斯绕后" },
      { id: "theater", label: "团战剧场评分 ≥ 58" }
    ],
    report: {
      score: "BLG 3 : 0 DK",
      lines: [
        "Bin 的贾克斯在上路 1v2 双杀，随后连续单杀 Siwoo。",
        "16 分钟先锋团 DK 打出 2 换 5，但 BLG 用 Bin 的边线把比赛拉回来。",
        "龙魂团 Bin 三杀，BLG 1 换 4 拿大龙；32:20 推平 DK，3:0 晋级四强。"
      ]
    }
  };

  BLG.series = BLG.series || {};
  BLG.series.dk = {
    id: "dk",
    name: "八强 · DK",
    opponent: "dk",
    tagline: "资源碾压 · 系列赛小龙 12:1",
    stages: ["dk_g1", "dk_g2", "dk_g3"],
    score: "3 : 0",
    note: "BLG 三局全胜，系列赛小龙 12:1，DK 仅拿到 1 条小龙。",
    winTitle: "十二条小龙，只丢一条。",
    winText: "BLG 3:0 横扫 DK，系列赛小龙 12:1。Xun、Viper、Bin 三局各接管一场。",
    mvp: { name: "Bin", photo: "assets/players/bin.png" },
    next: "半决赛 · T1"
  };
})();
