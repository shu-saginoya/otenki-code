"use client";

import type { Area, JmaCenter, JmaClass10, JmaOffice } from "@/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJmaArea } from "@/hooks";
import { useDispatch } from "react-redux";
import { setArea } from "@/lib/features/areas/areasSlice";

type Option = "center" | "office" | "class10";

export const useSelectArea = () => {
  const [currentOptions, setCurrentOptions] = useState<Option>();
  const [newCenter, setNewCenter] = useState<Area | undefined>();
  const [newOffice, setNewOffice] = useState<Area | undefined>();
  const [newClass10, setNewClass10] = useState<Area | undefined>();
  const [options, setOptions] = useState<
    Record<string, JmaCenter | JmaOffice | JmaClass10> | undefined
  >();

  const { centers, offices, class10s, loading, error } = useJmaArea();
  const dispatch = useDispatch();

  // currentOptionsの更新を適切に処理
  useEffect(() => {
    if (newOffice) {
      setCurrentOptions("class10");
    } else if (newCenter) {
      setCurrentOptions("office");
    } else {
      setCurrentOptions("center");
    }
  }, [newCenter, newOffice]);

  // Redux の state 更新処理
  useEffect(() => {
    if (newCenter && newOffice && newClass10) {
      dispatch(
        setArea({
          areaLv1: newCenter,
          areaLv2: newOffice,
          areaLv3: newClass10,
        })
      );
    }
  }, [newCenter, newOffice, newClass10, dispatch]);

  // Centersの選択肢をoptionsに代入
  const setCenterOptions = () => {
    if (centers) {
      setOptions(centers);
    }
  };

  // Officesの選択肢をoptionsに代入
  const setOfficeOptions = () => {
    if (newCenter && offices) {
      const filteredOffices = Object.fromEntries(
        Object.entries(offices).filter(
          ([, office]) => office.parent === newCenter.code
        )
      );
      setOptions(filteredOffices);
    }
  };

  // class10sの選択肢をoptionsに代入
  const setClass10Options = () => {
    if (newOffice && class10s) {
      const filteredClass10s = Object.fromEntries(
        Object.entries(class10s).filter(
          ([, class10]) => class10.parent === newOffice.code
        )
      );
      setOptions(filteredClass10s);
    }
  };

  // currentOptionsをもとにoptionsを設定
  useEffect(() => {
    if (loading || error) return;

    switch (currentOptions) {
      case "center":
        setCenterOptions();
        break;
      case "office":
        setOfficeOptions();
        break;
      case "class10":
        setClass10Options();
        break;
    }
  }, [currentOptions, loading, error]);

  // useRouter instance
  const router = useRouter();

  // Homeに戻る
  const backToHome = () => {
    router.push("/");
  };

  // 新しいエリアをセット
  const setNewArea = (area: Area) => {
    switch (currentOptions) {
      case "center":
        setNewCenter(area);
        break;
      case "office":
        setNewOffice(area);
        break;
      case "class10":
        setNewClass10(area);
        backToHome();
        break;
    }
  };

  // エリアの選択を取り消し
  const removeNewArea = () => {
    switch (currentOptions) {
      case "center":
        backToHome();
        break;
      case "office":
        setNewCenter(undefined);
        setCurrentOptions("center");
        break;
      case "class10":
        setNewOffice(undefined);
        setCurrentOptions("office");
        break;
    }
  };

  return {
    options,
    newCenter,
    newOffice,
    newClass10,
    setNewArea,
    removeNewArea,
    loading,
    error,
  };
};
