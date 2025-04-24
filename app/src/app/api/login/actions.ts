"use server";

import { IInput } from "@/app/login/page";
import { cookies } from "next/headers";

export async function doLogin(payload: IInput) {
  const resp = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
  if (!resp.ok) {
    return { error: true, message: result.message };
  }
  const cookieStore = await cookies();
  cookieStore.set({
    name: "access_token",
    value: result.token,
  });
  return { error: false, message: "Successfully logged in" };
}
