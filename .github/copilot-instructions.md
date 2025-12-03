# AIコーディングエージェント向け指示書 - お天気コーデ (Otenki Code)

## プロジェクト概要

気象庁APIを使用して気温に基づいた服装を推薦する天気予報アプリ。ターゲットユーザー：小さい子どもがいる親子。コアコンセプト：**シンプルさとスピード** - アプリを開いたらすぐに天気と服装が表示される。

**技術スタック:** Next.js 15 (App Router)、TypeScript、Redux Toolkit、Tailwind CSS、HeadlessUI、Supabase、Jest、Storybook

## アーキテクチャとデータフロー

### 状態管理パターン

- **Redux Toolkit** でグローバル状態を管理（現在は地域情報のみ - `src/lib/store.ts`参照）
- **カスタムフック** (`src/hooks/features/`) でデータ取得と派生状態を処理
- **localStorage** と Redux を同期して地域選択を永続化（`areasSlice.ts`参照）
- **SWR** を一部のフックでAPI データ取得に使用（`package.json`の依存関係を確認）

**重要なフロー例**（地域選択 → 天気 → 服装）:

1. ユーザーが地域選択 → `setSelectedArea` アクション → Redux store + localStorage
2. `useJmaForecast` フックが Redux の `selectedArea` を監視 → `fetchForecast(office.code)` を実行
3. 予報データがコンポーネントへ → `getAppropriateClothing` サービスが服装を決定
4. `src/components/ui/` の UI プリミティブを使ってコンポーネントを描画

### JMA API 連携 (`src/lib/jma/`)

- `fetchForecast(officeCode)` - 気象庁から天気データを取得
- レスポンスの型は `@/types/forecast.ts` で定義
- エリアコードの構造: `areas.json` → offices → class10s → class15s → class20s
- **重要**: API レスポンスは検証・型付けされているが、構造を仮定しない

## ディレクトリ構成と整理

```
src/
├── app/              # Next.js App Router（ルーティング、レイアウト）
├── components/
│   ├── ui/           # 再利用可能なアプリ非依存プリミティブ（Button、Input、Stack、Grid）
│   └── features/     # ドメイン固有コンポーネント（weather、clothing、area）
├── hooks/
│   ├── features/     # ドメインフック（useJmaForecast、useClothing、useAreaOptions）
│   └── ui/           # UI関連フック
├── lib/              # コアライブラリ（store、dayjs設定、cnユーティリティ、jmaクライアント）
├── services/         # ビジネスロジック（服装推薦、認証、ユーザー管理）
├── styles/           # Tailwind バリアントユーティリティ（colorVariantMap、fontSizeMap）
├── types/            # TypeScript 型定義（clothing、forecast、color、time）
├── utils/            # 純粋関数（React非依存: dateUtils、tempUtils、textUtils）
└── data/             # 静的データ（clothingImages.ts、defaultClothing.ts）
```

**重要な区別**: `hooks/` = React依存、`utils/` = 純粋関数、`services/` = 外部依存を持つビジネスロジック

## 命名規則（`docs/naming-rule.md` 参照）

### 関数

- `get◯◯` - オブジェクト/状態から値を取得（例: `getClothingImagePath`）
- `fetch◯◯` - API/ネットワーク呼び出し（例: `fetchForecast`）
- `is◯◯/has◯◯/can◯◯` - 真偽値チェック（例: `isValidEmail`）
- `to◯◯` - 型変換（例: `toKebabCase`）
- `format◯◯` - 値のフォーマット（例: `formatDate`）
- `create◯◯` - 新しい値を生成（例: `createRandomId`）

**重要**: API呼び出しには `fetch`、データ抽出には `get` を使用。`◯◯Utils.ts` ファイル名は複数形を避ける（単数形 + Utils）。

### ファイルとコンポーネント

- **コンポーネント**: ディレクトリ名と一致する名前付きエクスポート（例: `components/ui/buttons/Button/index.tsx` は `Button` をエクスポート）
- **Utils**: 1ファイル＝1関数 または 関連関数をまとめた `◯◯Utils/index.ts`
- **フック**: 必ず `use` プレフィックス（例: `useJmaForecast.ts`）
- **名前はシンプルに** - プロジェクト哲学に従い、過度に長い識別子を避ける

