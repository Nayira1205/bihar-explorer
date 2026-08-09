// Several pages (DestinationsPage, FoodPage, FestivalsPage, ExperiencesPage,
// BlogsPage, GalleryPage, AdminPage) expect a simple synchronous-read data
// module per content type: call `fetchX()` once to load it, then `getX()`
// anywhere to read whatever's currently cached. This factory implements
// that contract once, backed by the real API, instead of repeating the
// same fetch/cache logic in six near-identical files.
//
// Content types with no backend route yet (see each data/*.js file for
// which ones) will simply resolve to an empty array rather than throwing —
// the page renders an empty state instead of crashing.

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function createContentStore(endpoint) {
  let cache = [];
  let inFlight = null;

  async function fetchAll(params) {
    if (inFlight) return inFlight;

    inFlight = (async () => {
      try {
        const query = params
          ? `?${new URLSearchParams(
              Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
            ).toString()}`
          : "";
        const res = await fetch(`${API_BASE_URL}${endpoint}${query}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const body = await res.json();
        cache = Array.isArray(body?.data) ? body.data : [];
      } catch (err) {
        // No backend route for this content type yet, or a network issue —
        // fail quietly to an empty list rather than breaking the page.
        console.warn(`[${endpoint}] Could not load data:`, err.message);
        cache = [];
      } finally {
        inFlight = null;
      }
      return cache;
    })();

    return inFlight;
  }

  function getAll() {
    return cache;
  }

  function getBySlug(slug) {
    return cache.find((item) => item.slug === slug);
  }

  return { fetchAll, getAll, getBySlug };
}
