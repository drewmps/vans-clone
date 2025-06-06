import { z } from "zod";

import CustomError from "../exceptions/CustomError";
import bcrypt from "bcryptjs";

import { getDB } from "../config/mongodb";
import { signToken } from "../helpers/jwt";
import { hashPassword } from "../helpers/bcrypt";

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

export interface IFindOneUser {
  email: string;
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
  email: z
    .string()
    .email("Invalid email format")
    .min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default class UserModel {
  static getCollection() {
    const db = getDB();
    return db.collection<IUser>("users");
  }

  static async findOne(payload: IFindOneUser) {
    const collection = this.getCollection();

    const user = await collection.findOne({ email: payload.email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    return user;
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
      password: hashPassword(payload.password),
    });

    return "Successfully registered";
  }

  static async login(payload: ILogin) {
    loginSchema.parse(payload);

    const collection = this.getCollection();

    const user = await collection.findOne({ email: payload.email });
    if (!user) throw new CustomError("Invalid email/password", 401);

    const isValid = bcrypt.compareSync(payload.password, user.password);
    if (!isValid) throw new CustomError("Invalid email/password", 401);

    const token = signToken({ _id: user._id.toString(), email: user.email });

    return token;
  }
}
