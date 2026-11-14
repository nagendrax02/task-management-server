export type AppError = Error & {
  statusCode: number;
  code: string;
};

export const isAppError = (error: unknown): error is AppError => {
  return (
    error instanceof Error &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    "code" in error &&
    typeof error.code === "string"
  );
};

export const createAppError = (
  statusCode: number,
  code: string,
  message: string,
): AppError => {
  const error = new Error(message);
  return Object.assign(error, { statusCode, code });
};
