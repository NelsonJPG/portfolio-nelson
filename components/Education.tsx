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
            <article className="card minor edu" key={e.when + e.school}>
              <span className="ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9l10-5 10 5-10 5L2 9Z" />
                  <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
                  <path d="M22 9v6" />
                </svg>
              </span>
              <div>
                <h3>{e.title} · {e.school}</h3>
                <p className="co" style={{ fontSize: 14 }}>{e.summary}</p>
                <p className="co" style={{ fontSize: 13, marginTop: 4 }}>{e.when} · {e.where}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
