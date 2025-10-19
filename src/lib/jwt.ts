import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export function secondsUntil(exp?: number) {
  if (!exp) return 60 * 15;
  const now = Math.floor(Date.now() / 1000);
  return Math.max(exp - now, 60);
}

// TODO: Refresh token implementation
export async function setAuthCookies(
  accessToken: string,
  // refreshToken: string,
) {
  const c = await cookies();

  const accessExp = (decodeJwt(accessToken).exp ?? undefined) as
    | number
    | undefined;

  // const refreshExp = (() => {
  //   try {
  //     return (decodeJwt(refreshToken).exp ?? undefined) as number | undefined;
  //   } catch {
  //     return undefined; // kalau refresh bukan JWT, pakai fallback 30 hari
  //   }
  // })();

  c.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: secondsUntil(accessExp),
  });

  // c.set("refresh_token", refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   path: "/",
  //   maxAge: refreshExp ? secondsUntil(refreshExp) : 60 * 60 * 24 * 30, // 30 hari
  // });
}
