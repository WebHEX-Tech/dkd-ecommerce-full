import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

interface DropdownMenuProps {
  collections: CollectionType[];
  category: CategoryType[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  collections,
  category,
}) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  const cart = useCart();

  return (
    <div className="relative flex items-center lg:hidden">
      {dropdownMenu ? (
        <X
          className="cursor-pointer text-red-1"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
      ) : (
        <Menu
          className="cursor-pointer"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
      )}
      {dropdownMenu && (
        <div className="absolute top-8 left-0 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold">
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
                        className={`text-nowrap text-left text-[14px] border-l-2 border-red-6 p-2 hover:bg-red-7 hover:text-red-6 hover:underline ${
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
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-max gap-2 p-2 md:grid-cols-1">
                    {category
                      .slice()
                      .sort((a, b) => {
                        const titleA = a.collections[0]?.title || "";
                        const titleB = b.collections[0]?.title || "";
                        return titleA.localeCompare(titleB);
                      })
                      .map((category) => (
                        <NavigationMenuLink
                          asChild
                          key={category._id}
                          className={`text-nowrap text-left text-[14px] p-4 border-l-2 border-red-6 hover:bg-red-7 hover:text-red-6 hover:underline ${
                            pathname === `/category/${category._id}` &&
                            "text-red-6 underline"
                          }`}
                        >
                          <div>
                            <Link href={`/category/${category._id}`}>
                              {category.title}
                            </Link>
                            {category.collections.map((collection) => (
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
            href="/orders"
            className={`hover:text-red-1 hover:underline ${
              pathname === "/orders" && "text-red-1 underline"
            }`}
          >
            Orders
          </Link>
          <Link
            href="/cart"
            className={`flex items-center gap-2 border border-red-7 rounded-lg px-2 py-1 bg-red-5 text-red-6 transform transition duration-300 ease-in-out hover:border-red-3 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.2)] hover:bg-red-3 hover:text-white ${
              pathname === "/cart" &&
              "border-red-6 bg-gradient-to-t from-red-1 to-red-4 text-white"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <p className="text-[14px]">Cart ({cart.cartItems.length})</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
