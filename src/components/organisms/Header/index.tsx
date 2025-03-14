import { FC } from "react";
import clsx from "clsx";
import { Container, Col } from "@/components/layout/Container";

export type HeaderProps = {
  className: string;
};

/**
 * ヘッダー
 */
const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={clsx(className, "bg-primary p-2")}>
      <Container>
        <Col cols={6}>ロゴ</Col>
        <Col cols={6} justify="end">
          ヘッドツール
        </Col>
      </Container>
    </header>
  );
};

export default Header;
