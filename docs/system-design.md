# 構成設計

`src/` は機能別に分ける。

## 配置方針

- `app/`: 画面とルーティング
- `components/`: 再利用UI
- `features/`: 機能ごとの実装
- `ui/`: 汎用UI
- `hooks/`: React のロジック
- `lib/`: 共通ライブラリ
- `utils/`: 純粋関数
- `types/`: 型
- `styles/`: CSS ユーティリティ
- `data/`: テキストと画像の定義
- `constants/`: 定数

## ルール

- `hooks/` は React 依存
- `utils/` は React 非依存
- コンポーネント名は PascalCase
- フック名は `useXxx` 形式

## 目的

- 役割を見える化する
- 実装を迷わず進める
- 再利用性を高める
