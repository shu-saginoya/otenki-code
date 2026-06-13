"use client";

import { JSX, ReactNode } from "react";

import { Stack } from "@/components/ui";
import { cn } from "@/lib/cn";

export type MainProps = {
  children: ReactNode;
  className: string;
};

/**
 * メインコンポーネント
 *
 * @param children コンポーネントの子要素
 * @param className スタイルクラス名
 */
export const Main = ({ children, className }: MainProps): JSX.Element => {
  return (
    <main className={cn(className, "bg-background-light p-4")}>
      <Stack justify="center" align="center" className="min-h-full">
        <div className="w-full max-w-2xl">{children}</div>
      </Stack>
    </main>
  );
};
