import ProductCard from "@/components/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  const productsByCategory = collectionDetails.products.reduce(
    (
      acc: {
        [key: string]: { _id: string; title: string; products: ProductType[] };
      },
      product: ProductType
    ) => {
      product.category.forEach((cat: CategoryType) => {
        if (!acc[cat._id]) {
          acc[cat._id] = { _id: cat._id, title: cat.title, products: [] };
        }
        acc[cat._id].products.push(product);
      });
      return acc;
    },
    {}
  );

  const hasProducts = Object.keys(productsByCategory).length > 0;

  return (
    <div className="px-6 md:px-10 py-5 flex flex-col items-center gap-8">
      <div className="w-full">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-grey-1">Collections</span>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-grey-1">{collectionDetails.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center border-grey-1 border-b pb-6">
        <Image
          src={collectionDetails.image}
          width={350}
          height={400}
          alt="collection"
          className="w-max h-[190px] md:h-[250px] object-cover rounded-lg"
        />
        <p className="text-xl text-black text-justify md:text-left max-w-[900px]">
          {collectionDetails.description}
        </p>
      </div>

      <p className="text-heading2-bold text-center text-blue-3">
        {collectionDetails.title} Products
      </p>

      {hasProducts ? (
        Object.keys(productsByCategory).map((categoryId) => (
          <div key={categoryId} className="w-full px-0 xl:px-[6rem]">
            <Link
              href={`/category/${productsByCategory[categoryId]._id}`}
              className="font-bold text-xl text-left underline hover:text-red-1"
            >
              {productsByCategory[categoryId].title}
            </Link>
            <div className="flex flex-wrap align-middle md:justify-normal md:align-normal gap-2 md:gap-10 mx-0 md:mx-4 my-4">
              {productsByCategory[categoryId].products.map(
                (product: ProductType) => (
                  <ProductCard key={product._id} product={product} />
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <p className='text-body-bold my-10'>No products available</p>
      )}
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
