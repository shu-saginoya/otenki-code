export type JmaAreaCode = string;

// 地方予報区
export type JmaCenter = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  officeName: JmaAreaCode; // 気象台の名前
  children: JmaAreaCode[]; // この予報区に含まれる府県予報区のIDリスト
};
export type JmaCenterMap = Record<JmaAreaCode, JmaCenter>;

// 府県予報区
export type JmaOffice = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  officeName: string; // 気象台の名前
  parent: JmaAreaCode; // 地方予報区のID
  children: JmaAreaCode[]; // この予報区に含まれる一次細分区域のIDリスト
};
export type JmaOfficeMap = Record<JmaAreaCode, JmaOffice>;

// 一次細分区域
export type JmaClass10 = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  parent: JmaAreaCode; // 府県予報区のID
  children: JmaAreaCode[]; // この予報区に含まれる市町村等をまとめた地域のIDリスト
};
export type JmaClass10Map = Record<JmaAreaCode, JmaClass10>;

// 市町村等をまとめた地域
export type JmaClass15 = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  parent: JmaAreaCode; // 一次細分区域のID
  children: JmaAreaCode[]; // この予報区に含まれる二次細分区域のIDリスト
};
export type JmaClass15Map = Record<JmaAreaCode, JmaClass15>;

// 二次細分区域
export type JmaClass20 = {
  name: string; // 予報区の名前
  enName: string; // 予報区の英名
  kana: string; // 予報区の名前のふりがな
  parent: JmaAreaCode; // 市町村等をまとめた地域のID
};
export type JmaClass20Map = Record<JmaAreaCode, JmaClass20>;

// エリア情報全体の構造
export type JmaAreas = {
  centers: JmaCenterMap;
  offices: JmaOfficeMap;
  class10s: JmaClass10Map;
  class15s: JmaClass15Map;
  class20s: JmaClass20Map;
};

// エラー型
export type JmaAreaError = {
  message: string;
  code: "FETCH_ERROR" | "INVALID_FORMAT" | "MISSING_DATA";
};
