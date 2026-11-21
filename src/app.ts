import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/tasks/tasks.routes";
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to. Task Manager API",
  });
});
app.use(errorMiddleware);

export default app;
