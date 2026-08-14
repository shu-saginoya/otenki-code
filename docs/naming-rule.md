# 命名規則

文書とコードで用語を揃える。

## 用語

- 地域
- 日中
- 朝夕
- 服装アイテム
- 気温帯
- ユーザー設定

## 関数名

- `getXxx`: 値を取得
- `fetchXxx`: 外部から取得
- `isXxx`: 判定
- `hasXxx`: 判定
- `canXxx`: 許可判定
- `formatXxx`: 整形
- `parseXxx`: 解析
- `createXxx`: 作成

## ファイル名

- 単機能なら関数名と同じにする
- 関連処理は `XxxUtils.ts` 形式にする
- `utils` は単数形にする

## ルール

- 画面表示は日本語を優先する
- 内部コードでは `class20` などの識別子を使う
- 温度は `℃` を使う


- ESLint の `naming-convention` を活用（TypeScriptプロジェクト）
- `docs/naming.md` や `README.md` にまとめて共有
- よく使うドメイン用語の辞書（命名辞書）をチーム内で作るのもおすすめ
