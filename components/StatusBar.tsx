// Fake editor status bar. ScrollFx updates the "Ln, Col" counter as you scroll.
export default function StatusBar() {
  return (
    <div className="status" aria-hidden="true">
      <div>
        <span className="it hl">⎇ main</span>
        <span className="it"><span className="dot" />available</span>
        <span className="it opt">0 errors · 0 warnings</span>
      </div>
      <div>
        <span className="it" id="lncol">Ln 1, Col 1</span>
        <span className="it opt">UTF-8</span>
        <span className="it opt">TypeScript React</span>
        <span className="it opt">UTC−4</span>
      </div>
    </div>
  );
}
