import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC, whatsappLink } from "@/lib/clinic-data";
import { useBooking } from "./booking-context";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/treatments", label: "Treatments" },
  { to: "/before-after", label: "Before & After" },
  { to: "/team", label: "Team" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 transition-all duration-500 sm:px-6",
          scrolled ? "glass-card" : "border border-transparent",
        )}
      >
        <Link to="/" className="font-serif text-base tracking-[0.3em] whitespace-nowrap uppercase">
          Orhidea
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-xs tracking-[0.14em] uppercase transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/login"
            aria-label="Admin login"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-foreground sm:flex"
          >
            <Lock className="h-4 w-4" />
          </Link>
          <Button
            onClick={() => openBooking()}
            className="hidden rounded-full px-5 text-xs tracking-[0.14em] uppercase sm:inline-flex"
          >
            Book Appointment
          </Button>
          <button
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
          >
            {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="glass-card mx-auto mt-2 max-w-7xl rounded-3xl p-5 lg:hidden">
          <nav className="grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenu(false)}
                className="rounded-xl px-3 py-3 font-serif text-xl transition-colors hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setMenu(false)}
              className="rounded-xl px-3 py-3 text-xs tracking-[0.2em] text-muted-foreground uppercase"
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-lg tracking-[0.3em] uppercase">Orhidea</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Aesthetic dermatology and advanced skin science in the heart of Peja.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {NAV.slice(1).map((n) => (
              <Link key={n.to} to={n.to} className="transition-colors hover:text-foreground">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Visit</p>
          <p className="mt-4 text-sm text-muted-foreground">{CLINIC.address}</p>
          <p className="mt-2 text-sm text-muted-foreground">{CLINIC.phone}</p>
          <p className="text-sm text-muted-foreground">{CLINIC.email}</p>
        </div>
        <div>
          <p className="eyebrow">Hours</p>
          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {CLINIC.hours.map((h) => (
              <span key={h.d}>
                {h.d} — {h.h}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingActions() {
  const { openBooking } = useBooking();
  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-lift)] transition-transform hover:scale-105 sm:bottom-6"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <div className="glass-card fixed inset-x-3 bottom-3 z-40 flex items-center gap-2 rounded-full p-2 sm:hidden">
        <Button onClick={() => openBooking()} className="flex-1 rounded-full text-xs uppercase">
          Book Now
        </Button>
        <a
          href={`tel:${CLINIC.phone.replace(/\s/g, "")}`}
          aria-label="Call the clinic"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
        >
          <Phone className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 sm:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}