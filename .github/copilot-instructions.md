# AIエージェント向け指示

実装時は、仕様や設計の一次情報を [docs/README.md](../docs/README.md) から確認する。

プロジェクト全体の仕様は `docs/` 配下の文書を正とする。ここに書かない内容は、補足として扱う。

## 基本ルール

- 仕様判断に迷ったら、実装前に `docs/` を確認する
- 既存実装の有無で方針を変えない
- 同じ内容を複数ファイルに書かない
- 変更が仕様に影響する場合は、対応する文書を更新する

## 実装時の注意

- 画面の目的はシンプルさと速さを優先する
- 作業順は [docs/development-plan.md](../docs/development-plan.md) に従う
- コメントは簡潔に書く
- `localStorage` には直接アクセスしない
- `Redux` を通して状態を扱う
- 画像パスは `public/images/` を前提にする
- Tailwind のクラス結合は `cn()` を使う

## 実装の順番

1. 方針を [docs/development-plan.md](../docs/development-plan.md) と [docs/product-concept.md](../docs/product-concept.md) で確認する
2. 設計を [docs/system-design.md](../docs/system-design.md) と [docs/naming-guide.md](../docs/naming-guide.md) で確認する
3. 型定義 → データ層 → フック → UI の順で進める
4. lint / typecheck / test を実行する

## よくあるミス

- `@/components/ui` ではなく直接パスで参照しない
- `utils/` に React フックのロジックを置かない
- `hook` の必要な処理を `utils/` に寄せない
- JMA の構造を前提にせず、実データを確認する
- 画像名にアンダースコアを使わない
- `iconsUtils.ts` のような複数形ファイルを作らない

## 参照先

- [docs/README.md](../docs/README.md)
- [docs/development-plan.md](../docs/development-plan.md)
- [docs/product-concept.md](../docs/product-concept.md)
- [docs/system-design.md](../docs/system-design.md)
- [docs/naming-guide.md](../docs/naming-guide.md)
