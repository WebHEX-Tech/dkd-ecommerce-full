"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/actions/actions";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

const PRODUCTS_PER_PAGE = 30;

type SortOrder = "latest" | "price-low-to-high" | "price-high-to-low";

const AllProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [selectedText, setSelectedText] = useState<string>("Latest");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
        setTotalPages(Math.ceil(allProducts.length / PRODUCTS_PER_PAGE));
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortProducts = (order: SortOrder): ProductType[] => {
    let sortedProducts = [...products];
    switch (order) {
      case "price-low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default: // "latest"
        sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    return sortedProducts;
  };

  const handleSortChange = (value: SortOrder) => {
    setSortOrder(value);
    setCurrentPage(1);
    switch (value) {
      case "price-low-to-high":
        setSelectedText("Price: Low to High");
        break;
      case "price-high-to-low":
        setSelectedText("Price: High to Low");
        break;
      default:
        setSelectedText("Latest");
        break;
    }
  };

  const paginatedProducts = sortProducts(sortOrder).slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const renderPaginationItems = () => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage || i === currentPage + 1 || i === currentPage - 1) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => setCurrentPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage + 2 || i === currentPage - 2) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-6 md:px-10 py-10 flex flex-col items-center gap-8 w-full lg:w-4/5">
        <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
          <h1 className="text-heading2-bold">All Products</h1>
          <div className="w-[200px] flex justify-between items-center mb-6">
            <Select onValueChange={handleSortChange} defaultValue="latest">
              <SelectTrigger className="px-4 py-2 text-red-600 rounded-md">
                <p className="truncate">Sort by {selectedText}</p>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low-to-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-to-low">
                    Price: High to Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <p className="text-body-bold">Loading products...</p>
        ) : error ? (
          <p className="text-body-bold">{error}</p>
        ) : !products || products.length === 0 ? (
          <p className="text-body-bold">No products found</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

export const dynamic = "force-dynamic";
