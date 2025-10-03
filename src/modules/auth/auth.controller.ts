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
import * as AuthService from "./auth.service";
import {
  LoginDto,
} from "./auth.dto";
import { ResponseManager } from "../../utils/responseManager";



@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
 

  @Post("login")
  public async login(
    @Body() body: LoginDto,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ) {
    try {
      const result = await AuthService.loginUser(body);
      return ResponseManager.success( result, "User logged in");
    } catch (err: any) {
      return badRequest(400, { message: err.message });
    }
  }


  @Get("user")
  @Security("jwt")
  public async profile(@Request() req: any) {
    if (!req.user?.id) {
      throw { status: 401, message: "User not authenticated" };
    }
    const result = await AuthService.userProfile(req.user.id);
    return ResponseManager.success(result, "Profile retrieved");
  }
}