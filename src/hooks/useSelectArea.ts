"use client";

import { useMemo, useState, useCallback } from "react";

import { useJmaArea } from "@/hooks";
import { setSelectedArea } from "@/lib/features/areas/areasSlice";
import { useAppDispatch } from "@/lib/hooks";

import type {
  JmaAreaCode,
  JmaCenterMap,
  JmaOfficeMap,
  JmaClass10Map,
  JmaClass15Map,
  JmaClass20Map,
} from "@/types";

/**
 * 地域選択のためのカスタムフック
 * ReduxストアのselectedAreaと連携し、各階層の選択・リセット・選択肢生成を提供する
 */
export const useSelectArea = () => {
  const dispatch = useAppDispatch();
  // 地域マスタデータを取得
  const {
    centers,
    offices,
    class10s,
    class15s,
    class20s,
    loading,
    error,
    getSelectedAreaByClass20Code,
  } = useJmaArea();

  // --- 共通関数 ---
  // 親データのkey配列をもとに、子データの選択肢を生成する共通関数
  const generateOptions = useCallback(
    (
      keys: JmaAreaCode[],
      data: JmaOfficeMap | JmaClass10Map | JmaClass15Map | JmaClass20Map
    ) => {
      if (!keys.length) return data;
      return Object.fromEntries(keys.map((key) => [key, data[key]]));
    },
    [] // 依存なしのため空
  );

  // 親データからChildrenを収集して配列としてまとめて返す共通関数
  const generateChildren = useCallback(
    (
      data: JmaCenterMap | JmaOfficeMap | JmaClass10Map | JmaClass15Map,
      provisionalJmaAreaCode?: JmaAreaCode
    ): JmaAreaCode[] => {
      if (provisionalJmaAreaCode) {
        return data[provisionalJmaAreaCode]?.children;
      } else {
        return Object.values(data)
          .map((item) => item.children)
          .flat();
      }
    },
    [] // 依存なしのため空
  );

  // --- 暫定の選択 ---
  const [provisionalCenter, setProvisionalCenter] = useState<JmaAreaCode>();
  const [provisionalOffice, setProvisionalOffice] = useState<JmaAreaCode>();
  const [provisionalClass10, setProvisionalClass10] = useState<JmaAreaCode>();
  const [provisionalClass15, setProvisionalClass15] = useState<JmaAreaCode>();

  // --- 選択時のハンドラ ---
  /**
   * class20（市区町村）を選択
   * 地域の選択を確定し、Reduxストアに反映する
   */
  const selectClass20 = (JmaAreaCode: string) => {
    const area = getSelectedAreaByClass20Code(JmaAreaCode);
    if (area) {
      dispatch(setSelectedArea(area));
    }
  };

  // --- リセット関数 ---
  const removeProvisionalCenter = () => {
    setProvisionalCenter(undefined);
    setProvisionalOffice(undefined);
    setProvisionalClass10(undefined);
    setProvisionalClass15(undefined);
  };
  const removeProvisionalOffice = () => {
    setProvisionalOffice(undefined);
    setProvisionalClass10(undefined);
    setProvisionalClass15(undefined);
  };
  const removeProvisionalClass10 = () => {
    setProvisionalClass10(undefined);
    setProvisionalClass15(undefined);
  };
  const removeProvisionalClass15 = () => {
    setProvisionalClass15(undefined);
  };

  // --- 選択肢生成 ---
  // 地方（center）の選択肢
  const centerOptions = useMemo<JmaCenterMap>(() => centers || {}, [centers]);

  // 都道府県（office）の選択肢
  const officeOptions = useMemo(() => {
    if (!offices) return undefined;
    const keys = generateChildren(centerOptions, provisionalCenter);
    return generateOptions(keys, offices);
  }, [
    offices,
    centerOptions,
    provisionalCenter,
    generateOptions,
    generateChildren,
  ]);

  // 一次細分区域（class10）の選択肢
  const class10Options = useMemo(() => {
    if (!class10s || !officeOptions) return undefined;
    const keys = generateChildren(
      officeOptions as JmaOfficeMap,
      provisionalOffice
    );
    return generateOptions(keys, class10s);
  }, [
    class10s,
    officeOptions,
    provisionalOffice,
    generateOptions,
    generateChildren,
  ]);

  // 二次細分区域（class15）の選択肢
  const class15Options = useMemo(() => {
    if (!class15s || !class10Options) return undefined;
    const keys = generateChildren(
      class10Options as JmaClass10Map,
      provisionalClass10
    );
    return generateOptions(keys, class15s);
  }, [
    class15s,
    class10Options,
    provisionalClass10,
    generateOptions,
    generateChildren,
  ]);

  // 市区町村（class20）の選択肢
  const class20Options = useMemo(() => {
    if (!class20s || !class15Options) return undefined;
    const keys = generateChildren(
      class15Options as JmaClass15Map,
      provisionalClass15
    );
    return generateOptions(keys, class20s);
  }, [
    class20s,
    class15Options,
    provisionalClass15,
    generateOptions,
    generateChildren,
  ]);

  // --- 返り値 ---
  return {
    // 選択関数
    setProvisionalCenter,
    setProvisionalOffice,
    setProvisionalClass10,
    setProvisionalClass15,
    selectClass20,
    // リセット関数
    removeProvisionalCenter,
    removeProvisionalOffice,
    removeProvisionalClass10,
    removeProvisionalClass15,
    // 選択肢
    centerOptions,
    officeOptions,
    class10Options,
    class15Options,
    class20Options,
    // ローディング・エラー
    loading,
    error,
  };
};
