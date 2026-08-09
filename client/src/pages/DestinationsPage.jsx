import { useState, useEffect } from 'react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import SearchInput from '../components/ui/SearchInput';
import DestinationCard from '../components/sections/DestinationCard';
import { categories, districts, fetchDestinations, getDestinations } from '../data/destinations';

const sortOptions = [
  { key: 'featured', label: 'Featured' },
  { key: 'name', label: 'A - Z' },
  { key: 'district', label: 'District' },
];

const budgetFilters = ['Any', 'Budget', 'Mid-range', 'Luxury'];
const travelStyleFilters = ['Any', 'Family', 'Solo', 'Adventure', 'Nature', 'Spiritual', 'Heritage'];

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDistrict, setActiveDistrict] = useState('All districts');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [budget, setBudget] = useState('Any');
  const [travelStyle, setTravelStyle] = useState('Any');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations().then(() => setLoading(false));
  }, []);

  const destinations = getDestinations();

  const filtered = (() => {
    let result = destinations;
    if (activeCategory !== 'All') result = result.filter((d) => d.category === activeCategory);
    if (activeDistrict !== 'All districts') result = result.filter((d) => d.district === activeDistrict);
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        (d.shortDescription || d.shortDesc || '').toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q)
      );
    }
    if (travelStyle !== 'Any') {
      result = result.filter((d) =>
        d.category.toLowerCase() === travelStyle.toLowerCase() ||
        (d.shortDescription || d.shortDesc || '').toLowerCase().includes(travelStyle.toLowerCase())
      );
    }
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'district') result = [...result].sort((a, b) => a.district.localeCompare(b.district));
    else result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return result;
  })();

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveDistrict('All districts');
    setQuery('');
    setBudget('Any');
    setTravelStyle('Any');
  };

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="All Destinations" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Explore every <span className="italic text-vermilion">corner of Bihar</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Filter by district, category, budget, or travel style. Search by name. Find the place that's right for you.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Chip active={activeCategory === 'All'} onClick={() => setActiveCategory('All')}>All categories</Chip>
            {categories.map((c) => (
              <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <SearchInput value={query} onChange={setQuery} placeholder="Search destinations..." />
            <select value={activeDistrict} onChange={(e) => setActiveDistrict(e.target.value)} className="rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal outline-none" aria-label="Filter by district">
              <option>All districts</option>
              {districts.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)} className="rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal outline-none" aria-label="Filter by travel style">
              {travelStyleFilters.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal outline-none" aria-label="Filter by budget">
              {budgetFilters.map((b) => <option key={b}>{b}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal outline-none" aria-label="Sort destinations">
              {sortOptions.map((s) => <option key={s.key} value={s.key}>Sort: {s.label}</option>)}
            </select>
            <span className="ml-auto text-xs uppercase tracking-wide text-charcoal/40">
              {filtered.length} {filtered.length === 1 ? 'place' : 'places'}
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-ink/5" />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((d) => <DestinationCard key={d.slug} destination={d} />)}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-ink/15 bg-ivory-card py-20 text-center">
              <p className="text-charcoal-soft">No destinations match those filters.</p>
              <button onClick={resetFilters} className="mt-4 text-sm font-medium uppercase tracking-wide text-vermilion">Reset filters {'\u2192'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
