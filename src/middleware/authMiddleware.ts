import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseManager } from '../utils/responseManager';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ResponseManager.error('Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: string };
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return ResponseManager.error('Unauthorized: Invalid token');
  }
};


export function authorizeAdmin(req: Request, res:Response, next: NextFunction) {
  if (!req.user) {
    return ResponseManager.error('Unauthorized');
  }

  // if (!req?.user?.is_admin) {
  //   return ResponseManager.error('Forbidden');
  // }

  next();
}
