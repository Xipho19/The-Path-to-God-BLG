/* 半决赛 T1：G1/G3/G4 可玩，G2 为互动过场。所有赛果锁定。 */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  const opt = (id, label, desc, adv, mind, extra) => Object.assign({
    id, label, desc, effect: { adv, mind }
  }, extra || {});

  BLG.stages = {
    "t1_g1": {
      id: "t1_g1",
      series: "t1",
      code: "T1 · G1",
      title: "耐心与纪律",
      subtitle: "先锋团之前，先把大招留住",
      date: "2026-11-09",
      type: "play",
      result: "win",
      hero: "assets/champions/orianna.jpg",
      bg: "assets/stages/t1_g1.jpg",
      draft: {
        blue: { team: "blg", label: "BLG · 蓝色方", champs: [
          { name: "泰坦", icon: "nautilus" },
          { name: "发条", icon: "orianna" },
          { name: "奎桑提", icon: "ksante" },
          { name: "百裂冥犬", icon: "naafiri" },
          { name: "飞机", icon: "corki" }
        ]},
        red: { team: "t1", label: "T1 · 红色方", champs: [
          { name: "梦魇", icon: "nocturne" },
          { name: "洛克", icon: "locke" },
          { name: "兰博", icon: "rumble" },
          { name: "霞", icon: "xayah" },
          { name: "洛", icon: "rakan" }
        ]}
      },
      startAdv: 50,
      startMind: 60,
      bpNote: "BLG 蓝色方。T1 的阵容擅长反打，第一轮别把所有资源押在下路。",
      bpOptions: [
        { id: "hold", label: "放小龙，换 Viper 发育", desc: "历史线：BLG 前期放掉小龙，把线权换成 Viper 的装备曲线。", effect: { adv: 2, mind: 4 }, historical: true, task: "hold_dragon" },
        { id: "contest", label: "正面接第一条小龙", desc: "提前接团，赢了加速，输了会让 T1 的节奏提前到来。", effect: { adv: -6, mind: -2 } },
        { id: "dive", label: "让 Xun 先抓上", desc: "把资源押在 Bin 的奎桑提身上，争取上半区优势。", effect: { adv: 1, mind: 1 } }
      ],
      rounds: [
        {
          time: "06:00",
          title: "下路的第一波交换",
          line: "BLG 下路打出 Peyz 闪现，T1 四人越塔换掉首杀。下路平衡还在，但 Viper 需要发育。",
          options: [
            opt("protect", "保 Viper 吃线", "让 ON 留在下路，Xun 靠下反蹲。历史线选择。", 4, 3, { historical: true, task: "protect_viper", result: "Viper 吃到两波兵，BLG 下路稳住；T1 的越塔只换来一个首杀。" }),
            opt("dive", "继续越 Peyz", "趁 Peyz 没闪，强行再越一次。成功则下路打开，失败则送双杀。", -4, -2, { result: "T1 早有准备，Oner 反蹲到位，BLG 越塔失败，下路压力变大。" }),
            opt("mid", "让 Knight 游下", "用中路的线权换下路一波三包二。", 1, 0, { result: "Knight 游下逼出技能，双方拉开，没有产生击杀。" })
          ]
        },
        {
          time: "15:00",
          title: "先锋团：等 Peyz 交技能",
          line: "T1 先击杀 ON 和 Bin，BLG 人数劣势。Knight 的大招还捏在手里——这是本局最重要的一次等待。",
          options: [
            opt("hold_ult", "等 Peyz 交闪再进场", "历史线：Knight 保留大招，等 Peyz 闪现与大招都交掉，再配合 Xun 进场。", 12, 6, { historical: true, task: "hold_ult", result: "Peyz 交闪的瞬间，Knight 大招卷住 Peyz 与 Faker，Viper 收割，BLG 0 换 4。" }),
            opt("engage", "立刻先手", "趁 T1 站位集中直接开团，不等技能。", -12, -6, { result: "Knight 大招被 Keria 的波比挡下，BLG 反被 T1 打出 1 换 4。" }),
            opt("give", "放先锋", "放弃先锋，换下路两波线。", -4, 0, { result: "T1 拿到先锋，BLG 换到一点下路经济，但节奏仍在 T1 手里。" })
          ]
        },
        {
          time: "30:30",
          title: "大龙逼团，结束比赛",
          line: "BLG 经济反超，T1 想找机会开团。大龙区的视野已经铺好。",
          options: [
            opt("baron", "大龙逼团", "历史线：BLG 用大龙逼 T1 接团，带着经济差结束比赛。", 6, 3, { historical: true, task: "baron_end", result: "T1 没有开团角度，BLG 拿下大龙，30:30 推平基地。" }),
            opt("split", "继续分带", "让 Bin 在边线施压，正面不开团。", -2, 0, { result: "T1 抓到边线空档，比赛被拖入更久的拉锯。" }),
            opt("double", "双龙逼团", "先拿小龙再转大龙，风险更高。", -3, -1, { result: "BLG 转线慢了半拍，T1 把大龙视野重新抢回。" })
          ]
        }
      ],
      theater: {
        time: "30:30",
        title: "最后一波：把团开在 T1 的阵型里",
        line: "BLG 带着经济差压进 T1 的野区。Knight 的发条还有大招，Viper 的站位在侧翼。",
        calls: [
          { id: "target", label: "打谁", options: [
            { id: "peyz", label: "Peyz", historical: true, bonus: 6 },
            { id: "faker", label: "Faker", bonus: 3 },
            { id: "front", label: "前排", bonus: 1 }
          ]},
          { id: "style", label: "怎么打", options: [
            { id: "counter", label: "反打", historical: true, bonus: 6 },
            { id: "engage", label: "先手", bonus: 2 },
            { id: "poke", label: "拉扯", bonus: 3 }
          ]},
          { id: "loot", label: "拿什么", options: [
            { id: "end", label: "一波结束", historical: true, bonus: 5 },
            { id: "baron", label: "大龙", bonus: 3 },
            { id: "soul", label: "小龙", bonus: 2 }
          ]}
        ],
        target: 58
      },
      tasks: [
        { id: "hold_ult", label: "先锋团等 Peyz 交技能" },
        { id: "protect_viper", label: "保 Viper 发育" },
        { id: "baron_end", label: "30:30 大龙结束" },
        { id: "theater", label: "团战剧场评分 ≥ 58" }
      ],
      report: {
        score: "BLG 1 : 0 T1",
        lines: [
          "15 分钟的先锋团，Knight 一直捏着大招。等 Peyz 交出闪现与大招，BLG 才进场。",
          "这一局赢的不是操作，是等待。BLG 30:30 结束比赛。"
        ]
      }
    },

    "t1_g2": {
      id: "t1_g2",
      series: "t1",
      code: "T1 · G2",
      title: "Faker 的世界波",
      subtitle: "有些局，剧本不在你手里",
      date: "2026-11-09",
      type: "cutscene",
      result: "loss",
      panels: [
        {
          art: "dive",
          bg: "assets/champions/poppy.jpg",
          eyebrow: "第二局 · T1 蓝色方",
          title: "波比站在突进阵容面前",
          text: "BLG 选出卡蜜尔、奇亚娜、妖姬、卡莎——一套必须从第一分钟压到尾的阵容。T1 把 Keria 的波比留在最后，专门等 BLG 进场。"
        },
        {
          art: "lead",
          bg: "assets/champions/ksante.jpg",
          eyebrow: "前期",
          title: "Xun 两次抓上，BLG 领先 2.2k",
          text: "Xun 连续针对 Doran，BLG 拿到想要的开局。但 T1 不接龙团，选择换线、换资源，把比赛拖进他们熟悉的节奏。"
        },
        {
          art: "syndra",
          bg: "assets/champions/syndra.jpg",
          eyebrow: "中期 · 22:00",
          title: "两记世界波",
          text: "Faker 的辛德拉在侧翼找到角度。第一记大招打散 BLG 的阵型，第二记大招收掉残局。T1 一波把经济追平，再把比赛翻过去。"
        },
        {
          art: "score",
          bg: "assets/champions/orianna.jpg",
          eyebrow: "赛后",
          title: "比分 1:1",
          text: "BLG 输掉这一局。不是阵容不够强，是对手太清楚怎么让这套阵容不舒服。系列赛回到同一起跑线。"
        }
      ],
      choices: [
        { id: "faker", label: "看 Faker 的辛德拉", line: "镜头停在 Faker 的手上。两记大招的落点，像在给下一局出题。" },
        { id: "keria", label: "看 Keria 的波比", line: "镜头停在 Keria 的波比上。BLG 每一次进场，都被同一面墙弹了回来。" }
      ],
      resultLine: "T1 1 : 1 BLG",
      mindDelta: -8,
      unlock: "t1_g3"
    },

    "t1_g3": {
      id: "t1_g3",
      series: "t1",
      code: "T1 · G3",
      title: "草丛里的 Faker",
      subtitle: "神也会犯错，但你要在那里等",
      date: "2026-11-09",
      type: "play",
      result: "win",
      hero: "assets/champions/pantheon.jpg",
      bg: "assets/stages/t1_g3.jpg",
      draft: {
        blue: { team: "blg", label: "BLG · 蓝色方", champs: [
          { name: "伊泽瑞尔", icon: "ezreal" },
          { name: "潘森", icon: "pantheon" },
          { name: "纳尔", icon: "gnar" },
          { name: "娜美", icon: "nami" },
          { name: "岩雀", icon: "taliyah" }
        ]},
        red: { team: "t1", label: "T1 · 红色方", champs: [
          { name: "卡尔玛", icon: "karma" },
          { name: "皇子", icon: "jarvaniv" },
          { name: "安蓓萨", icon: "ambessa" },
          { name: "希维尔", icon: "sivir" },
          { name: "狐狸", icon: "ahri" }
        ]}
      },
      startAdv: 52,
      startMind: 55,
      bpNote: "BLG 蓝色方。T1 拿到狐狸与皇子，BLG 需要把中路视野做成陷阱。",
      bpOptions: [
        { id: "vision", label: "先做中路两侧视野", desc: "历史线：BLG 提前布置草丛视野，为 26:48 的蹲伏做准备。", effect: { adv: 3, mind: 5 }, historical: true, task: "vision_prep" },
        { id: "dive", label: "继续抓 Doran", desc: "把资源继续押在上路，争取让 Doran 更早崩。", effect: { adv: -2, mind: 0 } },
        { id: "scale", label: "保 Viper 三件套", desc: "放慢节奏，等伊泽瑞尔装备成型。", effect: { adv: 1, mind: 2 } }
      ],
      rounds: [
        {
          time: "22:05",
          title: "Faker 的游龙",
          line: "小龙团，Faker 的狐狸在侧翼游龙，连续击杀 Bin 与 Knight，T1 打出 1 换 4。BLG 刚建立的优势被抹平。",
          options: [
            opt("fight", "接团", "历史线：BLG 选择接团，但被 Faker 找到侧翼角度。", -12, -8, { historical: true, task: "survive_2205", result: "Faker 狐狸进场，BLG 阵型被切开，T1 1 换 4。场面回到均势。" }),
            opt("give", "放小龙", "放弃小龙，保住阵型，等下一波。", -3, 2, { result: "BLG 放掉小龙，T1 拿到资源，但 BLG 没有死人。" }),
            opt("cross", "换家", "让 Bin 去上路换塔，正面不接。", -5, 0, { result: "Bin 换到一座塔，但 T1 拿到小龙，节奏仍在 T1 手里。" })
          ]
        },
        {
          time: "26:48",
          title: "中路草丛：等一个脸探",
          line: "Faker 的狐狸在中路清线。BLG 的诱饵视野已经布好，Xun 的潘森就在旁边。",
          options: [
            opt("bush", "蹲草，等 Faker 进来", "历史线：BLG 不主动开团，等 Faker 脸探草丛，Xun 潘森 W 控住。", 14, 8, { historical: true, task: "bush_trap", result: "Faker 脸探草丛，Xun 潘森 W 定住，BLG 0 换 4 拿下大龙，经济反超。" }),
            opt("engage", "主动开团", "不等 Faker 走进来，直接让 Xun 跳大。", -8, -4, { result: "Faker 交出位移躲开第一波控制，T1 反打，BLG 只换掉一个辅助。" }),
            opt("dragon", "放中路，去打小龙", "用小龙换节奏，不追 Faker。", -2, 1, { result: "BLG 拿到小龙，但错过了中路的最大机会。" })
          ]
        },
        {
          time: "32:21",
          title: "火龙魂团",
          line: "BLG 听牌火龙魂。T1 必须接这一波，否则比赛会被龙魂推着走。",
          options: [
            opt("counter", "反打", "历史线：BLG 让 T1 先手，等 Oner 进场后再反打，Viper 双杀。", 10, 5, { historical: true, task: "fire_soul", result: "Oner 皇子先手被打出复活甲，BLG 反打 2 换 4，拿下火龙魂。" }),
            opt("force", "先手开团", "让 Xun 潘森直接跳大。", -6, -2, { result: "T1 站位分散，BLG 先手只抓到前排，团战变成互换。" }),
            opt("steal", "抢龙", "让 Xun 拼惩戒，先拿龙魂再说。", 4, 1, { result: "Xun 抢下火龙魂，BLG 拿到龙魂，但团战没有扩大战果。" })
          ]
        }
      ],
      theater: {
        time: "35:54",
        title: "最后的跳大",
        line: "BLG 推掉 T1 中上两路水晶。Xun 的潘森已经绕到侧面，T1 只剩最后一波防守。",
        calls: [
          { id: "target", label: "打谁", options: [
            { id: "oner", label: "Oner", historical: true, bonus: 6 },
            { id: "faker", label: "Faker", bonus: 4 },
            { id: "peyz", label: "Peyz", bonus: 2 }
          ]},
          { id: "style", label: "怎么打", options: [
            { id: "engage", label: "跳大先手", historical: true, bonus: 6 },
            { id: "counter", label: "反打", bonus: 3 },
            { id: "poke", label: "拉扯", bonus: 1 }
          ]},
          { id: "loot", label: "拿什么", options: [
            { id: "end", label: "一波结束", historical: true, bonus: 5 },
            { id: "baron", label: "大龙", bonus: 3 },
            { id: "soul", label: "火龙魂", bonus: 2 }
          ]}
        ],
        target: 58
      },
      tasks: [
        { id: "vision_prep", label: "提前布置中路视野" },
        { id: "bush_trap", label: "26:48 蹲到 Faker" },
        { id: "fire_soul", label: "拿下火龙魂" },
        { id: "theater", label: "团战剧场评分 ≥ 58" }
      ],
      report: {
        score: "BLG 2 : 1 T1",
        lines: [
          "22:05，Faker 先让所有人看到神为什么是神。",
          "26:48，他在中路脸探草丛。Xun 的潘森就在那里。BLG 0 换 4，拿大龙。",
          "35:54，BLG 推平基地，2:1 拿到赛点。"
        ]
      }
    },

    "t1_g4": {
      id: "t1_g4",
      series: "t1",
      code: "T1 · G4",
      title: "四打五，然后反打",
      subtitle: "大龙被翻之后，才轮到心态上场",
      date: "2026-11-09",
      type: "play",
      result: "win",
      hero: "assets/champions/seraphine.jpg",
      bg: "assets/stages/t1_g4.jpg",
      draft: {
        blue: { team: "blg", label: "BLG · 蓝色方", champs: [
          { name: "鳄鱼", icon: "renekton" },
          { name: "蝎子", icon: "skarner" },
          { name: "维克托", icon: "viktor" },
          { name: "艾希", icon: "ashe" },
          { name: "萨勒芬妮", icon: "seraphine" }
        ]},
        red: { team: "t1", label: "T1 · 红色方", champs: [
          { name: "薇恩", icon: "vayne" },
          { name: "猴子", icon: "monkeyking" },
          { name: "阿卡丽", icon: "akali" },
          { name: "卢锡安", icon: "lucian" },
          { name: "米利欧", icon: "milio" }
        ]}
      },
      startAdv: 50,
      startMind: 50,
      bpNote: "T1 蓝色方。BLG 红色方，萨勒芬妮与蝎子是这个阵容的开团核心。",
      bpOptions: [
        { id: "sera", label: "一抢萨勒芬妮", desc: "历史线：BLG 把 ON 的萨勒芬妮放在第一轮，保证团战开团角度。", effect: { adv: 4, mind: 6 }, historical: true, task: "sera_pick" },
        { id: "renek", label: "先给 Bin 鳄鱼", desc: "保证上路对线强度，把开团交给后手。", effect: { adv: 2, mind: 2 } },
        { id: "scale", label: "保 Viper 后期", desc: "把资源押在艾希身上，前期更保守。", effect: { adv: -2, mind: 1 } }
      ],
      rounds: [
        {
          time: "08:21",
          title: "四打五的巢虫团",
          line: "BLG 少一个人。ON 的萨勒芬妮已经找到角度，T1 四个人站在一起。",
          options: [
            opt("fourvfive", "让 ON 直接开", "历史线：BLG 四打五仍然接团，ON 大招命中四人。", 10, 6, { historical: true, task: "sera4", result: "ON 萨勒芬妮大招命中四人，Viper 艾希拿一血，再杀 Peyz，BLG 0 换 3，领先 1.8k。" }),
            opt("wait", "等第五个人", "放弃巢虫，等队友复活再打。", -4, 1, { result: "BLG 放掉巢虫，T1 拿到资源，但双方没有爆发团战。" }),
            opt("give", "放巢虫换下路", "用巢虫换 Viper 的线权。", -2, 0, { result: "Viper 吃到一波线，T1 拿下巢虫，经济持平。" })
          ]
        },
        {
          time: "26:00",
          title: "大龙团：Doran 的薇恩",
          line: "BLG 领先 3k，T1 搏命开大龙。Doran 的薇恩在侧翼找到了输出角度。",
          options: [
            opt("baron", "接大龙团", "历史线：BLG 接团，但 Doran 薇恩双杀，T1 2 换 5 并拿下大龙。", -14, -12, { historical: true, task: "baron_throw", result: "Doran 薇恩双杀收割，T1 2 换 5 团灭 BLG，拿下大龙，经济被追平。" }),
            opt("give", "放大龙", "放弃大龙，稳住高地。", -2, 2, { result: "BLG 放掉大龙，T1 拿到增益，但 BLG 的阵型没有崩。" }),
            opt("split", "让 Bin 换家", "用 Bin 的鳄鱼去换 T1 高地。", -6, -2, { result: "Bin 换掉一座高地塔，但 T1 拿到大龙，BLG 正面压力更大。" })
          ]
        },
        {
          time: "31:00",
          title: "崩盘后的五秒",
          line: "大龙被翻，团队冷静值掉到危险区。T1 正在中路推进。现在，是稳一手，还是反打？",
          options: [
            opt("counter", "中路反打", "历史线：BLG 不等 T1 站稳，Bin 鳄鱼先杀薇恩，Knight 维克托融化 Faker 阿卡丽。", 15, 10, { historical: true, task: "mid_counter", result: "Bin 鳄鱼击杀 Doran 薇恩，Knight 维克托融化 Faker 阿卡丽，BLG 0 换 3，重新拿回主动权。" }),
            opt("stable", "稳守高地", "先把兵线清掉，等 T1 犯错。", -3, 3, { result: "BLG 稳住高地，但 T1 把视野压进野区，比赛继续拉锯。" }),
            opt("split", "分带换资源", "让 Bin 去边线，正面避战。", -4, -1, { result: "Bin 带掉一座塔，但 T1 在中路拿到更多视野。" })
          ]
        }
      ],
      theater: {
        time: "赛后 · 终结",
        title: "最后一波：绕后开团",
        line: "BLG 拿下土龙魂，冲上 T1 高地。Xun 的蝎子从侧面绕后，ON 的萨勒芬妮在找第二落点。",
        calls: [
          { id: "target", label: "打谁", options: [
            { id: "doran", label: "Doran", historical: true, bonus: 6 },
            { id: "faker", label: "Faker", bonus: 5 },
            { id: "peyz", label: "Peyz", bonus: 4 }
          ]},
          { id: "style", label: "怎么打", options: [
            { id: "flank", label: "绕后开团", historical: true, bonus: 6 },
            { id: "engage", label: "正面开团", bonus: 2 },
            { id: "counter", label: "反打", bonus: 3 }
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
        { id: "sera4", label: "8:21 萨勒芬妮大到 4 人" },
        { id: "baron_throw", label: "经历大龙被翻" },
        { id: "mid_counter", label: "中路反打 0 换 3" },
        { id: "theater", label: "团战剧场评分 ≥ 60" }
      ],
      report: {
        score: "BLG 3 : 1 T1",
        lines: [
          "8:21，ON 的萨勒芬妮大到四人，BLG 四打五打出 0 换 3。",
          "26 分钟，Doran 的薇恩把大龙翻回去。BLG 的领先被抹平。",
          "31 分钟，Bin 的鳄鱼先杀薇恩，Knight 的维克托融化 Faker。BLG 0 换 3。",
          "41:03，Xun 抢下大龙，BLG 一波推平。3:1。十三年，到此为止。"
        ]
      }
    }
  };

  BLG.series = {
    t1: {
      id: "t1",
      name: "半决赛 · T1",
      opponent: "t1",
      color: "#e4273c",
      tagline: "十三年魔咒 · LPL 首次世界赛 BO5 击败 T1",
      stages: ["t1_g1", "t1_g2", "t1_g3", "t1_g4"],
      score: "3 : 1",
      note: "赛果锁定：G1、G3、G4 必须赢，G2 是互动过场。每局 6–12 分钟，自动保存。",
      winTitle: "十三年，到此为止。",
      winText: "LPL 队伍首次在全球总决赛 BO5 中击败 T1。Faker 的四连冠停在半决赛，BLG 走进决赛。",
      mvp: { name: "Knight", photo: "assets/players/knight.png" },
      next: "决赛 · GEN"
    }
  };
})();
