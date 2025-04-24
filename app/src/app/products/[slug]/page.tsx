import { redirect } from "next/navigation";
import { IProduct } from "../page";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ slug: string }>;
}
interface IError {
  message: string;
  status: number;
}

export default async function ProductDetail(props: IProps) {
  const { slug } = await props.params;
  const resp = await fetch(`http://localhost:3000/api/products/${slug}`);
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
    </div>
  );
}
