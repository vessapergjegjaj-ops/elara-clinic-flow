import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeading } from "@/components/site/sections";
import clinicImg from "@/assets/clinic.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Clinic — Orhidea Aesthetics" },
      {
        name: "description",
        content:
          "Our philosophy, standards and hygiene protocols at Orhidea Aesthetics, an aesthetic dermatology clinic in Peja.",
      },
      { property: "og:title", content: "About — Orhidea Aesthetics" },
      { property: "og:description", content: "Editorial calm, medical rigour, natural results." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    t: "Medically led",
    d: "Every protocol is designed and signed off by a board-certified dermatologist — never delegated to a technician.",
  },
  {
    t: "Natural by default",
    d: "We treat proportion, not trends. If a treatment isn't right for you, we will tell you and suggest nothing at all.",
  },
  {
    t: "Hospital-grade hygiene",
    d: "Single-use needles, sealed sterile trays, EU-sourced pharmaceuticals with batch traceability on every syringe.",
  },
  {
    t: "Unhurried care",
    d: "Consultations run 30 minutes minimum. Aftercare check-ins are included with every injectable treatment.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-6 pt-36">
        <SectionHeading
          eyebrow="About"
          title="A quiet clinic for considered beauty"
          subtitle="Founded in Peja to bring European standards of aesthetic dermatology home — with the warmth of a place that knows your name."
        />
        <div className="zoom-media mt-14 rounded-[2rem] border border-border">
          <img
            src={clinicImg}
            alt="Interior of the Orhidea Aesthetics clinic in Peja"
            loading="lazy"
            className="aspect-16/9 w-full object-cover"
          />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {VALUES.map((v) => (
            <article key={v.t} className="rounded-3xl border border-border bg-card p-8">
              <h2 className="font-serif text-2xl">{v.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
            </article>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}