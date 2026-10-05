// Hero, about and contact details. Edit text here; the page picks it up on the next build.

export const profile = {
  name: ["Nelson", "Gonzalez"],
  badge: "Fullstack developer · open to remote",
  typedWords: ["design systems", "Next.js apps", "APIs with NestJS", "tested interfaces", "spec-driven features"],
  pitch:
    "8 years shipping production web apps with React, Next.js, TypeScript and Node.js. Former front-end team lead, now building with AI-assisted, spec-driven workflows.",
  links: {
    cv: "/Nelson_Gonzalez_CV.pdf",
    linkedin: "https://www.linkedin.com/in/nelson-jp-gonzalez/",
    email: "njeanpierre23@gmail.com",
    emailSubject: "Hi Nelson, let's talk",
  },
  stats: [
    { value: 8, suffix: "+", label: "years in production" },
    { value: 5, suffix: "", label: "years leading front-end" },
    { value: 6, suffix: "", label: "products featured below" },
  ],
  location: "Caracas, VE · UTC−4",
};

export const about = {
  title: "Frontend-first fullstack developer.",
  // **bold** marks the highlighted phrases.
  paragraphs: [
    "I've spent **8 years building production web apps**, from CRMs and insurance portals to content platforms. My focus is the front end: architecture, design systems, and the tests that keep them honest.",
    "I also build the APIs behind them with **NestJS and Express** on MongoDB and PostgreSQL. I led a front-end team for five years, mentored engineers, and taught full-stack development at 4Geeks Academy. Today I ship features with **Claude Code and spec-driven development**, including custom skills for design-to-code work.",
  ],
  services: [
    { icon: "{ }", title: "Front-end architecture", text: "Design systems on Ant Design and Tailwind, reusable component libraries, coding standards.", stack: "React · Next.js · Vue" },
    { icon: "</>", title: "Fullstack features", text: "REST APIs, validation and business logic, auth with AWS Cognito, third-party integrations.", stack: "Node · NestJS · Express" },
    { icon: "✓", title: "Testing and quality", text: "Unit and end-to-end suites for critical flows, code review, and performance work.", stack: "Playwright · Cypress" },
  ],
};
