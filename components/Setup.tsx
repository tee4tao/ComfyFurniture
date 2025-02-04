"use client";
import Image from "next/image";
import { setupImages } from "@/constants";
import { motion } from "framer-motion";

const Setup = () => {
  return (
    <section className="container flex flex-col items-center px-2">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mb-4"
      >
        <p className="text-gray-600 text-sm">Share your setup with</p>
        <h2 className="text-2xl font-bold tracking-wider">#ComfyFurniture</h2>
      </motion.div>
      <div className=" gap-5 lg:gap-8 columns-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-5 md:[&>img:not(:first-child)]:mt-8">
        {setupImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: index % 2 === 0 ? 100 : 0,
              x: index % 2 === 0 ? 0 : -100,
            }}
            whileInView={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Image
              // key={index}
              src={image}
              alt="setup images"
              width={200}
              height={200}
              priority={true}
              className="object-cover w-full"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Setup;
