'use client';

import Navbar from "../Navbar";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      {/* Hero Section for About */}
      <section className="relative h-screen w-full flex flex-col justify-start pt-[20vh] px-[2%] overflow-hidden">
        <div className="relative z-10 -mt-[72px]">
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.aboutTitle + " mb-8"}>Our Sanctuary</h1>
            <p className={styles.aboutText + " max-w-4xl"}>
              Cwtch Cafe is more than just a place for coffee. It&apos;s a sanctuary for the restless, 
              a corner for the dreamers, and a home for those who find beauty in the quiet moments.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
