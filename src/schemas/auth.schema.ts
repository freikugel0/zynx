import z from "zod";

export const loginSchema = z.object({
  email: z
    .email({ error: "Email is invalid" })
    .min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});

export const registerSchema = z
  .object({
    email: z
      .email({ error: "Invalid email format" })
      .min(1, { error: "Email is required" }),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(1, { error: "Please confirm password" }),
    username: z
      .string()
      .min(3, { error: "Username must be at least 3 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        error: "Username can only contain letters, numbers, and underscores",
      }),
    fullName: z.string().min(1, { error: "Full name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
