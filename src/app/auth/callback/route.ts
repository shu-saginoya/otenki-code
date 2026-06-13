/**
 * @file Supabase OAuthコールバックを処理するRoute Handler
 * @description
 * Googleなどのログイン後の戻り先を処理するルート。
 * 認証後に渡される code を受け取り、Supabaseのログイン状態に変換する。
 * 成功したらトップページへ、失敗したらログインページへ移動する。
 */

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${origin}/login`);
    }

    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.redirect(`${origin}/login`);
}
