import { Expose } from 'class-transformer';
import { IsEmail,  IsString,  } from 'class-validator';




export class CreateCustomerDto {
  @IsEmail({}, { message: 'Invalid email' })
  @Expose()
  email: string = '';

  @IsString()
  @Expose()
  name: string = '';

  @IsString()
  @Expose()
  phone: string = '';

  @IsString()
  @Expose()
  address: string = '';

}