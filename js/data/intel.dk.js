/* DK 系列赛作战室数据 */
(function () {
  globalThis.BLG = globalThis.BLG || {};
  BLG.intel = BLG.intel || {};

  BLG.intel.dk_g1 = {
    "03:30": {
      gold: -700, dragons: 0, enemyDragons: 0, grubs: 0, enemyGrubs: 0,
      towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 44,
      focus: "top", contest: "bot",
      comms: [
        { time: "03:12", who: "ON", text: "下路能换，Viper 别急着交闪。" },
        { time: "03:26", who: "BIN", text: "我上路被越了，能换吗？" }
      ],
      duel: {
        blue: { player: "bin", champ: "安蓓萨", icon: "ambessa" },
        red: { player: "siwoo", champ: "兰博", icon: "rumble" }
      }
    },
    "15:55": {
      gold: -1200, dragons: 2, enemyDragons: 1, grubs: 2, enemyGrubs: 2,
      towers: 1, enemyTowers: 2, baron: 0, enemyBaron: 0, vision: 52,
      focus: "mid", contest: "herald",
      comms: [
        { time: "15:40", who: "XUN", text: "先锋我能拿，Knight 准备进。" },
        { time: "15:48", who: "KNIGHT", text: "我大招好了，等我先吸。" }
      ],
      duel: {
        blue: { player: "knight", champ: "加里奥", icon: "galio" },
        red: { player: "showmaker", champ: "阿卡丽", icon: "akali" }
      }
    },
    "30:00": {
      gold: 4200, dragons: 4, enemyDragons: 1, grubs: 3, enemyGrubs: 2,
      towers: 6, enemyTowers: 3, baron: 1, enemyBaron: 0, vision: 64,
      focus: "dragon", contest: "dragon",
      comms: [
        { time: "29:42", who: "XUN", text: "远古龙我能拼，别先开。" },
        { time: "29:55", who: "VIPER", text: "我先打前排，你们看龙。" }
      ],
      duel: {
        blue: { player: "xun", champ: "百裂冥犬", icon: "naafiri" },
        red: { player: "lucid", champ: "奇亚娜", icon: "qiyana" }
      }
    }
  };

  BLG.intel.dk_g2 = {
    "03:16": {
      gold: 100, dragons: 0, enemyDragons: 0, grubs: 0, enemyGrubs: 0,
      towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 48,
      focus: "bot", contest: "bot",
      comms: [
        { time: "03:04", who: "VIPER", text: "我盲 Q 试试，Smash 站位很靠前。" },
        { time: "03:12", who: "ON", text: "中了就上，我跟你。" }
      ],
      duel: {
        blue: { player: "viper", champ: "伊泽瑞尔", icon: "ezreal" },
        red: { player: "smash", champ: "芸阿娜", icon: "yunara" }
      }
    },
    "09:48": {
      gold: -1000, dragons: 1, enemyDragons: 0, grubs: 0, enemyGrubs: 1,
      towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 53,
      focus: "dragon", contest: "dragon",
      comms: [
        { time: "09:32", who: "XUN", text: "皇子要 EQ 进，先拉扯。" },
        { time: "09:40", who: "KNIGHT", text: "我大招拉他，Viper 点 Smash。" }
      ],
      duel: {
        blue: { player: "knight", champ: "发条", icon: "orianna" },
        red: { player: "lucid", champ: "皇子", icon: "jarvaniv" }
      }
    },
    "23:00": {
      gold: 3800, dragons: 4, enemyDragons: 0, grubs: 1, enemyGrubs: 1,
      towers: 5, enemyTowers: 2, baron: 0, enemyBaron: 0, vision: 66,
      focus: "dragon", contest: "baron",
      comms: [
        { time: "22:44", who: "XUN", text: "风龙魂到手，转远古龙。" },
        { time: "22:52", who: "ON", text: "我先做视野，别被皇子开。" }
      ],
      duel: {
        blue: { player: "viper", champ: "伊泽瑞尔", icon: "ezreal" },
        red: { player: "smash", champ: "芸阿娜", icon: "yunara" }
      }
    }
  };

  BLG.intel.dk_g3 = {
    "02:24": {
      gold: 0, dragons: 0, enemyDragons: 0, grubs: 1, enemyGrubs: 0,
      towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 46,
      focus: "top", contest: "top",
      comms: [
        { time: "02:16", who: "BIN", text: "能打，我塔下反打。" },
        { time: "02:20", who: "XUN", text: "我赶不到，你先撑住。" }
      ],
      duel: {
        blue: { player: "bin", champ: "贾克斯", icon: "jax" },
        red: { player: "siwoo", champ: "奥拉夫", icon: "olaf" }
      }
    },
    "15:58": {
      gold: 1500, dragons: 1, enemyDragons: 0, grubs: 1, enemyGrubs: 1,
      towers: 2, enemyTowers: 1, baron: 0, enemyBaron: 0, vision: 55,
      focus: "mid", contest: "herald",
      comms: [
        { time: "15:44", who: "BIN", text: "我先杀 Siwoo，你们看维克托。" },
        { time: "15:52", who: "KNIGHT", text: "维克托进场了，散开。" }
      ],
      duel: {
        blue: { player: "showmaker", champ: "维克托", icon: "viktor" },
        red: { player: "knight", champ: "狐狸", icon: "ahri" }
      }
    },
    "23:50": {
      gold: 2000, dragons: 3, enemyDragons: 0, grubs: 2, enemyGrubs: 1,
      towers: 3, enemyTowers: 2, baron: 0, enemyBaron: 0, vision: 60,
      focus: "dragon", contest: "dragon",
      comms: [
        { time: "23:36", who: "BIN", text: "我绕后，等我进场。" },
        { time: "23:44", who: "XUN", text: "我先开龙，逼他们过来。" }
      ],
      duel: {
        blue: { player: "bin", champ: "贾克斯", icon: "jax" },
        red: { player: "smash", champ: "厄斐琉斯", icon: "aphelios" }
      }
    }
  };
})();
