"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.sendConfirmationEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendConfirmationEmail = async (email, token) => {
    const link = `${process.env.FRONT_END_URL}/auth/confirm-email?token=${token}`;
    await exports.transporter.sendMail({
        from: `"Muno migration" <${process.env.EMAIL_USER || 'Muno migration'}>`,
        to: email,
        subject: 'Confirm Your Email',
        html: `<p>Click the link to confirm: <a href="${link}">${link}</a></p>`,
    });
};
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendResetPasswordEmail = async (email, token) => {
    const link = `${process.env.FRONT_END_URL}/auth/change-password?token=${token}`;
    await exports.transporter.sendMail({
        from: `"Muno migration" <${process.env.EMAIL_USER || 'Muno migration'}>`,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click the link to reset your password: <a href="${link}">${link}</a></p> This link expires in 15 minutes.`,
    });
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
