import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import { faqItems, faqCategories } from '../data/faqs';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(
    () => activeCategory === 'All' ? faqItems : faqItems.filter((f) => f.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="FAQ" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Frequently asked <span className="italic text-vermilion">questions</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Everything you need to know about visiting Bihar - timing, budget, safety, and more.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {faqCategories.map((c) => (
            <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Chip>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-ivory-card">
              <button onClick={() => setOpenId(openId === item.id ? null : item.id)} className="flex w-full items-center justify-between gap-4 p-5 text-left" aria-expanded={openId === item.id}>
                <span className="font-display text-base font-medium text-ink">{item.question}</span>
                <ChevronDown size={18} className={`flex-shrink-0 text-vermilion transition-transform ${openId === item.id ? 'rotate-180' : ''}`} />
              </button>
              {openId === item.id && (
                <div className="px-5 pb-5">
                  <p className="font-body text-sm leading-7 text-charcoal-soft">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
