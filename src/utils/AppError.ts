export class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";

  constructor(
    statusCode: number,
    message: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status =
      statusCode >= 400 && statusCode < 500
        ? "fail"
        : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}