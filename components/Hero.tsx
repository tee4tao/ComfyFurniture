import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section>
      <div className="relative">
        <Image
          src={
            "/images/scandinavian-interior-mockup-wall-decal-background 1.png"
          }
          alt="hero image"
          width={1000}
          height={1000}
          className="w-screen min-[1672px]:h-[90vh]"
        />
        <div className="bg-bannerBg w-52 sm:w-96 xl:w-[28rem] absolute top-2 sm:top-12 right-2 xl:top-64 xl:right-60 pb-1 max-sm:px-3 sm:p-4 sm:space-y-4 rounded-md">
          <p>New Arrival</p>
          <h1 className="sm:flex sm:flex-col capitalize text-lg sm:text-4xl font-semibold sm:font-bold text-primary max-sm:mb-2">
            <span>discover our </span>
            <span>new collection</span>
          </h1>
          <p className="text-gray-600 max-sm:hidden">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            nobis.
          </p>
          <Button className="text-white ">Buy now</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
