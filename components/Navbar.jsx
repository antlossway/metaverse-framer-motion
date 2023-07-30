"use client";
import { motion } from "framer-motion";
import styles from "../styles";
import { navVariants } from "../utils/motion";
import Image from "next/image";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    {/* self-closing div, just to display gradient */}
    <div className="absolute w-1/2 inset-0 gradient-01" />

    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8
    `}
    >
      <Image
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <h2 className="font-extrabold text-white text-2xl leading-7">
        METAVERSES
      </h2>
      <Image
        src="/menu.svg"
        alt="menu"
        width={24}
        height={24}
        className="object-contain"
      />
    </div>
  </motion.nav>
);

export default Navbar;
