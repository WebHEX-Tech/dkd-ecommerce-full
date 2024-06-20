"use client";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { ChevronRight } from "lucide-react";
import ParticlesComponent from "./ParticleComponent";

const HeroBanner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-normal md:justify-center w-full h-[100%] md:h-[50vh] overflow-hidden bg-red-4 p-8">
      <ParticlesComponent />

      <div className="absolute -top-44 right-[40%] translate-x-1/2 rounded-full w-[95vw] h-[28rem] blur-3xl bg-red-2 z-1"></div>
      <div className="absolute -bottom-40 -right-16 translate-x-1/2 rounded-full w-[80vw] h-[28rem] blur-3xl bg-red-3 z-1"></div>

      <img
        src="/banner-logo.png"
        alt="banner"
        className="z-20 w-[80%] md:w-[300px] xl:w-[450px] h-auto"
      />
      <div className="z-20 w-full sm:w-[45vw]">
        <h1 className="font-bold text-red-5 md:text-red-6 text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[3rem] leading-none">
          THE LEADING FOOD AND BEVERAGE DISTRIBUTOR & SUPPLIER
        </h1>
        <h2 className="font-bold  text-red-6 md:text-red-5 text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[3rem] leading-none">
          IN ZAMBOANGA CITY
        </h2>
        <Separator className="bg-red-2 my-5" />
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
          <h2 className="font-normal text-red-5 text-[1rem] md:text-[1.5rem] lg:text-[2rem] xl:text-[2.8rem] italic">
            DKD Food Solutions
          </h2>
          <div className="flex justify-center">
            <Link
              href="/all-products"
              className="bg-gradient-to-t from-red-1 to-red-4 text-white px-4 py-2 border border-red-6 rounded-lg transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl flex items-center gap-2 text-nowrap"
            >
              Shop Now <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
