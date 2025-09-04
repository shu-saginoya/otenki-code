"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

import {
  getClothingItems,
  getAppropriateClothing,
  saveClothingItem,
  initializeDefaultClothingItems,
} from "@/services/clothing";
import { ClothingItem, AppropriateClothing } from "@/types/clothing";

export const useClothing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const user = useUser();

  // 初期化時にデータをロード
  useEffect(() => {
    const loadClothingItems = async () => {
      setIsLoading(true);

      // 初回実行時に必要に応じてデフォルトデータを初期化
      await initializeDefaultClothingItems();

      // ユーザーのカスタムアイテムとデフォルトアイテムを取得
      const items = await getClothingItems(user?.id);
      setClothingItems(items);
      setIsLoading(false);
    };

    loadClothingItems();
  }, [user?.id]);

  // 気温から服装を推薦
  const getAppropriate = (
    maxTemp: number,
    minTemp: number
  ): AppropriateClothing => {
    return getAppropriateClothing(clothingItems, maxTemp, minTemp);
  };

  // 服装アイテムを保存
  const saveItem = async (
    item: Omit<ClothingItem, "id">,
    itemId?: string
  ): Promise<ClothingItem | null> => {
    const savedItem = await saveClothingItem(item, itemId);

    if (savedItem) {
      // 保存成功した場合、ローカルの状態を更新
      setClothingItems((prevItems) => {
        const existingIndex = prevItems.findIndex((i) => i.id === savedItem.id);
        if (existingIndex >= 0) {
          // 既存アイテムを更新
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = savedItem;
          return updatedItems;
        } else {
          // 新しいアイテムを追加
          return [...prevItems, savedItem];
        }
      });
    }

    return savedItem;
  };

  return {
    isLoading,
    clothingItems,
    getAppropriate,
    saveItem,
  };
};
