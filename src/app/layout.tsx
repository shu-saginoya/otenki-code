import type { Metadata } from "next";
import "./globals.css";

import Flex from "@/components/layout/Flex";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import Main from "@/components/organisms/Main";

export const metadata: Metadata = {
  title: "ふくそう日和",
  description: "検討中",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Flex className="h-svh flex-col">
          <Header className="flex-none"></Header>
          <Main className="grow">{children}</Main>
          <Footer className="flex-none"></Footer>
        </Flex>
      </body>
    </html>
  );
}
