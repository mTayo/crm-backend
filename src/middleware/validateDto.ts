import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ResponseManager } from '../utils/responseManager';
import { formatValidationError } from '../utils';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObj);
    if (errors.length > 0) {
        const formattedErrors = formatValidationError(errors);
       return ResponseManager.validationError(formattedErrors);
    }
    next();
  };
};
