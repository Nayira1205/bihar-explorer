import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { resolveFoodImage } from "../utils/foodImages";

export function useFoods(category) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .getFoods({ category })
      .then((res) => {
        if (cancelled) return;
        setFoods(
          res.data.map((f) => ({ ...f, id: f.slug, resolvedImage: resolveFoodImage(f.image) }))
        );
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load the food guide.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, retryToken]);

  return { foods, loading, error, refetch: () => setRetryToken((t) => t + 1) };
}
