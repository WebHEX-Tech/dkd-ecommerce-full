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

  return (
    <div className="px-10 py-10 flex flex-col items-center gap-8">
      <div className="w-full">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {/* <BreadcrumbItem>
              <BreadcrumbLink href={`/collections/`}>
                {collectionDetails.title}
              </BreadcrumbLink>
            </BreadcrumbItem> */}
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

      {Object.keys(productsByCategory).map((categoryTitle) => (
        <div key={categoryTitle} className="w-full">
          <div className="flex flex-wrap justify-center align-middle md:justify-normal md:align-normal gap-10 m-4">
            {productsByCategory[categoryTitle].map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;

export const dynamic = "force-dynamic";
