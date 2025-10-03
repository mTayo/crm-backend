
import {   IsNumber,   Min,  } from 'class-validator';


export class CreateInvoicePaymentDto {
  @IsNumber()
  @Min(0.01, { message: "Payment amount must be greater than 0" })
  amount!: number;
}
