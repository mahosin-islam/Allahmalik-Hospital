import { SignJWT, jwtVerify } from "jose";

export const JWT_COOKIE_NAME = "admin_token";
export const JWT_EXPIRES_IN = "7d";
export const JWT_MAX_AGE = 60 * 60 * 24 * 7;

export interface TokenPayload {
  sub: string;
  username: string;
  name: string;
  role: "admin" | "editor";
}

function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined. Add it to your .env file.");
  }
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({
    username: payload.username,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecretKey());
}

export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (!payload.sub || !payload.role) {
      return null;
    }
    return {
      sub: payload.sub,
      username: String(payload.username ?? ""),
      name: String(payload.name ?? ""),
      role: payload.role as TokenPayload["role"],
    };
  } catch {
    return null;
  }
}

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: JWT_MAX_AGE,
};
