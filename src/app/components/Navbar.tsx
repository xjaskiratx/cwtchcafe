'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavigate = (href: string) => {
    if (pathname === href) {
      setIsMenuOpen(false);
      return;
    }
    setIsMenuOpen(false);
    // Let the menu fade out first, then navigate for a smoother effect
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  const navItems = ['Home', 'About', 'Menu', 'Dict.', 'Contact'];

  return (
    <>
      <style>{`
        @keyframes coffee-fill {
          0%, 15% { transform: scaleY(0); }
          30%, 50% { transform: scaleY(1); }
          65%, 100% { transform: scaleY(0); }
        }
        .animate-coffee {
          transform-origin: bottom;
          animation: coffee-fill 8s infinite ease-in-out;
        }
      `}</style>

      {/* Top Blur Bar */}
      <div
        className={`fixed top-0 left-0 w-full h-32 z-40 backdrop-blur-2xl pointer-events-none transition-colors duration-500 ${isMenuOpen ? 'bg-transparent' : 'bg-black/20'}`}
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
        }}
      />

      {/* Fixed Logo */}
      <div className={`fixed left-1/2 -translate-x-1/2 md:left-[2%] md:translate-x-0 top-[2%] z-50 transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Link href="/">
          <Image
            src="/images/logo-main.png"
            alt="Cwtch Cafe Logo"
            width={150}
            height={46}
            className="cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className={`fixed right-[2%] top-[3%] z-50 hidden md:flex items-center gap-10 font-[family-name:var(--font-dm-mono)] transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {navItems.map((item) => {
          let href = '/';
          if (item === 'Dict.') href = '/dictionary';
          else if (item !== 'Home') href = `/${item.toLowerCase()}`;
          
          const isActive = pathname === href;

          return (
            <Link
              key={item}
              href={href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Coffee Cup Toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed right-[5%] top-[1.5%] z-[60] w-12 h-12 flex items-center justify-center text-[#570000] hover:text-[#E4C89D] transition-colors"
        aria-label="Toggle Menu"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" className={`transition-transform duration-500 ${isMenuOpen ? 'rotate-12 scale-110' : ''}`}>
          <defs>
            <clipPath id="cup-clip">
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            </clipPath>
          </defs>
          
          {/* Coffee liquid fill animation */}
          <rect 
            x="3" y="8" width="14" height="13" 
            fill="currentColor" 
            clipPath="url(#cup-clip)" 
            className={isMenuOpen ? '' : 'animate-coffee'}
            style={{ transform: isMenuOpen ? 'scaleY(1)' : undefined, transformOrigin: 'bottom', transition: 'transform 0.5s' }}
          />
          
          {/* Cup outline */}
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Steam / Close indicator */}
          <g className={`transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
            <path d="M7 2v3M11 2v3M15 2v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </button>

      {/* Full-Screen Vertical Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-[55] bg-white/60 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-10 font-[family-name:var(--font-dm-mono)] text-3xl tracking-widest uppercase">
          {navItems.map((item, index) => {
            let href = '/';
            if (item === 'Dict.') href = '/dictionary';
            else if (item !== 'Home') href = `/${item.toLowerCase()}`;
            
            const isActive = pathname === href;

            return (
              <button
                key={item}
                onClick={() => handleNavigate(href)}
                style={{ transitionDelay: `${isMenuOpen ? index * 50 : 0}ms` }}
                className={`transform transition-all duration-500 uppercase ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${isActive ? 'text-[#570000] font-bold' : 'text-[#570000] font-normal hover:font-bold'}`}
              >
                {item.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
