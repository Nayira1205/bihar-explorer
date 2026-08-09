import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import { fetchGallery, getGallery, galleryCategories } from '../data/gallery';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery().then(() => setLoading(false));
  }, []);

  const galleryItems = getGallery();
  const filtered = useMemo(
    () => activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory),
    [activeCategory, galleryItems]
  );

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Gallery" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Bihar in <span className="italic text-vermilion">pictures</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Heritage sites, festivals, food, and landscapes - a visual journey through Bihar.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {galleryCategories.map((c) => (
            <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Chip>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-6xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-56 animate-pulse rounded-2xl bg-ink/5" />)
          ) : filtered.map((item, i) => (
            <button key={item.id} onClick={() => setLightbox(i)} className="group relative overflow-hidden rounded-2xl" aria-label={`View ${item.title}`}>
              <img src={item.image} alt={item.title} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-ink">{item.category}</span>
                <p className="mt-2 text-sm text-parchment">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-6" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button onClick={() => setLightbox(null)} className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-parchment transition hover:bg-white/20" aria-label="Close">
            <X size={20} />
          </button>
          <div className="max-w-4xl text-center" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].image} alt={filtered[lightbox].title} className="mx-auto max-h-[70vh] rounded-2xl object-contain" />
            <p className="mt-4 font-display text-lg text-parchment">{filtered[lightbox].title}</p>
            <p className="mt-1 font-body text-sm text-parchment/60">{filtered[lightbox].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
