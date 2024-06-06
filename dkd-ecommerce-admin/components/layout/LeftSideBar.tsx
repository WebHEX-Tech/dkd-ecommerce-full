"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-0 flex flex-col gap-6 bg-blue-2 shadow-xl max-lg:hidden">
      <div className="flex flex-col justify-center items-center py-5">
        <h2 className="font-bold">Admin</h2>
        <Image src="/logo.png" alt="logo" width={150} height={70} />
      </div>

      <div className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 px-10 py-4 text-body-medium transform transition duration-300 hover:bg-white hover:text-blue-1 ${
              pathname === link.url ? "text-white-1 bg-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 px-10 py-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
