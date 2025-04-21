"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { initArea } from "@/lib/features/areas/areasSlice";
import { makeStore } from "@/lib/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef(makeStore());

  useEffect(() => {
    // Store の初期化時に一度だけ initArea を実行
    storeRef.current.dispatch(initArea());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
