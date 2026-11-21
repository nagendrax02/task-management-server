import { SignJWT } from "jose";

const JWT_ISSUER = "task-manager-api";
const JWT_AUDIENCE = "task-manager-client";

export const generateAccessToken = async (
  userId: string,
): Promise<string> => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const secretKey = new TextEncoder().encode(secret);

  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secretKey);
};