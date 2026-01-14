import { createFileRoute, createHead, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { lazy, Suspense } from "react";

import { allSpeakers, allTalks } from "content-collections";

import HeroCarousel from "@/components/HeroCarousel";
import SpeakerCard from "@/components/SpeakerCard";
import TalkCard from "@/components/TalkCard";

// Lazy load RemyAssistant for performance
const RemyAssistant = lazy(() =>
  import("@/components/RemyAssistant").then((mod) => ({
    default: mod.default,
  })),
);

function LoadingFallback() {
  return null;
}

export const Route = createFileRoute("/")({
  component: HomePage,
});

export const head = createHead(() => ({
  title: "Haute Pâtisserie 2026 - Paris Pastry Conference",
  meta: [
    {
      name: "description",
      content:
        "Join the world's most celebrated pastry chefs and master bakers for three extraordinary days of masterclasses, demonstrations, and culinary inspiration in Paris, France.",
    },
    {
      property: "og:title",
      content: "Haute Pâtisserie 2026",
    },
    {
      property: "og:description",
      content: "A world-class pastry conference in Paris. March 15-17, 2026.",
    },
    {
      property: "og:image",
      content: "https://haute-patisserie-2026.com/og-image.jpg",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
}));

function HomePage() {
  const featuredSpeakers = allSpeakers.slice(0, 3);
  const featuredTalks = allTalks.slice(0, 4);

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <RemyAssistant />
      </Suspense>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background carousel */}
        <HeroCarousel />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Event date badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-copper/10 border border-copper/30 text-copper-light text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>March 15-17, 2026</span>
            <span className="mx-2 text-copper/40">•</span>
            <MapPin className="w-4 h-4" />
            <span>Paris, France</span>
          </div>

          {/* Main title */}
          <h1 className="font-display text-6xl md:text-8xl font-bold text-cream mb-6 leading-tight">
            Haute
            <span className="block text-gold italic">Pâtisserie</span>
          </h1>

          <p className="text-xl md:text-2xl text-cream/70 font-body max-w-3xl mx-auto mb-10 leading-relaxed">
            Join the world's most celebrated pastry chefs and master bakers for
            three extraordinary days of masterclasses, demonstrations, and
            culinary inspiration.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gold">
                {allSpeakers.length}
              </div>
              <div className="text-cream/50 text-sm uppercase tracking-wider">
                Master Chefs
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gold">
                {allTalks.length}
              </div>
              <div className="text-cream/50 text-sm uppercase tracking-wider">
                Sessions
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gold">3</div>
              <div className="text-cream/50 text-sm uppercase tracking-wider">
                Days
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-linear-0-to-r from-copper to-copper-dark text-charcoal font-semibold text-lg transition-all hover:shadow-lg hover:shadow-copper/30 hover:scale-[1.02]"
            >
              <Users className="w-5 h-5" />
              Meet Our Speakers
            </Link>
            <Link
              to="/talks"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gold/50 text-gold font-semibold text-lg transition-all hover:bg-gold/10 hover:border-gold"
            >
              View Sessions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Speakers Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
                Featured <span className="text-gold italic">Speakers</span>
              </h2>
              <p className="text-cream/60 text-lg font-body">
                Learn from award-winning pastry chefs and master bakers
              </p>
            </div>
            <Link
              to="/speakers"
              className="hidden md:inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
            >
              View all speakers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.slug} speaker={speaker} featured />
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
            >
              View all speakers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-linear-0-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Featured Sessions Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
                Featured <span className="text-gold italic">Sessions</span>
              </h2>
              <p className="text-cream/60 text-lg font-body">
                Masterclasses and demonstrations to elevate your craft
              </p>
            </div>
            <Link
              to="/talks"
              className="hidden md:inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
            >
              View all sessions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTalks.map((talk) => (
              <TalkCard key={talk.slug} talk={talk} featured />
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link
              to="/talks"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
            >
              View all sessions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-linear-0-to-br from-card to-charcoal border border-border/50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Ready to Elevate Your Craft?
              </h2>
              <p className="text-cream/60 text-lg font-body mb-8 max-w-2xl mx-auto">
                Join us in Paris for an unforgettable experience with the
                world's finest pastry artisans.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium">
                <span>🥐</span>
                <span>Registration opens January 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
