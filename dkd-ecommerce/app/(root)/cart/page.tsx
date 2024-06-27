"use client";

import { Separator } from "@/components/ui/separator";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 mb-52 max-lg:flex-col max-sm:px-3 h-full">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <Separator className="my-6 bg-red-7" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No products in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="w-full flex border-b border-gray-200 max-sm:flex-col max-sm:gap-3 transform transition duration-200 hover:bg-red-5 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item ? cartItem.item.media[0] : ""}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">
                      {cartItem.item
                        ? cartItem.item.title
                        : "Product Not Found"}
                    </p>
                    {cartItem.color && (
                      <p className="text-small-medium">
                        {cartItem.color || "Product Not Found"}
                      </p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">
                        {cartItem.size || "Product Not Found"}
                      </p>
                    )}
                    <p className="text-small-medium">
                      ₱
                      {cartItem.item
                        ? cartItem.item.price.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })
                        : "Product Not Found"}
                    </p>
                    <p
                      className={`text-small-medium ${
                        cartItem.item.stocks > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {cartItem.item ? cartItem.item.stocks > 0 ? `In Stock` : "Out of Stock" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="flex gap-4 items-center border-r border-gray-300 pr-4">
                    <MinusCircle
                      className={`hover:text-red-1 cursor-pointer ${
                        cartItem.quantity <= 1
                          ? "text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        cartItem.quantity > 1 &&
                        cart.decreaseQuantity(cartItem.item._id)
                      }
                    />
                    <input
                      type="number"
                      value={cartItem.quantity}
                      onChange={(e) => {
                        let newQuantity = parseInt(e.target.value);
                        if (isNaN(newQuantity) || newQuantity < 1) {
                          newQuantity = 1;
                        } else if (newQuantity > cartItem.item.stocks) {
                          newQuantity = cartItem.item.stocks;
                        }
                        cart.updateQuantity(cartItem.item._id, newQuantity);
                      }}
                      min="1"
                      max={cartItem.item.stocks}
                      className="border px-2 py-1 rounded-lg text-body-bold w-[4.5rem]"
                      disabled={cartItem.item.stocks <= 0}
                    />
                    <PlusCircle
                      className={`hover:text-red-1 cursor-pointer ${
                        cartItem.quantity >= cartItem.item.stocks
                          ? "text-gray-400 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        cartItem.quantity < cartItem.item.stocks &&
                        cart.increaseQuantity(cartItem.item._id)
                      }
                    />
                  </div>

                  <Trash
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full h-fit flex flex-col gap-8 border border-red-7 bg-red-5 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>
            ₱{" "}
            {totalRounded.toLocaleString("en-US", { minimumFractionDigits: 2 }) || ""}
          </span>
        </div>
        <button
          className="rounded-lg text-body-bold bg-white py-3 w-full transform transition duration-300 cursor-pointer hover:bg-[green] hover:text-white"
          onClick={handleCheckout}
          disabled={
            cart.cartItems.length === 0 ||
            cart.cartItems.some((cartItem) => cartItem.item.stocks <= 0)
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
