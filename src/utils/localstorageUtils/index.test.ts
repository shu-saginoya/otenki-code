import {
  StorageKey,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "./index";

describe("localstorageUtils", () => {
  // localStorageのモック
  const mockSetItem = jest.fn();
  const mockGetItem = jest.fn();
  const mockRemoveItem = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: mockSetItem,
        getItem: mockGetItem,
        removeItem: mockRemoveItem,
      },
      writable: true,
    });
  });

  beforeEach(() => {
    // 各テスト前にモックをリセット
    mockSetItem.mockClear();
    mockGetItem.mockClear();
    mockRemoveItem.mockClear();
  });

  describe("setLocalStorage", () => {
    it("正常に値を保存できること", () => {
      const testData = { test: "value" };
      setLocalStorage(StorageKey.AREA, testData);

      expect(mockSetItem).toHaveBeenCalledWith(
        StorageKey.AREA,
        JSON.stringify(testData)
      );
    });

    it("エラー時にコンソールエラーを出力すること", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockSetItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      setLocalStorage(StorageKey.AREA, { test: "value" });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("getLocalStorage", () => {
    it("保存された値を正常に取得できること", () => {
      const testData = { test: "value" };
      mockGetItem.mockReturnValue(JSON.stringify(testData));

      const result = getLocalStorage<{ test: string }>(StorageKey.AREA);
      expect(result).toEqual(testData);
    });

    it("値が存在しない場合はnullを返すこと", () => {
      mockGetItem.mockReturnValue(null);

      const result = getLocalStorage(StorageKey.AREA);
      expect(result).toBeNull();
    });

    it("不正なJSONの場合はnullを返しエラーを出力すること", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      mockGetItem.mockReturnValue("invalid json");

      const result = getLocalStorage(StorageKey.AREA);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("removeLocalStorage", () => {
    it("指定したキーの値を削除できること", () => {
      removeLocalStorage(StorageKey.AREA);
      expect(mockRemoveItem).toHaveBeenCalledWith(StorageKey.AREA);
    });
  });
});
