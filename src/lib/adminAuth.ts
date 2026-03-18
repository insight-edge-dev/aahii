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
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_token")?.value;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload: JwtPayload;

  try {
    payload = verifyToken(token);
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(payload.role as AdminRole)
  ) {
    throw new ForbiddenError();
  }

  return payload;
}
