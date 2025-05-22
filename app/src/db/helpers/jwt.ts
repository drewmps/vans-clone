import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY_JWT;
export function signToken(data: { _id: string; email: string }) {
  return jwt.sign(data, SECRET_KEY as string);
}
