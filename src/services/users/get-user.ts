import { fetcher } from "utils";

import type { ApiContext, User } from "types/data";

export type GetUserParams = {
  /**
   * ユーザーID
   */
  id: number;
};

/**
 * ユーザーAPI(個別取得)
 * @param context API コンテキスト
 * @param params パラメータ
 * @returns ユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  /**
  // ユーザーAPI
  // サンプルレスポンス
  {
    "id": "1",
    "username": "taketo",
    "displayName": "Taketo Yoshida",
    "email": "taketo@example.com",
    "profileImageUrl": "/users/1.png",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  }
  */
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, "")}/users/${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export default getUser;
