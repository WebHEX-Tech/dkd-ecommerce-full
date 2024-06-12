import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* <img
          src="/DKD-banner.png"
          alt="banner"
          width={2000}
          height={1000}
          className="w-fit h-full shadow-lg"
        /> */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-[60vh] md:h-[50vh] overflow-hidden bg-red-4 p-8">
        <div className="absolute -top-44 right-[40%] translate-x-1/2 rounded-full w-[95vw] h-[28rem] blur-3xl bg-red-2 z-1"></div>
        <div className="absolute -bottom-40 -right-16 translate-x-1/2 rounded-full w-[80vw] h-[28rem] blur-3xl bg-red-3 z-1"></div>

        <img
          src="/banner-logo.png"
          alt="banner"
          className="z-10 w-[180px] md:w-[300px] xl:w-[450px] h-auto"
        />
        <div className="z-10 w-full sm:w-[45vw]">
          <h1 className="font-bold text-red-6 text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[3rem] leading-none">
            THE LEADING FOOD AND BEVERAGE DISTRIBUTOR & SUPPLIER
          </h1>
          <h2 className="font-bold text-red-5 text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[3rem] leading-none">
            IN ZAMBOANGA CITY
          </h2>
          <Separator className="bg-red-2 my-5" />
          <div className="flex justify-between items-center">
            <h2 className="font-normal text-red-5 text-[1rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.8rem] italic">
              DKD Food Solutions
            </h2>
            <Link
              href="#products"
              className="bg-gradient-to-t from-red-1 to-red-4 text-white px-4 py-1 border border-red-6 rounded-lg transform transition duration-300 ease-in-out hover:scale-110"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <ProductList />
      <div className="px-4 md:px-10 py-5">
        <Separator className="bg-gray-300" />
      </div>
      <Collections />
    </>
  );
}

export const dynamic = "force-dynamic";
