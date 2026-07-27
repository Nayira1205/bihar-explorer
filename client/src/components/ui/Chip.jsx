function Chip({ active, onClick, children, theme = "light", icon: Icon }) {
  const base =
    "flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-all duration-250 cursor-pointer border";

  const styles =
    theme === "dark"
      ? active
        ? "bg-gold text-ink border-gold"
        : "border-gold/30 text-parchment hover:border-gold"
      : active
      ? "bg-ink text-ivory border-ink"
      : "border-ink/15 text-charcoal hover:border-ink/40";

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {Icon && <Icon size={14} strokeWidth={2} />}
      {children}
    </button>
  );
}

export default Chip;
