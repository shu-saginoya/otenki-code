"use client";

import { useState, useEffect } from "react";

import { fetchAreaData, type JmaAreas } from "@/lib/jma";

/**
 * JMA（気象庁）のエリア情報を状態として管理するカスタムフック
 * このフックは、JMAのエリア情報をAPIから取得し、状態にセットして管理するためのものです。
 * @returns エリア情報、ローディング状態、エラー情報を含むオブジェクト
 */
export const useAreaOptions = () => {
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
