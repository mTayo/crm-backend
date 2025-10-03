// src/types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";
import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: (PrismaUser | (JwtPayload & {
        id: string;
        email: string;
        is_admin?: boolean;
        role?: string;
      }));
    }
  }
}
