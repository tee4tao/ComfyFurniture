import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import MotionOverlay from "./MotionOverlay";
import Image from "next/image";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

const RelatedProducts = ({ newData }: { newData: product[] }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const router = useRouter();
  return (
    <article className="w-full flex flex-col items-center  border-t border-t-gray-300 mt-8 p-2 pt-8 md:p-6 ">
      <div className="container flex flex-col flex-center">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8">
          {newData.slice(0, 4).map((product) => {
            return <ProductCard product={product} key={product._id} />;
          })}
        </div>
        <Carousel
          plugins={[plugin.current]}
          className="w-3/4 max-w-xs md:hidden"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {newData.slice(0, 4).map((product, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div
                        className="w-full relative"
                        onMouseEnter={() => setShowOverlay(true)}
                        onMouseLeave={() => setShowOverlay(false)}
                      >
                        <MotionOverlay
                          slug={product.slug.current}
                          showOverlay={showOverlay}
                          product={product}
                        />
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="object-cover w-full rounded-t-lg"
                        />
                        <div className="bg-[#F4F5F7] p-2 rounded-b-lg space-y-2 h-40">
                          <h2 className="text-2xl font-semibold">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 font-semibold">
                            {product.details}
                          </p>
                          <p className="font-semibold text-lg ">
                            #{product.price}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Button
          onClick={() => router.push("/shop")}
          className="mt-4 bg-transparent text-primary rounded-none border-2 hover:text-white font-bold text-base"
        >
          Show More
        </Button>
      </div>
    </article>
  );
};

export default RelatedProducts;
