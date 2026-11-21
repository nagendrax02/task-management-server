import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
    email: z.email().transform((value)=> value.toLowerCase()),
    password: z.string().min(8).max(128)
})