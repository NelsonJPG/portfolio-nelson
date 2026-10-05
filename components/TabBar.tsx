import { profile } from "@/content/profile";

// data-ln feeds the fake "Ln, Col" counter in the status bar.
export const tabs = [
  { href: "#about", label: "about.md", ln: 12 },
  { href: "#experience", label: "experience.ts", ln: 48 },
  { href: "#projects", label: "projects/", ln: 96 },
  { href: "#skills", label: "skills.md", ln: 140 },
];

export default function TabBar() {
  return (
    <header className="bar">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="Nelson Gonzalez, back to top">
          <b>NG</b>
          <span>nelson.dev</span>
        </a>
        <nav className="tabs" aria-label="Sections">
          {tabs.map((t) => (
            <a key={t.href} className="tab" href={t.href} data-ln={t.ln}>
              {t.label}
            </a>
          ))}
        </nav>
        <div className="bar-cta">
          <a className="btn sm" href={profile.links.linkedin} target="_blank" rel="noopener">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </header>
  );
}
