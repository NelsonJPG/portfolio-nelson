// Timeline entries, newest first. Use `minor: true` for short entries (teaching, education).

export type ClientProject = { name: string; text: string; stack: string[] };
export type Job = {
  when: string;
  where: string;
  title: string;
  company: string;
  companyNote?: string;
  minor?: boolean;
  summary?: string; // used by minor entries
  bullets?: string[];
  stack?: string[];
  clients?: ClientProject[];
};

export const experience: Job[] = [
  {
    when: "Sep 2025 – Jul 2026", where: "Remote · US / CR",
    title: "Fullstack Developer", company: "Atmosera", companyNote: "formerly Hikru",
    bullets: [
      "Built the project's base theme and design system on Ant Design and Tailwind CSS.",
      "Delivered complete feature modules with Claude Code and spec-driven development.",
      "Wrote unit and end-to-end tests with Playwright for critical user flows.",
      "Led technical discussions on architecture, performance and reusable patterns.",
    ],
    stack: ["React", "TypeScript", "Ant Design", "Tailwind", "Playwright", "Claude Code"],
  },
  {
    when: "Apr 2020 – Jun 2025", where: "Remote · Caracas",
    title: "Front-End Developer", company: "Teravision Technologies",
    bullets: [
      "Led the front-end team: architecture guidelines, development standards and code review practices.",
      "Mentored engineers through pull request reviews and technical discussions.",
      "Wrote unit and end-to-end tests with Cypress.",
    ],
    stack: ["React", "Next.js", "Vue", "Nuxt", "Cypress"],
    clients: [
      { name: "Dubsado", text: "Workflow editor, to-do app, settings, notifications and embeddable widgets on a microservices CRM.", stack: ["React", "Redux", "Express", "Redis"] },
      { name: "Teravision corporate website", text: "SSR and ISR rebuild, custom Strapi modules, live job openings from the Greenhouse API.", stack: ["Nuxt", "Strapi", "Tailwind"] },
      { name: "Creator Spaces", text: "Media gallery, scheduling calendar, AWS Cognito auth and a Chrome extension.", stack: ["Next.js", "MUI", "AWS"] },
    ],
  },
  {
    when: "Feb 2021 – Nov 2022", where: "Remote",
    title: "Fullstack Developer", company: "Sistran Digital",
    bullets: [
      "Built an insured-client portal with a dashboard, Google Maps and policy management views.",
      "Integrated a KYC provider to automate identity and document verification.",
      "Built a dynamic quote generator for insurance agents.",
    ],
    stack: ["React", "Express", "Material UI"],
  },
  {
    when: "2021", where: "Remote", minor: true,
    title: "Senior Mentor (Lead Teacher)", company: "4Geeks Academy",
    summary: "Taught full-stack development: React, JavaScript, Python/Flask, SQLAlchemy.",
  },
  {
    when: "Oct 2018 – Mar 2020", where: "Caracas",
    title: "Fullstack Developer", company: "RooTech Services",
    bullets: [
      "Designed the front-end architecture for a payments application.",
      "Built a reusable React component library used across projects.",
      "Contributed to database and API design; built WordPress sites and WooCommerce plugins.",
    ],
    stack: ["React", "Node.js", "WordPress"],
  },
  {
    when: "2011 – 2016", where: "Caracas", minor: true,
    title: "Computer Engineering", company: "Colegio Universitario de Caracas",
    summary: "5-year degree in Ingeniería en Informática.",
  },
];
