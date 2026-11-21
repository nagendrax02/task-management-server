import { Router } from "express";
import { requireAccessToken } from "../../middleware/auth.middleware";
import { validateBody } from "../../middleware/validate.middleware";
import { createTask, getTasks } from "./tasks.controller";
import { createTaskSchema } from "./tasks.schema";

const router = Router();

router.use(requireAccessToken);
router.get("/", getTasks);
router.post("/", validateBody(createTaskSchema), createTask);

export default router;
