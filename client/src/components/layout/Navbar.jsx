import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, User, LogOut, ChevronDown, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const mainLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destinations' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Food', path: '/food' },
  { label: 'Culture', path: '/culture' },
  { label: 'Festivals', path: '/festivals' },
];

const moreLinks = [
  { label: 'Travel Planner', path: '/travel-planner' },
  { label: 'Explore Map', path: '/explore-map' },
  { label: 'About Bihar', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

function AccountMenu() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (!user) {
    return (
      <Link to="/login" className="hidden items-center gap-2 rounded-full border border-parchment/25 px-5 py-2.5 text-sm text-parchment/80 transition hover:border-gold hover:text-gold lg:flex">
        <User size={15} /> Log in
      </Link>
    );
  }

  const displayName = profile?.name || user.email?.split('@')[0] || 'User';
  const isAdmin = profile?.role === 'admin';

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-2 rounded-full border border-parchment/25 px-4 py-2.5 text-sm text-parchment/90 transition hover:border-gold" aria-expanded={menuOpen}>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-ink">{displayName.charAt(0).toUpperCase()}</span>
        {displayName.split(' ')[0]}
        <ChevronDown size={14} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-ink/10 bg-ivory-card py-2 shadow-xl">
          <div className="border-b border-ink/10 px-4 py-2">
            <p className="truncate text-xs text-charcoal/50">{user.email}</p>
            {isAdmin && <span className="mt-1 inline-block rounded-full bg-gold/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-vermilion">Admin</span>}
          </div>
          <button onClick={() => { setMenuOpen(false); navigate('/profile'); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-ink/5">
            <User size={14} /> My Profile
          </button>
          <button onClick={() => { setMenuOpen(false); navigate('/wishlist'); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-ink/5">
            <Heart size={14} /> Wishlist
          </button>
          {isAdmin && (
            <button onClick={() => { setMenuOpen(false); navigate('/admin'); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-ink/5">
              <Sparkles size={14} /> Admin Dashboard
            </button>
          )}
          <button onClick={() => { setMenuOpen(false); signOut(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-charcoal hover:bg-ink/5">
            <LogOut size={14} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const solidBg = scrolled || !isHome;

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${solidBg ? 'border-b border-gold/10 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent bg-gradient-to-b from-ink/60 to-transparent'}`}>
      <div className="flex items-center justify-between px-6 py-4 md:px-16">
        <Link to="/" className="flex items-center gap-2" aria-label="Bihar Explorer home">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <h1 className="font-display text-xl text-parchment">Bihar <span className="italic text-gold">Explorer</span></h1>
        </Link>

        <ul className="hidden gap-8 font-body text-sm uppercase tracking-wide text-parchment/80 lg:flex">
          {mainLinks.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className={`transition hover:text-gold ${location.pathname === l.path ? 'text-gold' : ''}`}>{l.label}</Link>
            </li>
          ))}
          <li className="relative">
            <button onClick={() => setMoreOpen((o) => !o)} className={`transition hover:text-gold ${moreLinks.some((l) => location.pathname === l.path) ? 'text-gold' : ''}`} aria-expanded={moreOpen}>
              More {moreOpen ? '\u2212' : '+'}
            </button>
            {moreOpen && (
              <div className="absolute left-1/2 top-full mt-2 w-48 -translate-x-1/2 rounded-2xl border border-ink/10 bg-ink/95 py-2 shadow-xl backdrop-blur-md">
                {moreLinks.map((l) => (
                  <Link key={l.path} to={l.path} className={`block px-4 py-2 text-xs uppercase tracking-wide transition hover:text-gold ${location.pathname === l.path ? 'text-gold' : 'text-parchment/70'}`}>{l.label}</Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/travel-planner" className="flex items-center gap-2 rounded-full border border-gold px-6 py-2.5 text-sm text-gold transition hover:bg-gold hover:text-ink">
            <Sparkles size={15} /> Travel Planner
          </Link>
          <AccountMenu />
        </div>

        <button onClick={() => setOpen(!open)} className="text-parchment lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <ul className="flex flex-col gap-4 border-t border-gold/10 bg-ink px-6 py-8 font-body text-parchment/80 lg:hidden">
          {mainLinks.map((l) => <li key={l.path}><Link to={l.path} className="text-sm uppercase tracking-wide">{l.label}</Link></li>)}
          {moreLinks.map((l) => <li key={l.path}><Link to={l.path} className="text-sm uppercase tracking-wide">{l.label}</Link></li>)}
          <li><Link to="/login" className="flex items-center gap-2 text-sm uppercase tracking-wide"><User size={15} /> Log in</Link></li>
          <li><Link to="/travel-planner" className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink"><Sparkles size={15} /> Travel Planner</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
