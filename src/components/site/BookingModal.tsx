import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, Clock, Sparkles } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories, doctors, treatments } from "@/lib/clinic-data";
import { useBooking } from "./booking-context";
import { cn } from "@/lib/utils";

const clientSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(120),
  notes: z.string().trim().max(600).optional(),
});

const SLOTS = ["09:30", "10:30", "11:30", "13:00", "14:30", "16:00", "17:30"];

function nextDays(count: number) {
  const out: Date[] = [];
  const start = new Date();
  for (let i = 1; out.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() !== 0) out.push(d);
  }
  return out;
}

export function BookingModal() {
  const { open, preset, closeBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string>(categories[0]);
  const [treatment, setTreatment] = useState<string>("");
  const [doctor, setDoctor] = useState<string>(doctors[0]!.id);
  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const days = useMemo(() => nextDays(10), []);

  useEffect(() => {
    if (!open) return;
    setStep(1);
    setDone(false);
    setErrors({});
    const t = preset ? treatments.find((x) => x.id === preset) : undefined;
    setCategory(t?.category ?? categories[0]);
    setTreatment(t?.id ?? "");
  }, [open, preset]);

  const filtered = treatments.filter((t) => t.category === category);
  const selected = treatments.find((t) => t.id === treatment);

  function submit() {
    const parsed = clientSchema.safeParse(form);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      for (const issue of parsed.error.issues) e[String(issue.path[0])] = issue.message;
      setErrors(e);
      return;
    }
    setErrors({});
    setDone(true);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeBooking()}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl p-0 sm:max-w-2xl">
        <DialogHeader className="border-b border-border px-6 py-5 text-left">
          <DialogTitle className="font-serif text-2xl font-light">
            {done ? "Booking confirmed" : "Book your appointment"}
          </DialogTitle>
          {!done && (
            <div className="mt-4 flex items-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-1 items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors",
                      step >= s
                        ? "border-gold bg-gold/15 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {s}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
              ))}
            </div>
          )}
        </DialogHeader>

        {done ? (
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <div className="flex h-20 w-20 animate-[pulse_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-gold/20">
              <Check className="h-9 w-9 text-foreground" />
            </div>
            <h3 className="mt-6 font-serif text-3xl font-light">Thank you, {form.name}</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Your {selected?.name ?? "consultation"} is reserved for {date} at {slot}. Our team
              will confirm by phone within 2 hours.
            </p>
            <Button className="mt-8 rounded-full px-8" onClick={closeBooking}>
              Done
            </Button>
          </div>
        ) : (
          <div className="px-6 py-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-3">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCategory(c);
                          setTreatment("");
                        }}
                        className={cn(
                          "rounded-full border px-4 py-2 text-xs transition-all",
                          category === c
                            ? "border-gold bg-gold/15"
                            : "border-border hover:border-gold/50",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-3">Procedure</p>
                  <div className="grid gap-2">
                    {filtered.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTreatment(t.id)}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border p-4 text-left transition-all",
                          treatment === t.id
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/50",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-medium">{t.name}</span>
                          <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" /> {t.duration} · {t.price}
                          </span>
                        </span>
                        {treatment === t.id && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-3">Specialist</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {doctors.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDoctor(d.id)}
                        className={cn(
                          "rounded-2xl border p-3 text-left text-xs transition-all",
                          doctor === d.id
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/50",
                        )}
                      >
                        <span className="block font-medium">{d.name}</span>
                        <span className="mt-1 block text-muted-foreground">{d.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-3">Date</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {days.map((d) => {
                      const key = d.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                      });
                      return (
                        <button
                          key={key}
                          onClick={() => setDate(key)}
                          className={cn(
                            "min-w-[76px] rounded-2xl border px-3 py-3 text-center transition-all",
                            date === key
                              ? "border-gold bg-gold/10"
                              : "border-border hover:border-gold/50",
                          )}
                        >
                          <span className="block text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                            {d.toLocaleDateString("en-GB", { weekday: "short" })}
                          </span>
                          <span className="mt-1 block font-serif text-lg">{d.getDate()}</span>
                          <span className="block text-[0.65rem] text-muted-foreground">
                            {d.toLocaleDateString("en-GB", { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-3">Available times</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {SLOTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSlot(s)}
                        className={cn(
                          "rounded-xl border py-2 text-sm transition-all",
                          slot === s
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/50",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-4 text-xs text-muted-foreground">
                  <Sparkles className="mb-2 h-4 w-4 text-gold" />
                  {selected?.name} · {doctors.find((d) => d.id === doctor)?.name} · {date} at {slot}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="bk-name">Full name</Label>
                    <Input
                      id="bk-name"
                      value={form.name}
                      maxLength={80}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2"
                    />
                    {errors['name'] && <p className="mt-1 text-xs text-destructive">{errors['name']}</p>}
                  </div>
                  <div>
                    <Label htmlFor="bk-phone">Phone</Label>
                    <Input
                      id="bk-phone"
                      value={form.phone}
                      maxLength={30}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-2"
                    />
                    {errors['phone'] && (
                      <p className="mt-1 text-xs text-destructive">{errors['phone']}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="bk-email">Email</Label>
                  <Input
                    id="bk-email"
                    type="email"
                    value={form.email}
                    maxLength={120}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2"
                  />
                  {errors['email'] && <p className="mt-1 text-xs text-destructive">{errors['email']}</p>}
                </div>
                <div>
                  <Label htmlFor="bk-notes">Notes (optional)</Label>
                  <Textarea
                    id="bk-notes"
                    value={form.notes}
                    maxLength={600}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => (step === 1 ? closeBooking() : setStep(step - 1))}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              {step < 3 ? (
                <Button
                  className="rounded-full px-8"
                  disabled={step === 1 ? !treatment : !date || !slot}
                  onClick={() => setStep(step + 1)}
                >
                  Continue
                </Button>
              ) : (
                <Button className="rounded-full px-8" onClick={submit}>
                  Confirm booking
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}