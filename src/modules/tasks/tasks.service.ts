import {
  createTask as insertTask,
  findTasksByUserId,
} from "./tasks.repository";
import type { CreateTaskInput, Task } from "./tasks.types";

export const createTask = (
  userId: string,
  input: CreateTaskInput,
): Promise<Task> => insertTask(userId, input);

export const getTasks = (userId: string): Promise<Task[]> =>
  findTasksByUserId(userId);
