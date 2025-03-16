import { JSX } from "react";
import clsx from "clsx";
import { Container, Col } from "@/components/layout/Container";
import AppLogo from "@/components/atoms/AppLogo";

export type HeaderProps = {
  className: string;
};

/**
 * ヘッダー
 */
const Header = ({ className }: HeaderProps): JSX.Element => {
  return (
    <header className={clsx(className, "bg-primary p-2")}>
      <Container>
        <Col cols={6}>
          <AppLogo></AppLogo>
        </Col>
        <Col cols={6} justify="end">
          ヘッドツール
        </Col>
      </Container>
    </header>
  );
};

export default Header;
