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
    <div>
      <h1>Wishlist</h1>
      {wishlists.map((wishlist) => {
        return (
          <div key={wishlist._id.toString()}>
            {wishlist.wishlistProduct?.name} -{" "}
            <button
              onClick={() => {
                handleDelete(
                  wishlist._id.toString(),
                  wishlist.productId.toString()
                );
              }}
            >
              Remove item
            </button>
          </div>
        );
      })}
    </div>
  );
}
