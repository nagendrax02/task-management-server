import { Router } from "express";
import { requireAccessToken } from "../../middleware/auth.middleware";
import { validateBody } from "../../middleware/validate.middleware";
import { createTask } from "./tasks.controller";
import { createTaskSchema } from "./tasks.schema";

const router = Router();

router.use(requireAccessToken);
router.post("/", validateBody(createTaskSchema), createTask);

export default router;
