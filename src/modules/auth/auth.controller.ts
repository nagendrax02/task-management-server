import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { PublicUser, RegisterUserInput } from "./auth.types";

import { registerUser } from "./auth.service";

const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(128),
});

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{

    try{
        console.log("Request Body", req.body);
        const input = registerSchema.parse(req.body);
        console.log(input);
        const user = await registerUser(input);

        res.status(201).json({
            success: true,
            message: "User Registered Succesfully",
            data: user
        })
    }catch(err){
        next(err);
    }
}
