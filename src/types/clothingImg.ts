// 衣服画像の型
export type ClothingImageId = string;

// 利用可能な衣服画像マッピング
export type ClothingImageMap = Record<
  ClothingImageId,
  {
    path: string; // 画像パス
    name: string; // 表示名
  }
>;
