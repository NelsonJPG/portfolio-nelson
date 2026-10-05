"use client";
import { useEffect, useState } from "react";

export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(value);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    setN(0);
    const t = setInterval(() => {
      i++;
      setN(i);
      if (i >= value) clearInterval(t);
    }, 90);
    return () => clearInterval(t);
  }, [value]);

  return <b>{n}{n >= value ? suffix : ""}</b>;
}
