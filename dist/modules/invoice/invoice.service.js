"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoicePayment = void 0;
const InvoiceRepository = __importStar(require("./invoice.repository"));
const JobService = __importStar(require("../job/job.service"));
const client_1 = require("@prisma/client");
const createInvoicePayment = async (data, invoiceId, userId) => {
    try {
        const invoice = await InvoiceRepository.findInoviceById(invoiceId);
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        const paidSoFar = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
        if (paidSoFar + data.amount > invoice.total) {
            throw new Error("Payment exceeds invoice total");
        }
        const payment = await InvoiceRepository.createInvoicePayment(invoiceId, data.amount);
        const newPaid = paidSoFar + data.amount;
        const remaining = invoice.total - newPaid;
        if (remaining === 0) {
            await JobService.updateJob({ id: invoice.jobId, status: client_1.JobStatus.PAID }, userId);
            return {
                payment,
                remainingBalance: remaining,
                status: remaining === 0 ? "PAID" : invoice.job.status,
            };
        }
        else {
            return { payment, remainingBalance: remaining, status: invoice.job.status };
        }
    }
    catch (err) {
        throw err;
    }
};
exports.createInvoicePayment = createInvoicePayment;
