import { Link, Navigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { fetchDestinations, getDestinationBySlug } from '../data/destinations';
import DestinationCard from '../components/sections/DestinationCard';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const { user, loading } = useAuth();
  const { wishlist } = useWishlist();
  const [destsLoaded, setDestsLoaded] = useState(false);

  useEffect(() => {
    fetchDestinations().then(() => setDestsLoaded(true));
  }, []);

  if (loading || !destsLoaded) return null;
  if (!user) return <Navigate to="/login" replace />;

  const wishlistDestinations = wishlist.map((slug) => getDestinationBySlug(slug)).filter(Boolean);

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <Heart size={28} className="text-vermilion" />
            <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
              My <span className="italic text-vermilion">Wishlist</span>
            </h1>
          </div>
          <p className="mt-4 font-body text-lg text-charcoal-soft">
            {wishlistDestinations.length} {wishlistDestinations.length === 1 ? 'destination' : 'destinations'} saved.
          </p>

          {wishlistDestinations.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {wishlistDestinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-ink/15 bg-ivory-card py-20 text-center">
              <Heart size={40} className="mx-auto text-charcoal/20" />
              <p className="mt-4 font-body text-lg text-charcoal-soft">Your wishlist is empty.</p>
              <p className="mt-1 text-sm text-charcoal/50">Tap the heart on any destination to save it here.</p>
              <Link to="/destinations" className="mt-6 inline-block text-sm font-medium uppercase tracking-wide text-vermilion">Browse destinations {'\u2192'}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
