// キーをEnumで一元管理（必要に応じてプレフィックスを追加）
export enum StorageKey {
  AREA = "fukusobiyori_area",
  // 他のキーもここに追加
}

// 値をlocalStorageに設定する関数
export const setLocalStorage = <T>(key: StorageKey, value: T): void => {
  if (typeof window !== "undefined") {
    // クライアントサイドのみ実行
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error setting key ${key} in localStorage:`, error);
    }
  }
};

// 値をlocalStorageから取得する関数
export const getLocalStorage = <T>(key: StorageKey): T | null => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as T;
      } catch (error) {
        console.error(`Error parsing key ${key} from localStorage:`, error);
      }
    }
  }
  return null;
};

// 値をlocalStorageから削除する関数
export const removeLocalStorage = (key: StorageKey): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
