"use client";

import { JSX, ReactNode } from "react";
import clsx from "clsx";
import { Stack } from "@/components";

export type MainProps = {
  children: ReactNode;
  className: string;
};

/**
 * メイン
 */
export const Main = ({ children, className }: MainProps): JSX.Element => {
  return (
    <main
      className={clsx(
        className,
        "bg-background-light p-4 dark:bg-foreground-dark"
      )}
    >
      <Stack justify="center" align="center" className="min-h-full">
        <div className="w-full max-w-2xl">{children}</div>
      </Stack>
    </main>
  );
};
