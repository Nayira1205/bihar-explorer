import { LoadingGrid, ErrorState } from "../ui/AsyncState";
import { useFestivals } from "../../hooks/useFestivals";

function Festival() {
  const { festivals, loading, error, refetch } = useFestivals();

  return (
    <section id="festivals" className="bg-[#0A0B12] py-28 px-6 md:px-12 xl:px-20">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="font-mono text-xs text-[#C9A15C]/70">05</span>
          <span className="w-8 h-px bg-[#8C2F2F]"></span>
          <p className="uppercase tracking-[0.35em] text-[#C9A15C] text-sm">
            Festivals & Culture
          </p>
        </div>

        <h2
          className="mt-8 text-5xl md:text-6xl text-[#F3E9D6]"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          Celebrate Bihar's
          <span className="italic text-[#C9A15C]"> Living Heritage</span>
        </h2>

        <p
          className="mt-8 text-lg leading-8 text-[#F3E9D6]/70"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Festivals in Bihar are more than celebrations—they are living traditions,
          bringing together spirituality, music, art, family and community.
        </p>
      </div>

      <div className="mt-20 max-w-6xl mx-auto">
        {loading && <LoadingGrid count={3} dark />}
        {!loading && error && <ErrorState message={error} onRetry={refetch} dark />}
      </div>

      {!loading && !error && festivals.length > 0 && (
        <>
          <div className="mt-20">
            <div className="group relative h-[450px] sm:h-[540px] lg:h-[650px] overflow-hidden rounded-[34px]">
              <img
                src={festivals[0].resolvedImage}
                alt={festivals[0].title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent"></div>
              <div className="relative z-10 flex h-full items-end">
                <div className="max-w-xl p-10 md:p-16">
                  <span className="inline-block rounded-full border border-[#C9A15C]/40 bg-[#C9A15C]/10 px-5 py-2 text-sm text-[#C9A15C] backdrop-blur-md">
                    {festivals[0].badge}
                  </span>
                  <h2 className="mt-6 text-5xl text-[#F3E9D6]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {festivals[0].title}
                  </h2>
                  <p className="mt-3 text-xl italic text-[#C9A15C]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {festivals[0].subtitle}
                  </p>
                  <p className="mt-6 text-lg leading-8 text-[#F3E9D6]/75" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {festivals[0].description}
                  </p>
                  <button className="mt-10 rounded-full bg-[#C9A15C] px-8 py-4 font-semibold text-[#0A0B12] hover:scale-105 transition">
                    Discover Tradition →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Festivals */}
          <div className="mt-28 space-y-28 max-w-6xl mx-auto">
            {festivals.slice(1).map((festival, index) => (
              <div
                key={festival.slug || festival.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="group overflow-hidden rounded-[30px]">
                  <img
                    src={festival.resolvedImage}
                    alt={festival.title}
                    className="h-[450px] w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>

                <div>
                  <span className="inline-block rounded-full border border-[#C9A15C]/30 bg-[#C9A15C]/10 px-4 py-2 text-sm text-[#C9A15C]">
                    {festival.badge}
                  </span>
                  <h2 className="mt-6 text-5xl text-[#F3E9D6]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {festival.title}
                  </h2>
                  <p className="mt-3 text-xl italic text-[#C9A15C]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {festival.subtitle}
                  </p>
                  <p className="mt-6 text-lg leading-8 text-[#F3E9D6]/70" style={{ fontFamily: "'Jost', sans-serif" }}>
                    {festival.description}
                  </p>
                  <button className="mt-10 rounded-full border border-[#C9A15C] px-8 py-4 text-[#C9A15C] transition hover:bg-[#C9A15C] hover:text-black">
                    Explore Festival →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Festival;
