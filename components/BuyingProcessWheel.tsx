'use client';

import { useState, useRef, useEffect } from 'react';

const CX = 300, CY = 300;
const OUTER_R = 272, INNER_R = 115;
const GAP = 1.8;
const R_MID = (OUTER_R + INNER_R) / 2; // ~193

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

export default function BuyingProcessWheel() {
  const [active, setActive] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const segFromXY = (clientX: number, clientY: number): number | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scale = 600 / rect.width;
    const dx = (clientX - rect.left) * scale - CX;
    const dy = (clientY - rect.top) * scale - CY;
    const r = Math.hypot(dx, dy);
    if (r < INNER_R || r > OUTER_R) return null;
    let deg = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    if (deg < 0) deg += 360;
    return Math.floor(deg / 30) % 12;
  };

  // Non-passive touchmove so the wheel doesn't scroll the page
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      setActive(segFromXY(t.clientX, t.clientY));
    };
    svg.addEventListener('touchmove', onMove, { passive: false });
    return () => svg.removeEventListener('touchmove', onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="w-full h-auto"
        style={{
          filter: 'drop-shadow(0 10px 32px rgba(0,0,0,0.22))',
          userSelect: 'none',
          touchAction: 'none',
        }}
        onTouchStart={e => {
          const t = e.touches[0];
          touchStart.current = { x: t.clientX, y: t.clientY };
          setActive(segFromXY(t.clientX, t.clientY));
        }}
        onTouchEnd={e => {
          const t = e.changedTouches[0];
          const ts = touchStart.current;
          if (ts && active !== null && Math.hypot(t.clientX - ts.x, t.clientY - ts.y) < 12) {
            scrollTo(steps[active].id);
          }
          setActive(null);
          touchStart.current = null;
        }}
      >
        {steps.map((step, i) => {
          const midDeg = i * 30 + 15;
          const midPt  = polar(R_MID, midDeg);
          const isOn   = active === i;

          // Rotate the local text frame so the x-axis reads radially outward.
          // Flip bottom-half segments 180° so text isn't upside-down.
          const textAngle = midDeg <= 180 ? midDeg - 90 : midDeg + 90;

          const fill = isOn ? HOV[i % 4] : BASE[i % 4];

          return (
            <g
              key={step.id}
              onClick={() => scrollTo(step.id)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
              style={{
                // Scale from wheel center for the "pop out" hover effect
                transform: isOn
                  ? `translate(${CX}px,${CY}px) scale(1.22) translate(-${CX}px,-${CY}px)`
                  : 'none',
                transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                filter: isOn
                  ? 'drop-shadow(0 0 16px rgba(255,255,255,0.5)) drop-shadow(0 4px 14px rgba(0,0,0,0.3))'
                  : 'none',
              }}
            >
              <path
                d={segPath(i)}
                fill={fill}
                style={{ transition: 'fill 0.2s ease' }}
              />

              {/*
                Local text frame:
                  translate to segment midpoint, then rotate so x-axis = radial outward.
                  Inside this frame:
                    • x positions move text radially (+ = outward for top half)
                    • y positions move text tangentially (stacking lines)
                  The three items are stacked tangentially at y = -13, 0, +13.
              */}
              <g
                transform={`translate(${midPt.x} ${midPt.y}) rotate(${textAngle})`}
                style={{ pointerEvents: 'none' }}
              >
                {/* Step number */}
                <text
                  x="0" y="-14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isOn ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.45)'}
                  fontSize="13"
                  fontWeight="900"
                  fontFamily="Georgia, serif"
                  style={{ transition: 'fill 0.2s' }}
                >
                  {i + 1}
                </text>

                {/* Label line 1 */}
                <text
                  x="0" y="1"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isOn ? '#111' : 'white'}
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="Georgia, serif"
                  style={{ transition: 'fill 0.2s' }}
                >
                  {step.line1}
                </text>

                {/* Label line 2 */}
                <text
                  x="0" y="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isOn ? '#222' : 'rgba(255,255,255,0.85)'}
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="Georgia, serif"
                  style={{ transition: 'fill 0.2s' }}
                >
                  {step.line2}
                </text>
              </g>
            </g>
          );
        })}

        {/* Center circle */}
        <circle cx={CX} cy={CY} r={INNER_R - 7} fill="white" />
        <circle
          cx={CX} cy={CY} r={INNER_R - 7}
          fill="none" stroke="#6B1A2A" strokeWidth="1.5"
          strokeDasharray="5 5" opacity="0.2"
        />
        <text x={CX} y={CY - 20} textAnchor="middle" fontSize="32">🏡</text>
        <text
          x={CX} y={CY + 10}
          textAnchor="middle" fontSize="9.5" fontWeight="bold"
          fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="1"
        >
          CONGRATULATIONS!
        </text>
        <text x={CX} y={CY + 25} textAnchor="middle" fontSize="8" fill="#555" fontFamily="sans-serif">
          You are a new homeowner!
        </text>

        {/* START label */}
        <text
          x={CX} y={14}
          textAnchor="middle" fontSize="10" fontWeight="bold"
          fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="2"
        >
          START ▼
        </text>
      </svg>
    </div>
  );
}
