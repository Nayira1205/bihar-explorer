import {
  Sparkles,
  BedDouble,
  CloudSun,
  Map,
  MapPinned,
  AudioLines,
  MessageCircle,
  Heart,
} from "lucide-react";
import SectionEyebrow from "../common/SectionEyebrow";
import { futureFeatures } from "../../data/futureFeatures";

const icons = {
  Sparkles,
  BedDouble,
  CloudSun,
  Map,
  MapPinned,
  AudioLines,
  MessageCircle,
  Heart,
};

const statusStyles = {
  "In design": "bg-gold/15 text-gold border-gold/30",
  Planned: "bg-parchment/10 text-parchment/70 border-parchment/20",
  Concept: "bg-vermilion/15 text-vermilion border-vermilion/30",
};

function FutureFeatures() {
  return (
    <section className="bg-ink py-28 px-6 md:px-12 xl:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-4">
          <SectionEyebrow number="06" label="What's Next" />
        </div>
        <h2
          className="mt-8 text-4xl text-parchment sm:text-5xl md:text-6xl"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          Built for where this
          <span className="italic text-gold"> platform is headed</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-parchment/60">
          Bihar Explorer is a living roadmap. These are the intelligent features planned next —
          shown here so the vision for the platform is as clear as what's already built.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {futureFeatures.map((feature) => {
          const Icon = icons[feature.icon];
          return (
            <div
              key={feature.id}
              className="group rounded-3xl border border-parchment/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10">
                <Icon size={20} className="text-gold" />
              </div>

              <h3
                className="mt-5 text-xl text-parchment"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-parchment/60">{feature.description}</p>

              <span
                className={`mt-6 inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-wide ${statusStyles[feature.status]}`}
              >
                {feature.status}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FutureFeatures;
