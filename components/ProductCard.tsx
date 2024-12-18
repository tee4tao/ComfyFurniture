"use client";
import React, { useState } from "react";
import Image from "next/image";

import MotionOverlay from "./MotionOverlay";

const ProductCard = ({ product }: { product: product }) => {
  const slug = product.slug.current;

  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <MotionOverlay slug={slug} showOverlay={showOverlay} />
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        priority={true}
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
