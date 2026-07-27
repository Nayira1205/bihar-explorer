const variants = {
  "gold-solid":
    "bg-gold text-ink hover:scale-[1.03] shadow-[0_8px_24px_-8px_rgba(201,161,92,0.55)]",
  "gold-outline":
    "border border-gold text-gold hover:bg-gold hover:text-ink",
  "ink-outline":
    "border border-ink/25 text-ink hover:bg-ink hover:text-ivory",
  "ink-ghost": "text-ink/70 hover:text-ink",
};

function Button({ variant = "gold-solid", className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wide transition-all duration-300 cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
