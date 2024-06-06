import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  const productsByCategory = collectionDetails.products.reduce((acc: { [key: string]: ProductType[] }, product: ProductType) => {
    product.category.forEach((cat: CategoryType) => {
      if (!acc[cat.title]) {
        acc[cat.title] = [];
      }
      acc[cat.title].push(product);
    });
    return acc;
  }, {});

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <div className="flex flex-col md:flex-row gap-3 items-center border-grey-1 border-b pb-6">
        <Image
          src={collectionDetails.image}
          width={350}
          height={400}
          alt="collection"
          className="w-max h-[280px] object-cover rounded-xl"
        />
        <p className="text-xl text-black text-justify md:text-left max-w-[900px]">
          {collectionDetails.description}
        </p>
      </div>

      <p className="text-heading2-bold text-center text-blue-3">
        {collectionDetails.title}
      </p>

      {Object.keys(productsByCategory).map(categoryTitle => (
        <div key={categoryTitle} className="w-full">
          <h2 className="font-bold text-xl text-left underline">{categoryTitle}</h2>
          <div className="flex flex-wrap gap-10 m-4">
            {productsByCategory[categoryTitle].map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
