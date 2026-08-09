import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MapPin, FileText, Calendar, Users, Image, Plus, Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { fetchDestinations, getDestinations } from '../data/destinations';
import { fetchBlogs, getBlogs } from '../data/blogs';
import { fetchFestivals, getFestivals } from '../data/festivals';

export default function AdminPage() {
  const { user, profile, loading } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([fetchDestinations(), fetchBlogs(), fetchFestivals()]).then(() => setLoaded(true));
  }, []);

  if (loading || !loaded) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role !== 'admin') return <Navigate to="/profile" replace />;

  const destinations = getDestinations();
  const blogs = getBlogs();
  const festivals = getFestivals();

  const stats = [
    { icon: MapPin, label: 'Destinations', value: destinations.length },
    { icon: FileText, label: 'Blog Posts', value: blogs.length },
    { icon: Calendar, label: 'Festivals', value: festivals.length },
    { icon: Users, label: 'Users', value: 1 },
  ];

  const managementSections = [
    {
      icon: MapPin,
      title: 'Destinations',
      items: destinations.map((d) => ({ slug: d.slug, name: d.name, image: d.images[0], sub: `${d.district} \u00b7 ${d.category}` })),
    },
    {
      icon: FileText,
      title: 'Blog Posts',
      items: blogs.map((b) => ({ slug: b.slug, name: b.title, image: b.image, sub: `${b.category} \u00b7 ${b.readTime}` })),
    },
    {
      icon: Calendar,
      title: 'Festivals',
      items: festivals.map((f) => ({ slug: f.slug, name: f.title, image: f.resolvedImage, sub: `${f.badge} \u00b7 ${f.month}` })),
    },
  ];

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={28} className="text-vermilion" />
            <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">
              Admin <span className="italic text-vermilion">Dashboard</span>
            </h1>
          </div>
          <p className="mt-4 font-body text-lg text-charcoal-soft">Manage destinations, blogs, festivals, and users.</p>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-ink p-6 text-center">
                <s.icon size={24} className="mx-auto text-gold" />
                <p className="mt-3 font-display text-3xl text-parchment">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-parchment/50">{s.label}</p>
              </div>
            ))}
          </div>

          {managementSections.map((section) => (
            <div key={section.title} className="mt-8 rounded-3xl bg-ivory-card border border-ink/10 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-3 font-display text-xl font-medium text-ink">
                  <section.icon size={20} className="text-vermilion" /> {section.title}
                </h2>
                <button className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition hover:scale-[1.03]">
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="mt-6 space-y-3">
                {section.items.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between rounded-2xl border border-ink/10 bg-ivory p-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} loading="lazy" className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-medium text-ink">{item.name}</p>
                        <p className="text-xs text-charcoal/50">{item.sub}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-charcoal transition hover:bg-ink hover:text-ivory" aria-label={`Edit ${item.name}`}>
                        <Edit size={14} />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-vermilion/20 text-vermilion transition hover:bg-vermilion hover:text-parchment" aria-label={`Delete ${item.name}`}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 rounded-3xl bg-ivory-card border border-ink/10 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 font-display text-xl font-medium text-ink">
                <Image size={20} className="text-vermilion" /> Gallery
              </h2>
              <button className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition hover:scale-[1.03]">
                <Plus size={14} /> Add
              </button>
            </div>
            <p className="mt-4 font-body text-sm text-charcoal-soft">Gallery management interface - upload and organize images by category.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
