"use client";

import { JSX } from "react";
import clsx from "clsx";
import { Container, Col } from "@/components/layout/Container";
import AppLogo from "@/components/atoms/AppLogo";
import IconButton from "@/components/atoms/IconButton";
import Stack from "@/components/layout/Stack";

export type HeaderProps = {
  className: string;
};

const showAlert = (): void => alert("準備中");

/**
 * ヘッダー
 */
const Header = ({ className }: HeaderProps): JSX.Element => {
  return (
    <header className={clsx(className, "bg-primary px-4 py-2")}>
      <Container align="center">
        <Col cols={6}>
          <AppLogo></AppLogo>
        </Col>
        <Col cols={6} justify="end">
          <Stack gap={2}>
            <IconButton icon="bell" onClick={showAlert}></IconButton>
            <IconButton icon="login" onClick={showAlert}></IconButton>
          </Stack>
        </Col>
      </Container>
    </header>
  );
};

export default Header;
