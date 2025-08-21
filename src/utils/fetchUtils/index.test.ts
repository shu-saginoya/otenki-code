import { fetcher } from "./index";

describe("fetcher", () => {
  // テスト前にfetchをモック化
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    // 各テスト前にモックをリセット
    mockFetch.mockReset();
  });

  it("正常なレスポンスを正しく処理できること", async () => {
    const mockData = { id: 1, name: "test" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetcher("/api/test");
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith("/api/test", undefined);
  });

  it("カスタムオプションでリクエストできること", async () => {
    const mockData = { id: 1, name: "test" };
    const customInit = { method: "POST" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    await fetcher("/api/test", customInit);
    expect(mockFetch).toHaveBeenCalledWith("/api/test", customInit);
  });

  it("エラーレスポンスを適切に処理できること", async () => {
    const errorMessage = "Custom error message";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage }),
    });

    await expect(fetcher("/api/test")).rejects.toThrow(errorMessage);
  });

  it("エラーメッセージがない場合のデフォルトエラーを表示できること", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });

    await expect(fetcher("/api/test")).rejects.toThrow(
      "APIリクエスト中にエラーが発生しました"
    );
  });
});
