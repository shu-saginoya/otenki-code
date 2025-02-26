// app > store > store.ts
// store作成するための関数をインポート
import { configureStore } from "@reduxjs/toolkit";
// storeに登録して、グローバルで利用したいsliceを読み込みます。
// sliceでdefault exportしているので、reducerとわかりやすくするために名前を変更しているだけです。
import areasReducer from "@/store/slice/areasSlice";
import forecastReducer from "@/store/slice/forecastSlice";

export const store = configureStore({
  reducer: {
    // このプロパティ名をコンポーネントで値を呼び出すときに利用します。
    areas: areasReducer,
    forecast: forecastReducer,
  },
});

// Redux Toolkitがコンポーネントで利用する際に必要となる値に対する型と値の更新に利用するメソッドに関する型を定義してくれる。これをexportしてコンポーネントで利用します。
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
