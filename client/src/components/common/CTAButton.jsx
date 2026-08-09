import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variantClasses = {
  'gold-solid': 'bg-gold text-ink hover:scale-[1.03] shadow-gold',
  'gold-outline': 'border border-gold text-gold hover:bg-gold hover:text-ink',
  'ink-outline': 'border border-ink/25 text-ink hover:bg-ink hover:text-ivory',
  'ink-ghost': 'text-ink/70 hover:text-ink',
  'parchment-outline': 'border border-parchment/25 text-parchment hover:border-gold hover:text-gold',
};

export function CTAButton({ to, variant = 'gold-solid', children, className = '' }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      {children}
      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
