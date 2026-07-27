import {
  Landmark,
  Sparkles,
  UtensilsCrossed,
  Trees,
  Building2,
  Mountain,
} from "lucide-react";

const reasons = [
  {
    icon: Landmark,
    title: "Ancient Heritage",
    description:
      "Walk through Nalanda, Vikramshila and centuries of history.",
  },
  {
    icon: Sparkles,
    title: "Spiritual Journey",
    description:
      "Experience Bodh Gaya, Rajgir and sacred Buddhist destinations.",
  },
  {
    icon: UtensilsCrossed,
    title: "Authentic Cuisine",
    description:
      "Taste Litti Chokha, Khaja, Thekua and traditional Bihari flavours.",
  },
  {
    icon: Trees,
    title: "Nature Escapes",
    description:
      "Discover waterfalls, wildlife sanctuaries and scenic hills.",
  },
  {
    icon: Building2,
    title: "Modern Bihar",
    description:
      "Explore museums, cafés, riverfronts, stadiums and vibrant city life.",
  },
  {
    icon: Mountain,
    title: "Adventure",
    description:
      "Enjoy trekking, ropeways, wildlife and eco tourism experiences.",
  },
];

function WhyVisit() {
  return (
    <section id="experience" className="bg-[#0A0B12] py-28 px-6 md:px-12 xl:px-20 2xl:px-28">

      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center">

        <div className="flex items-center justify-center gap-4">
          <span className="font-mono text-xs text-[#C9A15C]/70">
            03
          </span>

          <span className="h-px w-8 bg-[#8C2F2F]"></span>

          <p className="uppercase tracking-[0.35em] text-[#C9A15C] text-sm">
            Why Visit Bihar
          </p>
        </div>

        <h2
          className="mt-8 text-5xl md:text-6xl text-[#F3E9D6]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
          }}
        >
          More than a{" "}
          <span className="italic text-[#C9A15C]">
            Destination.
          </span>
        </h2>

        <p
          className="mt-8 text-lg leading-8 text-[#F3E9D6]/70"
          style={{
            fontFamily: "'Jost', sans-serif",
          }}
        >
          Every corner of Bihar tells a different story—from ancient
          universities and sacred temples to vibrant festivals,
          authentic cuisine, breathtaking landscapes, and modern cities.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {reasons.map((reason) => {
          const Icon = reason.icon;

          return (
            <div
              key={reason.title}
              className="
                group
                min-h-[320px]
                rounded-[28px]
                border
                border-[#C9A15C]/20
                bg-white/5
                backdrop-blur-xl
                p-10
                flex
                flex-col
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-[#C9A15C]
                hover:bg-white/10
              "
            >
              <Icon
                size={54}
                strokeWidth={1.6}
                className="text-[#C9A15C] transition-transform duration-500 group-hover:scale-110"
              />

              <h3
                className="mt-8 text-3xl text-[#F3E9D6]"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 500,
                }}
              >
                {reason.title}
              </h3>

              <p
                className="mt-5 text-[#F3E9D6]/70 leading-8 flex-grow"
                style={{
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {reason.description}
              </p>

              <button className="group mt-8 w-fit text-[#C9A15C] uppercase tracking-wide text-sm font-medium">
                Discover More
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          );
        })}

      </div>

    </section>
  );
}

export default WhyVisit;