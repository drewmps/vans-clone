import CustomError from "@/db/exceptions/CustomError";
import ProductModel from "@/db/models/ProductModel";

export async function GET() {
  try {
    const products = await ProductModel.findAll();

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
