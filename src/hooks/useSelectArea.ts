"use client";

import type { Area, JmaCenter, JmaClass10, JmaOffice } from "@/types";
import { useState, useEffect } from "react";
import { useJmaArea } from "@/hooks";
import { useDispatch } from "react-redux";
import { setArea } from "@/lib/reducers/areasSlice";

type Option = "center" | "office" | "class10";

export const useSelectArea = () => {
  const [currentOptions, setCurrentOptions] = useState<Option>();
  const [newCenter, setNewCenter] = useState<Area>();
  const [newOffice, setNewOffice] = useState<Area>();
  const [newClass10, setNewClass10] = useState<Area>();
  const [options, setOptions] =
    useState<Record<string, JmaCenter | JmaOffice | JmaClass10>>();

  const { centers, offices, class10s, loading, error } = useJmaArea();

  // 選択状況によってcurrentOptionsを変更
  useEffect(() => {
    if (newOffice) {
      setCurrentOptions("class10");
    } else if (newCenter) {
      setCurrentOptions("office");
    } else {
      setCurrentOptions("center");
    }
  }, [newCenter, newOffice]);

  // Centersの選択肢をoptionsに代入
  const setCenterOptions = (): void => {
    if (centers) {
      setOptions(centers);
    }
  };

  // Officesの選択肢をoptionsに代入
  const setOfficeOptions = (): void => {
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
  const setClass10Options = (): void => {
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
    if (loading || error) return; // データがまだロード中またはエラーの場合は何もしない

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

  // Homeに戻る
  const backToHome = (): void => {
    location.href = "/";
  };

  const dispatch = useDispatch();
  //
  const setNewArea = (area: Area): void => {
    switch (currentOptions) {
      case "center":
        setNewCenter(area);
        break;
      case "office":
        setNewOffice(area);
        break;
      case "class10":
        setNewClass10(area);
        dispatch(
          setArea({
            areaLv1: newCenter,
            areaLv2: newOffice,
            areaLv3: newClass10,
          })
        );
        backToHome();
        break;
    }
  };

  const removeNewArea = (): void => {
    switch (currentOptions) {
      case "center":
        backToHome();
        break;
      case "office":
        setNewCenter(undefined);
        break;
      case "class10":
        setNewOffice(undefined);
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
