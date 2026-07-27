import { useState } from "react";
import { MapPin } from "lucide-react";
import SectionEyebrow from "../common/SectionEyebrow";
import Chip from "../ui/Chip";
import { LoadingGrid, ErrorState } from "../ui/AsyncState";
import { foodCategories } from "../../data/foods";
import { useFoods } from "../../hooks/useFoods";

function FoodCard({ food }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card h-80 cursor-pointer ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-face overflow-hidden rounded-3xl">
          <img src={food.resolvedImage} alt={food.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="rounded-full bg-gold/90 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink">
              {food.tag}
            </span>
            <h3 className="mt-3 text-2xl text-parchment" style={{ fontFamily: "'Fraunces', serif" }}>
              {food.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-wide text-parchment/60">Tap to flip</p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-face flip-card-back flex flex-col justify-between rounded-3xl bg-ink p-6">
          <div>
            <h3 className="text-xl text-parchment" style={{ fontFamily: "'Fraunces', serif" }}>
              {food.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-parchment/70">{food.description}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gold">Where to eat</p>
            <ul className="mt-2 space-y-1.5">
              {food.whereToEat.map((w) => (
                <li key={w} className="flex items-start gap-2 text-xs text-parchment/80">
                  <MapPin size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Food() {
  const [activeCategory, setActiveCategory] = useState(foodCategories[0]);
  const { foods, loading, error, refetch } = useFoods(activeCategory);

  return (
    <section id="food" className="bg-ivory py-28 px-6 md:px-12 xl:px-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-4">
          <SectionEyebrow number="04" label="Taste of Bihar" />
        </div>
        <h2
          className="mt-8 text-4xl text-ink sm:text-5xl md:text-6xl"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          A cuisine built on
          <span className="italic text-vermilion"> comfort and craft</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-charcoal-soft">
          From roadside litti stalls to festival sweets passed down for generations. Flip a card to see where to try it.
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
        {foodCategories.map((c) => (
          <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        {loading && <LoadingGrid count={3} />}
        {!loading && error && <ErrorState message={error} onRetry={refetch} />}
        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Food;
