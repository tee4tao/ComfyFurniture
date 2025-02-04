"use client";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const OurProducts = ({ data }: { data: product[] }) => {
  const router = useRouter();
  return (
    <section className="container flex flex-col items-center px-2">
      <motion.h2
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-2xl font-bold text-center mb-4"
      >
        Our Products
      </motion.h2>

      <motion.div
        // initial={{ scale: 0.5, opacity: 0 }}
        // whileInView={{ scale: 1, opacity: 1 }}
        // transition={{ duration: 1 }}
        className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2  gap-4"
      >
        {data.slice(0, 6).map((product, index) => {
          return (
            <ProductCard product={product} key={product._id} index={index} />
          );
        })}
      </motion.div>

      <Button
        onClick={() => router.push("/shop")}
        className="mt-4 bg-transparent text-primary rounded-none border-2 hover:text-white font-bold text-base"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Show More
        </motion.span>
      </Button>
    </section>
  );
};

export default OurProducts;
