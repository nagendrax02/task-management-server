import pool from "../../config/db";
import {
  ERROR_CODES,
  HTTP_STATUS,
  POSTGRES_ERROR_CODES,
} from "../../constants/httpStatus";
import { createAppError } from "../../utils/createAppError";
import { RegisterUserInput, PublicUser, AuthUserRecord } from "./auth.types";

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string,
): Promise<PublicUser> => {
  try {
    const result = await pool.query<PublicUser>(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, passwordHash],
    );
    return result.rows[0];
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "code" in error &&
      "constraint" in error &&
      error.code === POSTGRES_ERROR_CODES.UNIQUE_VIOLATION &&
      error.constraint === "users_email_key"
    ) {
      throw createAppError(
        HTTP_STATUS.CONFLICT,
        ERROR_CODES.EMAIL_EXISTS,
        "Email already exists",
      );
    }
    throw error;
  }
};

export const findUserByEmail = async (
  email: string,
): Promise<AuthUserRecord | null> => {
  const user = await pool.query<AuthUserRecord>(
    "SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1",
    [email],
  );
  return user.rows[0] ?? null;
};
