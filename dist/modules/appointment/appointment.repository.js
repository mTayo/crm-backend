"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.findById = exports.updateJob = exports.getTechnicianActiveAppointment = exports.createAppointment = void 0;
const db_1 = __importDefault(require("../../config/db"));
const createAppointment = (data) => {
    return db_1.default.appointment.create({
        data,
    });
};
exports.createAppointment = createAppointment;
const getTechnicianActiveAppointment = (technicianId) => {
    return db_1.default.appointment.findFirst({
        where: {
            technician: technicianId,
            job: {
                status: {
                    notIn: ["DONE", "INVOICED", "PAID"], // technician still working
                },
            },
        },
        include: {
            job: true,
        },
    });
};
exports.getTechnicianActiveAppointment = getTechnicianActiveAppointment;
const updateJob = (jobId, data) => {
    return db_1.default.job.update({
        where: { id: jobId },
        data,
    });
};
exports.updateJob = updateJob;
const findById = (id) => {
    return db_1.default.appointment.findUnique({
        where: { id },
        include: {
            job: {
                include: {
                    invoice: {
                        include: {
                            payments: true,
                        }
                    },
                    customer: true,
                },
            }
        },
    });
};
exports.findById = findById;
const findAll = (filters) => {
    return db_1.default.appointment.findMany({
        where: {
            ...filters?.technicianId && { technician: filters.technicianId?.toString() },
        },
        include: {
            job: true,
        },
    });
};
exports.findAll = findAll;
