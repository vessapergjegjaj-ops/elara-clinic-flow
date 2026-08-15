import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { startAdminSession } from "@/lib/admin-demo";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Staff Login — Orhidea Aesthetics" },
      { name: "description", content: "Secure staff access to the Orhidea Aesthetics clinic dashboard." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Staff Login — Orhidea Aesthetics" },
      { property: "og:description", content: "Clinic team access only." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-6">
      <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <Lock className="h-5 w-5 text-gold" />
        </div>
        <h1 className="mt-6 font-serif text-3xl">Staff access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo preview — this dashboard uses front-end sample data. Enable Lovable Cloud to add real
          accounts, roles and stored bookings.
        </p>
        <form
          className="mt-8 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const pin = new FormData(e.currentTarget).get("pin");
            if (pin !== "0000") {
              setError("Demo PIN is 0000.");
              return;
            }
            startAdminSession();
            navigate({ to: "/admin/dashboard" });
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue="team@orhidea.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pin">Demo PIN</Label>
            <Input id="pin" name="pin" type="password" placeholder="0000" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="mt-2 rounded-full py-6 text-xs tracking-[0.16em] uppercase">
            Enter dashboard
          </Button>
        </form>
        <Link
          to="/"
          className="mt-6 block text-center text-xs tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}