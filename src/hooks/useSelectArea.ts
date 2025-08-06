"use client";

import { useState } from "react";

import { useAreaOptions } from "@/hooks";
import { setSelectedArea } from "@/lib/features/areas/areasSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getSelectedAreaByClass20Code, generateAreaOptions } from "@/lib/jma";

import type { JmaAreaCode } from "@/lib/jma";

export const useSelectArea = () => {
  const dispatch = useAppDispatch();
  const { areas, loading, error } = useAreaOptions();

  // 暫定の選択状態
  const [provisional, setProvisional] = useState<{
    center?: JmaAreaCode;
    office?: JmaAreaCode;
    class10?: JmaAreaCode;
    class15?: JmaAreaCode;
  }>({});

  // 選択の更新
  const setProvisionalCenter = (code?: JmaAreaCode) =>
    setProvisional({ center: code });
  const setProvisionalOffice = (code?: JmaAreaCode) =>
    setProvisional({ ...provisional, office: code });
  const setProvisionalClass10 = (code?: JmaAreaCode) =>
    setProvisional({ ...provisional, class10: code });
  const setProvisionalClass15 = (code?: JmaAreaCode) =>
    setProvisional({ ...provisional, class15: code });

  // class20の選択を確定
  const selectClass20 = (code: JmaAreaCode) => {
    if (!areas) return;
    const area = getSelectedAreaByClass20Code(areas, code);
    dispatch(setSelectedArea(area));
  };

  // リセット関数
  const removeProvisionalCenter = () =>
    setProvisional({ ...provisional, center: undefined });
  const removeProvisionalOffice = () =>
    setProvisional({ ...provisional, office: undefined });
  const removeProvisionalClass10 = () =>
    setProvisional({ ...provisional, class10: undefined });
  const removeProvisionalClass15 = () =>
    setProvisional({ ...provisional, class15: undefined });

  // 選択肢の生成
  const options = generateAreaOptions(areas || {}, provisional);

  return {
    // 選択関数
    setProvisionalCenter,
    setProvisionalOffice,
    setProvisionalClass10,
    setProvisionalClass15,
    selectClass20,
    removeProvisionalCenter,
    removeProvisionalOffice,
    removeProvisionalClass10,
    removeProvisionalClass15,
    // 選択肢
    ...options,
    // ステータス
    loading,
    error,
  };
};
