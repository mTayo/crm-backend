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
exports.getAllJobs = exports.getAppointment = exports.createAppointment = void 0;
const AppointmentRepository = __importStar(require("./appointment.repository"));
const JobRepository = __importStar(require("../job/job.repository"));
const client_1 = require("@prisma/client");
const createAppointment = async (data, userId) => {
    try {
        const activeAppointment = await AppointmentRepository.getTechnicianActiveAppointment(data.technician);
        if (activeAppointment) {
            throw {
                status: 409,
                message: `Technician  is already assigned to job '${activeAppointment.job.title}' (${activeAppointment.job.status})`,
            };
        }
        const newAppointment = await AppointmentRepository.createAppointment(data);
        JobRepository.updateJobById({ id: newAppointment.jobId, status: client_1.JobStatus.SCHEDULED });
        JobRepository.updateJobStatusHistory({
            jobId: newAppointment.jobId,
            status: client_1.JobStatus.NEW,
            newStatus: client_1.JobStatus.SCHEDULED,
            userId
        });
        return newAppointment;
    }
    catch (err) {
        throw err;
    }
};
exports.createAppointment = createAppointment;
const getAppointment = async (appointmentId) => {
    try {
        const appointment = await AppointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        return appointment;
    }
    catch (err) {
        throw err;
    }
};
exports.getAppointment = getAppointment;
const getAllJobs = async (filters) => {
    try {
        const parsedFilters = filters
            ? {
                ...filters.technicianId && { technicianId: filters.technicianId?.toString() },
            }
            : undefined;
        const findAllJobs = await AppointmentRepository.findAll(parsedFilters);
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
