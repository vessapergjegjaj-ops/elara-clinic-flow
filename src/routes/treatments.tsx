import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TreatmentsSection } from "@/components/site/sections";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Orhidea Aesthetics Peja" },
      {
        name: "description",
        content:
          "Dermal fillers, anti-wrinkle injections, diode laser hair removal, skin boosters and medical facials in Peja.",
      },
      { property: "og:title", content: "Treatments — Orhidea Aesthetics" },
      {
        property: "og:description",
        content: "Medically led aesthetic protocols with transparent pricing.",
      },
    ],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <SiteLayout>
      <div className="pt-28">
        <h1 className="sr-only">Treatments at Orhidea Aesthetics</h1>
        <TreatmentsSection full />
      </div>
    </SiteLayout>
  );
}