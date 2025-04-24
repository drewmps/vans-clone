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
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input name="email" value={input.email} onChange={handleChange} />
        <br />
        <label>Password</label>
        <input
          name="password"
          value={input.password}
          onChange={handleChange}
          type="password"
        />
        <br />
        <button type="submit" className="btn btn-neutral">
          Register
        </button>
      </form>
    </>
  );
}
