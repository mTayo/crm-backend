
import Stripe from "stripe";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET =  process.env.GOOGLE_CLIENT_SECRET
export const FRONT_END_SUCCESS_REDIRECT_URI = process.env.FRONT_END_AUTH_SUCCESS_REDIRECT_URI;
export const GOOGLE_REDIRECT_URI = `${process.env.APP_URL}/api/auth/google/callback`;
export const APP_URL = process.env.APP_URL;
export const FRONT_END_URL = process.env.FRONT_END_URL;



// payment
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
export const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });
export const STRIPE_WEBHOOK_SECRET_KEY = process.env.STRIPE_WEBHOOK_SECRET;
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY|| '');
