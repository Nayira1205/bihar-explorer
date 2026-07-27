import { useEffect, useRef, useState } from "react";
import { Menu, X, Sparkles, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Destinations", href: "#destinations" },
  { label: "Food", href: "#food" },
  { label: "Festivals", href: "#festivals" },
];

function AccountMenu({ onOpenAuth }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={onOpenAuth}
        className="hidden items-center gap-2 rounded-full border border-parchment/25 px-5 py-2.5 text-sm text-parchment/80 transition hover:border-gold hover:text-gold lg:flex"
      >
        <User size={15} />
        Log in
      </button>
    );
  }

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-parchment/25 px-4 py-2.5 text-sm text-parchment/90 transition hover:border-gold"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-ink">
          {user.name.charAt(0).toUpperCase()}
        </span>
        {user.name.split(" ")[0]}
        <ChevronDown size={14} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-ink/10 bg-ivory-card py-2 shadow-xl">
          <div className="border-b border-ink/10 px-4 py-2">
            <p className="truncate text-xs text-charcoal/50">{user.email}</p>
            {user.role === "admin" && (
              <span className="mt-1 inline-block rounded-full bg-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-vermilion">
                Admin
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-ink/5"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar({ onOpenCompanion, onOpenAuth }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-gold/10 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-16">
        <button onClick={() => handleLinkClick("#home")} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <h1 className="font-display text-xl text-parchment">
            Bihar <span className="italic text-gold">Explorer</span>
          </h1>
        </button>

        <ul className="hidden gap-8 font-body text-sm uppercase tracking-wide text-parchment/80 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => handleLinkClick(l.href)}
                className="cursor-pointer transition hover:text-gold"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            onClick={onOpenCompanion}
            className="flex items-center gap-2 rounded-full border border-gold px-6 py-2.5 text-sm text-gold transition hover:bg-gold hover:text-ink"
          >
            <Sparkles size={15} />
            Travel Companion
          </button>
          <AccountMenu onOpenAuth={onOpenAuth} />
        </div>

        <button onClick={() => setOpen(!open)} className="text-parchment lg:hidden" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <ul className="flex flex-col gap-6 border-t border-gold/10 bg-ink px-6 py-8 font-body text-parchment/80 lg:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <button onClick={() => handleLinkClick(l.href)} className="cursor-pointer">
                {l.label}
              </button>
            </li>
          ))}

          {user ? (
            <li className="flex items-center justify-between rounded-2xl border border-parchment/15 px-4 py-3">
              <span className="text-sm">{user.name}</span>
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-gold"
              >
                <LogOut size={13} /> Log out
              </button>
            </li>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                onOpenAuth();
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-parchment/25 px-6 py-3 text-sm"
            >
              <User size={15} />
              Log in
            </button>
          )}

          <button
            onClick={() => {
              setOpen(false);
              onOpenCompanion();
            }}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink"
          >
            <Sparkles size={15} />
            Travel Companion
          </button>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
