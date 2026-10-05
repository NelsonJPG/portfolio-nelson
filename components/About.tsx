import { about, profile } from "@/content/profile";

// Turns **bold** in content strings into <strong>.
function Rich({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h">
      <div className="wrap about-grid">
        <figure className="photo rise" style={{ margin: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nelson_gray.jpg" alt="Portrait of Nelson Gonzalez, smiling, in a white t-shirt" width={445} height={615} loading="lazy" />
          <figcaption>
            <span>nelson.jpg</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
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
