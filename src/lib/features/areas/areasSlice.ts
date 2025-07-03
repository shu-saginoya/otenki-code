import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { SelectedArea, AreaSelectionState } from "@/types";

// 初期状態
const initialState: AreaSelectionState = {
  selectedArea: {},
  isLoading: false,
  error: null,
};

// スライスの作成
const areasSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    // class20sを起点として全階層の地域情報を設定
    setSelectedArea: (state, action: PayloadAction<SelectedArea>) => {
      state.selectedArea = action.payload;
      // ローカルストレージに保存
      localStorage.setItem("selectedArea", JSON.stringify(action.payload));
    },

    // 特定の階層の地域情報を設定
    setCenter: (
      state,
      action: PayloadAction<{ center: SelectedArea["center"] }>
    ) => {
      state.selectedArea.center = action.payload.center;
      localStorage.setItem("selectedArea", JSON.stringify(state.selectedArea));
    },

    setOffice: (
      state,
      action: PayloadAction<{ office: SelectedArea["office"] }>
    ) => {
      state.selectedArea.office = action.payload.office;
      localStorage.setItem("selectedArea", JSON.stringify(state.selectedArea));
    },

    setClass20: (
      state,
      action: PayloadAction<{ class20: SelectedArea["class20"] }>
    ) => {
      state.selectedArea.class20 = action.payload.class20;
      localStorage.setItem("selectedArea", JSON.stringify(state.selectedArea));
    },

    // 地域選択をクリア
    clearSelectedArea: (state) => {
      state.selectedArea = {};
      localStorage.removeItem("selectedArea");
    },

    // localStorage から地域情報を読み込む
    initSelectedArea: (state) => {
      try {
        const savedData = localStorage.getItem("selectedArea");
        if (savedData) {
          state.selectedArea = JSON.parse(savedData);
        }
      } catch (error) {
        console.error("Failed to load selectedArea from localStorage:", error);
        state.error = "地域情報の読み込みに失敗しました";
      }
    },

    // ローディング状態の設定
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // エラー状態の設定
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedArea,
  setCenter,
  setOffice,
  setClass20,
  clearSelectedArea,
  initSelectedArea,
  setLoading,
  setError,
} = areasSlice.actions;

export default areasSlice.reducer;
