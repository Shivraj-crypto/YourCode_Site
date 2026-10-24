import { useEffect, useRef } from "react";

/** Deterministic hash noise in [0, 1). */
function hash2(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/** Smooth 2D value noise in [0, 1). */
function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

const SPACING = 13;

function drawField(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  primary: string,
) {
  ctx.clearRect(0, 0, w, h);
  const cols = Math.ceil(w / SPACING);
  const rows = Math.ceil(h / SPACING);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      const x = i * SPACING + (j % 2) * (SPACING / 2);
      const y = j * SPACING;
      const n1 = valueNoise(i * 0.16, j * 0.16 + t * 0.32);
      const n2 = valueNoise(i * 0.42 + 37, j * 0.42 + t * 0.62);
      const v = n1 * 0.72 + n2 * 0.28;
      if (v < 0.44) continue;
      const alpha = Math.min(0.5, (v - 0.44) * 0.85);
      const orange = hash2(i * 3.71, j * 7.33) > 0.985;
      if (orange) {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = primary;
      } else {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#c9c9c9";
      }
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

/**
 * Animated dot-field texture for the hero. Monochrome value noise that
 * drifts slowly; a few dots pick up the brand color. Pure texture — no
 * color gradients. Renders a single static frame when the user prefers
 * reduced motion.
 */
export function HeroTexture() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || "#e67e22";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const frame = (now: number) => {
      if (now - last >= 45) {
        last = now;
        drawField(ctx, w, h, now / 1000, primary);
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      drawField(ctx, w, h, 0, primary);
    } else {
      drawField(ctx, w, h, 0, primary);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 100% 90% at 50% 10%, black 45%, transparent 95%)",
        maskImage:
          "radial-gradient(ellipse 100% 90% at 50% 10%, black 45%, transparent 95%)",
      }}
    >
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
