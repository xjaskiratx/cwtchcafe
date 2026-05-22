'use client';

import Link from "next/link";
import Navbar from "../Navbar";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-start pt-[20vh] px-[2%]">
        <div className="relative w-full -mt-[72px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <main className="flex flex-col text-white">
              <h1 className={styles.heroTitle}>
                <span>For the love,</span>
                <span>longing</span>
                <span>and coffee.</span>
              </h1>
            </main>

            <div className="mt-12 text-[#E4C89D]">
              <div className={styles.heroSubtitle}>
                <span>a cup,</span>
                <span>a feeling,</span>
                <span>a pause...</span>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/about">
                <button className={styles.discoverButton}>
                  Discover More
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden md:flex absolute right-0 top-0 h-full flex-col justify-between py-2 pointer-events-none"
          >
            {"日曜日だけの、心の避難所。".split("").map((char, index) => (
              <span key={index} className={styles.verticalJapaneseChar}>
                {char}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
