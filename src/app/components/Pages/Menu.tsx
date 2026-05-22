'use client';

import { useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import styles from "../../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";

const menuData = [
  {
    category: "Matchas/Komorebis",
    description: "Premium ceremonial grade matcha whisked to perfection.",
    items: [
      { name: "Midori", price: "₹280", description: "classical matcha latte" },
      { name: "Dulcet", price: "₹320", description: "matcha latte with a splash of vanilla/lavender" },
      { name: "Verve", price: "₹340", description: "matcha latte with a splash of citrus/tonic" },
      { name: "Umi", price: "₹320", description: "double salted matcha latte" },
      { name: "Terra", price: "₹300", description: "earth matcha latte" },
      { name: "Haur", price: "₹350", description: "mango matcha latte" },
    ]
  },
  {
    category: "Lattes/Limerences",
    description: "Chilled perfection for those sun-soaked afternoons.",
    items: [
      { name: "Moxie", price: "₹300", description: "sweetened iced latte with an extra shot" },
      { name: "Sway", price: "₹320", description: "caramel iced latte" },
      { name: "Yuan", price: "₹340", description: "sea-salt cream cold brew" },
    ]
  },
  {
    category: "Hot Coffees/Hiraeth",
    description: "Artisanal roasts served warm for a cozy embrace.",
    items: [
      { name: "Anam", price: "₹240", description: "classic flat white" },
      { name: "Saudade", price: "₹290", description: "dark chocolate mocha" },
      { name: "Mettle", price: "₹210", description: "strong black americano" },
    ]
  }
];

const BookIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    className="w-5 h-5 text-[#E4C89D] hover:text-[#570000] transition-colors"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const renderCategoryHeader = (category: string) => {
  const parts = category.split('/');
  if (parts.length === 2) {
    const [first, second] = parts;
    let dictWord = '';
    if (second.toLowerCase().includes('komorebi')) dictWord = 'komorebi';
    else if (second.toLowerCase().includes('limerence')) dictWord = 'limerence';
    else if (second.toLowerCase().includes('hiraeth')) dictWord = 'hiraeth';

    return (
      <span className="flex items-center gap-1">
        <span>{first}/</span>
        <span className="inline-flex items-center gap-3">
          {second}
          {dictWord && (
            <Link 
              href={`/dictionary#${dictWord}`} 
              onClick={(e) => e.stopPropagation()} 
              title={`View ${dictWord} in Dictionary`}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-[#570000]/10 transition-colors"
            >
              <BookIcon />
            </Link>
          )}
        </span>
      </span>
    );
  }
  return <span>{category}</span>;
};

const renderItemName = (name: string) => {
  let dictWord = '';
  if (name.toLowerCase() === 'saudade') dictWord = 'saudade';
  
  if (dictWord) {
    return (
      <span className="inline-flex items-center gap-3">
        <span>{name}</span>
        <Link 
          href={`/dictionary#${dictWord}`} 
          onClick={(e) => e.stopPropagation()}
          title={`View ${dictWord} in Dictionary`}
          className="inline-flex items-center justify-center p-1 rounded-full hover:bg-[#570000]/10 transition-colors"
        >
          <BookIcon />
        </Link>
      </span>
    );
  }
  return <span>{name}</span>;
};

export default function Menu() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="relative min-h-screen text-white pb-8 md:pb-24">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-[20vh] px-[2%] mb-12">
        <div className="relative z-10 -mt-[72px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className={styles.aboutTitle} style={{ color: '#570000' }}>The Menu</h1>
            <Link href="/dictionary">
              <button className={styles.discoverButton + " mt-8 !text-[13px] !py-2 !px-2 !tracking-[0.4em]"}>
                Explore the Dictionary
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="px-[2%] pb-12 md:pb-32">
        <div className="max-w-4xl space-y-12">
          {menuData.map((section, sectionIdx) => {
            const isExpanded = expandedSections[section.category];

            // Stronger color mapping for high visibility (borderless)
            const sectionStyles: Record<string, { backgroundColor: string }> = {
              "Matchas/Komorebis": {
                backgroundColor: "rgba(97, 122, 79, 0.2)", // Sage Green
              },
              "Lattes/Limerences": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              },
              "Hot Coffees/Hiraeth": {
                backgroundColor: "rgba(109, 76, 65, 0.2)", // Earthy Brown
              },
            };

            const currentStyle = sectionStyles[section.category] || sectionStyles["Lattes/Limerences"];

            return (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: currentStyle.backgroundColor,
                }}
                className="flex flex-col backdrop-blur-2xl rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.category)}
                  className="p-8 text-left w-full group cursor-pointer"
                >
                  <div className="border-l-2 border-[#570000]/30 pl-6">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-[#570000] font-[family-name:var(--font-eb-garamond)] text-3xl italic group-hover:text-black transition-colors leading-none flex items-center gap-1.5">
                        {renderCategoryHeader(section.category)}
                      </h2>
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={isExpanded ? 'minus' : 'plus'}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="text-[#570000] text-3xl font-light absolute"
                          >
                            {isExpanded ? '−' : '+'}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-dm-mono)] text-sm uppercase tracking-[0.3em] text-white font-medium mt-2">
                      {section.description}
                    </p>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-14 pb-12 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 border-t border-white/5 pt-8">
                          {section.items.map((item) => (
                            <div key={item.name} className="group flex flex-col">
                              <div className="flex justify-between items-baseline mb-2 border-b border-[#570000]/10 pb-2 group-hover:border-[#570000]/30 transition-colors">
                                <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl text-[#570000] group-hover:text-black transition-colors duration-300 flex items-center gap-1.5">
                                  {renderItemName(item.name)}
                                </h3>
                                <span className="font-[family-name:var(--font-dm-mono)] text-base text-[#570000] font-light">
                                  {item.price}
                                </span>
                              </div>
                              <p className="font-[family-name:var(--font-dm-mono)] text-base text-white font-normal leading-relaxed group-hover:opacity-80 transition-opacity duration-300">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                        {section.category === "Matchas/Komorebis" && (
                          <p className="mt-10 font-[family-name:var(--font-dm-mono)] text-sm text-[#570000] uppercase tracking-wider">
                            * ALL OUR KOMOREBIS ARE SERVED WITH OAT MILK
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Vertical Japanese Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden xl:flex fixed right-[2%] top-[20vh] h-[60vh] flex-col justify-between py-2 pointer-events-none"
      >
        {"至福のひとときをお届けします".split("").map((char, index) => (
          <span key={index} className={styles.verticalJapaneseChar}>
            {char}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
