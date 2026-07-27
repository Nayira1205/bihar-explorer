import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { resolveFestivalImage } from "../utils/festivalImages";

export function useFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    api
      .getFestivals()
      .then((res) => {
        if (cancelled) return;
        setFestivals(
          res.data.map((f) => ({ ...f, resolvedImage: resolveFestivalImage(f.image) }))
        );
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load festivals.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [retryToken]);

  return { festivals, loading, error, refetch: () => setRetryToken((t) => t + 1) };
}