## コンポーネントパターン

### UIコンポーネント (`src/components/ui/`)

- **アプリ非依存である必要あり** - JMA/服装ドメインロジックを直接含まない
- `cn()` ユーティリティ（clsx + tailwind-merge）で className を合成
- Props に `src/styles/templates/` のバリアントシステムを含む（例: `ColorVariant`, `FontSize`）
- 例: `Button` は `variant`、`color`、`size`、`prependIcon`、`appendIcon` を受け取る

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
- ドメインで整理: `area/`、`clothing/`、`forecast/`、`common/`
- 共通コンポーネント（Header、Footer、Main、AppLogo）は `features/common/` に配置

### スタイルシステム

- Tailwind クラスは `src/styles/parts/` と `src/styles/templates/` のバリアントマップで管理
- `colorVariantMap[variant][color]` が Tailwind クラス文字列を返す
- 利用可能なバリアント: `paint`、`outline`、`ghost`（`colorVariants.ts` 参照）
- className のマージには必ず `cn()` を使用 - 手動で Tailwind クラスを連結しない

## データと型

### 服装システム

- **画像**: `src/data/clothingImages.ts` - `ClothingImageId` → `{ path, name, category }` のマッピング
  - パスはハイフン使用: `/images/clothing/down-coat.png`（アンダースコア不可）
  - カテゴリ: `tops`、`bottoms`、`outer`
- **デフォルトアイテム**: `src/data/defaultClothing.ts` - 気温ベースの推薦
- **カスタムアイテム**: Supabase に保存、`services/clothing.ts` でデフォルトとマージ
- **Utils**: `getClothingImagePath(id)`、`getClothingImagesByCategory(category)` が `utils/clothingImageUtils/` にあり

### 型システム

- `src/types/` で一元管理、`index.ts` からバレルエクスポート
- 主要な型: `ClothingItem`、`ClothingCategory`、`JmaForecastResponse`、`Color`、`TimeOfDay`
- **常に `@/types` からインポート** - 個別ファイルからのインポート不可

## 開発ワークフロー

### アプリ実行

```bash
npm run dev          # 開発サーバー起動（localhost:3000）
npm run build        # プロダクションビルド
npm run start        # プロダクションビルドを実行
npm run typecheck    # TypeScript検証（出力なし）
```

### テストと品質管理

```bash
npm test             # Jestテスト実行
npm run lint         # ESLintチェック
npm run format       # ESLint --fix（自動フォーマット）
npm run storybook    # Storybookをポート6006で起動
```

### Nodeバージョン

- **Voltaで固定**: Node 20.17.0、npm 10.8.3（`package.json` 参照）
- 依存関係の競合を避けるため、これらのバージョンを使用

## コード品質基準

### ESLint設定 (`eslint.config.mjs`)

- **インポート順序を強制**: builtin → external → internal → parent → sibling → index → object → type
- アルファベット順のインポートで `newlines-between: "always"`
- Prettier統合（`prettier/prettier: "error"`）
- Tailwind classnames 順序警告を有効化

### テスト

- Jest と React Testing Library (`@testing-library/react`)
- テストファイルはコンポーネントと同じディレクトリ: `*.test.ts` または `*.test.tsx`
- セットアップは `jest.setup.ts` に記述
- **プロダクションビルドでは `date-testid` 属性を削除**（`next.config.ts` 参照）

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
2. **データ層**: 外部 API なら `services/` へ、純粋関数なら `utils/` へ
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

- **ドキュメント**: `docs/components-design.md`、`docs/naming-rule.md`、`docs/concept.md`
- **API サンプル**: `docs/apiSample/` - テスト用の JMA レスポンス例
- **Tailwind 設定**: `tailwind.config.ts` - カスタムテーマ拡張
- **パスエイリアス**: `@/*` → `src/*`（tsconfig.json）
