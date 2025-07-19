import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum length 2" })
    .max(50, { message: "Max length 50" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/, {
      message:
        "Password must include at least 1 uppercase letter and 1 special character",
    }),

  phone: z.string().optional(),

  address: z.string().optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum length 2" })
    .max(50, { message: "Max length 50" })
    .optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/, {
      message:
        "Password must include at least 1 uppercase letter and 1 special character",
    })
    .optional(),

  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(Object.keys(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z
    .boolean({ message: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ message: "isVerified must be true or false" })
    .optional(),
});
