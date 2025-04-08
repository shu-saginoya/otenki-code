# 命名規則（ユーティリティ関数・ファイル名）

このドキュメントは、ユーティリティ関数やファイル名における命名規則を整理したものです。命名の一貫性を保つことで、コードの可読性・保守性を高めることを目的とします。

---

## 🔧 関数名の命名パターン

| パターン | 使用例 | 説明 |
|----------|--------|------|
| `get◯◯` | `getUserName(obj)` | 値を取得する |
| `fetch◯◯` | `fetchUserData()` | APIなどから取得する |
| `is◯◯` / `has◯◯` / `can◯◯` | `isValidEmail(val)` / `hasPermission(user)` / `canAccess(user)` | 真偽値を返す判定関数 |
| `to◯◯` | `toKebabCase(str)` | 型やフォーマットを変換する |
| `format◯◯` | `formatDate(date)` | 値をフォーマットする |
| `parse◯◯` | `parseQueryString(str)` | 文字列などを解析して構造化する |
| `create◯◯` | `createRandomId()` | 値やオブジェクトを生成する |
| `normalize◯◯` | `normalizeText(text)` | 入力値を整形・正規化する |

---

## 🧩 `fetch` vs `fetcher`、`format` vs `formatter`

| 用語 | 使用例 | 説明 |
|------|--------|------|
| `fetch◯◯` | `fetchUserData()` | データ取得関数（処理そのもの） |
| `◯◯Fetcher` | `userFetcher` | SWRなどで使う「fetcherオブジェクト」 |
| `format◯◯` | `formatDate()` | 値をフォーマットする単体の関数 |
| `◯◯Formatter` | `dateFormatter.format()` | 複数の関連フォーマット処理をまとめたオブジェクトやクラス |

---

## 📄 ファイル名の命名ルール

### 単機能の関数（1ファイル＝1関数）
- ファイル名は関数名と同一にする  
  **例：**


### 関連する関数をまとめる場合
- 「◯◯Utils.ts」のように単数形で命名  
**例：**


> ❗ 複数形（例：`iconsUtils.ts`）は避け、原則として単数形＋`Utils`を使用

---

## 🧠 命名の指針まとめ

| 使用目的 | 命名例 | 備考 |
|----------|--------|------|
| 値の取得 | `fetchUser()`, `getConfig()` | 動詞＋対象でシンプルに |
| 判定 | `isActive()`, `hasRole()` | 真偽を返す関数には `is/has/can` |
| 整形処理 | `formatDate()`, `toTitleCase()` | 変換系は `format` や `to` |
| 生成処理 | `createToken()` | 新しい値や構造を作る関数 |
| fetcherオブジェクト | `userFetcher` | `useSWR` や `useQuery` などに使う |
| フォーマッターオブジェクト | `dateFormatter` | 複数の整形処理をまとめる場合に使用 |

---

## 📚 補足：命名スタイルの統一方法

- ESLint の `naming-convention` を活用（TypeScriptプロジェクト）
- `docs/naming.md` や `README.md` にまとめて共有
- よく使うドメイン用語の辞書（命名辞書）をチーム内で作るのもおすすめ
