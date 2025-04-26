"use client";

import { ObjectId } from "mongodb";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";
import { useDebounce } from "use-debounce";
export interface IProduct {
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
export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    async function fetchProducts() {
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;
      if (page === 1) {
        url += `?page=${page}&searchQuery=${debouncedSearchQuery}`;

        const resp = await fetch(url);
        if (!resp.ok) {
          const result: { message: string } = await resp.json();
          setProducts([]);
          Swal.fire({
            icon: "error",
            title: result.message,
          });
          return;
        }

        const dataProducts: IProduct[] = await resp.json();
        setProducts(dataProducts);
      } else {
        url += `?page=${page}&searchQuery=${debouncedSearchQuery}`;
        const resp = await fetch(url);

        if (!resp.ok) {
          const result: { message: string } = await resp.json();
          setProducts([]);
          Swal.fire({
            icon: "error",
            title: result.message,
          });
          return;
        }

        const dataProducts: IProduct[] = await resp.json();
        setProducts(products.concat(dataProducts));
      }
    }
    fetchProducts();
  }, [page]);
  useEffect(() => {
    async function fetchProducts() {
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

      url += `?searchQuery=${debouncedSearchQuery}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        const result: { message: string } = await resp.json();
        setProducts([]);
        Swal.fire({
          icon: "error",
          title: result.message,
        });
        return;
      }

      const dataProducts: IProduct[] = await resp.json();
      setProducts(dataProducts);
    }
    fetchProducts();
  }, [debouncedSearchQuery]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center gap-4 w-full px-4 py-2">
        <div>
          <div className="flex items-center w-[800] bg-[#f3f3f3] px-3 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M16.65 17.65A7.5 7.5 0 1010 2.5a7.5 7.5 0 006.65 15.15z"
              />
            </svg>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="flex-grow outline-none bg-transparent text-lg"
              value={searchQuery}
              onChange={(e) => {
                setPage(1);
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          {debouncedSearchQuery && (
            <div>Results for '{debouncedSearchQuery}'</div>
          )}
        </div>
      </div>

      {/* Page Title + Filter Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mt-1">
          <h1 className="text-3xl font-semibold">Products</h1>
        </div>
      </section>

      {/* Grid Section */}
      <InfiniteScroll
        dataLength={products.length}
        next={() => {
          setPage((prev) => prev + 1);
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <main className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>
        </main>
      </InfiniteScroll>

      {/* Footer */}
      <footer className="footer mt-20 p-10  text-base-content">
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">Twitter</a>
        </div>
      </footer>
    </div>
  );
}
