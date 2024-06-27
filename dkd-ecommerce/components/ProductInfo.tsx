"use client";

import { useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { Badge } from "./ui/badge";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  const stock = productInfo.stocks;
  const isOutOfStock = stock === 0 || stock === null || stock < 0;
  const badgeText = isOutOfStock ? "Out of Stock" : "In Stock";
  const badgeStyle = isOutOfStock ? "bg-red-600 text-white" : "bg-green-600 text-white";

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > stock) {
      newQuantity = stock;
    }
    setQuantity(newQuantity);
  };

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-1">Category:</p>
        <p className="text-base-bold">{productInfo.category && productInfo.category.length > 0 ? productInfo.category[0].title : "No Category"}</p>
      </div>

      <p className="text-heading3-bold">₱ {productInfo.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-1">Description:</p>
        <p className="text-small-medium">{productInfo.description}</p>
      </div>

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-1">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <Badge className={badgeStyle}>{badgeText}</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-1">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className={`hover:text-red-1 cursor-pointer ${isOutOfStock && "text-gray-400 cursor-not-allowed"}`}
            onClick={() => !isOutOfStock && quantity > 1 && setQuantity(quantity - 1)}
          />
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={`border px-2 py-1 rounded-lg text-center text-body-bold w-[4.5rem] ${
              isOutOfStock ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            }`}
            min="1"
            max={stock}
            disabled={isOutOfStock}
          />
          <PlusCircle
            className={`hover:text-red-1 cursor-pointer ${isOutOfStock && "text-gray-400 cursor-not-allowed"}`}
            onClick={() => !isOutOfStock && quantity < stock && setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className={`border border-green-600 text-base-bold text-green-600 py-3 rounded-lg ${
          isOutOfStock ? "bg-gray-400 text-white cursor-not-allowed" : "hover:bg-green-600 hover:text-white"
        }`}
        onClick={() => {
          if (!isOutOfStock) {
            cart.addItem({
              item: productInfo,
              quantity,
              size: selectedSize,
            });
          }
        }}
        disabled={isOutOfStock}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
