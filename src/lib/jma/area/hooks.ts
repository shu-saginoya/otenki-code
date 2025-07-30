// 地域情報を取得するカスタムフック

import { useState, useEffect } from "react";

import { fetchAreaData } from "./utils";

import type {
  JmaCenterMap,
  JmaOfficeMap,
  JmaClass10Map,
  JmaClass15Map,
  JmaClass20Map,
} from "./types";

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

  useEffect(() => {
    const getAreaData = async () => {
      setLoading(true);
      const { data, error } = await fetchAreaData();

      if (error) {
        setError(error.message);
        // エラー時は各ステートをリセット
        setCenters(null);
        setOffices(null);
        setClass10s(null);
        setClass15s(null);
        setClass20s(null);
      } else if (data) {
        setCenters(data.centers);
        setOffices(data.offices);
        setClass10s(data.class10s);
        setClass15s(data.class15s);
        setClass20s(data.class20s);
        setError(null);
      }

      setLoading(false);
    };

    getAreaData();
  }, []);

  return {
    centers,
    offices,
    class10s,
    class15s,
    class20s,
    loading,
    error,
  };
};
