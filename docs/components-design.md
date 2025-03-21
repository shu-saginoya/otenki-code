# コンポーネント設計書

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
