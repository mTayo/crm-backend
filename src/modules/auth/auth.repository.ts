
import prisma from "../../config/db";



export const updateUser = (userId:string,data: any) => {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
};
export const findByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email }  });
};

export const findById = (id: string) => {
  return prisma.user.findUnique(
    { where: { id },  
    
    });
};

