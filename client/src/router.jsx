import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const DestinationDetailPage = lazy(() => import('./pages/DestinationDetailPage'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const FoodPage = lazy(() => import('./pages/FoodPage'));
const CulturePage = lazy(() => import('./pages/CulturePage'));
const FestivalsPage = lazy(() => import('./pages/FestivalsPage'));
const TravelPlannerPage = lazy(() => import('./pages/TravelPlannerPage'));
const ExploreMapPage = lazy(() => import('./pages/ExploreMapPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogsPage = lazy(() => import('./pages/BlogsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink/20 border-t-vermilion" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<LoadingFallback />}><HomePage /></Suspense> },
      { path: 'destinations', element: <Suspense fallback={<LoadingFallback />}><DestinationsPage /></Suspense> },
      { path: 'destinations/:slug', element: <Suspense fallback={<LoadingFallback />}><DestinationDetailPage /></Suspense> },
      { path: 'experiences', element: <Suspense fallback={<LoadingFallback />}><ExperiencesPage /></Suspense> },
      { path: 'food', element: <Suspense fallback={<LoadingFallback />}><FoodPage /></Suspense> },
      { path: 'culture', element: <Suspense fallback={<LoadingFallback />}><CulturePage /></Suspense> },
      { path: 'festivals', element: <Suspense fallback={<LoadingFallback />}><FestivalsPage /></Suspense> },
      { path: 'travel-planner', element: <Suspense fallback={<LoadingFallback />}><TravelPlannerPage /></Suspense> },
      { path: 'explore-map', element: <Suspense fallback={<LoadingFallback />}><ExploreMapPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<LoadingFallback />}><AboutPage /></Suspense> },
      { path: 'gallery', element: <Suspense fallback={<LoadingFallback />}><GalleryPage /></Suspense> },
      { path: 'blogs', element: <Suspense fallback={<LoadingFallback />}><BlogsPage /></Suspense> },
      { path: 'blogs/:slug', element: <Suspense fallback={<LoadingFallback />}><BlogsPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<LoadingFallback />}><ContactPage /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<LoadingFallback />}><FAQPage /></Suspense> },
      { path: 'login', element: <Suspense fallback={<LoadingFallback />}><LoginPage /></Suspense> },
      { path: 'register', element: <Suspense fallback={<LoadingFallback />}><RegisterPage /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<LoadingFallback />}><ProfilePage /></Suspense> },
      { path: 'wishlist', element: <Suspense fallback={<LoadingFallback />}><WishlistPage /></Suspense> },
      { path: 'admin', element: <Suspense fallback={<LoadingFallback />}><AdminPage /></Suspense> },
    ],
  },
]);

export default router;
