import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { fetchFestivals, getFestivals } from '../data/festivals';

const monthOrder = [
  'August - September',
  'September',
  'October - November',
  'November',
  'November - December',
  'August–September',
  'September',
  'October–November',
  'November',
  'November–December',
];

export default function FestivalsPage() {
  const [activeFestival, setActiveFestival] = useState(null);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    fetchFestivals().then((data) => setFestivals(data));
  }, []);

  const sorted = useMemo(
    () => [...festivals].sort((a, b) => {
      const ai = monthOrder.indexOf(a.month || '');
      const bi = monthOrder.indexOf(b.month || '');
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    }),
    [festivals]
  );

  return (
    <div className="bg-ink min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="font-mono text-xs text-gold/70">01</span>
            <span className="h-px w-8 bg-vermilion" />
            <p className="text-sm uppercase tracking-[0.35em] text-gold">Festivals of Bihar</p>
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-parchment sm:text-5xl md:text-6xl">
            A year of <span className="italic text-gold">celebration</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-parchment/70">
            Bihar's calendar is built around its festivals. From the rigorous devotion of Chhath Puja to the vibrant commerce of Sonepur Mela, each one is a living tradition.
          </p>
        </div>

        {sorted.length > 0 && (
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="relative">
              <div className="absolute left-0 right-0 top-5 h-px bg-gold/20" />
              <div className="flex justify-between">
                {sorted.map((f) => (
                  <button key={f.slug} onClick={() => setActiveFestival(activeFestival === f.slug ? null : f.slug)} className="group relative flex flex-col items-center" aria-label={f.title} aria-pressed={activeFestival === f.slug}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${activeFestival === f.slug ? 'border-gold bg-gold text-ink' : 'border-gold/30 bg-ink text-gold group-hover:border-gold'}`}>
                      <Sparkles size={16} />
                    </div>
                    <p className="mt-3 hidden text-[10px] uppercase tracking-wide text-parchment/50 sm:block">{f.month}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 max-w-6xl mx-auto space-y-28">
          {sorted.map((festival, index) => (
            <div key={festival.slug} className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${index % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="group overflow-hidden rounded-[30px]">
                <img src={festival.image} alt={festival.title} loading="lazy" className="h-[450px] w-full object-cover transition-all duration-700 group-hover:scale-105" />
              </div>
              <div>
                <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">{festival.badge}</span>
                <h2 className="mt-6 font-display text-5xl text-parchment">{festival.title}</h2>
                <div className="mt-4 flex items-center gap-4 text-xs text-parchment/50">
                  {festival.month && <span className="flex items-center gap-1.5"><Calendar size={13} /> {festival.month}</span>}
                </div>
                <p className="mt-6 font-body text-lg leading-8 text-parchment/70">{festival.description}</p>
                {festival.significance && (
                  <div className="mt-6 rounded-2xl border border-gold/15 bg-white/[0.03] p-5">
                    <p className="text-[11px] uppercase tracking-wide text-gold">Significance</p>
                    <p className="mt-2 text-sm leading-6 text-parchment/70">{festival.significance}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-24 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-medium text-parchment">Want to time your trip around a festival?</h2>
          <Link to="/travel-planner" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition hover:scale-[1.03]">
            Plan your trip
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">{'\u2192'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
