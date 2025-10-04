import * as AppointmentRepository from './appointment.repository';
import * as JobRepository from '../job/job.repository';
import { CreateAppointmentDto } from './appointment.dto';
import { JobStatus } from '@prisma/client';



export const createAppointment = async (data: CreateAppointmentDto, userId:string) => {
    try {
        const activeAppointment = await AppointmentRepository.getTechnicianActiveAppointment(data.technician);
        if (activeAppointment) {
            throw {
                status: 409,
                message: `Technician  is already assigned to job '${activeAppointment.job.title}' (${activeAppointment.job.status})`,
            };
        }
        const newAppointment = await AppointmentRepository.createAppointment(data);
        await JobRepository.updateJobById({id: newAppointment.jobId, status: JobStatus.SCHEDULED });
        await JobRepository.updateJobStatusHistory({
            jobId: newAppointment.jobId,
            status: JobStatus.NEW,
            newStatus: JobStatus.SCHEDULED,
            userId
        })
        return newAppointment;
    } catch (err) {
        throw err; 
    }
    
};

export const getAppointment = async (appointmentId: string ) => {
    try {
        const appointment = await AppointmentRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error('Appointment not found');
        }
        return appointment;
    } catch (err) {
        throw err; 
    }
    
};

export const getAllJobs = async (filters?: {  technicianId?: string }) => {
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
    } catch (err) {
        throw err; 
    }
};


export function hasScheduleConflict(existing: any[], candidate: any) {
  return existing.some(
    (appt) =>
      candidate.startTime < appt.endTime && candidate.endTime > appt.startTime
  );
}

