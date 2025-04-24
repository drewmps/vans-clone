import CustomError from "@/db/exceptions/CustomError";
import UserModel, { ILogin } from "@/db/models/UserModel";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body: ILogin = await request.json();

    const token = await UserModel.login(body);

    return Response.json({ token });
  } catch (err: unknown) {
    console.log(err, "ini error dari api login");
    if (err instanceof ZodError) {
      const error = err.errors[0];
      return Response.json(
        { message: `${error.path} - ${error.message}` },
        { status: 400 }
      );
    } else if (err instanceof CustomError) {
      return Response.json(
        { message: `${err.message}` },
        { status: err.status }
      );
    }

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
