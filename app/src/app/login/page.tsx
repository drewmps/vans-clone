"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { doLogin } from "../api/login/actions";

export interface IInput {
  email: string;
  password: string;
}
export default function LoginPage() {
  const router = useRouter();
  const [input, setInput] = useState<IInput>({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await doLogin(input);

    if (result.error) {
      Swal.fire({
        icon: "error",
        title: result.message,
      });
      return;
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 mx-auto w-1/3 mt-5"
      >
        <h1 className="text-lg text-center">Welcome to Vans</h1>
        <div className="border border-solid flex flex-col px-3 py-2">
          <label>Email</label>
          <input name="email" value={input.email} onChange={handleChange} />
        </div>
        <div className="border border-solid flex flex-col px-3 py-2">
          <label>Password</label>
          <input
            name="password"
            value={input.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <button type="submit" className="btn btn-neutral">
          Log In
        </button>
      </form>
    </>
  );
}
