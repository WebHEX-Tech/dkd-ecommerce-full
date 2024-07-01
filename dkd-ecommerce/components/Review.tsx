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
    username: "Da'yhang Ar-Liza",
    content:
      "Super lifesaver ang DKD Marketing. Nag-ikot na ako sa Zamboanga para maghanap ng needs ko for baking. Maraming salamat DKD Marketing.",
  },
  {
    id: 2,
    username: "Abzer Isahac Khama",
    content:
      "Best choices of products for starting a business.👌",
  },
  {
    id: 3,
    username: "Fatima Sheila Bairulla",
    content:
      "Thumbs up! Very accomodating ang mga staffs. Safe na safe dumating ang mga orders ko.😊",
  },
  {
    id: 4,
    username: "Nolasco Terez",
    content:
      "Negosyong affordable prices.👍👍",
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
                        <p className="font-bold text-gray-800 text-[14px] md:text-[18px]">
                          ⭐⭐⭐⭐⭐
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
