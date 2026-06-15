/**
 * @file 予報関連処理で利用するカスタムエラーを定義するモジュール
 */
export class ForecastError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = "ForecastError";
  }
}
