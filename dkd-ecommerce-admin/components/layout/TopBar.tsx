"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { navLinks } from "@/lib/constants";
import { signOut, useSession } from "next-auth/react";
import OrderNotification from "../custom ui/OrderNotif";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!session) {
    return null;
  }

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-white shadow-2xl lg:hidden">
      <Image src="/logo.png" alt="logo" width={100} height={30} />

      <div className="flex gap-8 max-lg:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <div className="lg:hidden" >
          <OrderNotification />
        </div>

        <div ref={dropdownRef}>
          <Menu
            className="cursor-pointer lg:hidden text-blue-1"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />
          {dropdownMenu && (
            <div className="absolute top-10 right-0 flex flex-col gap-8 p-5 bg-grey-2 shadow-xl rounded-lg">
              {navLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.label}
                  className={`flex items-center gap-4 text-body-medium ${
                    pathname === link.url
                      ? "text-blue-1 underline"
                      : "text-gray-500"
                  }`}
                >
                  {link.icon} <p>{link.label}</p>
                </Link>
              ))}
              <Link
                className="text-left flex items-center gap-2 text-body-medium text-red-3"
                href="#"
                onClick={() => signOut()}
              >
                <LogOut />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
