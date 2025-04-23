import { z } from "zod";

import CustomError from "../exceptions/CustomError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "../config/mongodb";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

const newUserSchema = z.object({
  name: z.string(),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email("Email format is wrong"),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export default class UserModel {
  static getCollection() {
    const db = getDB();
    return db.collection<IUser>("users");
  }

  static async register(payload: IUser): Promise<string> {
    newUserSchema.parse(payload);

    const collection = this.getCollection();
    let user = await collection.findOne({ username: payload.username });
    if (user) {
      throw new CustomError("Username must be unique", 400);
    }

    user = await collection.findOne({ email: payload.email });
    if (user) {
      throw new CustomError("Email must be unique", 400);
    }

    await collection.insertOne({
      ...payload,
      password: bcrypt.hashSync(payload.password, 10),
    });

    return "Successfully registered";
  }
}
