"use client";
import { useEffect, useRef } from "react";

// About scene: Nelson types into the hologram while serious, runs the build and,
// the moment it hits 100%, the picture switches to him smiling with a V sign.
// .ds-stage is the 1144x2048 portrait picture; the arms, glow and code panel (over the hologram
// screen) are placed in % of it. .dev-scene covers its box with the stage, so the badge and frame
// sit on .dev-scene.
type Seg = [text: string, cls: string];
const CODE: Seg[][] = [
  [["const", "k"], [" dev = ", ""], ["new", "k"], [" ", ""], ["Developer", "f"], ["({\n", ""]],
  [["  name: ", ""], ['"Nelson"', "s"], [",\n", ""]],
  [["  stack: [", ""], ['"React"', "s"], [", ", ""], ['"Next"', "s"], ["],\n", ""]],
  [["});\n\n", ""]],
  [["await", "k"], [" dev.", ""], ["build", "f"], ["(", ""], ['"portfolio"', "s"], [");", ""]],
];
const DONE = '$ npm run build<br><span class="ds-ok">✓ Compiled successfully in 1.4s</span>';
const PHASES = ["ds-typing", "ds-building", "ds-compiled", "ds-victory"];

export default function DevScene() {
  const stage = useRef<HTMLDivElement>(null);
  const codeEl = useRef<HTMLPreElement>(null);
  const term = useRef<HTMLDivElement>(null);
  const fx = useRef<HTMLDivElement>(null);
  const armL = useRef<HTMLDivElement>(null);
  const armR = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = stage.current!, code = codeEl.current!, tm = term.current!, fxl = fx.current!;
    const panel = code.parentElement!;
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const render = (segs: Seg[], cursor: boolean) => {
      code.innerHTML =
        segs.map(([t, c]) => (c ? `<span class="ds-${c}">${esc(t)}</span>` : esc(t))).join("") +
        (cursor ? '<span class="ds-cur"></span>' : "");
    };
    const setPhase = (p: string | null) => {
      st.classList.remove(...PHASES);
      if (p) st.classList.add(p);
      if (p === "ds-victory") st.classList.add("ds-compiled");
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(CODE.flat(), false);
      tm.innerHTML = DONE;
      setPhase("ds-victory");
      return;
    }

    let alive = true, visible = true;
    const timers = new Set<number>();
    const wait = (ms: number) => new Promise<void>((res) => { const t = window.setTimeout(() => { timers.delete(t); res(); }, ms); timers.add(t); });
    const hold = async () => { while (alive && !visible) await wait(200); };

    const tap = () => {
      const a = Math.random() < 0.5 ? armL.current : armR.current;
      a?.classList.add("ds-tap");
      window.setTimeout(() => a?.classList.remove("ds-tap"), 70);
      if (Math.random() < 0.55) {
        const s = document.createElement("i");
        s.className = "ds-px ds-spark";
        s.style.left = 30 + Math.random() * 40 + "%";
        s.style.top = 70 + Math.random() * 2 + "%";
        fxl.appendChild(s);
        window.setTimeout(() => s.remove(), 800);
      }
    };
    const confetti = () => {
      const cols = ["#4ade80", "#60a5fa", "#fbbf24", "#f9a8d4", "#eceef1"];
      for (let i = 0; i < 26; i++) {
        const c = document.createElement("i");
        c.className = "ds-px ds-confetti";
        c.style.left = 50 + (Math.random() - 0.5) * 8 + "%";
        c.style.top = "26%";
        c.style.background = cols[i % cols.length];
        c.style.setProperty("--dx", (Math.random() - 0.5) * 36 + "cqw");
        c.style.setProperty("--dy", 4 + Math.random() * 16 + "cqw");
        c.style.animationDelay = Math.random() * 0.25 + "s";
        fxl.appendChild(c);
        window.setTimeout(() => c.remove(), 2100);
      }
    };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(st);

    (async () => {
      while (alive) {
        setPhase("ds-typing"); tm.textContent = ""; panel.style.opacity = "1";
        const done: Seg[] = [];
        for (const line of CODE) {
          for (const [t, c] of line) {
            let typed = "";
            for (const ch of t) {
              if (!alive) return;
              await hold();
              typed += ch;
              render([...done, [typed, c]], true);
              if (ch.trim()) tap();
              await wait(ch === "\n" ? 200 : 24 + Math.random() * 40);
            }
            done.push([t, c]);
          }
          await wait(140);
        }
        render(done, false);
        await wait(500);

        setPhase("ds-building");
        tm.innerHTML = "$ ";
        for (const ch of "npm run build") { if (!alive) return; tm.innerHTML += ch; tap(); await wait(55); }
        await wait(250);
        tm.innerHTML = '$ npm run build<div class="ds-prog"><i></i></div>';
        const pg = tm.querySelector<HTMLElement>(".ds-prog i")!;
        for (let p = 0; p <= 100; p += 4) {
          if (!alive) return;
          await hold();
          pg.style.width = p + "%";
          await wait(42 + (p > 70 && p < 85 ? 80 : 0));
        }
        await wait(60);

        tm.innerHTML = DONE;
        setPhase("ds-victory"); confetti();
        await wait(4300);
        await hold();

        panel.style.opacity = ".25";
        setPhase(null);
        await wait(700);
        render([], true);
      }
    })();

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  return (
    <div className="dev-scene" ref={stage}>
      <div className="ds-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="ds-base"
          src="/hero/dev-serious.webp"
          alt="Illustrated Nelson Gonzalez coding on a laptop in a server room; when the build compiles he smiles and makes a V sign"
          width={1144}
          height={2048}
          loading="lazy"
        />
        <div className="ds-layer" aria-hidden="true">
          <div className="ds-px ds-glow" />
          <div className="ds-px ds-arm ds-l" ref={armL} />
          <div className="ds-px ds-arm ds-r" ref={armR} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ds-px ds-victory-img" src="/hero/dev-victory.webp" alt="" />
          <div className="ds-fx" ref={fx} />
        </div>
        <div className="ds-px ds-code" aria-hidden="true">
          <div className="ds-bar"><b>portfolio.ts</b><span>· main</span></div>
          <pre ref={codeEl} />
          <div className="ds-term" ref={term} />
        </div>
      </div>
      <div className="ds-px ds-frame" aria-hidden="true" />
      <div className="ds-px ds-badge" aria-hidden="true">✓ Compiled successfully</div>
    </div>
  );
}
