// src/utils/AppError.ts
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;

    // Needed for instanceof to work correctly
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
