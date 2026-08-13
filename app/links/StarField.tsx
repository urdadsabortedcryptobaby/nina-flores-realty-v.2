/**
 * Decorative night sky for the /links page: two drifting star layers, twinkling
 * sparkles, crescent moons, and occasional shooting stars. Pure CSS animation —
 * no client JS. Star positions come from a seeded PRNG so the markup is
 * deterministic between server render and hydration.
 */

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars(count: number, seed: number, maxSize: number) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    top: +(rand() * 100).toFixed(2),
    left: +(rand() * 100).toFixed(2),
    size: +(0.9 + rand() * maxSize).toFixed(2),
    duration: +(2.2 + rand() * 4.5).toFixed(2),
    delay: +(rand() * -7).toFixed(2),
    dim: +(0.12 + rand() * 0.3).toFixed(2),
  }));
}

const FAR_STARS = makeStars(80, 20260813, 1.6);
const NEAR_STARS = makeStars(34, 77123, 2.4);

// Larger 4-point sparkles, hand-placed so they stay clear of the buttons.
const SPARKLES = [
  { top: 8, left: 12, size: 22, duration: 5.5, delay: -0.5 },
  { top: 18, left: 84, size: 16, duration: 6.5, delay: -2.4 },
  { top: 42, left: 5, size: 13, duration: 4.8, delay: -3.6 },
  { top: 63, left: 92, size: 19, duration: 7, delay: -1.2 },
  { top: 84, left: 9, size: 15, duration: 5.9, delay: -4.4 },
  { top: 94, left: 78, size: 12, duration: 6.2, delay: -2.9 },
];

const SHOOTING_STARS = [
  { top: 12, delay: 1, duration: 14, length: 150, angle: 18 },
  { top: 34, delay: 7.5, duration: 17, length: 110, angle: 14 },
  { top: 58, delay: 12, duration: 19, length: 170, angle: 22 },
  { top: 78, delay: 4.5, duration: 22, length: 120, angle: 16 },
];

export default function StarField() {
  return (
    <div className="sky" aria-hidden="true">
      {/* soft nebula glows */}
      <div className="nebula nebula--one" />
      <div className="nebula nebula--two" />

      {/* distant, slow-drifting stars */}
      <div className="layer layer--far">
        {FAR_STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              ['--dim' as string]: s.dim,
            }}
          />
        ))}
      </div>

      {/* nearer, brighter stars drifting the other way */}
      <div className="layer layer--near">
        {NEAR_STARS.map((s, i) => (
          <span
            key={i}
            className="star star--bright"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              ['--dim' as string]: s.dim,
            }}
          />
        ))}
      </div>

      {/* 4-point sparkles */}
      {SPARKLES.map((s, i) => (
        <svg
          key={i}
          className="sparkle"
          viewBox="0 0 24 24"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <path d="M12 0 L14.4 9.6 L24 12 L14.4 14.4 L12 24 L9.6 14.4 L0 12 L9.6 9.6 Z" />
        </svg>
      ))}

      {/* moons */}
      <div className="moon moon--large" />
      <div className="moon moon--small" />

      {/* shooting stars */}
      {SHOOTING_STARS.map((s, i) => (
        <span
          key={i}
          className="shooting"
          style={{ top: `${s.top}%`, transform: `rotate(${s.angle}deg)` }}
        >
          <span
            className="shooting__streak"
            style={{
              width: `${s.length}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
