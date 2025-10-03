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
  Path,
  Query,
  Put
} from "tsoa";
import * as JobService from "./job.service";
import {
  CreateInvoiceDto,
  CreateJobDto,
  UpdateJobDto,
} from "./job.dto";
import { ResponseManager } from "../../utils/responseManager";
import { formatValidationError, validateDto } from "../../utils";
import { JobStatus } from "@prisma/client";


@Route("job")
@Tags("Job")
export class JobController extends Controller {
 

  @Post("create")
  @Security("jwt")
  public async createJob(
    @Body() body: CreateJobDto,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {
    try {
      const { valid, errors, data } = await validateDto(CreateJobDto, body);

      if (!valid || !data) {
        return  ResponseManager.validationError(formatValidationError(errors));
      }
      const result = await JobService.createJob(data);
      return ResponseManager.success( result, "Job created successfully");
    } catch (err: any) {
      return badRequest(400, { message: err.message });
    }
  }

  @Put("/")
  @Security("jwt")
  public async updateJob(
    @Body() body: UpdateJobDto,
    @Request() req: any,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    try {
      const { valid, errors, data } = await validateDto(UpdateJobDto, body);

      if (!valid || !data) {
        return  ResponseManager.validationError(formatValidationError(errors));
      }
      const result = await JobService.updateJob(data, req.user?.id);
      return ResponseManager.success( result, "Job updated successfully");
    } catch (err: any) {
      return badRequest(400, { message: err.message });
    }
  }

  @Get("/")
  @Security("jwt")
  public async getAllJob(
    @Request() req: any,
    @Query() status?: JobStatus,
    @Query() customerId?: string  
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }

    const result = await JobService.getAllJobs({ status, customerId });
    return ResponseManager.success(result, "Jobs retrieved");
  }


  @Get("/{jobId}")
  @Security("jwt")
  public async getJob(
    @Path() jobId: string,
    @Request() req: any
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    const result = await JobService.getJob(jobId);
    return ResponseManager.success(result, "Job retrieved");
  }


  @Post("/{jobId}/invoice")
  @Security("jwt")
  public async createInvoice(
  @Body() body: CreateInvoiceDto,
  @Path() jobId: string,  
  @Request() req: any,
  @Res() badRequest: TsoaResponse<400|409|500, { success: boolean; message: string }>
) {
  if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    try {
      const { valid, errors, data } = await validateDto(CreateInvoiceDto, body);

      if (!valid || !data) {
        return ResponseManager.validationError(formatValidationError(errors));
      }

      const result = await JobService.createInvoice(data.lineItems, jobId, req.user?.id);
      return ResponseManager.success(result, "Invoice created successfully");
    } catch (err: any) {
       if (err.status === 409) {
         return badRequest(409, {
          success: false,
          message: err.message || "Conflict occurred",
        });
      }
      return badRequest(500, {
          success: false,
          message: err.message || "An error occurred",
        }); 
    }
  }
}