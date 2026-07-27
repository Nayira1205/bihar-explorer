export function LoadingGrid({ count = 6, dark = false }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-80 animate-pulse rounded-3xl ${dark ? "bg-white/[0.04]" : "bg-ink/5"}`}
        />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry, dark = false }) {
  return (
    <div
      className={`rounded-3xl border border-dashed py-16 text-center ${
        dark ? "border-parchment/15 bg-white/[0.03]" : "border-ink/15 bg-ivory-card"
      }`}
    >
      <p className={dark ? "text-parchment/70" : "text-charcoal-soft"}>
        {message || "Something went wrong loading this section."}
      </p>
      <p className={`mt-1 text-xs ${dark ? "text-parchment/40" : "text-charcoal/40"}`}>
        Is the API running? (<code>npm run dev</code> inside <code>server/</code>)
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`mt-5 rounded-full border px-5 py-2 text-xs uppercase tracking-wide ${
            dark
              ? "border-gold/40 text-gold hover:bg-gold/10"
              : "border-ink/20 text-ink hover:bg-ink/5"
          }`}
        >
          Try again
        </button>
      )}
    </div>
  );
}
