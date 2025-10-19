import z from "zod";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";

export type LoginPayload = z.infer<typeof loginSchema>;
export type LoginResponse = {
  token: string;
};

export type RegisterPayload = z.infer<typeof registerSchema>;
export type RegisterResponse = {
  id: number;
  email: string;
  username: string;
  fullName: string;
  slug: string;
};
