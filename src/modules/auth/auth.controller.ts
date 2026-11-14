import type { Request, Response, NextFunction } from "express";
import type { PublicUser, RegisterUserInput } from "./auth.types";

import { registerUser } from "./auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User Registered Succesfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
