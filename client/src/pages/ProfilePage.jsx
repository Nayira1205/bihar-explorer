import { useEffect, useState, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../lib/api';
import { fetchDestinations, getDestinationBySlug } from '../data/destinations';
import DestinationCard from '../components/sections/DestinationCard';

export default function ProfilePage() {
  const { user, profile, loading, signOut } = useAuth();
  const { wishlist } = useWishlist();
  const [savedItineraries, setSavedItineraries] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [destsLoaded, setDestsLoaded] = useState(false);

  useEffect(() => {
    fetchDestinations().then(() => setDestsLoaded(true));
  }, []);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get('/itineraries').catch(() => ({ data: [] })),
      api.get('/recently-viewed').catch(() => ({ data: [] })),
    ]).then(([itinRes, recentRes]) => {
      setSavedItineraries(itinRes.data);
      setRecentlyViewed(recentRes.data);
    });
  }, [user]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  if (loading || !destsLoaded) return null;
  if (!user) return <Navigate to="/login" replace />;

  const wishlistDestinations = wishlist.map((slug) => getDestinationBySlug(slug)).filter(Boolean);
  const recentDestinations = recentlyViewed.map((slug) => getDestinationBySlug(slug)).filter(Boolean);

  const displayName = profile?.name || user.email?.split('@')[0] || 'Traveller';
  const isAdmin = profile?.role === 'admin';

  const stats = [
    { icon: Heart, label: 'Wishlist', value: wishlist.length },
    { icon: Sparkles, label: 'Saved Itineraries', value: savedItineraries.length },
    { icon: MapPin, label: 'Recently Viewed', value: recentDestinations.length },
    { icon: Calendar, label: 'Trip History', value: 0 },
  ];

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-ink p-8 sm:p-12">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold font-display text-2xl font-semibold text-ink">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-3xl font-medium text-parchment">{displayName}</h1>
                <p className="mt-1 text-sm text-parchment/60">{user.email}</p>
                {isAdmin && (
                  <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-[11px] uppercase tracking-wide text-gold">Admin</span>
                )}
              </div>
              <button onClick={handleSignOut} className="flex items-center gap-2 rounded-full border border-parchment/20 px-5 py-2.5 text-sm text-parchment/70 transition hover:border-vermilion hover:text-vermilion">
                <LogOut size={14} /> Log out
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-ivory-card border border-ink/10 p-6 text-center">
              <s.icon size={24} className="mx-auto text-vermilion" />
              <p className="mt-3 font-display text-2xl text-ink">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-charcoal/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h2 className="flex items-center gap-3 font-display text-2xl font-medium text-ink">
            <Heart size={22} className="text-vermilion" /> My Wishlist
          </h2>
          {wishlistDestinations.length > 0 ? (
            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {wishlistDestinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-ink/15 bg-ivory-card py-16 text-center">
              <p className="text-charcoal-soft">No saved destinations yet.</p>
              <Link to="/destinations" className="mt-4 inline-block text-sm font-medium uppercase tracking-wide text-vermilion">Browse destinations {'\u2192'}</Link>
            </div>
          )}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <h2 className="flex items-center gap-3 font-display text-2xl font-medium text-ink">
            <Sparkles size={22} className="text-vermilion" /> Saved Itineraries
          </h2>
          {savedItineraries.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedItineraries.map((itin) => (
                <div key={itin.id} className="rounded-3xl bg-ivory-card border border-ink/10 p-6">
                  <h3 className="font-display text-lg font-medium text-ink">{itin.name}</h3>
                  {itin.itineraryData?.itinerary?.summary && (
                    <p className="mt-2 text-sm text-charcoal-soft line-clamp-2">{itin.itineraryData.itinerary.summary}</p>
                  )}
                  {itin.itineraryData?.itinerary?.totalBudget && (
                    <p className="mt-3 text-xs text-gold">{itin.itineraryData.itinerary.totalBudget}</p>
                  )}
                  <p className="mt-2 text-xs text-charcoal/40">{new Date(itin.createdAt || itin.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-ink/15 bg-ivory-card py-16 text-center">
              <p className="text-charcoal-soft">No saved itineraries yet.</p>
              <Link to="/travel-planner" className="mt-4 inline-block text-sm font-medium uppercase tracking-wide text-vermilion">Plan a trip {'\u2192'}</Link>
            </div>
          )}
        </div>

        {recentDestinations.length > 0 && (
          <div className="mx-auto mt-16 max-w-6xl">
            <h2 className="flex items-center gap-3 font-display text-2xl font-medium text-ink">
              <MapPin size={22} className="text-vermilion" /> Recently Viewed
            </h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {recentDestinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
