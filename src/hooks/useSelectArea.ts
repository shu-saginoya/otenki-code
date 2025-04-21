"use client";

import { useState, useEffect } from "react";

import { useJmaArea } from "@/hooks";

import type { Area, JmaCenter, JmaOffice, JmaClass10 } from "@/types";

export const useSelectArea = () => {
  // 選択された地域を格納するstate
  const [newCenter, setNewCenter] = useState<Area>();
  const [newOffice, setNewOffice] = useState<Area>();
  const [newClass10, setNewClass10] = useState<Area>();

  // 選択肢を格納するstate
  const [centerOptions, setCenterOptions] = useState<Record<string, JmaCenter>>(
    {}
  );
  const [officeOptions, setOfficeOptions] = useState<Record<string, JmaOffice>>(
    {}
  );
  const [class10Options, setClass10Options] = useState<
    Record<string, JmaClass10>
  >({});

  // 地域情報を取得するカスタムフック
  const { centers, offices, class10s, loading, error } = useJmaArea();

  // 共通のフィルタリング関数
  const filterOptions = <T extends { parent: string }>(
    items: Record<string, T>,
    parentCode?: string
  ): Record<string, T> => {
    if (!parentCode) return {};
    return Object.fromEntries(
      Object.entries(items).filter(([, item]) => item.parent === parentCode)
    );
  };

  // Centersの選択肢をoptionsに代入
  useEffect(() => {
    setCenterOptions(centers || {});
  }, [centers]);

  // Officesの選択肢をoptionsに代入
  useEffect(() => {
    setOfficeOptions(filterOptions(offices || {}, newCenter?.code));
  }, [newCenter, offices]);

  // class10sの選択肢をoptionsに代入
  useEffect(() => {
    setClass10Options(filterOptions(class10s || {}, newOffice?.code));
  }, [newOffice, class10s]);

  const removeNewCenter = () => {
    setNewCenter(undefined);
  };
  const removeNewOffice = () => {
    setNewOffice(undefined);
  };
  const removeNewClass10 = () => {
    setNewClass10(undefined);
  };

  return {
    newCenter,
    newOffice,
    newClass10,
    setNewCenter,
    setNewOffice,
    setNewClass10,
    removeNewCenter,
    removeNewOffice,
    removeNewClass10,
    centerOptions,
    officeOptions,
    class10Options,
    loading,
    error,
  };
};
