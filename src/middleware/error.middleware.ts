import type { NextFunction, Request, Response } from "express";
import { isAppError } from "../utils/createAppError";
import { HTTP_STATUS } from "../constants/httpstatus";


export const errorMiddleware = (
  err: unknown,
  _req: Request,
  response: Response,
  next: NextFunction,
): void => {
  if (response.headersSent) {
    next(err);
    return;
  }

  if (isAppError(err)) {
    response.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }
  response
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: "Internal Server Error" });
};
