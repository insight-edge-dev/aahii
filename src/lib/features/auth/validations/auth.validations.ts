import { z } from "zod";

/* ================= LOGIN ================= */

export const loginSchema = z.object({

  email:
  z.string()
  .email("Invalid email"),

  password:
  z.string()
  .min(6,"Password required")

});

/* ================= CHANGE PASSWORD ================= */

export const changePasswordSchema =
z.object({

  currentPassword:
  z.string()
  .min(6),

  newPassword:
  z.string()
  .min(8,"Password must be 8+ chars")

});

/* ================= ADMIN CREATE (optional future) */

export const createAdminSchema =
z.object({

  name:
  z.string()
  .min(2)
  .max(100),

  email:
  z.string()
  .email(),

  password:
  z.string()
  .min(8),

  role:
  z.enum([
    "SUPER_ADMIN",
    "ADMIN"
  ]).optional()

});