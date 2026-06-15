/**
 * @file Next.jsのリクエスト前処理を一箇所で実行するための入口
 * @description
 * `middleware`はNext.jsの特殊ファイルで、`src`構成なら`src`直下に置く必要がある
 */

import { type NextRequest } from "next/server";

import { updateSession } from "./lib/supabase/middleware";

/**
 * すべての対象リクエストで Supabase セッションを更新する
 * @param request - Next.jsのリクエストオブジェクト
 * @returns 更新後のレスポンス
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// どのパスでmiddlewareを動かすかを制御する設定
// 静的ファイル・画像を除外して、API・ページリクエストのみ対象にする
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
