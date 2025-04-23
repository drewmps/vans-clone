"use server";

import { IInput } from "./page";

export async function doRegister(payload: IInput) {
  const resp = await fetch("http://localhost:3000/api/register", {
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
  return { error: false, message: result.message };
}
