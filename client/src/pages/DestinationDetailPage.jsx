import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, CalendarDays, Clock, Ticket, History, Lightbulb, Compass, Heart, ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { useWishlist } from '../context/WishlistContext';
import DestinationCard from '../components/sections/DestinationCard';
import { resolveDestinationImages } from '../utils/destinationImages';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.get(`/destinations/${slug}`)
      .then((res) => {
        const d = res.data.data;
        setDestination({ ...d, images: resolveDestinationImages(d.images) });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (destination && destination.nearbyAttractions) {
      api.get('/destinations').then((res) => {
        const related = res.data.data
          .filter((d) => d.slug !== destination.slug && destination.nearbyAttractions.some((n) => d.name.includes(n)))
          .slice(0, 3)
          .map((d) => ({ ...d, id: d.slug, images: resolveDestinationImages(d.images) }));
        setRelated(related);
      });
    }
  }, [destination]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-vermilion" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="bg-ivory min-h-screen pt-32 px-6 text-center">
        <h1 className="font-display text-4xl text-ink">Destination not found</h1>
        <Link to="/destinations" className="mt-6 inline-block text-sm font-medium uppercase tracking-wide text-vermilion">{'\u2190'} Back to destinations</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(destination.slug);
  const shortDesc = destination.shortDescription || destination.shortDesc || '';
  const longDesc = destination.description || destination.longDesc || '';

  const stats = [
    { icon: CalendarDays, label: 'Best season', value: destination.bestSeason },
    { icon: Clock, label: 'Opening hours', value: destination.timings || destination.openingHours },
    { icon: Ticket, label: 'Entry fee', value: destination.entryFee },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img src={destination.images[0]} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute top-24 left-6 z-10 md:left-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-parchment/80 transition hover:text-gold">
            <ChevronLeft size={16} /> Back
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12 xl:p-20">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-gold">
            <MapPin size={13} /> {destination.district} {'\u00b7'} {destination.category}
          </div>
          <h1 className="mt-3 font-display text-4xl font-medium text-parchment sm:text-5xl md:text-6xl">{destination.name}</h1>
          <p className="mt-3 max-w-2xl font-body text-lg text-parchment/70">{shortDesc}</p>
        </div>
      </section>

      <section className="bg-ink py-10 px-6 md:px-12 xl:px-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-white/5 p-5">
              <s.icon size={24} className="text-gold" />
              <div>
                <p className="text-[11px] uppercase tracking-wide text-parchment/50">{s.label}</p>
                <p className="mt-1 text-sm text-parchment">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ivory py-20 px-6 md:px-12 xl:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-medium text-ink">Overview</h2>
              <p className="mt-4 font-body text-lg leading-8 text-charcoal-soft">{longDesc}</p>
            </div>
            <button
              onClick={() => toggleWishlist(destination.slug)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-wide transition ${inWishlist ? 'border-vermilion bg-vermilion text-parchment' : 'border-ink/20 text-charcoal hover:border-ink'}`}
              aria-pressed={inWishlist}
            >
              <Heart size={14} className={inWishlist ? 'fill-current' : ''} />
              {inWishlist ? 'Saved' : 'Save'}
            </button>
          </div>

          {destination.history && (
            <div className="mt-16">
              <h3 className="flex items-center gap-3 font-display text-2xl text-ink">
                <History size={22} className="text-vermilion" /> History
              </h3>
              <p className="mt-4 font-body text-lg leading-8 text-charcoal-soft">{destination.history}</p>
            </div>
          )}

          {destination.nearbyAttractions && destination.nearbyAttractions.length > 0 && (
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xs uppercase tracking-wide text-charcoal/50">Nearby Attractions</h3>
                <ul className="mt-3 space-y-2">
                  {destination.nearbyAttractions.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-ink">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0 text-vermilion" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wide text-charcoal/50">Travel Tips</h3>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2 text-sm text-ink">
                    <Lightbulb size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                    Visit during {destination.bestSeason || 'October to March'} for the best experience.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-ink">
                    <Lightbulb size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                    Carry water and wear comfortable walking shoes.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-ink">
                    <Lightbulb size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                    Entry fee: {destination.entryFee || 'Free'}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {destination.coordinates && (
            <div className="mt-16">
              <h3 className="flex items-center gap-3 font-display text-2xl text-ink">
                <MapPin size={22} className="text-vermilion" /> Location
              </h3>
              <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-ivory-card text-charcoal/40">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto text-vermilion/40" />
                  <p className="mt-2 text-sm">{destination.name}, {destination.district}</p>
                  <p className="text-xs text-charcoal/30">{destination.coordinates.lat}, {destination.coordinates.lng}</p>
                </div>
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-20">
              <h3 className="font-display text-2xl font-medium text-ink">Related Destinations</h3>
              <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {related.map((d) => <DestinationCard key={d.slug} destination={d} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
