import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GallerySection } from "@/components/site/sections";

export const Route = createFileRoute("/before-after")({
  head: () => ({
    meta: [
      { title: "Before & After Gallery — Orhidea Aesthetics" },
      {
        name: "description",
        content:
          "Unretouched before and after results for lips, fillers, anti-wrinkle and skin quality treatments.",
      },
      { property: "og:title", content: "Before & After — Orhidea Aesthetics" },
      { property: "og:description", content: "Real, consented client results from our Peja clinic." },
    ],
  }),
  component: BeforeAfterPage,
});

function BeforeAfterPage() {
  return (
    <SiteLayout>
      <div className="pt-28">
        <h1 className="sr-only">Before and after gallery</h1>
        <GallerySection />
      </div>
    </SiteLayout>
  );
}