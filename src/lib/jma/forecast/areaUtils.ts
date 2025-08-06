import type { AreaObj } from "./types";
import type { JmaAreas, SelectedArea, JmaAreaCode } from "@/lib/jma";

/**
 * エリアオブジェクトの配列からエリアコードの配列を取得する
 */
export const getAreaCodes = (timeSeries: {
  areas?: AreaObj[];
}): JmaAreaCode[] => timeSeries?.areas?.map((area) => area.area.code) ?? [];

/**
 * エリアコードと選択された地域情報を照合し、適切なエリアコードを返す
 */
export const matchAreaCode = (
  apiAreaCodes: JmaAreaCode[],
  selectedArea: SelectedArea
): string | null => {
  const found = [
    selectedArea.class20?.code,
    selectedArea.class15?.code,
    selectedArea.class10?.code,
    selectedArea.office?.code,
    selectedArea.center?.code,
  ]
    .filter((code): code is string => typeof code === "string")
    .find((code) => apiAreaCodes.includes(code));
  return found ?? null;
};

/**
 * timeSeries データから selectedArea に最適なエリアコードを解決する
 */
export const resolveAreaCode = (
  timeSeries: { areas?: AreaObj[] },
  selectedArea: SelectedArea
): JmaAreaCode | null => matchAreaCode(getAreaCodes(timeSeries), selectedArea);

/**
 * timeSeries データからエリアコードに一致するエリアオブジェクトを取得する
 */
export const findAreaObj = <T extends AreaObj>(
  timeSeries: { areas?: T[] },
  code: JmaAreaCode
): T | undefined => timeSeries?.areas?.find((obj) => obj.area.code === code);

/**
 * class20のコードから全階層の地域情報を解決する
 */
export const resolveAreaHierarchy = (
  class20Code: string,
  areas: JmaAreas
): SelectedArea => {
  const class20 = areas.class20s[class20Code];
  if (!class20) throw new Error(`Class20 area not found: ${class20Code}`);

  const class15 = areas.class15s[class20.parent];
  if (!class15) throw new Error(`Class15 area not found: ${class20.parent}`);

  const class10 = areas.class10s[class15.parent];
  if (!class10) throw new Error(`Class10 area not found: ${class15.parent}`);

  const office = areas.offices[class10.parent];
  if (!office) throw new Error(`Office area not found: ${class10.parent}`);

  const center = areas.centers[office.parent];
  if (!center) throw new Error(`Center area not found: ${office.parent}`);

  return {
    center: { ...center, code: office.parent },
    office: { ...office, code: class10.parent },
    class10: { ...class10, code: class15.parent },
    class15: { ...class15, code: class20.parent },
    class20: { ...class20, code: class20Code },
  };
};

/**
 * 指定された階層の地域情報から、APIで使用する適切なエリアコードを取得する
 */
export const getAreaCodeForLevel = (
  selectedArea: SelectedArea,
  targetLevel: keyof SelectedArea
): string | null => selectedArea[targetLevel]?.code || null;
