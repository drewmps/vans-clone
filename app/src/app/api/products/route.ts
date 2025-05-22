import CustomError from "@/db/exceptions/CustomError";
import ProductModel from "@/db/models/ProductModel";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page");
    const searchQuery = searchParams.get("searchQuery");

    const products = await ProductModel.findAll(page, searchQuery);

    return Response.json(products);
  } catch (err) {
    if (err instanceof CustomError) {
      return Response.json(
        { message: `${err.message}` },
        { status: err.status }
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
