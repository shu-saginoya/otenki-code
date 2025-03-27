import { configureStore } from "@reduxjs/toolkit";

import areasReducer from "@/lib/reducers/areasSlice";
import forecastReducer from "@/lib/reducers/forecastSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // ここに使用するSliceを追加
      areas: areasReducer,
      forecast: forecastReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
