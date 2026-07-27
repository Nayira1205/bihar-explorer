import { Search } from "lucide-react";

function SearchInput({ value, onChange, placeholder = "Search" }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-ink/15 bg-ivory-card px-5 py-2.5 text-sm text-charcoal focus-within:border-ink/40">
      <Search size={16} className="text-charcoal/50" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none placeholder:text-charcoal/40"
      />
    </div>
  );
}

export default SearchInput;
