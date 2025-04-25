import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY_JWT);
export async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify<{
      _id: string;
      email: string;
    }>(token, secret);
    return payload;
  } catch (error) {
    throw error;
  }
}
