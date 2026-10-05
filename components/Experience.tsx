import { experience } from "@/content/experience";
import Chips from "./Chips";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-h">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="file"><span>//</span> experience.ts</div>
            <h2 className="h2" id="exp-h">Where I&apos;ve shipped.</h2>
          </div>
          <p className="lede" style={{ margin: 0, maxWidth: "40ch" }}>
            2016 to 2026. Newest first. Open a role to see the client projects inside it.
          </p>
        </div>
        <div className="tl" id="tl">
          <span className="fill" id="tlfill" aria-hidden="true" />
          {experience.map((job) => (
            <div className={`node rise${job.minor ? " minor" : ""}`} key={job.when + job.company}>
              <div className="when"><b>{job.when}</b>{job.where}</div>
              {job.minor ? (
                <article className="card minor">
                  <h3>{job.title} · {job.company}</h3>
                  <p className="co" style={{ fontSize: 14 }}>{job.summary}</p>
                </article>
              ) : (
                <article className="card">
                  <h3>{job.title}</h3>
                  <p className="co">
                    {job.company}
                    {job.companyNote && <em>{job.companyNote}</em>}
                  </p>
                  {job.bullets && (
                    <ul>{job.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  )}
                  {job.stack && <Chips items={job.stack} />}
                  {job.clients && (
                    <details className="sub">
                      <summary>{job.clients.length} client projects</summary>
                      <div className="subs">
                        {job.clients.map((c) => (
                          <div className="subp" key={c.name}>
                            <b>{c.name}</b>
                            <p>{c.text}</p>
                            <Chips items={c.stack} />
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </article>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
