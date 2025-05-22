"use server";

import { IInput } from "./page";

export async function doRegister(payload: IInput) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result: { message: string } = await resp.json();
  if (!resp.ok) {
    return { error: true, message: result.message as string };
  }
  return { error: false, message: result.message as string };
}
