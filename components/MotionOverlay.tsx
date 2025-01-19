import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { CiHeart, CiRead, CiShare2 } from "react-icons/ci";
import { useCart } from "@/context/CartProvider";
import { useRouter } from "next/navigation";
import { RWebShare } from "react-web-share";

const MotionOverlay = ({
  slug,
  showOverlay,
  product,
}: {
  slug: string;
  showOverlay: boolean;
  product: product;
}) => {
  const { updateSavedItems, updateCart } = useCart();
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
            <Button
              className="text-primary bg-white hover:text-white w-32 mb-4"
              onClick={() => updateCart(product, 1)}
            >
              Add to cart
            </Button>
            <div className="text-white flex flex-wrap flex-center gap-3">
              <button
                className="flex items-center"
                onClick={() => router.push(`/shop/${slug}`)}
              >
                <CiRead /> <span>View</span>
              </button>
              <RWebShare
                data={{
                  text: `Check out this product I found:`,
                  url: `${process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL}/shop/${slug}`,
                  title: `${slug}`,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button className="flex items-center">
                  <CiShare2 /> <span>Share</span>
                </button>
              </RWebShare>
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
