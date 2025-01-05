import Image from "next/image";
import React, { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ image }: { image: string }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden h-[150px] min-w-[150px] bg-slate-400 rounded-xl flex justify-center items-center"
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
            <motion.h1
              className="bg-white font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch] hover:opacity-75"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span>explore now</span>
              <FaCircleArrowRight className="h-4 w-4" />
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <Image
        src={image}
        alt="setup images"
        width={200}
        height={200}
        priority={true}
        className="object-cover w-full h-full"
        // max-[669px]:h-[10rem]
      />
    </motion.div>
  );
};

export default Card;
