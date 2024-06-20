"use client";
import React from "react";
import { User } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const reviews = [
  {
    id: 1,
    username: "John Doe",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    username: "Jane Smith",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    username: "Alice Johnson",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 4,
    username: "Bob Anderson",
    content:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    username: "Emily Brown",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const ReviewsCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  return (
    <>
      <div className="bg-red-4 text-white pt-10 mt-16">
        <h2 className="text-[2rem] font-bold pb-4 text-center">Reviews</h2>

        <div className="w-full flex bg-red-4 justify-center pb-14">
          <Carousel
            plugins={[plugin.current]}
            className=" w-3/4 h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white border border-gray-200 rounded-lg p-6 h-[200px]">
                    <div className="flex items-center mb-4">
                      <User className="w-8 h-8 text-red-4" />
                      <div className="ml-2">
                        <p className="font-bold text-gray-800 text-[14px] md:text-[18px]">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-[14px] md:text-[18px]">
                      {review.content}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ReviewsCarousel;
