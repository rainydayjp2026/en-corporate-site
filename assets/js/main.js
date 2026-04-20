const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "B",
  "heroStyle": "center"
}/*EDITMODE-END*/;

const VARIANTS = {
  A: {
    name: "和モダン",
    bg: "#faf8f3",
    bgAlt: "#f3efe6",
    bgDark: "#1e1a14",
    text: "#1a1612",
    textMuted: "#7a7068",
    textLight: "#b8b0a5",
    accent: "oklch(40% 0.12 28)",
    accentHover: "oklch(33% 0.14 28)",
    accentLight: "oklch(92% 0.04 60)",
    border: "#e2ddd5",
    navBg: "rgba(250,248,243,0.92)",
    heroFont: "'Noto Serif JP', serif",
    bodyFont: "'Noto Sans JP', sans-serif",
    headingWeight: 600,
    sectionBg2: "#f3efe6",
    cardBg: "#ffffff",
    footerBg: "#1e1a14",
    footerText: "#f3efe6",
    tag: "地域密着・温もり",
  },
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
    tag: "ドラマチック・プレミアム",
  },
  C: {
    name: "清白",
    bg: "#ffffff",
    bgAlt: "#f7f5f2",
    bgDark: "#1a1a1a",
    text: "#1a1a1a",
    textMuted: "#6b6b6b",
    textLight: "#aaaaaa",
    accent: "oklch(58% 0.15 48)",
    accentHover: "oklch(50% 0.15 48)",
    accentLight: "oklch(95% 0.05 75)",
    border: "#e8e5e0",
    navBg: "rgba(255,255,255,0.95)",
    heroFont: "'Noto Sans JP', sans-serif",
    bodyFont: "'Noto Sans JP', sans-serif",
    headingWeight: 700,
    sectionBg2: "#f7f5f2",
    cardBg: "#ffffff",
    footerBg: "#1a1a1a",
    footerText: "#f7f5f2",
    tag: "クリーン・モダン",
  },
};

const SERVICES = [
  {
    no: "01",
    title: "Web サイト制作",
    sub: "Website",
    desc: "貴社の強みと想いが伝わる、オーダーメイドのWebサイトを制作します。SEO・スマートフォン対応はもちろん、更新しやすい管理画面まで一貫してサポート。",
    points: ["ランディングページ", "コーポレートサイト", "EC・予約サイト"],
  },
  {
    no: "02",
    title: "アプリ開発",
    sub: "App Development",
    desc: "業務の課題を解決するオリジナルアプリを開発。社内ツールから顧客向けサービスまで、現場の声に寄り添いながら丁寧に設計・実装します。",
    points: ["業務効率化ツール", "顧客管理・予約アプリ", "QR決済・電子チケット"],
  },
  {
    no: "03",
    title: "DX コンサルティング",
    sub: "DX Consulting",
    desc: "「デジタル化したいけど何から始めれば…」そんなお悩みに、専任担当が伴走しながら対応。鳥取の実情を知る私たちが、地に足の着いたDXをご提案します。",
    points: ["現状分析・課題整理", "ツール選定・導入支援", "社内研修・定着化"],
  },
];

const CASES = [
  { tag: "Web制作", title: "臨時駐車場 QR 決済システム", client: "地域イベント主催者様", desc: "繁忙期・イベント時に活用できる臨時駐車場向けのQRコード決済システムを構築。オーナーと利用者をスムーズにつなぎ、現金レス・省人化を実現。" },
  { tag: "アプリ開発", title: "ホテル予約代替アプリ", client: "ホテルオーナー様", desc: "FAXで行っていたホテルの予約をLINEとwebから管理するグループアプリ。" },
  { tag: "DXコンサル", title: "AIによるカスタマイズ管理導入", client: "建設業様", desc: "ばらばらだったファイル名のフォーマットをフォルダにドロップするだけでその会社専用のフォーマットに整形するなど、可能な限り手作業を減らして自動化。" },
];

