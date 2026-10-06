import { setup, setupIntro } from "@/content/setup";
import SetupArt from "./SetupArt";

export default function Setup() {
  return (
    <section id="setup" aria-labelledby="setup-h">
      <div className="wrap">
        <div className="head-row">
          <div>
            <div className="file"><span>//</span> setup.json</div>
            <h2 className="h2" id="setup-h">My setup.</h2>
          </div>
          <p className="lede" style={{ margin: 0, maxWidth: "42ch" }}>{setupIntro}</p>
        </div>
        <div className="setup-grid">
          {setup.map((s) => (
            <article className="setup rise" key={s.title}>
              <SetupArt icon={s.icon} />
              <div>
                <p className="setup-k">{s.label}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
