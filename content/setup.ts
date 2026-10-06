// Work setup shown in the "My setup" section. Edit text here; the page picks it up on the next build.

export type SetupItem = { icon: "laptop" | "fiber" | "satellite"; label: string; title: string; text: string };

export const setupIntro = "Reliable hardware and a backup connection, so remote work never stops.";

export const setup: SetupItem[] = [
  { icon: "laptop", label: "Workstation", title: "MacBook Pro M5 Pro", text: "48 GB of RAM for running builds, tests, containers and AI tools side by side." },
  { icon: "fiber", label: "Primary internet", title: "Fiber, 400 Mb/s", text: "Fast, stable connection for video calls, deploys and large repositories." },
  { icon: "satellite", label: "Backup internet", title: "Starlink Mini", text: "Satellite backup that keeps me online if the main line goes down." },
];
