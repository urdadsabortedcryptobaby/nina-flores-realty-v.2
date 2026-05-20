'use client';

import { useState } from 'react';

const CX = 300, CY = 300;
const OUTER_R = 268, INNER_R = 132;
const GAP = 1.8;

const steps = [
  { id: 'meet',           label: 'Meet with a REALTOR®',      short: 'Start Here' },
  { id: 'advantage',      label: "The Buyer's Advantage",     short: 'No Cost to You' },
  { id: 'preapproved',    label: 'Get Pre-Approved',          short: 'Know Your Budget' },
  { id: 'search',         label: 'Search for Homes',          short: 'The Fun Part' },
  { id: 'advanced-search',label: 'Advanced Search',           short: 'All Listings' },
  { id: 'offer',          label: 'Make an Offer',             short: 'Your Terms' },
  { id: 'negotiate',      label: 'Negotiation & Contract',    short: 'Hang In There' },
  { id: 'contract',       label: 'The Contract',              short: 'Know Your Rights' },
  { id: 'under-contract', label: 'Under Contract',            short: 'Almost There' },
  { id: 'details',        label: 'Final Details',             short: 'Due Diligence' },
  { id: 'closing-prep',   label: 'Preparing for Closing',     short: 'Final Review' },
  { id: 'closing',        label: 'Closing Day',               short: 'Get Your Keys!' },
];

const COLORS = ['#6B1A2A', '#C9A84C'];

function polar(r: number, deg: number) {
  const rad = (deg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function segPath(i: number) {
  const start = i * 30 + GAP;
  const end   = (i + 1) * 30 - GAP;
  const o1 = polar(OUTER_R, start), o2 = polar(OUTER_R, end);
  const i1 = polar(INNER_R, start), i2 = polar(INNER_R, end);
  return `M${o1.x} ${o1.y} A${OUTER_R} ${OUTER_R} 0 0 1 ${o2.x} ${o2.y} L${i2.x} ${i2.y} A${INNER_R} ${INNER_R} 0 0 0 ${i1.x} ${i1.y}Z`;
}

export default function BuyingProcessWheel() {
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel */}
      <div className="w-full max-w-sm mx-auto">
        <svg viewBox="0 0 600 600" className="w-full h-auto drop-shadow-md">
          {steps.map((step, i) => {
            const midDeg = i * 30 + 15;
            const midPt  = polar((OUTER_R + INNER_R) / 2, midDeg);
            const color  = i % 2 === 0 ? COLORS[0] : COLORS[1];
            const isHov  = hovered === i;

            // Text rotation: radial, flip bottom half to stay readable
            const textRot = midDeg <= 180 ? midDeg - 90 : midDeg + 90;

            return (
              <g
                key={step.id}
                onClick={() => scrollTo(step.id)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <path
                  d={segPath(i)}
                  fill={color}
                  opacity={isHov ? 1 : 0.82}
                  style={{ transition: 'opacity 0.15s' }}
                />
                {/* Step number */}
                <text
                  x={midPt.x}
                  y={midPt.y - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="15"
                  fontWeight="bold"
                  fontFamily="Georgia, serif"
                  transform={`rotate(${textRot} ${midPt.x} ${midPt.y})`}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Center circle */}
          <circle cx={CX} cy={CY} r={INNER_R - 6} fill="white" />
          <text x={CX} y={CY - 22} textAnchor="middle" fontSize="38">🏡</text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="1">
            CONGRATULATIONS!
          </text>
          <text x={CX} y={CY + 24} textAnchor="middle" fontSize="9" fill="#4A4A4A" fontFamily="sans-serif">
            You are a new homeowner!
          </text>

          {/* START label at top */}
          <text x={CX} y={18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6B1A2A" fontFamily="Georgia, serif" letterSpacing="2">
            START ▼
          </text>
        </svg>
      </div>

      {/* Clickable legend */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-2">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => scrollTo(step.id)}
            className="flex items-center gap-3 text-left px-3 py-2.5 rounded-sm transition-colors hover:opacity-90"
            style={{
              background: i % 2 === 0 ? 'rgba(107,26,42,0.07)' : 'rgba(201,168,76,0.1)',
              border: `1px solid ${i % 2 === 0 ? 'rgba(107,26,42,0.15)' : 'rgba(201,168,76,0.25)'}`,
            }}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: i % 2 === 0 ? COLORS[0] : COLORS[1] }}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-charcoal)' }}>
                {step.label}
              </p>
              <p className="text-xs opacity-60" style={{ fontFamily: 'var(--font-body)' }}>{step.short}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
