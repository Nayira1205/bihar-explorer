import { useState } from "react";
import SectionEyebrow from "../common/SectionEyebrow";
import Chip from "../ui/Chip";
import SearchInput from "../ui/SearchInput";
import { LoadingGrid, ErrorState } from "../ui/AsyncState";
import DestinationCard from "./DestinationCard";
import DestinationModal from "./DestinationModal";
import { categories, districts } from "../../data/destinations";
import { useDestinations } from "../../hooks/useDestinations";

const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "name", label: "A – Z" },
  { key: "district", label: "District" },
];

function FeaturedDestinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDistrict, setActiveDistrict] = useState("All districts");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [preview, setPreview] = useState(null);

  const { destinations, loading, error, refetch } = useDestinations({
    category: activeCategory === "All" ? undefined : activeCategory,
    district: activeDistrict === "All districts" ? undefined : activeDistrict,
    search: query,
    sort,
  });

  return (
    <section id="destinations" className="bg-ivory py-28 px-6 md:px-12 xl:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-4">
          <SectionEyebrow number="03" label="Featured Destinations" />
        </div>
        <h2
          className="mt-8 text-4xl text-ink sm:text-5xl md:text-6xl"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          Discover Bihar's
          <span className="italic text-vermilion"> finest places</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-charcoal-soft">
          Filter by what you love, search for a place by name, and preview every detail before you go.
        </p>
      </div>

      {/* Controls */}
      <div className="mx-auto mt-14 max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Chip active={activeCategory === "All"} onClick={() => setActiveCategory("All")}>
            All categories
          </Chip>
          {categories.map((c) => (
            <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <SearchInput value={query} onChange={setQuery} placeholder="Search destinations..." />

          <select
            value={activeDistrict}
            onChange={(e) => setActiveDistrict(e.target.value)}
            className="rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal outline-none"
          >
            <option>All districts</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s.key} value={s.key}>
                Sort: {s.label}
              </option>
            ))}
          </select>

          {!loading && !error && (
            <span className="ml-auto text-xs uppercase tracking-wide text-charcoal/40">
              {destinations.length} {destinations.length === 1 ? "place" : "places"}
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto mt-10 max-w-6xl">
        {loading && <LoadingGrid count={6} />}

        {!loading && error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && destinations.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {destinations.map((d) => (
              <DestinationCard key={d.id} destination={d} onPreview={setPreview} />
            ))}
          </div>
        )}

        {!loading && !error && destinations.length === 0 && (
          <div className="rounded-3xl border border-dashed border-ink/15 bg-ivory-card py-20 text-center">
            <p className="text-charcoal-soft">No destinations match those filters yet.</p>
          </div>
        )}
      </div>

      <DestinationModal destination={preview} open={Boolean(preview)} onClose={() => setPreview(null)} />
    </section>
  );
}

export default FeaturedDestinations;
