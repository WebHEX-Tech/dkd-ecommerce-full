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

interface NavigationLinksProps {
  collections: CollectionType[];
  category: CategoryType[];
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  collections,
  category,
}) => {
  const pathname = usePathname();

  return (
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
                {category.map((category) => (
                  <NavigationMenuLink
                    asChild
                    key={category._id}
                    className={`text-nowrap text-left p-4 border-l-2 border-red-6 hover:bg-red-7 hover:text-red-6 hover:underline ${
                      pathname === `/category/${category._id}` &&
                      "text-red-6 underline"
                    }`}
                  >
                    <Link href={`/category/${category._id}`}>
                      <div>
                        {category.title}
                        {category.collections.map((collection) => (
                          <p
                            key={collection._id}
                            className="text-grey-1 text-[12px] cursor-pointer"
                          >
                            {collection.title}
                          </p>
                        ))}
                      </div>
                    </Link>
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
    </div>
  );
};

export default NavigationLinks;
