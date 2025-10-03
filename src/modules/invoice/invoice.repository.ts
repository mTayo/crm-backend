
import prisma from "../../config/db";



export const findInoviceById = (id: string) => {
  return prisma.invoice.findUnique(
    { where: { id },  
    include: { payments: true, job: true }
  });
};

export const createInvoicePayment = (invoiceId: string, amount: number) => {
  return prisma.payment.create({
      data: {
        invoiceId,
        amount,
      },
    });

};

