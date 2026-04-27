import { renderHook, waitFor } from "@testing-library/react";

import { useAreaOptions } from "./index";

const mockFetchAreaData = jest.fn();

jest.mock("@/lib/jma", () => ({
  fetchAreaData: () => mockFetchAreaData(),
}));

describe("useAreaOptions", () => {
  beforeEach(() => {
    mockFetchAreaData.mockReset();
  });

  it("エリア情報の取得に成功した場合は結果を保持できる", async () => {
    const mockAreas = { centers: { "010000": { name: "北海道" } } };
    mockFetchAreaData.mockResolvedValueOnce({
      data: mockAreas,
      error: null,
    });

    const { result } = renderHook(() => useAreaOptions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.areas).toEqual(mockAreas);
    expect(result.current.error).toBeNull();
  });

  it("取得失敗時はエラーメッセージを保持できる", async () => {
    mockFetchAreaData.mockResolvedValueOnce({
      data: null,
      error: new Error("failed to fetch areas"),
    });

    const { result } = renderHook(() => useAreaOptions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.areas).toBeNull();
    expect(result.current.error).toBe("failed to fetch areas");
  });
});
