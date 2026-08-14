# 技術方針

技術は、目的を達成しやすい最小構成を選ぶ。

## 目的

- すぐ表示できる体験を優先する
- 認証付きの保存ができるようにする
- 継続運用しやすい構成にする

## 選定

### フロントエンド

- Next.js 15
- React 19 + TypeScript
- Redux Toolkit
- Tailwind CSS

### 認証と保存

- Supabase Auth
- Supabase Postgres
- RLS

### 運用

- Vercel
- Jest + Testing Library
- ESLint + Prettier

## 保存方針

- 未認証ユーザーは保存不可
- 認証済みユーザーのみ設定を保存する
- 予報表示は認証前でも可能

## データ設計

- `user_profiles`
- `user_clothing_items`
- `user_temp_zone_rule_sets`
- `user_selected_areas`

## 環境変数

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 未決事項

- 複数プロフィール対応
- Vercel の運用方針
- 監視基盤

- 必須環境変数が未設定の場合は、起動時に不足内容が分かるエラーを出す
- サーバー専用の秘密情報を追加する場合は、公開環境変数と分離して管理する
- CIに本番用シークレットを登録しない

注記:

- `.env.example` は開発環境の準備手順としてGit管理する
- 値そのものはドキュメントや `.env.example` に記載しない

## 参照

- [開発計画](./development-plan.md)
- [運用ルール](./operating-guide.md)
- [構成設計](./system-design.md)
