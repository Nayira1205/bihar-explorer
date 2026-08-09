import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Instagram, Facebook, Youtube, TwitterX } from '../ui/SocialIcons';
import { api } from '../../lib/api';

const exploreLinks = [
  { label: 'Destinations', path: '/destinations' },
  { label: 'Food & Cuisine', path: '/food' },
  { label: 'Festivals', path: '/festivals' },
  { label: 'Heritage & Culture', path: '/culture' },
  { label: 'Experiences', path: '/experiences' },
];

const planLinks = [
  { label: 'Travel Planner', path: '/travel-planner' },
  { label: 'Explore Map', path: '/explore-map' },
  { label: 'About Bihar', path: '/about' },
  { label: 'FAQ', path: '/faq' },
];

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: TwitterX, label: 'Twitter / X' },
];

function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      api.subscribeNewsletter(email)
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-ink px-6 pt-20 md:px-12 xl:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 border-b border-parchment/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display text-2xl text-parchment">Bihar <span className="italic text-gold">Explorer</span></h2>
            <p className="mt-4 text-sm leading-6 text-parchment/60">A guide to Bihar's heritage, spirituality, food, and living culture - built to help travellers see the state as it actually is.</p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <span key={s.label} aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-parchment/15 text-parchment/70 transition hover:border-gold hover:text-gold">
                  <s.icon size={16} />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Explore</h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((l) => <li key={l.path}><Link to={l.path} className="text-sm text-parchment/70 transition hover:text-gold">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Plan Your Trip</h3>
            <ul className="mt-5 space-y-3">
              {planLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="flex items-center gap-1.5 text-sm text-parchment/70 transition hover:text-gold">
                    {l.label === 'Travel Planner' && <Sparkles size={13} />}{l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm text-parchment/60">
              <p className="flex items-center gap-2"><Phone size={14} className="text-gold" /> Bihar Tourism: +91-612-221-7045</p>
              <p className="flex items-center gap-2"><Mail size={14} className="text-gold" /> secy-tourism-bih@nic.in</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Stay Inspired</h3>
            <p className="mt-5 text-sm leading-6 text-parchment/60">Occasional notes on new destinations, festivals, and features - no spam.</p>
            {status === 'done' ? (
              <p className="mt-5 text-sm text-gold">You're on the list. Dhanyavad!</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-2">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" disabled={status === 'loading'} aria-label="Email address" className="w-full rounded-full border border-parchment/15 bg-white/5 px-4 py-2.5 text-sm text-parchment outline-none placeholder:text-parchment/30 focus:border-gold disabled:opacity-50" />
                <button type="submit" aria-label="Subscribe" disabled={status === 'loading'} className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold text-ink transition hover:scale-105 disabled:opacity-50">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            {status === 'error' && <p className="mt-2 text-xs text-vermilion/80">Couldn't subscribe right now. Try again.</p>}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 py-8 text-center text-xs text-parchment/40 sm:flex-row sm:justify-between sm:text-left">
          <p className="flex items-center gap-1.5"><MapPin size={13} /> Concept portal for the Bihar Tourism experience - not an official government website.</p>
          <p>&copy; {new Date().getFullYear()} Bihar Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
