import { useState, useCallback } from 'react';
import { Users, Calendar, Wallet, Sun, Heart, Car, Sparkles, ArrowLeft, ArrowRight, Clock, DollarSign } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import Button from '../components/ui/Button';
import { travellerTypes, budgets, seasons, interestOptions, transportOptions } from '../data/travelCompanion';
import { generateItinerary } from '../data/planner';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

const dayOptions = ['1', '2', '3', '5', '7', '10', '14'];

const steps = [
  { key: 'traveller', label: "Who's travelling?", icon: Users, type: 'single', options: travellerTypes },
  { key: 'days', label: 'How many days?', icon: Calendar, type: 'single', options: dayOptions },
  { key: 'budget', label: "What's your budget?", icon: Wallet, type: 'single', options: budgets },
  { key: 'season', label: 'When are you going?', icon: Sun, type: 'single', options: seasons },
  { key: 'interests', label: 'What draws you in?', icon: Heart, type: 'multi', options: interestOptions },
  { key: 'transport', label: 'Preferred transport?', icon: Car, type: 'single', options: transportOptions },
];

const emptyAnswers = {
  traveller: '',
  days: '',
  budget: '',
  season: '',
  interests: [],
  transport: '',
};

export default function TravelPlannerPage() {
  const { user } = useAuth();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({ ...emptyAnswers });
  const [itinerary, setItinerary] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const current = steps[stepIndex];
  const canAdvance = current.type === 'multi' ? answers[current.key].length > 0 : Boolean(answers[current.key]);

  const select = useCallback((key, value, multi = false) => {
    setAnswers((prev) => {
      if (!multi) return { ...prev, [key]: value };
      const list = prev[key];
      const newList = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      return { ...prev, [key]: newList };
    });
  }, []);

  const generate = useCallback(() => {
    const input = {
      days: parseInt(answers.days) || 3,
      budget: answers.budget,
      travellerType: answers.traveller,
      interests: answers.interests,
      transport: answers.transport,
    };
    setItinerary(generateItinerary(input));
  }, [answers]);

  const goNext = useCallback(() => {
    if (stepIndex === steps.length - 1) generate();
    else setStepIndex((i) => i + 1);
  }, [stepIndex, generate]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1));
  }, []);

  const reset = useCallback(() => {
    setAnswers({ ...emptyAnswers });
    setStepIndex(0);
    setItinerary(null);
    setSaved(false);
  }, []);

  const saveItinerary = async () => {
    if (!user || !itinerary) return;
    setSaving(true);
    try {
      await api.post('/itineraries', {
        name: `${answers.traveller} trip - ${answers.days} days`,
        itineraryData: { ...answers, itinerary },
      });
      setSaved(true);
    } catch {
      // ignore
    }
    setSaving(false);
  };

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="AI Travel Planner" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Plan your <span className="italic text-vermilion">perfect Bihar trip</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Tell us about your trip and we'll generate a day-by-day itinerary with budget estimates, recommendations, and tips.
          </p>
        </div>

        {!itinerary ? (
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="rounded-3xl bg-ivory-card border border-ink/10 p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-vermilion/70">{String(stepIndex + 1).padStart(2, '0')}</span>
                <span className="h-px w-8 bg-gold" />
                <span className="text-xs uppercase tracking-[0.3em] text-charcoal/50">Step {stepIndex + 1} of {steps.length}</span>
              </div>
              <h2 className="mt-5 flex items-center gap-3 font-display text-xl text-ink sm:text-2xl">
                <current.icon size={22} className="text-vermilion" />
                {current.label}
              </h2>
              <p className="mt-2 text-sm text-charcoal-soft">{current.type === 'multi' ? 'Pick as many as you like.' : 'Pick one to continue.'}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {current.options.map((opt) => {
                  const active = current.type === 'multi' ? answers[current.key].includes(opt) : answers[current.key] === opt;
                  return (
                    <Chip key={opt} active={active} onClick={() => select(current.key, opt, current.type === 'multi')}>{opt}</Chip>
                  );
                })}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button onClick={goBack} disabled={stepIndex === 0} className={`flex items-center gap-2 text-xs uppercase tracking-wide ${stepIndex === 0 ? 'invisible' : 'text-charcoal/60 hover:text-ink'}`}>
                  <ArrowLeft size={14} /> Back
                </button>
                <div className="flex gap-1.5" aria-hidden="true">
                  {steps.map((_, i) => <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === stepIndex ? 'bg-vermilion' : 'bg-ink/15'}`} />)}
                </div>
                <Button variant="ink-outline" onClick={goNext} disabled={!canAdvance} className={!canAdvance ? 'opacity-30' : ''}>
                  {stepIndex === steps.length - 1 ? 'Generate itinerary' : 'Next'}
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="rounded-3xl bg-ink p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
                  <Sparkles size={18} className="text-ink" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Your Itinerary</p>
                  <h2 className="font-display text-2xl text-parchment">{answers.days} days in Bihar</h2>
                </div>
              </div>
              <p className="mt-6 font-body text-lg leading-8 text-parchment/70">{itinerary.summary}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm text-gold">
                  <DollarSign size={14} /> {itinerary.totalBudget}
                </div>
                {user && (
                  <button onClick={saveItinerary} disabled={saving || saved} className="rounded-full border border-gold/40 px-5 py-2 text-sm text-gold transition hover:bg-gold/10 disabled:opacity-50">
                    {saved ? 'Saved!' : saving ? 'Saving...' : 'Save itinerary'}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {itinerary.days.map((day) => (
                <div key={day.day} className="rounded-3xl bg-ivory-card border border-ink/10 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-medium text-ink">{day.title}</h3>
                    <span className="flex items-center gap-1.5 text-xs text-charcoal/50"><Wallet size={13} /> {day.budget}</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {[
                      { label: 'AM', text: day.morning, bg: 'bg-vermilion/10', color: 'text-vermilion' },
                      { label: 'PM', text: day.afternoon, bg: 'bg-gold/10', color: 'text-gold' },
                      { label: 'EVE', text: day.evening, bg: 'bg-ink/10', color: 'text-ink' },
                    ].map((slot) => (
                      <div key={slot.label} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${slot.bg} text-xs font-semibold ${slot.color}`}>{slot.label}</span>
                        <p className="font-body text-sm leading-6 text-charcoal">{slot.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-charcoal/50"><Clock size={13} /> {day.meals}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-ink p-8">
              <h3 className="text-xs uppercase tracking-[0.3em] text-gold">Travel Tips</h3>
              <ul className="mt-4 space-y-2">
                {itinerary.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-parchment/80">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />{tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={reset} variant="gold-solid">Plan another trip</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
