import express from "express";
import authRoutes from './modules/auth/auth.routes'
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes)
app.use(errorMiddleware)
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to. Task Manager API",
  });
});

export default app;
