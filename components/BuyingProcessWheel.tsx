'use client';

import { useState, useRef, useEffect } from 'react';

const CX = 300, CY = 300;
const OUTER_R = 272, INNER_R = 115;
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
const HOV:  string[] = ['#E8294A', '#FFD700', '#00C9A7', '#FF6B35'];

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

// Which segment index is pointing at the top (START) given wheel rotation
function rotToIndex(rot: number): number {
  const norm = ((-rot % 360) + 360) % 360;
  return Math.floor(norm / 30) % 12;
}

// Nearest rotation that centers segment idx at the top
function snapTarget(idx: number, currentRot: number): number {
  const base = -(idx * 30 + 15);
  const n = Math.round((currentRot - base) / 360);
  return base + 360 * n;
}

export default function BuyingProcessWheel() {
  // active: which segment is highlighted (hover on desktop, landed-on on mobile)
  const [active, setActive] = useState<number | null>(null);

  const svgRef      = useRef<SVGSVGElement>(null);
  const wheelRef    = useRef<SVGGElement>(null);   // the rotating group
  const rotRef      = useRef(0);                   // current rotation degrees
  const velRef      = useRef(0);                   // angular velocity deg/frame
  const rafRef      = useRef<number | null>(null);
  const lastAngle   = useRef(0);
  const lastTime    = useRef(0);
  const isTouching  = useRef(false);

  /* ── helpers ─────────────────────────────────────────────── */

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Directly set wheel DOM rotation (avoids React re-render each frame)
  const applyRot = (r: number) => {
    rotRef.current = r;
    if (wheelRef.current) {
      wheelRef.current.setAttribute('transform', `rotate(${r} ${CX} ${CY})`);
    }
  };

  const stopAnimation = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  };

  const snapToSegment = (idx: number) => {
    const target = snapTarget(idx, rotRef.current);
    const startRot = rotRef.current;
    const startTime = performance.now();
    const duration = 400;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      applyRot(startRot + (target - startRot) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        applyRot(target);
        setActive(idx);   // trigger React state → segment highlight
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
      if (Math.abs(vel) > 0.2) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        snapToSegment(rotToIndex(rotRef.current));
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Angle (deg) of touch point relative to wheel center
  const touchAngle = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const s = 600 / rect.width;
    return Math.atan2(
      (clientY - rect.top) * s - CY,
      (clientX - rect.left) * s - CX
    ) * 180 / Math.PI;
  };

  // Register non-passive touchmove so we can prevent page scroll
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onMove = (e: TouchEvent) => {
      if (!isTouching.current) return;
      e.preventDefault();
      const t = e.touches[0];
      const angle = touchAngle(t.clientX, t.clientY);

      // Shortest-path delta (handles ±180° wrap)
      let delta = angle - lastAngle.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) velRef.current = (delta / dt) * 16; // deg per frame @60fps

      applyRot(rotRef.current + delta);
      lastAngle.current = angle;
      lastTime.current = now;
    };
    svg.addEventListener('touchmove', onMove, { passive: false });
    return () => svg.removeEventListener('touchmove', onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── render ───────────────────────────────────────────────── */

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="w-full h-auto"
        style={{ userSelect: 'none', touchAction: 'none', filter: 'drop-shadow(0 10px 32px rgba(0,0,0,0.22))' }}
        /* ── Mobile: prize-wheel spin ── */
        onTouchStart={e => {
          isTouching.current = true;
          stopAnimation();
          setActive(null);
          const t = e.touches[0];
          lastAngle.current = touchAngle(t.clientX, t.clientY);
          lastTime.current  = performance.now();
          velRef.current    = 0;
        }}
        onTouchEnd={() => {
          isTouching.current = false;
          launchMomentum();
        }}
      >
        {/* ── Pointer triangle at top (fixed, outside rotating group) ── */}
        <polygon
          points={`${CX},${OUTER_R + 18} ${CX - 10},${OUTER_R + 4} ${CX + 10},${OUTER_R + 4}`}
          fill="#6B1A2A"
          opacity="0"  /* invisible — START text serves as indicator */
        />

        {/* ══ ROTATING GROUP (mobile spin applies here) ══ */}
        <g ref={wheelRef}>
          {steps.map((step, i) => {
            const midDeg    = i * 30 + 15;
            const midPt     = polar(R_MID, midDeg);
            const isOn      = active === i;
            const anyActive = active !== null;

            // Text orientation: x-axis = radially outward, lines stack tangentially
            const textAngle = midDeg <= 180 ? midDeg - 90 : midDeg + 90;

            const fill = isOn ? HOV[i % 4] : BASE[i % 4];

            // Desktop: selected pops out, others shrink back
            // Mobile: no per-segment scaling (would conflict with wheel rotation)
            const scaleVal = anyActive
              ? (isOn ? 1.38 : 0.92)
              : 1.0;

            return (
              <g
                key={step.id}
                /* Desktop hover */
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                /* Desktop click to scroll */
                onClick={() => { if (active === i) scrollTo(step.id); else setActive(i); }}
                className="cursor-pointer"
                style={{
                  transform: `translate(${CX}px,${CY}px) scale(${scaleVal}) translate(-${CX}px,-${CY}px)`,
                  transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  filter: isOn ? 'drop-shadow(0 0 16px rgba(255,255,255,0.55)) drop-shadow(0 4px 16px rgba(0,0,0,0.35))' : 'none',
                }}
              >
                <path
                  d={segPath(i)}
                  fill={fill}
                  style={{ transition: 'fill 0.2s ease' }}
                />

                {/* Local text frame: translate to midpoint, rotate so x-axis = radial outward */}
                <g
                  transform={`translate(${midPt.x} ${midPt.y}) rotate(${textAngle})`}
                  style={{ pointerEvents: 'none' }}
                >
                  {/* Step number */}
                  <text x="0" y="-18"
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isOn ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'}
                    fontSize="17" fontWeight="900" fontFamily="Georgia, serif"
                    style={{ transition: 'fill 0.2s' }}
                  >{i + 1}</text>

                  {/* Label line 1 */}
                  <text x="0" y="1"
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isOn ? '#111' : 'white'}
                    fontSize="13.5" fontWeight="700" fontFamily="Georgia, serif"
                    style={{ transition: 'fill 0.2s' }}
                  >{step.line1}</text>

                  {/* Label line 2 */}
                  <text x="0" y="17"
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isOn ? '#222' : 'rgba(255,255,255,0.88)'}
                    fontSize="13.5" fontWeight="700" fontFamily="Georgia, serif"
                    style={{ transition: 'fill 0.2s' }}
                  >{step.line2}</text>
                </g>
              </g>
            );
          })}
        </g>
        {/* ══ END ROTATING GROUP ══ */}

        {/* Center circle — stays fixed, drawn on top */}
        <circle cx={CX} cy={CY} r={INNER_R - 7} fill="white" />
        <circle cx={CX} cy={CY} r={INNER_R - 7}
          fill="none" stroke="#6B1A2A" strokeWidth="1.5"
          strokeDasharray="5 5" opacity="0.2"
        />
        <text x={CX} y={CY - 20} textAnchor="middle" fontSize="32">🏡</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fontSize="9.5"
          fontWeight="bold" fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="1"
        >CONGRATULATIONS!</text>
        <text x={CX} y={CY + 25} textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">
          You are a new homeowner!
        </text>

        {/* START label + pointer — fixed at top */}
        <text x={CX} y={14} textAnchor="middle" fontSize="10"
          fontWeight="bold" fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="2"
        >START ▼</text>

        {/* Small fixed pointer notch at top edge of wheel */}
        <polygon
          points={`${CX - 9},${28} ${CX + 9},${28} ${CX},${42}`}
          fill="#6B1A2A" opacity="0.75"
        />
      </svg>

      {/* Mobile: tap-to-scroll button that appears after wheel stops */}
      {active !== null && (
        <button
          onClick={() => scrollTo(steps[active].id)}
          className="px-6 py-3 rounded-sm font-bold text-sm transition-opacity hover:opacity-90 md:hidden"
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
