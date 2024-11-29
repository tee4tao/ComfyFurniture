"use client";
import React, { useState } from "react";
import { CiShare2, CiHeart, CiRead } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const ProductCard = ({ product }: { product: product }) => {
  const slug = product.slug.current;

  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
            <motion.div
              className="flex flex-col flex-center  z-10 "
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <Button className="text-primary bg-white hover:text-white w-32 mb-4">
                Add to cart
              </Button>
              <div className="text-white flex flex-wrap flex-center gap-3">
                <Link href={`/shop/${slug}`} className="flex items-center">
                  <CiRead /> <span>View</span>
                </Link>
                <Link href={"/"} className="flex items-center">
                  <CiShare2 /> <span>Share</span>
                </Link>
                <Link href={"/"} className="flex items-center">
                  <CiHeart /> <span>Like</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        className="object-cover w-full rounded-t-lg"
      />
      <div className="bg-[#F4F5F7] p-2 rounded-b-lg space-y-2 h-40">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 font-semibold">{product.details}</p>
        <p className="font-semibold text-lg ">#{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
