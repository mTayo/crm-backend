// src/middlewares/notFound.ts
import { Request, Response, NextFunction } from 'express';
import { ResponseManager } from '../utils/responseManager';


export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return ResponseManager.error('Route not found');
};
