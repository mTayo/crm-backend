// src/modules/auth/auth.controller.ts

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
import * as CustomerService from "./customer.service";
import {
  CreateCustomerDto,
} from "./customer.dto";
import { ResponseManager } from "../../utils/responseManager";
import { formatValidationError, validateDto } from "../../utils";



@Route("customer")
@Tags("Customer")
export class CustomerController extends Controller {
 

  @Post("create")
  @Security("jwt")
  public async createCustomer(
    @Body() body: CreateCustomerDto,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {
    try {
      const { valid, errors, data } = await validateDto(CreateCustomerDto, body);
      
      if (!valid || !data) {
        return  ResponseManager.validationError(formatValidationError(errors));
      }
         
      const result = await CustomerService.createCustomer(data);
      return ResponseManager.success( result, "Customer created successfully");
    } catch (err: any) {
      return badRequest(400, { message: err.message });
    }
  }


  @Get("/{customerId}")
  @Security("jwt")
  public async getCustomer(
    @Path() customerId: string,
    @Request() req: any
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    const result = await CustomerService.getCustomer(customerId);
    return ResponseManager.success(result, "Customer profile retrieved");
  }

  @Get("/")
  @Security("jwt")
  public async getAllCustomers(
    @Request() req: any
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    const result = await CustomerService.getAllCustomer();
    return ResponseManager.success(result, "Customers retrieved");
  }
}