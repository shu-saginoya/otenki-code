// 服装のカテゴリ
export type ClothingCategory = "tops" | "bottoms" | "outer";

// 温度帯
export type TemperatureRange = {
  min: number; // -Infinity で下限なし
  max: number; // Infinity で上限なし
};

// 衣服画像の型
export type ClothingImageId = string;

// 服装アイテムの型
export type ClothingItem = {
  id: string;
  name: string;
  category: ClothingCategory;
  temperatureRange: TemperatureRange;
  imageId: ClothingImageId;
  isDefault: boolean; // デフォルトアイテムかどうかのフラグ
  userId?: string; // カスタムアイテムの場合のみ設定
};

// 利用可能な衣服画像マッピング
export type ClothingImageMap = Record<
  ClothingImageId,
  {
    path: string; // 画像パス
    name: string; // 表示名
    category: ClothingCategory; // この画像が適用できるカテゴリ
  }
>;

// 服装推薦結果の型
export type AppropriateClothing = {
  tops: ClothingItem | null;
  bottoms: ClothingItem | null;
  outer: ClothingItem | null;
};
