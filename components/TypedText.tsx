"use client";
import { useEffect, useState } from "react";

// Deletes the current word, then types the next one. Static for reduced motion.
export default function TypedText({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      let w = 0;
      let cur = words[0];
      while (alive) {
        await sleep(2600);
        for (let i = cur.length; i >= 0 && alive; i--) { setText(cur.slice(0, i)); await sleep(28); }
        w = (w + 1) % words.length;
        cur = words[w];
        for (let i = 1; i <= cur.length && alive; i++) { setText(cur.slice(0, i)); await sleep(55); }
      }
    })();
    return () => { alive = false; };
  }, [words]);

  return <b>{text}</b>;
}
