"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { getSearchedProducts } from "@/lib/actions/actions";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [searchResults, setSearchResults] = useState([]);
  const [fullscreenSearch, setFullscreenSearch] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const results = await getSearchedProducts(value);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (searchQuery: string) => {
    try {
      const results = await getSearchedProducts(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setFullscreenSearch(false);
  };

  const handleSearchIconClick = () => {
    setFullscreenSearch(!fullscreenSearch);
    if (!fullscreenSearch) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 0);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) {
      return text;
    }

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="highlight">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <>
      <div className="sticky top-0 z-50 py-2 px-10 flex gap-2 justify-between items-center bg-white shadow-xl max-sm:px-2">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={120} height={90} />
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
                          {collection.title} Products
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
                    {category
                      .slice()
                      .sort((a, b) => {
                        const titleA = a.collections[0]?.title || "";
                        const titleB = b.collections[0]?.title || "";
                        return titleA.localeCompare(titleB);
                      })
                      .map((categories) => (
                        <NavigationMenuLink
                          asChild
                          key={categories._id}
                          className={`text-nowrap text-left p-4 border-l-2 border-red-6 hover:bg-red-7 hover:text-red-6 hover:underline ${
                            pathname === `/category/${categories._id}` &&
                            "text-red-6 underline"
                          }`}
                        >
                          <div>
                            <Link href={`/category/${categories._id}`}>
                              {categories.title}
                            </Link>
                            {categories.collections.map((collection) => (
                              <p
                                key={collection._id}
                                className="text-grey-1 text-[12px] cursor-pointer"
                              >
                                {collection.title}
                              </p>
                            ))}
                          </div>
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

        <div className="relative md:flex gap-3 border border-gray-400 px-3 py-1 items-center rounded-lg hidden">
          <input
            className="outline-none max-sm:max-w-[120px] border-r border-gray-300"
            placeholder="Search..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            disabled={query === ""}
            onClick={() => router.push(`/search/${query}`)}
          >
            <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
          </button>
          {query && (
            <div
              ref={searchResultsRef}
              className="absolute top-10 left-0 mt-2 bg-white border border-gray-300 rounded-lg w-full max-w-[300px] shadow-xl z-10 overflow-hidden"
            >
              <ul>
                {searchResults.slice(0, 6).map((product: ProductType) => (
                  <li
                    key={product._id}
                    className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-red-5 hover:underline hover:text-red-6 cursor-pointer"
                    onClick={() => {
                      router.push(`/products/${product._id}`);
                      setQuery("");
                    }}
                  >
                    <Image
                      src={product.media[0]}
                      alt="product"
                      width={50}
                      height={50}
                      className="h-[50px] bg-white object-cover rounded-md"
                    />
                    <p className="two-line-truncate">
                      {highlightText(product.title, query)}
                    </p>
                  </li>
                ))}
                {searchResults.length > 6 && (
                  <li
                    className="flex items-center justify-start gap-2 px-4 py-1 underline bg-red-2 hover:bg-red-5 hover:text-red-6 cursor-pointer"
                    onClick={() => router.push(`/search/${query}`)}
                  >
                    <p>See All {searchResults.length} Products</p>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="relative flex gap-3 items-center">
          <Link
            href="/cart"
            className={`flex items-center gap-3 border border-red-7 rounded-lg px-2 py-1 bg-red-5 text-red-6 transform transition duration-300 ease-in-out hover:border-red-3 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] hover:bg-red-3 hover:text-white max-lg:hidden ${
              pathname === "/cart" &&
              "border-red-6 bg-gradient-to-t from-red-1 to-red-4 text-white"
            }`}
          >
            <ShoppingCart />
            <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
          </Link>

          <div className="relative flex items-center md:hidden">
            <button onClick={handleSearchIconClick}>
              <Search className="cursor-pointer h-5 w-5 hover:text-red-1" />
            </button>
            {fullscreenSearch && (
              <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="max-w-screen-sm w-full h-full p-4 border border-gray-300 shadow-xl">
                  <div className="flex">
                    <button
                      className="text-red-1 px-4 py-2"
                      onClick={clearSearch}
                    >
                      ✕
                    </button>
                    <div className="relative w-full flex items-center">
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      <button
                        className="absolute top-0 right-0 px-3 py-3"
                        disabled={query === ""}
                        onClick={() => {
                          router.push(`/search/${query}`);
                          setFullscreenSearch(false);
                        }}
                      >
                        <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={searchResultsRef}
                    className="mt-2 bg-white border border-gray-300 rounded-lg w-full h-max overflow-y-auto shadow-xl"
                  >
                    <ul>
                      {searchResults.slice(0, 6).map((product: ProductType) => (
                        <li
                          key={product._id}
                          className="flex items-center justify-start gap-2 px-4 py-2 hover:bg-red-5 hover:underline hover:text-red-6 cursor-pointer"
                          onClick={() => {
                            router.push(`/products/${product._id}`);
                            setFullscreenSearch(false);
                          }}
                        >
                          <Image
                            src={product.media[0]}
                            alt="product"
                            width={50}
                            height={50}
                            className="h-[50px] bg-white object-cover rounded-md"
                          />
                          <p className="two-line-truncate">
                            {highlightText(product.title, query)}
                          </p>
                        </li>
                      ))}
                      {searchResults.length > 6 && (
                        <li
                          className="flex items-center justify-start gap-2 px-4 py-1 underline bg-red-2 hover:bg-red-5 hover:text-red-6 cursor-pointer"
                          onClick={() => router.push(`/search/${query}`)}
                        >
                          <p>See All {searchResults.length} Products</p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

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
                            <Link
                              className="text-[12px]"
                              href={`/collections/${collection._id}`}
                            >
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
                        {category
                          .slice()
                          .sort((a, b) => {
                            const titleA = a.collections[0]?.title || "";
                            const titleB = b.collections[0]?.title || "";
                            return titleA.localeCompare(titleB);
                          })
                          .map((categories) => (
                            <NavigationMenuLink
                              asChild
                              key={categories._id}
                              className={`text-nowrap text-left p-4 border-l-2 border-red-6 hover:bg-red-7 hover:text-red-6 hover:underline ${
                                pathname === `/category/${categories._id}` &&
                                "text-red-6 underline"
                              }`}
                            >
                              <div>
                                <Link
                                  className="text-[12px]"
                                  href={`/category/${categories._id}`}
                                >
                                  {categories.title}
                                </Link>
                                {categories.collections.map((collection) => (
                                  <p
                                    key={collection._id}
                                    className="text-grey-1 text-[10px] cursor-pointer"
                                  >
                                    {collection.title}
                                  </p>
                                ))}
                              </div>
                            </NavigationMenuLink>
                          ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* <Link href={user ? "/wishlist" : "/sign-in"} className="hover:text-red-1"> Wishlist </Link> */}
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
                  "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] border-red-1 bg-red-3 text-white"
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
