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

// ---- コンテンツデータ ----
const AI_CASES = [
  {
    no: '01',
    title: '請求書・見積書の自動リネーム',
    desc: 'ファイル名のばらつきを、OCR＋AIで自動的に統一。何千件あっても「ミスして修正」がなくなります。',
    before: '2026-12-01_見積書.pdf\n26_12-02_お見積書02.pdf\n\n→ 一覧したときに並びが崩れ、打ち直しが発生',
    after: '2026-12-02_見積書_02.pdf\n\n→ 誰が操作しても同じ命名ルールに自動統一',
  },
  {
    no: '02',
    title: 'kintoneで作業工程を一元管理',
    desc: 'サーバー・NAS・パソコンにバラバラだった工程情報をkintoneに集約。OCR＋AIで前処理し、人によるブレを軽減。',
    before: 'サーバー / NAS / パソコンに分散\n\n→ 送付・確認・修正の手間が多い',
    after: '受領 → OCR → 確認 → 進行管理を一か所に\n\n→ 作業のブレを大幅に削減',
  },
];

// ---- セクション ----
function AiHero({ v }) {
  return (
    <section style={{
      minHeight: '80vh',
      background: v.bg,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '160px clamp(20px, 8vw, 140px) 100px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: `repeating-linear-gradient(90deg, ${v.text} 0, ${v.text} 1px, transparent 0, transparent 80px)`,
      }} />
      <div className="reveal" style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
        <div style={{ fontFamily: v.bodyFont, fontSize: 12, letterSpacing: '0.3em', color: v.accent, marginBottom: 24 }}>AI SUPPORT</div>
        <h1 style={{
          fontFamily: v.heroFont, fontWeight: v.headingWeight,
          fontSize: 'clamp(36px, 6vw, 72px)',
          color: v.text, lineHeight: 1.3, letterSpacing: '0.03em', marginBottom: 32,
        }}>
          紙業務を、<br />AIで変える。
        </h1>
        <p style={{ fontFamily: v.bodyFont, fontSize: 15, color: v.textMuted, lineHeight: 2.2, letterSpacing: '0.06em', marginBottom: 48, maxWidth: 560 }}>
          鳥取法人会でのセミナー登壇実績をもとに、えんが現場目線でAI-OCR導入を支援します。抽象論ではなく、御社の業務から逆算した実践的なアプローチです。
        </p>
        <a href="index.html#contact"
          style={{
            display: 'inline-block',
            fontFamily: v.bodyFont, fontSize: 13, fontWeight: 500, letterSpacing: '0.15em',
            color: v.bg, background: v.accent,
            padding: '16px 40px', textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >まずは無料相談</a>
      </div>
    </section>
  );
}

function PainPoints({ v }) {
  const pains = [
    'ファイル名がバラバラで管理できない',
    '紙・FAX・PDFの処理に毎回手間がかかる',
    'DXを進めたいが、何から始めればいいか分からない',
    '人手不足で、繰り返し作業に時間を取られている',
  ];
  return (
    <section style={{ background: v.sectionBg2, padding: '100px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="PAIN POINTS" ja="こんな悩みはありませんか？" />
      <div style={{ display: 'grid', gap: 2 }}>
        {pains.map((p, i) => (
          <div key={p} className={`reveal reveal-delay-${i + 1}`} style={{
            background: v.cardBg, border: `1px solid ${v.border}`,
            padding: '28px 40px',
            display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <div style={{
              width: 36, height: 36, border: `1px solid ${v.accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: v.bodyFont, fontSize: 12, color: v.accent, letterSpacing: '0.1em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <p style={{ fontFamily: v.bodyFont, fontSize: 15, color: v.text, letterSpacing: '0.06em', lineHeight: 1.7 }}>{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Approach({ v }) {
  const steps = [
    { no: '01', title: '読み取り', desc: '紙・PDF・FAXなどあらゆる文書をOCRでデータ化。手書きも対応します。' },
    { no: '02', title: '意味づけ', desc: 'AIが内容を理解し、分類・命名・抽出を自動で行います。' },
    { no: '03', title: '自動処理', desc: 'ファイル整理・kintone連携など、そのまま使えるデータとして活用できる状態に。' },
  ];
  return (
    <section style={{ background: v.bg, padding: '100px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="OUR APPROACH" ja="えんのアプローチ" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
        {steps.map((s, i) => (
          <div key={s.no} className={`reveal reveal-delay-${i + 1}`} style={{
            background: v.cardBg, border: `1px solid ${v.border}`, padding: '48px 40px', position: 'relative',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ position: 'absolute', top: 32, right: 32, fontFamily: v.heroFont, fontWeight: 300, fontSize: 72, color: v.border, lineHeight: 1, pointerEvents: 'none' }}>{s.no}</div>
            <h3 style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 22, color: v.text, marginBottom: 20, letterSpacing: '0.04em' }}>{s.title}</h3>
            <div style={{ width: 32, height: 1, background: v.accent, marginBottom: 20 }} />
            <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2, letterSpacing: '0.05em' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AiCases({ v }) {
  const isMobile = useIsMobile();
  return (
    <section style={{ background: v.sectionBg2, padding: '100px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="CASES" ja="弊社活用事例" />
      <div style={{ display: 'grid', gap: 80 }}>
        {AI_CASES.map((c, i) => (
          <div key={c.no} className={`reveal reveal-delay-${i + 1}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.25em', color: v.accent }}>CASE {c.no}</div>
            </div>
            <h3 style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 24, color: v.text, marginBottom: 16, letterSpacing: '0.04em' }}>{c.title}</h3>
            <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2, letterSpacing: '0.05em', marginBottom: 32 }}>{c.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>
              <div style={{ background: v.cardBg, border: `1px solid ${v.border}`, padding: '32px 36px' }}>
                <div style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.2em', color: v.textLight, marginBottom: 16 }}>BEFORE</div>
                <pre style={{ fontFamily: v.bodyFont, fontSize: 13, color: v.textMuted, lineHeight: 2, whiteSpace: 'pre-wrap', margin: 0 }}>{c.before}</pre>
              </div>
              <div style={{ background: v.cardBg, border: `1px solid ${v.accent}60`, padding: '32px 36px' }}>
                <div style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.2em', color: v.accent, marginBottom: 16 }}>AFTER</div>
                <pre style={{ fontFamily: v.bodyFont, fontSize: 13, color: v.text, lineHeight: 2, whiteSpace: 'pre-wrap', margin: 0 }}>{c.after}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cost({ v }) {
  return (
    <section style={{ background: v.bg, padding: '100px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="COST" ja="費用の考え方" />
      <div className="reveal" style={{ maxWidth: 720 }}>
        <p style={{ fontFamily: v.bodyFont, fontSize: 15, color: v.textMuted, lineHeight: 2.4, letterSpacing: '0.06em', marginBottom: 40 }}>
          最新モデルが常に最適とは限りません。AIのモデルによってコストは大きく変わるため、必要なところに必要最低限のコストで導入することをえんは大切にしています。
        </p>
        <div style={{ border: `1px solid ${v.accent}40`, padding: '32px 40px', background: v.cardBg }}>
          <div style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.25em', color: v.accent, marginBottom: 16 }}>OUR STANCE</div>
          <p style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 20, color: v.text, lineHeight: 1.7, letterSpacing: '0.04em' }}>
            「目的に合う構成を選ぶ」——それがえんの考え方です。
          </p>
        </div>
        {/* モデル別費用感プレースホルダー */}
      </div>
    </section>
  );
}

function AiCta({ v }) {
  return (
    <section style={{ background: v.sectionBg2, padding: '100px clamp(20px, 8vw, 140px)', textAlign: 'center' }}>
      <div className="reveal">
        <div style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.3em', color: v.accent, marginBottom: 24 }}>CONTACT</div>
        <h2 style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 'clamp(28px, 4vw, 44px)', color: v.text, letterSpacing: '0.04em', marginBottom: 24 }}>
          まず話を聞いてみる
        </h2>
        <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2, letterSpacing: '0.06em', marginBottom: 48 }}>
          「えん」では最初の導入部分をお手伝いできます。<br />
          ゼロから仕組みを作るのが難しい場合でも、伴走します。
        </p>
        <a href="index.html#contact"
          style={{
            display: 'inline-block',
            fontFamily: v.bodyFont, fontSize: 13, fontWeight: 500, letterSpacing: '0.15em',
            color: v.bg, background: v.accent,
            padding: '18px 56px', textDecoration: 'none', transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >無料相談はこちら →</a>
      </div>
    </section>
  );
}

// ---- App ----
function App() {
  const v = VARIANTS.B;
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ background: v.bg, color: v.text, minHeight: '100vh' }}>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='washi'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72 0.54' numOctaves='5' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23washi)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '320px 320px',
        opacity: 0.045,
        mixBlendMode: 'screen',
      }} />
      <Nav v={v} scrolled={scrolled} />
      <AiHero v={v} />
      <PainPoints v={v} />
      <Approach v={v} />
      <AiCases v={v} />
      <Cost v={v} />
      <AiCta v={v} />
      <Footer v={v} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
