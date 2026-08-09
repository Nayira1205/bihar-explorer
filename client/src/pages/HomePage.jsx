import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import WhyVisit from '../components/sections/WhyVisit';
import FeaturedDestinations from '../components/sections/FeaturedDestinations';
import Food from '../components/sections/Food';
import Festival from '../components/sections/Festival';
import FutureFeatures from '../components/sections/FutureFeatures';
import { CTAButton } from '../components/common/CTAButton';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyVisit />
      <FeaturedDestinations />
      <Food />
      <Festival />
      <section className="bg-ivory py-28 px-6 md:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Ready to explore <span className="italic text-vermilion">Bihar?</span>
          </h2>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Start planning your journey with our AI Travel Planner, or browse all destinations, experiences, and festivals.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton to="/travel-planner" variant="gold-solid">Plan My Trip</CTAButton>
            <CTAButton to="/destinations" variant="ink-outline">Browse Destinations</CTAButton>
          </div>
        </div>
      </section>
      <FutureFeatures />
    </>
  );
}
