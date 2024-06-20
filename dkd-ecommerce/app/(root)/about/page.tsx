"use client";
import { Link } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-8">
        <h1 className="text-3xl font-bold mb-4">About DKD Food Solution</h1>
        <p className="text-lg text-gray-800 mb-6">
          DKD Food Solution is proud to be the top food and beverage distributor
          in Zamboanga City, dedicated to delivering high-quality products and
          exceptional service. Founded with a mission to cater to the diverse
          culinary needs of our vibrant community, we offer a wide selection of
          food supplies, from fresh produce to unique gourmet items. Our goal is
          to ensure that you always have access to the best ingredients for your
          culinary creations.
        </p>
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <ul className="list-disc pl-6 text-lg text-gray-800">
          <li>Supply of high-quality food and beverage products</li>
          <li>Exceptional customer service</li>
          <li>Customized solutions for culinary businesses</li>
          <li>Timely delivery and logistics support</li>
          <li>Continuous product innovation and sourcing</li>
        </ul>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-gradient-to-t w-fit from-red-1 to-red-4 text-white text-lg px-6 py-3 border border-red-6 rounded-lg inline-block transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-2xl text-nowrap"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
