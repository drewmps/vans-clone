import Link from "next/link";
import { IProduct } from "./products/page";

interface IError {
  message: string;
  status: number;
}
export default async function Home() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);

  let error: string | undefined = undefined;
  if (!resp.ok) {
    const data: IError = await resp.json();
    error = data.message;
  }

  if (error) {
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }

  const featuredProducts: IProduct[] = await resp.json();
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://assets.vans.com/image/upload/c_limit,w_1920/q_auto:best,f_auto:image/v1744995823/SP25_LP_Homepage_Hero-01_04182025_Desktop_1440x906_Image)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              id="Ebene_1"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 443.8 197.4"
            >
              <path d="M31.6 162.8h-6.3l-1.2-13.5h6.3zm380.6 0h6.3l1.2-13.5h-6.3zM20.5 149.4h-6.3l1.2 13.5h6.3zm401.7 13.4h6.3l1.2-13.5h-6.3zm-358.7 3.3c.2 4.7-3.5 8.6-8.2 8.8h-.4c-4.8 0-8.6-3.9-8.6-8.7v-.3c0-4.8 3.4-8.8 8.5-8.8 4.8 0 8.6 3.9 8.6 8.7.1.1.1.1.1.3m-26.7 0c0 9.5 7.7 17.1 18 17.1S73 175.5 73 166v-.1c0-9.5-7.7-17.1-18-17.1s-18.2 7.7-18.2 17.3m42 16.4h9.3v-11.8H104v-7.6H88.1v-5.6h17.6v-8H78.8zm32.3 0h9.3v-11.8h15.9v-7.6h-15.9v-5.6H138v-8h-26.9zm53.1 0h9.3v-25h10.1v-8h-29.5v8h10.1zm25.5 0h9.3V170h12v12.5h9.3v-33H211v12.4h-12v-12.4h-9.3zm36.9 0h27.3v-7.8h-18.1v-5.2h16.1v-7.2h-16.1v-5h17.8v-7.8h-27zm52.8.3h8.1l6.7-19 6.8 19h8.1l11.2-33.3h-9.6l-5.9 19.1-6.5-19.2h-8l-6.5 19.2-5.9-19.1h-9.8zm51.9-13.3 3.8-9.4 3.7 9.4zm-15 13h9.8l2.4-5.9h13l2.5 5.9h10l-14.3-33.3h-9zm42 0h25.6v-8h-16.3v-25h-9.3zm30.8 0h25.6v-8h-16.3v-25h-9.3z"></path>
              <path
                fill="#d51920"
                d="M374.4 66.4h-18.1c-1.8-4.4-3.7-7.9-13.8-7.9-7 0-10 2.9-10 5.8 0 3.2 2.5 5.8 10.2 7.5l16.4 4.4c10.7 2.9 15.9 11.4 15.9 20.3 0 5-1.1 11-5.8 16-3.5 3.7-8.9 8.6-26.7 8.6-24.4 0-32.5-15.4-32.5-24.8h19c1.9 6.8 6.5 9.4 15.8 9.4 6.4 0 11.9-2.3 11.9-7.2 0-4.7-4-6.4-9.1-7.8l-12.9-3.5c-6.2-1.9-11.4-3.4-15.1-6.5-9.6-8.2-8.9-22.9 1.5-30.5 5.8-4.2 11.7-6.4 21.2-6.4 11.1 0 17.4 3.2 22.4 6.6 4.3 2.8 9.6 10.2 9.7 16M69.3 14.2c.2.6 37.8 106 37.8 106h22.5l34.6-87.7h215l1.6-18.3H147.7L119 86.9 93.2 14.2zm185.9 68.1 28.1 37.9h17.6v-75h-20.2V86l-25.4-40.7h-19.4v74.9h19.4V82.3zm126.3 34c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4.1-1.8 4-4q.15 0 0 0m-.4 0c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5c1.9-.1 3.5 1.4 3.5 3.5q0-.15 0 0m-1.7-.9c0-.8-.7-1.4-1.4-1.4h-2.1v4.2h.9v-1.4h.7l.9 1.4h1.1l-1-1.5c.6-.1 1-.7.9-1.3m-.9.1c0 .3-.3.6-.6.6h-1v-1.2h.9c.3-.1.7.1.8.4-.1.1 0 .1-.1.2m-230.3 4.7h21.6l4-11.7h28.5l4.1 11.7h21.2l-27.2-74.9h-22.9zm31.6-25.3 8.4-24.9 8.2 24.9z"
              ></path>
            </svg>
            <p className="mb-5 text-3xl">Your Style. Your Story. Your Vans.</p>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-5">
        <h1 className="pl-4 text-xl">Featured products</h1>

        <div className="carousel rounded-box">
          {featuredProducts.map((featuredProduct) => {
            return (
              <div
                key={featuredProduct._id.toString()}
                className="carousel-item"
              >
                <div>
                  <img
                    src={featuredProduct.thumbnail}
                    alt=""
                    className="h-85 w-85 object-cover"
                  />
                  <div className="flex flex-col gap-1 p-3">
                    <p className="font-bold">{featuredProduct.name}</p>
                    <p className="text-sm">{featuredProduct.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-4 mb-5">
        <Link href={`/products`}>
          <button className="p-4 bg-black text-white cursor-pointer rounded-sm">
            See all products
          </button>
        </Link>
      </div>

      <div className="p-4 bg-black text-white">
        <h1 className="font-semibold text-2xl mb-4">About us</h1>
        <p>
          Since 1966, Vans has been all about creative expression, community,
          and authenticity.
        </p>
        <p>
          Born in Anaheim, California, Vans started as a small family business
          making rugged, sticky-soled shoes for local skateboarders. With our
          now-iconic waffle sole and bold designs, we quickly became a staple
          not just for skaters, but for surfers, BMX riders, artists, musicians,
          and anyone who wanted to express themselves without limits.
        </p>
        <p>
          Over the decades, Vans has grown from a humble shoe company into a
          global symbol of youth culture. We have built skateparks, sponsored
          athletes, hosted music festivals, and collaborated with countless
          artists and brands, always pushing creativity forward.
        </p>
        <p>
          Our core belief is simple. Off the Wall is not just a slogan. It is a
          spirit. It is about thinking differently, living authentically, and
          embracing the things that make you unique.
        </p>
        <p>
          Today, whether it is through our shoes, our apparel, or our global
          community initiatives, we are proud to continue inspiring generations
          to be bold, be original, and be proud of who they are.
        </p>
        <p>Thanks for riding with us.</p>
      </div>
    </>
  );
}
