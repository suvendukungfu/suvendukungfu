import { readFile, writeFile } from "node:fs/promises";

const overlay = String.raw`
  <defs>
    <linearGradient id="spider-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="__SKY_TOP__"/>
      <stop offset="100%" stop-color="__SKY_BOTTOM__"/>
    </linearGradient>
    <linearGradient id="spider-building" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="__BUILDING_A__"/>
      <stop offset="100%" stop-color="__BUILDING_B__"/>
    </linearGradient>
    <linearGradient id="spider-suit-blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#128AF0"/>
      <stop offset="100%" stop-color="#062C86"/>
    </linearGradient>
    <linearGradient id="spider-suit-red" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF4A50"/>
      <stop offset="100%" stop-color="#A80F26"/>
    </linearGradient>
    <linearGradient id="spider-window" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#BCEBFF"/>
      <stop offset="100%" stop-color="#3889CE"/>
    </linearGradient>
    <filter id="spider-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2.2"/>
    </filter>
  </defs>

  <g id="spider-verse-city" aria-label="Original web-slinger comic scene beneath the real GitHub contribution calendar">
    <rect x="-16" y="160" width="880" height="170" fill="url(#spider-sky)"/>

    <!-- Moon, comic halftone, and distant skyline. -->
    <circle cx="735" cy="187" r="23" fill="#F7F8FF" opacity="__MOON_OPACITY__"/>
    <circle cx="735" cy="187" r="29" fill="#E62429" opacity="__HALO_OPACITY__" filter="url(#spider-glow)"/>
    <g fill="__DOT_COLOR__" opacity=".22">
      <circle cx="450" cy="179" r="1"/><circle cx="462" cy="179" r="1"/><circle cx="474" cy="179" r="1"/>
      <circle cx="450" cy="191" r="1"/><circle cx="462" cy="191" r="1"/><circle cx="474" cy="191" r="1"/>
      <circle cx="450" cy="203" r="1"/><circle cx="462" cy="203" r="1"/><circle cx="474" cy="203" r="1"/>
      <circle cx="482" cy="191" r="1"/><circle cx="494" cy="191" r="1"/><circle cx="506" cy="191" r="1"/>
    </g>

    <!-- Distant towers. -->
    <g fill="__DISTANT_BUILDING__" opacity=".66">
      <path d="M -16 249 L -16 215 L 15 215 L 15 201 L 37 201 L 37 249 Z"/>
      <path d="M 31 249 L 31 224 L 50 224 L 50 192 L 76 192 L 76 249 Z"/>
      <path d="M 71 249 L 71 209 L 94 209 L 94 188 L 115 188 L 115 249 Z"/>
      <path d="M 790 249 L 790 211 L 815 211 L 815 188 L 838 188 L 838 249 Z"/>
      <path d="M 830 249 L 830 220 L 852 220 L 852 204 L 864 204 L 864 249 Z"/>
    </g>

    <!-- Foreground buildings create a comic-book canyon. -->
    <g id="city-left">
      <path d="M -16 330 L -16 226 L 35 226 L 35 207 L 62 207 L 62 330 Z" fill="url(#spider-building)" stroke="__BUILDING_STROKE__" stroke-width="1"/>
      <path d="M 62 330 L 62 240 L 101 240 L 101 207 L 130 207 L 130 330 Z" fill="url(#spider-building)" stroke="__BUILDING_STROKE__" stroke-width="1"/>
      <path d="M 101 207 L 115 194 L 130 207 Z" fill="#E62429" opacity=".9"/>
      <g fill="url(#spider-window)" opacity=".86">
        <animate attributeName="opacity" values=".55;.96;.55" dur="3.8s" repeatCount="indefinite"/>
        <rect x="-5" y="239" width="8" height="13"/><rect x="12" y="239" width="8" height="13"/><rect x="29" y="239" width="8" height="13"/>
        <rect x="-5" y="261" width="8" height="13"/><rect x="12" y="261" width="8" height="13"/><rect x="29" y="261" width="8" height="13"/>
        <rect x="72" y="252" width="8" height="13"/><rect x="91" y="252" width="8" height="13"/><rect x="110" y="252" width="8" height="13"/>
        <rect x="72" y="274" width="8" height="13"/><rect x="91" y="274" width="8" height="13"/><rect x="110" y="274" width="8" height="13"/>
      </g>
      <path d="M 17 225 V 217 H 29 V 225 M 108 206 V 199 H 120 V 206" fill="none" stroke="#E62429" stroke-width="2"/>
    </g>

    <g id="city-right">
      <path d="M 701 330 L 701 211 L 736 211 L 736 190 L 771 190 L 771 330 Z" fill="url(#spider-building)" stroke="__BUILDING_STROKE__" stroke-width="1"/>
      <path d="M 771 330 L 771 227 L 811 227 L 811 205 L 845 205 L 845 330 Z" fill="url(#spider-building)" stroke="__BUILDING_STROKE__" stroke-width="1"/>
      <path d="M 736 190 L 753 176 L 771 190 Z" fill="#E62429"/>
      <g fill="url(#spider-window)" opacity=".86">
        <animate attributeName="opacity" values=".55;.96;.55" dur="3.8s" repeatCount="indefinite"/>
        <rect x="713" y="226" width="8" height="13"/><rect x="731" y="226" width="8" height="13"/><rect x="750" y="226" width="8" height="13"/>
        <rect x="713" y="248" width="8" height="13"/><rect x="731" y="248" width="8" height="13"/><rect x="750" y="248" width="8" height="13"/>
        <rect x="785" y="242" width="8" height="13"/><rect x="804" y="242" width="8" height="13"/><rect x="824" y="242" width="8" height="13"/>
        <rect x="785" y="264" width="8" height="13"/><rect x="804" y="264" width="8" height="13"/><rect x="824" y="264" width="8" height="13"/>
      </g>
      <path d="M 727 210 V 201 H 738 V 210 M 815 226 V 218 H 828 V 226" fill="none" stroke="#E62429" stroke-width="2"/>
    </g>

    <!-- Rooftop aerials and a web lattice anchored to the skyline. -->
    <g fill="none" stroke="__WEB_COLOR__" stroke-width=".75" opacity=".63">
      <path d="M 35 207 L 35 186 M 29 192 L 41 192 M 31 187 L 39 197 M 39 187 L 31 197"/>
      <path d="M 753 176 L 753 161 M 747 165 L 759 165 M 749 162 L 757 169 M 757 162 L 749 169"/>
      <path d="M 126 207 Q 220 168 305 172 Q 382 178 434 216" stroke-dasharray="2 3"/>
      <path d="M 126 207 Q 254 227 350 208 Q 405 196 434 216" stroke-dasharray="2 3"/>
      <path d="M 126 207 L 350 208 M 126 207 L 305 172 M 305 172 L 434 216 M 350 208 L 434 216"/>
      <path d="M 701 211 Q 625 177 548 192 Q 505 199 460 221" stroke-dasharray="2 3"/>
    </g>

    <!-- Animated web strand; it pays off in the swinging figure below. -->
    <path d="M 753 163 Q 666 160 600 203" fill="none" stroke="__WEB_COLOR__" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="5 4">
      <animate attributeName="d" dur="5.4s" repeatCount="indefinite"
        values="M 753 163 Q 666 160 600 203;M 753 163 Q 650 174 520 226;M 753 163 Q 673 194 637 244;M 753 163 Q 666 160 600 203"/>
      <animate attributeName="stroke-dashoffset" values="0;-45" dur="2s" repeatCount="indefinite"/>
    </path>
    <g id="web-grid-flash" fill="none" stroke="__WEB_COLOR__" stroke-width=".8" opacity=".55">
      <path d="M 736 165 L 770 190 L 742 220 L 695 230 L 657 212 L 632 183" stroke-dasharray="3 5">
        <animate attributeName="stroke-dashoffset" values="0;32" dur="3.1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".12;.7;.12" dur="3.8s" repeatCount="indefinite"/>
      </path>
      <path d="M 702 174 Q 715 198 742 220 M 736 165 Q 700 188 657 212 M 770 190 Q 716 221 695 230" stroke-dasharray="2 4">
        <animate attributeName="stroke-dashoffset" values="0;-24" dur="2.7s" repeatCount="indefinite"/>
      </path>
    </g>

    <!-- Original red-and-blue masked web-slinger silhouette. -->
    <g id="swinging-web-slinger">
      <animateMotion dur="5.4s" repeatCount="indefinite" rotate="auto" path="M 600,203 C 545,155 460,164 430,210 S 355,264 309,218 S 255,181 219,207"/>
      <g stroke="#0A1B4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Back leg extended. -->
        <path d="M 0 10 Q -10 23 -22 29 L -31 25 Q -23 17 -15 7" fill="#0D57BA"/>
        <!-- Bent forward leg. -->
        <path d="M 0 9 Q 11 21 25 20 L 31 14 Q 17 9 12 0" fill="#0D57BA"/>
        <!-- Torso, angled forward. -->
        <path d="M -6 -12 Q 6 -17 12 -6 L 10 8 Q 2 14 -8 8 L -12 -2 Z" fill="url(#spider-suit-blue)"/>
        <!-- Red chest panel. -->
        <path d="M -7 -10 Q 2 -15 8 -7 L 5 2 L -6 3 L -10 -3 Z" fill="url(#spider-suit-red)"/>
        <!-- Web tracery on chest. -->
        <g fill="none" stroke="#FFB8C1" stroke-width=".55" opacity=".88">
          <path d="M -6 -9 L 5 1 M -1 -12 L 7 -2 M -9 -3 L 5 -3 M -7 0 L 4 -8"/>
          <path d="M -4 -10 Q -4 -5 -7 -2 M 1 -11 Q 0 -5 5 -1"/>
        </g>
        <!-- Near arm reaches toward the strand. -->
        <path d="M 6 -10 Q 16 -23 29 -31 L 34 -27 Q 24 -11 12 -3" fill="url(#spider-suit-red)"/>
        <!-- Far arm balances the swing. -->
        <path d="M -7 -9 Q -20 -12 -30 -4 L -34 0 Q -20 1 -7 -1" fill="#0D57BA"/>
        <!-- Mask. -->
        <path d="M -5 -21 Q -4 -35 7 -35 Q 18 -34 17 -23 L 12 -13 Q 5 -8 -1 -14 Z" fill="url(#spider-suit-red)"/>
        <!-- Mask web lines. -->
        <g fill="none" stroke="#FFB8C1" stroke-width=".6" opacity=".96">
          <path d="M 1 -33 L 3 -15 M 7 -34 L 7 -13 M 13 -32 L 11 -16 M -2 -28 L 16 -27 M -3 -23 L 15 -21 M 0 -18 L 12 -17"/>
          <path d="M 2 -33 L 14 -17 M 13 -32 L 0 -19"/>
        </g>
        <!-- Large white expressive lenses. -->
        <path d="M 0 -27 Q 5 -31 8 -26 L 6 -21 L 1 -21 Z" fill="#FFFFFF" stroke="#081A3F" stroke-width=".8"/>
        <path d="M 10 -27 Q 15 -29 15 -24 L 12 -20 L 9 -22 Z" fill="#FFFFFF" stroke="#081A3F" stroke-width=".8"/>
        <!-- Mini spider insignia: deliberately original geometry. -->
        <g transform="translate(0,-3)" fill="#081A3F" stroke="#081A3F" stroke-width=".5">
          <ellipse cx="0" cy="0" rx="1.8" ry="2.6"/>
          <path d="M -1 -1 L -5 -4 L -6 -2 L -2 1 M 1 -1 L 5 -4 L 6 -2 L 2 1 M -1 1 L -5 4 L -6 2 L -2 0 M 1 1 L 5 4 L 6 2 L 2 0 M -1 -2 L -3 -5 M 1 -2 L 3 -5"/>
        </g>
        <!-- Wrist web-shooter glint. -->
        <path d="M 30 -30 L 36 -35 M 32 -26 L 39 -27 M 30 -23 L 35 -19" fill="none" stroke="#FFFFFF" stroke-width=".9"/>
      </g>
    </g>

    <!-- Spider-sense waves and an original comic-book impact burst. -->
    <g id="spider-sense-waves" fill="none" stroke="#FBD000" stroke-width="1.6">
      <circle cx="448" cy="215" r="8" opacity=".8">
        <animate attributeName="r" values="4;24;4" dur="2.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".05;.9;.05" dur="2.4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="448" cy="215" r="15" stroke="#45A7FF" stroke-width="1.1">
        <animate attributeName="r" values="10;31;10" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".04;.62;.04" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>
    <g id="web-impact-caption" transform="rotate(-9 535 198)">
      <path d="M 501 183 L 512 188 L 511 177 L 523 186 L 535 176 L 537 189 L 551 185 L 544 199 L 556 206 L 540 207 L 535 220 L 526 210 L 513 217 L 516 203 L 501 199 Z" fill="#E62429" stroke="#FFFFFF" stroke-width="1.2">
        <animate attributeName="opacity" values=".74;1;.74" dur="1.35s" repeatCount="indefinite"/>
      </path>
      <text x="528" y="201" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="8.5" font-weight="900" fill="#FFFFFF" stroke="#10234B" stroke-width=".4">THWIP!</text>
    </g>

    <!-- Comic-style motion trails shift as the hero crosses the skyline. -->
    <g fill="none" stroke-linecap="round">
      <path d="M 490 193 L 548 179" stroke="#E62429" stroke-width="2">
        <animate attributeName="x1" values="490;470;490" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".15;.9;.15" dur="1.2s" repeatCount="indefinite"/>
      </path>
      <path d="M 505 207 L 554 197" stroke="#45A7FF" stroke-width="1.4">
        <animate attributeName="opacity" values=".08;.8;.08" dur="1.55s" repeatCount="indefinite"/>
      </path>
    </g>

    <!-- Perspective speed lines. -->
    <g fill="none" stroke="#E62429" stroke-width="1.2" opacity=".7">
      <path d="M 143 180 L 177 187"/>
      <path d="M 154 189 L 183 194"/>
      <path d="M 565 256 L 610 266"/>
      <path d="M 582 247 L 617 254"/>
    </g>

    <!-- Ground shadows and HUD. -->
    <path d="M 130 316 Q 430 307 710 316" fill="none" stroke="__GROUND_LINE__" stroke-width="1.1" opacity=".6"/>
    <g font-family="monospace" font-weight="700">
      <text x="30" y="174" font-size="7.8" fill="__HUD_TEXT__" letter-spacing=".8">SPIDER-VERSE / NEW YORK SECTOR</text>
      <text x="30" y="185" font-size="6" fill="__HUD_TEXT__" opacity=".82" letter-spacing=".55">MISSION: BUILD SOMETHING THAT MATTERS</text>
      <rect x="641" y="168" width="185" height="15" rx="2.5" fill="#101827" fill-opacity=".88" stroke="#E62429" stroke-width=".8"/>
      <text x="650" y="177.8" font-size="6.1" fill="#FFFFFF" letter-spacing=".45">FRIENDLY NEIGHBORHOOD / DEV</text>
      <text x="710" y="326" font-size="5.8" fill="__HUD_TEXT__" letter-spacing=".7">WITH GREAT CODE...</text>
      <path d="M 30 195 H 190" stroke="#E62429" stroke-width="1.3" stroke-dasharray="0 160">
        <animate attributeName="stroke-dasharray" values="0 160;160 0;0 160" dur="4.5s" repeatCount="indefinite"/>
      </path>
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
    .replaceAll("__SKY_TOP__", isDark ? "#070D1D" : "#9CDFFF")
    .replaceAll("__SKY_BOTTOM__", isDark ? "#17264D" : "#F1FAFF")
    .replaceAll("__BUILDING_A__", isDark ? "#1A2950" : "#253D74")
    .replaceAll("__BUILDING_B__", isDark ? "#050917" : "#101C3A")
    .replaceAll("__BUILDING_STROKE__", isDark ? "#35518B" : "#15274E")
    .replaceAll("__DISTANT_BUILDING__", isDark ? "#1C2A4B" : "#4F6EA1")
    .replaceAll("__WEB_COLOR__", isDark ? "#DBE8FF" : "#FFFFFF")
    .replaceAll("__DOT_COLOR__", isDark ? "#F3F6FF" : "#162B50")
    .replaceAll("__MOON_OPACITY__", isDark ? ".16" : ".92")
    .replaceAll("__HALO_OPACITY__", isDark ? ".36" : ".12")
    .replaceAll("__HUD_TEXT__", isDark ? "#FFFFFF" : "#12254A")
    .replaceAll("__GROUND_LINE__", isDark ? "#5776AF" : "#4A7CA9");

  let output = svg.replace(
    /<svg viewBox="[^"]+" width="[^"]+" height="[^"]+"/,
    '<svg viewBox="-16 -32 880 370" width="880" height="370"'
  );
  if (output === svg) {
    throw new Error("Unable to expand SVG canvas: " + file);
  }
  if (output.includes('id="spider-verse-city"')) {
    output = output.replace(/<g id="spider-verse-city"[\s\S]*?<\/g>\n?/, themedOverlay);
  } else {
    output = output.replace("</svg>", themedOverlay + "\n</svg>");
  }
  await writeFile(file, output, "utf8");
  process.stdout.write("Rendered Spider-Verse contribution scene: " + file + "\n");
}
