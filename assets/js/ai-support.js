const { useState, useEffect, useRef } = React;

const VARIANTS = {
  B: {
    name: "墨",
    bg: "#0e0c09",
    bgAlt: "#161310",
    bgDark: "#0e0c09",
    text: "#f0ebe0",
    textMuted: "#9a9080",
    textLight: "#6a6055",
    accent: "oklch(78% 0.12 75)",
    accentHover: "oklch(85% 0.10 75)",
    accentLight: "oklch(25% 0.06 75)",
    border: "#2e2a22",
    navBg: "rgba(14,12,9,0.92)",
    heroFont: "'Noto Serif JP', serif",
    bodyFont: "'Noto Sans JP', sans-serif",
    headingWeight: 500,
    sectionBg2: "#161310",
    cardBg: "#1c1814",
    footerBg: "#080705",
    footerText: "#9a9080",
  },
};

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Logo({ v, size = 44 }) {
  return (
    <a href="index.html" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
      <img
        src="assets/images/logo-en.png"
        alt="えんロゴ"
        style={{ width: size, height: size, objectFit: 'contain', filter: 'invert(1)' }}
      />
      <div>
        <div style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: size * 0.45, color: v.text, lineHeight: 1.1, letterSpacing: '0.05em' }}>株式会社えん</div>
        <div style={{ fontFamily: v.bodyFont, fontWeight: 300, fontSize: size * 0.22, color: v.textMuted, letterSpacing: '0.15em' }}>EN SOLUTIONS</div>
      </div>
    </a>
  );
}

function Nav({ v, scrolled }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const links = [
    { href: 'index.html', label: 'トップ' },
    { href: 'index.html#services', label: 'サービス' },
    { href: 'index.html#cases', label: '実績' },
    { href: 'index.html#about', label: '会社概要' },
    { href: 'index.html#news', label: 'ニュース' },
    { href: 'index.html#contact', label: 'お問い合わせ' },
  ];
  const navBg = (scrolled || (isMobile && open)) ? v.navBg : 'transparent';
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg,
      backdropFilter: (scrolled || (isMobile && open)) ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${v.border}` : 'none',
      transition: 'all 0.4s ease',
    }}>
      <div style={{
        padding: '0 clamp(20px, 5vw, 80px)',
        height: 70,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Logo v={v} size={38} />
        {isMobile ? (
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 8 }}
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: v.text, transition: 'all 0.3s', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: v.text, transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: v.text, transition: 'all 0.3s', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {links.slice(0, 5).map(l => (
              <a key={l.href} href={l.href} style={{
                fontFamily: v.bodyFont, fontSize: 13, fontWeight: 400, letterSpacing: '0.12em',
                color: v.textMuted, textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = v.text}
              onMouseLeave={e => e.target.style.color = v.textMuted}
              >{l.label}</a>
            ))}
            <a href="index.html#contact" style={{
              fontFamily: v.bodyFont, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em',
              color: v.bg, background: v.accent,
              padding: '10px 22px', textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
            >お問い合わせ</a>
          </div>
        )}
      </div>
      {isMobile && (
        <div style={{
          maxHeight: open ? 400 : 0, overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(.16,1,.3,1)',
          background: v.navBg,
          borderTop: open ? `1px solid ${v.border}` : 'none',
        }}>
          {links.map((l, i) => (
            <a key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: v.bodyFont, fontSize: 15, fontWeight: 400, letterSpacing: '0.12em',
                color: i === links.length - 1 ? v.accent : v.text,
                textDecoration: 'none',
                padding: '18px clamp(20px, 5vw, 80px)',
                borderBottom: `1px solid ${v.border}`,
              }}
            >{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function SectionLabel({ v, en, ja }) {
  return (
    <div className="reveal" style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
        <div style={{ width: 40, height: 1, background: v.accent }} />
        <span style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.25em', color: v.accent, fontWeight: 500 }}>{en}</span>
      </div>
      <h2 style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 'clamp(28px, 4vw, 44px)', color: v.text, letterSpacing: '0.04em' }}>{ja}</h2>
    </div>
  );
}

function Footer({ v }) {
  return (
    <footer style={{ background: v.footerBg, padding: '64px clamp(20px, 8vw, 140px) 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, flexWrap: 'wrap', gap: 32 }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <img src="assets/images/logo-en.png" alt="えん" style={{ width: 40, filter: 'invert(1)', opacity: 0.85 }} />
          </div>
          <div style={{ fontFamily: v.heroFont, fontWeight: 400, fontSize: 18, color: v.footerText, letterSpacing: '0.06em', marginBottom: 4 }}>株式会社えん</div>
          <div style={{ fontFamily: v.bodyFont, fontSize: 11, color: v.footerText, opacity: 0.4, letterSpacing: '0.2em' }}>EN SOLUTIONS</div>
        </div>
        <div style={{ display: 'flex', gap: 64 }}>
          <div>
            <div style={{ fontFamily: v.bodyFont, fontSize: 11, color: v.footerText, opacity: 0.4, letterSpacing: '0.2em', marginBottom: 16 }}>SERVICES</div>
            {['Web サイト制作', 'アプリ開発', 'DX コンサル', 'AI・DX支援'].map(l => (
              <div key={l} style={{ fontFamily: v.bodyFont, fontSize: 13, color: v.footerText, opacity: 0.6, marginBottom: 10, letterSpacing: '0.06em' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: v.bodyFont, fontSize: 11, color: v.footerText, opacity: 0.4, letterSpacing: '0.2em', marginBottom: 16 }}>COMPANY</div>
            {[
              { label: '会社概要', href: 'index.html#about' },
              { label: '実績', href: 'index.html#cases' },
              { label: 'ニュース', href: 'index.html#news' },
              { label: 'お問い合わせ', href: 'index.html#contact' },
              { label: 'プライバシーポリシー', href: 'privacy.html' },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ display: 'block', fontFamily: v.bodyFont, fontSize: 13, color: v.footerText, opacity: 0.6, marginBottom: 10, letterSpacing: '0.06em', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.target.style.opacity = '1'}
                onMouseLeave={e => e.target.style.opacity = '0.6'}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${v.footerText}20`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: v.bodyFont, fontSize: 11, color: v.footerText, opacity: 0.3, letterSpacing: '0.15em' }}>© 2025 株式会社えん. All rights reserved.</span>
        <span style={{ fontFamily: v.bodyFont, fontSize: 11, color: v.footerText, opacity: 0.3, letterSpacing: '0.1em' }}>鳥取県鳥取市</span>
      </div>
    </footer>
  );
}

function App() {
  const v = VARIANTS.B;
  return (
    <div style={{ background: v.bg, color: v.text, minHeight: '100vh' }}>
      <Nav v={v} scrolled={false} />
      <Footer v={v} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
