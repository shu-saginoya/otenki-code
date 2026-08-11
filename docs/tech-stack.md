# 技術構成と選定方針

このドキュメントは、プロジェクトの技術構成と選定理由の一次情報です。  
目的に対して必要な技術を明確化し、未確定事項は判断待ちとして管理します。

## 目的との対応

参照: [アプリコンセプト](./concept.md)

- 目的: 開いてすぐ天気と服装を確認できる体験を実現する
- 要件: 高速表示、認証付きカスタマイズ、継続運用しやすい開発基盤

## 採用技術（確定）

### フロントエンド

- Next.js 15（App Router）
  - 目的対応: 画面遷移とルーティングを整理し、SSR/CSRを使い分ける
- React 19 + TypeScript
  - 目的対応: UI実装の再利用性と型安全性を確保する
- Redux Toolkit
  - 目的対応: 地域選択などのグローバル状態を一貫管理する
- Tailwind CSS
  - 目的対応: UIを素早く実装し、デザインの一貫性を保つ

### 認証・データ基盤

- Supabase Auth
  - 採用範囲: Email/Password、Google OAuth
  - 目的対応: ユーザーごとの設定保存を可能にする
- Supabase Postgres
  - 目的対応: カスタム服装などユーザー設定データを永続化する
- RLS（Row Level Security）
  - 目的対応: ユーザーごとのデータ分離をDBレイヤーで担保する

### デプロイ・実行基盤

- Vercel
  - 目的対応: Next.jsとの親和性を活かして継続運用しやすいデプロイ基盤を構築する

### 開発・品質

- Jest + Testing Library
  - 目的対応: 回帰を検知し、安心して改善を継続する
- Storybook
  - 目的対応: UI部品の単体確認と再利用性向上
- ESLint + Prettier
  - 目的対応: 実装品質と記述スタイルの一貫性を維持する

## 採用技術（補助ライブラリ）

- SWR: データ取得とキャッシュ制御
- react-hook-form: フォーム状態管理
- dayjs: 日付時刻処理
- clsx + tailwind-merge: classNameマージ（`cn()`）
- react-icons: アイコン表示

## 環境・実行条件

- Node.js: 24.13.0（Volta固定）
- package manager: pnpm 10.27.0

## 既知の未確定事項（判断待ち）

1. カスタム服装データモデル
   - 現在の方針: 未定（設計タスクとして分離）
   - 論点: 1ユーザー1プロフィールか、複数プロフィール対応か
2. Vercel環境運用
   - 現在の方針: 未定（方針のみ記載）
   - 論点: Preview運用の有無、ブランチ戦略との連携
3. 監視基盤
   - 現在の方針: 未定（将来タスク化）
   - 論点: Vercel標準ログ中心で開始するか、外部監視を導入するか

## Supabase運用の前提

- リージョン: ap-northeast-1（Tokyo）
- 認証方式: Email/Password と Google OAuth
- ミドルウェアでセッション更新と認可制御を行う

## 環境変数（最低限）

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

注記:

- サーバー専用の秘密情報を追加する場合は、公開環境変数と分離して管理する
- 値そのものはドキュメントに記載しない

## 参照

- [開発ロードマップ](./roadmap.md)
- [開発運用ルール（Contributing）](./CONTRIBUTING.md)
- [コンポーネント設計書](./components-design.md)
