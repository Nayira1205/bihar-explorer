import { MapPin, Ticket } from "lucide-react";

function DestinationCard({ destination, onPreview }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-ivory-card border border-ink/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgba(10,11,18,0.25)]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-wide text-parchment backdrop-blur-sm">
          {destination.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs text-charcoal/50">
          <MapPin size={13} />
          {destination.district}
        </div>

        <h3
          className="mt-2 text-2xl text-ink"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          {destination.name}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-soft">
          {destination.shortDesc}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-charcoal/50">
          <Ticket size={13} />
          {destination.entryFee}
        </div>

        <button
          onClick={() => onPreview(destination)}
          className="group/btn mt-5 flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-vermilion"
        >
          Quick preview
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}

export default DestinationCard;
