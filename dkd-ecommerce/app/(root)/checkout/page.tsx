"use client";

import { useState, useEffect } from "react";
import { ChangeEvent, FormEvent } from "react";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const Checkout = () => {
  const { user } = useUser();
  const cart = useCart();
  const router = useRouter();

  const [shippingRate, setShippingRate] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    country: "",
    province: "",
    address: "",
    zipCode: "",
    orderNotes: "",
    paymentMethod: "cash-on-delivery",
  });

  const subtotal = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const subtotalRounded = parseFloat(subtotal.toFixed(2));
  const total = subtotalRounded + shippingRate;
  const totalRounded = parseFloat(total.toFixed(2));

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cart.cartItems, router]);

  useEffect(() => {
    if (user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));

    if (
      ["country", "province", "address", "zipCode"].includes(name)
    ) {
      // Fetch new shipping rate based on address changes
      fetchShippingRate({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handlePaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      paymentMethod: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mock order placement
    alert(
      `Order placed successfully with ${formValues.paymentMethod.replace(
        "-",
        " "
      )}`
    );
    cart.clearCart();
    router.push("/");
  };

  const fetchShippingRate = async (addressData: typeof formValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shipping-rates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: addressData.country,
            province: addressData.province,
            zipCode: addressData.zipCode,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setShippingRate(data.rate); 
      } else {
        setShippingRate(0);
      }
    } catch (err) {
      console.error("Failed to fetch shipping rate", err);
      setShippingRate(0);
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-8 px-5 mx-auto">
      <h1 className="text-heading2-bold mb-5">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center lg:flex-row gap-6"
      >
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Personal Information</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formValues.firstName}
                onChange={handleChange}
                className="border p-3 rounded-md flex-1"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formValues.lastName}
                onChange={handleChange}
                className="border p-3 rounded-md flex-1"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formValues.phoneNumber}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              required
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Shipping Address</h2>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name (optional)"
              value={formValues.companyName}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mb-4"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formValues.country}
                onChange={handleChange}
                className="border p-3 rounded-md flex-1"
                required
              />
              <input
                type="text"
                name="province"
                placeholder="Province/Region"
                value={formValues.province}
                onChange={handleChange}
                className="border p-3 rounded-md flex-1"
                required
              />
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={formValues.zipCode}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              required
            />
            <textarea
              name="orderNotes"
              placeholder="Order Notes (optional)"
              value={formValues.orderNotes}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Order Summary</h2>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="flex justify-between gap-10 mb-2 text-nowrap"
              >
                <span>
                  {cartItem.quantity}x - {cartItem.item.title}
                </span>
                <span>
                  ₱{" "}
                  {cartItem.item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
            <Separator className="bg-gray-300 my-4"/>
            <div className="flex justify-between mt-4">
              <span>Subtotal:</span>
              <span>
                ₱{" "}
                {subtotalRounded.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              <span>
                ₱{" "}
                {shippingRate.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between mt-4 font-bold">
              <span>Total:</span>
              <span>
                ₱{" "}
                {totalRounded.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Payment Method</h2>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cash-on-delivery"
                checked={formValues.paymentMethod === "cash-on-delivery"}
                onChange={handlePaymentChange}
                className="cursor-pointer"
              />
              <label
                htmlFor="cash-on-delivery"
                className="text-body-bold cursor-pointer"
              >
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white rounded-md py-3 w-full text-center transform transition duration-300 hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
