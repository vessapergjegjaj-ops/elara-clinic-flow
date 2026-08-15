import { useState } from "react";
import { Clock, MapPin, MessageCircle, Phone, Sparkles, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CLINIC,
  categories,
  doctors,
  galleryCategories,
  reviews,
  treatments,
  whatsappLink,
} from "@/lib/clinic-data";
import { useBooking } from "./booking-context";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { cn } from "@/lib/utils";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import doc1 from "@/assets/doc1.jpg";
import doc2 from "@/assets/doc2.jpg";
import doc3 from "@/assets/doc3.jpg";

const docPhotos: Record<string, string> = { "dr-elira": doc1, "dr-ardit": doc2, "nurse-rina": doc3 };

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
}

export function TreatmentsSection({ full = false }: { full?: boolean }) {
  const { openBooking } = useBooking();
  const [cat, setCat] = useState<string>("All");
  const list = treatments.filter((t) => cat === "All" || t.category === cat);
  const shown = full ? list : list.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Treatments"
        title="Bespoke protocols, medically led"
        subtitle="Every treatment begins with a facial assessment and an honest conversation about what you actually need."
      />

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-5 py-2 text-xs tracking-[0.12em] uppercase transition-all",
              cat === c ? "border-gold bg-gold/15" : "border-border hover:border-gold/50",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <article
            key={t.id}
            className="group flex flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-lift)]"
          >
            <p className="eyebrow">{t.category}</p>
            <h3 className="mt-3 font-serif text-2xl">{t.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {t.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold" /> {t.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-gold" /> {t.results}
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <span className="font-serif text-lg">{t.price}</span>
              <Button
                variant="ghost"
                onClick={() => openBooking(t.id)}
                className="rounded-full border border-border px-5 text-xs tracking-[0.12em] uppercase hover:border-gold"
              >
                Book this
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GallerySection() {
  const [cat, setCat] = useState<string>(galleryCategories[0]);
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Before & After"
          title="Real results, unretouched"
          subtitle="Drag the handle to reveal the transformation. All images shared with written client consent."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {galleryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-5 py-2 text-xs tracking-[0.12em] uppercase transition-all",
                cat === c ? "border-gold bg-gold/15" : "border-border hover:border-gold/50",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <BeforeAfterSlider before={beforeImg} after={afterImg} label={`${cat} case ${i + 1}`} />
              <p className="mt-4 text-center text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {cat} · Case {i + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DoctorsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Our Team"
        title="Certified hands, artistic eyes"
        subtitle="Board-certified dermatologists and advanced injectors trained across Europe."
      />
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {doctors.map((d) => (
          <article key={d.id} className="group">
            <div className="zoom-media rounded-3xl border border-border">
              <img
                src={docPhotos[d.id]}
                alt={`Portrait of ${d.name}`}
                loading="lazy"
                width={900}
                height={1100}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-2xl">{d.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d.title}</p>
            <p className="mt-2 text-xs text-muted-foreground">{d.qualifications}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase"
                >
                  {b}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const [i, setI] = useState(0);
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Testimonials" title="Loved by 15,000+ clients" />
        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {reviews.map((r) => (
              <div key={r.name} className="w-full shrink-0 px-2 sm:px-8">
                <div className="glass-card mx-auto max-w-2xl rounded-3xl p-10 text-center">
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-6 font-serif text-2xl leading-snug">“{r.text}”</p>
                  <p className="mt-6 text-xs tracking-[0.2em] uppercase">{r.name}</p>
                  <span className="mt-3 inline-block rounded-full border border-border px-3 py-1 text-[0.65rem] tracking-[0.1em] text-muted-foreground uppercase">
                    {r.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((r, idx) => (
            <button
              key={r.name}
              aria-label={`Show review ${idx + 1}`}
              onClick={() => setI(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-8 bg-gold" : "w-2 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Visit us"
            title="Peja's home of advanced aesthetics"
            align="left"
          />
          <div className="mt-10 grid gap-6 text-sm">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>{CLINIC.address}</span>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}>{CLINIC.phone}</a>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Chat with us on WhatsApp
              </a>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="grid gap-1">
                {CLINIC.hours.map((h) => (
                  <span key={h.d} className="text-muted-foreground">
                    <span className="text-foreground">{h.d}</span> — {h.h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="glass-card flex min-h-[340px] flex-col items-center justify-center rounded-3xl p-10 text-center">
          <Sparkles className="h-6 w-6 text-gold" />
          <p className="mt-4 font-serif text-2xl">Google Map</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Interactive map placeholder — connect your Google Maps embed to display the clinic
            location in Peja.
          </p>
          <Button asChild variant="ghost" className="mt-6 rounded-full border border-border px-6">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}