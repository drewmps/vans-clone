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
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-2 mx-auto w-1/3 mt-5"
      >
        <h1 className="text-lg text-center">Join the Vans Family</h1>
        <div className="border border-solid flex flex-col px-3 py-2">
          <label>Name</label>
          <input value={input.name} name="name" onChange={handleChange} />
        </div>

        <div className="border border-solid flex flex-col px-3 py-2">
          <label>Username</label>
          <input
            name="username"
            value={input.username}
            onChange={handleChange}
          />
        </div>

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
          Register
        </button>
      </form>
    </div>
  );
}
