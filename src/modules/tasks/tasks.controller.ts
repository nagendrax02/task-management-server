import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpStatus";
import {
  createTask as createTaskForUser,
  getTasks as getTasksForUser,
} from "./tasks.service";
import type { CreateTaskInput } from "./tasks.types";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const task = await createTaskForUser(
      res.locals.userId as string,
      req.body as CreateTaskInput,
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const tasks = await getTasksForUser(res.locals.userId as string);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};
