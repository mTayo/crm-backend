"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_WEBHOOK_SECRET_KEY = exports.stripe = exports.PAYSTACK_PUBLIC_KEY = exports.PAYSTACK_SECRET_KEY = exports.FRONT_END_URL = exports.APP_URL = exports.GOOGLE_REDIRECT_URI = exports.FRONT_END_SUCCESS_REDIRECT_URI = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = void 0;
const stripe_1 = __importDefault(require("stripe"));
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.FRONT_END_SUCCESS_REDIRECT_URI = process.env.FRONT_END_AUTH_SUCCESS_REDIRECT_URI;
exports.GOOGLE_REDIRECT_URI = `${process.env.APP_URL}/api/auth/google/callback`;
exports.APP_URL = process.env.APP_URL;
exports.FRONT_END_URL = process.env.FRONT_END_URL;
// payment
exports.PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
exports.PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-08-27.basil" });
exports.STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET;
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY|| '');
