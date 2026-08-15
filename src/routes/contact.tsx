import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ContactSection } from "@/components/site/sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Location — Orhidea Aesthetics Peja" },
      {
        name: "description",
        content: "Visit our Peja clinic, call us, or message on WhatsApp to book a consultation.",
      },
      { property: "og:title", content: "Contact — Orhidea Aesthetics" },
      { property: "og:description", content: "Rr. Mbretëresha Teuta 24, Peja 30000, Kosovo." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="pt-28">
        <h1 className="sr-only">Contact Orhidea Aesthetics</h1>
        <ContactSection />
      </div>
    </SiteLayout>
  );
}