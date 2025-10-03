
import prisma from "../../config/db";
import { CreateAppointmentDto } from "./appointment.dto";



export const createAppointment = (data: CreateAppointmentDto ) => {
  return prisma.appointment.create({
    data,
  });
};

export const getTechnicianActiveAppointment = (technicianId: string) => {
  return prisma.appointment.findFirst({
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
}

export const updateJob = (jobId:string,data: any) => {
  return prisma.job.update({
    where: { id: jobId },
    data,
  });
};

export const findById = (id: string) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      job: {
        include: {
          invoice: {
            include:{
              payments: true,
            }
          },
          customer: true,
        },
      }
    },
  });
};



export const findAll = (filters?: { technicianId?: string }) => {
  return prisma.appointment.findMany({
    where: {
      ...filters?.technicianId && { technician: filters.technicianId?.toString() },
    },
    include: {
      job: true,
    },
  });
}