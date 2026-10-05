export default function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((s, i) => (
        <span className={`chip ${i % 2 === 0 ? "chip-blue" : "chip-red"}`} key={s}>{s}</span>
      ))}
    </div>
  );
}
