# お天気コーデ (Otenki Code)

![サイトロゴ](/public/images/site_logo.png)

## 📝 概要

お天気コーデは、天気予報をもとに気温に合わせた服装を素早く提案するWebアプリケーションです。気象庁の正確な天気予報APIを利用して、ユーザーの地域の天気に合わせた適切な服装を提案します。

## 🚀 機能

- 地域別の天気予報表示
- 天気に応じた服装提案
- 服装はカスタマイズ可能
- レスポンシブデザイン
- 直感的なユーザーインターフェース

## 🛠 使用技術

- **フロントエンド**

  - Next.js
  - TypeScript
  - Redux Toolkit
  - Tailwind CSS
  - HeadlessUI

- **その他ツール**
  - Jest (テスト)
  - Storybook (UIコンポーネント開発)
  - ESLint (コード品質管理)

## 🔧 開発環境のセットアップ

1. リポジトリのクローン

   ```bash
   git clone https://github.com/shu-saginoya/otenki-code.git
   cd otenki-code
   ```

1. 依存パッケージのインストール

   ```bash
   pnpm install
   ```

1. 開発サーバーの起動

   ```bash
   pnpm dev
   ```

アプリケーションは [http://localhost:3000](http://localhost:3000) で利用できます。

## 📦 利用可能なスクリプト

- `pnpm dev` - 開発サーバーの起動
- `pnpm build` - プロダクションビルドの作成
- `pnpm start` - プロダクションサーバーの起動
- `pnpm lint` - リント実行
- `pnpm format` - コードフォーマット
- `pnpm storybook` - Storybookの起動
- `pnpm test` - テストの実行
- `pnpm typecheck` - 型チェックの実行

## 🐳 ドキュメント

- [ドキュメントガイド](./docs/README.md) - 目的、仕様、設計、運用、ロードマップの入口
- [開発ロードマップ](./docs/roadmap.md) - 全体進行の基準
- [開発運用ルール（Contributing）](./docs/CONTRIBUTING.md) - ブランチ・PR・レビュー運用

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
