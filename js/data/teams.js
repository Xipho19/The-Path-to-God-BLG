/* 队伍与选手数据：选手照片来自 LPL 官网 MemberList（MemberId 已核对） */
(function () {
  globalThis.BLG = globalThis.BLG || {};

  BLG.teams = {
    blg: {
      id: "blg",
      name: "BLG",
      full: "Bilibili Gaming",
      color: "#2f6bff",
      color2: "#9fc2ff",
      players: [
        { id: "bin", name: "Bin", memberId: "2687", role: "上单", short: "BIN", photo: "assets/players/bin.png", lane: 96, teamfight: 94, tempo: 72, decision: 86, mental: 82, pool: ["奎桑提", "鳄鱼", "贾克斯", "格温", "奥拉夫", "纳尔"] },
        { id: "xun", name: "Xun", memberId: "3114", role: "打野", short: "XUN", photo: "assets/players/xun.png", lane: 78, teamfight: 88, tempo: 96, decision: 87, mental: 84, pool: ["潘森", "蝎子", "梦魇", "盲僧", "纳亚菲利", "李青"] },
        { id: "knight", name: "Knight", memberId: "2562", role: "中单", short: "KNI", photo: "assets/players/knight.png", lane: 94, teamfight: 93, tempo: 85, decision: 92, mental: 78, pool: ["发条", "岩雀", "维克托", "卡牌", "加里奥", "洛克"] },
        { id: "viper", name: "Viper", memberId: "193", role: "ADC", short: "VIP", photo: "assets/players/viper.png", lane: 93, teamfight: 95, tempo: 80, decision: 90, mental: 88, pool: ["伊泽瑞尔", "艾希", "芸阿娜", "卡西奥佩娅", "卡莎"] },
        { id: "on", name: "ON", memberId: "3509", role: "辅助", short: "ON", photo: "assets/players/on.png", lane: 84, teamfight: 96, tempo: 88, decision: 82, mental: 76, pool: ["萨勒芬妮", "妮蔻", "泰坦", "牛头", "娜美", "璐璐"] }
      ]
    },
    t1: {
      id: "t1",
      name: "T1",
      full: "T1",
      color: "#e4273c",
      color2: "#ffb3bc",
      players: [
        { id: "doran", name: "Doran", memberId: "2829", role: "上单", short: "DOR", photo: "assets/players/doran.png", lane: 88, teamfight: 86, tempo: 78, decision: 82, mental: 78, pool: ["薇恩", "安蓓萨", "奎桑提", "兰博", "贾克斯"] },
        { id: "oner", name: "Oner", memberId: "3832", role: "打野", short: "ONE", photo: "assets/players/oner.png", lane: 82, teamfight: 88, tempo: 91, decision: 86, mental: 84, pool: ["皇子", "猴子", "盲僧", "波比", "赵信"] },
        { id: "faker", name: "Faker", memberId: "1651", role: "中单", short: "FAK", photo: "assets/players/faker.png", lane: 95, teamfight: 97, tempo: 90, decision: 96, mental: 95, pool: ["阿卡丽", "狐狸", "辛德拉", "洛克", "发条", "加里奥"] },
        { id: "peyz", name: "Peyz", memberId: "4002", role: "ADC", short: "PEY", photo: "assets/players/peyz.png", lane: 92, teamfight: 93, tempo: 82, decision: 88, mental: 84, pool: ["卢锡安", "霞", "希维尔", "烬", "卡莎"] },
        { id: "keria", name: "Keria", memberId: "3139", role: "辅助", short: "KER", photo: "assets/players/keria.png", lane: 90, teamfight: 94, tempo: 92, decision: 91, mental: 86, pool: ["波比", "卡尔玛", "米利欧", "洛", "璐璐", "娜美"] }
      ]
    },
    hle: {
      id: "hle",
      name: "HLE",
      full: "Hanwha Life Esports",
      color: "#f28c28",
      color2: "#ffd2a6",
      players: [
        { id: "zeus", name: "Zeus", memberId: "4247", role: "上单", short: "ZEU", photo: "assets/players/zeus.png", lane: 97, teamfight: 95, tempo: 80, decision: 90, mental: 88, pool: ["奎桑提", "兰博", "杰斯", "贾克斯", "格温"] },
        { id: "kanavi", name: "Kanavi", memberId: "2771", role: "打野", short: "KAN", photo: "assets/players/kanavi.png", lane: 85, teamfight: 90, tempo: 95, decision: 89, mental: 84, pool: ["蝎子", "皇子", "猴子", "盲僧", "赵信"] },
        { id: "zeka", name: "Zeka", memberId: "3018", role: "中单", short: "ZEK", photo: "assets/players/zeka.png", lane: 92, teamfight: 91, tempo: 84, decision: 88, mental: 82, pool: ["蛇女", "阿卡丽", "辛德拉", "狐狸", "塞拉斯"] },
        { id: "gumayusi", name: "Gumayusi", memberId: "3833", role: "ADC", short: "GUM", photo: "assets/players/gumayusi.png", lane: 94, teamfight: 95, tempo: 82, decision: 90, mental: 86, pool: ["女警", "飞机", "霞", "卢锡安", "卡莎"] },
        { id: "delight", name: "Delight", memberId: "4364", role: "辅助", short: "DEL", photo: "assets/players/delight.png", lane: 88, teamfight: 92, tempo: 88, decision: 85, mental: 82, pool: ["牛头", "卡尔玛", "璐璐", "泰坦", "洛"] }
      ]
    },
    gen: {
      id: "gen",
      name: "GEN",
      full: "Gen.G",
      color: "#c8a24a",
      color2: "#f4dfa8",
      players: [
        { id: "kiin", name: "Kiin", memberId: "1875", role: "上单", short: "KII", photo: "assets/players/kiin.png", lane: 93, teamfight: 92, tempo: 82, decision: 90, mental: 86, pool: ["阿萝拉", "奎桑提", "杰斯", "兰博", "贾克斯"] },
        { id: "canyon", name: "Canyon", memberId: "2831", role: "打野", short: "CAN", photo: "assets/players/canyon.png", lane: 86, teamfight: 93, tempo: 94, decision: 91, mental: 88, pool: ["潘森", "蝎子", "豹女", "盲僧", "赵信"] },
        { id: "chovy", name: "Chovy", memberId: "2216", role: "中单", short: "CHO", photo: "assets/players/chovy.png", lane: 98, teamfight: 94, tempo: 88, decision: 92, mental: 82, pool: ["阿卡丽", "发条", "辛德拉", "狐狸", "卡牌"] },
        { id: "ruler", name: "Ruler", memberId: "643", role: "ADC", short: "RUL", photo: "assets/players/ruler.png", lane: 96, teamfight: 96, tempo: 84, decision: 92, mental: 90, pool: ["霞", "飞机", "芸阿娜", "卡莎", "卢锡安"] },
        { id: "duro", name: "Duro", memberId: "4462", role: "辅助", short: "DUR", photo: "assets/players/duro.png", lane: 88, teamfight: 91, tempo: 90, decision: 86, mental: 80, pool: ["璐璐", "妮蔻", "牛头", "泰坦", "洛"] }
      ]
    },
    dk: {
      id: "dk",
      name: "DK",
      full: "Dplus KIA",
      color: "#00a88f",
      color2: "#9be8dc",
      players: [
        { id: "siwoo", name: "Siwoo", memberId: "1000866", role: "上单", short: "SIW", photo: "assets/players/siwoo.png", lane: 88, teamfight: 87, tempo: 78, decision: 82, mental: 78, pool: ["兰博", "奥拉夫", "凯南", "奎桑提", "贾克斯"] },
        { id: "lucid", name: "Lucid", memberId: "4432", role: "打野", short: "LUC", photo: "assets/players/lucid.png", lane: 86, teamfight: 88, tempo: 91, decision: 85, mental: 80, pool: ["奇亚娜", "盲僧", "赵信", "猴子", "蝎子"] },
        { id: "showmaker", name: "ShowMaker", memberId: "2832", role: "中单", short: "SHO", photo: "assets/players/showmaker.png", lane: 92, teamfight: 91, tempo: 86, decision: 89, mental: 82, pool: ["维克托", "辛德拉", "阿卡丽", "发条", "卡牌"] },
        { id: "smash", name: "Smash", memberId: "1000838", role: "ADC", short: "SMA", photo: "assets/players/smash.png", lane: 88, teamfight: 89, tempo: 82, decision: 84, mental: 78, pool: ["卡莎", "霞", "卢锡安", "希维尔", "烬"] },
        { id: "career", name: "Career", memberId: "1000668", role: "辅助", short: "CAR", photo: "assets/players/career.png", lane: 84, teamfight: 87, tempo: 86, decision: 82, mental: 76, pool: ["芮尔", "璐璐", "锤石", "牛头", "洛"] }
      ]
    }
  };

  BLG.teamById = function (id) {
    return BLG.teams[id] || null;
  };
})();
