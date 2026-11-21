import type { RequestHandler } from "express";
import { ERROR_CODES, HTTP_STATUS } from "../constants/httpStatus";
import { createAppError } from "../utils/createAppError";
import { verifyAccessToken } from "../modules/auth/auth.token";

export const requireAccessToken: RequestHandler = async (req, res, next) => {
  const authorization = req.get("authorization");
  const match = authorization?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    next(
      createAppError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_ACCESS_TOKEN,
        "A bearer access token is required",
      ),
    );
    return;
  }

  if (!process.env.JWT_SECRET) {
    next(new Error("JWT_SECRET is not configured"));
    return;
  }

  try {
    res.locals.userId = await verifyAccessToken(match[1]);
    next();
  } catch {
    next(
      createAppError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_ACCESS_TOKEN,
        "The access token is invalid or expired",
      ),
    );
  }
};