const FAQS = [
  { q: "どのくらいの費用がかかりますか？", a: "規模・内容によって大きく異なります。まずは無料相談にてご要望をお聞きし、お見積もりをご提示します。小規模なWebサイトであれば数十万円〜対応可能です。" },
  { q: "鳥取県外の企業でも依頼できますか？", a: "もちろんご対応可能です。オンラインでのお打ち合わせを基本としており、全国各地のお客様とお取引実績があります。" },
  { q: "ITに詳しくなくても相談できますか？", a: "はい、むしろそういったお客様を中心に支援しています。専門用語を使わず、わかりやすく丁寧にご説明します。" },
  { q: "制作後のサポートはありますか？", a: "保守・運用サポートプランをご用意しています。更新作業の代行や、不具合対応なども月次契約でお任せいただけます。" },
  { q: "相談から納品までどのくらいかかりますか？", a: "Webサイトで1〜2ヶ月、アプリ開発は内容により3〜6ヶ月が目安です。お急ぎの場合はご相談ください。" },
];

const NEWS = [
  { date: "2026.04.01", tag: "お知らせ", title: "株式会社えん 公式サイトをリニューアルしました" },
  { date: "2026.02.10", tag: "お知らせ", title: "DXコンサルティングサービスの提供を開始しました" },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

// Intersection Observer hook
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

function Logo({ v, size = 44, invert = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img
        src="assets/images/logo-en.png"
        alt="えんロゴ"
        style={{
          width: size, height: size, objectFit: 'contain',
          filter: (v.bg.startsWith('#0') || v.bg.startsWith('#1')) ? 'invert(1)' : 'none',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div>
        <div style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: size * 0.45, color: v.text, lineHeight: 1.1, letterSpacing: '0.05em' }}>株式会社えん</div>
        <div style={{ fontFamily: v.bodyFont, fontWeight: 300, fontSize: size * 0.22, color: v.textMuted, letterSpacing: '0.15em' }}>EN SOLUTIONS</div>
      </div>
    </div>
  );
}

function Nav({ v, scrolled }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const links = [
    { href: '#services', label: 'サービス' },
    { href: '#cases', label: '実績' },
    { href: '#about', label: '会社概要' },
    { href: '#news', label: 'ニュース' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'お問い合わせ' },
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
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 5, padding: 8,
            }}
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
            <a href="#contact" style={{
              fontFamily: v.bodyFont, fontSize: 12, fontWeight: 500, letterSpacing: '0.12em',
              color: v.bg, background: v.accent,
              padding: '10px 22px', borderRadius: 2, textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
            >お問い合わせ</a>
          </div>
        )}
      </div>
      {/* Mobile menu drawer */}
      {isMobile && (
        <div style={{
          maxHeight: open ? 400 : 0,
          overflow: 'hidden',
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

function Hero({ v }) {
  return (
    <section style={{
      minHeight: '100vh',
      background: v.bg,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      padding: '120px clamp(20px, 8vw, 140px) 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG texture lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: v.bg.startsWith('#0') || v.bg.startsWith('#1') ? 0.04 : 0.035,
        backgroundImage: `repeating-linear-gradient(90deg, ${v.text} 0, ${v.text} 1px, transparent 0, transparent 80px)`,
      }} />

      {/* Background logo */}
      <div style={{
        position: 'absolute',
        top: '42%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(400px, 70vw, 900px)',
        height: 'clamp(400px, 70vw, 900px)',
        pointerEvents: 'none',
        animation: 'ensoSpin 2s cubic-bezier(.16,1,.3,1) both',
        zIndex: 0,
      }}>
        <img
          src="assets/images/logo-en.png"
          alt=""
          style={{
            width: '100%', height: '100%', objectFit: 'contain',
            filter: (v.bg.startsWith('#0') || v.bg.startsWith('#1')) ? 'invert(1)' : 'none',
            opacity: 0.07,
          }}
        />
      </div>

      <div style={{ maxWidth: 900, width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Main headline */}
        <h1 style={{
          fontFamily: v.heroFont, fontWeight: v.headingWeight,
          fontSize: 'clamp(42px, 8vw, 96px)',
          color: v.text, lineHeight: 1.15, letterSpacing: '0.04em',
          animation: 'heroSlideUp 1s 0.3s cubic-bezier(.16,1,.3,1) both',
          marginBottom: 24,
        }}>
          地域に、<br />えんを結ぶ。
        </h1>

        {/* Accent line */}
        <div style={{
          width: 60, height: 2, background: v.accent,
          margin: '0 auto 32px',
          animation: 'lineDraw 0.8s 1s cubic-bezier(.16,1,.3,1) both',
          transformOrigin: 'left',
        }} />

        <p style={{
          fontFamily: v.bodyFont, fontWeight: 300,
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: v.textMuted, lineHeight: 2, letterSpacing: '0.08em',
          animation: 'heroSlideUp 1s 0.5s cubic-bezier(.16,1,.3,1) both',
          marginBottom: 52,
          maxWidth: 600, margin: '0 auto 52px',
        }}>
          鳥取から始まる、地域のデジタル変革。<br />
          Web制作・アプリ開発・DX支援で、<br />
          中小企業の「次の一手」を一緒に考えます。
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'heroFade 0.8s 0.9s both',
        }}>
          <a href="#services" style={{
            fontFamily: v.bodyFont, fontSize: 14, fontWeight: 500, letterSpacing: '0.12em',
            color: v.bg, background: v.accent,
            padding: '16px 40px', borderRadius: 2, textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.85'}
          onMouseLeave={e => e.target.style.opacity = '1'}
          >サービスを見る</a>
          <a href="#contact" style={{
            fontFamily: v.bodyFont, fontSize: 14, fontWeight: 400, letterSpacing: '0.12em',
            color: v.text, background: 'transparent',
            border: `1px solid ${v.border}`,
            padding: '16px 40px', borderRadius: 2, textDecoration: 'none',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => e.target.style.borderColor = v.text}
          onMouseLeave={e => e.target.style.borderColor = v.border}
          >無料相談はこちら</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'heroFade 1s 1.5s both',
      }}>
        <span style={{ fontFamily: v.bodyFont, fontSize: 10, letterSpacing: '0.25em', color: v.textLight }}>SCROLL</span>
        <div style={{
          width: 1, height: 48, background: `linear-gradient(to bottom, ${v.textLight}, transparent)`,
        }} />
      </div>
    </section>
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

function Services({ v }) {
  return (
    <section id="services" style={{ background: v.bg, padding: '120px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="SERVICES" ja="サービス紹介" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
        {SERVICES.map((s, i) => (
          <div key={s.no} className={`reveal reveal-delay-${i+1}`} style={{
            background: v.cardBg,
            border: `1px solid ${v.border}`,
            padding: '48px 40px',
            position: 'relative', overflow: 'hidden',
            cursor: 'default',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${v.text}10`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              position: 'absolute', top: 32, right: 32,
              fontFamily: v.heroFont, fontWeight: 300, fontSize: 72, color: v.border, lineHeight: 1,
              pointerEvents: 'none',
            }}>{s.no}</div>
            <div style={{ fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.25em', color: v.accent, marginBottom: 16 }}>{s.sub}</div>
            <h3 style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 24, color: v.text, marginBottom: 24, letterSpacing: '0.04em' }}>{s.title}</h3>
            <div style={{ width: 32, height: 1, background: v.accent, marginBottom: 24 }} />
            <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2, letterSpacing: '0.05em', marginBottom: 28 }}>{s.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {s.points.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: v.accent, flexShrink: 0 }} />
                  <span style={{ fontFamily: v.bodyFont, fontSize: 13, color: v.textMuted, letterSpacing: '0.05em' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cases({ v }) {
  return (
    <section id="cases" style={{ background: v.sectionBg2, padding: '120px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="CASES" ja="導入事例・実績" />
      <div style={{ display: 'grid', gap: 1 }}>
        {CASES.map((c, i) => (
          <div key={c.title} className={`reveal reveal-delay-${i+1}`} style={{
            background: v.cardBg,
            border: `1px solid ${v.border}`,
            padding: '40px 48px',
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40, alignItems: 'start',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <div>
              <div style={{
                display: 'inline-block',
                fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.15em', fontWeight: 500,
                color: v.accent, border: `1px solid ${v.accent}`,
                padding: '4px 12px', marginBottom: 16,
              }}>{c.tag}</div>
              <div style={{ fontFamily: v.bodyFont, fontSize: 12, color: v.textLight, letterSpacing: '0.1em' }}>{c.client}</div>
            </div>
            <div>
              <h3 style={{ fontFamily: v.heroFont, fontWeight: v.headingWeight, fontSize: 20, color: v.text, marginBottom: 16, letterSpacing: '0.04em' }}>{c.title}</h3>
              <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 1.9, letterSpacing: '0.05em' }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About({ v }) {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{ background: v.bg, padding: '120px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="ABOUT" ja="会社概要" />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'center' }}>
        {/* Left: Story */}
        <div className="reveal">
          <p style={{
            fontFamily: v.heroFont, fontWeight: 400,
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            color: v.text, lineHeight: 1.9, letterSpacing: '0.06em', marginBottom: 32,
          }}>
            「地域に根ざした、<br />小さくてもいい仕事を。」
          </p>
          <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2.2, letterSpacing: '0.06em', marginBottom: 20 }}>
            株式会社えんは、鳥取を拠点に地域の中小企業・個人事業主のデジタル化を支援しています。
          </p>
          <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2.2, letterSpacing: '0.06em' }}>
            「えん（縁）」という社名には、人と人、企業と技術、地域と未来をつなぐ存在でありたいという想いが込められています。難しいことを難しいまま押しつけるのではなく、お客様の言葉で、お客様のペースで、一緒に歩んでいきます。
          </p>
        </div>
        {/* Right: Info table */}
        <div className="reveal reveal-delay-2">
          {[
            ['社名', '株式会社えん'],
            ['設立', '2024年'],
            ['所在地', '鳥取県鳥取市'],
            ['事業内容', 'Web制作 / アプリ開発 / DXコンサルティング'],
            ['対応エリア', '鳥取県・全国（オンライン対応可）'],
          ].map(([k, val]) => (
            <div key={k} style={{
              display: 'grid', gridTemplateColumns: '100px 1fr',
              borderBottom: `1px solid ${v.border}`,
              padding: '18px 0',
            }}>
              <span style={{ fontFamily: v.bodyFont, fontSize: 12, color: v.textLight, letterSpacing: '0.1em', paddingTop: 2 }}>{k}</span>
              <span style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.text, lineHeight: 1.7, letterSpacing: '0.06em' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ v }) {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ background: v.sectionBg2, padding: '120px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="FAQ" ja="よくあるご質問" />
      <div style={{ maxWidth: 760 }}>
        {FAQS.map((f, i) => (
          <div key={i} className={`reveal reveal-delay-${i > 3 ? 4 : i+1}`} style={{
            borderBottom: `1px solid ${v.border}`,
          }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 0', gap: 20,
              }}
            >
              <span style={{
                fontFamily: v.bodyFont, fontSize: 15, fontWeight: 500, color: v.text,
                letterSpacing: '0.05em', textAlign: 'left', lineHeight: 1.6,
              }}>Q. {f.q}</span>
              <span style={{
                fontFamily: v.bodyFont, fontSize: 20, color: v.accent,
                flexShrink: 0, transition: 'transform 0.3s',
                transform: open === i ? 'rotate(45deg)' : 'none',
              }}>+</span>
            </button>
            <div style={{
              maxHeight: open === i ? 200 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.4s cubic-bezier(.16,1,.3,1)',
            }}>
              <p style={{
                fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted,
                lineHeight: 2, letterSpacing: '0.06em',
                padding: '0 0 28px 0',
              }}>A. {f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function News({ v }) {
  return (
    <section id="news" style={{ background: v.bg, padding: '120px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="NEWS" ja="ニュース・お知らせ" />
      <div style={{ maxWidth: 760 }}>
        {NEWS.map((n, i) => (
          <div key={i} className={`reveal reveal-delay-${i+1}`} style={{
            display: 'flex', gap: 24, alignItems: 'flex-start',
            borderBottom: `1px solid ${v.border}`,
            padding: '24px 0',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <span style={{ fontFamily: v.bodyFont, fontSize: 12, color: v.textLight, letterSpacing: '0.1em', flexShrink: 0, paddingTop: 2 }}>{n.date}</span>
            <div style={{
              fontFamily: v.bodyFont, fontSize: 11, letterSpacing: '0.15em', fontWeight: 500,
              color: v.accent, border: `1px solid ${v.accent}`,
              padding: '3px 10px', flexShrink: 0,
            }}>{n.tag}</div>
            <span style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.text, lineHeight: 1.7, letterSpacing: '0.05em' }}>{n.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ v }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const inputStyle = {
    fontFamily: v.bodyFont, fontSize: 14, color: v.text,
    background: v.cardBg, border: `1px solid ${v.border}`,
    padding: '14px 16px', width: '100%', outline: 'none', letterSpacing: '0.05em',
    borderRadius: 0, lineHeight: 1.6,
    transition: 'border-color 0.2s',
  };

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '8b4a1ec3-b2b6-4e42-b112-61d6402b490f',
          subject: '【えん】お問い合わせが届きました',
          from_name: '株式会社えん 公式サイト',
          name: form.name,
          company: form.company,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" style={{ background: v.sectionBg2, padding: '120px clamp(20px, 8vw, 140px)' }}>
      <SectionLabel v={v} en="CONTACT" ja="お問い合わせ" />
      <div style={{ maxWidth: 640 }}>
        <p className="reveal" style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2, letterSpacing: '0.06em', marginBottom: 48 }}>
          ご相談・お見積もりはすべて無料です。お気軽にお問い合わせください。<br />
          通常2営業日以内にご返信いたします。
        </p>
        {status === 'sent' ? (
          <div className="reveal" style={{
            padding: '48px 40px', border: `1px solid ${v.accent}`, textAlign: 'center',
          }}>
            <div style={{ fontFamily: v.heroFont, fontSize: 24, color: v.text, marginBottom: 16 }}>送信が完了しました</div>
            <p style={{ fontFamily: v.bodyFont, fontSize: 14, color: v.textMuted, lineHeight: 2 }}>お問い合わせありがとうございます。<br />担当者より追ってご連絡いたします。</p>
          </div>
        ) : (
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[['お名前 *', 'name', 'text'], ['会社名', 'company', 'text'], ['メールアドレス *', 'email', 'email']].map(([label, key, type]) => (
              <div key={key}>
                <label style={{ fontFamily: v.bodyFont, fontSize: 12, color: v.textMuted, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>{label}</label>
                <input
                  type={type} value={form[key]}
                  onChange={e => setForm({...form, [key]: e.target.value})}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = v.accent}
                  onBlur={e => e.target.style.borderColor = v.border}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: v.bodyFont, fontSize: 12, color: v.textMuted, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>お問い合わせ内容 *</label>
              <textarea
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                rows={6}
                style={{...inputStyle, resize: 'vertical'}}
                onFocus={e => e.target.style.borderColor = v.accent}
                onBlur={e => e.target.style.borderColor = v.border}
              />
            </div>
            {status === 'error' && (
              <p style={{ fontFamily: v.bodyFont, fontSize: 13, color: 'oklch(65% 0.18 25)', letterSpacing: '0.06em' }}>
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              style={{
                fontFamily: v.bodyFont, fontSize: 14, fontWeight: 500, letterSpacing: '0.15em',
                color: v.bg, background: v.accent,
                border: 'none', padding: '18px 48px', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
                opacity: status === 'sending' ? 0.6 : 1,
              }}
              onMouseEnter={e => { if (status !== 'sending') e.target.style.opacity = '0.85'; }}
              onMouseLeave={e => { if (status !== 'sending') e.target.style.opacity = '1'; }}
            >{status === 'sending' ? '送信中…' : '送　信'}</button>
          </div>
        )}
      </div>
    </section>
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
            {['Web サイト制作', 'アプリ開発', 'DX コンサル'].map(l => (
              <div key={l} style={{ fontFamily: v.bodyFont, fontSize: 13, color: v.footerText, opacity: 0.6, marginBottom: 10, letterSpacing: '0.06em' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: v.bodyFont, fontSize: 11, color: v.footerText, opacity: 0.4, letterSpacing: '0.2em', marginBottom: 16 }}>COMPANY</div>
            {[
              { label: '会社概要', href: '#about' },
              { label: '実績', href: '#cases' },
              { label: 'ニュース', href: '#news' },
              { label: 'お問い合わせ', href: '#contact' },
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

function TweaksPanel({ tweaks, setTweaks, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: '#ffffff', border: '1px solid #e0e0e0',
      borderRadius: 12, padding: 24, minWidth: 240,
      boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: '#999', marginBottom: 20 }}>TWEAKS</div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 500 }}>デザインバリアント</div>
        {Object.entries(VARIANTS).map(([key, val]) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
            <input
              type="radio" name="variant"
              checked={tweaks.variant === key}
              onChange={() => {
                setTweaks({...tweaks, variant: key});
                window.parent.postMessage({type: '__edit_mode_set_keys', edits: {variant: key}}, '*');
              }}
              style={{ accentColor: '#666' }}
            />
            <span style={{ fontSize: 13, color: '#333' }}>
              <strong>{key}</strong> — {val.name}
              <span style={{ fontSize: 11, color: '#999', marginLeft: 6 }}>{val.tag}</span>
            </span>
          </label>
        ))}
      </div>

      <div>
        <div style={{ fontSize: 12, color: '#666', marginBottom: 10, fontWeight: 500 }}>Heroスタイル</div>
        {[['center', 'センター揃え'], ['left', '左揃え（力強い）']].map(([val, label]) => (
          <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
            <input
              type="radio" name="heroStyle"
              checked={tweaks.heroStyle === val}
              onChange={() => {
                setTweaks({...tweaks, heroStyle: val});
                window.parent.postMessage({type: '__edit_mode_set_keys', edits: {heroStyle: val}}, '*');
              }}
              style={{ accentColor: '#666' }}
            />
            <span style={{ fontSize: 13, color: '#333' }}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [tweaks, setTweaks] = useState(() => {
    try {
      const saved = localStorage.getItem('en-solutions-tweaks');
      return saved ? {...TWEAK_DEFAULTS, ...JSON.parse(saved)} : TWEAK_DEFAULTS;
    } catch { return TWEAK_DEFAULTS; }
  });
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const v = VARIANTS[tweaks.variant] || VARIANTS.A;

  useReveal();

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({type: '__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('en-solutions-tweaks', JSON.stringify(tweaks));
    // Re-run reveal for new content
    setTimeout(() => {
      const els = document.querySelectorAll('.reveal');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.12 });
      els.forEach(el => obs.observe(el));
    }, 50);
  }, [tweaks]);

  return (
    <div style={{ background: v.bg, color: v.text, minHeight: '100vh', transition: 'background 0.5s ease, color 0.5s ease', position: 'relative' }}>
      {/* Washi texture overlay — variant B only */}
      {tweaks.variant === 'B' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='washi'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72 0.54' numOctaves='5' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23washi)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '320px 320px',
          opacity: 0.045,
          mixBlendMode: 'screen',
        }} />
      )}
      <Nav v={v} scrolled={scrolled} />
      <Hero v={v} heroStyle={tweaks.heroStyle} />
      <Services v={v} />
      <Cases v={v} />
      <About v={v} />
      <FAQ v={v} />
      <News v={v} />
      <Contact v={v} />
      <Footer v={v} />
      <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} visible={tweaksVisible} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
