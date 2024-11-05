"use client";
import { setupImages } from "@/constants";
import useMeasure from "react-use-measure";

import Card from "./Card";
import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";

const HomePageMotion = () => {
  // const targetRef = useRef<HTMLDivElement | null>(null);
  // const { scrollYProgress } = useScroll({
  //   target: targetRef,
  // });

  // const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  const [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    // let controls;
    const finalPosition = -width / 2 - 8;

    let controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 25,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      // duration: duration * (1 - yTranslation.get() / finalPosition),
      // onComplete: () => {
      //   setMustFinish(false);
      //   setRerender(!rerender);
      // },
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <section className="container flex flex-col items-center px-2 overflow-x-hidden max-[669px]:w-[95vw]">
      <motion.div
        className="flex gap-4 w-full "
        ref={ref}
        style={{ x: xTranslation }}
      >
        {[...setupImages, ...setupImages].map((image, index) => (
          <Card image={image} key={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default HomePageMotion;
