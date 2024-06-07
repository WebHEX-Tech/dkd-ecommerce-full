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
  category: CategoryType[];
}

const Navbar: React.FC<NavbarClientProps> = ({ collections, category }) => {
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
                  <ul className="grid w-max gap-2 p-2 md:grid-cols-2">
                    {collections.map((collection) => (
                      <NavigationMenuLink
                        asChild
                        key={collection._id}
                        className={`text-nowrap text-left border-l-2 border-red-6 p-4 hover:bg-red-7 hover:text-red-6 hover:underline ${
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

              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-max gap-2 p-2 md:grid-cols-2">
                    {category.map((categories) => (
                      <NavigationMenuLink
                        asChild
                        key={categories._id}
                        className={`text-nowrap text-left p-4 border-l-2 border-red-6 hover:bg-red-7 hover:text-red-6 hover:underline ${
                          pathname === `/category/${categories._id}` &&
                          "text-red-6 underline"
                        }`}
                      >
                        <Link href={`/category/${categories._id}`}>
                          {categories.title}
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
              "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] border-red-1 bg-red-4 text-white"
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
                      <ul className="grid z-50 w-max gap-2 p-2 md:grid-cols-1">
                        {collections.map((collection) => (
                          <NavigationMenuLink
                            asChild
                            key={collection._id}
                            className={`text-nowrap text-left border-l-2 border-red-6 p-2 hover:bg-red-7 hover:text-red-6 hover:underline ${
                              pathname === `/collections/${collection._id}` &&
                              "text-red-6 underline"
                            }`}
                          >
                            <Link className="text-[10px]" href={`/collections/${collection._id}`}>
                              {collection.title}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid z-50 w-max gap-2 p-2 md:grid-cols-1">
                        {category.map((categories) => (
                          <NavigationMenuLink
                            asChild
                            key={categories._id}
                            className={`text-nowrap text-left border-l-2 border-red-6 p-2 hover:bg-red-7 hover:text-red-6 hover:underline ${
                              pathname === `/category/${categories._id}` &&
                              "text-red-6 underline"
                            }`}
                          >
                            <Link className="text-[10px]" href={`/category/${categories._id}`}>
                              {categories.title}
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
                className={`hover:text-red-1 hover:underline ${
                  pathname === "/orders" && "text-red-1 underline"
                }`}
              >
                Orders
              </Link>
              <Link
                href="/cart"
                className={`flex items-center w-max gap-3 border border-red-7 rounded-lg px-2 py-1 bg-red-5 text-red-6 transform transition duration-300 ease-in-out hover:border-red-3 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] hover:bg-red-3 hover:text-white ${
                  pathname === "/cart" &&
                  "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] border-red-1 bg-red-4 text-white"
                }`}
              >
                <ShoppingCart />
                <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
              </Link>
            </div>
          )}

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
      </div>
    </>
  );
};

export default Navbar;
