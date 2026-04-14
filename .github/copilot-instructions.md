# AIコーディングエージェント向け指示書 - お天気コーデ (Otenki Code)

## プロジェクト概要

気象庁APIを使用して気温に基づいた服装を推薦する天気予報アプリ。ターゲットユーザー：小さい子どもがいる親子。コアコンセプト：**シンプルさとスピード** - アプリを開いたらすぐに天気と服装が表示される。

**技術スタック:** Next.js 15 (App Router)、TypeScript、Redux Toolkit、Tailwind CSS、HeadlessUI、Supabase、Jest、Storybook

## アーキテクチャとデータフロー

### 状態管理パターン

- **Redux Toolkit** でグローバル状態を管理
- **カスタムフック** (`src/hooks/`) でデータ取得と派生状態を処理

### JMA API 連携 (`src/lib/jma/`)

- `fetchForecast(officeCode)` - 気象庁から天気データを取得
- エリアコードの構造: `areas.json` → offices → class10s → class15s → class20s
- **重要**: API レスポンスは検証・型付けされているが、構造を仮定しない

## ディレクトリ構成と整理

[docs/components-design.md](../docs/components-design.md)を参照。
もし、新規作成する際に迷った場合は質問する。

## 命名規則（`docs/naming-rule.md` 参照）

[docs/naming-rule.md](../docs/naming-rule.md)を参照。

## コンポーネントパターン

### UIコンポーネント (`src/components/ui/`)

- **アプリ非依存である必要あり** - JMA/服装ドメインロジックを直接含まない
- `cn()` ユーティリティ（clsx + tailwind-merge）で className を合成

```tsx
// 標準パターン
import { cn } from "@/lib/cn";
import { colorVariantMap, fontSizeMap } from "@/styles";

export const Button = ({ variant = "paint", color = "primary", size = "base", ... }) => {
  return (
    <button className={cn(
      colorVariantMap[variant][color],
      fontSizeMap[size],
      // ... その他のスタイル
    )}>
      {children}
    </button>
  );
};
```

### Featureコンポーネント (`src/components/features/`)

- **ドメイン固有** - フック、サービス、Redux を使用可
- 共通コンポーネント（Header、Footer、Main、AppLogo）は `features/common/` に配置

### スタイルシステム

- Tailwind クラスは `src/styles/parts/` と `src/styles/templates/` のバリアントマップで管理
- `colorVariantMap[variant][color]` が Tailwind クラス文字列を返す
- className のマージには必ず `cn()` を使用 - 手動で Tailwind クラスを連結しない

## データと型

### 型システム

- `src/types/` で一元管理、`index.ts` からバレルエクスポート
- アプリドメインの型は`@/types`からインポート
- ライブラリ固有の型（JMA API 等）は各`lib/`モジュールからインポート

## 開発ワークフロー

### アプリ実行

```bash
pnpm dev          # 開発サーバー起動（localhost:3000）
pnpm build        # プロダクションビルド
pnpm start        # プロダクションビルドを実行
```

### テストと品質管理

```bash
pnpm test             # Jestテスト実行
pnpm lint             # ESLintチェック
pnpm format           # ESLint --fix（自動フォーマット）
pnpm typecheck    # TypeScript検証（出力なし）
pnpm storybook        # Storybookをポート6006で起動
```

### Nodeバージョン

- **Voltaで固定**: [package.json](../package.json) を参照
- 依存関係の競合を避けるため、プロジェクト全体で同じNodeバージョンを使用

## コード品質基準

### ESLint設定 (`eslint.config.mjs`)

- インポート順序を強制
- アルファベット順のインポートで `newlines-between: "always"`
- Prettier統合（`prettier/prettier: "error"`）
- Tailwind classnames 順序警告を有効化

### テスト

- Jest と React Testing Library (`@testing-library/react`)
- テストファイルはコンポーネントと同じディレクトリ: `*.test.ts` または `*.test.tsx`
- セットアップは `jest.setup.ts` に記述
- **プロダクションビルドでは `data-testid` 属性を削除**（`next.config.ts` 参照）

## 重要な実装詳細

### Redux Store の初期化

- アプリを `<StoreProvider>` でラップ（`app/layout.tsx` と `app/StoreProvider.tsx` 参照）
- マウント時に `initSelectedArea()` を呼び出して localStorage から復元
- **localStorage に直接アクセスしない** - Redux アクションを使用

### API パターン

- JMA API はネストされた地域構造を返す - `office.code` → `class10s` などでナビゲート
- 予報レスポンスには配列が含まれる: `timeSeries[0].areas[0].weatherCodes`
- カスタムフックでローディング/エラー状態を処理（`useJmaForecast` パターン参照）

### 画像パス

- `public/images/` の公開画像 → `/images/...` として参照（`public/` プレフィックス不要）
- 服装画像はケバブケースのファイル名: `T-shirt.png`、`pants-long.png`
- **`clothingImages.ts` を更新する前に実際のファイル名を確認**

### Tailwind カスタムクラス

- カスタムユーティリティは `src/styles/parts/` に配置（actionableStyles、backgroundStyles など）
- 一時的なクラスを追加しない - バリアントマップを作成または既存のものを拡張
- 条件付きクラスのマージには安全に `cn()` を使用

## 新機能追加時の手順

1. **型定義から**: `src/types/` で定義し、index からエクスポート
2. **データ層**: 外部 API なら `lib/` へ、純粋関数なら `utils/` へ
3. **フック**: データ取得/状態管理用に `hooks/features/` で作成
4. **UI コンポーネント**: `ui/` でプリミティブを構築し、`features/` で組み合わせ
5. **Redux**: 真のグローバル状態のみ（地域選択パターン）
6. **テスト**: 実装ファイルと一緒に追加
7. **Storybook**: UI コンポーネント用に `.stories.tsx` を作成

## よくある落とし穴

- ❌ `components/ui/buttons/Button/index.tsx` から直接インポートしない - `@/components/ui` を使用
- ❌ Tailwind クラスを手動で連結しない - 常に `cn()` を使用
- ❌ React フックが必要なビジネスロジックを `utils/` に配置しない - `hooks/` を使用
- ❌ JMA API 構造を仮定しない - 型が不完全な可能性あり、実行時データを検証
- ❌ 画像ファイル名にアンダースコアを使用しない - プロジェクトはハイフン使用
- ❌ 複数形の util ファイル（`iconsUtils.ts`）を作成しない - 単数形（`iconUtils.ts`）を使用

## リソース

- **ドキュメント**: `docs/`ディレクトリ
- **Tailwind 設定**: `tailwind.config.ts` - カスタムテーマ拡張
- **パスエイリアス**: `@/*` → `src/*`（tsconfig.json）
