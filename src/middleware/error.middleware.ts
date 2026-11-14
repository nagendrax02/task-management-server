import type { NextFunction, Request, Response } from "express";
import { isAppError } from "../utils/createAppError";
import { ERROR_CODES, HTTP_STATUS } from "../constants/httpStatus";
import { ZodError } from "zod";


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

  if (err instanceof ZodError) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: "Validation failed",
        details: err.issues.map(({ path, message }) => ({ path, message })),
      },
    });
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
