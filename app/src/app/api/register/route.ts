import UserModel, { IUser } from "@/db/models/UserModel";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body: IUser = await request.json();

    const message = await UserModel.register(body);

    return Response.json({ message }, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const error = err.errors[0];
      return Response.json(
        { message: `${error.path} - ${error.message}` },
        { status: 400 }
      );
    }

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
