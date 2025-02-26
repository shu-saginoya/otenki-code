/**
 * 指定されたリソースからデータを取得し、JSONオブジェクトとして返す
 *
 * @template T - 期待される応答データの型
 * @param {RequestInfo} resource - フェッチしたいリソース
 * @param {RequestInit} [init] - リクエストに適用したいカスタム設定を含むオプションのオブジェクト
 * @returns {Promise<T>} JSON形式のレスポンスデータを解決するプロミス
 * @throws {Error} レスポンスが正常でない場合にエラーをスローする
 */
export const fetcher = async <T>(
  resource: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const res = await fetch(resource, init);

  if (!res.ok) {
    const errorRes = await res.json();
    const errorMessage =
      errorRes?.message || "APIリクエスト中にエラーが発生しました";
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
};
