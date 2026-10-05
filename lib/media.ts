import fs from "node:fs";
import path from "node:path";
import type { Project, Shot } from "@/content/projects";
import { mock } from "./mock";

// Build-time only: resolves each project's gallery from content/projects.ts and public/projects/<id>/.

export type Media = { src: string; kind: "image" | "video"; poster?: string; alt?: string };

const IMAGE = /\.(png|jpe?g|webp|gif|avif|svg)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;
const kindOf = (src: string): Media["kind"] => (VIDEO.test(src) ? "video" : "image");

function fromFolder(id: string): Media[] {
  const dir = path.join(process.cwd(), "public", "projects", id);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => IMAGE.test(f) || VIDEO.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  // A video's poster is an image with the same base name (demo.mp4 + demo.jpg); it is not shown on its own.
  const base = (f: string) => f.replace(/\.[^.]+$/, "");
  const videoBases = new Set(files.filter((f) => VIDEO.test(f)).map(base));
  return files
    .filter((f) => VIDEO.test(f) || !videoBases.has(base(f)))
    .map((f) => {
      const src = `/projects/${id}/${encodeURIComponent(f)}`;
      if (!VIDEO.test(f)) return { src, kind: "image" as const };
      const poster = files.find((p) => IMAGE.test(p) && base(p) === base(f));
      return { src, kind: "video" as const, poster: poster && `/projects/${id}/${encodeURIComponent(poster)}` };
    });
}

function fromShot(s: Shot): Media {
  if (typeof s === "string") return { src: s, kind: kindOf(s) };
  if (Array.isArray(s)) return { src: mock(s[0], s[1]), kind: "image" };
  return { ...s, kind: kindOf(s.src) };
}

export function resolveMedia(p: Project): { media: Media[]; placeholder: boolean } {
  const real = p.shots.filter((s) => !Array.isArray(s));
  if (real.length) return { media: real.map(fromShot), placeholder: false };
  const folder = fromFolder(p.id);
  if (folder.length) return { media: folder, placeholder: false };
  return { media: p.shots.map(fromShot), placeholder: true };
}
