import SectionEyebrow from "../common/SectionEyebrow";
import { useEffect, useState } from "react";
import aboutVideo from "../../assets/Videos/about/about-Bihar.mp4";

function About() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#0A0B12]">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={aboutVideo} type="video/mp4" />
      </video>

      {/* Premium Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,11,18,.82) 0%, rgba(10,11,18,.45) 35%, rgba(10,11,18,.82) 100%)",
        }}
      />

      {/* Decorative Circle */}
      <svg
        viewBox="0 0 200 200"
        className="absolute left-[-180px] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 opacity-[0.05] lg:block"
        style={{ animation: "spin-slow-about 100s linear infinite" }}
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#C9A15C"
          strokeWidth="1"
        />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2="100"
            y2="10"
            stroke="#C9A15C"
            strokeWidth="1"
            transform={`rotate(${(i * 360) / 24} 100 100)`}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">

        <div className="max-w-3xl">

          {/* Chapter Number */}
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <SectionEyebrow number="01" label="The Story of Bihar" />
          </div> <br/>

          {/* Heading */}
          <h2
            className={`mt-4 sm:mt-5 text-5xl md:text-7xl text-[#F3E9D6] leading-[1.1] transition-all duration-700 delay-150 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
            }}
          >
            Every Journey
            <br />

            <span className="italic text-[#C9A15C]">
              Has a Beginning.
            </span>
          </h2>

          {/* Paragraph */}
          <p
            className={`mt-8 max-w-2xl text-lg leading-8 text-[#F3E9D6]/70 transition-all duration-700 delay-300 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Bihar is where civilizations flourished, ideas changed the
            world, and traditions continue to inspire generations.
            Wander through ancient universities, sacred temples,
            vibrant festivals, peaceful riversides, and modern cities—
            every journey here tells a story worth remembering.
          </p>

          {/* Link Button */}
          <button
            className={`group mt-10 relative text-sm uppercase tracking-wide text-[#F3E9D6] transition-all duration-700 delay-500 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            Continue Exploring

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1 inline-block">
              →
            </span>

            <span className="absolute left-0 -bottom-1 h-px w-0 bg-[#C9A15C] transition-all duration-300 group-hover:w-full" />
          </button>

        </div>
      </div>

      {/* Right Side Stat */}
      <div className="absolute right-10 bottom-12 hidden lg:block text-right">
        <p
          className="text-5xl text-[#C9A15C]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          2500+
        </p>

        <p className="text-xs uppercase tracking-[0.3em] text-[#F3E9D6]/45">
          Years of Living Heritage
        </p>
      </div>

      <style>{`
        @keyframes spin-slow-about{
          from{transform:translateY(-50%) rotate(0deg);}
          to{transform:translateY(-50%) rotate(360deg);}
        }
      `}</style>

    </section>
  );
}

export default About;