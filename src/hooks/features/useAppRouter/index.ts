"use client";

import { useRouter } from "next/navigation";

/**
 * アプリ内の画面遷移をまとめて扱うフック。
 *
 * Next.js の useRouter をラップし、アプリで使う遷移先を共通化する。
 */
export const useAppRouter = () => {
  const router = useRouter();

  // ページを追加した時はここにパスを追加していく
  const pathMap = {
    home: "/",
    login: "/login",
    selectArea: "/select-area",
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
