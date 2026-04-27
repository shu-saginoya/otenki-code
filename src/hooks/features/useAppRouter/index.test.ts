import { renderHook, act } from "@testing-library/react";

import { useAppRouter } from "./index";

const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe("useAppRouter", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockBack.mockReset();
  });

  it("指定した画面キーから対応するパスへ遷移できる", () => {
    const { result } = renderHook(() => useAppRouter());

    act(() => {
      result.current.navigateTo("selectArea");
    });

    expect(mockPush).toHaveBeenCalledWith("/select-area");
  });

  it("ブラウザバックを実行できる", () => {
    const { result } = renderHook(() => useAppRouter());

    act(() => {
      result.current.goBack();
    });

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});