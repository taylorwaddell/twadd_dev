"use client"; // this is a client component 👈🏽

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { MouseEventHandler, useRef } from "react";

import { Inter } from "next/font/google";
import Tabs from "~/public/Tabs";
import styles from "./page.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const controls = useDragControls();

  return (
    <>
      <motion.main className={styles.main}>
        <AnimatePresence>
          <motion.div
            className={styles.textWrapper}
            initial={{ width: "375px" }}
            animate={{ width: "275px" }}
            transition={{ type: "spring", stiffness: 100 }}
            whileTap={{ scale: 0.9, cursor: "grabbing" }}
            drag={true}
            dragControls={controls}
            dragConstraints={{
              top: 1,
              left: 1,
              right: 1,
              bottom: 1,
            }}
            style={{ touchAction: "none" }}
          >
            <motion.h1 className={`${styles.h1} ${inter.className}`}>
              twadd.dev coming soon
            </motion.h1>
          </motion.div>
        </AnimatePresence>
      </motion.main>
      <div className={`${styles.tabsWrapper} ${inter.className}`}>
        <Tabs />
      </div>
    </>
  );
}
