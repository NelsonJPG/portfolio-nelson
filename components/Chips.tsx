export default function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((s) => (
        <span className="chip" key={s}>{s}</span>
      ))}
    </div>
  );
}
