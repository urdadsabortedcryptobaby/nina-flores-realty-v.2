import Image from 'next/image';
import Link from 'next/link';
import { Home, Mic, Shirt, Gem, Cake } from 'lucide-react';
import StarField from './StarField';

type LinkItem = {
  label: string;
  sublabel: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; strokeWidth?: number | string }>;
  external: boolean;
  comingSoon?: boolean;
};

const LINKS: LinkItem[] = [
  {
    label: 'Nina Flores Realty',
    sublabel: 'Tucson real estate — buy, sell, invest',
    href: '/',
    icon: Home,
    external: false,
  },
  {
    label: 'El Tucsonan Podcast',
    sublabel: 'Stories & voices from Tucson',
    href: 'https://eltucsonan.com/',
    icon: Mic,
    external: true,
  },
  {
    label: 'Coyote Flower Thrift',
    sublabel: 'Curated vintage & thrift on Depop',
    href: 'https://www.depop.com/coyoteflowerthrift/',
    icon: Shirt,
    external: true,
  },
  {
    label: 'Jewelry Mail Club',
    sublabel: 'Handmade jewelry, delivered — AngelMade',
    href: 'https://www.shopangelmade.com/',
    icon: Gem,
    external: true,
  },
  {
    label: 'Coyote Flower Cake Pops',
    sublabel: 'Coming soon',
    href: '#',
    icon: Cake,
    external: false,
    comingSoon: true,
  },
];

export default function LinksPage() {
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #14061f 0%, #23093c 28%, #3a1163 58%, #4c1a7d 82%, #2b0b47 100%)',
        fontFamily: 'var(--font-body)',
        padding: '3rem 1.25rem 4rem',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .links-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
        }
        .links-btn:active { transform: translateY(-1px); }

        /* ---- night sky ---- */
        .sky {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.5;
        }
        .nebula--one {
          top: -12%; left: -18%;
          width: 60vw; height: 60vw; max-width: 520px; max-height: 520px;
          background: radial-gradient(circle, rgba(167,88,224,0.42) 0%, rgba(167,88,224,0) 70%);
        }
        .nebula--two {
          bottom: -14%; right: -16%;
          width: 65vw; height: 65vw; max-width: 560px; max-height: 560px;
          background: radial-gradient(circle, rgba(96,64,201,0.40) 0%, rgba(96,64,201,0) 70%);
        }

        .layer { position: absolute; inset: -6%; }
        .layer--far  { animation: driftFar 72s ease-in-out infinite alternate; }
        .layer--near { animation: driftNear 48s ease-in-out infinite alternate; }

        .star {
          position: absolute;
          border-radius: 50%;
          background: #fdfbff;
          opacity: var(--dim, 0.3);
          animation-name: twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        .star--bright { box-shadow: 0 0 6px 1px rgba(226,200,255,0.75); }

        .sparkle {
          position: absolute;
          fill: #f3e6ff;
          filter: drop-shadow(0 0 6px rgba(216,180,254,0.9));
          animation-name: sparklePulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .moon {
          position: absolute;
          border-radius: 50%;
          background: transparent;
        }
        .moon--large {
          top: 6%; right: 8%;
          width: 62px; height: 62px;
          box-shadow: inset -17px 7px 0 1px #f7ecd2;
          filter: drop-shadow(0 0 12px rgba(247,236,210,0.55));
          animation: moonFloat 16s ease-in-out infinite alternate;
        }
        .moon--small {
          bottom: 12%; left: 7%;
          width: 30px; height: 30px;
          box-shadow: inset -9px 4px 0 1px rgba(247,236,210,0.85);
          filter: drop-shadow(0 0 8px rgba(247,236,210,0.45));
          animation: moonFloat 12s ease-in-out infinite alternate-reverse;
        }

        .shooting {
          position: absolute;
          left: -14%;
          transform-origin: left center;
        }
        .shooting__streak {
          display: block;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(233,213,255,0.85) 60%, #ffffff 100%);
          filter: drop-shadow(0 0 6px rgba(216,180,254,0.95));
          opacity: 0;
          animation-name: shoot;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes twinkle {
          from { opacity: var(--dim, 0.25); }
          to   { opacity: 1; }
        }
        @keyframes sparklePulse {
          0%, 100% { opacity: 0.25; transform: scale(0.75) rotate(0deg); }
          50%      { opacity: 1;    transform: scale(1.1) rotate(45deg); }
        }
        @keyframes driftFar {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(16px, -22px, 0); }
        }
        @keyframes driftNear {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-26px, 16px, 0); }
        }
        @keyframes moonFloat {
          from { transform: translateY(0) rotate(-6deg); }
          to   { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes shoot {
          0%   { transform: translateX(0) scaleX(0.2); opacity: 0; }
          2%   { opacity: 1; }
          14%  { transform: translateX(128vw) scaleX(1); opacity: 0; }
          100% { transform: translateX(128vw) scaleX(1); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .layer--far, .layer--near, .star, .sparkle, .moon, .shooting__streak {
            animation: none !important;
          }
          .star { opacity: 0.75; }
          .sparkle { opacity: 0.85; }
          .shooting { display: none; }
        }
      `}</style>

      <StarField />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480 }}>
        {/* Profile */}
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              width: 128,
              height: 128,
              margin: '0 auto 1.25rem',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--color-gold)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
            }}
          >
            <Image
              src="/nina-flores.jpg"
              alt="Nina Flores"
              width={128}
              height={128}
              priority
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-white)',
              fontSize: '2rem',
              fontWeight: 700,
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            Nina Flores
          </h1>
          <p
            className="font-script"
            style={{
              color: 'var(--color-gold-light)',
              fontSize: '1.25rem',
              margin: '0.35rem 0 0',
            }}
          >
            Tucson, Arizona
          </p>
        </header>

        {/* Links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {LINKS.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <span
                  aria-hidden
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'var(--color-cream-dark)',
                    color: 'var(--color-maroon)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--color-charcoal)',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-mid)', lineHeight: 1.3 }}>
                    {item.sublabel}
                  </span>
                </span>
              </>
            );

            const baseStyle: React.CSSProperties = {
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.9rem 1.1rem',
              borderRadius: 16,
              background: 'var(--color-cream)',
              boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
              textDecoration: 'none',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            };

            if (item.comingSoon) {
              return (
                <div
                  key={item.label}
                  style={{ ...baseStyle, opacity: 0.7, cursor: 'default' }}
                  aria-disabled
                >
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="links-btn"
                style={baseStyle}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: 'rgba(245,239,230,0.65)', fontSize: '0.8rem', margin: 0 }}>
            © {new Date().getFullYear()} Nina Flores
          </p>
        </footer>
      </div>
    </main>
  );
}
