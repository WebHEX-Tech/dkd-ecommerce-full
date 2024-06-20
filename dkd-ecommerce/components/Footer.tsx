import {
  Clock,
  Facebook,
  Linkedin,
  Mail,
  MapPinned,
  Phone,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-red-100 text-red-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row justify-between gap-14 py-10 px-4 md:px-14">
        <div className="w-full lg:w-1/3">
          <h3 className="text-[20px] font-extrabold mb-4">Contact Details</h3>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <Phone /> 0917 715 1474
            </li>
            <li className="flex gap-2">
              <Mail /> dkdmarketingcorp21@gmail.com
            </li>
            <li className="flex gap-2">
              <div className="w-6 h-6 flex-shrink-0">
                <MapPinned />
              </div>
              Fronting Smart Kids Learning Center, Maria Clara Lorenzo Lobregat
              Highway, Zamboanga City, Zamboanga del Sur
            </li>
            <li className="flex gap-2">
              <Clock /> Mon-Sat, 8am-5pm
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-1/3">
          <h3 className="text-[20px] font-extrabold mb-4">Connect with Us</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://www.facebook.com/dkdmarketingzc"
                target="_blank"
                className="flex gap-2 hover:underline"
              >
                <Facebook /> Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/dkd-marketing-zamboanga/mycompany/"
                target="_blank"
                className="flex gap-2 hover:underline"
              >
                <Linkedin /> LinkedIn
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-1/3">
          <h3 className="text-[20px] font-extrabold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/all-products" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Services
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-red-6 text-white text-center p-4">
        DKD Marketing © 2024. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
