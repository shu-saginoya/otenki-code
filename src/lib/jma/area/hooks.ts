// 地域情報を取得するカスタムフック

import { useState, useEffect } from "react";

import { fetcher } from "@/utils/index";

// 型定義
import type {
  JmaAreas,
  JmaAreaCode,
  JmaCenterMap,
  JmaOfficeMap,
  JmaClass10Map,
  JmaClass15Map,
  JmaClass20Map,
  SelectedArea,
} from "./types";

// 型ガード関数
const isAreas = (data: Partial<JmaAreas>): data is JmaAreas => {
  return (
    data &&
    typeof data.centers !== "undefined" &&
    typeof data.offices !== "undefined" &&
    typeof data.class10s !== "undefined" &&
    typeof data.class15s !== "undefined" &&
    typeof data.class20s !== "undefined"
  );
};

/**
 * JMA（気象庁）エリア情報を取得・管理するカスタムフック
 */
export const useJmaArea = () => {
  // 各エリア情報のステート
  const [centers, setCenters] = useState<JmaCenterMap | null>(null);
  const [offices, setOffices] = useState<JmaOfficeMap | null>(null);
  const [class10s, setClass10s] = useState<JmaClass10Map | null>(null);
  const [class15s, setClass15s] = useState<JmaClass15Map | null>(null);
  const [class20s, setClass20s] = useState<JmaClass20Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * class20コードから親エリアを辿り、SelectedArea型で返す関数
   * @param class20Code - 最下層のエリアコード
   * @returns SelectedArea | undefined
   */
  const getSelectedAreaByClass20Code = (
    class20Code: JmaAreaCode
  ): SelectedArea | undefined => {
    if (!centers || !offices || !class10s || !class15s || !class20s)
      return undefined;
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
    // 各階層のエリア情報をSelectedArea型で返す
    return {
      center: { ...center, code: office.parent },
      office: { ...office, code: class10.parent },
      class10: { ...class10, code: class15.parent },
      class15: { ...class15, code: class20.parent },
      class20: { ...class20, code: class20Code },
    };
  };

  // 初回レンダリング時にエリア情報を取得
  useEffect(() => {
    const url = "https://www.jma.go.jp/bosai/common/const/area.json";

    const getData = async () => {
      try {
        const result = await fetcher<JmaAreas>(url);

        // データがJmaAreas型なら各ステートにセット
        if (isAreas(result)) {
          setCenters(result.centers);
          setOffices(result.offices);
          setClass10s(result.class10s);
          setClass15s(result.class15s);
          setClass20s(result.class20s);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return {
    centers,
    offices,
    class10s,
    class15s,
    class20s,
    loading,
    error,
    getSelectedAreaByClass20Code,
  };
};
