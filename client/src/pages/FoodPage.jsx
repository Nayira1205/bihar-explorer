import { useState, useEffect, useMemo } from 'react';
import { MapPin, ChefHat } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import Modal from '../components/ui/Modal';
import { fetchFoods, getFoods, foodCategories } from '../data/foods';

export default function FoodPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods().then(() => setLoading(false));
  }, []);

  const foods = getFoods();
  const filtered = useMemo(
    () => activeCategory === 'All' ? foods : foods.filter((f) => f.category === activeCategory),
    [activeCategory, foods]
  );

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Food & Cuisine" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            The taste of <span className="italic text-vermilion">Bihar</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Regional cuisine, street food, festival specialties, and sweets. Click any dish to learn more.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {foodCategories.map((c) => (
            <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Chip>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-6xl grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-ink/5" />)
          ) : filtered.map((food) => (
            <div key={food.slug} onClick={() => setSelectedFood(food)} className="group cursor-pointer flex flex-col overflow-hidden rounded-3xl bg-ivory-card border border-ink/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
              <div className="relative h-56 overflow-hidden">
                <img src={food.image} alt={food.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-wide text-parchment backdrop-blur-sm">{food.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-medium text-ink">{food.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-soft">{food.description}</p>
                <span className="group/btn mt-4 flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-vermilion">
                  View details <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">{'\u2192'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={Boolean(selectedFood)} onClose={() => setSelectedFood(null)} labelledBy="food-modal-title">
        {selectedFood && (
          <div>
            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <img src={selectedFood.image} alt={selectedFood.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6 sm:p-10">
              <span className="rounded-full bg-gold/20 px-3 py-1 text-[11px] uppercase tracking-wide text-vermilion">{selectedFood.category}</span>
              <h2 id="food-modal-title" className="mt-3 font-display text-3xl font-medium text-ink">{selectedFood.name}</h2>
              <p className="mt-4 font-body text-[15px] leading-7 text-charcoal-soft">{selectedFood.description}</p>
              {selectedFood.origin && (
                <div className="mt-6">
                  <h3 className="flex items-center gap-2 text-xs uppercase tracking-wide text-charcoal/50">
                    <ChefHat size={14} /> Origin
                  </h3>
                  <p className="mt-2 text-sm text-charcoal">{selectedFood.origin}</p>
                </div>
              )}
              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-wide text-charcoal/50">Spice Level</h3>
                <p className="mt-2 text-sm text-charcoal">{selectedFood.spiceLevel || 'Medium'}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
