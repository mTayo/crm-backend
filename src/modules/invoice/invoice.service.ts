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

        const paidSoFar = invoice.payments.reduce((sum:any, p: any) => sum + p.amount, 0);

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


export function calculateInvoiceTotal(
  lineItems: { quantity: number; unitPrice: number }[],
  taxRate: number
) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}


export function applyPayment(invoice: any, amount: number) {
  const totalPaid = invoice.payments.reduce((sum: number, p: any) => sum + p.amount, 0);
  const remaining = invoice.total - totalPaid;

  if (amount > remaining) throw new Error('Payment exceeds remaining balance');

  return { remaining: remaining - amount };
}