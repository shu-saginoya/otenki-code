# お天気コーデ (Otenki Code)

![サイトロゴ](/public/images/site_logo.png)

## 概要

お天気コーデは、幼稚園や保育園に通うお子さんのいる家庭を支援することを目的としたアプリです。気象庁の正確な天気予報をもとに翌日の服装やお着換えを一目でわかるように表示します。
忙しい保護者の手間を少しでも減らすための機能性と、親子が一緒に準備することもできる容易なUI・UXを目指します。

## 機能

- 地域別の天気予報表示
- 天気に応じた服装提案
- 服装はカスタマイズ可能

## 使用技術

### フロントエンド

- Next.js
- TypeScript
- Redux Toolkit
- Tailwind CSS
- HeadlessUI

### その他ツール

- Jest (テスト)
- Storybook (UIコンポーネント開発)
- ESLint (コード品質管理)

## 開発環境のセットアップ

### リポジトリのクローン

```bash
git clone https://github.com/shu-saginoya/otenki-code.git
cd otenki-code
```

### 依存パッケージのインストール

```bash
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

アプリケーションは [http://localhost:3000](http://localhost:3000) で利用できます。

## 利用可能なスクリプト

- `pnpm dev` - 開発サーバーの起動
- `pnpm build` - プロダクションビルドの作成
- `pnpm start` - プロダクションサーバーの起動
- `pnpm lint` - リント実行
- `pnpm format` - コードフォーマット
- `pnpm storybook` - Storybookの起動
- `pnpm test` - テストの実行
- `pnpm typecheck` - 型チェックの実行

## ドキュメント

- [ドキュメントガイド](./docs/README.md) - 目的、仕様、設計、運用、ロードマップの入口
- [開発計画](./docs/development-plan.md) - 全体進行の基準
- [運用ルール](./docs/operating-guide.md) - ブランチ・PR・レビュー運用

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
