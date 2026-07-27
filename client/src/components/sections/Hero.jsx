import { useEffect, useState } from "react";

import golghar from "../../assets/images/hero/golghar.jpg";
import mahabodhi from "../../assets/images/hero/mahabodhi-temple.jpg";
import nalanda from "../../assets/images/hero/Nalanda.jpg";
import gurudawara from "../../assets/images/hero/Gurudawara.jpg";

const heroImages = [golghar, mahabodhi, nalanda, gurudawara];

const welcomeWords = ["स्वागत है", "Welcome", "स्वागत अछि", "خوش آمدید"];

const badges = ["UNESCO Heritage", "Buddhist Circuit", "Eco Tourism"];

const stats = [
  { value: "12+", label: "Destinations" },
  { value: "4", label: "Heritage sites" },
  { value: "2500+", label: "Years of history" },
];

function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const imgInterval = setInterval(
      () => setCurrentImage((p) => (p + 1) % heroImages.length),
      6000
    );
    const wordInterval = setInterval(
      () => setWelcomeIndex((p) => (p + 1) % welcomeWords.length),
      2400
    );
    return () => {
      clearTimeout(t);
      clearInterval(imgInterval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0A0B12]">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Bihar heritage site"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2500ms] ease-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation:
                index === currentImage ? "kenburns 12s ease-out forwards" : "none",
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 15% 55%, rgba(10,11,18,0.94) 0%, rgba(10,11,18,0.74) 38%, rgba(10,11,18,0.35) 68%, rgba(10,11,18,0.14) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B12] via-transparent to-[#0A0B12]/40" />

      {/* Signature element */}
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 opacity-[0.06] lg:block"
        style={{ animation: "spin-slow 90s linear infinite" }}
      >
        <circle cx="100" cy="100" r="92" fill="none" stroke="#C9A15C" strokeWidth="1" />
        <circle cx="100" cy="100" r="6" fill="#C9A15C" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="12"
            stroke="#C9A15C"
            strokeWidth="1"
            transform={`rotate(${(i * 360) / 24} 100 100)`}
          />
        ))}
      </svg>

      {/* Rotating multilingual welcome mark */}
      <div className="absolute left-6 top-8 z-10 md:left-10 md:top-10">
        <p
          key={welcomeIndex}
          className="text-lg italic text-[#C9A15C] transition-opacity duration-500"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {welcomeWords[welcomeIndex]}
        </p>
      </div>

      {/* Left margin mark */}
      <div className="absolute left-6 top-24 hidden h-[45%] w-px bg-gradient-to-b from-[#C9A15C]/40 to-transparent md:block" />

{/* Content */}
<div className="relative z-10 flex h-full flex-col justify-center px-6 py-24 sm:px-10 md:px-16 lg:px-24 xl:px-32">
        <div className="flex max-w-2xl flex-col gap-4 sm:gap-5">
          <div
            className={`flex items-center gap-3 transition-all duration-700 delay-75 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span className="font-mono text-xs text-[#C9A15C]/70">01</span>
            <span className="h-px w-8 bg-[#8C2F2F]" />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A15C] sm:text-sm sm:tracking-[0.35em]">
              Bihar Explorer
            </p>
          </div>

          <h1
            className="text-[2.75rem] leading-[1.12] text-[#F3E9D6] sm:text-6xl sm:leading-[1.08] md:text-7xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            <span
              className={`block transition-all delay-150 duration-700 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Discover the
            </span>
            <span
              className={`mt-1 block italic text-[#C9A15C] transition-all delay-[250ms] duration-700 sm:mt-2 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Soul of Bihar
            </span>
          </h1>

          <p
            className={`max-w-xl text-base leading-7 text-[#F3E9D6]/70 transition-all delay-[350ms] duration-700 sm:text-lg sm:leading-8 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Journey through the birthplace of enlightenment, ancient
            universities, and living tradition, across the heart of Bihar.
          </p>

          <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 transition-all delay-[425ms] duration-700 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {badges.map((b, i) => (
              <span key={b} className="flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-[#F3E9D6]/50 sm:text-xs">
                  {b}
                </span>
                {i < badges.length - 1 && (
                  <span className="h-3 w-px bg-[#F3E9D6]/20" />
                )}
              </span>
            ))}
          </div>

          <div
            className={`mt-2 flex flex-wrap items-center gap-6 transition-all delay-500 duration-700 sm:gap-8 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <button className="group flex items-center gap-2 rounded-full bg-[#C9A15C] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#0A0B12] shadow-[0_8px_30px_-8px_rgba(201,161,92,0.6)] transition-transform duration-300 hover:scale-[1.03] sm:px-8 sm:py-3.5 sm:text-sm">
              Explore Destinations
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button className="group relative text-xs font-semibold uppercase tracking-wide text-[#F3E9D6] sm:text-sm">
              Plan My Trip
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#F3E9D6] transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating stat chips — desktop only, doesn't compete on mobile */}
      <div className="absolute bottom-10 right-6 z-10 hidden flex-col gap-4 md:right-16 lg:right-24 lg:flex">
        {stats.map((s) => (
          <div key={s.label} className="text-right">
            <p
              className="text-2xl text-[#C9A15C]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {s.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#F3E9D6]/45">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#F3E9D6]/50">
          Scroll to explore
        </p>
        <div className="relative h-8 w-px bg-[#F3E9D6]/20 sm:h-10">
          <div
            className="absolute left-0 top-0 h-3 w-px bg-[#C9A15C]"
            style={{ animation: "scroll-line 2s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes kenburns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes scroll-line {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(24px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

export default Hero;