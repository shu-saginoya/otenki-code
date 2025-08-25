# お天気コード (Otenki Code)

![サイトロゴ](/public/images/site_logo.png)

## 📝 概要

お天気コードは、天気予報情報を基に最適な服装を提案するWebアプリケーションです。気象庁の天気予報APIを利用して、ユーザーの地域の天気に合わせて適切な服装を提案します。

## 🚀 機能

- 地域別の天気予報表示
- 天気に応じた服装提案
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

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。
