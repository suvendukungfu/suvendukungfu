import { readFile, writeFile } from "node:fs/promises";

const overlay = String.raw`
  <defs>
    <linearGradient id="battle-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="__SKY_TOP__" />
      <stop offset="100%" stop-color="__SKY_BOTTOM__" />
    </linearGradient>
    <linearGradient id="battle-grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8BCF52" />
      <stop offset="100%" stop-color="#4D982E" />
    </linearGradient>
    <linearGradient id="battle-wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E7B56D" />
      <stop offset="100%" stop-color="#9D5F2C" />
    </linearGradient>
    <linearGradient id="battle-stone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D9E0E7" />
      <stop offset="100%" stop-color="#82909F" />
    </linearGradient>
    <filter id="bird-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.8" />
    </filter>
  </defs>

  <g id="slingshot-battle-scene" aria-label="Original cartoon bird launching toward a destructible pig fort beneath a real contribution grid">
    <rect x="-16" y="160" width="880" height="84" fill="url(#battle-sky)" />

    <g opacity="__STAR_OPACITY__" fill="#FFFFFF">
      <circle cx="735" cy="177" r="1.2" />
      <circle cx="690" cy="192" r="1" />
      <circle cx="620" cy="170" r="1.1" />
      <circle cx="452" cy="182" r="1" />
      <circle cx="375" cy="168" r="1.2" />
    </g>
    <g fill="__CLOUD_COLOR__" opacity="__CLOUD_OPACITY__">
      <path d="M 108 183 C 108 178 113 176 118 178 C 121 170 133 171 136 179 C 144 177 149 181 149 185 L 108 185 Z" />
      <path d="M 520 190 C 520 186 524 184 529 186 C 533 178 545 179 548 187 C 555 185 560 188 561 192 L 520 192 Z" />
    </g>
    <circle cx="815" cy="176" r="8.5" fill="#FBD000" stroke="#D78D00" stroke-width="1" opacity="__SUN_OPACITY__" />

    <path d="M -16 219 Q 55 198 126 216 T 273 215 T 416 215 T 562 214 T 710 214 T 864 211 L 864 245 L -16 245 Z" fill="#81C94A" />
    <path d="M -16 226 Q 94 214 188 226 T 385 224 T 590 224 T 864 220 L 864 245 L -16 245 Z" fill="url(#battle-grass)" />
    <path d="M -16 235 Q 210 231 410 236 T 864 233 L 864 245 L -16 245 Z" fill="#8B5A2B" />
    <path d="M -16 235 Q 210 231 410 236 T 864 233" fill="none" stroke="#5F9D31" stroke-width="1.4" />

    <g id="slingshot" stroke-linecap="round" stroke-linejoin="round">
      <path d="M 59 229 L 58 197" fill="none" stroke="#69401F" stroke-width="8" />
      <path d="M 58 198 L 48 181" fill="none" stroke="#82502A" stroke-width="7" />
      <path d="M 59 198 L 70 180" fill="none" stroke="#82502A" stroke-width="7" />
      <path d="M 48 181 Q 62 196 74 196" fill="none" stroke="#E52521" stroke-width="2.2" />
      <path d="M 70 180 Q 72 187 74 196" fill="none" stroke="#FBD000" stroke-width="2.2" />
      <path d="M 43 229 L 73 229" fill="none" stroke="#69401F" stroke-width="4.5" />
      <path d="M 50 233 L 68 233" fill="none" stroke="#B5793E" stroke-width="2" />
    </g>

    <path d="M 74 196 Q 415 132 746 190" fill="none" stroke="#FBD000" stroke-width="1.8" stroke-dasharray="2.5 5" stroke-linecap="round" opacity=".9">
      <animate attributeName="stroke-dashoffset" values="0;-30" dur="1.5s" repeatCount="indefinite" />
    </path>

    <g id="launching-bird">
      <animateMotion dur="4.8s" repeatCount="indefinite" rotate="auto" path="M 74,196 Q 415,132 746,190" />
      <ellipse cx="0" cy="2" rx="9.8" ry="8.4" fill="#111827" opacity=".18" filter="url(#bird-shadow)" />
      <path d="M -8 1 Q -17 -4 -15 -10 Q -8 -7 -5 -3" fill="#B91C1C" stroke="#7F1D1D" stroke-width=".8" />
      <ellipse cx="0" cy="0" rx="9.5" ry="8.5" fill="#E52521" stroke="#9D1919" stroke-width="1.1" />
      <path d="M -5 -6 Q -4 -13 0 -10 L 3 -7 L 8 -8 L 6 -3 Z" fill="#C81E1E" stroke="#8B1717" stroke-width=".65" />
      <path d="M -3 4 Q 1 8 5 4" fill="none" stroke="#F8B4A9" stroke-width="1" opacity=".9" />
      <circle cx="3.3" cy="-2.3" r="3" fill="#FFFFFF" />
      <circle cx="4" cy="-2.1" r="1.35" fill="#172033" />
      <path d="M 1.1 -5.3 L 7 -4.1 L 3.5 -2.9 Z" fill="#3B1515" />
      <path d="M 8 -1 L 15 1.6 L 8 4 Z" fill="#FBD000" stroke="#B97700" stroke-width=".8" />
    </g>

    <g id="pig-fort">
      <rect x="741" y="211" width="91" height="10" rx="1.2" fill="url(#battle-wood)" stroke="#714321" stroke-width="1" />
      <path d="M 750 212 V 220 M 760 212 V 220 M 770 212 V 220 M 780 212 V 220 M 790 212 V 220 M 800 212 V 220 M 810 212 V 220 M 820 212 V 220" stroke="#8C5127" stroke-width=".7" />
      <g id="left-tower-block">
        <animateTransform attributeName="transform" type="rotate" values="0 755 197;2 755 197;-1 755 197;0 755 197" dur="3.4s" repeatCount="indefinite" />
        <rect x="746" y="194" width="18" height="17" rx="1.5" fill="url(#battle-stone)" stroke="#576574" stroke-width="1" />
        <path d="M 749 198 H 760 M 749 203 H 760" stroke="#A3AFBC" stroke-width=".8" />
      </g>
      <g id="right-tower-block">
        <animateTransform attributeName="transform" type="rotate" values="0 817 196;-2 817 196;1 817 196;0 817 196" dur="3.1s" repeatCount="indefinite" />
        <rect x="808" y="192" width="18" height="19" rx="1.5" fill="url(#battle-wood)" stroke="#714321" stroke-width="1" />
        <path d="M 812 195 V 208 M 817 195 V 208 M 822 195 V 208" stroke="#8C5127" stroke-width=".7" />
      </g>
      <rect x="759" y="187" width="55" height="8" rx="1" fill="#9DE6F5" fill-opacity=".86" stroke="#288EAB" stroke-width="1" />
      <path d="M 764 189 L 770 193 M 778 189 L 784 193 M 792 189 L 798 193 M 806 189 L 810 192" stroke="#FFFFFF" stroke-width=".8" opacity=".85" />
      <rect x="769" y="178" width="36" height="9" rx="1" fill="url(#battle-wood)" stroke="#714321" stroke-width="1" />
      <path d="M 776 179 V 185 M 785 179 V 185 M 794 179 V 185" stroke="#8C5127" stroke-width=".7" />
      <rect x="781" y="171" width="11" height="7" rx="1" fill="url(#battle-stone)" stroke="#576574" stroke-width=".8" />
      <path d="M 783 174 H 790" stroke="#A3AFBC" stroke-width=".7" />

      <g id="fort-target-one">
        <ellipse cx="787" cy="179" rx="7.2" ry="6.3" fill="#80C943" stroke="#367B2D" stroke-width="1" />
        <ellipse cx="782.5" cy="174.4" rx="2.5" ry="2.8" fill="#80C943" stroke="#367B2D" stroke-width=".7" />
        <ellipse cx="791.5" cy="174.4" rx="2.5" ry="2.8" fill="#80C943" stroke="#367B2D" stroke-width=".7" />
        <circle cx="784.5" cy="178" r="1.55" fill="#FFFFFF" />
        <circle cx="789.8" cy="178" r="1.55" fill="#FFFFFF" />
        <circle cx="784.9" cy="178.3" r=".7" fill="#172033" />
        <circle cx="790.1" cy="178.3" r=".7" fill="#172033" />
        <ellipse cx="787" cy="182" rx="3.1" ry="1.9" fill="#A8E66E" stroke="#367B2D" stroke-width=".6" />
        <circle cx="785.8" cy="181.8" r=".45" fill="#367B2D" />
        <circle cx="788.2" cy="181.8" r=".45" fill="#367B2D" />
      </g>
      <g id="fort-target-two">
        <ellipse cx="805" cy="201" rx="6" ry="5.2" fill="#80C943" stroke="#367B2D" stroke-width=".9" />
        <circle cx="802.8" cy="200" r="1.25" fill="#FFFFFF" />
        <circle cx="807" cy="200" r="1.25" fill="#FFFFFF" />
        <circle cx="803" cy="200.2" r=".55" fill="#172033" />
        <circle cx="807.2" cy="200.2" r=".55" fill="#172033" />
        <ellipse cx="805" cy="203" rx="2.7" ry="1.7" fill="#A8E66E" stroke="#367B2D" stroke-width=".55" />
      </g>
    </g>

    <g id="impact-burst" stroke="#FBD000" stroke-width="1.7" stroke-linecap="round">
      <path d="M 739 180 l -6 -4 M 742 174 l -2 -7 M 749 177 l 5 -6 M 738 188 l -7 1 M 748 190 l 4 5">
        <animate attributeName="opacity" values=".25;1;.35" dur=".85s" repeatCount="indefinite" />
      </path>
      <circle cx="737" cy="182" r="2.2" fill="#FFFFFF" stroke="none">
        <animate attributeName="r" values="1;3;1" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".2;1;.2" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>

    <g font-family="monospace" font-weight="700">
      <text x="30" y="174" font-size="7.5" fill="__HUD_TEXT__" letter-spacing=".6">SLINGSHOT LAB / FIELD 01</text>
      <text x="30" y="184" font-size="5.7" fill="__HUD_TEXT__" opacity=".8" letter-spacing=".4">AIM / BUILD / TEST / SHIP</text>
      <text x="744" y="232" font-size="5.9" fill="#FFFFFF" letter-spacing=".3">BUG FORT</text>
      <rect x="662" y="166" width="117" height="12" rx="3" fill="#172033" fill-opacity=".82" />
      <text x="670" y="174.4" font-size="5.9" fill="#FBD000" letter-spacing=".35">MISSION: CLEAR THE BUGS</text>
    </g>
  </g>
`;

