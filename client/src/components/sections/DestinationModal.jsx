import { useState } from "react";
import { CalendarDays, Clock, Ticket, MapPin, Map as MapIcon } from "lucide-react";
import Modal from "../ui/Modal";

function DestinationModal({ destination, open, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!destination) return null;

  const stats = [
    { icon: CalendarDays, label: "Best season", value: destination.bestSeason },
    { icon: Clock, label: "Opening hours", value: destination.openingHours },
    { icon: Ticket, label: "Entry fee", value: destination.entryFee },
  ];

  return (
    <Modal open={open} onClose={onClose} labelledBy="destination-modal-title">
      <div className="relative h-72 overflow-hidden rounded-t-3xl sm:h-96">
        <img
          src={destination.images[activeImage]}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 left-6 flex gap-2">
          {destination.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition ${
                i === activeImage ? "border-gold" : "border-white/40"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-10">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-vermilion">
          <MapPin size={13} />
          {destination.district} · {destination.category}
        </div>

        <h2
          id="destination-modal-title"
          className="mt-2 text-4xl text-ink"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          {destination.name}
        </h2>

        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-charcoal-soft">
          {destination.longDesc}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-ivory p-4">
              <s.icon size={18} className="text-vermilion" />
              <p className="mt-2 text-[11px] uppercase tracking-wide text-charcoal/50">
                {s.label}
              </p>
              <p className="mt-1 text-sm text-ink">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-xs uppercase tracking-wide text-charcoal/50">
              Nearby places
            </h3>
            <ul className="mt-3 space-y-2">
              {destination.nearby.map((n) => (
                <li key={n} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-vermilion" />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wide text-charcoal/50">
              Travel tips
            </h3>
            <ul className="mt-3 space-y-2">
              {destination.tips.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-ink">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex h-40 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 bg-ivory text-charcoal/40">
          <MapIcon size={22} />
          <p className="text-xs uppercase tracking-wide">
            Interactive map — coming soon
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default DestinationModal;
