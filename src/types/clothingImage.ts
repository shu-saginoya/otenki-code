/**
 * @file 衣服の画像（アイコン）を管理するための型定義
 */

// 衣服画像の型
export type ClothingImageId = string;

// 衣服画像本体
export type ClothingImage = {
  path: string; // 画像パス
  name: string; // 表示名
};

// 利用可能な衣服画像マッピング
export type ClothingImageMap = Record<ClothingImageId, ClothingImage>;
