import { about } from "@/content/profile";
import DevScene from "./DevScene";

// Turns **bold** in content strings into <strong>.
function Rich({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h">
      <div className="wrap about-grid">
        <div className="about-scene rise">
          <DevScene />
        </div>
        <div className="story">
          <div className="file"><span>//</span> about.md</div>
          <h2 className="h2" id="about-h">{about.title}</h2>
          <div style={{ marginTop: 22 }}>
            {about.paragraphs.map((p, i) => (
              <p key={i}><Rich text={p} /></p>
            ))}
          </div>
          <div className="services">
            {about.services.map((s) => (
              <article className="svc rise" key={s.title}>
                <div className="ic" aria-hidden="true">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="n">{s.stack}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
