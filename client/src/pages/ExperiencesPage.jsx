import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import { fetchExperiences, getExperiences, experienceCategories } from '../data/experiences';

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences().then(() => setLoading(false));
  }, []);

  const experiences = getExperiences();
  const filtered = useMemo(
    () => activeCategory === 'All' ? experiences : experiences.filter((e) => e.category === activeCategory),
    [activeCategory, experiences]
  );

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Experiences" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Curated <span className="italic text-vermilion">experiences</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            River cruises, wildlife safaris, pilgrimages, photography tours, and weekend escapes - each crafted to show you a different side of Bihar.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {experienceCategories.map((c) => (
            <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Chip>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-6xl grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-ink/5" />)
          ) : filtered.map((exp) => (
            <div key={exp.slug} className="group flex flex-col overflow-hidden rounded-3xl bg-ivory-card border border-ink/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
              <div className="relative h-56 overflow-hidden">
                <img src={exp.image} alt={exp.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-wide text-parchment backdrop-blur-sm">{exp.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-medium text-ink">{exp.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-soft">{exp.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-charcoal/50">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {exp.duration}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={13} /> {exp.location}</span>
                </div>
                <Link to="/travel-planner" className="group/btn mt-5 flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-vermilion">
                  Plan this experience
                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">{'\u2192'}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
