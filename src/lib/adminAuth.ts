import { cookies } from "next/headers";
import { verifyToken, JwtPayload } from "@/lib/jwt";
import { AdminRole } from "@prisma/client";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireAdmin(
  allowedRoles: AdminRole[] = []
): Promise<JwtPayload> {

  // ✅ DEV BYPASS
  if (process.env.NODE_ENV === "development") {
    return {
      id: "dev-admin",
      role: "SUPER_ADMIN",
    } as JwtPayload;
  }

  const cookieStore = await cookies();

  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    throw new UnauthorizedError("No token found");
  }

  let payload: JwtPayload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  const role = payload.role as AdminRole;

  if (!Object.values(AdminRole).includes(role)) {
    throw new ForbiddenError("Invalid role");
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    throw new ForbiddenError("Access denied");
  }

  return payload;
}