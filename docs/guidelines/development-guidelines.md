---
type: Guidelines
title: 実装ルール
description: ディレクトリ構成やファイルの設置ルールや命名規則
---

## ディレクトリ構成

アプリのファイルは`src/`ディレクトリにまとめる

- `app/`: 画面とルーティング
- `components/`: UI
- `components/features/`: 機能ごとのUI
- `components/ui/`: 汎用UI
- `data/`: 定数・テキスト・画像の定義
- `hooks/`: React のロジック
- `lib/`: 共通ライブラリ
- `styles/`: CSS ユーティリティ
- `types/`: 型
- `utils/`: 純粋関数

## ファイル設置のルール

- `hooks/`はReact依存
- `utils/`はReact非依存
- `lib/`は外部サービスに依存
- コンポーネント名はPascalCase
- フック名は`useXxx`形式
- 単機能なら関数名と同じにする
- 関連処理は`XxxUtils.ts`形式にする

## コメント

### 全ファイル共通

ファイルのフロントにはJSDoc形式でそのファイルの役割や目的や責任範囲を明確にします。

```ts
/**
 * @file ファイルの役割を簡潔に記載する
 * @description 必要があれば詳細な説明も記述する
 */
```

### 関数・クラス・コンポーネント

ファイルの中に複数の関数がある場合などは、それぞれの関数にもJSDoc形式のコメントをつける

```ts
/**
 * 関数・クラス・コンポーネントなどの役割
 * @param sample - 引数の解説
 */
```

## 関数名のルール

- `getXxx`: 値を取得
- `fetchXxx`: 外部から取得
- `isXxx`: 判定
- `hasXxx`: 判定
- `canXxx`: 許可判定
- `formatXxx`: 整形
- `parseXxx`: 解析
- `createXxx`: 作成

## その他のルール

- Tailwind のクラス結合は `cn()` を使う
- 関数は基本はアロー関数に統一する（フレームワークなどで規約がある場合はそれに従う）
