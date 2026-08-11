# AIコーディングエージェント向け指示書 - お天気コーデ (Otenki Code)

このファイルは、AIエージェントが実装時に守るべきルールを記載する。  
仕様や運用の詳細は重複記載せず、一次情報のドキュメントを参照する。

## 一次情報（必ず参照）

- 全体入口: [docs/README.md](../docs/README.md)
- 目的・条件: [docs/concept.md](../docs/concept.md)
- 開発計画: [docs/roadmap.md](../docs/roadmap.md)
- 地域選択仕様: [docs/area-selection.md](../docs/area-selection.md)
- 服装推薦仕様: [docs/clothing-specifications.md](../docs/clothing-specifications.md)
- 命名規則: [docs/naming-rule.md](../docs/naming-rule.md)
- ディレクトリ設計: [docs/components-design.md](../docs/components-design.md)
- 開発運用: [docs/CONTRIBUTING.md](../docs/CONTRIBUTING.md)

## 実装時の基本原則

- コアコンセプトは「シンプルさとスピード」。起動直後に必要情報へ到達できる体験を優先する
- 既存実装の有無で方針を変えず、作業優先度は [docs/roadmap.md](../docs/roadmap.md) に従う
- 同じ内容を複数ファイルへ重複して書かない
- 仕様判断に迷ったら、実装を先に進めず一次情報を確認する

## コメントについて

人間が見てもわかりやすいようにコメントを書く。

### ファイルの説明コメント

そのファイルの役割や責任範囲を冒頭で説明する

```ts
/**
 * @file ここにファイルの役割を簡潔に説明
 * @description
 * もし補足説明がある場合はここに記載
 */
```

### 関数の説明コメント

関数の目的、引数、返り値を説明する
なお、コンポーネントの場合`@returns JSX.Element`は省略してもよい

```ts
/**
 * ここに関数の目的や詳細な説明を記載
 *
 * @param param1 - ここに引数の説明を記載
 * @param param2 - ここに引数の説明を記載
 * @returns ここに返り値の説明を記載
 */
```

## 命名規則（`docs/naming-rule.md` 参照）

[docs/naming-rule.md](../docs/naming-rule.md)を参照。

## 地域選択の仕様について

[docs/area-selection.md](../docs/area-selection.md)を参照。

## 服装推薦の仕様について

[docs/clothing-specifications.md](../docs/clothing-specifications.md)を参照。

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

1. 方針確認: [docs/roadmap.md](../docs/roadmap.md) と [docs/concept.md](../docs/concept.md) を確認
2. 設計確認: [docs/components-design.md](../docs/components-design.md) と [docs/naming-rule.md](../docs/naming-rule.md) を確認
3. 実装: 型定義→データ層→フック→UIの順で進める
4. 検証: lint、typecheck、test を実行
5. 記録: 仕様変更がある場合は一次情報のdocsを更新

## よくある落とし穴

- ❌ `components/ui/buttons/Button/index.tsx` から直接インポートしない - `@/components/ui` を使用
- ❌ Tailwind クラスを手動で連結しない - 常に `cn()` を使用
- ❌ React フックが必要なビジネスロジックを `utils/` に配置しない - `hooks/` を使用
- ❌ JMA API 構造を仮定しない - 型が不完全な可能性あり、実行時データを検証
- ❌ 画像ファイル名にアンダースコアを使用しない - プロジェクトはハイフン使用
- ❌ 複数形の util ファイル（`iconsUtils.ts`）を作成しない - 単数形（`iconUtils.ts`）を使用

## リソース

- **ドキュメント入口**: [docs/README.md](../docs/README.md)
- **Tailwind 設定**: [tailwind.config.ts](../tailwind.config.ts)
- **パスエイリアス設定**: [tsconfig.json](../tsconfig.json)
