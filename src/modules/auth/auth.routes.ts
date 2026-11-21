import { Router } from "express";
import { login, register } from "./auth.controller";
import { validateBody } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

export default router;
