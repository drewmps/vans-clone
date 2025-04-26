"use client";

import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export interface IWishlistProduct {
  _id: ObjectId;
  name: string;
  images: string[];
  price: string;
  thumbnail: string;
  tags: string[];
  slug: string;
  createdAt: string;
  updateAt: string;
  description: string;
  excerpt: string;
}
export interface IUserWishlist {
  _id: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  createdAt: string;
  updateAt: string;
  wishlistProduct: IWishlistProduct;
}
export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<IUserWishlist[]>([]);

  async function fetchProducts() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlists`);
    if (!resp.ok) {
      const result: { message: string } = await resp.json();
      Swal.fire({
        icon: "error",
        title: result.message,
      });
      return;
    }
    const wishlists: IUserWishlist[] = await resp.json();
    setWishlists(wishlists);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id: string, productId: string) {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/wishlists/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (!resp.ok) {
      const result: { message: string } = await resp.json();
      Swal.fire({
        icon: "error",
        title: result.message,
      });
      return;
    }
    fetchProducts();
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
      {wishlists.map((wishlist) => {
        return (
          <div
            key={wishlist._id.toString()}
            className="border-b border-solid py-2"
          >
            <h1 className="text-base font-semibold mb-3">
              {wishlist.wishlistProduct?.name}
            </h1>
            <div className="flex flex-row justify-between">
              <img
                src={wishlist.wishlistProduct?.thumbnail}
                className="h-30 w-30 object-cover"
              />
              <p>{wishlist.wishlistProduct?.price}</p>
            </div>
            <div className="flex flex-row-reverse">
              <button
                onClick={() => {
                  handleDelete(
                    wishlist._id.toString(),
                    wishlist.productId.toString()
                  );
                }}
                className="cursor-pointer border border-solid rounded-sm text-black bg-white px-4 py-2"
              >
                Remove Item
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
