import jwt from "jsonwebtoken";
import { ILogin } from "../models/UserModel";
import { ObjectId } from "mongodb";
const SECRET_KEY = process.env.SECRET_KEY_JWT;
export function signToken(data: { _id: string }) {
  return jwt.sign(data, SECRET_KEY as string);
}
