
import prisma from "../../config/db";



export const createCustomer = (data: any) => {
  return prisma.customer.create({
    data,
  });
};
export const updateCustomer = (customerId:string,data: any) => {
  return prisma.customer.update({
    where: { id: customerId },
    data,
  });
};

export const findByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email }  });
};

export const findById = (id: string) => {
  return prisma.customer.findUnique(
    { where: { id },  
    include: {
      jobs: true,
    }, 
    });
};

