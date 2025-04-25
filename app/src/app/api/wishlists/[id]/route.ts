import CustomError from "@/db/exceptions/CustomError";
import WishlistModel from "@/db/models/WishlistModel";
import { NextRequest } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: NextRequest, params: IParams) {
  try {
    const { id } = await params.params;
    const message = await WishlistModel.deleteWishlist({ id });
    return Response.json({ message });
  } catch (err: unknown) {
    if (err instanceof CustomError) {
      return Response.json(
        { message: `${err.message}` },
        { status: err.status }
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
