"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAccessToken() {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const decoded = jwt.decode(accessToken);

    if (!decoded || typeof decoded !== "object" || !decoded.exp) return null;
    const currentTime = Math.floor(Date.now() / 1000);

    console.log("exp", decoded.exp);
    console.log("currentTime", currentTime);

    return decoded.exp > currentTime ? accessToken : null;
  } catch {
    return null;
  }
}

export async function getARefreshToken() {
  const accessToken = cookies().get("refreshToken")?.value;

  if (!accessToken) return null;

  try {
    const decoded = jwt.decode(accessToken);

    if (!decoded || typeof decoded !== "object" || !decoded.exp) return null;

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp > currentTime ? accessToken : null;
  } catch {
    return null;
  }
}

export async function handleLogin(
  accessToken: string | undefined,
  refreshToken: string | undefined
) {
  if (accessToken)
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60, // 60 minutes
      path: "/",
    });

  if (refreshToken)
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60, // 60 minutes
      path: "/",
    });
}

export async function resetAuthCookies() {
  cookies().set("refreshToken", "");
  cookies().set("accessToken", "");
}
