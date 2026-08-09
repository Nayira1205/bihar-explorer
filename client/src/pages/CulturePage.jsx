import { Link } from 'react-router-dom';
import { Landmark, BookOpen, Music, Palette, Languages, Scroll } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';

const culturePillars = [
  { icon: Landmark, title: 'Architecture & Monuments', description: "From the Mauryan pillars of Ashoka to the beehive granary of Golghar, Bihar's architecture spans 2,500 years of political and spiritual power.", link: '/destinations', linkLabel: 'Explore heritage sites' },
  { icon: BookOpen, title: 'Literature & Learning', description: "Bihar was home to Nalanda and Vikramshila - the world's first residential universities. It produced texts in Pali, Sanskrit, and Prakrit that shaped Asian thought.", link: '/blogs', linkLabel: 'Read more' },
  { icon: Music, title: 'Music & Folk Traditions', description: "Bihar's folk music - from the Sohar songs of childbirth to the Chhath geet - is passed down orally across generations, tied to the rhythms of rural life.", link: '/festivals', linkLabel: 'Explore festivals' },
  { icon: Palette, title: 'Art & Craft', description: "Madhubani (Mithila) painting, one of India's most recognized art forms, originated in Bihar. The state also has rich traditions in sikki grass weaving and stone carving.", link: '/gallery', linkLabel: 'View gallery' },
  { icon: Languages, title: 'Languages', description: "Bihar is linguistically diverse: Hindi is official, but Bhojpuri, Maithili, Magahi, and Angika are living regional languages with their own literary traditions.", link: '/about', linkLabel: 'About Bihar' },
  { icon: Scroll, title: 'Religion & Philosophy', description: 'Bihar is the birthplace of Buddhism (Buddha attained enlightenment at Bodh Gaya) and a major site for Jainism (Lord Mahavira was born at Kundalpur).', link: '/destinations/mahabodhi-temple', linkLabel: 'Visit Bodh Gaya' },
];

const timeline = [
  { era: '6th century BCE', event: 'Buddha attains enlightenment at Bodh Gaya; Vaishali becomes the world\'s first republic' },
  { era: '5th century BCE', event: 'Magadha Empire rises under Bimbisara and Ajatashatru with Rajgir as capital' },
  { era: '3rd century BCE', event: 'Emperor Ashoka rules from Pataliputra (Patna); erects pillars across Bihar' },
  { era: '5th century CE', event: 'Nalanda University founded - draws 10,000 students from across Asia' },
  { era: '8th century CE', event: 'Vikramshila University established by King Dharmapala' },
  { era: '12th century CE', event: 'Both Nalanda and Vikramshila destroyed by invaders' },
  { era: '16th-18th century', event: 'Mughal and then British rule; Golghar built in 1786 as famine granary' },
  { era: '1912', event: 'Bihar established as a separate province under British India' },
  { era: '2000', event: 'Jharkhand carved out of southern Bihar; modern Bihar takes its current form' },
];

export default function CulturePage() {
  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Heritage & Culture" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            A culture <span className="italic text-vermilion">older than history</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Bihar gave the world its first republic, its first residential university, and one of its great religions. Its culture is still alive - in its art, its music, its languages, and its people.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {culturePillars.map((p) => (
            <div key={p.title} className="group rounded-3xl border border-ink/10 bg-ivory-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vermilion/10">
                <p.icon size={24} className="text-vermilion" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal-soft">{p.description}</p>
              <Link to={p.link} className="group/btn mt-5 flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-wide text-vermilion">
                {p.linkLabel}
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">{'\u2192'}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-center font-display text-3xl font-medium text-ink sm:text-4xl">
            A brief <span className="italic text-vermilion">timeline</span>
          </h2>
          <div className="mt-12 space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-vermilion text-xs font-semibold text-parchment">{i + 1}</div>
                  {i < timeline.length - 1 && <div className="mt-1 w-px flex-1 bg-ink/10" />}
                </div>
                <div className="pt-1.5">
                  <p className="font-mono text-xs text-gold">{item.era}</p>
                  <p className="mt-1 font-body text-sm leading-6 text-charcoal">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
