import { fetcher } from "@/utils";

import type { JmaAreas, JmaAreaError } from "./types";

// 気象庁のエリア情報取得のためのアクセスポイント
const JMA_AREA_ACCESS_POINT =
  "https://www.jma.go.jp/bosai/common/const/area.json";

/**
 * APIレスポンスが有効なエリアデータかチェックする
 */
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
 * 気象庁APIからエリア情報を取得する
 */
export const fetchAreaData = async (): Promise<{
  data: JmaAreas | null;
  error: JmaAreaError | null;
}> => {
  try {
    const result = await fetcher<JmaAreas>(JMA_AREA_ACCESS_POINT);

    if (!isAreas(result)) {
      return {
        data: null,
        error: {
          message: "Invalid area data format",
          code: "INVALID_FORMAT",
        },
      };
    }

    return { data: result, error: null };
  } catch (err) {
    return {
      data: null,
      error: {
        message:
          err instanceof Error ? err.message : "エリア情報の取得に失敗しました",
        code: "FETCH_ERROR",
      },
    };
  }
};
