import { useCallback, useEffect, useRef, useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => move(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, move]);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        setDragging(true);
        move(e.clientX);
      }}
      className="relative aspect-4/5 w-full cursor-ew-resize touch-none overflow-hidden rounded-3xl border border-border bg-muted select-none"
    >
      <img
        src={after}
        alt={`${label} — after treatment`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${label} — before treatment`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: ref.current?.clientWidth ?? undefined }}
        />
      </div>

      <span className="glass-card absolute top-4 left-4 rounded-full px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase">
        Before
      </span>
      <span className="glass-card absolute top-4 right-4 rounded-full px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase">
        After
      </span>

      <div
        className="absolute top-0 bottom-0 w-px bg-gold"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-card/90 shadow-[var(--shadow-soft)] backdrop-blur">
          <span className="text-xs tracking-widest text-foreground">◄►</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Reveal before and after for ${label}`}
        className="sr-only"
      />
    </div>
  );
}