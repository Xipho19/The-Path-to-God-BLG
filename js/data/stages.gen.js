/* 决赛 GEN：G1 互动过场，G2/G3/G4 可玩。赛果锁定 3:1（让一追三）。 */
(function () {
  globalThis.BLG = globalThis.BLG || {};
  const opt = (id, label, desc, adv, mind, extra) => Object.assign({ id, label, desc, effect: { adv, mind } }, extra || {});
  BLG.stages = BLG.stages || {};

  BLG.stages.gen_g1 = {
    id: "gen_g1",
    series: "gen",
    code: "GEN · G1",
    title: "电龙魂也救不了",
    subtitle: "Ruler 的飞机，Chovy 的辛德拉",
    date: "2026-11-15",
    type: "cutscene",
    result: "loss",
    panels: [
      {
        art: "dive",
        bg: "assets/champions/corki.jpg",
        eyebrow: "决赛 · 第一局",
        title: "GEN 把球交给 Ruler",
        text: "GEN 蓝色方抢下盲僧、辛德拉、奥拉夫、飞机、娜美。BLG 红色方拿到烈娜塔、卡莉斯塔、洛克、奎桑提、皇子。"
      },
      {
        art: "lead",
        bg: "assets/champions/syndra.jpg",
        eyebrow: "中期 · 电龙魂",
        title: "BLG 拿到了电龙魂",
        text: "BLG 连续控下小龙与先锋，经济小领先。但 Ruler 的飞机在下路双杀 ON 与 Viper，Chovy 的辛德拉终结 Xun，GEN 打出 0 换 3 并拿下大龙。"
      },
      {
        art: "syndra",
        bg: "assets/champions/jarvaniv.jpg",
        eyebrow: "28:18 · 远古龙",
        title: "抢到了，却顶不住",
        text: "Xun 的皇子抢下远古龙。GEN 强顶远古龙 buff 打出 0 换 4，Chovy 辛德拉推球击中 BLG 两人，GEN 再拿大龙。"
      },
      {
        art: "score",
        bg: "assets/champions/corki.jpg",
        eyebrow: "34:57 · 第二波远古龙",
        title: "GEN 先下一城",
        text: "第二波远古龙团，Canyon 盲僧进场被秒，但 Kiin 奥拉夫与 Ruler 飞机连续收割，GEN 1 换 3 拿下远古龙，再拿大龙，36:55 推平 BLG 基地。"
      }
    ],
    choices: [
      { id: "ruler", label: "看 Ruler 的飞机", line: "镜头停在 Ruler 的飞机上。电龙魂在手，BLG 仍然没能按住这个输出点。" },
      { id: "chovy", label: "看 Chovy 的辛德拉", line: "镜头停在 Chovy 的辛德拉上。两次推球，把 BLG 的阵型拆开。" }
    ],
    resultLine: "GEN 1 : 0 BLG",
    endTitle: "先输一局，不等于输掉系列赛。",
    endText: "BLG 在电龙魂与远古龙都到手的情况下被 GEN 翻盘。下一局，Xun 的冥犬要把节奏抢回来。",
    mindDelta: -8,
    unlock: "gen_g2"
  };

  BLG.stages.gen_g2 = {
    id: "gen_g2",
    series: "gen",
    code: "GEN · G2",
    title: "Xun 的冥犬",
    subtitle: "把 Chovy 的發条咬碎",
    date: "2026-11-15",
    type: "play",
    result: "win",
    hero: "assets/champions/naafiri.jpg",
    bg: "assets/stages/gen_g2.jpg",
    draft: {
      blue: { team: "gen", label: "GEN · 蓝色方", champs: [
        { name: "伊泽瑞尔", icon: "ezreal" },
        { name: "卡尔玛", icon: "karma" },
        { name: "科加斯", icon: "chogath" },
        { name: "发条", icon: "orianna" },
        { name: "薇恩", icon: "vayne" }
      ]},
      red: { team: "blg", label: "BLG · 红色方", champs: [
        { name: "蛇女", icon: "cassiopeia" },
        { name: "卡蜜尔", icon: "camille" },
        { name: "百裂冥犬", icon: "naafiri" },
        { name: "纳尔", icon: "gnar" },
        { name: "吉格斯", icon: "ziggs" }
      ]}
    },
    startAdv: 48,
    startMind: 52,
    bpNote: "BLG 红色方。GEN 先拿伊泽瑞尔/发条，BLG 要把冥犬留给 Xun，让中路跟着他动。",
    bpOptions: [
      { id: "naafiri", label: "一抢 Xun 的冥犬", desc: "历史线：BLG 把百裂冥犬留给 Xun，围绕上半区打节奏。", effect: { adv: 4, mind: 5 }, historical: true, task: "naafiri_pick" },
      { id: "gnar", label: "保 Bin 纳尔", desc: "让 Bin 在上路先拿线权。", effect: { adv: 2, mind: 1 } },
      { id: "ziggs", label: "给 Viper 吉格斯", desc: "下路打推线，把资源让给中野。", effect: { adv: 1, mind: 0 } }
    ],
    rounds: [
      {
        time: "02:54",
        title: "第一波：抓上",
        line: "Xun 的冥犬去上，Kiin 的薇恩交出双召，仍然被咬住。BLG 想要第一滴血。",
        options: [
          opt("top", "让 Xun 抓上", "历史线：Xun 拿 Kiin 一血，随后小龙团 0 换 2。", 8, 5, { historical: true, task: "top_gank", result: "Xun 咬死 Kiin 拿一血；小龙团 Chovy 发条被咬掉，BLG 0 换 2，领先 1k。" }),
          opt("mid", "先抓 Chovy", "直接去中路找发条。", 3, 1, { result: "BLG 逼出 Chovy 闪现，但没能击杀。" }),
          opt("bot", "保 Viper 推线", "把重心放下路。", -4, -2, { result: "Ruler 伊泽瑞尔越塔单杀 Viper，GEN 0 换 2。" })
        ]
      },
      {
        time: "15:55",
        title: "Chovy 连死两次",
        line: "Chovy 的发条在下路吃线，Xun 的冥犬已经锁头，Knight 的蛇女就在旁边。",
        options: [
          opt("chovy", "继续抓 Chovy", "历史线：Xun 锁头发条，Knight 蛇女跟上，Chovy 连死两次。", 8, 5, { historical: true, task: "chovy_pick", result: "Chovy 发条再次被 Xun 锁头，BLG 经济领先 2.7k。" }),
          opt("baron", "转大龙", "不追发条，提前做龙区视野。", 2, 1, { result: "BLG 占住大龙视野，但 GEN 把兵线处理掉。" }),
          opt("bot", "继续压下路", "让 Viper 吉格斯推塔。", 1, 0, { result: "BLG 推掉下路一塔，但没有扩大击杀优势。" })
        ]
      },
      {
        time: "28:39",
        title: "大龙团",
        line: "上路河道团战，ON 的卡蜜尔先手，BLG 想用大龙把系列赛扳平。",
        options: [
          opt("baron", "大龙逼团", "历史线：BLG 1 换 2 拿下大龙，经济领先 3.3k，随后推掉 GEN 高地。", 10, 6, { historical: true, task: "baron", result: "BLG 1 换 2，拿下大龙，经济领先 3.3k，推掉 GEN 高地塔与水晶。" }),
          opt("elder", "等远古龙", "放掉大龙，等远古龙决战。", 3, 1, { result: "BLG 放掉大龙，GEN 把经济追回一些。" }),
          opt("push", "直接推中", "趁 GEN 少人，直接上高地。", 5, 2, { result: "BLG 推掉中路二塔，但没能一波。" })
        ]
      }
    ],
    theater: {
      time: "后期",
      title: "最后一波：远古龙团",
      line: "比赛拖到远古龙。BLG 需要一次干净的团战，才能把系列赛扳平。",
      calls: [
        { id: "target", label: "打谁", options: [
          { id: "ruler", label: "Ruler", historical: true, bonus: 6 },
          { id: "chovy", label: "Chovy", bonus: 5 },
          { id: "front", label: "前排", bonus: 2 }
        ]},
        { id: "style", label: "怎么打", options: [
          { id: "engage", label: "先手开团", historical: true, bonus: 6 },
          { id: "counter", label: "反打", bonus: 4 },
          { id: "poke", label: "拉扯", bonus: 2 }
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
      { id: "naafiri_pick", label: "一抢 Xun 冥犬" },
      { id: "top_gank", label: "Xun 抓上拿一血" },
      { id: "chovy_pick", label: "抓掉 Chovy 两次" },
      { id: "baron", label: "大龙团 1 换 2" },
      { id: "theater", label: "团战剧场评分 ≥ 58" }
    ],
    report: {
      score: "BLG 1 : 1 GEN",
      lines: [
        "Xun 的冥犬 8/1/9，对位经济差 +6256。BLG 把 Chovy 的发条咬碎，扳回一局。",
        "这一局打了 53 分钟。BLG 靠远古龙团的一波 0 换 3 终结比赛。"
      ]
    }
  };

  BLG.stages.gen_g3 = {
    id: "gen_g3",
    series: "gen",
    code: "GEN · G3",
    title: "岩雀封路，神牛开团",
    subtitle: "Viper 与 ON 的冠军点",
    date: "2026-11-15",
    type: "play",
    result: "win",
    hero: "assets/champions/taliyah.jpg",
    bg: "assets/stages/gen_g3.jpg",
    draft: {
      blue: { team: "gen", label: "GEN · 蓝色方", champs: [
        { name: "安蓓萨", icon: "ambessa" },
        { name: "猴子", icon: "monkeyking" },
        { name: "安妮", icon: "annie" },
        { name: "洛", icon: "rakan" },
        { name: "烬", icon: "jhin" }
      ]},
      red: { team: "blg", label: "BLG · 红色方", champs: [
        { name: "贾克斯", icon: "jax" },
        { name: "蔚", icon: "vi" },
        { name: "维克托", icon: "viktor" },
        { name: "牛头", icon: "alistar" },
        { name: "岩雀", icon: "taliyah" }
      ]}
    },
    startAdv: 52,
    startMind: 62,
    bpNote: "BLG 红色方。Viper 拿岩雀、ON 拿牛头，BLG 要用封路与二连开团拿冠军点。",
    bpOptions: [
      { id: "taliyah", label: "给 Viper 岩雀", desc: "历史线：BLG 把岩雀交给 Viper，用封路限制 GEN 的后排。", effect: { adv: 4, mind: 4 }, historical: true, task: "taliyah_pick" },
      { id: "alistar", label: "先拿 ON 牛头", desc: "保证正面开团与反手。", effect: { adv: 2, mind: 2 } },
      { id: "jax", label: "保 Bin 贾克斯", desc: "继续让 Bin 在边线施压。", effect: { adv: 1, mind: 0 } }
    ],
    rounds: [
      {
        time: "06:54",
        title: "下路三角草",
        line: "Viper 的岩雀在下路三角草抬飞 Duro 的洛。洛没有闪现。",
        options: [
          opt("taliyah", "让 Viper 先手", "历史线：岩雀抬飞洛，Viper 拿一血。", 7, 4, { historical: true, task: "first_blood", result: "Viper 岩雀抬飞 Duro 洛，拿下一血；7:18 Ruler 烬架狙击杀 Knight，双方经济持平。" }),
          opt("safe", "稳线", "不追洛，先把线控住。", 0, 1, { result: "BLG 下路稳住，但没有打出击杀。" }),
          opt("dive", "越塔", "让 Xun 来下，强行越塔。", -5, -3, { result: "GEN 反蹲到位，BLG 越塔失败。" })
        ]
      },
      {
        time: "20:29",
        title: "GEN 的 1 换 4",
        line: "上路 Bin 被抓，河道团战 GEN 打出 1 换 4，经济反超 1.6k。BLG 刚拿到的优势没了。",
        options: [
          opt("stable", "稳住，等 ON 开团", "历史线：BLG 不急着反打，等 23:22 的三角草团战。", -4, 5, { historical: true, task: "stay_calm", result: "BLG 稳住阵型，23:22 ON 牛头击飞洛，BLG 打出 1 换 3，经济回到均势。" }),
          opt("force", "强行接团", "不想放节奏，继续打。", -7, -5, { result: "GEN 双 C 输出拉满，BLG 再输一波团战。" }),
          opt("split", "让 Bin 单带", "正面避战，Bin 去边线。", -2, 1, { result: "Bin 带掉一座塔，但 GEN 拿到小龙，经济仍领先。" })
        ]
      },
      {
        time: "29:33",
        title: "龙魂团：贾克斯绕后",
        line: "小龙刷新，Bin 的贾克斯从侧面绕后。BLG 想拿炼金龙魂，也想拿冠军点。",
        options: [
          opt("flank", "Bin 绕后开团", "历史线：Bin 绕后开 E，BLG 0 换 4，听牌炼金龙魂。", 12, 7, { historical: true, task: "soul", result: "Bin 贾克斯绕后，BLG 0 换 4，听牌炼金龙魂，经济领先 6k。" }),
          opt("front", "正面接", "让 Xun 蔚先手，Bin 从正面进。", 2, 1, { result: "BLG 正面开团，双方互换技能，没能扩大优势。" }),
          opt("baron", "转大龙", "放小龙，直接打大龙。", 4, 2, { result: "BLG 拿下大龙，但 GEN 拿到小龙，比赛继续。" })
        ]
      }
    ],
    theater: {
      time: "36:54",
      title: "最后一波：冠军点",
      line: "BLG 推上 GEN 高地。Viper 的岩雀准备封路，ON 的牛头在找二连角度。",
      calls: [
        { id: "target", label: "打谁", options: [
          { id: "ruler", label: "Ruler", historical: true, bonus: 6 },
          { id: "chovy", label: "Chovy", bonus: 5 },
          { id: "front", label: "前排", bonus: 2 }
        ]},
        { id: "style", label: "怎么打", options: [
          { id: "flank", label: "封路开团", historical: true, bonus: 6 },
          { id: "engage", label: "正面开团", bonus: 4 },
          { id: "counter", label: "反打", bonus: 2 }
        ]},
        { id: "loot", label: "拿什么", options: [
          { id: "end", label: "一波结束", historical: true, bonus: 5 },
          { id: "soul", label: "炼金龙魂", bonus: 3 },
          { id: "baron", label: "大龙", bonus: 2 }
        ]}
      ],
      target: 58
    },
    tasks: [
      { id: "taliyah_pick", label: "给 Viper 岩雀" },
      { id: "first_blood", label: "下路一血" },
      { id: "stay_calm", label: "被 1 换 4 后稳住" },
      { id: "soul", label: "拿炼金龙魂" },
      { id: "theater", label: "团战剧场评分 ≥ 58" }
    ],
    report: {
      score: "BLG 2 : 1 GEN",
      lines: [
        "Viper 的岩雀、ON 的牛头。BLG 在被 GEN 1 换 4 后稳住，靠 23:22 与 29:33 两波团战翻回来。",
        "36:54，BLG 推平 GEN 基地，拿到冠军点。"
      ]
    }
  };

  BLG.stages.gen_g4 = {
    id: "gen_g4",
    series: "gen",
    code: "GEN · G4",
    title: "41:03 的抢龙",
    subtitle: "0-3 开局，也能把奖杯拿回来",
    date: "2026-11-15",
    type: "play",
    result: "win",
    hero: "assets/champions/neeko.jpg",
    bg: "assets/stages/gen_g4.jpg",
    draft: {
      blue: { team: "blg", label: "BLG · 蓝色方", champs: [
        { name: "梦魇", icon: "nocturne" },
        { name: "芸阿娜", icon: "yunara" },
        { name: "妮蔻", icon: "neeko" },
        { name: "格温", icon: "gwen" },
        { name: "卡牌", icon: "twistedfate" }
      ]},
      red: { team: "gen", label: "GEN · 红色方", champs: [
        { name: "璐璐", icon: "lulu" },
        { name: "霞", icon: "xayah" },
        { name: "潘森", icon: "pantheon" },
        { name: "阿卡丽", icon: "akali" },
        { name: "阿萝拉", icon: "aurora" }
      ]}
    },
    startAdv: 56,
    startMind: 62,
    bpNote: "BLG 蓝色方。GEN 把霞留给 Ruler，BLG 需要让 ON 的妮蔻在团战里找到角度。",
    bpOptions: [
      { id: "neeko", label: "给 ON 妮蔻", desc: "历史线：BLG 把妮蔻留给 ON，用多次多人大招开团。", effect: { adv: 4, mind: 5 }, historical: true, task: "neeko_pick" },
      { id: "gwen", label: "保 Bin 格温", desc: "让 Bin 在边线压制 Kiin。", effect: { adv: 2, mind: 1 } },
      { id: "tf", label: "给 Knight 卡牌", desc: "用全球流支援边线。", effect: { adv: 1, mind: 0 } }
    ],
    rounds: [
      {
        time: "02:22",
        title: "0-3 的 Viper",
        line: "Ruler 的霞在下路连续单杀 Viper 的芸阿娜。Viper 战绩来到 0-3，BLG 下路崩了。",
        options: [
          opt("weakside", "放养 Viper，换上半区", "历史线：BLG 不继续保下，让 Xun 去上半区换资源。", -4, 4, { historical: true, task: "weakside", result: "BLG 放养下路，Xun 抢下先锋，双方上单互换，经济追平。" }),
          opt("protect", "继续保下", "让 ON 留在下路，帮 Viper 止损。", -6, -3, { result: "GEN 继续针对下路，Viper 再死一次，BLG 下路彻底崩盘。" }),
          opt("swap", "换线", "让双人组去上路。", -1, 1, { result: "BLG 换线成功，但 Ruler 吃到下路一塔。" })
        ]
      },
      {
        time: "17:55",
        title: "妮蔻的第一波",
        line: "小龙团，ON 的妮蔻开大击飞 GEN 三人。BLG 想把经济反超。",
        options: [
          opt("neeko", "让 ON 找角度", "历史线：妮蔻击飞三人，BLG 1 换 2，经济反超 1.7k。", 8, 5, { historical: true, task: "neeko", result: "ON 妮蔻击飞三人，BLG 1 换 2，经济反超 1.7k。" }),
          opt("front", "正面接", "不等妮蔻进场，直接开团。", -3, -1, { result: "BLG 正面被 GEN 拉扯，团战没有打出优势。" }),
          opt("give", "放小龙", "不接团，换中路兵线。", -2, 1, { result: "GEN 拿到小龙，BLG 换到一点中路经济。" })
        ]
      },
      {
        time: "32:41",
        title: "大龙被抢之后",
        line: "ON 妮蔻再次开到四人，但 Canyon 的潘森抢下大龙。BLG 的领先被追回。",
        options: [
          opt("steady", "稳住，等 41:03", "历史线：BLG 不急，等第二条大龙与最后一波。", -3, 4, { historical: true, task: "steady", result: "BLG 稳住阵型，GEN 拿到炼金龙魂，双方回到 5k 差距。" }),
          opt("force", "强追", "不想放 GEN 走，继续追。", -7, -5, { result: "GEN 反打，BLG 再送一波，比赛进入危险区。" }),
          opt("split", "Bin 单带", "让 Bin 去边线换高地。", 1, 1, { result: "Bin 带掉一座塔，但 GEN 稳住大龙 buff。" })
        ]
      }
    ],
    theater: {
      time: "41:03",
      title: "最后一波：抢龙与绕后",
      line: "GEN 在打大龙。Xun 的梦魇关灯进场，ON 的妮蔻在找第二落点。",
      calls: [
        { id: "target", label: "打谁", options: [
          { id: "chovy", label: "Chovy", historical: true, bonus: 6 },
          { id: "ruler", label: "Ruler", bonus: 5 },
          { id: "canyon", label: "Canyon", bonus: 4 }
        ]},
        { id: "style", label: "怎么打", options: [
          { id: "flank", label: "绕后开团", historical: true, bonus: 6 },
          { id: "engage", label: "正面开团", bonus: 3 },
          { id: "counter", label: "反打", bonus: 2 }
        ]},
        { id: "loot", label: "拿什么", options: [
          { id: "end", label: "一波结束", historical: true, bonus: 5 },
          { id: "baron", label: "大龙", bonus: 3 },
          { id: "soul", label: "炼金龙魂", bonus: 2 }
        ]}
      ],
      target: 58
    },
    tasks: [
      { id: "neeko_pick", label: "给 ON 妮蔻" },
      { id: "weakside", label: "0-3 开局放养 Viper" },
      { id: "neeko", label: "妮蔻开团击飞三人" },
      { id: "steady", label: "大龙被抢后稳住" },
      { id: "theater", label: "团战剧场评分 ≥ 60" }
    ],
    eventPool: [
      {
        id: "prep_intel",
        type: "prep",
        title: "情报：GEN 想换线",
        line: "赛前情报组说 GEN 可能让 Ruler 避开下路对线。消息来源不确定。",
        options: [
          opt("trust", "相信情报，提前换线", "按情报调整开局站位。", 2, 1, { task: "prep_intel", result: "BLG 提前换线，Viper 避开了 Ruler 的第一波针对。" }),
          opt("bait", "反向埋伏", "假装换线，实际在下路做视野。", -1, 3, { task: "prep_bait", result: "BLG 骗出了 GEN 的游走，但自己的下路漏了两波兵。" }),
          opt("ignore", "按原计划", "不为一手不确定的情报改开局。", 1, 0, { task: "prep_plan", result: "BLG 保持原计划，下路对线按历史线展开。" })
        ]
      },
      {
        id: "prep_form",
        type: "prep",
        title: "Viper 的手感",
        line: "训练赛里 Viper 的芸阿娜状态一般。教练组在想要不要改打下路节奏。",
        options: [
          opt("late", "让 Viper 拿后期", "把资源留到三件套，前期只求不死。", 1, 3, { task: "prep_late", result: "BLG 把下路重心后移，Viper 的前期压力小了很多。" }),
          opt("topside", "围绕上路打", "让 Bin 的格温先接管边线。", 3, 1, { task: "prep_top", result: "Xun 把第一波节奏放到上半区，Bin 拿到线权。" }),
          opt("drill", "加练下路", "相信手感可以打回来。", -2, 2, { task: "prep_drill", result: "BLG 继续押注下路，风险更高，但队内没有动摇。" })
        ]
      },
      {
        id: "prep_draft",
        type: "prep",
        title: "红色方的 BP 陷阱",
        line: "GEN 可能把霞放到第三手，逼 BLG 先抢妮蔻。",
        options: [
          opt("neeko", "先锁妮蔻", "不管陷阱，先把 ON 的开团核心拿下来。", 3, 2, { task: "prep_neeko", result: "BLG 一抢妮蔻，GEN 的 BP 节奏被打乱。" }),
          opt("counter", "留 counter", "先拿中野，把辅助留到最后一手。", 2, 1, { task: "prep_counter", result: "BLG 把辅助位留到最后，BP 更灵活。" }),
          opt("xayah", "抢霞", "以抢代 Ban，不让 Ruler 舒服。", -1, 2, { task: "prep_xayah", result: "BLG 抢下霞，但自己的阵容少了一个开团点。" })
        ]
      },
      {
        id: "round_vision",
        type: "round",
        title: "河道的真眼",
        line: "17 分钟前，GEN 在河道补了一颗真眼。BLG 的下一步行动可能已经被看见。",
        options: [
          opt("clear", "先排视野", "让 ON 和 Xun 一起清河道。", 2, 2, { task: "round_clear", result: "BLG 排掉真眼，GEN 的第一波视野优势被抹平。" }),
          opt("rush", "直接提速", "不排眼，趁 GEN 没反应直接动龙。", 4, -2, { task: "round_rush", result: "BLG 抢时间动龙，但位置被 GEN 提前看到。" }),
          opt("bait", "将计就计", "假装不知道，反蹲 GEN 的视野。", -1, 3, { task: "round_bait", result: "BLG 反蹲成功，GEN 的游走撞进了包围圈。" })
        ]
      },
      {
        id: "round_objective",
        type: "round",
        title: "小龙还是先锋？",
        line: "小龙和先锋同时进入倒计时。Xun 的梦魇只能选一边。",
        options: [
          opt("dragon", "保小龙", "让 Xun 往下半区靠。", 3, 1, { task: "round_dragon", result: "BLG 收下小龙，但上半区放掉了先锋。" }),
          opt("herald", "保先锋", "让 Xun 去上半区帮 Bin。", 2, 2, { task: "round_herald", result: "BLG 拿到先锋，Bin 的边线开始起势。" }),
          opt("both", "全都要", "让双人组先动，Xun 抢时间。", -3, 3, { task: "round_both", result: "BLG 想全拿，阵型被拉得太开，GEN 找到机会。" })
        ]
      },
      {
        id: "round_emotion",
        type: "round",
        title: "0-3 之后的心态",
        line: "Viper 连续阵亡后没有说话。队内语音安静了几秒。",
        options: [
          opt("calm", "先稳心态", "告诉队员按原计划打，别急着追。", 1, 4, { task: "round_calm", result: "BLG 的语音重新有了节奏，Viper 也不再强行找机会。" }),
          opt("push", "继续压", "用更激进的节奏把士气打回来。", 3, -2, { task: "round_push", result: "BLG 提速成功，但风险明显更高。" }),
          opt("joke", "开个玩笑", "用一句玩笑把气氛拉回来。", 1, 2, { task: "round_joke", result: "队内气氛缓和，沟通恢复正常。" })
        ]
      },
      {
        id: "post_interview",
        type: "post",
        title: "赛后采访",
        line: "主持人问：0-3 开局时，你有没有想过会输？",
        options: [
          opt("honest", "说实话", "承认那一刻确实想过。", 0, 2, { result: "你说出了真实的犹豫，反而让这段冠军故事更完整。" }),
          opt("confident", "嘴硬一次", "告诉主持人：我们一直觉得能赢。", 1, 0, { result: "你的回答很硬气，队员们在场边笑了。" })
        ]
      },
      {
        id: "post_locker",
        type: "post",
        title: "更衣室",
        line: "奖杯放在桌上，队员们还在聊 41:03 那一波。",
        options: [
          opt("thank", "谢谢大家", "把这一局归功于选手。", 0, 2, { result: "你把功劳还给队员，更衣室的气氛松了下来。" }),
          opt("next", "已经开始想下一冠", "提醒大家，这只是一个开始。", 1, 0, { result: "队员们笑着说明年再来一次。" })
        ]
      },
      {
        id: "post_note",
        type: "post",
        title: "历史注释",
        line: "这不是平行历史。你只是把同一段历史，打出了不同的过程。",
        options: [
          opt("record", "记下来", "把这次选择留在教练档案里。", 0, 1, { result: "这次变奏被记进了你的教练档案。" }),
          opt("skip", "翻篇", "冠军已经拿到，向前看。", 0, 0, { result: "你合上战术板，准备下一段征程。" })
        ]
      }
    ],
    resultTag: "夺冠",
    resultTitle: "新王登基。",
    resultSub: "41:03，BLG 推平 GEN 基地。让一追三，队史首个全球总决赛冠军。",
    report: {
      score: "BLG 3 : 1 GEN",
      lines: [
        "Ruler 的霞三次击杀 Viper，BLG 下路 0-3 开局。",
        "ON 妮蔻多次开团，Xun 梦魇抢下大龙，Bin 格温收割。41:03，BLG 0 换 2 一波推平 GEN。",
        "BLG 让一追三，队史首冠。Knight 获 FMVP。"
      ]
    }
  };

  BLG.series = BLG.series || {};
  BLG.series.gen = {
    id: "gen",
    name: "决赛 · GEN",
    opponent: "gen",
    color: "#c8a24a",
    tagline: "让一追三 · 队史首冠",
    stages: ["gen_g1", "gen_g2", "gen_g3", "gen_g4"],
    score: "3 : 1",
    note: "G1 为互动过场（GEN 胜），G2–G4 必须赢。赛果锁定 3:1，让一追三。",
    winTitle: "新王登基。",
    winText: "BLG 在先失一局后连扳三局，3:1 战胜 GEN。队史首个全球总决赛冠军，Knight 获 FMVP。",
    winBg: "assets/stages/gen_win_full.jpg",
    mvp: { name: "Knight", photo: "assets/players/knight.png" },
    next: null
  };
})();
