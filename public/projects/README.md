# Project images and videos

Each folder here belongs to one project in `content/projects.ts` (the folder name is the project `id`):

| Folder | Project |
| --- | --- |
| `dubsado/` | Dubsado |
| `creator-spaces/` | Creator Spaces |
| `teravision-site/` | Teravision website |
| `sistran-portal/` | Insured portal |
| `atmosera-ds/` | Atmosera design system |
| `rootech-payments/` | Payments app |

## How to add media

1. Drop images (`.png`, `.jpg`, `.webp`, `.gif`) or videos (`.mp4`, `.webm`) into the project's folder.
2. Name them in the order you want them shown: `01-dashboard.png`, `02-editor.png`, `03-demo.mp4`.
3. Push. The first **image** becomes the card cover; everything appears in the project drawer.

Once a folder has files, the generated placeholders for that project disappear.

**Video cover image (optional):** add an image with the same name as the video, e.g. `03-demo.mp4` + `03-demo.jpg`. It is used as the video's thumbnail and is not shown as a separate slide.

**Sizes that work well:** images 1600×1000 (16:10). Videos as MP4 (H.264), short loops under ~20 MB; GitHub rejects files over 100 MB.

**New project:** add an entry in `content/projects.ts` and create a folder here with the same `id`.
