import type { SetupItem } from "@/content/setup";

// Line illustrations for the "My setup" cards. Colors come from CSS classes (sa-*) so they follow the palette.

function Laptop() {
  return (
    <svg viewBox="0 0 240 140" role="img" aria-label="MacBook Pro with code on screen">
      <rect className="sa-body" x="58" y="18" width="124" height="84" rx="7" />
      <rect className="sa-screen" x="65" y="25" width="110" height="70" rx="3" />
      <g className="sa-code">
        <rect className="b" x="73" y="34" width="26" height="4" rx="2" />
        <rect className="m" x="103" y="34" width="40" height="4" rx="2" />
        <rect className="r" x="81" y="44" width="18" height="4" rx="2" />
        <rect className="m" x="103" y="44" width="52" height="4" rx="2" />
        <rect className="b" x="81" y="54" width="34" height="4" rx="2" />
        <rect className="m" x="119" y="54" width="22" height="4" rx="2" />
        <rect className="m" x="81" y="64" width="46" height="4" rx="2" />
        <rect className="r" x="73" y="74" width="14" height="4" rx="2" />
        <rect className="sa-cursor" x="91" y="73" width="3" height="6" />
      </g>
      <path className="sa-body" d="M40 104h160l-8 12H48Z" />
      <rect className="sa-notch" x="108" y="104" width="24" height="3" rx="1.5" />
      <g className="sa-chip">
        <rect x="186" y="66" width="34" height="34" rx="6" />
        <text x="203" y="81" textAnchor="middle">M5</text>
        <text x="203" y="92" textAnchor="middle" className="s">PRO</text>
      </g>
      <text className="sa-tag" x="22" y="40">48GB</text>
    </svg>
  );
}

function Fiber() {
  return (
    <svg viewBox="0 0 240 140" role="img" aria-label="Fiber router sending Wi-Fi">
      <path className="sa-cable" d="M0 112 C40 112 50 100 82 100" />
      <path className="sa-pulse" d="M0 112 C40 112 50 100 82 100" />
      <rect className="sa-body" x="82" y="86" width="96" height="30" rx="7" />
      <circle className="sa-led on" cx="98" cy="101" r="3" />
      <circle className="sa-led on d1" cx="110" cy="101" r="3" />
      <circle className="sa-led on d2" cx="122" cy="101" r="3" />
      <circle className="sa-led" cx="134" cy="101" r="3" />
      <path className="sa-body" d="M96 86V64M164 86V64" />
      <g className="sa-waves">
        <path className="w1" d="M114 70a22 22 0 0 1 32 0" />
        <path className="w2" d="M102 58a38 38 0 0 1 56 0" />
        <path className="w3" d="M90 46a54 54 0 0 1 80 0" />
      </g>
      <text className="sa-tag" x="188" y="40">400</text>
      <text className="sa-tag s" x="188" y="52">Mb/s</text>
    </svg>
  );
}

function Starlink() {
  return (
    <svg viewBox="0 0 240 140" role="img" aria-label="Starlink Mini linked to a satellite">
      <g className="sa-stars">
        <circle cx="30" cy="22" r="1.4" /><circle cx="92" cy="14" r="1.2" /><circle cx="140" cy="30" r="1.4" />
        <circle cx="214" cy="68" r="1.2" /><circle cx="56" cy="54" r="1" />
      </g>
      <g className="sa-sat">
        <rect className="sa-panel" x="164" y="14" width="22" height="12" rx="1.5" />
        <rect className="sa-body" x="188" y="12" width="12" height="16" rx="2" />
        <rect className="sa-panel" x="202" y="14" width="22" height="12" rx="1.5" />
      </g>
      <path className="sa-beam" d="M188 32 L110 84" />
      <g transform="rotate(-24 102 98)">
        <rect className="sa-body" x="70" y="80" width="64" height="40" rx="5" />
        <rect className="sa-dish" x="75" y="85" width="54" height="30" rx="3" />
      </g>
      <path className="sa-body" d="M108 112l14 14M94 126h40" />
      <text className="sa-tag r" x="18" y="122">BACKUP</text>
    </svg>
  );
}

export default function SetupArt({ icon }: { icon: SetupItem["icon"] }) {
  return (
    <div className="setup-art">
      {icon === "laptop" ? <Laptop /> : icon === "fiber" ? <Fiber /> : <Starlink />}
    </div>
  );
}
