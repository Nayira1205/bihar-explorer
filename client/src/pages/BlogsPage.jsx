import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import Chip from '../components/ui/Chip';
import { fetchBlogs, getBlogs, blogCategories, getBlogBySlug } from '../data/blogs';

export default function BlogsPage() {
  const { slug } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchBlogs().then(() => setLoaded(true));
  }, []);

  if (slug) return <BlogDetail slug={slug} />;
  return <BlogList loaded={loaded} />;
}

function BlogDetail({ slug }) {
  const blog = getBlogBySlug(slug);
  const blogs = getBlogs();

  if (!blog) {
    return (
      <div className="bg-ivory min-h-screen pt-32 px-6 text-center">
        <h1 className="font-display text-4xl text-ink">Blog not found</h1>
        <Link to="/blogs" className="mt-6 inline-block text-sm font-medium uppercase tracking-wide text-vermilion">{'\u2190'} Back to blogs</Link>
      </div>
    );
  }

  const related = blogs.filter((b) => b.category === blog.category && b.slug !== blog.slug).slice(0, 3);

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <article className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl">
          <Link to="/blogs" className="flex items-center gap-2 text-sm text-charcoal/60 transition hover:text-ink">
            <ArrowLeft size={16} /> Back to blogs
          </Link>
          <div className="mt-8">
            <span className="rounded-full bg-vermilion/10 px-3 py-1 text-[11px] uppercase tracking-wide text-vermilion">{blog.category}</span>
            <h1 className="mt-4 font-display text-4xl font-medium text-ink sm:text-5xl">{blog.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-xs text-charcoal/50">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime}</span>
              <span>By {blog.author}</span>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl">
            <img src={blog.image} alt={blog.title} className="h-72 w-full object-cover sm:h-96" />
          </div>
          <div className="mt-8 space-y-6">
            <p className="font-body text-lg font-medium leading-8 text-charcoal">{blog.excerpt}</p>
            {blog.content && blog.content.split('\n\n').map((para, i) => (
              <p key={i} className="font-body text-base leading-8 text-charcoal-soft">{para}</p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-ink py-20 px-6 md:px-12 xl:px-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-medium text-parchment">
              More from <span className="italic text-gold">{blog.category}</span>
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/blogs/${r.slug}`} className="group overflow-hidden rounded-3xl border border-parchment/10 bg-white/[0.03] transition hover:border-gold/30">
                  <div className="h-44 overflow-hidden">
                    <img src={r.image} alt={r.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg text-parchment">{r.title}</h3>
                    <p className="mt-2 text-sm text-parchment/60 line-clamp-2">{r.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function BlogList({ loaded }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const blogs = getBlogs();

  const filtered = useMemo(
    () => activeCategory === 'All' ? blogs : blogs.filter((b) => b.category === activeCategory),
    [activeCategory, blogs]
  );

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Blogs & Stories" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Stories from <span className="italic text-vermilion">Bihar</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">Travel guides, cultural deep-dives, and stories from the road.</p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {blogCategories.map((c) => (
            <Chip key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>{c}</Chip>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-6xl grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {!loaded ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-80 animate-pulse rounded-3xl bg-ink/5" />)
          ) : filtered.map((blog) => (
            <Link key={blog.slug} to={`/blogs/${blog.slug}`} className="group flex flex-col overflow-hidden rounded-3xl bg-ivory-card border border-ink/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
              <div className="relative h-48 overflow-hidden">
                <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-wide text-parchment backdrop-blur-sm">{blog.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-charcoal/50">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">{blog.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-charcoal-soft line-clamp-3">{blog.excerpt}</p>
                <span className="group/btn mt-4 flex w-fit items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-vermilion">
                  Read more <ChevronRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
