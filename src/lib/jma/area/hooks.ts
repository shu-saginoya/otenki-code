"use client";

// 地域情報を取得するカスタムフック

import { useState, useEffect } from "react";

import { fetchAreaData } from "./utils";

import type { JmaAreas } from "./types";

/**
 * JMA（気象庁）エリア情報を取得・管理するカスタムフック
 */
export const useJmaArea = () => {
  // 各エリア情報のステート
  const [areas, setAreas] = useState<JmaAreas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAreaData = async () => {
      setLoading(true);
      const { data, error } = await fetchAreaData();

      if (error) {
        setError(error.message);
        // エラー時は各ステートをリセット
        setAreas(null);
      } else if (data) {
        setAreas(data);
        setError(null);
      }

      setLoading(false);
    };

    getAreaData();
  }, []);

  return {
    areas,
    loading,
    error,
  };
};
