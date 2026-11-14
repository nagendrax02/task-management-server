import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import pool from "./config/db";

const PORT: string | number = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected Successfully");
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  } catch (err) {
    console.log("Failed to Start the server", err);
  }
};

startServer();
