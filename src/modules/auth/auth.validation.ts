import { z } from "zod";

export const registerValidation = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: z
      .string()
      .email("Invalid email address")
      .optional(),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .max(15, "Phone number cannot exceed 15 characters")
      .optional(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine(
    (data) => data.email || data.phone,
    {
      message: "Email or phone is required",
      path: ["email"],
    }
  );

export const loginValidation = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .optional(),

    phone: z
      .string()
      .min(10, "Invalid phone number")
      .optional(),

    password: z
      .string()
      .min(1, "Password is required"),
  })
  .refine(
    (data) => data.email || data.phone,
    {
      message: "Email or phone is required",
      path: ["email"],
    }
  );