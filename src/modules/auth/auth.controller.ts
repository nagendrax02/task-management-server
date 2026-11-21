import type { Request, Response, NextFunction } from "express";
import type { LoginUserInput, PublicUser, RegisterUserInput } from "./auth.types";

import { loginUser, registerUser } from "./auth.service";
import { HTTP_STATUS } from "../../constants/httpStatus";

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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
        const {email, password} = req.body as LoginUserInput;
        const user = await loginUser(email, password);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "User Logged In Successfully",
            data: user
        })
    } catch (err) {
        next(err);
    }
}
