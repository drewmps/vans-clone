"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddToWishlistButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  async function handleAdd() {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });
    if (!resp.ok) {
      const result: { message: string } = await resp.json();
      if (result.message === "Unauthorized") {
        router.push("/login");
        return;
      }
      Swal.fire({
        icon: "error",
        title: result.message,
      });
      return;
    }
    router.push("/wishlist");
  }
  return <div onClick={handleAdd}>Add to wishlist</div>;
}
