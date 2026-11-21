import pool from "../../config/db";
import type { CreateTaskInput, Task } from "./tasks.types";

export const createTask = async (
  userId: string,
  input: CreateTaskInput,
): Promise<Task> => {
  const result = await pool.query<Task>(
    `INSERT INTO tasks (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING id, user_id, title, description, completed, created_at, updated_at`,
    [userId, input.title, input.description ?? null],
  );

  return result.rows[0];
};
