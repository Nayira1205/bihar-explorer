import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import { districts, districtRecommendations } from '../data/travelCompanion';
import { fetchDestinations, getDestinations } from '../data/destinations';
import DestinationCard from '../components/sections/DestinationCard';

export default function ExploreMapPage() {
  const [activeDistrict, setActiveDistrict] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const destinations = getDestinations();

  const districtDestinations = useMemo(
    () => activeDistrict ? destinations.filter((d) => d.district === activeDistrict) : [],
    [activeDistrict, destinations]
  );

  const rec = activeDistrict ? districtRecommendations[activeDistrict] : null;

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Explore Map" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Explore Bihar by <span className="italic text-vermilion">district</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Select a district to see its destinations, food specialties, festivals, and travel recommendations.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {districts.map((d) => (
              <button key={d} onClick={() => setActiveDistrict(activeDistrict === d ? null : d)} className={`group rounded-3xl border p-6 text-left transition-all duration-300 ${activeDistrict === d ? 'border-vermilion bg-ink text-parchment' : 'border-ink/10 bg-ivory-card text-charcoal hover:border-ink/30 hover:-translate-y-1'}`} aria-pressed={activeDistrict === d}>
                <MapPin size={24} className={activeDistrict === d ? 'text-gold' : 'text-vermilion'} />
                <h3 className="mt-4 font-display text-lg font-medium">{d}</h3>
                <p className={`mt-1 text-xs ${activeDistrict === d ? 'text-parchment/50' : 'text-charcoal/50'}`}>
                  {districtRecommendations[d]?.places.length ?? 0} places
                </p>
              </button>
            ))}
          </div>
        </div>

        {activeDistrict && rec && (
          <div className="mx-auto mt-12 max-w-6xl">
            <div className="rounded-3xl bg-ink p-8 sm:p-12">
              <h2 className="font-display text-3xl font-medium text-parchment">{activeDistrict}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-gold">Best Time</p>
                  <p className="mt-1 text-sm text-parchment">{rec.bestTime}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-gold">Budget</p>
                  <p className="mt-1 text-sm text-parchment">{rec.budget}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-gold">Signature Festival</p>
                  <p className="mt-1 text-sm text-parchment">{rec.festival}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gold">Places to visit</p>
                  <ul className="mt-2 space-y-1.5">
                    {rec.places.map((p) => <li key={p} className="flex items-start gap-2 text-sm text-parchment/80"><span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gold">Food to try</p>
                  <ul className="mt-2 space-y-1.5">
                    {rec.food.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-parchment/80"><span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-vermilion" />{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {districtDestinations.length > 0 ? (
              <div className="mt-10">
                <h3 className="font-display text-2xl font-medium text-ink">Destinations in {activeDistrict}</h3>
                <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {districtDestinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
                </div>
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-ink/15 bg-ivory-card py-16 text-center">
                <p className="text-charcoal-soft">Detailed destination pages for {activeDistrict} are coming soon.</p>
                <Link to="/destinations" className="mt-4 inline-block text-sm font-medium uppercase tracking-wide text-vermilion">Browse all destinations {'\u2192'}</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
