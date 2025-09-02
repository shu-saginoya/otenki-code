# コンポーネント設計書

このドキュメントでは、本プロジェクトのディレクトリ構成について説明します。

## 📁 ディレクトリ構成

```md
app/ # Next.jsのApp Router（ルーティングシステム）ディレクトリ

components/ # 再利用可能なコンポーネント
├── ui/ # 汎用的なUIコンポーネント
│ ├── buttons/ # ボタン関連のコンポーネント
│ ├── feedback/ # フィードバック関連のコンポーネント
│ ├── inputs/ # 入力要素関連のコンポーネント
│ ├── layout/ # レイアウト関連のコンポーネント
│ └── display/ # 表示関連のコンポーネント
│
└── features/ # アプリケーション固有の機能コンポーネント
├── weather/ # 天気予報関連のコンポーネント
├── clothing/ # 服装推薦関連のコンポーネント
├── area/ # エリア選択関連のコンポーネント
└── common/ # アプリ全体で使用される共通コンポーネント

hooks/ # 再利用可能なロジック

lib/ # グローバルステートなどを格納

services/ # ビジネスロジックと外部サービス連携のコード

styles/ # CSS関連のユーティリティー

types/ # 共通の型定義

utils/ # 共通のユーティリティ関数
```

---

## 📂 `app/`

`app/` ディレクトリはNext.jsのApp Routerに対応したディレクトリです。

- 例: `page.tsx`, `layout.tsx`

---

## 📂 `components/`

`components/` ディレクトリには、再利用可能なコンポーネントを配置します。

### 📂 `components/ui/`

アプリケーション非依存の汎用的なUIコンポーネントを配置します。

- `buttons/`: ボタン関連のコンポーネント

  - 例: `Button/index.tsx`, `IconButton/index.tsx`

- `inputs/`: 入力要素関連のコンポーネント

  - 例: `Input/index.tsx`, `Switch/index.tsx`, `Carousel/index.tsx`

- `layout/`: レイアウト関連のコンポーネント

  - 例: `Grid/index.tsx`, `Stack/index.tsx`

- `display/`: 表示関連のコンポーネント
  - 例: `Text/index.tsx`, `Card/index.tsx`, `Badge/index.tsx`, `ShapeImage/index.tsx`, `List/index.tsx`

### 📂 `components/features/`

アプリケーション固有の機能を実装するコンポーネントを配置します。

- `weather/`: 天気予報関連のコンポーネント

  - 例: `ForecastCard/index.tsx`, `SimpleForecastCard/index.tsx`, `Temp/index.tsx`

- `clothing/`: 服装推薦関連のコンポーネント

  - 例: `ClothingRecommendation/index.tsx`

- `area/`: エリア選択関連のコンポーネント

  - 例: `AreaOptionsList/index.tsx`, `CurrentlyArea/index.tsx`

- `common/`: アプリ全体で使用される共通コンポーネント
  - 例: `Header/index.tsx`, `Footer/index.tsx`, `Main/index.tsx`, `AppLogo/index.tsx`

---

## 📂 `hooks/`

再利用可能なロジックを定義します（ReactやNext.jsの機能に依存している関数）。

- 例: `useAppRouter.ts`, `useAreaOptions.ts`, `useClothing.ts`, `useJmaForecast.ts`, `useSelectArea.ts`

---

## 📂 `lib/`

グローバルステートや共通ライブラリを格納します。

- 例: `cn.ts`, `dayjs.ts`, `hooks.ts`, `store.ts`
- サブディレクトリ例: `features/`, `jma/`, `reactIcons/`, `supabase/`

---

## 📂 `styles/`

CSS関連のユーティリティー関数を格納します。

- 例: `index.ts`
- サブディレクトリ:
  - `parts/`: 基本的なスタイルユーティリティ
  - `templates/`: テーマやバリエーション

---

## 📂 `types/`

プロジェクト全体で利用する型定義ファイルを格納します。

- 例: `clothing.ts`, `color.ts`, `forecast.ts`, `time.ts`

---

## 📂 `utils/`

プロジェクト全体で使うユーティリティ関数を格納します。(Reactに依存しない)

- 例: `forecastUtils.ts`
- サブディレクトリ例: `dateUtils/`, `fetchUtils/`, `localstorageUtils/`, `tempUtils/`, `textUtils/`

---

## � `services/`

ビジネスロジックと外部サービス連携のコードを配置します。

- 例: `clothing.ts`
- サブディレクトリ例:
  - `auth/`: 認証関連のサービス
  - `users/`: ユーザー関連のサービス

---

## �🚀 運用ルール

- `components/ui/` のコンポーネントは他のプロジェクトでも流用できるよう、外部依存を最小限にする
- `components/features/` のコンポーネントはアプリケーション固有の機能を実装し、`ui`コンポーネントを組み合わせる
- `hooks/` は `use` プレフィックスをつける（例: `useClothing.ts`）
- `services/` はビジネスロジックとデータアクセスを担当し、UIから独立して動作するようにする
- `types/` では TypeScript の型定義を管理し、開発の一貫性を保つ

このドキュメントを参考に、プロジェクトの開発・運用をスムーズに進めましょう！ 🎯
