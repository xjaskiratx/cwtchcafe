import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Top Blur Bar - Compact smooth transition */}
      <div 
        className="absolute top-0 left-0 w-full h-32 z-10 backdrop-blur-2xl bg-black/20" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
        }} 
      />

      {/* Logo */}
      <div className="absolute left-[2%] top-[2%] z-20">
        <Image
          src="/images/logo-mockup-0.png"
          alt="Cwtch Cafe Logo"
          width={150}
          height={50}
          className="h-auto w-auto"
          priority
        />
      </div>

      {/* Navbar */}
      <nav className="absolute right-[2%] top-[3%] z-20 hidden md:flex items-center gap-10 font-[family-name:var(--font-dm-mono)]">
        {['Home', 'About', 'Menu', 'Contact', 'Operations'].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
            className={`group relative text-sm uppercase tracking-[0.2em] text-white transition-colors hover:text-[#E4C89D] ${
              item === 'Home' ? 'font-bold' : 'font-medium'
            }`}
          >
            {item}
            <span 
              className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-[#E4C89D] transition-all duration-300 ${
                item === 'Home' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} 
            />
          </a>
        ))}
      </nav>






      {/* Hero Content */}
      <main className="absolute inset-y-0 left-[2%] z-20 flex flex-col justify-center text-white font-[family-name:var(--font-eb-garamond)]">
        <h1 className="flex flex-col text-[60px] font-light leading-[0.9] tracking-tighter sm:text-[80px] md:text-[100px] lg:text-[120px]">
          <span>The Sunday</span>
          <span>Sanctuary</span>
        </h1>
      </main>


      {/* Hero Images - Art Direction */}
      <Image
        src="/images/hero-desktop.png"
        alt="Cwtch Cafe Desktop Hero"
        fill
        className="hidden md:block object-cover"
        priority
        sizes="(min-width: 768px) 100vw, 1vw"
      />
      <Image
        src="/images/hero-mobile.png"
        alt="Cwtch Cafe Mobile Hero"
        fill
        className="block md:hidden object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 1vw"
      />
    </div>
  );
}

