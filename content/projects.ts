import type { MockKind } from "@/lib/mock";

// Images and videos: drop files into public/projects/<id>/ (e.g. public/projects/dubsado/).
// They show up automatically, sorted by file name, so prefix them 01-, 02-, ...
// The `shots` below are generated placeholders, used only while that folder is empty.
// To pick files or add captions by hand, list them here instead and they win over the folder:
//   "/projects/dubsado/01-editor.png"
//   { src: "/projects/dubsado/demo.mp4", poster: "/projects/dubsado/demo.jpg", alt: "Editing a workflow" }
export type Shot = string | { src: string; poster?: string; alt?: string } | [MockKind, string];

export type Project = {
  id: string;
  title: string;
  tag: string;
  years: string;
  role: string;
  org: string;
  summary: string;
  context: string;
  built: string[];
  stack: string[];
  shots: Shot[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "dubsado", title: "Dubsado", tag: "CRM for small businesses", years: "2020 – 2025", role: "Front-end developer", org: "Teravision client",
    summary: "Workflow modules for a CRM that automates client work for small businesses.",
    context: "Dubsado runs on a microservices platform. The product needed complex, highly interactive modules that stay fast as a customer’s workflows grow.",
    built: [
      "A visual workflow editor, a to-do app, a settings interface, notifications and embeddable widgets.",
      "Removed unnecessary re-renders with memoization and controlled state updates.",
      "Express.js routes, input validation and business logic with the backend team.",
    ],
    stack: ["React", "TypeScript", "Redux", "React Query", "Express.js", "MongoDB", "Redis", "GCP"],
    shots: [["workflow", "app.dubsado.com/workflows"], ["dashboard", "app.dubsado.com/home"], ["form", "app.dubsado.com/settings"]],
  },
  {
    id: "creator-spaces", title: "Creator Spaces", tag: "Content scheduling for creators", years: "2020 – 2025", role: "Front-end developer", org: "Teravision client",
    summary: "A media gallery and scheduling calendar so creators can plan posts in one place.",
    context: "Creators needed to store media, schedule content and connect third-party platforms from a single workspace.",
    built: [
      "A dynamic media gallery and a scheduling calendar in Next.js and TypeScript.",
      "AWS Cognito authentication with token handling and session persistence.",
      "A Chrome extension to manage session data for a third-party integration, learned from scratch for a tight demo deadline.",
    ],
    stack: ["Next.js", "TypeScript", "Material UI", "React Query", "Redux", "MongoDB", "AWS Cognito"],
    shots: [["calendar", "creatorspaces.app/schedule"], ["gallery", "creatorspaces.app/media"], ["form", "creatorspaces.app/login"]],
  },
  {
    id: "teravision-site", title: "Teravision website", tag: "Corporate site rebuild", years: "2020 – 2025", role: "Front-end lead", org: "Teravision Technologies",
    summary: "SSR and ISR rebuild of the corporate site, with live job openings.",
    context: "The old site was slow and hard to rank. Marketing needed to publish content and hiring needed open roles to stay current.",
    built: [
      "Rebuilt the site with SSR and ISR for faster loads and stronger SEO.",
      "Defined the project architecture and coding guidelines.",
      "Extended Strapi CMS modules and integrated CKEditor for authors.",
      "Synced open roles in real time from the Greenhouse API.",
    ],
    stack: ["Vue.js", "Nuxt.js", "Strapi CMS", "Express.js", "Tailwind CSS"],
    shots: [["site", "teravisiontech.com"], ["site", "teravisiontech.com/careers"], ["form", "cms.teravisiontech.com"]],
  },
  {
    id: "sistran-portal", title: "Insured portal", tag: "Health insurance self-service", years: "2021 – 2022", role: "Fullstack developer", org: "Sistran Digital",
    summary: "A portal where insured customers manage policies, and a quote tool for agents.",
    context: "Health insurance customers needed to see policies and providers online, and onboarding needed automated identity checks.",
    built: [
      "A dashboard with Google Maps integration and policy management views.",
      "Third-party KYC integration to automate identity and document validation.",
      "A dynamic quote generator that builds personalized quotes from coverage options.",
      "Express.js routes, validation and business logic.",
    ],
    stack: ["React", "Express.js", "Material UI", "Google Maps API"],
    shots: [["dashboard", "portal.sistran.com"], ["map", "portal.sistran.com/providers"], ["form", "agents.sistran.com/quote"]],
  },
  {
    id: "atmosera-ds", title: "Atmosera design system", tag: "Base theme and components", years: "2025 – 2026", role: "Fullstack developer", org: "Atmosera",
    summary: "The base theme and design system the whole team builds on.",
    context: "A new product needed consistent UI foundations fast, while features were being delivered with AI-assisted, spec-driven workflows.",
    built: [
      "A base theme and design system on top of Ant Design and Tailwind CSS.",
      "Complete feature modules delivered with Claude Code and spec-driven development.",
      "Playwright unit and end-to-end tests for critical flows.",
    ],
    stack: ["React", "TypeScript", "Ant Design", "Tailwind CSS", "Playwright", "Claude Code"],
    shots: [["components", "design-system / foundations"], ["dashboard", "app / module"], ["form", "app / settings"]],
  },
  {
    id: "rootech-payments", title: "Payments app", tag: "Architecture and component library", years: "2018 – 2020", role: "Fullstack developer", org: "RooTech Services",
    summary: "Front-end architecture and a shared React component library for a payments product.",
    context: "Several projects repeated the same UI code. The payments app needed a clear structure the whole team could follow.",
    built: [
      "Designed the front-end architecture, coding standards and project structure.",
      "A reusable React component library that cut duplication across projects.",
      "Database models, relationships and API design.",
    ],
    stack: ["React", "Node.js", "REST APIs"],
    shots: [["dashboard", "pay.rootech / overview"], ["components", "ui-kit / components"], ["form", "pay.rootech / transfer"]],
  },
];
