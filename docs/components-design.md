# コンポーネント設計書

このドキュメントでは、本プロジェクトのディレクトリ構成について説明します。

## 📁 ディレクトリ構成

```
components/
  ├── container/    # レイアウトなど他の要素を整理するためのコンポーネント
  ├── parts/        # コンポーネントを構成する部品
  ├── base/         # 一般的によく使われるUI
  ├── templates/    # プロジェクトでよく利用される組み合わせ

layouts/            # 各ページ共通のレイアウト

pages/              # ルーティングのためのページコンポーネント

composables/        # 再利用可能なロジック（useFetchData, useFormValidation など）

public/             # 静的ファイル（画像、フォントなど）

assets/             # JSONデータや動的に取得するコンテンツ

stores/             # グローバルな状態管理

types/              # 型定義（TypeScript 用）

utils/              # 共通のユーティリティ関数

contents/           # 一時的なコンテンツデータ（文章・配列・オブジェクトなど）
```

---

## 📂 `components/`

`components/` ディレクトリには、Vue の再利用可能なコンポーネントを配置します。

- ``：要素の整列・レイアウトのためのコンポーネント。
  - 例: `Stack.vue`, `Grid.vue`
- ``：最小単位の UI コンポーネント。
  - 例: `BaseButton.vue`, `BaseInput.vue`
- ``：アイコンコンポーネント。
  - 例: `IconAlert.vue`, `IconCheck.vue`
- ``：`parts/` を組み合わせた汎用的なコンポーネント。
  - 例: `AlertMessage.vue`, `FormGroup.vue`
- ``：ページの一部分を構成するコンポーネント。
  - 例: `Header.vue`, `Footer.vue`, `Sidebar.vue`

---

## 📂 `layouts/`

全ページで共通のレイアウトを定義します。

- 例: `default.vue`, `admin.vue`

---

## 📂 `pages/`

ルーティングのためのページコンポーネントを格納します。

- 例: `index.vue`, `about.vue`, `dashboard.vue`

---

## 📂 `composables/`

再利用可能なロジックを定義します（Vue の Composition API を活用）。

- 例: `useFetchData.ts`, `useFormValidation.ts`, `useModal.ts`

---

## 📂 `public/`

静的ファイル（画像、フォント、robots.txt など）を配置します。

- 例: `favicon.ico`, `logo.png`

---

## 📂 `assets/`

JSONデータや動的に取得するコンテンツを管理します。

- 例: `categories.json`, `settings.json`

---

## 📂 `stores/`

グローバルな状態管理を行うストアを格納します。

- 例: `useUserStore.ts`, `useCartStore.ts`

---

## 📂 `types/`

TypeScript の型定義を格納します。

- 例: `user.ts`, `product.ts`

---

## 📂 `utils/`

プロジェクト全体で使うユーティリティ関数を格納します。

- 例: `formatDate.ts`, `debounce.ts`

---

## 📂 `contents/`

バックエンド未整備のため一時的に格納する文章やデータ（配列・オブジェクト形式）。

- 例: `texts.ts`, `menuItems.ts`

---

## 🚀 運用ルール

- `components/` のコンポーネントは可能な限り粒度を明確にして、再利用性を重視した実装にする。
- `layouts/` は基本的に `default.vue` などで統一し、共通部分を定義する。
- `composables/` は `use` プレフィックスをつける（例: `useFetchData.ts`）。
- `stores/` では `use` プレフィックスをつけ、状態管理を担当させる。
- `types/` では TypeScript の型定義を管理し、開発の一貫性を保つ。
- `contents/` にバックエンド未整備のデータを一時的に格納し、Template に注入する。

このドキュメントを参考に、プロジェクトの開発・運用をスムーズに進めましょう！ 🎯


## container

- 責務: 他のコンポーネントを整列させる
- グローバル変数: アクセスしない
- APIなどコンテンツ取得: 取得しない
- CSSの利用: 利用する
- 型定義: 独自に型情報をもつ
- 依存関係: 依存なし
- 再利用性: 同じフレームワークのプロジェクトでも利用可能

## parts

- 責務: コンポーネントを構成する部品
- グローバル変数: アクセスしない
- APIなどコンテンツ取得: 取得しない
- CSSの利用: 利用する
- 型定義: 独自に型情報をもつ
- 依存関係: Container
- 再利用性: 同じフレームワークのプロジェクトでも利用可能

## base

- 責務: 一般的によく使われるUI
- グローバル変数: アクセスしない
- APIなどコンテンツ取得: 取得しない
- CSSの利用: 利用する
- 型定義: 独自に型情報をもつ
- 依存関係: Container・Parts
- 再利用性: 同じフレームワークのプロジェクトでも利用可能

## templates

- 責務: プロジェクトでよく利用される組み合わせ
- グローバル変数: アクセスしない
- APIなどコンテンツ取得: 取得しない
- CSSの利用: 利用しない
- 型定義: 共通の型情報をインポートする
- 依存関係: Container・Parts・Base
- 再利用性: プロジェクト内で再利用可能

## layout

- 責務: Page共通のレイアウトを管理する
- グローバル変数: アクセスする
- APIなどコンテンツ取得: 取得しない
- CSSの利用: 利用しない
- 型定義: 共通の型情報をインポートする
- 依存関係: Container・Parts・Base
- 再利用性: プロジェクト内で再利用可能

## page

- 責務: 各ページで実際に表示されるコンテンツの管理
- グローバル変数: アクセスする
- APIなどコンテンツ取得: 取得する
- CSSの利用: 利用しない
- 型定義: 共通の型情報をインポートする
- 依存関係: Container・Parts・Base・Layout
- 再利用性: プロジェクト内で再利用可能

## その他

- hooks: ロジックを分離する
- stores: グローバル変数の管理
- utils: よく利用される関数
- types: プロジェクト共通の型定義