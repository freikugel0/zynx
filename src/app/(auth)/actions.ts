"use server";

import { setAuthCookies } from "@/lib/jwt";
import {
  loginService,
  meService,
  registerService,
} from "@/services/auth.service";
import {
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth.type";
import { ActionResponse } from "@/types/generic.type";
import { UserMeResponse } from "@/types/user.type";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  payload: LoginPayload,
): Promise<ActionResponse<UserMeResponse | null>> {
  try {
    const res = await loginService({
      email: payload.email,
      password: payload.password,
    });

    setAuthCookies(res.data.token);
    const user = await meService();

    return { ok: true, message: res.message, data: user.data };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        ok: false,
        message: e.response?.data.message ?? "Error from server",
        data: null,
      };
    }
    return { ok: false, message: "Unexpected error", data: null };
  }
}

export async function logoutAction() {
  const c = await cookies();

  c.delete("access_token");
  redirect("/login");
}

export async function registerAction(
  payload: RegisterPayload,
): Promise<ActionResponse<RegisterResponse | null>> {
  try {
    const res = await registerService({
      email: payload.email,
      username: payload.username,
      fullName: payload.fullName,
      password: payload.password,
    });

    return { ok: true, message: res.message, data: res.data };
  } catch (e) {
    if (isAxiosError(e)) {
      return {
        ok: false,
        message: e.response?.data.message ?? "Error from server",
        data: null,
      };
    }
    return { ok: false, message: "Unexpected error", data: null };
  }
}
