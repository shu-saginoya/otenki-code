# Contributing Guide

このプロジェクトは個人開発で運用していますが、将来的な拡張や第三者の閲覧を想定して、運用を明文化しています。

## ブランチ運用

- `main`: 常に安定。PR経由のみで更新。
- `staging`: 統合確認用。`feature/*` をここに集約。
- `feature/<topic>`: 機能追加・改善。例: `feature/add-weather-client`
- `hotfix/<topic>`: 緊急修正。例: `hotfix/fix-build-error`

### ブランチ作成例

```bash
git checkout -b feature/add-weather-client
git push -u origin feature/add-weather-client
```

## プルリクエスト手順

1. `feature/<topic>` → `staging` に PR を作成
2. PR テンプレートのチェックリストを埋める（説明・影響範囲・動作確認）
3. Files changed タブでセルフレビュー
4. 問題なければ `staging` にマージ
5. `staging` → `main` に PR を作成し、同様に確認してマージ

### PR の書き方（推奨）

- タイトル: 短く具体的に（例: `feat: add weather API client`）
- 本文:
  - 背景（なぜ、この変更が必要か）
  - 変更点（何をしたか）
  - 動作確認方法（手順やスクショ）
  - 影響範囲（破壊的変更の有無、設定変更の有無）
  - 残課題（次にやること）

## コミットメッセージ（推奨）

- 可能なら Conventional Commits に準拠:
  - `feat: ...` 新機能
  - `fix: ...` バグ修正
  - `docs: ...` ドキュメント
  - `refactor: ...` リファクタ
  - `chore: ...` その他メンテ

## マージポリシー

- 原則「Squash and merge」を使用（PR 単位で履歴をまとめる）
- 緊急時は「Merge commit」でも可（コンテキストを残したい場合）

## レビュー運用（個人開発向け）

- セルフレビューを必ず実施
- 差分の目的外変更（フォーマットのみの変更など）は可能なら別 PR に分ける
- コメントの解決（Resolve）を行い、未解決がないことを確認

## ブランチ保護（初期方針）

- `main`:
  - 直接 push 禁止（PR 必須）
  - レビュー必須（1 承認）ただし個人運用のため、必要に応じて管理者例外でマージ可
- `staging`:
  - 任意で保護（PR 推奨）

CI（自動テスト・ビルド）は後から導入予定。導入時は `main` の必須チェックに追加します。
