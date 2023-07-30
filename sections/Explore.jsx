"use client";
import { motion } from "framer-motion";
import { ExploreCard, TitleText, TypingText } from "../components";
import styles from "../styles";
import { staggerContainer } from "../utils/motion";
import { useState } from "react";
import { exploreWorlds } from "../constants";

const Explore = () => {
  const [active, setActive] = useState("world-2");

  return (
    <section className={`${styles.paddings}`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| The World" textStyles="text-center" />
        <TitleText
          title={
            <>
              Choose the world you want
              <br className="hidden md:block" /> to explore{" "}
            </>
          }
          textStyles="text-center"
        />

        <div className="mt-[50px] min-h-[70vh] flex flex-col gap-5 lg:flex-row">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              index={index}
              active={active}
              handleClick={setActive}
              {...world}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
