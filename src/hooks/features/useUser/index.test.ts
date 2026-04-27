import { act, renderHook, waitFor } from "@testing-library/react";

import { useUser } from "./index";

const mockGetUser = jest.fn();
const mockOnAuthStateChange = jest.fn();
const mockUnsubscribe = jest.fn();
const mockAuth = {
  getUser: mockGetUser,
  onAuthStateChange: mockOnAuthStateChange,
};

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: mockAuth,
  }),
}));

describe("useUser", () => {
  let authStateCallback:
    | ((event: string, session: { user: unknown } | null) => void)
    | undefined;

  beforeEach(() => {
    authStateCallback = undefined;
    mockGetUser.mockReset();
    mockOnAuthStateChange.mockReset();
    mockUnsubscribe.mockReset();
    mockGetUser.mockResolvedValue({
      data: {
        user: null,
      },
    });

    mockOnAuthStateChange.mockImplementation((callback) => {
      authStateCallback = callback;
      return {
        data: {
          subscription: {
            unsubscribe: mockUnsubscribe,
          },
        },
      };
    });
  });

  it("初回読み込みで現在のユーザーと loading 状態を更新できる", async () => {
    const currentUser = { id: "user-1", email: "parent@example.com" };
    mockGetUser.mockResolvedValue({
      data: {
        user: currentUser,
      },
    });

    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(currentUser);
  });

  it("認証状態変更時に user を更新できる", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: null,
      },
    });
    const { result } = renderHook(() => useUser());

    await waitFor(() => {
      expect(authStateCallback).toBeDefined();
    });

    act(() => {
      authStateCallback?.("SIGNED_IN", {
        user: { id: "user-2", email: "child@example.com" },
      });
    });

    expect(result.current.user).toEqual({
      id: "user-2",
      email: "child@example.com",
    });
  });

  it("アンマウント時に購読を解除できる", () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: null,
      },
    });
    const { unmount } = renderHook(() => useUser());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });
});
