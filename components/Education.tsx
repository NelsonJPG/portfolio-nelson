import { education } from "@/content/education";

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-h">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="file"><span>//</span> education.ts</div>
            <h2 className="h2" id="edu-h">Where it started.</h2>
          </div>
        </div>
        <div className="edu-grid">
          {education.map((e) => (
            <article className="card minor" key={e.when + e.school}>
              <h3>{e.title} · {e.school}</h3>
              <p className="co" style={{ fontSize: 14 }}>{e.summary}</p>
              <p className="co" style={{ fontSize: 13, marginTop: 4 }}>{e.when} · {e.where}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
