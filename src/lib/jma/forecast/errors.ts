export class ForecastError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = "ForecastError";
  }
}
