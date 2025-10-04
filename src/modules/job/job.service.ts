import * as JobRepository from './job.repository';
import { CreateJobDto, UpdateJobDto } from './job.dto';
import { JobStatus } from '@prisma/client';


export const createJob = async (data:  CreateJobDto) => {
    try {
        const newJob = await JobRepository.createJob(data);
        return newJob;
    } catch (err) {
        throw err; 
    }
    
};

export const updateJob = async (data:  UpdateJobDto, userId:string) => {
    try {
        const findJob = await JobRepository.findJobById(data.id);
        if (!findJob) {
            throw new Error('Job not found');
        }
        if (data.status === JobStatus.DONE && !findJob.appointment) {
            throw { status: 409, message: "Cannot mark job as Done without appointment" };
        }
        const newJob = await JobRepository.updateJobById(data);
        await JobRepository.updateJobStatusHistory({
            jobId: data.id,
            status: findJob.status,
            newStatus: data.status,
            userId
        })
        return newJob;
    } catch (err) {
        throw err; 
    }
    
};

export const getJob = async (jobId: string ) => {
    try {
        const findJob = await JobRepository.findById(jobId);
        if (!findJob) {
            throw new Error('Job not found');
        }
        return findJob;
    } catch (err) {
        throw err; 
    }
    
};

export const getAllJobs = async (filters?: { status?: JobStatus; customerId?: string }) => {
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
    } catch (err) {
        throw err; 
    }
};

export const createInvoice = async (lineItems: { description: string; quantity: number; unitPrice: number }[], jobId: string, userId:string) => {
    try {
      
        const findJob = await JobRepository.findById(jobId);
        if (!findJob) {
            throw new Error('Job not found');
        }
        if (findJob.status !== JobStatus.DONE) {
            throw { status: 409, message: "Invoice can only be generated after job is Done" };
        }
    
        const subtotal = lineItems.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0
        );
        const tax = subtotal * 0.1; // example: 10% VAT
        const total = subtotal + tax;
        const invoice = await JobRepository.createInvoice({
            jobId,
            subtotal,
            tax,
            total,
            lineItems
        });

        await updateJob({id: jobId, status: JobStatus.INVOICED}, userId);
        return invoice
    } catch (error) {
        throw error; 
    }
    
}


