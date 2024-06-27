"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import { Separator } from "../ui/separator";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

const LeftSideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session) {
    return null; 
  }

  return (
    <div className="h-screen left-0 top-0 sticky p-0 flex flex-col gap-6 bg-white shadow-2xl max-lg:hidden">
      <div className="flex flex-col justify-center items-center pt-5">
        <Image src="/standalone-logo.png" alt="logo" width={150} height={70} />
        <h2 className="font-bold">Admin</h2>
      </div>

      <Separator className="bg-gray-300" />

      <div className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex items-center gap-4 px-10 py-4 text-body-medium transform transition duration-300 hover:bg-blue-6 ${
              pathname === link.url ? "text-blue-1 bg-blue-2" : "text-blue-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <Separator className="bg-gray-300" />

      <div className="flex gap-4 px-10 py-2 text-body-medium text-blue-1 items-center">
        <p> Manage Accounts</p>
      </div>
      <Link
        className="text-left flex items-center gap-2 px-10 py-2 text-body-medium text-red-3"
        href="#"
        onClick={()=>signOut()}
      >
        <LogOut />
        Logout
      </Link>
    </div>
  );
};

export default LeftSideBar;
