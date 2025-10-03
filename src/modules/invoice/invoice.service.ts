import { CreateInvoicePaymentDto } from './invoice.dto';
import * as InvoiceRepository from './invoice.repository';
import * as JobService from '../job/job.service';
import { JobStatus } from '@prisma/client';



export const createInvoicePayment = async (data:  CreateInvoicePaymentDto, invoiceId: string, userId:string) => {
    try {

        const invoice = await InvoiceRepository.findInoviceById(invoiceId);

        if (!invoice){
            throw new Error('Invoice not found');
        }

        const paidSoFar = invoice.payments.reduce((sum, p) => sum + p.amount, 0);

        if (paidSoFar + data.amount > invoice.total) {
          throw new Error("Payment exceeds invoice total" );
        }

        const payment = await InvoiceRepository.createInvoicePayment(invoiceId, data.amount); 

        const newPaid = paidSoFar + data.amount;
        const remaining = invoice.total - newPaid;

    
        if (remaining === 0) {

          await JobService.updateJob({id: invoice.jobId, status:JobStatus.PAID}, userId)

        return {
          payment,
          remainingBalance: remaining,
          status: remaining === 0 ? "PAID" : invoice.job.status,
        };
      }else{
        return { payment, remainingBalance: remaining, status: invoice.job.status}
      } 
    }catch (err) {
      throw err;
    }
    
};



