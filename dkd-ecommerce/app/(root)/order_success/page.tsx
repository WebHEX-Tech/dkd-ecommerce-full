"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";
import { runFireworks } from "@/lib/utils";

const SuccessfulOrder = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
    runFireworks();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5 text-center">
      <p className="text-heading2-bold text-red-1">
        Placed Order Successfully!
      </p>
      <p>
        If you have any questions, please email:{" "}
        <a className="text-red-1" href="mailto:dkdmarketingcorp21@gmail.com">
          dkdmarketingcorp21@gmail.com
        </a>
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/"
          className="p-4 border text-base-bold hover:bg-green-600 hover:text-white"
        >
          CONTINUE TO SHOPPING
        </Link>
        <Link
          href="/orders"
          className="p-4 border text-base-bold hover:bg-green-600 hover:text-white"
        >
          CHECK ORDERS
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulOrder;
