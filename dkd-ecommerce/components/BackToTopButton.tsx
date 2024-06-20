"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-5 left-5 z-50 p-3 rounded-full bg-red-500 text-white shadow-lg transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Back to Top"
      >
        <ArrowUp className="h-5 w-5" />
        {/* <p className="text-[10px]">scroll to top</p> */}
      </button>

      <Link
        href="https://www.facebook.com/messages/t/140587082758830"
        target="_blank"
        className={`fixed bottom-5 right-5 z-50 p-1 rounded-full text-white shadow-lg transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          height="55px"
          version="1.1"
          viewBox="0 0 1024 1024"
          width="55px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <defs>
            <radialGradient
              cx="19.2474387%"
              cy="99.4651948%"
              fx="19.2474387%"
              fy="99.4651948%"
              id="radialGradient-1"
              r="108.959588%"
            >
              <stop offset="0%" stop-color="#0099FF" />
              <stop offset="60.9753877%" stop-color="#A033FF" />
              <stop offset="93.482299%" stop-color="#FF5280" />
              <stop offset="100%" stop-color="#FF7061" />
            </radialGradient>
          </defs>
          <g
            fill="none"
            fill-rule="evenodd"
            id="logo"
            stroke="none"
            stroke-width="1"
          >
            <rect
              fill="#FFFFFF"
              fill-opacity="0"
              height="1024"
              id="bounding-box"
              width="1024"
              x="0"
              y="0"
            />
            <g id="logo">
              <path
                d="M512,122 C286.668,122 112,287.056 112,510 C112,626.6144 159.792,727.3824 237.6224,796.984 C244.156,802.832 248.1,811.024 248.368,819.792 L250.5464,890.944 C251.2424,913.64 274.6856,928.408 295.4536,919.24 L374.848,884.192 C381.5784,881.224 389.12,880.672 396.212,882.624 C432.696,892.656 471.5264,898 512,898 C737.332,898 912,732.944 912,510 C912,287.056 737.332,122 512,122 Z"
                fill="url(#radialGradient-1)"
                id="Path"
              />
              <path
                d="M271.8016,623.4688 L389.3016,437.0528 C407.992,407.3968 448.016,400.0128 476.06,421.0448 L569.5136,491.1352 C578.088,497.5672 589.8856,497.5328 598.424,491.0528 L724.6376,395.2648 C741.484,382.4808 763.4736,402.6408 752.2,420.5312 L634.7,606.9488 C616.008,636.6032 575.984,643.9888 547.9416,622.9552 L454.4856,552.8632 C445.912,546.4328 434.1136,546.4672 425.576,552.9472 L299.3616,648.7352 C282.516,661.5184 260.5256,641.3584 271.8016,623.4688 Z"
                fill="#FFFFFF"
                id="Path"
              />
            </g>
          </g>
        </svg>
      </Link>
    </>
  );
};

export default BackToTopButton;
