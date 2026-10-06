"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Spark = { left: string; c: string; size: string; dur: string; delay: string };
const COLORS = ["#fbbf24", "#60a5fa", "#fdba74", "#93c5fd"];

// The avatar image plus pure-CSS overlays: blinking eyelids, flickering holo panels,
// glowing icons, a pulse along the shirt circuits, rising sparks and mouse parallax.
// Overlay positions are percentages of the avatar_hero.jpg frame; re-tune them if the image changes.
export default function Avatar() {
  const layer = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSparks(
      Array.from({ length: 18 }, (_, i) => {
        const sz = 2 + Math.random() * 3;
        return {
          left: `${15 + Math.random() * 75}%`,
          c: COLORS[i % 4],
          size: `${sz}px`,
          dur: `${6 + Math.random() * 7}s`,
          delay: `${-Math.random() * 12}s`,
        };
      }),
    );

    const hero = layer.current?.closest(".hero") as HTMLElement | null;
    const glow = document.getElementById("glow");
    if (!hero) return;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      if (glow) glow.style.transform = `translate(${dx * 120}px,${dy * 80}px)`;
      if (layer.current) layer.current.style.translate = `${dx * -14}px ${dy * -8}px`;
    };
    hero.addEventListener("pointermove", onMove);
    return () => hero.removeEventListener("pointermove", onMove);
  }, []);

  const at = (left: number, top: number, width: number, height: number, c?: string) =>
    ({ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%`, ...(c ? { "--c": c } : {}) }) as CSSProperties;

  return (
    <div className="avatar">
      <span className="halo" aria-hidden="true" />
      <div className="av-layer" ref={layer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar_hero.jpg"
          alt="Stylized portrait of Nelson Gonzalez in a dark circuit-pattern t-shirt, with floating code panels and JavaScript, Python and React icons"
          width={1024}
          height={1144}
          fetchPriority="high"
        />
        <div className="fx" aria-hidden="true">
          <span className="lid l" />
          <span className="lid r" />
          <span className="holo" style={at(43, 25, 32, 20)} />
          <span className="holo b" style={at(12, 45, 18, 18)} />
          <span className="ping d2" style={at(75, 49, 12, 10, "96,165,250")} />
          <span className="ping d3" style={at(74, 16, 7, 6, "255,210,160")} />
          <span className="ping d4" style={at(80, 33, 8, 6, "255,210,160")} />
          <span className="ping d5" style={at(73, 60, 13, 16, "255,200,120")} />
          <span className="circuit" />
        </div>
        <div className="sparks" aria-hidden="true">
          {sparks.map((s, i) => (
            <i
              key={i}
              style={{ left: s.left, width: s.size, height: s.size, animationDuration: s.dur, animationDelay: s.delay, "--c": s.c } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
