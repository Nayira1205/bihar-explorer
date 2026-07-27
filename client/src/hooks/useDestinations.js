import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { resolveDestinationImages } from "../utils/destinationImages";

// Re-fetches whenever category/district/search/sort change. The API does
// the filtering server-side now (see server/controllers/destinationController.js)
// instead of the old client-side .filter() over a static array.
export function useDestinations({ category, district, search, sort }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Small debounce so typing in the search box doesn't fire a request
    // per keystroke.
    const timer = setTimeout(async () => {
      try {
        const res = await api.getDestinations({ category, district, search, sort });
        if (cancelled) return;
        const withResolvedImages = res.data.map((d) => ({
          ...d,
          id: d.slug,
          images: resolveDestinationImages(d.images),
        }));
        setDestinations(withResolvedImages);
      } catch (err) {
        if (!cancelled) setError(err.message || "Couldn't load destinations.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [category, district, search, sort, retryToken]);

  return { destinations, loading, error, refetch: () => setRetryToken((t) => t + 1) };
}
