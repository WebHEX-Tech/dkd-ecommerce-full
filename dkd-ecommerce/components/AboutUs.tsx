"use client";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-auto md:h-[50vh] overflow-hidden px-4">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/about-us-1.jpg"
          alt="about-us-1"
          className="object-cover w-full h-full filter blur-[3px]"
        />
      </div>
      <div className="relative flex flex-col items-center justify-center z-10 bg-black bg-opacity-50 my-5 p-8 md:p-12 rounded-md shadow-lg">
        <h2 className="text-[1.5rem] md:text-[2rem] font-bold text-white text-center">
          About DKD Food Solution
        </h2>
        <p className="text-white text-[14px] md:text-[18px] px-0 py-2 md:px-20 text-justify md:text-center">
          DKD Food Solution is proud to be the top food and beverage distributor
          in Zamboanga City, dedicated to delivering high-quality products and
          exceptional service. Founded with a mission to cater to the diverse
          culinary needs of our vibrant community, we offer a wide selection of
          food supplies, from fresh produce to unique gourmet items. Our goal is
          to ensure that you always have access to the best ingredients for your
          culinary creations.
        </p>
        <Link
          href="/about-us"
          className="bg-gradient-to-t w-fit from-red-1 to-red-4 text-white text-[14px] px-4 py-2 border border-red-6 rounded-lg transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl text-nowrap mt-6"
        >
          More About
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
