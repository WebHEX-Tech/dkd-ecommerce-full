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

  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <div className="flex flex-row gap-3 items-center border-grey-1 border-b pb-6">
        <Image
          src={collectionDetails.image}
          width={350}
          height={400}
          alt="collection"
          className="w-max h-[280px] object-cover rounded-xl"
        />
        <p className="text-xl text-black text-left max-w-[900px]">
          {collectionDetails.description}
        </p>
      </div>
      
      <p className="text-heading2-bold text-blue-3">
        {collectionDetails.title}
      </p>

      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
