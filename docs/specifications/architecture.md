---
type: Specifications
title: アーキテクチャ
description: アプリケーションの構成と技術選定
---

## 構成

- 画面・ルーティング: Next.js App Router
- UI: React / TypeScript / Headless UI
- スタイル: Tailwind CSS
- デプロイ先: Vercel

## データの流れ

1. ユーザー認証
2. ユーザーの地域を読み込む（未設定の場合は選択）
3. 地域をもとに天気予報を取得
4. 天気予報をもとに服装のおすすめを表示
5. 服装のおすすめはユーザーごとにカスタム可

## 外部サービスと保存

- 天気予報API: WeatherAPI.com
- 認証・ユーザー設定の保存先: Supabase
- ユーザーごとのデータアクセス制御にはRLSを使用する

## 開発・品質確認

- 単体テスト: Vitest
- UI の確認: Storybook
- 静的解析・整形: ESLint、Prettier
- ソースコード管理: Git / GitHub

## 技術バージョン

- 正確なバージョンは `package.json` を参照する
