import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { getSearchedProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <div className="px-6 md:px-10 py-5">
      <p className="text-heading3-bold my-10">
        Search results for <span className="text-red-4">{decodedQuery}</span>
      </p>

      <div className="py-2">
        <Separator className="bg-gray-300" />
      </div>
      {!searchedProducts ||
        (searchedProducts.length === 0 && (
          <p className="text-body-bold my-10">No results found</p>
        ))}
      <div className="flex flex-wrap justify-normal gap-2 md:gap-4">
        {searchedProducts?.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SearchPage;
