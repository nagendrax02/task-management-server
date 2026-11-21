import { Router } from "express";
import { login, register } from "./auth.controller";
import { validateBody } from "../../middleware/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";
import { requireAccessToken } from "../../middleware/auth.middleware";
import { HTTP_STATUS } from "../../constants/httpStatus";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/me", requireAccessToken, (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: { userId: res.locals.userId },
  });
});

export default router;
