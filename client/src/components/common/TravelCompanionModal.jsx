import { useState } from "react";
import {
  Users,
  Calendar,
  Wallet,
  Sun,
  Heart,
  MapPin,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Modal from "../ui/Modal";
import Chip from "../ui/Chip";
import Button from "../ui/Button";
import {
  travellerTypes,
  durations,
  budgets,
  seasons,
  interestOptions,
  districts,
  districtRecommendations,
} from "../../data/travelCompanion";

const steps = [
  { key: "traveller", label: "Who's travelling?", icon: Users, type: "single", options: travellerTypes },
  { key: "duration", label: "How long do you have?", icon: Calendar, type: "single", options: durations },
  { key: "budget", label: "What's your budget?", icon: Wallet, type: "single", options: budgets },
  { key: "season", label: "When are you going?", icon: Sun, type: "single", options: seasons },
  { key: "interests", label: "What draws you in?", icon: Heart, type: "multi", options: interestOptions },
  { key: "district", label: "Which district first?", icon: MapPin, type: "single", options: districts },
];

const emptyAnswers = {
  traveller: "",
  duration: "",
  budget: "",
  season: "",
  interests: [],
  district: "",
};

function TravelCompanionModal({ open, onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [done, setDone] = useState(false);

  const current = steps[stepIndex];
  const rec = districtRecommendations[answers.district];

  const select = (key, value, multi = false) => {
    setAnswers((prev) => {
      if (!multi) return { ...prev, [key]: value };
      const list = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: list };
    });
  };

  const canAdvance =
    current.type === "multi" ? answers[current.key].length > 0 : Boolean(answers[current.key]);

  const goNext = () => {
    if (stepIndex === steps.length - 1) setDone(true);
    else setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (done) {
      setDone(false);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const reset = () => {
    setAnswers(emptyAnswers);
    setStepIndex(0);
    setDone(false);
  };

  const handleClose = () => {
    onClose();
    // Give the close animation a beat before wiping state.
    setTimeout(reset, 250);
  };

  return (
    <Modal open={open} onClose={handleClose} labelledBy="travel-companion-title">
      <div className="p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
            <Sparkles size={18} className="text-ink" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-vermilion/80">
              Travel Companion
            </p>
            <h2 id="travel-companion-title" className="text-2xl text-ink" style={{ fontFamily: "'Fraunces', serif" }}>
              Your journey, your story
            </h2>
          </div>
        </div>

        {!done ? (
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-vermilion/70">
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-charcoal/50">
                Step {stepIndex + 1} of {steps.length}
              </span>
            </div>

            <h3 className="mt-5 flex items-center gap-3 text-xl text-ink sm:text-2xl" style={{ fontFamily: "'Fraunces', serif" }}>
              <current.icon size={22} className="text-vermilion" />
              {current.label}
            </h3>
            <p className="mt-2 text-sm text-charcoal-soft">
              {current.type === "multi" ? "Pick as many as you like." : "Pick one to continue."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {current.options.map((opt) => {
                const active =
                  current.type === "multi"
                    ? answers[current.key].includes(opt)
                    : answers[current.key] === opt;
                return (
                  <Chip key={opt} active={active} onClick={() => select(current.key, opt, current.type === "multi")}>
                    {opt}
                  </Chip>
                );
              })}
            </div>

            {rec && current.key === "district" && (
              <div className="mt-6 rounded-2xl bg-ivory p-4 text-sm text-charcoal-soft">
                <span className="font-medium text-ink">{answers.district}</span> is usually best{" "}
                {rec.bestTime.toLowerCase()}, around {rec.budget}.
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={goBack}
                disabled={stepIndex === 0}
                className={`flex items-center gap-2 text-xs uppercase tracking-wide ${
                  stepIndex === 0 ? "invisible" : "text-charcoal/60 hover:text-ink"
                }`}
              >
                <ArrowLeft size={14} /> Back
              </button>

              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === stepIndex ? "bg-vermilion" : "bg-ink/15"}`} />
                ))}
              </div>

              <Button variant="ink-outline" onClick={goNext} disabled={!canAdvance} className={!canAdvance ? "opacity-30" : ""}>
                {stepIndex === steps.length - 1 ? "See my plan" : "Next"}
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-sm text-charcoal-soft">Here's a starting point, based on what you told us.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["Travelling as", answers.traveller],
                ["Duration", answers.duration],
                ["Budget", answers.budget],
                ["Season", answers.season],
                ["District", answers.district],
                ["Interests", answers.interests.join(", ")],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-ivory p-3.5">
                  <p className="text-[10px] uppercase tracking-wide text-charcoal/50">{label}</p>
                  <p className="mt-1 text-sm text-ink">{value || "—"}</p>
                </div>
              ))}
            </div>

            {rec && (
              <div className="mt-6 rounded-2xl bg-ink p-6">
                <p className="text-xs uppercase tracking-widest text-gold">Don't miss, in {answers.district}</p>
                <ul className="mt-3 space-y-1.5">
                  {rec.places.slice(0, 3).map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-parchment/85">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-parchment/70">
                  Signature festival: <span className="text-parchment">{rec.festival}</span>
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={reset} variant="gold-solid">
                Start over
              </Button>
              <button className="text-sm font-medium uppercase tracking-wide text-vermilion">
                Generate full AI itinerary — coming soon
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default TravelCompanionModal;
