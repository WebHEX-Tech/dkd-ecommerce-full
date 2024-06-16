import { ShoppingCart } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCart from "@/lib/hooks/useCart";
import SearchBarMobile from "@/components/navbar-components/SearchBarMobile";
import { useState } from "react";

const UserControls: React.FC = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const cart = useCart();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);

  return (
    <div className="gap-4 items-center flex">
      <SearchBarMobile
        query={query}
        setQuery={setQuery}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <Link
        href="/cart"
        className={`flex items-center gap-2 border border-red-7 rounded-lg px-2 py-1 bg-red-5 text-red-6 transform transition duration-300 ease-in-out hover:border-red-3 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] hover:bg-red-3 hover:text-white max-lg:hidden ${
          pathname === "/cart" &&
          "border-red-6 bg-gradient-to-t from-red-1 to-red-4 text-white"
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        <p className="text-[14px]">Cart ({cart.cartItems.length})</p>
      </Link>
      {user ? (
        <UserButton afterSignOutUrl="/sign-in" />
      ) : (
        <Link
          href="/sign-in"
          className="text-base-bold hover:text-[green] hover:underline"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default UserControls;
