import Gallery from "@/components/Gallery";
import ProductCard from "@/components/ProductCard";
import ProductInfo from "@/components/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);
  const collectionTitle = productDetails.collections.map(
    (collection: ProductType) => collection.title
  );
  const categoryTitle = productDetails.category.map(
    (category: ProductType) => category.title
  );
  const categoryId = productDetails.category.map(
    (category: ProductType) => category._id
  );
  const collectionId = productDetails.collections.map(
    (collection: ProductType) => collection._id
  );
  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <>
      <div className="w-full px-6 pt-6">
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
              <BreadcrumbLink href={`/category/${categoryId}`}>
                {categoryTitle}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-grey-1">{productDetails.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
        <Gallery productMedia={productDetails.media} />
        <ProductInfo productInfo={productDetails} />
      </div>

      <div className="flex flex-col items-center px-10 pt-5 pb-20 max-md:px-3">
        <p className="text-heading3-bold">Related Products</p>
        <div className="flex flex-wrap gap-16 mx-auto mt-8">
          {relatedProducts?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
