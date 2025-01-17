"use client";
import React, { useState } from "react";
import Image from "next/image";

import MotionOverlay from "./MotionOverlay";
import { count } from "@/lib/utils";

const ProductCard = ({
  product,
  flex,
}: {
  product: product;
  flex?: boolean;
}) => {
  const slug = product.slug.current;

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <MotionOverlay slug={slug} showOverlay={showOverlay} product={product} />
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={200}
        height={200}
        priority={true}
        className={`${flex && "h-96"} object-cover w-full h-60 md:h-80 lg:h-96 rounded-t-lg`}
      />
      <div className="bg-[#F4F5F7] p-2 rounded-b-lg space-y-2 h-56 max-sm:h-64">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 font-semibold">
          {count(product.details) < 7
            ? `${product.details}`
            : `${product.details.slice(0, 50)}...`}
        </p>
        <p className="font-semibold text-lg ">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
