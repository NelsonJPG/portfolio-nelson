export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} Nelson Gonzalez</span>
        <span>Designed in the dark · built with Next.js and Claude Code</span>
      </div>
    </footer>
  );
}
