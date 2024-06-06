import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <img
          src="/DKD-banner.png"
          alt="banner"
          width={2000}
          height={1000}
          className="w-fit h-full shadow-lg"
        />
      </div>
      <Collections />
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";
