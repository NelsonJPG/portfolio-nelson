import { profile } from "@/content/profile";
import TypedText from "./TypedText";
import CountUp from "./CountUp";
import Avatar from "./Avatar";

export default function Hero() {
  const { links } = profile;
  const mailto = `mailto:${links.email}?subject=${encodeURIComponent(links.emailSubject)}`;

  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="glow" id="glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <span className="badge">
            <span className="dot" />
            {profile.badge}
          </span>
          <p className="prompt">
            <i>~</i> $ whoami
          </p>
          <h1 className="name" id="hero-name">
            {profile.name[0]}
            <br />
            {profile.name[1]}
          </h1>
          <p className="typed" aria-live="off">
            &gt; I build <TypedText words={profile.typedWords} />
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="pitch">{profile.pitch}</p>
          <div className="ctas">
            <a className="btn primary" href={links.cv} download>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" />
              </svg>
              Download CV
            </a>
            <a className="btn" href={links.linkedin} target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.61 0-1.85 1.25-1.85 2.55v4.9h-4z" />
              </svg>
              LinkedIn
            </a>
            <a className="btn mail" href={mailto} title={links.email}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Email me
            </a>
          </div>
          <div className="stats">
            {profile.stats.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp value={s.value} suffix={s.suffix} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="art">
          <Avatar />
        </div>
      </div>
    </section>
  );
}
