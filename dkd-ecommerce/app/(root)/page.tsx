import AboutUs from "@/components/AboutUs";
import Collections from "@/components/Collections";
import HeroBanner from "@/components/HeroBanner";
import ProductList from "@/components/ProductList";
import Review from "@/components/Review";
import { Separator } from "@/components/ui/separator";
import { PackageOpen, Tags } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroBanner />

      <div className="flex flex-col lg:flex-row justify-evenly gap-8 w-full h-fit py-6 md:py-10 px-6 md:px-14">
        <div className="bg-white border-l-4 border-red-4 h-full p-6">
          <h2 className="text-[1.2rem] md:text-[1.8rem] flex items-center gap-2 font-bold text-red-6 mb-4">
          <Tags className="w-9 h-9"/> Quality Selection for All
          </h2>
          <p className="text-gray-700 text-[14px] md:text-[18px]">
            DKD Food Solution offers a meticulously curated range of premium
            food supplies, perfect for households and small businesses alike.
            From essential ingredients to delightful treats, each product is
            selected for its freshness and exceptional taste. Explore our
            diverse inventory to find exactly what you need, whether you're
            stocking up your pantry or seeking something special.
          </p>
        </div>

        <div className="bg-white border-l-4 border-red-4 h-full p-6">
          <h2 className="text-[1.2rem] md:text-[1.8rem] flex items-center gap-2 font-bold text-red-6 mb-4">
            <PackageOpen className="w-9 h-9"/> Your Go-To Food Supplier
          </h2>
          <p className="text-gray-700 text-[14px] md:text-[18px]">
            DKD Food Solution is your go-to source for premium food supplies
            that meet your highest standards. Whether you're a household or a
            small business, we offer a comprehensive selection that caters to
            your culinary needs. Experience the convenience of shopping with DKD
            Food Solution and elevate your dining experience today!
          </p>
        </div>
      </div>

      <div className="px-4 md:px-10 py-5">
        <Separator className="bg-gray-300" />
      </div>

      <ProductList />

      <div className="px-4 md:px-10 py-5">
        <Separator className="bg-gray-300" />
      </div>
      <Collections />
      <div className="px-4 md:px-10 py-5">
        <Separator className="bg-gray-300" />
      </div>
      <AboutUs />
      <Review />
    </>
  );
}

export const dynamic = "force-dynamic";
