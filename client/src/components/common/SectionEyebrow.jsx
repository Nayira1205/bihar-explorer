function SectionEyebrow({ number, label }) {
    return (
      <>
        <span className="font-mono text-xs text-gold/70">{number}</span>
        <span className="h-px w-8 bg-vermilion" />
        <p className="text-sm uppercase tracking-[0.35em] text-gold">{label}</p>
      </>
    );
  }
  
  export default SectionEyebrow;