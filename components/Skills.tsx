import { technical, soft, languages } from "@/content/skills";
import Chips from "./Chips";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="file"><span>//</span> skills.md</div>
            <h2 className="h2" id="skills-h">What I bring.</h2>
          </div>
          <p className="lede" style={{ margin: 0, maxWidth: "42ch" }}>
            The tools I use every day, and how I work with people.
          </p>
        </div>
        <h3 className="sk-h"><span className="sk-dot blue" />Technical skills</h3>
        <div className="sk-grid">
          {technical.map((s) => (
            <article className="sk rise" key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              <Chips items={s.tools} />
            </article>
          ))}
        </div>
        <h3 className="sk-h"><span className="sk-dot red" />Soft skills</h3>
        <div className="sk-grid soft">
          {soft.map((s) => (
            <article className="sk rise" key={s.title}>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <p className="langs"><b>Languages</b> {languages}</p>
      </div>
    </section>
  );
}
