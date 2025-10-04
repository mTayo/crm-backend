
import prisma from "../../config/db";
import { CreateJobDto, UpdateJobDto } from "./job.dto";
import { JobStatus } from "@prisma/client";


export const createJob = (data: CreateJobDto) => {
  return prisma.job.create({
    data,
  });
};

export const findById = (id: string) => {
  return prisma.job.findUnique({
    where: { id },
    include: {
      invoice: {
        include: {
          payments: true,
          lineItems: true,
        },
      },
      history: true,
      customer: true,
      appointment:{ 
        include: {
           technicianData: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }
    },
  });
};

export const findJobById = (id: string) => {
  return prisma.job.findUnique({
    where: { id },
    include: {
      appointment:true,
    },
  });
};
export const updateJobById = (data: UpdateJobDto) => {
  return prisma.job.update({
    where: { id: data.id },
    data: { status: data.status as JobStatus },
  });
};


export const findAll = (filters?: { status?: JobStatus; customerId?: string }) => {
  return prisma.job.findMany({
    where: {
      ...(filters?.status && { status: filters.status }),
      ...(filters?.customerId && { customerId: filters.customerId?.toString() }),
    },
    include: {
      invoice: {
        include: {
          payments: true,
          lineItems: true,
        },
      },
      customer: true,
      // appointment: true,
    },
  });
}

export const createInvoice = async ({
  jobId,
  subtotal,
  tax,
  total,
  lineItems
}: any) => {
  await prisma.invoice.create({
    data: {
      jobId,
      subtotal,
      tax,
      total,
      lineItems: {
        create: lineItems.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.quantity * item.unitPrice,
        })),
      },
    },
    include: { lineItems: true },
  });
}

export const updateJobStatusHistory = (data: any) => {
  return prisma.jobStatusHistory.create({
      data: {
        jobId: data.jobId,
        oldStatus: data.status,
        newStatus: data.newStatus,
        changedBy: data.userId, 
      },
    });
};
