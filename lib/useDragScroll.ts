"use client";
import { useEffect, useRef, type RefObject } from "react";

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// Click-and-drag horizontal scrolling for mouse users, with a short momentum glide.
// The returned ref is true for the current gesture once the pointer passed the click
// threshold — check it in onClick handlers to swallow the trailing click after a drag.
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  const dragMoved = useRef(false);

  useEffect(() => {
    const t = ref.current;
    if (!t) return;
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
        if (Math.abs(vel) < 0.5 || reduced()) { t.classList.remove("dragging"); return; }
        t.scrollLeft -= vel; vel *= 0.92;
        raf = requestAnimationFrame(glide);
      };
      glide();
    };
    // A plain mouse wheel only has vertical delta; redirect it to horizontal
    // scroll here instead of letting it bubble up to a scrollable ancestor.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      t.scrollLeft += e.deltaY;
    };
    t.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    t.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      t.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      t.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return dragMoved;
}
