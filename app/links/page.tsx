import Image from 'next/image';
import Link from 'next/link';
import { Home, Mic, Shirt, Gem, Cake } from 'lucide-react';

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
        minHeight: '100vh',
        background:
          'radial-gradient(120% 120% at 50% 0%, var(--color-maroon-light) 0%, var(--color-maroon) 45%, var(--color-maroon-dark) 100%)',
        fontFamily: 'var(--font-body)',
        padding: '3rem 1.25rem 4rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <style>{`
        .links-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.32);
        }
        .links-btn:active { transform: translateY(-1px); }
      `}</style>
      <div style={{ width: '100%', maxWidth: 480 }}>
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
