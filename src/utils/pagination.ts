// src/utils/pagination.ts

import { Prisma } from "@prisma/client";
import prisma from "../config/db";


interface PaginateOptions<T> {
  model: keyof typeof prisma; // e.g. "user", "paymentProvider", etc.
  page?: number;
  limit?: number;
  where?: Prisma.UserWhereInput | any; // can be narrowed per model
  orderBy?: any;
  select?: any;
  include?: any;
}

export async function paginate<T>(options: PaginateOptions<T>) {
  const {
    model,
    page = 1,
    limit = 10,
    where,
    orderBy,
    select,
    include,
  } = options;

  const skip = (page - 1) * limit;

  const prismaModel = (prisma as any)[model]; // dynamic access to prisma model

  const [items, total] = await Promise.all([
    prismaModel.findMany({
      skip,
      take: limit,
      where,
      orderBy,
      select,
      include,
    }),
    prismaModel.count({ where }),
  ]);

  return {
    data: items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}
