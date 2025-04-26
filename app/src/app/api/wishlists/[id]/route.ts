import CustomError from "@/db/exceptions/CustomError";
import WishlistModel from "@/db/models/WishlistModel";
import { NextRequest } from "next/server";

interface IParams {
  params: Promise<{ id: string }>;
}
interface IInput {
  productId: string;
}
export async function DELETE(request: Request, params: IParams) {
  try {
    const { id } = await params.params;
    if (!id) {
      throw new CustomError("wishlistId is required", 400);
    }

    const userId = request.headers.get("x-user-id");
    if (!userId) {
      throw new CustomError("userId is required", 400);
    }

    const body: IInput = await request.json();
    if (!body.productId) {
      throw new CustomError("productId is required", 400);
    }

    const message = await WishlistModel.deleteWishlist({
      id,
      userId,
    });
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
