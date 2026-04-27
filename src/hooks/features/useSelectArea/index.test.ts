import { act, renderHook } from "@testing-library/react";

import { useSelectArea } from "./index";

const mockDispatch = jest.fn();
const mockUseAreaOptions = jest.fn();
const mockGenerateAreaOptions = jest.fn();
const mockGetSelectedAreaByClass20Code = jest.fn();
const mockSetSelectedArea = jest.fn();

jest.mock("@/hooks/features/useAreaOptions", () => ({
  useAreaOptions: () => mockUseAreaOptions(),
}));

jest.mock("@/lib/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock("@/lib/jma", () => ({
  generateAreaOptions: (...args: unknown[]) => mockGenerateAreaOptions(...args),
  getSelectedAreaByClass20Code: (...args: unknown[]) =>
    mockGetSelectedAreaByClass20Code(...args),
}));

jest.mock("@/lib/features/areas/areasSlice", () => ({
  setSelectedArea: (...args: unknown[]) => mockSetSelectedArea(...args),
}));

describe("useSelectArea", () => {
  const mockAreas = { offices: { "130000": { name: "東京" } } };
  const mockOptions = {
    centerOptions: { "010000": { name: "北海道" } },
    officeOptions: {},
    class10Options: {},
    class15Options: {},
    class20Options: {},
  };

  beforeEach(() => {
    mockDispatch.mockReset();
    mockUseAreaOptions.mockReset();
    mockGenerateAreaOptions.mockReset();
    mockGetSelectedAreaByClass20Code.mockReset();
    mockSetSelectedArea.mockReset();

    mockUseAreaOptions.mockReturnValue({
      areas: mockAreas,
      loading: false,
      error: null,
    });
    mockGenerateAreaOptions.mockReturnValue(mockOptions);
  });

  it("選択肢生成結果とステータスを返せる", () => {
    const { result } = renderHook(() => useSelectArea());

    expect(result.current.centerOptions).toEqual(mockOptions.centerOptions);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockGenerateAreaOptions).toHaveBeenCalledWith(mockAreas, {});
  });

  it("暫定選択を更新した内容で選択肢を再生成できる", () => {
    const { result } = renderHook(() => useSelectArea());

    act(() => {
      result.current.setProvisionalCenter("010000");
    });

    expect(mockGenerateAreaOptions).toHaveBeenLastCalledWith(mockAreas, {
      center: "010000",
    });
  });

  it("class20 の確定時に選択地域を dispatch できる", () => {
    const selectedArea = { office: { code: "130000", name: "東京" } };
    const dispatchedAction = {
      type: "areas/setSelectedArea",
      payload: selectedArea,
    };
    mockGetSelectedAreaByClass20Code.mockReturnValueOnce(selectedArea);
    mockSetSelectedArea.mockReturnValueOnce(dispatchedAction);

    const { result } = renderHook(() => useSelectArea());

    act(() => {
      result.current.selectClass20("1310100");
    });

    expect(mockGetSelectedAreaByClass20Code).toHaveBeenCalledWith(
      mockAreas,
      "1310100"
    );
    expect(mockSetSelectedArea).toHaveBeenCalledWith(selectedArea);
    expect(mockDispatch).toHaveBeenCalledWith(dispatchedAction);
  });
});
