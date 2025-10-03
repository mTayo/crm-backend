import { Expose } from 'class-transformer';
import {   
  IsEnum,  
  IsString, 
  MinLength,  
  IsArray, 
  ValidateNested, 
  IsNumber,  
  Min  
} from 'class-validator';
import { Type } from "class-transformer"


export class CreateJobDto {


  @IsString()
  @MinLength(4, { message: 'Description must be at least 4 characters long' })
  @Expose()
  title: string = '';

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @Expose()
  description: string = '';

  @IsString()
  @Expose()
  customerId: string = '';

}

export class UpdateJobDto {
  
  @Expose()
  @IsEnum(['NEW', 'SCHEDULED', 'DONE', 'INVOICED', 'PAID'], {
    message: 'Status must be one of NEW, SCHEDULED, DONE, INVOICED or PAID',
  })
  status: string = '';

  @IsString()
  @Expose()
  id: string = '';

}

export class InvoiceLineItemDto {
  @IsString()
  @MinLength(2, { message: "Description must be at least 2 characters long" })
  description!: string;

  @IsNumber()
  @Min(1, { message: "Quantity must be at least 1" })
  quantity!: number;

  @IsNumber()
  @Min(0, { message: "Unit price must be a positive number" })
  unitPrice!: number;
}

export class CreateInvoiceDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceLineItemDto)
  lineItems!: InvoiceLineItemDto[];
}
