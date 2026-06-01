'use client';

import { useState, useRef, useEffect } from 'react';

const CX = 300, CY = 300;
const OUTER_R = 260, INNER_R = 115;  // smaller outer radius = more breathing room
const GAP = 1.8;
const R_MID = (OUTER_R + INNER_R) / 2;

const steps = [
  { id: 'meet',            line1: 'Meet with',   line2: 'a REALTOR®'  },
  { id: 'advantage',       line1: "Buyer's",      line2: 'Advantage'   },
  { id: 'preapproved',     line1: 'Get',          line2: 'Pre-Approved'},
  { id: 'search',          line1: 'Search for',   line2: 'Homes'       },
  { id: 'advanced-search', line1: 'Advanced',     line2: 'Search'      },
  { id: 'offer',           line1: 'Make an',      line2: 'Offer'       },
  { id: 'negotiate',       line1: 'Negotiate &',  line2: 'Contract'    },
  { id: 'contract',        line1: 'The',          line2: 'Contract'    },
  { id: 'under-contract',  line1: 'Under',        line2: 'Contract'    },
  { id: 'details',         line1: 'Final',        line2: 'Details'     },
  { id: 'closing-prep',    line1: 'Prep for',     line2: 'Closing'     },
  { id: 'closing',         line1: 'Closing',      line2: 'Day 🔑'     },
];

const BASE: string[] = ['#6B1A2A', '#C9A84C', '#1A5C52', '#7C3B28'];
const HOV:  string[]  = ['#E8294A', '#FFD700', '#00C9A7', '#FF6B35'];

