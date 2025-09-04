export type ClothingCategory = "tops" | "bottoms" | "outer";

// 温度帯
export type TemperatureRange = {
  min: number; // -Infinity で下限なし
  max: number; // Infinity で上限なし
};

export type ClothingItem = {
  id: string;
  name: string;
  category: ClothingCategory;
  temperatureRange: TemperatureRange;
  imageUrl: string;
  isDefault: boolean; // デフォルトアイテムかどうかのフラグ
  userId?: string; // カスタムアイテムの場合のみ設定
};

// 服装推薦結果の型
export type AppropriateClothing = {
  tops: ClothingItem | null;
  bottoms: ClothingItem | null;
  outer: ClothingItem | null;
};
