import { Clock, Mail, MapPinned, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-red-100 text-red-6 shadow-2xl mt-[10.5rem]">
        <div className="flex flex-col lg:flex-row justify-between gap-8 my-10 py-10 px-4 md:px-14">

          <div className="w-full lg:w-1/3">
            <h3 className="text-[20px] font-extrabold mb-4">Contact Details</h3>
            <ul className="space-y-2">
              <li className="flex gap-2"><Phone /> 0917 715 1474</li>
              <li className="flex gap-2"><Mail /> dkdmarketingcorp21@gmail.com</li>
              <li className="flex gap-2"><MapPinned className="w-7 h-7"/> Putik, Maria Clara Lorenzo Lobregat Highway, <br/> Zamboanga City, Zamboanga del Sur</li>
              <li className="flex gap-2"><Clock /> Mon-Sat, 8am-5pm</li>
            </ul>
          </div>
          
          <div className="w-full lg:w-1/3">
            <h3 className="text-[20px] font-extrabold mb-4">Connect with Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.facebook.com/dkdmarketingzc" target="_blank" className="hover:underline">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/dkd-marketing-zamboanga/mycompany/" target="_blank" className="hover:underline">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
  
          <div className="w-full lg:w-1/3">
            <h3 className="text-[20px] font-extrabold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Products
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
  