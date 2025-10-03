"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJobStatusHistory = exports.createInvoice = exports.findAll = exports.updateJobById = exports.findById = exports.createJob = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createJob = (data) => {
    return db_1.default.job.create({
        data,
    });
};
exports.createJob = createJob;
const findById = (id) => {
    return db_1.default.job.findUnique({
        where: { id },
        include: {
            invoice: {
                include: {
                    payments: true,
                },
            },
            customer: true,
            appointment: true,
        },
    });
};
exports.findById = findById;
const updateJobById = (data) => {
    return db_1.default.job.update({
        where: { id: data.id },
        data: { status: data.status },
    });
};
exports.updateJobById = updateJobById;
const findAll = (filters) => {
    return db_1.default.job.findMany({
        where: {
            ...(filters?.status && { status: filters.status }),
            ...(filters?.customerId && { customerId: filters.customerId?.toString() }),
        },
        include: {
            invoice: true,
            customer: true,
            appointment: true,
        },
    });
};
exports.findAll = findAll;
const createInvoice = async ({ jobId, subtotal, tax, total, lineItems }) => {
    await db_1.default.invoice.create({
        data: {
            jobId,
            subtotal,
            tax,
            total,
            lineItems: {
                create: lineItems.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    lineTotal: item.quantity * item.unitPrice,
                })),
            },
        },
        include: { lineItems: true },
    });
};
exports.createInvoice = createInvoice;
const updateJobStatusHistory = (data) => {
    return db_1.default.jobStatusHistory.create({
        data: {
            jobId: data.jobId,
            oldStatus: data.status,
            newStatus: data.newStatus,
            changedBy: data.userId,
        },
    });
};
exports.updateJobStatusHistory = updateJobStatusHistory;
