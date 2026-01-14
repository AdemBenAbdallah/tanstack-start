import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";

import RemyAssistant from "@/components/RemyAssistant";

export const Route = createFileRoute("/schedule/")({
  component: SchedulePage,
});

// Define the conference schedule with time slots
const scheduleData = [
  {
    day: 1,
    date: "March 15, 2026",
    dayName: "Day One",
    theme: "French Foundations",
    sessions: [
      { time: "9:00 AM", talkSlug: "french-macaron-mastery" },
      { time: "11:30 AM", talkSlug: "croissant-lamination-secrets" },
      { time: "3:00 PM", talkSlug: "the-science-of-sugar" },
    ],
  },
  {
    day: 2,
    date: "March 16, 2026",
    dayName: "Day Two",
    theme: "Global Traditions",
    sessions: [
      { time: "9:00 AM", talkSlug: "sourdough-from-starter-to-masterpiece" },
      { time: "11:30 AM", talkSlug: "umami-in-pastry-east-meets-west" },
      { time: "2:30 PM", talkSlug: "savory-breads-of-the-mediterranean" },
    ],
  },
  {
    day: 3,
    date: "March 17, 2026",
    dayName: "Day Three",
    theme: "Artisan Mastery",
    sessions: [
      { time: "9:00 AM", talkSlug: "the-art-of-the-perfect-tart" },
      {
        time: "11:00 AM",
        talkSlug: "neapolitan-pizza-tradition-meets-innovation",
      },
    ],
  },
];

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(1);

  const currentDayData = scheduleData.find((d) => d.day === selectedDay)!;

  return (
    <>
      <RemyAssistant />
      <div className="min-h-screen">
        {/* Hero section */}
        <div className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-copper/10 border border-copper/30 text-copper-light text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>March 15-17, 2026</span>
              <span className="mx-2 text-copper/40">•</span>
              <MapPin className="w-4 h-4" />
              <span>Paris, France</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-cream mb-4">
              Conference <span className="text-gold italic">Schedule</span>
            </h1>
            <p className="text-xl text-cream/70 max-w-2xl mx-auto font-body">
              Three days of masterclasses, demonstrations, and culinary
              inspiration from the world's finest pastry artisans.
            </p>
          </div>
        </div>

        {/* Day selector tabs */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex justify-center">
            <div className="inline-flex bg-card/50 rounded-2xl p-2 border border-border/50">
              {scheduleData.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`relative px-8 py-4 rounded-xl font-display font-semibold transition-all duration-300 ${
                    selectedDay === day.day
                      ? "bg-linear-0-to-br from-copper to-copper-dark text-charcoal shadow-lg shadow-copper/20"
                      : "text-cream/70 hover:text-cream hover:bg-card"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wider opacity-75">
                    {day.dayName}
                  </span>
                  <span className="block text-lg">
                    {day.date.split(",")[0].split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Day theme header */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-cream mb-2">
              {currentDayData.dayName}:{" "}
              <span className="text-gold italic">{currentDayData.theme}</span>
            </h2>
            <p className="text-cream/50 font-body">{currentDayData.date}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="relative p-8 md:p-12 rounded-3xl bg-linear-0-to-br from-card to-charcoal border border-border/50 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-copper/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3">
                Don't Miss a Single Session
              </h3>
              <p className="text-cream/60 font-body mb-6 max-w-xl mx-auto">
                Each masterclass offers hands-on learning from the world's
                finest pastry artisans.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/talks"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-0-to-r from-copper to-copper-dark text-charcoal font-semibold transition-all hover:shadow-lg hover:shadow-copper/30 hover:scale-[1.02]"
                >
                  Browse All Sessions
                </Link>
                <Link
                  to="/speakers"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold/50 text-gold font-semibold transition-all hover:bg-gold/10 hover:border-gold"
                >
                  Meet the Speakers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
