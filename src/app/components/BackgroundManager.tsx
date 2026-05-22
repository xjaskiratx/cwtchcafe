'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const backgrounds: Record<string, { desktop: string; mobile?: string }> = {
  '/': {
    desktop: '/images/hero-desktop.png',
    mobile: '/images/hero-mobile.png',
  },
  '/about': {
    desktop: '/images/about_desktop.png',
    mobile: '/images/about_mobile.png',
  },
  '/menu': {
    desktop: '/images/menu-bg.png',
  },
  '/dictionary': {
    desktop: '/images/dict_bg.png',
    mobile: '/images/dict_mobile_bg.png',
  },
  '/contact': {
    desktop: '/images/contact_bg.png',
  },
};

export default function BackgroundManager() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [prevPath, setPrevPath] = useState(pathname);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (pathname !== currentPath) {
      setPrevPath(currentPath);
      setCurrentPath(pathname);
      setIsAnimating(true);
      
      // Reset animation state after duration
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevPath(pathname);
      }, 400); // slightly longer than duration to be safe
      
      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  const baseBg = backgrounds[prevPath] || backgrounds['/'];
  const topBg = backgrounds[currentPath] || backgrounds['/'];

  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      {/* Base Layer (Old Background) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={baseBg.desktop}
          alt="Base Background"
          fill
          className={`object-cover ${baseBg.mobile ? 'hidden md:block' : 'block'}`}
          priority
          unoptimized
        />
        {baseBg.mobile && (
          <Image
            src={baseBg.mobile}
            alt="Base Background Mobile"
            fill
            className="object-cover md:hidden"
            priority
            unoptimized
          />
        )}
      </div>

      {/* Top Layer (New Background fading in) */}
      <motion.div
        key={currentPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="absolute inset-0 z-10"
      >
        <Image
          src={topBg.desktop}
          alt="Top Background"
          fill
          className={`object-cover ${topBg.mobile ? 'hidden md:block' : 'block'}`}
          priority
          unoptimized
        />
        {topBg.mobile && (
          <Image
            src={topBg.mobile}
            alt="Top Background Mobile"
            fill
            className="object-cover md:hidden"
            priority
            unoptimized
          />
        )}
      </motion.div>
    </div>
  );
}
