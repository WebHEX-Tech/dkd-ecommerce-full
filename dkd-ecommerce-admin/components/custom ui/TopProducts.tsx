"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const TopProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const top3Products = products
    .filter((product: any) => product.sales !== undefined)
    .sort((a: any, b: any) => b.sales - a.sales)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-10 py-8">
      <p className="text-heading2-bold text-black">Top 3 Products by Sales</p>
      {loading ? (
        <p className="text-body-bold">Loading...</p>
      ) : top3Products.length === 0 ? (
        <p className="text-body-bold">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {top3Products.map((product: any) => (
            <Card
              key={product._id}
              className="flex rounded-lg shadow-md p-4 bg-white gap-4 border-blue-4"
            >
              <Image
                src={product.media[0]}
                alt="product"
                width={200}
                height={250}
                className="h-[130px] md:h-[200px] rounded-lg bg-white object-cover transform transition duration-300 group-hover:-translate-y-2"
              />
              <div className="h-full flex justify-evenly flex-col">
                <p className="md:text-heading3-bold font-bold text-[15px]">{product.title}</p>
                <p className="text-sm text-gray-500 text-[18px]">{`Sales: ${product.sales}`}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProducts;
