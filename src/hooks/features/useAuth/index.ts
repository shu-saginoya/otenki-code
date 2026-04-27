"use client";
import { useState } from "react";

import { useAppRouter } from "@/hooks/features/useAppRouter";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const supabase = createClient();
  const { navigateTo } = useAppRouter();

  // ユーザー情報の状態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // メールアドレスでログイン
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("ログインに失敗しました: " + error.message);
    } else {
      navigateTo("home");
    }
  };

  // メールアドレスで新規登録
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("登録に失敗しました: " + error.message);
    } else {
      setMessage(
        "確認メールを送信しました。メールのリンクをクリックして登録を完了してください。"
      );
    }
  };

  // Googleでログイン
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Googleログインに失敗しました: " + error.message);
    }
  };

  // ログアウト
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage("ログアウトに失敗しました: " + error.message);
    } else {
      navigateTo("home");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleEmailLogin,
    handleEmailSignup,
    handleGoogleLogin,
    handleLogout,
  };
}
