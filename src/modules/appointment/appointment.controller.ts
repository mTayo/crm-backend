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
  Query
} from "tsoa";
import * as AppointmentService from "./appointment.service";
import {
  CreateAppointmentDto,
} from "./appointment.dto";
import { ResponseManager } from "../../utils/responseManager";
import { formatValidationError, validateDto } from "../../utils";



@Route("appointment")
@Tags("Appointment")
export class AppointmentController extends Controller {
 

  @Post("create")
  @Security("jwt")
  public async createAppointment(
    @Body() body: CreateAppointmentDto,
    @Request() req: any,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    try {
      const { valid, errors, data } = await validateDto(CreateAppointmentDto, body);

      if (!valid || !data) {
        return  ResponseManager.validationError(formatValidationError(errors));
      }
      const result = await AppointmentService.createAppointment(data!, req.user?.id);
      return ResponseManager.success( result, "Appointment created successfully");
    } catch (err: any) {
      return badRequest(400, { message: err.message });
    }
  }

  @Get("/")
  @Security("jwt")
  public async getAllAppointments(
    @Request() req: any,
    @Query() technicianId?: string  
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }

    const result = await AppointmentService.getAllJobs({ technicianId });
    return ResponseManager.success(result, "Appointments retrieved");
  }


  @Get("/{appointmentId}")
  @Security("jwt")
  public async getAppointment(
    @Path() appointmentId: string,
    @Request() req: any
  ) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    const result = await AppointmentService.getAppointment(appointmentId);
    return ResponseManager.success(result, "Appointment retrieved");
  }
}

