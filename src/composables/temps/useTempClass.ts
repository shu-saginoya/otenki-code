// 気温の分類をもとに服装や表示色などを一括で管理する関数

import { ref } from "vue";
import { useClassifyTemp } from "@/composables/temps/useClassifyTemp";
import { useTempCalc } from "@/composables/temps/useTempCalc";
import type { TempClassObject } from "@/types/tempClass";

const { tempClass } = useClassifyTemp();

// 気温の分類ごとの色
export const useTempClass = () => {
  const color = ref<string>("text-gray-500");
  const colors: TempClassObject = {
    boiling: "text-red-500",
    melting: "text-orange-500",
    humid: "text-lime-500",
    hot: "text-green-500",
    warm: "text-teal-500",
    cool: "text-sky-500",
    chilly: "text-blue-500",
    cold: "text-indigo-500",
    freezing: "text-violet-500",
  };

  // 気温の分類ごとのトップス
  const tops = ref<string>();
  const topsList: TempClassObject = {
    boiling: "半袖シャツ",
    melting: "半袖シャツ",
    humid: "半袖シャツ",
    hot: "長袖シャツ",
    warm: "長袖シャツ",
    cool: "長袖シャツ",
    chilly: "トレーナー",
    cold: "トレーナー",
    freezing: "トレーナー",
  };

  // 気温の分類ごとのボトムス
  const bottoms = ref<string>();
  const bottomsList: TempClassObject = {
    boiling: "半ズボン",
    melting: "半ズボン",
    humid: "半ズボン",
    hot: "七分丈ズボン",
    warm: "七分丈ズボン",
    cool: "長ズボン",
    chilly: "長ズボン",
    cold: "厚手の長ズボン",
    freezing: "厚手の長ズボン",
  };

  // 気温の分類ごとの表示画像
  const clothingImg = ref<string>();
  const clothingImgList: TempClassObject = {
    boiling: "kids_kodomofuku_shirt_boy.png",
    melting: "kids_kodomofuku_shirt_boy.png",
    humid: "kids_kodomofuku_shirt_boy.png",
    hot: "cloth_longt.png",
    warm: "cloth_longt.png",
    cool: "cloth_longt.png",
    chilly: "kodomofuku_boy.png",
    cold: "kodomofuku_boy.png",
    freezing: "kodomofuku_boy.png",
  };

  // 気温の分類ごとのアウター
  const outerwear = ref<string>();
  const outerwearList: TempClassObject = {
    boiling: "帽子や日傘",
    melting: "帽子や日傘",
    humid: "帽子や日傘",
    hot: "帽子や日傘",
    warm: "薄い羽織",
    cool: "カーディガン",
    chilly: "ウインドブレーカー",
    cold: "ダウンジャケット",
    freezing: "ダウンジャケット",
  };

  // 気温の分類ごとのアウターの表示画像
  const outerwearImg = ref<string>();
  const outerwearImgList: TempClassObject = {
    boiling: "hiyake_goods.png",
    melting: "hiyake_goods.png",
    humid: "hiyake_goods.png",
    hot: "hiyake_goods.png",
    warm: "fashion_cardigan_set.png",
    cool: "fashion_cardigan_set.png",
    chilly: "fashion_sutajan.png",
    cold: "fashion_down_jacket.png",
    freezing: "fashion_down_jacket.png",
  };

  // 最高気温と最低気温から各項目を更新する関数
  const setTemp = (maxTemp: number, minTemp: number[]) => {
    const { morningAndEveningTemp } = useTempCalc(maxTemp, minTemp);
    const maxTempClass = tempClass(maxTemp);
    const minTempClass = tempClass(morningAndEveningTemp.value);
    color.value = colors[maxTempClass];
    tops.value = topsList[maxTempClass];
    bottoms.value = bottomsList[maxTempClass];
    clothingImg.value = clothingImgList[maxTempClass];
    outerwear.value = outerwearList[minTempClass];
    outerwearImg.value = outerwearImgList[minTempClass];
  };

  return {
    color,
    tops,
    bottoms,
    clothingImg,
    outerwear,
    outerwearImg,
    setTemp,
  };
};
