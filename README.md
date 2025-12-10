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
   npm install
   ```

1. 開発サーバーの起動

   ```bash
   npm run dev
   ```

アプリケーションは [http://localhost:3000](http://localhost:3000) で利用できます。

## 📦 利用可能なスクリプト

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルドの作成
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - リント実行
- `npm run format` - コードフォーマット
- `npm run storybook` - Storybookの起動
- `npm test` - テストの実行
- `npm run typecheck` - 型チェックの実行

## 🐳 ドキュメント

- [コンポーネント設計書](./docs/components-design.md) - UIコンポーネントの構成と設計方針

## ブランチモデル

- `main`:
  - 常に安定。公開用の履歴として管理します。
  - 直接 push は行わず、PR を通して更新します。
- `staging`:
  - 機能統合の一時的な確認用。`feature/*` をここに集約して動作確認してから `main` に反映します。
- `feature/<topic>`:
  - 機能追加や改善の作業ブランチ。作業が完了したら `staging` へ PR を作成します。
- `hotfix/<topic>`:
  - 緊急修正。必要に応じて `main` への直接 PR を作成します（マージ後は `staging` にも反映）。

## 🤝 開発フロー

1. 作業開始: `feature/<topic>` を作成
2. コミット: 小さく意味のある単位でコミット
3. PR 作成: `feature/<topic>` → `staging`
4. セルフレビュー: 差分確認・説明追加
5. マージ: 問題なければ `staging` にマージ
6. リリース準備: `staging` → `main` に PR を作成し、同様に確認してマージ

詳細は [CONTRIBUTING.md](./docs/CONTRIBUTING.md) を参照

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