function polar(r: number, deg: number) {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function segPath(i: number) {
  const s = i * 30 + GAP, e = (i + 1) * 30 - GAP;
  const o1 = polar(OUTER_R, s), o2 = polar(OUTER_R, e);
  const i1 = polar(INNER_R, s), i2 = polar(INNER_R, e);
  return `M${o1.x} ${o1.y} A${OUTER_R} ${OUTER_R} 0 0 1 ${o2.x} ${o2.y} L${i2.x} ${i2.y} A${INNER_R} ${INNER_R} 0 0 0 ${i1.x} ${i1.y}Z`;
}

function rotToIndex(rot: number): number {
  const norm = ((-rot % 360) + 360) % 360;
  return Math.floor(norm / 30) % 12;
}

function snapTarget(idx: number, currentRot: number): number {
  const base = -(idx * 30 + 15);
  const n = Math.round((currentRot - base) / 360);
  return base + 360 * n;
}

export default function BuyingProcessWheel() {
  const [active, setActive] = useState<number | null>(null);

  const svgRef      = useRef<SVGSVGElement>(null);
  const wheelRef    = useRef<SVGGElement>(null);
  // Direct DOM refs to each segment's <path> for instant color updates during spin
  const pathRefs    = useRef<(SVGPathElement | null)[]>(Array(12).fill(null));
  const rotRef      = useRef(0);
  const velRef      = useRef(0);
  const rafRef      = useRef<number | null>(null);
  const lastAngle   = useRef(0);
  const lastTime    = useRef(0);
  const isTouching  = useRef(false);
  const spinHighlight = useRef<number | null>(null); // tracked during spin

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Apply wheel rotation via SVG attribute (no React re-render)
  const applyRot = (r: number) => {
    rotRef.current = r;
    wheelRef.current?.setAttribute('transform', `rotate(${r} ${CX} ${CY})`);
  };

  // Update segment colors directly in the DOM — instant, no re-render
  const updateColors = (hoveredIdx: number | null) => {
    pathRefs.current.forEach((path, i) => {
      if (!path) return;
      path.setAttribute('fill', i === hoveredIdx ? HOV[i % 4] : BASE[i % 4]);
    });
    spinHighlight.current = hoveredIdx;
  };

  const stopAnimation = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  const snapToSegment = (idx: number) => {
    const target  = snapTarget(idx, rotRef.current);
    const startRot = rotRef.current;
    const t0      = performance.now();
    const dur     = 380;

    const tick = (now: number) => {
      const t      = Math.min((now - t0) / dur, 1);
      const eased  = 1 - Math.pow(1 - t, 3);
      applyRot(startRot + (target - startRot) * eased);
      // Keep color updated during snap too
      updateColors(rotToIndex(rotRef.current));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        applyRot(target);
        updateColors(idx);
        setActive(idx);   // ← React state: triggers scale animation
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const launchMomentum = () => {
    stopAnimation();
    let vel = velRef.current;
    const friction = 0.974;

    const tick = () => {
      vel *= friction;
      applyRot(rotRef.current + vel);
      // ── Immediate color update every frame ──
      updateColors(rotToIndex(rotRef.current));

      if (Math.abs(vel) > 0.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        snapToSegment(rotToIndex(rotRef.current));
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const touchAngleDeg = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const s = 600 / rect.width;
    return Math.atan2(
      (clientY - rect.top) * s - CY,
      (clientX - rect.left) * s - CX
    ) * 180 / Math.PI;
  };

  // Non-passive touchmove to prevent page scroll while spinning
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onMove = (e: TouchEvent) => {
      if (!isTouching.current) return;
      e.preventDefault();
      const t = e.touches[0];
      const angle = touchAngleDeg(t.clientX, t.clientY);
      let delta = angle - lastAngle.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      const now = performance.now();
      const dt  = now - lastTime.current;
      if (dt > 0) velRef.current = (delta / dt) * 16;
      applyRot(rotRef.current + delta);
      // ── Immediate color highlight while dragging ──
      updateColors(rotToIndex(rotRef.current));
      lastAngle.current = angle;
      lastTime.current  = now;
    };
    svg.addEventListener('touchmove', onMove, { passive: false });
    return () => svg.removeEventListener('touchmove', onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Extra padding so scaled-up slices don't get clipped
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        overflow="visible"           // ← lets scaled segments draw outside viewBox
        className="w-full h-auto"
        style={{ userSelect: 'none', touchAction: 'none', filter: 'drop-shadow(0 10px 32px rgba(0,0,0,0.18))' }}
        onTouchStart={e => {
          isTouching.current = true;
          stopAnimation();
          setActive(null);
          updateColors(null);
          const t = e.touches[0];
          lastAngle.current = touchAngleDeg(t.clientX, t.clientY);
          lastTime.current  = performance.now();
          velRef.current    = 0;
        }}
        onTouchEnd={() => {
          isTouching.current = false;
          launchMomentum();
        }}
      >
        {/* ══ ROTATING GROUP ══ */}
        <g ref={wheelRef}>
          {steps.map((step, i) => {
            const midDeg    = i * 30 + 15;
            const midPt     = polar(R_MID, midDeg);
            const isOn      = active === i;
            const anyActive = active !== null;
            const textAngle = midDeg <= 180 ? midDeg - 90 : midDeg + 90;

            // Scale effect (desktop hover + post-spin landing)
            const scaleVal = anyActive ? (isOn ? 1.28 : 0.93) : 1.0;

            return (
              <g
                key={step.id}
                onMouseEnter={() => { setActive(i); updateColors(i); }}
                onMouseLeave={() => { setActive(null); updateColors(null); }}
                onClick={() => { if (active === i) scrollTo(step.id); else { setActive(i); updateColors(i); } }}
                className="cursor-pointer"
                style={{
                  transform: `translate(${CX}px,${CY}px) scale(${scaleVal}) translate(-${CX}px,-${CY}px)`,
                  transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                  filter: isOn
                    ? 'drop-shadow(0 0 14px rgba(255,255,255,0.5)) drop-shadow(0 4px 14px rgba(0,0,0,0.3))'
                    : 'none',
                }}
              >
                <path
                  ref={el => { pathRefs.current[i] = el; }}
                  d={segPath(i)}
                  fill={BASE[i % 4]}
                  style={{ transition: 'fill 0.15s ease' }}
                />

                <g
                  transform={`translate(${midPt.x} ${midPt.y}) rotate(${textAngle})`}
                  style={{ pointerEvents: 'none' }}
                >
                  <text x="0" y="-18"
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isOn ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'}
                    fontSize="16" fontWeight="900" fontFamily="Georgia, serif"
                    style={{ transition: 'fill 0.15s' }}
                  >{i + 1}</text>

                  <text x="0" y="1"
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isOn ? '#111' : 'white'}
                    fontSize="13" fontWeight="700" fontFamily="Georgia, serif"
                    style={{ transition: 'fill 0.15s' }}
                  >{step.line1}</text>

                  <text x="0" y="17"
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isOn ? '#222' : 'rgba(255,255,255,0.88)'}
                    fontSize="13" fontWeight="700" fontFamily="Georgia, serif"
                    style={{ transition: 'fill 0.15s' }}
                  >{step.line2}</text>
                </g>
              </g>
            );
          })}
        </g>
        {/* ══ END ROTATING GROUP ══ */}

        {/* Center — fixed on top */}
        <circle cx={CX} cy={CY} r={INNER_R - 7} fill="white" />
        <circle cx={CX} cy={CY} r={INNER_R - 7}
          fill="none" stroke="#6B1A2A" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.2" />
        <text x={CX} y={CY - 20} textAnchor="middle" fontSize="32">🏡</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fontSize="9.5"
          fontWeight="bold" fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="1"
        >CONGRATULATIONS!</text>
        <text x={CX} y={CY + 25} textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">
          You are a new homeowner!
        </text>

        {/* Fixed pointer at top */}
        <text x={CX} y={22} textAnchor="middle" fontSize="10"
          fontWeight="bold" fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="2"
        >START ▼</text>
        <polygon
          points={`${CX - 8},${36} ${CX + 8},${36} ${CX},${48}`}
          fill="#6B1A2A" opacity="0.7"
        />
      </svg>

      {/* Mobile: tap-to-scroll button after wheel lands */}
      {active !== null && (
        <button
          onClick={() => scrollTo(steps[active].id)}
          className="px-6 py-3 rounded-sm font-bold text-sm md:hidden"
          style={{
            background: HOV[active % 4],
            color: '#111',
            fontFamily: 'var(--font-body)',
          }}
        >
          Step {active + 1}: {steps[active].line1} {steps[active].line2} — Read More ↓
        </button>
      )}
    </div>
  );
}
