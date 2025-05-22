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

  let error: string | undefined = undefined;
  if (!resp.ok) {
    const data: IError = await resp.json();
    error = data.message;
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }

  const data: IProduct = await resp.json();

  return (
    <div className="px-4 flex flex-col gap-3">
      <h1 className="text-2xl">Product Detail</h1>
      <div className="carousel rounded-box">
        {data?.images?.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img src={image} alt="" className="h-96 w-96 object-cover" />
            </div>
          );
        })}
      </div>
      <div className="text-lg">{data.name}</div>
      <div>{data.description}</div>
      <div>
        {data?.tags?.map((tag, index, tags) => {
          if (index === tags?.length - 1) {
            return <span key={tag}>{tag}</span>;
          }
          return <span key={tag}>{tag}, </span>;
        })}
      </div>
      <div>{data.price}</div>
      <div className="w-50">
        <AddToWishlistButton productId={data._id.toString()} />
      </div>
    </div>
  );
}
