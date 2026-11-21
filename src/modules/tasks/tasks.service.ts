import { createTask as insertTask } from "./tasks.repository";
import type { CreateTaskInput, Task } from "./tasks.types";

export const createTask = (
  userId: string,
  input: CreateTaskInput,
): Promise<Task> => insertTask(userId, input);
