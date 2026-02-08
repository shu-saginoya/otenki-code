"use client";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const supabase = createClient();

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
    }
  };

  // メールアドレスで新規登録
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("登録試行:", { email, passwordLength: password.length });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("登録エラー:", error);
      setMessage("登録に失敗しました: " + error.message);
    } else {
      console.log("登録成功:", data);
      setMessage("登録が完了しました！ログインできます。");
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleEmailLogin,
    handleEmailSignup,
    handleGoogleLogin,
  };
}
