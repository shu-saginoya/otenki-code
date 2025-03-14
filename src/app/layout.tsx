import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";

import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "お天気コーデ",
  description:
    "気象庁の天気・気温予報をもとに服装の目安をお知らせします。忙しい毎日にご活用ください。",
  keywords: ["気温", "服装", "お着替え"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="flex h-svh flex-col">
          <Header className="flex-none"></Header>
          <main className="grow overflow-y-auto overflow-x-hidden px-1 py-section">
            {children}
          </main>
          <Footer className="flex-none"></Footer>
        </div>
      </body>
    </html>
  );
}
