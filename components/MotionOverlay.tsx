import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { CiHeart, CiRead, CiShare2 } from "react-icons/ci";

const MotionOverlay = ({
  slug,
  showOverlay,
}: {
  slug: string;
  showOverlay: boolean;
}) => {
  return (
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
  );
};

export default MotionOverlay;
