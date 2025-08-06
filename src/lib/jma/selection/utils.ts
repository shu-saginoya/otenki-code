import type { SelectedArea } from "./types";
import type {
  JmaAreaCode,
  JmaAreas,
  JmaCenterMap,
  JmaOfficeMap,
  JmaClass10Map,
  JmaClass15Map,
  JmaClass20Map,
} from "../area/types";

/**
 * class20コードから親エリアを辿り、SelectedArea型で返す関数
 * @param areas - 気象庁の地域情報
 * @param class20Code - 最下層のエリアコード
 * @returns SelectedArea | undefined
 */
export const getSelectedAreaByClass20Code = (
  areas: JmaAreas,
  class20Code: JmaAreaCode
): SelectedArea | undefined => {
  try {
    const { centers, offices, class10s, class15s, class20s } = areas;

    // 各階層の存在チェックを一括で行う
    if (!centers || !offices || !class10s || !class15s || !class20s) {
      throw new Error("Required area data is missing");
    }

    // 階層を辿って情報を収集
    const class20 = class20s[class20Code];
    if (!class20) return undefined;

    const class15 = class15s[class20.parent];
    if (!class15) return undefined;

    const class10 = class10s[class15.parent];
    if (!class10) return undefined;

    const office = offices[class10.parent];
    if (!office) return undefined;

    const center = centers[office.parent];
    if (!center) return undefined;

    // 結果を返す
    return {
      center: { ...center, code: office.parent },
      office: { ...office, code: class10.parent },
      class10: { ...class10, code: class15.parent },
      class15: { ...class15, code: class20.parent },
      class20: { ...class20, code: class20Code },
    };
  } catch (error) {
    console.warn("Error in getSelectedAreaByClass20Code:", error);
    return undefined;
  }
};

// ...existing code...

/**
 * 親データのkey配列をもとに、子データの選択肢を生成する関数
 */
export const generateOptions = (
  keys: JmaAreaCode[],
  data: JmaOfficeMap | JmaClass10Map | JmaClass15Map | JmaClass20Map
) => {
  if (!keys.length) return data;
  return Object.fromEntries(keys.map((key) => [key, data[key]]));
};

/**
 * 親データからChildrenを収集して配列としてまとめて返す関数
 */
export const generateChildren = (
  data: JmaCenterMap | JmaOfficeMap | JmaClass10Map | JmaClass15Map,
  provisionalJmaAreaCode?: JmaAreaCode
): JmaAreaCode[] => {
  if (provisionalJmaAreaCode) {
    return data[provisionalJmaAreaCode]?.children;
  }
  return Object.values(data)
    .map((item) => item.children)
    .flat();
};

/**
 * 各階層の選択肢を生成する関数
 */
export const generateAreaOptions = (
  areas: {
    centers?: JmaCenterMap;
    offices?: JmaOfficeMap;
    class10s?: JmaClass10Map;
    class15s?: JmaClass15Map;
    class20s?: JmaClass20Map;
  },
  provisional: {
    center?: JmaAreaCode;
    office?: JmaAreaCode;
    class10?: JmaAreaCode;
    class15?: JmaAreaCode;
  }
) => {
  const { centers, offices, class10s, class15s, class20s } = areas;
  const { center, office, class10, class15 } = provisional;

  // 地方（center）の選択肢
  const centerOptions = centers || {};

  // 都道府県（office）の選択肢
  const officeOptions = offices
    ? generateOptions(generateChildren(centerOptions, center), offices)
    : undefined;

  // 一次細分区域（class10）の選択肢
  const class10Options =
    class10s && officeOptions
      ? generateOptions(
          generateChildren(officeOptions as JmaOfficeMap, office),
          class10s
        )
      : undefined;

  // 二次細分区域（class15）の選択肢
  const class15Options =
    class15s && class10Options
      ? generateOptions(
          generateChildren(class10Options as JmaClass10Map, class10),
          class15s
        )
      : undefined;

  // 市区町村（class20）の選択肢
  const class20Options =
    class20s && class15Options
      ? generateOptions(
          generateChildren(class15Options as JmaClass15Map, class15),
          class20s
        )
      : undefined;

  return {
    centerOptions,
    officeOptions,
    class10Options,
    class15Options,
    class20Options,
  };
};
