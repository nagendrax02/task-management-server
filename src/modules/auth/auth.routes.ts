import { Router } from "express";
import { register } from "./auth.controller";
import { validateBody } from "../../middleware/validate.middleware";
import { registerSchema } from "./auth.schema";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

export default router;
