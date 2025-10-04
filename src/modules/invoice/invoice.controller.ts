import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Tags,
  Request,
  Res,
  TsoaResponse,
  Security,
  Path
} from "tsoa";
import * as InvoiceService from "./invoice.service";
import {
  CreateInvoicePaymentDto,
} from "./invoice.dto";
import { ResponseManager } from "../../utils/responseManager";
import { formatValidationError, validateDto } from "../../utils";



@Route("invoice")
@Tags("Invoice")
export class InvoiceController extends Controller {
 

  @Post("/{invoiceId}/payments")
  @Security("jwt")
  public async createInvoicePayment(
    @Body() body: CreateInvoicePaymentDto,
    @Path() invoiceId: string, 
    @Request() req: any, 
    @Res() badRequest: TsoaResponse<400|409|500, { message: string }>
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    try {
      const { valid, errors, data } = await validateDto(CreateInvoicePaymentDto, body);
      
      if (!valid || !data) {
        return  ResponseManager.validationError(formatValidationError(errors));
      }
         
      const result = await InvoiceService.createInvoicePayment(data , invoiceId, req.user?.id);
      return ResponseManager.success( result, "Payment created successfully");
    } catch (err: any) {
      return badRequest(400, { message: err.message });
    }
  }

}