"use client";

import Link from "next/link";
import { IProduct } from "../product/page";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="relative p-4 border border-base-200 hover:shadow-lg transition">
      <div className="aspect-square relative">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="object-contain w-full h-full rounded-md"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-base font-semibold">{product.name}</h2>
        <p className="text-sm text-neutral">{product.price}</p>
      </div>
      <div className="mt-4">
        <Link href={`/products/${product.slug}`}>See detail</Link>
        <div>Add to wishlist</div>
      </div>
    </div>
  );
}
