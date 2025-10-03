import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";


export async function validateDto<T extends object>(
  dtoClass: new () => T,
  body: any
): Promise<{ valid: boolean; errors?: any; data?: T }> {
  const dto = plainToInstance(dtoClass, body);
  const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });

  if (errors.length > 0) {
    return {
      valid: false,
      errors: errors.map(e => ({
        property: e.property,
        constraints: e.constraints,
      })),
    };
  }

  return { valid: true, data: dto };
}


// Hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare a plain password with a hashed one
export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};

// Generate a JWT token
export const generateToken = (userId: string, role:string, expiresIn= '7d'): string => {
  const JWT_SECRET = process.env.JWT_SECRET || "49)50(DOEW#R)OXO!";
  // @ts-ignore
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: expiresIn || '7d',
  });
};

export const encrypt = (value: string): string  => {
  return jwt.sign({ data: value }, process.env.JWT_SECRET || "49)50(DOEW#R)OXO!", { algorithm: "HS256" }) || "";
}
//Format validation error
export const formatValidationError = (errors: any) => {
   const formattedErrors = errors.reduce((acc: any, error: { property: any; constraints: any; }) => {
        const key = error.property;
        const messages = Object.values(error.constraints || {});
        acc[key] = messages;
        return acc;
    }, {});
            
    return formattedErrors;
};




