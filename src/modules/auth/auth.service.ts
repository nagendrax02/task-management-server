import argon2 from "argon2";

import { createUser } from "./auth.repository";
import type { RegisterUserInput, PublicUser } from "./auth.types";

export const registerUser = async (
  input: RegisterUserInput,
): Promise<PublicUser> => {
  const passwordHash = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });

  return createUser(input.name, input.email, passwordHash);
};
