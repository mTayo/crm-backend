import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';




export class LoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  @Expose()
  email: string = '';

  @IsString()
  @Expose()
  password: string = '';

}
