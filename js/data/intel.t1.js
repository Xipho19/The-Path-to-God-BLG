/* 局内作战室数据：每个关键回合的战场状态、焦点对位、教练通讯 */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  BLG.intel = {
    t1_g1: {
      "06:00": {
        gold: -300, dragons: 0, enemyDragons: 0, grubs: 0, enemyGrubs: 0,
        towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 45,
        focus: "bot", contest: null,
        comms: [
          { time: "05:42", who: "ON", text: "Peyz 没闪，下路可以打。" },
          { time: "05:58", who: "XUN", text: "我先靠下，别越太深。" }
        ],
        duel: {
          blue: { player: "viper", champ: "飞机", icon: "corki" },
          red: { player: "peyz", champ: "霞", icon: "xayah" }
        }
      },
      "15:00": {
        gold: -900, dragons: 1, enemyDragons: 0, grubs: 2, enemyGrubs: 1,
        towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 52,
        focus: "mid", contest: "herald",
        comms: [
          { time: "14:48", who: "KNIGHT", text: "大招还在，等 Peyz 先交。" },
          { time: "14:55", who: "XUN", text: "他交闪我就进。" }
        ],
        duel: {
          blue: { player: "knight", champ: "发条", icon: "orianna" },
          red: { player: "faker", champ: "洛克", icon: "locke" }
        }
      },
      "30:30": {
        gold: 6500, dragons: 3, enemyDragons: 0, grubs: 3, enemyGrubs: 1,
        towers: 7, enemyTowers: 2, baron: 1, enemyBaron: 0, vision: 68,
        focus: "baron", contest: "baron",
        comms: [
          { time: "30:12", who: "BIN", text: "我正面顶住，你们打龙。" },
          { time: "30:22", who: "ON", text: "视野做好了，他们没有角度。" }
        ],
        duel: {
          blue: { player: "bin", champ: "奎桑提", icon: "ksante" },
          red: { player: "doran", champ: "兰博", icon: "rumble" }
        }
      }
    },

    t1_g3: {
      "22:05": {
        gold: -1200, dragons: 1, enemyDragons: 1, grubs: 3, enemyGrubs: 1,
        towers: 1, enemyTowers: 2, baron: 0, enemyBaron: 0, vision: 44,
        focus: "mid", contest: "dragon",
        comms: [
          { time: "22:01", who: "KNIGHT", text: "他绕后了，我被他找到。" },
          { time: "22:04", who: "ON", text: "放龙，别追，先保阵型。" }
        ],
        duel: {
          blue: { player: "knight", champ: "岩雀", icon: "taliyah" },
          red: { player: "faker", champ: "狐狸", icon: "ahri" }
        }
      },
      "26:48": {
        gold: -800, dragons: 2, enemyDragons: 1, grubs: 3, enemyGrubs: 1,
        towers: 2, enemyTowers: 2, baron: 0, enemyBaron: 0, vision: 55,
        focus: "mid", contest: "baron",
        comms: [
          { time: "26:40", who: "XUN", text: "我在草里，别先动。" },
          { time: "26:45", who: "ON", text: "诱饵视野好了，等他进来。" }
        ],
        duel: {
          blue: { player: "xun", champ: "潘森", icon: "pantheon" },
          red: { player: "faker", champ: "狐狸", icon: "ahri" }
        }
      },
      "32:21": {
        gold: 3200, dragons: 3, enemyDragons: 1, grubs: 3, enemyGrubs: 1,
        towers: 5, enemyTowers: 2, baron: 0, enemyBaron: 0, vision: 66,
        focus: "dragon", contest: "dragon",
        comms: [
          { time: "32:10", who: "VIPER", text: "能打，我先手。" },
          { time: "32:16", who: "KNIGHT", text: "别追，反打。" }
        ],
        duel: {
          blue: { player: "viper", champ: "伊泽瑞尔", icon: "ezreal" },
          red: { player: "peyz", champ: "希维尔", icon: "sivir" }
        }
      }
    },

    t1_g4: {
      "08:21": {
        gold: 1800, dragons: 0, enemyDragons: 0, grubs: 3, enemyGrubs: 0,
        towers: 0, enemyTowers: 0, baron: 0, enemyBaron: 0, vision: 50,
        focus: "mid", contest: "grubs",
        comms: [
          { time: "08:12", who: "ON", text: "我找到角度了，能开四个。" },
          { time: "08:18", who: "XUN", text: "四打五也能接，跟我。" }
        ],
        duel: {
          blue: { player: "on", champ: "萨勒芬妮", icon: "seraphine" },
          red: { player: "keria", champ: "米利欧", icon: "milio" }
        }
      },
      "26:00": {
        gold: 3000, dragons: 2, enemyDragons: 0, grubs: 3, enemyGrubs: 1,
        towers: 3, enemyTowers: 1, baron: 0, enemyBaron: 0, vision: 60,
        focus: "baron", contest: "baron",
        comms: [
          { time: "25:48", who: "BIN", text: "我盯薇恩，别让他收割。" },
          { time: "25:55", who: "KNIGHT", text: "别急，等他们先开。" }
        ],
        duel: {
          blue: { player: "bin", champ: "鳄鱼", icon: "renekton" },
          red: { player: "doran", champ: "薇恩", icon: "vayne" }
        }
      },
      "31:00": {
        gold: -500, dragons: 2, enemyDragons: 0, grubs: 3, enemyGrubs: 1,
        towers: 3, enemyTowers: 3, baron: 0, enemyBaron: 1, vision: 48,
        focus: "mid", contest: "baron",
        comms: [
          { time: "30:52", who: "ON", text: "稳一手？他们有大龙。" },
          { time: "30:58", who: "BIN", text: "能反打，我先杀薇恩。" }
        ],
        duel: {
          blue: { player: "knight", champ: "维克托", icon: "viktor" },
          red: { player: "faker", champ: "阿卡丽", icon: "akali" }
        }
      }
    }
  };
})();
