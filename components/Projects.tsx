"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import type { Media } from "@/lib/media";
import Chips from "./Chips";

type Item = Project & { media: Media[]; placeholder: boolean };

// One gallery item. Videos play muted and looped; `controls` adds the player bar.
function MediaView({ m, alt, controls, lazy }: { m: Media; alt: string; controls?: boolean; lazy?: boolean }) {
  if (m.kind === "video")
    return (
      <video
        key={m.src}
        src={m.src}
        poster={m.poster}
        aria-label={m.alt ?? alt}
        muted
        loop
        playsInline
        autoPlay={!reduced()}
        controls={controls}
        preload={lazy ? "metadata" : "auto"}
      />
    );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={m.src} alt={m.alt ?? alt} loading={lazy ? "lazy" : undefined} draggable={false} />;
}

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Projects({ projects }: { projects: Item[] }) {
  const track = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const dragMoved = useRef(false);

  const [open, setOpen] = useState<Item | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const step = () => (track.current?.querySelector(".pcard")?.getBoundingClientRect().width ?? 0) + 18;
  const scrollByCards = (dir: number) => track.current?.scrollBy({ left: dir * step(), behavior: reduced() ? "auto" : "smooth" });

  // progress bar and arrow state
  const sync = useCallback(() => {
    const t = track.current;
    if (!t || !prog.current) return;
    const max = t.scrollWidth - t.clientWidth;
    const f = max > 0 ? t.scrollLeft / max : 0;
    const vis = t.clientWidth / t.scrollWidth;
    prog.current.style.width = vis * 100 + "%";
    prog.current.style.marginLeft = f * (1 - vis) * 100 + "%";
    setAtStart(t.scrollLeft < 4);
    setAtEnd(t.scrollLeft > max - 4);
  }, []);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    sync();
    t.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);

    // mouse drag with a short momentum glide, then snap to the nearest card
    let down = false, x0 = 0, s0 = 0, lastX = 0, lastT = 0, v = 0, raf = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; dragMoved.current = false;
      x0 = lastX = e.clientX; s0 = t.scrollLeft; lastT = performance.now(); v = 0;
      cancelAnimationFrame(raf);
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (!dragMoved.current && Math.abs(dx) > 5) { dragMoved.current = true; t.classList.add("dragging"); }
      if (!dragMoved.current) return;
      t.scrollLeft = s0 - dx;
      const now = performance.now();
      v = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX; lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!dragMoved.current) return;
      let vel = v * 16;
      const glide = () => {
        if (Math.abs(vel) < 0.5 || reduced()) {
          t.classList.remove("dragging");
          const w = step();
          t.scrollTo({ left: Math.round(t.scrollLeft / w) * w, behavior: reduced() ? "auto" : "smooth" });
          return;
        }
        t.scrollLeft -= vel; vel *= 0.92;
        raf = requestAnimationFrame(glide);
      };
      glide();
    };
    t.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    return () => {
      t.removeEventListener("scroll", sync);
      removeEventListener("resize", sync);
      t.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [sync]);

  const openProject = useCallback((id: string, from?: HTMLElement) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    lastFocus.current = from ?? (document.activeElement as HTMLElement);
    setOpen(p);
    try { history.replaceState(null, "", "#project-" + p.id); } catch {}
  }, [projects]);

  const closeProject = useCallback(() => {
    setOpen(null);
    try { history.replaceState(null, "", "#projects"); } catch {}
    lastFocus.current?.focus({ preventScroll: true });
  }, []);

  // deep link: /#project-dubsado opens that drawer
  useEffect(() => {
    if (location.hash.startsWith("#project-")) {
      const id = location.hash.slice(9);
      const t = setTimeout(() => openProject(id), 300);
      return () => clearTimeout(t);
    }
  }, [openProject]);

  return (
    <section id="projects" aria-labelledby="proj-h">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="file"><span>//</span> projects/</div>
            <h2 className="h2" id="proj-h">Selected work.</h2>
            <p className="lede">Drag or swipe sideways. Open a project for the full story and screenshots.</p>
          </div>
          <div className="car-ctrl">
            <button className="icon-btn" aria-label="Previous projects" disabled={atStart} onClick={() => scrollByCards(-1)}>←</button>
            <button className="icon-btn" aria-label="Next projects" disabled={atEnd} onClick={() => scrollByCards(1)}>→</button>
          </div>
        </div>
        <div
          className="track"
          ref={track}
          tabIndex={0}
          aria-label="Projects carousel"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); scrollByCards(1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); scrollByCards(-1); }
          }}
          onClickCapture={(e) => {
            if (dragMoved.current) { e.preventDefault(); e.stopPropagation(); dragMoved.current = false; }
          }}
        >
          {projects.map((p) => (
            <button
              className="pcard"
              type="button"
              key={p.id}
              aria-label={`Open ${p.title}`}
              onClick={(e) => openProject(p.id, e.currentTarget)}
            >
              <div className="cover">
                <MediaView m={p.media.find((m) => m.kind === "image") ?? p.media[0]} alt="" lazy />
              </div>
              <div className="body">
                <div className="meta"><span>{p.org}</span><span>{p.years}</span></div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <Chips items={p.stack.slice(0, 3)} />
                <span className="open">Open project <span aria-hidden="true">↗</span></span>
              </div>
            </button>
          ))}
        </div>
        <div className="progress" aria-hidden="true"><i ref={prog} /></div>
      </div>
      <Drawer project={open} onClose={closeProject} />
    </section>
  );
}

