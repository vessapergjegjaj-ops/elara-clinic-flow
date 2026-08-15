import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type BookingCtx = {
  open: boolean;
  preset?: string;
  openBooking: (treatmentId?: string) => void;
  closeBooking: () => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>(undefined);

  const openBooking = useCallback((treatmentId?: string) => {
    setPreset(treatmentId);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, preset, openBooking, closeBooking }),
    [open, preset, openBooking, closeBooking],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}