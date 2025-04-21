"use client";

import { JSX } from "react";

import { Grid, Col, AppLogo, IconButton, Stack } from "@/components";
import { cn } from "@/lib/cn";

export type HeaderProps = {
  className: string;
};

const showAlert = (): void => alert("準備中");

/**
 * ヘッダー
 */
export const Header = ({ className }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(className, "px-4 py-2")}>
      <Grid align="center">
        <Col cols={6}>
          <AppLogo></AppLogo>
        </Col>
        <Col cols={6} justify="end">
          <Stack gap={2}>
            <IconButton icon="bell" onClick={showAlert}></IconButton>
            <IconButton icon="login" onClick={showAlert}></IconButton>
          </Stack>
        </Col>
      </Grid>
    </header>
  );
};
