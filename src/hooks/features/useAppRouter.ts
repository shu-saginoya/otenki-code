"use client";

import { useRouter } from "next/navigation";

export const useAppRouter = () => {
  const router = useRouter();

  const pathMap = {
    home: "/",
    selectArea: "/select-area",
    // 他のパスを追加する場合はここに追加
  };

  type PathKey = keyof typeof pathMap;

  const navigateTo = (path: PathKey) => {
    router.push(pathMap[path]);
  };

  const goBack = () => {
    router.back();
  };

  return {
    navigateTo,
    goBack,
  };
};
