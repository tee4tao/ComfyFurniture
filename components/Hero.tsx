"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative">
        <Image
          src={
            "/images/scandinavian-interior-mockup-wall-decal-background 1.png"
          }
          alt="hero image"
          width={1000}
          height={1000}
          priority={true}
          className="w-screen min-[1672px]:h-[90vh]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-bannerBg w-52 sm:w-96 xl:w-[28rem] absolute top-2 sm:top-12 right-2 xl:top-64 xl:right-60 pb-1 max-sm:px-3 sm:p-4 sm:space-y-4 rounded-md"
        >
          <motion.p
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            New Arrival
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="sm:flex sm:flex-col capitalize text-lg sm:text-4xl font-semibold sm:font-bold text-primary max-sm:mb-2"
          >
            <span>discover our </span>
            <span>new collection</span>
          </motion.h1>
          <motion.p
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-gray-600 max-sm:hidden"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            nobis.
          </motion.p>
          <Button className="text-white ">
            <motion.span
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Buy now
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
