import { configureStore } from "@reduxjs/toolkit";

import areasReducer from "@/lib/features/areas/areasSlice";

// storeの作成
export const makeStore = () => {
  return configureStore({
    reducer: {
      // ここに使用するSliceを追加
      areas: areasReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore extends { dispatch: infer T } ? T : never;
