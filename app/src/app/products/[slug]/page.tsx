import { Metadata } from "next";
import { IProduct } from "../page";
import AddToWishlistButton from "@/app/components/AddToWishlistButton";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ slug: string }>;
}
interface IError {
  message: string;
  status: number;
}

interface IPropsMeta {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata(props: IPropsMeta): Promise<Metadata> {
  const { slug } = await props.params;

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`
  );
  const data: IProduct = await resp.json();

  return {
    title: data.name,
    description: data.excerpt,
    openGraph: {
      images: data.images,
    },
  };
}

export default async function ProductDetail(props: IProps) {
  const { slug } = await props.params;
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`
  );
  const data: IProduct = await resp.json();
  let error: string | undefined = undefined;
  if (!resp.ok) {
    const data: IError = await resp.json();
    error = data.message;
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <div>{data.name}</div>
      <AddToWishlistButton productId={data._id.toString()} />
    </div>
  );
}
