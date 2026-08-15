import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  ContactSection,
  DoctorsSection,
  GallerySection,
  ReviewsSection,
  TreatmentsSection,
} from "@/components/site/sections";
import { useBooking } from "@/components/site/booking-context";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orhidea Aesthetics — Aesthetic Dermatology in Peja" },
      {
        name: "description",
        content:
          "Luxury aesthetic dermatology in Peja: dermal fillers, anti-wrinkle, laser hair removal and skin boosters, medically led by certified dermatologists.",
      },
      { property: "og:title", content: "Orhidea Aesthetics — Aesthetic Dermatology in Peja" },
      {
        property: "og:description",
        content: "Natural, medically led aesthetic results in the heart of Peja.",
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { k: "15,000+", v: "Treatments delivered" },
  { k: "4.9★", v: "Average client rating" },
  { k: "12 yrs", v: "Dermatology expertise" },
  { k: "100%", v: "EU-sourced products" },
];

function Hero() {
  const { openBooking } = useBooking();
  return (
    <section className="relative min-h-[92svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Client with luminous skin at Orhidea Aesthetics"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-16">
        <p className="eyebrow inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-gold" /> Peja · Kosovo
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.03] sm:text-7xl lg:text-8xl">
          The art of looking
          <span className="block italic text-gold">effortlessly yourself</span>
        </h1>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
          Aesthetic dermatology, injectables and advanced skin science — delivered with medical
          precision and an editorial eye for balance.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            onClick={() => openBooking()}
            className="rounded-full px-8 py-6 text-xs tracking-[0.16em] uppercase"
          >
            Book a consultation
          </Button>
          <Button asChild variant="ghost" className="rounded-full border border-border px-8 py-6">
            <Link to="/treatments" className="text-xs tracking-[0.16em] uppercase">
              Explore treatments <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6">
          {STATS.map((s) => (
            <div key={s.k}>
              <p className="font-serif text-3xl">{s.k}</p>
              <p className="mt-1 text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { i: ShieldCheck, t: "Board-certified dermatologists" },
    { i: Star, t: "FDA-cleared devices" },
    { i: Sparkles, t: "Single-use sterile protocol" },
  ];
  return (
    <div className="border-y border-border bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-14 gap-y-4 px-6 py-6">
        {items.map(({ i: Icon, t }) => (
          <span
            key={t}
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase"
          >
            <Icon className="h-4 w-4 text-gold" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <TreatmentsSection />
      <GallerySection />
      <DoctorsSection />
      <ReviewsSection />
      <ContactSection />
    </SiteLayout>
  );
}
