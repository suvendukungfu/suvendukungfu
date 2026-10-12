#!/usr/bin/env python3
"""Spider-Verse arena scene generator (original art, no external assets, no JS).
Usage: python3 generate_spiderverse_arena.py [out.svg]
Pure CSS animation inside an <img>-safe SVG, so it works in a GitHub README.
"""
import math
import random
import sys

W, H = 1200, 320
RED, BLUE, INK, GOLD = "#E62429", "#1687E8", "#0a0f1f", "#ffd23f"

# Pendulum swing: multiple arcs, high web anchors, and a THWIP burst per hop.
L, A_DEG, HOPS, HOP_T, STEPS = 175, 45, 6, 1.5, 28
AY, X0 = -20, -140
TOTAL = HOPS * HOP_T
DX = 2 * L * math.sin(math.radians(A_DEG))


def layer(seed, hmin, hmax, wmin, wmax, fill, dens, pitch, win_op, rooftop, edge):
    rnd = random.Random(seed)
    out, x = [], 0
    while x < W:
        w = rnd.randint(wmin, wmax)
        if x + w > W - wmin:
            w = W - x
        h = rnd.randint(hmin, hmax)
        y = H - h
        out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h + 2}" fill="{fill}"/>')
        if edge:
            out.append(f'<rect x="{x}" y="{y}" width="{w}" height="1.2" fill="{BLUE}" opacity=".35"/>')
        if rnd.random() < 0.45 and w > 36:
            cw = int(w * rnd.uniform(0.4, 0.7))
            ch = rnd.randint(8, 18)
            out.append(f'<rect x="{x + (w - cw) // 2}" y="{y - ch}" width="{cw}" height="{ch + 1}" fill="{fill}"/>')
        if rooftop and rnd.random() < 0.35:
            ax = x + w // 2
            ah = rnd.randint(14, 28)
            out.append(f'<path d="M{ax} {y} v-{ah}" stroke="{fill}" stroke-width="1.6"/>')
            out.append(f'<circle class="bl" cx="{ax}" cy="{y - ah}" r="1.8" fill="{RED}"/>')
        px, py = pitch
        cols, rows = (w - 10) // px, (h - 16) // py
        for r in range(rows):
            for col in range(cols):
                if rnd.random() < dens:
                    color_class = rnd.choices(["wy", "wc", "wr"], [6, 3, 1])[0]
                    flicker = f" f{rnd.randint(1, 4)}" if rnd.random() < 0.2 else ""
                    out.append(
                        f'<rect class="{color_class}{flicker}" x="{x + 6 + col * px}" y="{y + 10 + r * py}" '
                        f'width="4" height="5" opacity="{win_op}"/>'
                    )
        x += w
    return "".join(out)


def scroller(cls, items):
    return f'<g class="sc {cls}"><g>{items}</g><g transform="translate({W} 0)">{items}</g></g>'


def hero(animated):
    legs = (
        '<g class="lg1"><path d="M-3 48 L-9 67" stroke="{r}" stroke-width="5" stroke-linecap="round"/>'
        '<path d="M-9 67 l-3 4" stroke="{b}" stroke-width="5" stroke-linecap="round"/></g>'
        '<g class="lg2"><path d="M3 48 L8 64" stroke="{r}" stroke-width="5" stroke-linecap="round"/>'
        '<path d="M8 64 l3 4" stroke="{b}" stroke-width="5" stroke-linecap="round"/></g>'
    ).format(r=RED, b=BLUE)
    if not animated:
        legs = legs.replace('class="lg1"', "").replace('class="lg2"', "")
    arm2 = f'<g class="{"am" if animated else ""}"><path d="M-6 30 L-14 42" stroke="{RED}" stroke-width="4.5" stroke-linecap="round"/></g>'
    tingle = "".join(
        f'<path class="{"ting" if animated else ""}" d="M{13 * math.cos(math.radians(a)):.1f} {22 - 13 * math.sin(math.radians(a)):.1f} '
        f'L{19 * math.cos(math.radians(a)):.1f} {22 - 19 * math.sin(math.radians(a)):.1f}" '
        f'stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".0"/>'
        for a in (35, 60, 90, 120, 145)
    ) if animated else ""
    return (
        f'<path d="M6 30 L0 2" stroke="{RED}" stroke-width="4.5" stroke-linecap="round"/>'
        f'<circle cx="0" cy="0" r="3.4" fill="{RED}" stroke="{INK}" stroke-width=".8"/>'
        + legs
        + arm2
        + f'<ellipse cx="0" cy="38" rx="8.8" ry="14" fill="{BLUE}"/>'
        f'<path d="M-8.4 30 Q0 43 8.4 30" stroke="#0b3f73" stroke-width=".8" fill="none"/>'
        f'<path d="M0 25 V50 M-6 31 Q0 36 6 31 M-8 38 Q0 43 8 38" stroke="#0b3f73" stroke-width=".7" fill="none"/>'
        f'<rect x="-8.4" y="46" width="16.8" height="4" rx="2" fill="{RED}"/>'
        + f'<circle cx="0" cy="22" r="8.6" fill="{RED}"/>'
        f'<path d="M0 13.5 V30.5 M-8 18 Q0 21 8 18 M-8.4 25 Q0 28 8.4 25" stroke="#7a0f14" stroke-width=".7" fill="none"/>'
        f'<polygon points="-7.6,19.4 -1.2,21.9 -2.3,25.2 -7.9,22.6" fill="#fff" stroke="{INK}" stroke-width=".9"/>'
        f'<polygon points="7.6,19.4 1.2,21.9 2.3,25.2 7.9,22.6" fill="#fff" stroke="{INK}" stroke-width=".9"/>'
        + tingle
    )


