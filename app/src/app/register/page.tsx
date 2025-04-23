"use client";

import React, { useState } from "react";
import { doRegister } from "./actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export interface IInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [input, setInput] = useState<IInput>({
    name: "",
    username: "",
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await doRegister(input);
    if (result.error) {
      Swal.fire({
        icon: "error",
        title: result.message,
      });
      return;
    }

    router.push("/login");
  };
  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input value={input.name} name="name" onChange={handleChange} />
        <br />
        <label>Username</label>
        <input name="username" value={input.username} onChange={handleChange} />
        <br />
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
    </div>
  );
}
