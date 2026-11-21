import { jwtVerify, SignJWT } from "jose";

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

export const verifyAccessToken = async (token: string): Promise<string> => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
    algorithms: ["HS256"],
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });

  if (!payload.sub) {
    throw new Error("Access token is missing its subject");
  }

  return payload.sub;
};
