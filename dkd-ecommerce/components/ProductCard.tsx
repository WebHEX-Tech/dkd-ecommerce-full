"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const categoryTitle =
    product.category.length > 0 ? product.category[0].title : "No Category";

  return (
    <div className="group">
      <Link
        href={`/products/${product._id}`}
        className="relative w-[150px] h-[320px] md:w-[220px] md:h-[360px] flex flex-col gap-2 bg-white rounded-md border border-grey-3 overflow-hidden shadow-md transform transition duration-300 group-hover:shadow-2xl"
      >
        <div className="absolute top-0 right-[0%] -translate-y-[100%] rounded-full w-[100vw] h-[1.2rem] blur-2xl transform transition duration-300 group-hover:bg-red-4 z-10"></div>
        <Image
          src={product.media[0]}
          alt="product"
          width={250}
          height={300}
          className="h-[180px] md:h-[250px] bg-white object-cover transform transition duration-300 group-hover:-translate-y-2"
        />
        <div className="flex flex-col justify-between p-3 transform transition duration-300 group-hover:bg-red-4 h-full">
          <div>
            <p className="text-[14px] font-bold two-line-truncate group-hover:text-white">
              {product.title}
            </p>
            <p className="text-small-medium text-grey-1 transform transition duration-300 group-hover:text-red-2">
              {categoryTitle}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-body-bold transform transition duration-300 group-hover:text-white">
              ₱{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
