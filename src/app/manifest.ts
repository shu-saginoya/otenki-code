/**
 * @file 「アプリ情報カード」をブラウザに渡す
 * @description
 * - PWA（Progressive Web App）として動作するためのメタデータを提供する
 * - PWAとは、Webサイトを「アプリ化」する技術で、ユーザーがホーム画面に追加したり、オフラインで利用できるようにすることができる
 */
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "お天気コーデ",
    short_name: "Otenki Code",
    description:
      "気象庁の天気・気温予報をもとに服装の目安をお知らせします。忙しい毎日にご活用ください。",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