def pct(p):
    return f"{max(p, 0):.4f}%"


web_kf, hero_kf, burst_defs, burst_css = [], [], [], []
for hop in range(HOPS):
    xs = X0 + hop * DX
    ax = xs + L * math.sin(math.radians(A_DEG))
    for step in range(STEPS + 1):
        u = step / STEPS
        p = (hop + u) / HOPS * 100 - (0.0006 if step == STEPS else 0)
        th = A_DEG * math.sin(math.pi * (u - 0.5))
        hx = ax + L * math.sin(math.radians(th))
        hy = AY + L * math.cos(math.radians(th))
        lean = 14 * math.sin(2 * math.pi * u)
        hero_kf.append(f"{pct(p)}{{transform:translate({hx:.1f}px,{hy:.1f}px) rotate({lean:.1f}deg)}}")
        web_kf.append(
            f"{pct(p)}{{transform:translate({ax:.1f}px,{AY}px) rotate({-th:.2f}deg);opacity:{0 if step == 0 else 1}}}"
        )
    p0 = hop / HOPS * 100
    bx, by = xs + 62, 78 + (hop % 2) * 22
    stops = []
    if p0 > 0.02:
        stops.append(f"0%,{pct(p0 - 0.01)}{{opacity:0;transform:scale(.3) rotate(-10deg)}}")
    stops += [
        f"{pct(p0)}{{opacity:1;transform:scale(1.2) rotate(-5deg)}}",
        f"{pct(p0 + 1.4)}{{opacity:1;transform:scale(1) rotate(-5deg)}}",
        f"{pct(p0 + 5.5)}{{opacity:1;transform:scale(1) rotate(-5deg)}}",
        f"{pct(p0 + 7)}{{opacity:0;transform:scale(1.08) rotate(-5deg)}}",
        "100%{opacity:0}",
    ]
    burst_css.append(f"@keyframes bu{hop}{{{''.join(stops)}}}.bu{hop}{{animation:bu{hop} {TOTAL}s linear infinite;opacity:0}}")
    star = " ".join(
        f"{(34 if i % 2 == 0 else 20) * math.cos(math.pi * i / 8):.1f},{(34 if i % 2 == 0 else 20) * math.sin(math.pi * i / 8):.1f}"
        for i in range(16)
    )
    burst_defs.append(
        f'<g transform="translate({bx:.0f} {by})"><g class="bu{hop}">'
        f'<polygon points="{star}" fill="{GOLD}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>'
        f'<text x="0" y="5" text-anchor="middle" font-size="14" font-weight="700" fill="{RED}" '
        f'stroke="{INK}" stroke-width=".6">THWIP!</text></g></g>'
    )


