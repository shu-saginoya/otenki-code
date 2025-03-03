import { createSlice } from "@reduxjs/toolkit";

import type { Area } from "@/types/jmaForecast";

type AreaState = {
  areaLv1: Area | undefined;
  areaLv2: Area | undefined;
  areaLv3: Area | undefined;
};

// 初期状態
const initialState: AreaState = {
  areaLv1: undefined,
  areaLv2: undefined,
  areaLv3: undefined,
};

// スライスの作成
const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    setArea: (state, action) => {
      const { lv1, lv2, lv3 } = action.payload;
      state.areaLv1 = lv1;
      state.areaLv2 = lv2;
      state.areaLv3 = lv3;
      // ローカルストレージに保存
      localStorage.setItem("areas", JSON.stringify([lv1, lv2, lv3]));
    },
    initArea: (state) => {
      const savedData = localStorage.getItem("areas");
      if (savedData) {
        const [lv1, lv2, lv3] = JSON.parse(savedData);
        state.areaLv1 = lv1;
        state.areaLv2 = lv2;
        state.areaLv3 = lv3;
      }
    },
  },
});

export const { setArea, initArea } = areasSlice.actions;
export default areasSlice.reducer;
