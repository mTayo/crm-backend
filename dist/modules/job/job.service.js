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
exports.createInvoice = exports.getAllJobs = exports.getJob = exports.updateJob = exports.createJob = void 0;
const JobRepository = __importStar(require("./job.repository"));
const client_1 = require("@prisma/client");
const createJob = async (data) => {
    try {
        const newJob = await JobRepository.createJob(data);
        return newJob;
    }
    catch (err) {
        throw err;
    }
};
exports.createJob = createJob;
const updateJob = async (data, userId) => {
    try {
        const findJob = await JobRepository.findById(data.id);
        if (!findJob) {
            throw new Error('Job not found');
        }
        if (data.status === client_1.JobStatus.DONE && !findJob.appointment) {
            throw { status: 409, message: "Cannot mark job as Done without appointment" };
        }
        const newJob = await JobRepository.updateJobById(data);
        JobRepository.updateJobStatusHistory({
            jobId: data.id,
            status: findJob.status,
            newStatus: data.status,
            userId
        });
        return newJob;
    }
    catch (err) {
        throw err;
    }
};
exports.updateJob = updateJob;
const getJob = async (jobId) => {
    try {
        const findJob = await JobRepository.findById(jobId);
        if (!findJob) {
            throw new Error('Job not found');
        }
        return findJob;
    }
    catch (err) {
        throw err;
    }
};
exports.getJob = getJob;
const getAllJobs = async (filters) => {
    try {
        const parsedFilters = filters
            ? {
                ...filters,
                customerId: filters.customerId ? String(filters.customerId) : undefined,
            }
            : undefined;
        const findAllJobs = await JobRepository.findAll(parsedFilters);
        if (!findAllJobs) {
            throw new Error('Job not found');
        }
        return findAllJobs;
    }
    catch (err) {
        throw err;
    }
};
exports.getAllJobs = getAllJobs;
const createInvoice = async (lineItems, jobId, userId) => {
    try {
        const findJob = await JobRepository.findById(jobId);
        if (!findJob) {
            throw new Error('Job not found');
        }
        if (findJob.status !== client_1.JobStatus.DONE) {
            throw { status: 409, message: "Invoice can only be generated after job is Done" };
        }
        const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const tax = subtotal * 0.1; // example: 10% VAT
        const total = subtotal + tax;
        const invoice = await JobRepository.createInvoice({
            jobId,
            subtotal,
            tax,
            total,
            lineItems
        });
        await (0, exports.updateJob)({ id: jobId, status: client_1.JobStatus.INVOICED }, userId);
        return invoice;
    }
    catch (error) {
        throw error;
    }
};
exports.createInvoice = createInvoice;
