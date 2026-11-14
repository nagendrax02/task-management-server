import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to. Task Manager API",
  });
});

export default app;
