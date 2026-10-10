import { readFile, writeFile } from "node:fs/promises";

const overlay = String.raw`
  <g id="bird-battle-overlay" aria-label="Slingshot bird flying toward a pig fortress">
    <!-- A compact game lane beneath the real contribution heatmap. -->
    <path d="M 8 138 L 15 116 L 22 138" fill="none" stroke="#8B5A2B" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 12 117 Q 17 110 23 117" fill="none" stroke="#5E371D" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 20 116 Q 390 92 805 121" fill="none" stroke="#E52521" stroke-width="1.1" stroke-dasharray="3 4" opacity=".7"/>

    <!-- Animated red bird: an original, simple arcade mascot rather than a copied game asset. -->
    <g id="launching-bird">
      <animateMotion dur="5.2s" repeatCount="indefinite" rotate="auto" path="M 22,120 Q 390,78 790,120"/>
      <ellipse cx="0" cy="1" rx="7.6" ry="7" fill="#E52521" stroke="#7F1D1D" stroke-width="1.1"/>
      <path d="M -4 0 Q -7 -5 -1 -5 Q 1 -2 -1 1" fill="#B91C1C" opacity=".8"/>
      <circle cx="1.6" cy="-2.4" r="2.25" fill="#FFFFFF"/>
      <circle cx="2.2" cy="-2.4" r="1.05" fill="#111827"/>
      <path d="M 6 -1 L 12 1.3 L 6 3 Z" fill="#FBD000" stroke="#9A6700" stroke-width=".7"/>
      <path d="M -1 -5 L 5 -5.5 L 3 -3.8 L 0 -3.8 Z" fill="#351515"/>
    </g>

    <!-- Wood-and-stone pig fort target. -->
    <g id="pig-fortress" stroke-linejoin="round">
      <rect x="806" y="120" width="34" height="15" rx="1.5" fill="#C8894A" stroke="#714321" stroke-width="1"/>
      <path d="M 806 125 H 840 M 817 120 V 135 M 829 120 V 135" stroke="#8D5A2D" stroke-width=".8"/>
      <rect x="813" y="112" width="25" height="8" rx="1" fill="#9CA3AF" stroke="#4B5563" stroke-width="1"/>
      <path d="M 815 115 H 836 M 825 112 V 120" stroke="#6B7280" stroke-width=".7"/>
      <ellipse cx="824" cy="108" rx="7" ry="6" fill="#79C943" stroke="#286B2B" stroke-width="1"/>
      <ellipse cx="819" cy="103.7" rx="2.5" ry="2.8" fill="#79C943" stroke="#286B2B" stroke-width=".8"/>
      <ellipse cx="829" cy="103.7" rx="2.5" ry="2.8" fill="#79C943" stroke="#286B2B" stroke-width=".8"/>
      <circle cx="821.5" cy="107" r="1.7" fill="#FFFFFF"/>
      <circle cx="827" cy="107" r="1.7" fill="#FFFFFF"/>
      <circle cx="822" cy="107.2" r=".7" fill="#111827"/>
      <circle cx="827.5" cy="107.2" r=".7" fill="#111827"/>
      <ellipse cx="824.5" cy="111" rx="3.1" ry="2.1" fill="#A7E36F" stroke="#286B2B" stroke-width=".65"/>
      <circle cx="823.5" cy="110.7" r=".45" fill="#286B2B"/>
      <circle cx="825.5" cy="110.7" r=".45" fill="#286B2B"/>
    </g>

    <text x="30" y="138" font-family="monospace" font-size="6.5" font-weight="700" fill="#E52521" letter-spacing=".3">LAUNCH A BUILD</text>
    <text x="803" y="143" font-family="monospace" font-size="5.8" font-weight="700" fill="#009B48">BUG FORT</text>
  </g>
`;

for (const file of process.argv.slice(2)) {
  const svg = await readFile(file, "utf8");
  if (!svg.includes("<svg") || !svg.includes("</svg>")) {
    throw new Error(`Expected a complete SVG file: ${file}`);
  }
  if (svg.includes('id="bird-battle-overlay"')) continue;
  await writeFile(file, svg.replace("</svg>", `${overlay}\n</svg>`), "utf8");
  process.stdout.write(`Added bird-battle overlay: ${file}\n`);
}