for (const file of process.argv.slice(2)) {
  const svg = await readFile(file, "utf8");
  if (!svg.includes("<svg") || !svg.includes("</svg>")) {
    throw new Error("Expected a complete SVG file: " + file);
  }

  const isDark = file.toLowerCase().includes("dark");
  const themedOverlay = overlay
    .replaceAll("__SKY_TOP__", isDark ? "#152342" : "#BEEBFF")
    .replaceAll("__SKY_BOTTOM__", isDark ? "#263B5C" : "#F3FCFF")
    .replaceAll("__STAR_OPACITY__", isDark ? ".88" : "0")
    .replaceAll("__CLOUD_COLOR__", isDark ? "#B8CAE0" : "#FFFFFF")
    .replaceAll("__CLOUD_OPACITY__", isDark ? ".18" : ".94")
    .replaceAll("__SUN_OPACITY__", isDark ? ".16" : "1")
    .replaceAll("__HUD_TEXT__", isDark ? "#F9FAFB" : "#16334D");

  let output = svg.replace(
    /<svg viewBox="[^"]+" width="[^"]+" height="[^"]+"/,
    '<svg viewBox="-16 -32 880 275" width="880" height="275"'
  );
  if (output === svg) {
    throw new Error("Unable to expand SVG canvas: " + file);
  }
  output = output.replace("</svg>", themedOverlay + "\n</svg>");
  await writeFile(file, output, "utf8");
  process.stdout.write("Rendered slingshot game scene: " + file + "\n");
}
