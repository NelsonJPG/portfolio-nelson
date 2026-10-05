# Nelson Gonzalez · Portfolio

Dark, IDE-style portfolio built with Next.js (App Router) and TypeScript. It exports as a static site.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Edit content

All text lives in `content/`, so most changes never touch a component:

| File | What it controls |
| --- | --- |
| `content/profile.ts` | Hero badge, name, typed words, pitch, buttons (CV, LinkedIn, email), stats, About text and service cards |
| `content/experience.ts` | Timeline entries, newest first. `minor: true` makes a short entry; `clients` adds the expandable client list |
| `content/projects.ts` | Carousel cards and drawer content |
| `content/skills.ts` | Technical and soft skills, languages |

### Add project images and videos

Drop files into `public/projects/<project-id>/` (one folder per project, already created) and name them `01-...`, `02-...` in the order you want. Videos (`.mp4`, `.webm`) play in the project drawer. Full guide: [`public/projects/README.md`](public/projects/README.md).

Optional: add `links: [{ label: "Live site", href: "https://..." }]` to a project in `content/projects.ts` to show buttons in the drawer.

### Other files

- `public/Nelson_Gonzalez_CV.pdf`: the CV the hero button downloads. Replace the file to update it.
- `public/avatar_hero.jpg`: hero avatar. The eye-blink and glow overlays in `components/Avatar.tsx` are positioned for this image.
- `app/globals.css`: all styles and color tokens (`--bg`, `--blue`, `--red`, ...).

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project**, import the repository and keep the defaults (Vercel detects Next.js).
3. Every push to `main` redeploys the site.
