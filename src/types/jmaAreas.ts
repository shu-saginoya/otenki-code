// 地方予報区
export type JmaCenter = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  officeName: string; // 気象台の名前
  children: string[]; // この予報区に含まれる府県予報区のIDリスト
};

// 府県予報区
export type JmaOffice = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  officeName: string; // 気象台の名前
  parent: string; // 地方予報区のID
  children: string[]; // この予報区に含まれる一次細分区域のIDリスト
};

// 一次細分区域
export type JmaClass10 = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  parent: string; // 府県予報区のID
  children: string[]; // この予報区に含まれる市町村等をまとめた地域のIDリスト
};

// 市町村等をまとめた地域
export type JmaClass15 = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  parent: string; // 一次細分区域のID
  children: string[]; // この予報区に含まれる二次細分区域のIDリスト
};
// 二次細分区域
export type JmaClass20 = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  kana: string; // 予報区の名前のふりがな
  parent: string; // 市町村等をまとめた地域のID
};

// エリア情報全体の構造
export type JmaAreas = {
  centers: Record<string, JmaCenter>;
  offices: Record<string, JmaOffice>;
  class10s: Record<string, JmaClass10>;
  class15s: Record<string, JmaClass15>;
  class20s: Record<string, JmaClass20>;
};
