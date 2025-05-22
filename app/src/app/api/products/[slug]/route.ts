import CustomError from "@/db/exceptions/CustomError";
import ProductModel from "@/db/models/ProductModel";
interface IParams {
  params: Promise<{ slug: string }>;
}
export async function GET(request: Request, params: IParams) {
  try {
    const { slug } = await params.params;
    const product = await ProductModel.findProductBySlug(slug);

    return Response.json(product);
  } catch (err: unknown) {
    if (err instanceof CustomError) {
      return Response.json({ message: err.message }, { status: err.status });
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