function Drawer({ project, onClose }: { project: Item | null; onClose: () => void }) {
  // `shown` keeps the last project mounted while the close animation runs.
  const [shown, setShown] = useState<Item | null>(null);
  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState(0);
  const drawer = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (project) {
      setShown(project);
      setImg(0);
      document.body.style.overflow = "hidden";
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      return () => cancelAnimationFrame(r);
    }
    setVisible(false);
    document.body.style.overflow = "";
    const t = setTimeout(() => setShown(null), reduced() ? 0 : 450);
    return () => clearTimeout(t);
  }, [project]);

  useEffect(() => {
    if (shown && project) {
      if (body.current) body.current.scrollTop = 0;
      closeBtn.current?.focus({ preventScroll: true });
    }
  }, [shown, project]);

  const n = shown?.media.length ?? 1;
  const go = useCallback((i: number) => setImg(((i % n) + n) % n), [n]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setImg((i) => (i + 1) % n);
      else if (e.key === "ArrowLeft") setImg((i) => (i - 1 + n) % n);
      else if (e.key === "Tab" && drawer.current) {
        const f = [...drawer.current.querySelectorAll<HTMLElement>('button,a[href],[tabindex]:not([tabindex="-1"])')].filter(
          (x) => !(x as HTMLButtonElement).disabled,
        );
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, n, onClose]);

  // swipe down to close on phones
  const y0 = useRef<number | null>(null);

  if (!shown) return null;
  const p = shown;

  return (
    <>
      <div className={`scrim${visible ? " show" : ""}`} onClick={onClose} />
      <aside
        className={`drawer${visible ? " show" : ""}`}
        ref={drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="d-title"
        onTouchStart={(e) => { if ((body.current?.scrollTop ?? 0) <= 0) y0.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => {
          if (y0.current !== null && e.changedTouches[0].clientY - y0.current > 90 && innerWidth <= 640) onClose();
          y0.current = null;
        }}
      >
        <div className="grab" aria-hidden="true" />
        <div className="d-head">
          <div className="file"><span>//</span> projects/{p.id}.md</div>
          <button className="icon-btn" ref={closeBtn} aria-label="Close project" onClick={onClose}>✕</button>
        </div>
        <div className="d-body" ref={body}>
          <div>
            <div className="file" style={{ marginBottom: 8 }}>{p.tag}</div>
            <h2 id="d-title">{p.title}</h2>
          </div>
          <div className="d-kv">
            <div><span>Role</span><b>{p.role}</b></div>
            <div><span>Company</span><b>{p.org}</b></div>
            <div><span>Years</span><b>{p.years}</b></div>
          </div>
          <div className="gal">
            <div className="gal-main">
              <MediaView m={p.media[img]} alt={`${p.title} screenshot ${img + 1}`} controls />
              <span className="gal-count">{img + 1} / {n}</span>
              <div className="gal-nav">
                <button className="icon-btn" aria-label="Previous image" onClick={() => go(img - 1)}>←</button>
                <button className="icon-btn" aria-label="Next image" onClick={() => go(img + 1)}>→</button>
              </div>
            </div>
            <div className="thumbs">
              {p.media.map((m, i) => (
                <button
                  type="button"
                  key={i}
                  className={m.kind === "video" ? "is-video" : undefined}
                  aria-label={`Show ${m.kind} ${i + 1}`}
                  aria-current={i === img}
                  onClick={() => go(i)}
                >
                  {m.kind === "video" && !m.poster ? (
                    <video src={m.src} muted playsInline preload="metadata" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.poster ?? m.src} alt="" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="d-sec"><h4>Context</h4><p>{p.context}</p></div>
          <div className="d-sec">
            <h4>What I built</h4>
            <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div className="d-sec"><h4>Stack</h4><Chips items={p.stack} /></div>
          {p.links?.length ? (
            <div className="d-sec">
              <h4>Links</h4>
              <div className="chips">
                {p.links.map((l) => (
                  <a key={l.href} className="btn sm" href={l.href} target="_blank" rel="noopener">{l.label} ↗</a>
                ))}
              </div>
            </div>
          ) : null}
          {p.placeholder && (
            <p className="note">Screenshots are placeholders until real ones are added.</p>
          )}
        </div>
      </aside>
    </>
  );
}
