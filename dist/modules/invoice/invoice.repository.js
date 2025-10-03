"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoicePayment = exports.findInoviceById = void 0;
const db_1 = __importDefault(require("../../config/db"));
const findInoviceById = (id) => {
    return db_1.default.invoice.findUnique({ where: { id },
        include: { payments: true, job: true }
    });
};
exports.findInoviceById = findInoviceById;
const createInvoicePayment = (invoiceId, amount) => {
    return db_1.default.payment.create({
        data: {
            invoiceId,
            amount,
        },
    });
};
exports.createInvoicePayment = createInvoicePayment;
