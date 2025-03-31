# コンポーネント設計書

このドキュメントでは、本プロジェクトのディレクトリ構成について説明します。

## 📁 ディレクトリ構成

```
app/                # Next.jsのApp Router（ルーティングシステム）ディレクトリ

components/         # 再利用可能なコンポーネント
  ├── base/         # 一般的によく使われるUI
  ├── container/    # レイアウトなど他の要素を整理するためのコンポーネント
  ├── parts/        # コンポーネントを構成する部品
  ├── templates/    # プロジェクトでよく利用される組み合わせ

hooks/              # 再利用可能なロジック

lib/                # グローバルステートなどを格納

styles/             # CSS関連のユーティリティー

types/              # 共通の型定義

utils/              # 共通のユーティリティ関数
```

---

## 📂 `app/`

`app/` ディレクトリはNext.jsのApp Routerに対応したディレクトリです。

- 例: `page.tsx`, `layout.tsx`

---

## 📂 `components/`

`components/` ディレクトリには、再利用可能なコンポーネントを配置します。

- `base`：一般的によく使われるUI。
  - 例: `Button.tsx`, `Modal.tsx`
  - 依存関係: Container・Parts
- `container`：レイアウトなど他の要素を整理するためのコンポーネント。
  - 例: `Grid.tsx`, `Stack.tsx`
  - 依存関係: 依存なし
  - `parts`：コンポーネントを構成する部品。
  - 例: `Text.tsx`, `Icon.tsx`
  - 依存関係: 依存なし
- `templates`：プロジェクトでよく利用される組み合わせ。
  - 例: `Header.tsx`, `SideBar.tsx`
  - 依存関係: Container・Parts・Base

---

## 📂 `hooks/`

再利用可能なロジックを定義します（ReactやNext.jsの機能に依存している関数）。

- 例: `useFetchData.ts`, `useFormValidation.ts`, `useModal.ts`

---

## 📂 `lib/`

グローバルステートなどを格納します。

- 例: `store.ts`

---

## 📂 `styles/`

CSS関連のユーティリティー関数を格納します。

- 例: `color.ts`, `layout.ts`

---

## 📂 `types/`

プロジェクト全体で利用する型定義ファイルを格納します。

- 例: `user.ts`

---

## 📂 `utils/`

プロジェクト全体で使うユーティリティ関数を格納します。(Reactに依存しない)

- 例: `formatDate.ts`, `debounce.ts`

---

## 🚀 運用ルール

- `components/` のコンポーネントは可能な限り粒度を明確にして、再利用性を重視した実装にする。
- `hooks/` は `use` プレフィックスをつける（例: `useFetchData.ts`）。
- `types/` では TypeScript の型定義を管理し、開発の一貫性を保つ。

このドキュメントを参考に、プロジェクトの開発・運用をスムーズに進めましょう！ 🎯
