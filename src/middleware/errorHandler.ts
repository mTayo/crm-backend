import { Request, Response, NextFunction } from "express";
import { ValidateError } from "tsoa";
import { ResponseManager } from "../utils/responseManager";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = (err as any).status || 400;
  if (err instanceof ValidateError) {
    res.status(422).json(ResponseManager.validationError(err?.fields));
    return;
  }

  if (err instanceof Error) {
    const status = (err as any).status || 400;

    return res
      .status(status)
      .json(ResponseManager.error(err.message));
  }

  if (status === 401) {
      return res
        .status(401)
        .json(ResponseManager.error("Unauthorized: Invalid or missing token"));
  }

  res.status(500).json(ResponseManager.rawError("Internal server error"));
}
