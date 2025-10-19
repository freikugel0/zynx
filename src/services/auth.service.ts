"use server";

import { serverApi } from "@/lib/server-api";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth.type";
import { UserMeResponse } from "@/types/user.type";
import { SingularResponse } from "@/types/generic.type";

export async function loginService(
  payload: LoginPayload,
): Promise<SingularResponse<LoginResponse>> {
  const api = serverApi();
  return api.post("/auth/login", payload);
}

export async function registerService(
  payload: Omit<RegisterPayload, "confirmPassword">,
): Promise<SingularResponse<RegisterResponse>> {
  const api = serverApi();
  return api.post("/auth/register", payload);
}

export async function meService(): Promise<SingularResponse<UserMeResponse>> {
  const api = serverApi();
  return api.get("/auth/me");
}
