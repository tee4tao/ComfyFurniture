"use client";
import { setupImages } from "@/constants";
import useMeasure from "react-use-measure";

import Card from "./Card";
import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HomePageMotion = () => {
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);

  const [ref, { width }] = useMeasure();

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    const finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls.stop;
  }, [xTranslation, width, duration, mustFinish, rerender]);

  return (
    <section className="container flex flex-col items-center px-2 overflow-x-hidden max-[669px]:w-[95vw]">
      <motion.div
        className="flex gap-4"
        ref={ref}
        style={{ x: xTranslation }}
        onMouseEnter={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION);
        }}
        onMouseLeave={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
      >
        {[...setupImages, ...setupImages, ...setupImages, ...setupImages].map(
          (image, index) => (
            <Card image={image} key={index} />
          )
        )}
      </motion.div>
    </section>
  );
};

export default HomePageMotion;
