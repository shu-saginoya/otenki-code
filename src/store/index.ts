// store作成するための関数をインポート
import { configureStore } from "@reduxjs/toolkit";
// storeに登録して、グローバルで利用したいsliceを読み込む
// sliceでdefault exportしているので、reducerとわかりやすくするために名前を変更している
import areasReducer from "@/store/slice/areasSlice";
import forecastReducer from "@/store/slice/forecastSlice";

export const store = configureStore({
  reducer: {
    // このプロパティ名をコンポーネントで値を呼び出すときに利用する
    areas: areasReducer,
    forecast: forecastReducer,
  },
});

// Redux Toolkitがコンポーネントで利用する際に必要となる値に対する型と値の更新に利用するメソッドに関する型を定義している。これをexportしてコンポーネントで利用する
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
