import "./globals.css";

import { Metadata } from "next";
import { ReactNode } from "react";

import StoreProvider from "@/app/StoreProvider";
import { Header, Main } from "@/components/features";

export const metadata: Metadata = {
  title: "お天気コーデ",
  description:
    "気象庁の天気・気温予報をもとに服装の目安をお知らせします。忙しい毎日にご活用ください。",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="h-svh">
        <StoreProvider>
          <div className="flex h-full flex-col">
            <Header className="flex-none" />
            <Main className="grow overflow-y-auto overflow-x-hidden">
              {children}
            </Main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