rnd = random.Random(11)
stars = "".join(
    f'<circle class="tw t{rnd.randint(1, 3)}" cx="{rnd.randint(8, W - 8)}" cy="{rnd.randint(6, 170)}" '
    f'r="{rnd.choice([0.7, 0.9, 1.2])}" fill="#fff"/>'
    for _ in range(55)
)
far = layer(3, 70, 150, 40, 80, "#152249", 0.06, (9, 12), 0.5, False, False)
mid = layer(5, 95, 195, 50, 90, "#0f1a3d", 0.13, (10, 13), 0.65, False, False)
near = layer(9, 110, 230, 56, 104, "#080d1f", 0.24, (10, 13), 0.95, True, True)

CSS = f"""
text{{font-family:'Share Tech Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}}
.wy{{fill:#ffd166}}.wc{{fill:#7fd8ff}}.wr{{fill:#ff8fa3}}
.sc{{animation:scroll linear infinite}}
.far{{animation-duration:95s}}.mid{{animation-duration:58s}}.near{{animation-duration:34s}}
@keyframes scroll{{to{{transform:translateX(-{W}px)}}}}
.tw{{animation:tw 3s ease-in-out infinite}}.t2{{animation-duration:4.3s;animation-delay:-1s}}.t3{{animation-duration:2.2s;animation-delay:-.6s}}
@keyframes tw{{0%,100%{{opacity:.2}}50%{{opacity:1}}}}
.f1,.f2,.f3,.f4{{animation:fl 5s linear infinite}}
.f2{{animation-duration:6.3s;animation-delay:-2s}}.f3{{animation-duration:7.7s;animation-delay:-4s}}.f4{{animation-duration:4.1s;animation-delay:-1s}}
@keyframes fl{{0%,44%,56%,100%{{opacity:1}}48%,52%{{opacity:.08}}}}
.bl{{animation:bl 1.6s steps(1,end) infinite}}
@keyframes bl{{0%{{opacity:1}}50%{{opacity:.1}}}}
.glow{{animation:br 6s ease-in-out infinite alternate}}
@keyframes br{{from{{opacity:.5}}to{{opacity:.95}}}}
.cloud{{animation:drift 70s linear infinite}}.c2{{animation-duration:95s;animation-delay:-40s}}
@keyframes drift{{from{{transform:translateX(-320px)}}to{{transform:translateX({W + 320}px)}}}}
.scan{{animation:scan 7s linear infinite}}
@keyframes scan{{from{{transform:translateY(-24px)}}to{{transform:translateY({H + 10}px)}}}}
.rig{{animation:path {TOTAL}s linear infinite}}
.g1{{animation-delay:-.07s}}.g2{{animation-delay:-.14s}}.g3{{animation-delay:-.21s}}
@keyframes path{{{''.join(hero_kf)}}}
.web{{animation:webk {TOTAL}s linear infinite}}
@keyframes webk{{{''.join(web_kf)}}}
.lg1{{transform-origin:-3px 48px;animation:kick .75s ease-in-out infinite alternate}}
.lg2{{transform-origin:3px 48px;animation:kick .75s ease-in-out infinite alternate-reverse}}
@keyframes kick{{from{{transform:rotate(-16deg)}}to{{transform:rotate(16deg)}}}}
.am{{transform-origin:-6px 30px;animation:kick .75s ease-in-out infinite alternate}}
.ting{{animation:ting 1.5s ease-in-out infinite}}
@keyframes ting{{0%,100%{{opacity:0}}50%{{opacity:.95}}}}
.pulse{{animation:bl 1.2s steps(1,end) infinite}}
{''.join(burst_css)}
@media (prefers-reduced-motion:reduce){{*{{animation:none!important}}.rig{{transform:translate(600px,120px)}}.web{{opacity:0}}.g1,.g2,.g3,.bu0,.bu1,.bu2,.bu3,.bu4,.bu5{{display:none}}}}
"""

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="t d">
<title id="t">Spider-Verse night patrol</title>
<desc id="d">An original red-and-blue wall-crawler swings between web anchors above a parallax comic-book city with a moon, twinkling windows, and a spider-sense HUD.</desc>
<style>{CSS}</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04061a"/><stop offset=".55" stop-color="#121a45"/><stop offset="1" stop-color="#2d1b52"/></linearGradient>
  <radialGradient id="moonG"><stop offset="0" stop-color="#cfe0ff" stop-opacity=".55"/><stop offset="1" stop-color="#cfe0ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="hz" cx=".5" cy="1" r=".7"><stop offset="0" stop-color="{RED}" stop-opacity=".45"/><stop offset="1" stop-color="{RED}" stop-opacity="0"/></radialGradient>
  <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d1b52" stop-opacity="0"/><stop offset="1" stop-color="#2d1b52" stop-opacity=".7"/></linearGradient>
  <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{RED}"/><stop offset=".5" stop-color="{BLUE}"/><stop offset="1" stop-color="{RED}"/></linearGradient>
  <linearGradient id="fadeV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
  <mask id="ht"><rect y="150" width="{W}" height="170" fill="url(#fadeV)"/></mask>
  <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3.5" cy="3.5" r="1.25" fill="{RED}"/></pattern>
  <linearGradient id="scanG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{BLUE}" stop-opacity="0"/><stop offset=".5" stop-color="{BLUE}" stop-opacity=".16"/><stop offset="1" stop-color="{BLUE}" stop-opacity="0"/></linearGradient>
  <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
  <filter id="gl" filterUnits="userSpaceOnUse" x="-8" y="-4" width="16" height="{L + 8}"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <g id="hs">{hero(False)}</g>
