import argon2 from "argon2";

import { createUser, findUserByEmail } from "./auth.repository";
import type {
  RegisterUserInput,
  PublicUser,
  LoginUserInput,
  AuthUserRecord,
  LoginResult,
} from "./auth.types";
import { email } from "zod";
import { ERROR_CODES, HTTP_STATUS } from "../../constants/httpStatus";
import { createAppError } from "../../utils/createAppError";
import { generateAccessToken } from "./auth.token";

export const registerUser = async (
  input: RegisterUserInput,
): Promise<PublicUser> => {
  const passwordHash = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });

  return createUser(input.name, input.email, passwordHash);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResult> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw createAppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_CREDENTIALS,
      "User doesn't exist",
    );
  }
  const isPasswordValid = await argon2.verify(user.password_hash, password);
  if (!isPasswordValid) {
    throw createAppError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_CREDENTIALS,
      "Invalid Password",
    );
  }

  const accessToken = await generateAccessToken(user.id);

  return {
    accessToken,
    tokenType: "Bearer",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};
