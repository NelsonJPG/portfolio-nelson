"use client";
import { useEffect } from "react";

// Page-wide scroll effects: entrance reveals, active tab, timeline fill and lit nodes,
// and the status bar line counter. Renders nothing.
export default function ScrollFx() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".rise").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pre"); io.observe(el); }
    });

    const tabs = [...document.querySelectorAll<HTMLAnchorElement>(".tab")];
    const secs = tabs.map((t) => document.querySelector<HTMLElement>(t.getAttribute("href")!));
    const tl = document.getElementById("tl");
    const fill = document.getElementById("tlfill");
    const nodes = tl ? [...tl.querySelectorAll<HTMLElement>(".node")] : [];
    const lncol = document.getElementById("lncol");

    const onScroll = () => {
      const y = innerHeight * 0.45;
      let act = -1;
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < y) act = i; });
      tabs.forEach((t, i) => t.classList.toggle("on", i === act));
      const base = act >= 0 ? +(tabs[act].dataset.ln ?? 1) : 1;
      const within = act >= 0
        ? Math.max(0, Math.round((y - secs[act]!.getBoundingClientRect().top) / 24))
        : Math.round(scrollY / 24);
      if (lncol) lncol.textContent = `Ln ${base + within}, Col ${1 + (Math.round(scrollY) % 80)}`;
      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        fill.style.height = Math.min(Math.max(innerHeight * 0.6 - r.top, 0), r.height - 16) + "px";
        nodes.forEach((n) => n.classList.toggle("lit", n.getBoundingClientRect().top + 22 < innerHeight * 0.6));
      }
    };
    const onTab = (e: Event) => (e.currentTarget as HTMLElement).scrollIntoView({ inline: "nearest", block: "nearest" });

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    tabs.forEach((t) => t.addEventListener("click", onTab));
    onScroll();
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      tabs.forEach((t) => t.removeEventListener("click", onTab));
    };
  }, []);

  return null;
}
