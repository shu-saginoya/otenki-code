import "./globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";

import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

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
