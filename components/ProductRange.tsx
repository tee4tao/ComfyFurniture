"use client";
import { rangeInfo } from "@/constants";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const ProductRange = () => {
  return (
    <motion.section
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="container flex flex-col items-center px-2"
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-4"
      >
        <h2 className="text-2xl font-bold">Browse The Range</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </motion.div>
      <div className="flex gap-4 xl:gap-6">
        {rangeInfo.map((item, index) => (
          <div key={index} className="text-center space-y-2">
            <Image
              src={item.image}
              alt={item.title}
              width={384}
              height={483}
              priority={true}
              // className="object-cover md:w-96"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProductRange;
