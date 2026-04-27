import { renderHook, waitFor } from "@testing-library/react";

import { useJmaForecast } from "./index";

const mockUseSelector = jest.fn();
const mockFetchForecast = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: (selector: (state: unknown) => unknown) =>
    mockUseSelector(selector),
}));

jest.mock("@/lib/jma", () => ({
  fetchForecast: (...args: unknown[]) => mockFetchForecast(...args),
}));

describe("useJmaForecast", () => {
  const stateWithoutOffice = { areas: { selectedArea: {} } };
  const stateWithOffice = {
    areas: {
      selectedArea: {
        office: { code: "130000", name: "東京" },
      },
    },
  };

  beforeEach(() => {
    mockUseSelector.mockReset();
    mockFetchForecast.mockReset();
  });

  it("選択地域に office がない場合は予報取得を実行しない", () => {
    mockUseSelector.mockImplementation((selector) =>
      selector(stateWithoutOffice)
    );

    const { result } = renderHook(() => useJmaForecast());

    expect(mockFetchForecast).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.forecast).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("予報取得に成功した場合は forecast を保持できる", async () => {
    const mockForecast = [{ publishingOffice: "東京" }] as unknown;
    mockUseSelector.mockImplementation((selector) => selector(stateWithOffice));
    mockFetchForecast.mockResolvedValueOnce(mockForecast);

    const { result } = renderHook(() => useJmaForecast());

    await waitFor(() => {
      expect(result.current.forecast).toBe(mockForecast);
    });

    expect(mockFetchForecast).toHaveBeenCalledWith("130000");
    expect(result.current.forecast).toBe(mockForecast);
    expect(result.current.error).toBeNull();
  });

  it("予報取得に失敗した場合は error を保持できる", async () => {
    mockUseSelector.mockImplementation((selector) => selector(stateWithOffice));
    mockFetchForecast.mockRejectedValueOnce(new Error("fetch failed"));

    const { result } = renderHook(() => useJmaForecast());

    await waitFor(() => {
      expect(result.current.error?.message).toBe("fetch failed");
    });

    expect(result.current.forecast).toBeNull();
    expect(result.current.error?.message).toBe("fetch failed");
  });
});
