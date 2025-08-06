import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { SelectedArea, AreaSelectionState } from "@/lib/jma";

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
    // 選択地域を保存
    setSelectedArea: (state, action: PayloadAction<SelectedArea>) => {
      state.selectedArea = action.payload;
      // ローカルストレージにも保存
      localStorage.setItem("selectedArea", JSON.stringify(action.payload));
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
  clearSelectedArea,
  initSelectedArea,
  setLoading,
  setError,
} = areasSlice.actions;

export default areasSlice.reducer;
