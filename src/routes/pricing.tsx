import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/sections";
import { Button } from "@/components/ui/button";
import { categories, treatments } from "@/lib/clinic-data";
import { useBooking } from "@/components/site/booking-context";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Price List — Orhidea Aesthetics Peja" },
      {
        name: "description",
        content:
          "Transparent price list for fillers, botox, laser hair removal, skin boosters and facials at our Peja clinic.",
      },
      { property: "og:title", content: "Price List — Orhidea Aesthetics" },
      { property: "og:description", content: "Clear pricing, no hidden consultation fees." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const { openBooking } = useBooking();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-6 pt-36 pb-10">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent, itemised pricing"
          subtitle="Consultations are complimentary when you proceed with treatment on the same day."
        />
        <div className="mt-16 grid gap-12">
          {categories.map((cat) => (
            <section key={cat}>
              <h2 className="font-serif text-3xl">{cat}</h2>
              <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card">
                {treatments
                  .filter((t) => t.category === cat)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-5"
                    >
                      <div className="min-w-[12rem]">
                        <p className="font-serif text-xl">{t.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {t.duration} · results {t.results}
                        </p>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="font-serif text-lg whitespace-nowrap">{t.price}</span>
                        <Button
                          variant="ghost"
                          onClick={() => openBooking(t.id)}
                          className="rounded-full border border-border px-5 text-xs tracking-[0.12em] uppercase hover:border-gold"
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}