</defs>

<rect width="{W}" height="{H}" fill="url(#sky)"/>
<rect width="{W}" height="{H}" fill="url(#hz)"/>
{stars}

<g class="glow"><circle cx="1010" cy="64" r="96" fill="url(#moonG)"/></g>
<circle cx="1010" cy="64" r="30" fill="#f4f1de"/>
<circle cx="999" cy="55" r="6" fill="#d9d4bd"/><circle cx="1021" cy="72" r="8" fill="#d9d4bd"/><circle cx="1013" cy="48" r="3.5" fill="#d9d4bd"/>

<g class="cloud"><ellipse cx="0" cy="92" rx="140" ry="9" fill="#8aa4ff" opacity=".07"/><ellipse cx="60" cy="100" rx="90" ry="6" fill="#8aa4ff" opacity=".06"/></g>
<g class="cloud c2"><ellipse cx="0" cy="48" rx="110" ry="7" fill="#b9a4ff" opacity=".06"/></g>

{scroller("far", far)}
{scroller("mid", mid)}
<rect y="150" width="{W}" height="170" fill="url(#dots)" opacity=".22" mask="url(#ht)"/>
{scroller("near", near)}
<rect y="225" width="{W}" height="95" fill="url(#fog)"/>
<rect y="304" width="{W}" height="16" fill="url(#neon)" opacity=".22"/>

<g class="web"><rect x="-.7" y="0" width="1.4" height="{L}" fill="#f5f8ff" filter="url(#gl)"/></g>
<g class="rig g3" opacity=".08"><g transform="scale(1.3)"><use href="#hs"/></g></g>
<g class="rig g2" opacity=".16"><g transform="scale(1.3)"><use href="#hs"/></g></g>
<g class="rig g1" opacity=".3"><g transform="scale(1.3)"><use href="#hs"/></g></g>
<g class="rig"><g transform="scale(1.3)">{hero(True)}</g></g>

{''.join(burst_defs)}

<rect class="scan" width="{W}" height="24" fill="url(#scanG)"/>
<rect width="{W}" height="{H}" fill="url(#vig)"/>

<g>
  <rect x="14" y="14" width="258" height="26" fill="{GOLD}" stroke="{INK}" stroke-width="2.5"/>
  <text x="24" y="32" font-size="13" font-weight="700" fill="{INK}">SECTOR 07 // NIGHT PATROL</text>
  <circle class="pulse" cx="{W - 190}" cy="{H - 24}" r="4" fill="{RED}"/>
  <text x="{W - 180}" y="{H - 19}" font-size="12" fill="#fff" opacity=".9">SPIDER-SENSE: ACTIVE</text>
  <text x="18" y="{H - 19}" font-size="12" fill="#fff" opacity=".75">STATUS: BUILDING // DEBUGGING IN PROGRESS</text>
</g>
<rect x="3" y="3" width="{W - 6}" height="{H - 6}" fill="none" stroke="{INK}" stroke-width="6"/>
<rect x="8" y="8" width="{W - 16}" height="{H - 16}" fill="none" stroke="#fff" stroke-width="1" opacity=".18"/>
</svg>
"""

out = sys.argv[1] if len(sys.argv) > 1 else "spiderverse-arena.svg"
with open(out, "w", encoding="utf-8") as f:
    f.write(svg)
print(f"wrote {out} ({len(svg) / 1024:.0f} KB)")
