import CustomError from "@/db/exceptions/CustomError";
import ProductModel from "@/db/models/ProductModel";
import UserModel from "@/db/models/UserModel";
import WishlistModel from "@/db/models/WishlistModel";
import { NextRequest, NextResponse } from "next/server";
interface IInput {
  productId: string;
}
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const email = request.headers.get("x-user-email");

    if (!userId) {
      throw new CustomError("userId is required", 400);
    }
    await UserModel.findOne({ email: email as string });

    const body: IInput = await request.json();
    if (!body.productId) {
      throw new CustomError("productId is required", 400);
    }
    await ProductModel.findProductById(body.productId);

    const message = await WishlistModel.addWishlist({
      userId: userId as string,
      productId: body.productId,
    });
    return Response.json({ message }, { status: 201 });
  } catch (err) {
    if (err instanceof CustomError) {
      return NextResponse.json(
        { message: `${err.message}` },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const email = request.headers.get("x-user-email");

    if (!userId) {
      throw new CustomError("userId is required", 400);
    }
    await UserModel.findOne({ email: email as string });

    const wishlists = await WishlistModel.findByUserId(userId as string);

    return Response.json(wishlists);
  } catch (err) {
    if (err instanceof CustomError) {
      return NextResponse.json(
        { message: `${err.message}` },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
