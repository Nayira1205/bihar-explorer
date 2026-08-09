import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titles = {
  '/': 'Bihar Explorer - Discover the Soul of Bihar',
  '/destinations': 'Destinations - Bihar Explorer',
  '/experiences': 'Experiences - Bihar Explorer',
  '/food': 'Food & Cuisine - Bihar Explorer',
  '/culture': 'Heritage & Culture - Bihar Explorer',
  '/festivals': 'Festivals - Bihar Explorer',
  '/travel-planner': 'AI Travel Planner - Bihar Explorer',
  '/explore-map': 'Explore Map - Bihar Explorer',
  '/about': 'About Bihar - Bihar Explorer',
  '/gallery': 'Gallery - Bihar Explorer',
  '/blogs': 'Blogs & Stories - Bihar Explorer',
  '/contact': 'Contact - Bihar Explorer',
  '/faq': 'FAQ - Bihar Explorer',
  '/login': 'Log in - Bihar Explorer',
  '/register': 'Sign up - Bihar Explorer',
  '/profile': 'My Profile - Bihar Explorer',
  '/wishlist': 'My Wishlist - Bihar Explorer',
  '/admin': 'Admin Dashboard - Bihar Explorer',
};

const descriptions = {
  '/': "Discover Bihar's heritage, spirituality, cuisine, wildlife, and festivals - an immersive guide to the soul of Bihar.",
  '/destinations': 'Explore all destinations in Bihar - heritage sites, spiritual centers, nature escapes, and more.',
  '/food': "Taste Bihar's cuisine - litti chokha, Champaran mutton, Silao khaja, thekua, and more regional specialties.",
  '/festivals': "Celebrate Bihar's living heritage - Chhath Puja, Sonepur Mela, Jitiya, and more festivals.",
  '/travel-planner': 'Plan your perfect Bihar trip with our AI-powered travel planner.',
};

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isDestinationDetail = pathname.startsWith('/destinations/');
    const isBlogDetail = pathname.startsWith('/blogs/');

    let title = titles[pathname] || 'Bihar Explorer - Discover the Soul of Bihar';
    let description = descriptions[pathname] || descriptions['/'];

    if (isDestinationDetail) {
      title = 'Destination - Bihar Explorer';
      description = 'Explore this destination in Bihar - history, things to do, travel tips, and more.';
    } else if (isBlogDetail) {
      title = 'Blog - Bihar Explorer';
      description = 'Read stories and travel guides about Bihar.';
    }

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
  }, [pathname]);
}
