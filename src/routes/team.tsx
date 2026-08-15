import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DoctorsSection } from "@/components/site/sections";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Orhidea Aesthetics" },
      {
        name: "description",
        content:
          "Meet the board-certified dermatologists and advanced injectors behind Orhidea Aesthetics in Peja.",
      },
      { property: "og:title", content: "Our Team — Orhidea Aesthetics" },
      { property: "og:description", content: "Certified hands, artistic eyes." },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <SiteLayout>
      <div className="pt-28">
        <h1 className="sr-only">Our team</h1>
        <DoctorsSection />
      </div>
    </SiteLayout>
  );
}