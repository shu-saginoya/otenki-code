// 地域情報を取得
import { useState, useEffect } from "react";

import { fetcher } from "@/utils/index";

// 型定義
import type {
  JmaAreas,
  JmaCenter,
  JmaOffice,
  JmaClass10,
  JmaClass15,
  JmaClass20,
  SelectedArea,
} from "@/types";

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

export const useJmaArea = () => {
  const [centers, setCenters] = useState<Record<string, JmaCenter> | null>(
    null
  );
  const [offices, setOffices] = useState<Record<string, JmaOffice> | null>(
    null
  );
  const [class10s, setClass10s] = useState<Record<string, JmaClass10> | null>(
    null
  );
  const [class15s, setClass15s] = useState<Record<string, JmaClass15> | null>(
    null
  );
  const [class20s, setClass20s] = useState<Record<string, JmaClass20> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // class20コードから親を辿ってSelectedArea型を返す関数
  const getSelectedAreaByClass20Code = (
    class20Code: string
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
    return {
      center: { ...center, code: office.parent },
      office: { ...office, code: class10.parent },
      class10: { ...class10, code: class15.parent },
      class15: { ...class15, code: class20.parent },
      class20: { ...class20, code: class20Code },
    };
  };

  useEffect(() => {
    const url = "https://www.jma.go.jp/bosai/common/const/area.json";

    const getData = async () => {
      try {
        const result = await fetcher<JmaAreas>(url);

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
