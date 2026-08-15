/**
 * @file 地域選択のグローバルステート管理を行うReduxスライス
 */
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
    // 選択地域を一時的に保持
    setSelectedArea: (state, action: PayloadAction<SelectedArea>) => {
      state.selectedArea = action.payload;
    },

    // 地域選択をクリア
    clearSelectedArea: (state) => {
      state.selectedArea = {};
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

export const { setSelectedArea, clearSelectedArea, setLoading, setError } =
  areasSlice.actions;

export default areasSlice.reducer;
