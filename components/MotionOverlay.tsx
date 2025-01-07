import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { CiHeart, CiRead, CiShare2 } from "react-icons/ci";
import { useCart } from "@/context/CartProvider";
import { useRouter } from "next/navigation";

const MotionOverlay = ({
  slug,
  showOverlay,
  product,
}: {
  slug: string;
  showOverlay: boolean;
  product: product;
}) => {
  const { updateSavedItems } = useCart();
  const router = useRouter();
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
              <button
                className="flex items-center"
                onClick={() => router.push(`/shop/${slug}`)}
              >
                <CiRead /> <span>View</span>
              </button>
              <button className="flex items-center">
                <CiShare2 /> <span>Share</span>
              </button>
              <button
                className="flex items-center"
                onClick={() => updateSavedItems(product)}
              >
                <CiHeart /> <span>Like</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotionOverlay;
