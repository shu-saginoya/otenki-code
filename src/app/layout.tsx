import type { Metadata } from "next";
import "./globals.css";

import { ReactNode } from "react";

import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "ふくそう日和",
  description: "検討中",
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
