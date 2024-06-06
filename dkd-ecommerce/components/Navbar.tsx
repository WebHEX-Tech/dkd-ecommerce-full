"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavbarClientProps {
  collections: CollectionType[];
}

const Navbar: React.FC<NavbarClientProps> = ({ collections }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white shadow-xl max-sm:px-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={130} height={100} />
        </Link>

        <div className="flex gap-4 text-base-bold items-center max-lg:hidden">
          <Link
            href="/"
            className={`hover:text-red-1 hover:underline ${
              pathname === "/" && "text-red-1 underline"
            }`}
          >
            Home
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-max gap-1 p-2 md:grid-cols-2">
                    {collections.map((collection) => (
                      <NavigationMenuLink
                        asChild
                        key={collection._id}
                        className={`text-nowrap text-center rounded-md p-4 hover:bg-red-7 hover:text-red-6 hover:underline ${
                          pathname === `/collections/${collection._id}` &&
                          "text-red-6 underline"
                        }`}
                      >
                        <Link href={`/collections/${collection._id}`}>
                          {collection.title}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href={user ? "/orders" : "/sign-in"}
            className={`hover:text-red-1 hover:underline ${
              pathname === "/orders" && "text-red-1 underline"
            }`}
          >
            Orders
          </Link>
        </div>

        <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg shadow-md">
          <input
            className="outline-none max-sm:max-w-[120px]"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={query === ""}
            onClick={() => router.push(`/search/${query}`)}
          >
            <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
          </button>
        </div>

        <div className="relative flex gap-3 items-center">
          <Link
            href="/cart"
            className={`flex items-center gap-3 border border-red-7 rounded-lg px-2 py-1 bg-red-5 text-red-6 transform transition duration-300 ease-in-out hover:border-red-3 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] hover:bg-red-3 hover:text-white max-md:hidden ${
              pathname === "/cart" &&
              "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] border-red-3 bg-red-3 text-white"
            }`}
          >
            <ShoppingCart />
            <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
          </Link>

          <Menu
            className="cursor-pointer lg:hidden"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />

          {dropdownMenu && (
            <div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
              <Link href="/" className="hover:text-red-1">
                Home
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-max gap-1 p-2 md:grid-cols-1">
                        {collections.map((collection) => (
                          <NavigationMenuLink
                            asChild
                            key={collection._id}
                            className={`text-nowrap text-center rounded-md p-4 hover:bg-red-7 hover:text-red-6 hover:underline ${
                              pathname === `/collections/${collection._id}` &&
                              "text-red-6 underline"
                            }`}
                          >
                            <Link href={`/collections/${collection._id}`}>
                              {collection.title}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {/* <Link
                href={user ? "/wishlist" : "/sign-in"}
                className="hover:text-red-1"
              >
                Wishlist
              </Link> */}
              <Link
                href={user ? "/orders" : "/sign-in"}
                className="hover:text-red-1"
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
              >
                <ShoppingCart />
                <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
              </Link>
            </div>
          )}

          {user ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Link href="/sign-in">
              <CircleUserRound />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
