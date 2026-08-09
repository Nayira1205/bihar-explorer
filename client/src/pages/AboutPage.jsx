import { Landmark, BookOpen, Sparkles, Users, Globe2 } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import { CTAButton } from '../components/common/CTAButton';

const stats = [
  { value: '2,500+', label: 'Years of history' },
  { value: '100M+', label: 'People' },
  { value: '38', label: 'Districts' },
  { value: '4', label: 'UNESCO sites' },
];

const facts = [
  { icon: Globe2, title: 'Birthplace of Buddhism', text: 'Buddha attained enlightenment under the Bodhi tree at Bodh Gaya around 2,500 years ago, making Bihar the spiritual center of the Buddhist world.' },
  { icon: BookOpen, title: 'First Residential University', text: 'Nalanda, founded in the 5th century CE, was the world\'s first residential university, hosting over 10,000 students from across Asia.' },
  { icon: Users, title: 'First Republic', text: 'Vaishali, in ancient Bihar, was the capital of the Vajji confederacy - widely considered the world\'s first republic, around the 6th century BCE.' },
  { icon: Landmark, title: 'Mauryan Capital', text: 'Pataliputra (modern Patna) was the capital of the Maurya Empire under Emperor Ashoka, one of the largest empires in Indian history.' },
  { icon: Sparkles, title: 'Living Traditions', text: 'Chhath Puja, Madhubani painting, and Bhojpuri music are just a few of Bihar\'s living cultural traditions that continue to thrive today.' },
];

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="About Bihar" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            The land of <span className="italic text-vermilion">enlightenment</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Bihar is a state in eastern India, bordered by Nepal to the north and the Ganges river flowing through its heart. It is one of the oldest continuously inhabited places on earth - the cradle of civilizations, religions, and ideas that shaped the world.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-ink p-8 text-center">
              <p className="font-display text-4xl text-gold">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-parchment/45">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <h2 className="text-center font-display text-3xl font-medium text-ink sm:text-4xl">
            What Bihar <span className="italic text-vermilion">gave the world</span>
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((f) => (
              <div key={f.title} className="rounded-3xl border border-ink/10 bg-ivory-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vermilion/10">
                  <f.icon size={24} className="text-vermilion" />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-ink">{f.title}</h3>
                <p className="mt-3 font-body text-sm leading-6 text-charcoal-soft">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="font-display text-3xl font-medium text-ink">
            Geography & <span className="italic text-vermilion">climate</span>
          </h2>
          <div className="mt-6 space-y-4 font-body text-lg leading-8 text-charcoal-soft">
            <p>Bihar covers 94,163 square kilometers in eastern India, divided by the Ganges river into two halves. The north is a flat, fertile alluvial plain bordering Nepal; the south has small hill ranges and forests.</p>
            <p>The climate is subtropical with three seasons: a hot summer (March-June, 30-44C), a monsoon (July-September, heavy rain), and a cool winter (October-February, 8-25C). The best time to visit is October to March.</p>
            <p>Major rivers include the Ganges, Gandak, Kosi, and Sone. The state is predominantly agricultural - rice, wheat, maize, and sugarcane are the main crops.</p>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-4xl text-center">
          <h2 className="font-display text-3xl font-medium text-ink">
            Start your <span className="italic text-vermilion">journey</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CTAButton to="/destinations" variant="gold-solid">Explore destinations</CTAButton>
            <CTAButton to="/travel-planner" variant="ink-outline">Plan your trip</CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
