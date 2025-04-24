"use server";

import { IInput } from "@/app/login/page";
import { cookies } from "next/headers";

interface IResponseSuccess {
  token: string;
}
interface IResponseFail {
  message: string;
}

export async function doLogin(payload: IInput) {
  const resp = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const result: IResponseFail = await resp.json();
    return { error: true, message: result.message as string };
  }
  const result: IResponseSuccess = await resp.json();
  const cookieStore = await cookies();
  cookieStore.set({
    name: "access_token",
    value: result.token,
  });
  return { error: false, message: "Successfully logged in" };
}
