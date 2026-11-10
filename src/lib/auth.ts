import { cookies } from "next/headers";
import { verifyToken, JWT_COOKIE_NAME, type TokenPayload } from "@/lib/jwt";

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyToken(token);
}

export async function requireAdmin(): Promise<TokenPayload | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
}
