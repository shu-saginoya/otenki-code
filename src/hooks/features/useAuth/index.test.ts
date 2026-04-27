import { act, renderHook, waitFor } from "@testing-library/react";

import { useAuth } from "./index";

const mockNavigateTo = jest.fn();
const mockSignInWithPassword = jest.fn();
const mockSignUp = jest.fn();
const mockSignInWithOAuth = jest.fn();
const mockSignOut = jest.fn();

jest.mock("@/hooks/features/useAppRouter", () => ({
  useAppRouter: () => ({
    navigateTo: mockNavigateTo,
  }),
}));

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signInWithOAuth: mockSignInWithOAuth,
      signOut: mockSignOut,
    },
  }),
}));

describe("useAuth", () => {
  const mockEvent = {
    preventDefault: jest.fn(),
  } as unknown as React.FormEvent;

  beforeEach(() => {
    mockNavigateTo.mockReset();
    mockSignInWithPassword.mockReset();
    mockSignUp.mockReset();
    mockSignInWithOAuth.mockReset();
    mockSignOut.mockReset();
    mockEvent.preventDefault = jest.fn();
  });

  it("メールログイン成功時はホームへ遷移できる", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setEmail("parent@example.com");
      result.current.setPassword("secret");
    });

    await act(async () => {
      await result.current.handleEmailLogin(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "parent@example.com",
      password: "secret",
    });
    expect(mockNavigateTo).toHaveBeenCalledWith("home");
  });

  it("新規登録成功時は確認メッセージを保持できる", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setEmail("parent@example.com");
      result.current.setPassword("secret");
    });

    await act(async () => {
      await result.current.handleEmailSignup(mockEvent);
    });

    await waitFor(() => {
      expect(result.current.message).toContain("確認メールを送信しました");
    });
  });

  it("Googleログイン失敗時はエラーメッセージを保持できる", async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({
      error: new Error("oauth failed"),
    });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleGoogleLogin();
    });

    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    expect(result.current.message).toBe(
      "Googleログインに失敗しました: oauth failed"
    );
  });

  it("ログアウト成功時はホームへ遷移できる", async () => {
    mockSignOut.mockResolvedValueOnce({ error: null });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogout();
    });

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockNavigateTo).toHaveBeenCalledWith("home");
  });
});
