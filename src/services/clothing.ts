import { defaultClothingItems } from "@/data/defaultClothing";
import { supabase } from "@/lib/supabase/client";
import { ClothingItem, ClothingCategory } from "@/types";

export const getClothingItems = async (
  userId?: string
): Promise<ClothingItem[]> => {
  // デフォルトアイテムを取得
  const { data: defaultItems, error: defaultError } = await supabase
    .from("clothing_items")
    .select("*")
    .eq("is_default", true);

  if (defaultError) {
    console.error("Default clothing items fetch error:", defaultError);
    return [];
  }

  // データベースのフィールド名をTypeScriptの型に合わせる
  const formattedDefaultItems = (defaultItems || []).map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    temperatureRange: item.temperature_range,
    imageUrl: item.image_url,
    isDefault: item.is_default,
    userId: item.user_id,
  }));

  // ユーザーIDが提供されている場合、ユーザーのカスタムアイテムも取得
  if (userId) {
    const { data: userItems, error: userError } = await supabase
      .from("clothing_items")
      .select("*")
      .eq("user_id", userId)
      .eq("is_default", false);

    if (userError) {
      console.error("User clothing items fetch error:", userError);
      return formattedDefaultItems;
    }

    // ユーザーアイテムをフォーマット
    const formattedUserItems = (userItems || []).map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      temperatureRange: item.temperature_range,
      imageUrl: item.image_url,
      isDefault: item.is_default,
      userId: item.user_id,
    }));

    // ユーザーアイテムとデフォルトアイテムをマージ（同じカテゴリと温度帯のアイテムはユーザーアイテムを優先）
    return mergeClothingItems(formattedDefaultItems, formattedUserItems);
  }

  return formattedDefaultItems;
};

// ユーザーアイテムを優先してマージする関数
const mergeClothingItems = (
  defaultItems: ClothingItem[],
  userItems: ClothingItem[]
): ClothingItem[] => {
  const result = [...defaultItems];

  // ユーザーアイテムをループして、同じカテゴリと温度帯のデフォルトアイテムを置き換え
  userItems.forEach((userItem) => {
    const defaultItemIndex = result.findIndex(
      (item) =>
        item.category === userItem.category &&
        item.temperatureRange &&
        userItem.temperatureRange &&
        item.temperatureRange.min === userItem.temperatureRange.min &&
        item.temperatureRange.max === userItem.temperatureRange.max
    );

    if (defaultItemIndex !== -1) {
      // 既存のアイテムを置き換え
      result[defaultItemIndex] = userItem;
    } else {
      // 新しいアイテムを追加
      result.push(userItem);
    }
  });

  return result;
};

// 新しい服装アイテムを追加または更新
export const saveClothingItem = async (
  item: Omit<ClothingItem, "id">,
  itemId?: string
): Promise<ClothingItem | null> => {
  const { data, error } = itemId
    ? await supabase
        .from("clothing_items")
        .update({
          name: item.name,
          category: item.category,
          temperature_range: item.temperatureRange,
          image_url: item.imageUrl,
          is_default: item.isDefault,
          user_id: item.userId,
        })
        .eq("id", itemId)
        .select()
        .single()
    : await supabase
        .from("clothing_items")
        .insert({
          name: item.name,
          category: item.category,
          temperature_range: item.temperatureRange,
          image_url: item.imageUrl,
          is_default: item.isDefault,
          user_id: item.userId,
        })
        .select()
        .single();

  if (error) {
    console.error("Save clothing item error:", error);
    return null;
  }

  return data as unknown as ClothingItem;
};

// 気温から適切な服装を取得
export const getAppropriateClothing = (
  items: ClothingItem[],
  maxTemperature: number,
  minTemperature: number
) => {
  // トップスとボトムスは最高気温をもとに選択
  const tops = findItemForTemperature(items, "tops", maxTemperature);
  const bottoms = findItemForTemperature(items, "bottoms", maxTemperature);

  // アウターは最低気温をもとに選択
  // 後で朝夕の予想気温をもとに選択するように修正する
  const outer = findItemForTemperature(items, "outer", minTemperature);

  return { tops, bottoms, outer };
};

// 指定されたカテゴリーと温度に合う服装アイテムを見つける
const findItemForTemperature = (
  items: ClothingItem[],
  category: ClothingCategory,
  temperature: number
): ClothingItem | null => {
  return (
    items.find(
      (item) =>
        item.category === category &&
        item.temperatureRange &&
        temperature >= item.temperatureRange.min &&
        temperature <= item.temperatureRange.max
    ) || null
  );
};

// データベースに初期データを登録（マイグレーション用）
export const initializeDefaultClothingItems = async () => {
  const { data, error } = await supabase
    .from("clothing_items")
    .select("id")
    .eq("is_default", true);

  // デフォルトアイテムがまだ存在しない場合のみ挿入
  if (!error && (!data || data.length === 0)) {
    const items = defaultClothingItems.map((item) => ({
      name: item.name,
      category: item.category,
      temperature_range: item.temperatureRange,
      image_url: item.imageUrl,
      is_default: true,
    }));

    const { error: insertError } = await supabase
      .from("clothing_items")
      .insert(items);

    if (insertError) {
      console.error("Initialize default clothing items error:", insertError);
    }
  }
};
