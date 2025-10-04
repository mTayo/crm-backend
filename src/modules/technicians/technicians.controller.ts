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
  Security
} from "tsoa";
import * as TechniciansService from "./technicians.service";

import { ResponseManager } from "../../utils/responseManager";



@Route("technicians")
@Tags("Technicians")
export class TechniciansController extends Controller {
 
    @Get("/")
    @Security("jwt")
    public async getAllJob(
      @Request() req: any
    ) {
      if (!req.user?.id) {
        throw { status: 401, message: "User not authenticated" };
      }

      const result = await TechniciansService.getAllTechnicians();
      return ResponseManager.success(result, "Technicians retrieved");
    }
}