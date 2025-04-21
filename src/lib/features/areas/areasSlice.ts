import { createSlice } from "@reduxjs/toolkit";

import type { Area } from "@/types";

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
      state.areaLv1 = action.payload.areaLv1;
      state.areaLv2 = action.payload.areaLv2;
      state.areaLv3 = action.payload.areaLv3;
      // ローカルストレージに保存
      localStorage.setItem(
        "areas",
        JSON.stringify([
          action.payload.areaLv1,
          action.payload.areaLv2,
          action.payload.areaLv3,
        ])
      );
    },

    // localStorage からエリア情報を読み込む
    initArea: (state) => {
      try {
        const savedData = localStorage.getItem("areas");
        if (savedData) {
          const [lv1, lv2, lv3] = JSON.parse(savedData);
          state.areaLv1 = lv1 ?? undefined;
          state.areaLv2 = lv2 ?? undefined;
          state.areaLv3 = lv3 ?? undefined;
        }
      } catch (error) {
        console.error("Failed to load areas from localStorage:", error);
      }
    },
  },
});

export const { setArea, initArea } = areasSlice.actions;
export default areasSlice.reducer;
