import { RequestHandler } from "express";
import { z } from "zod";

export const validateBody = <T extends z.ZodType>(
  schema: T,
): RequestHandler<{}, unknown, z.output<T>> => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  };
};
