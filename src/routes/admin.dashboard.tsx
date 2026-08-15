import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { CalendarDays, ImagePlus, Inbox, LogOut, Plus, Trash2, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { treatments as seedTreatments, type Treatment } from "@/lib/clinic-data";
import { demoAppointments, demoMessages, endAdminSession, isAdminSession } from "@/lib/admin-demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Clinic Dashboard — Orhidea Aesthetics" },
      { name: "description", content: "Manage appointments, gallery images, treatments and client messages." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Clinic Dashboard — Orhidea Aesthetics" },
      { property: "og:description", content: "Internal clinic management area." },
    ],
  }),
  component: AdminDashboard,
});

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-5 font-serif text-3xl">{value}</p>
      <p className="mt-1 text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
    </div>
  );
}

function Appointments() {
  const [rows, setRows] = useState(demoAppointments);
  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card">
      <table className="w-full min-w-[46rem] text-sm">
        <thead className="border-b border-border text-left text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
          <tr>
            {["Client", "Treatment", "Date", "Time", "Status", ""].map((h) => (
              <th key={h} className="px-5 py-4 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((a) => (
            <tr key={a.id}>
              <td className="px-5 py-4">
                <p>{a.client}</p>
                <p className="text-xs text-muted-foreground">{a.phone}</p>
              </td>
              <td className="px-5 py-4">{a.treatment}</td>
              <td className="px-5 py-4 whitespace-nowrap">{a.date}</td>
              <td className="px-5 py-4">{a.time}</td>
              <td className="px-5 py-4">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-[0.65rem] tracking-[0.1em] uppercase",
                    a.status === "Confirmed" && "border-gold/50 bg-gold/10",
                    a.status === "Pending" && "border-border",
                    a.status === "Completed" && "border-border text-muted-foreground",
                  )}
                >
                  {a.status}
                </span>
              </td>
              <td className="px-5 py-4 text-right">
                <Button
                  variant="ghost"
                  className="rounded-full border border-border px-4 text-xs uppercase"
                  onClick={() =>
                    setRows((r) =>
                      r.map((x) => (x.id === a.id ? { ...x, status: "Confirmed" as const } : x)),
                    )
                  }
                >
                  Confirm
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageManager() {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

  const add = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [
      ...prev,
      ...Array.from(list).map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
    ]);
  };

  return (
    <div className="grid gap-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          add(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed p-14 text-center transition-colors",
          drag ? "border-gold bg-gold/5" : "border-border bg-card",
        )}
      >
        <ImagePlus className="h-6 w-6 text-gold" />
        <p className="mt-4 font-serif text-2xl">Drop before & after photos</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Or tap to pick from your phone gallery. Any image file is accepted.
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => add(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((f, i) => (
            <figure key={f.url} className="overflow-hidden rounded-2xl border border-border">
              <img src={f.url} alt={f.name} className="aspect-square w-full object-cover" />
              <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
                <span className="truncate text-muted-foreground">{f.name}</span>
                <button
                  aria-label={`Remove ${f.name}`}
                  onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

function TreatmentsManager() {
  const [list, setList] = useState<Treatment[]>(seedTreatments);
  const [draft, setDraft] = useState({ name: "", price: "", description: "" });

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <form
        className="grid h-fit gap-4 rounded-3xl border border-border bg-card p-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.name.trim()) return;
          setList((p) => [
            {
              id: `new-${Date.now()}`,
              name: draft.name,
              category: "Facials & Peels",
              duration: "45 mins",
              results: "—",
              price: draft.price || "€—",
              description: draft.description,
            },
            ...p,
          ]);
          setDraft({ name: "", price: "", description: "" });
        }}
      >
        <h3 className="font-serif text-2xl">Add treatment</h3>
        <div className="grid gap-2">
          <Label htmlFor="t-name">Name</Label>
          <Input id="t-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="t-price">Price</Label>
          <Input id="t-price" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="t-desc">Description</Label>
          <Textarea id="t-desc" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        </div>
        <Button type="submit" className="rounded-full text-xs tracking-[0.16em] uppercase">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </form>

      <div className="divide-y divide-border rounded-3xl border border-border bg-card">
        {list.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
            <div>
              <p className="font-serif text-xl">{t.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.category} · {t.price}</p>
            </div>
            <Button
              variant="ghost"
              aria-label={`Delete ${t.name}`}
              onClick={() => setList((p) => p.filter((x) => x.id !== t.id))}
              className="rounded-full border border-border px-4"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Messages() {
  return (
    <div className="grid gap-4">
      {demoMessages.map((m) => (
        <article key={m.id} className="rounded-3xl border border-border bg-card p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-serif text-xl">
              {m.subject}
              {m.unread && <span className="ml-3 inline-block h-2 w-2 rounded-full bg-gold align-middle" />}
            </p>
            <span className="text-xs text-muted-foreground">{m.at}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{m.name} · {m.email}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
        </article>
      ))}
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAdminSession()) navigate({ to: "/admin/login" });
    else setReady(true);
  }, [navigate]);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="font-serif text-lg tracking-[0.3em] uppercase">Orhidea</p>
            <p className="text-xs text-muted-foreground">Clinic dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-full border border-border px-5 text-xs uppercase">
              <Link to="/">View site</Link>
            </Button>
            <Button
              variant="ghost"
              className="rounded-full border border-border px-5 text-xs uppercase"
              onClick={() => {
                endAdminSession();
                navigate({ to: "/admin/login" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="font-serif text-4xl">Today at the clinic</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={CalendarDays} label="Appointments this week" value="24" />
          <StatCard icon={Users} label="New clients" value="9" />
          <StatCard icon={Inbox} label="Unread messages" value="2" />
          <StatCard icon={TrendingUp} label="Revenue (est.)" value="€6.4k" />
        </div>

        <Tabs defaultValue="appointments" className="mt-12">
          <TabsList className="rounded-full">
            <TabsTrigger value="appointments" className="rounded-full text-xs uppercase">Appointments</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-full text-xs uppercase">Images</TabsTrigger>
            <TabsTrigger value="treatments" className="rounded-full text-xs uppercase">Treatments</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-full text-xs uppercase">Messages</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments" className="mt-8"><Appointments /></TabsContent>
          <TabsContent value="gallery" className="mt-8"><ImageManager /></TabsContent>
          <TabsContent value="treatments" className="mt-8"><TreatmentsManager /></TabsContent>
          <TabsContent value="messages" className="mt-8"><Messages /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}