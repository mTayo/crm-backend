"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// src/utils/AppError.ts
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        // Needed for instanceof to work correctly
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
