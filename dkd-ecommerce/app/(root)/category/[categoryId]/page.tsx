import ProductCard from "@/components/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { getCategoryDetails } from "@/lib/actions/actions";
import React from "react";

const Category = async ({ params }: { params: { categoryId: string } }) => {
  const categoryDetails = await getCategoryDetails(params.categoryId);
  const collectionTitle = categoryDetails.collections.map(
    (collection: CategoryType) => collection.title
  );
  const collectionId = categoryDetails.collections.map(
    (collection: CategoryType) => collection._id
  );

  const productsByCategory = categoryDetails.products.reduce(
    (acc: { [key: string]: ProductType[] }, product: ProductType) => {
      product.category.forEach((category) => {
        if (!acc[category.title]) {
          acc[category.title] = [];
        }
        acc[category.title].push(product);
      });
      return acc;
    },
    {}
  );

  const hasProducts = Object.keys(productsByCategory).length > 0;

  return (
    <div className="px-6 md:px-10 py-10 flex flex-col items-center gap-8">
      <div className="w-full">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/collections/${collectionId}`}>
                {collectionTitle}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-grey-1">{categoryDetails.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <p className="text-heading2-bold text-center text-blue-3">
        {categoryDetails.title}
      </p>

      {hasProducts ? (
        Object.keys(productsByCategory).map((categoryTitle) => (
          <div key={categoryTitle} className="w-full px-0 xl:px-[6rem]">
            <div className="flex flex-wrap justify-center align-middle md:justify-normal md:align-normal border-grey-1 border-t gap-2 md:gap-10 mx-0 py-6 md:mx-4">
              {productsByCategory[categoryTitle].map((product: ProductType) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-body-bold my-10">No products available</p>
      )}
    </div>
  );
};

export default Category;

export const dynamic = "force-dynamic";
