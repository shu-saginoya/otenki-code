import type { SelectedArea } from "./types";
import type { JmaAreaCode, JmaAreas } from "../area/types";

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
