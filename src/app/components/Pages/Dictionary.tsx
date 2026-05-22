'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";

const dictionaryData = [
  {
    word: "Anam",
    phonetic: "/ˈanˠəmˠ/",
    origin: "Irish",
    definition: "Soul. The essence of a person; a term of endearment reflecting deep, soulful connection."
  },
  {
    word: "Cwtch",
    phonetic: "/kʊtʃ/",
    origin: "Welsh",
    definition: "More than just a hug. It's a sanctuary, a safe place, a cozy embrace that makes you feel protected and home."
  },
  {
    word: "Dulcet",
    phonetic: "/ˈdʌlsɪt/",
    origin: "English",
    definition: "Sweet and soothing. Often used to describe a sound that is soft, pleasant, and melodious to the ear."
  },
  {
    word: "Haur",
    phonetic: "/hɔːr/",
    origin: "Basque",
    definition: "Child. Symbolizing innocence, purity, and the sweet beginnings of life."
  },
  {
    word: "Hiraeth",
    phonetic: "/hiraɪ̯θ/",
    origin: "Welsh",
    definition: "A deep, soulful longing for a home or a place that no longer exists, or perhaps never was. A nostalgia for the unattainable."
  },
  {
    word: "Komorebi",
    phonetic: "/ko-mo-re-bee/",
    origin: "Japanese",
    definition: "The beautiful, scattered sunlight that filters through the leaves of trees, creating a dance of light and shadow."
  },
  {
    word: "Limerence",
    phonetic: "/ˈlɪmɪrəns/",
    origin: "English",
    definition: "The state of being infatuated or obsessed with another person, typically experienced involuntarily and involving a strong desire for reciprocation."
  },
  {
    word: "Mettle",
    phonetic: "/ˈmɛtl/",
    origin: "English",
    definition: "A person's ability to cope well with difficulties; resilience and spirited determination."
  },
  {
    word: "Midori",
    phonetic: "/miˈdoɾi/",
    origin: "Japanese",
    definition: "Green. A representation of nature, vitality, and the lush essence of fresh tea leaves."
  },
  {
    word: "Moxie",
    phonetic: "/ˈmɒksi/",
    origin: "English",
    definition: "Force of character, determination, or nerve. A vibrant energy and courageous spirit."
  },
  {
    word: "Saudade",
    phonetic: "/sawˈdadʒi/",
    origin: "Portuguese",
    definition: "A profound emotional state of nostalgic or profound melancholic longing for an absent something or someone that one cares for and/or loves."
  },
  {
    word: "Sway",
    phonetic: "/sweɪ/",
    origin: "English",
    definition: "A rhythmic movement from side to side; an influence or gentle guiding force."
  },
  {
    word: "Terra",
    phonetic: "/ˈtɛrə/",
    origin: "Latin",
    definition: "Earth or land. Denoting groundedness, natural elements, and organic richness."
  },
  {
    word: "Umi",
    phonetic: "/ˈumi/",
    origin: "Japanese",
    definition: "Sea or ocean. Capturing the vast, rhythmic, and soothing qualities of the waters."
  },
  {
    word: "Verve",
    phonetic: "/vɜːv/",
    origin: "French",
    definition: "Vigor and spirit or enthusiasm. A lively, dynamic expression of energy."
  },
  {
    word: "Yuan",
    phonetic: "/jwæn/",
    origin: "Chinese",
    definition: "Destiny or serendipity. The mysterious force that brings people together by fate."
  }
];

export default function Dictionary() {
  const router = useRouter();
  const [cameFromApp, setCameFromApp] = useState(false);

  useEffect(() => {
    // Detect if the user came from another page in our app
    if (document.referrer && document.referrer.includes(window.location.host)) {
      setCameFromApp(true);
    }

    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace("#", "").toLowerCase();
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150);
        }
      }
    };

    // Run on mount
    handleScroll();

    // Listen for hash changes
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-white pb-24">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-[20vh] px-[2%] mb-16 ">
        <div className="relative z-10 -mt-[72px] ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className={`${styles.aboutTitle}`} style={{ color: '#570000' }}>The Dictionary</h1>
            <p className="font-[family-name:var(--font-dm-mono)] text-base uppercase tracking-[0.7em] text-[#570000] font-bold mt-6">
              Words of the Sanctuary
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dictionary Content */}
      <section className="px-[2%] pb-32">
        <div className="max-w-2xl space-y-6">
          {dictionaryData.map((item, index) => (
            <motion.div
              key={item.word}
              id={item.word.toLowerCase()}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
              className="group scroll-mt-40 backdrop-blur-2xl rounded-xl overflow-hidden p-6 md:p-8"
            >
              <div>
                <div className="flex flex-row items-end gap-4 mb-3">
                  <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-eb-garamond)] italic text-[#570000] group-hover:text-black transition-colors duration-500 leading-none">
                    {item.word}
                  </h2>
                  <span className="font-[family-name:var(--font-dm-mono)] text-sm md:text-base text-[#E5C290] font-semibold">
                    {item.phonetic} — {item.origin}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-dm-mono)] text-base text-white/80 leading-relaxed max-w-2xl">
                  {item.definition}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vertical Japanese Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hidden xl:flex fixed right-[2%] top-[20vh] h-[60vh] flex-col justify-between py-2 pointer-events-none"
      >
        {"言葉の聖域".split("").map((char, index) => (
          <span key={index} className={`${styles.verticalJapaneseChar}`}>
            {char}
          </span>
        ))}
      </motion.div>

      {/* Back to Menu Floating Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button 
          onClick={() => cameFromApp ? router.back() : router.push('/menu')}
          className="font-[family-name:var(--font-dm-mono)] bg-[#570000] text-[#E4C89D] px-8 py-3 rounded-none uppercase tracking-widest text-xs hover:bg-[#E4C89D] hover:text-[#570000] transition-colors shadow-2xl border border-[#570000] font-bold"
        >
          {cameFromApp ? 'Back to Menu' : 'Go to Menu'}
        </button>
      </div>
    </div>
  );
}
