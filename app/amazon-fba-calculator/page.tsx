"use client";

import { useState, useEffect } from "react";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is an Amazon FBA Calculator?",
    a: "An Amazon FBA Calculator helps sellers estimate the total costs of selling on Amazon using the Fulfillment by Amazon program. By inputting your sale price, cost of goods, referral fee percentage, and FBA fulfillment fees, it instantly shows your net profit, total platform fees, profit margin, and return on investment (ROI).",
  },
  {
    q: "What are the primary Amazon FBA fees I need to plan for?",
    a: "The two main fees are Referral Fees and FBA Fees. Referral Fees are a percentage of your item's gross sale price (usually 8% to 15% depending on the category). FBA Fees are flat fees charged per unit sold to cover picking, packing, shipping, handling, and customer service based on the item's weight and dimensions.",
  },
  {
    q: "How are Amazon profit margins and ROI calculated?",
    a: "Net profit is your product's Sale Price minus Product Cost, Referral Fees, and FBA Fees. Profit Margin is calculated as (Net Profit ÷ Sale Price) × 100. Return on Investment (ROI) is calculated as (Net Profit ÷ Product Cost) × 100, showing how much money you make back relative to what you spent sourcing the stock.",
  },
  {
    q: "What is a good profit margin and ROI for Amazon FBA sellers?",
    a: "A healthy Amazon FBA profit margin is between 20% and 30%. For ROI, many professional sellers aim for a minimum of 100% (doubling their sourcing investment per unit) to absorb storage overheads, advertising spend (PPC), and potential customer returns.",
  },
  {
    q: "Are warehouse storage fees included in the baseline FBA fee?",
    a: "No, fulfillment fees cover the picking, packing, and outbound shipping operations. Monthly inventory storage fees, long-term storage fees, and disposal fees are calculated separately by Amazon based on your total cubic footage volume inside their distribution centers.",
  },
];

export default function AmazonFBACalculator() {
  // ─── SCHEMAS ───────────────────────────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Amazon FBA Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Amazon FBA Calculator",
    description:
      "Free Amazon FBA calculator. Enter your sale price, product cost, referral fees, and fulfillment fees to instantly calculate net profit, profit margin, fees, and seller ROI. Updated for 2025.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: "https://sellerprofittoolkit.com/amazon-fba-calculator",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yoursite.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Amazon FBA Calculator",
        item: "https://yoursite.com/amazon-fba-calculator",
      },
    ],
  };

  // ─── STATE ─────────────────────────────────────────────────────────────────
  const [salePrice, setSalePrice] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [referralPercent, setReferralPercent] = useState<string>("15");
  const [fbaFee, setFbaFee] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [result, setResult] = useState({
    referralFee: 0,
    totalFees: 0,
    profit: 0,
    margin: 0,
    roi: 0,
  });

  useEffect(() => {
    const sale = parseFloat(salePrice) || 0;
    const cost = parseFloat(productCost) || 0;
    const refPct = parseFloat(referralPercent) || 0;
    const fba = parseFloat(fbaFee) || 0;

    const referralFee = sale * (refPct / 100);
    const totalFees = referralFee + fba;
    const profit = sale - cost - totalFees;
    
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;

    setResult({
      referralFee,
      totalFees,
      profit,
      margin,
      roi,
    });
  }, [salePrice, productCost, referralPercent, fbaFee]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const hasInput = parseFloat(salePrice) > 0 || parseFloat(productCost) > 0;

  const exampleBtn: React.CSSProperties = {
    border: "1.5px solid #c7c2d4",
    borderRadius: 999,
    padding: "8px 16px",
    background: "white",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    color: "#2d2b3d",
    transition: "all 0.15s",
  };

  const quickExamples = [
    { label: "📦 Home Product", sale: "30", cost: "10", ref: "15", fba: "5" },
    { label: "🎧 Electronics",  sale: "80", cost: "40", ref: "15", fba: "8" },
    { label: "🧴 Beauty",       sale: "25", cost: "7",  ref: "15", fba: "4" },
  ];

  // ─── SELLER TOOLS ──────────────────────────────────────────────────────────
  const sellerTools = [
    { label: "Etsy Fee Calculator",      icon: "📊", current: false },
    { label: "Etsy Profit Calculator",   icon: "📈", current: false },
    { label: "Etsy Pricing Calculator",  icon: "🏷️", current: false },
    { label: "Amazon FBA Calculator",     icon: "📦", current: true  },
  ];

  return (
    <main className="min-h-screen bg-[#f5f4f0] font-['Sora',sans-serif]">
      {/* ── JSON-LD SCHEMAS ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --ink: #1a1a2e;
          --emerald: #155f48;
          --violet: #6d28d9;
          --rust: #c94b1a;
          --text-secondary: #374151;
        }

        * { box-sizing: border-box; }

        /* HERO */
        .hero-bg {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%);
          position: relative; overflow: hidden;
        }
        .hero-bg::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(124,58,237,0.25) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(37,99,235,0.2) 0%, transparent 50%);
        }
        .hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* CARD */
        .card {
          background: white; border-radius: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.06);
        }

        /* INPUTS */
        .input-field {
          width: 100%; padding: 14px 16px 14px 44px;
          border: 2px solid #d4d0e8; border-radius: 14px;
          font-size: 17px; font-family: 'DM Mono', monospace; font-weight: 500;
          color: var(--ink); background: #fafaf8; transition: all 0.2s; outline: none;
          -moz-appearance: textfield;
        }
        .input-field-percent {
          padding-left: 16px; padding-right: 44px;
        }
        .input-field::-webkit-outer-spin-button,
        .input-field::-webkit-inner-spin-button { -webkit-appearance: none; }
        .input-field:focus {
          border-color: var(--violet); background: white;
          box-shadow: 0 0 0 4px rgba(109,40,217,0.1);
        }
        .input-field::placeholder { color: #9ca3af; font-weight: 400; }

        .input-wrap { position: relative; }
        .input-prefix {
          position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
          font-family: 'DM Mono', monospace; font-size: 16px; font-weight: 600;
          color: #6b7280; pointer-events: none;
        }
        .input-suffix {
          position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
          font-family: 'DM Mono', monospace; font-size: 16px; font-weight: 600;
          color: #6b7280; pointer-events: none;
        }

        /* FEE ROWS */
        .fee-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 13px 0; border-bottom: 1px solid #ece9f0;
        }
        .fee-row:last-child { border-bottom: none; }
        .fee-label {
          font-size: 14px; color: #374151; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
        }
        .fee-badge {
          font-size: 11px; padding: 2px 8px; border-radius: 999px;
          background: #ede9fe; color: #5b21b6; font-weight: 700; letter-spacing: 0.05em;
        }
        .fee-value {
          font-family: 'DM Mono', monospace; font-size: 15px;
          font-weight: 600; color: var(--ink);
        }

        /* NET PROFIT PRICE BOX */
        .price-box {
          background: linear-gradient(135deg, #d0ede4 0%, #b8e3d8 100%);
          border: 2px solid rgba(21,95,72,0.2); border-radius: 18px;
          padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;
        }
        .price-label { font-size: 16px; font-weight: 800; color: #0f4a35; }
        .price-sublabel { font-size: 12px; color: #155f48; margin-top: 2px; font-weight: 500; }
        .price-value {
          font-family: 'DM Mono', monospace; font-size: 28px;
          font-weight: 800; color: #0f4a35; letter-spacing: -0.02em;
        }

        /* TOTAL ROW */
        .total-row {
          background: #fff4f0; border: 1.5px solid #fcd5c4;
          border-radius: 12px; padding: 14px 16px;
          display: flex; justify-content: space-between; align-items: center; margin-top: 4px;
        }

        /* SECTION LABEL */
        .section-label {
          font-size: 11px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; color: #6b7280; margin-bottom: 10px;
        }

        /* TRUST BADGES */
        .trust-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9);
        }
        .trust-badge .check {
          width: 18px; height: 18px; background: rgba(255,255,255,0.2);
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-size: 10px; flex-shrink: 0;
        }
        .divider { width: 1px; height: 14px; background: rgba(255,255,255,0.25); margin: 0 4px; }

        /* PULSE DOT */
        .pulse-dot {
          width: 8px; height: 8px; background: #22c55e;
          border-radius: 50%; display: inline-block;
          animation: pulse-anim 2s ease-in-out infinite;
        }
        @keyframes pulse-anim {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        /* ACCORDION */
        .accordion-item {
          border: 1.5px solid #e5e1f0; border-radius: 14px;
          overflow: hidden; background: white; transition: border-color 0.2s;
        }
        .accordion-item:focus-within { border-color: var(--violet); }
        .accordion-btn {
          width: 100%; padding: 18px 20px; background: none; border: none;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; text-align: left; gap: 12px;
          font-family: 'Sora', sans-serif;
        }
        .accordion-btn:focus { outline: 2px solid var(--violet); outline-offset: -2px; }
        .accordion-q { font-size: 15px; font-weight: 700; color: #1a1a2e; line-height: 1.4; }
        .accordion-icon {
          flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
          background: #ede9fe; display: flex; align-items: center;
          justify-content: center; font-size: 14px; color: #6d28d9;
          transition: transform 0.3s ease, background 0.2s;
        }
        .accordion-icon.open { transform: rotate(45deg); background: #6d28d9; color: white; }
        .accordion-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s ease;
          padding: 0 20px;
        }
        .accordion-body.open { max-height: 300px; padding: 0 20px 18px; }
        .accordion-body p { font-size: 15px; color: #374151; line-height: 1.8; margin: 0; }

        /* ADSENSE PLACEHOLDER */
        .ad-placeholder {
          border: 2px dashed #d4d0e8; border-radius: 16px;
          background: #fafaff; padding: 32px 20px; text-align: center;
        }

        /* FOOTER */
        .footer-link {
          color: #6b7280; font-size: 13px; text-decoration: none;
          font-weight: 500; transition: color 0.2s;
        }
        .footer-link:hover { color: var(--ink); }

        /* BREADCRUMB */
        .breadcrumb { font-size: 13px; color: #9ca3af; }
        .breadcrumb a { color: #6b7280; text-decoration: none; font-weight: 500; }
        .breadcrumb a:hover { color: var(--ink); }
        .breadcrumb span { margin: 0 6px; }

        /* SEO PROSE */
        .seo-section h2 { font-size: 26px; font-weight: 800; color: #1a1a2e; margin: 40px 0 14px; }
        .seo-section h2:first-child { margin-top: 0; }
        .seo-section p { color: #374151; line-height: 1.9; font-size: 16px; margin-bottom: 16px; }
        .seo-section ul { padding-left: 20px; margin-bottom: 16px; }
        .seo-section ul li { color: #374151; line-height: 1.9; font-size: 16px; margin-bottom: 6px; }

        /* RESPONSIVE */
        .calc-card { max-width: 800px; width: 100%; }
        @media (min-width: 641px) { .calc-card { padding: 40px !important; } }
        @media (max-width: 640px) {
          .hero-title { font-size: 36px !important; }
          .trust-row { flex-wrap: wrap; gap: 10px; justify-content: center; }
          .divider { display: none; }
          .price-value { font-size: 22px !important; }
          .inputs-grid { grid-template-columns: 1fr !important; }
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg relative z-0 py-20 px-6 text-center" aria-label="Amazon FBA Calculator hero">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="pulse-dot" aria-hidden="true" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>
              Live Calculator — No Signup Needed
            </span>
          </div>

          <h1
            className="hero-title font-extrabold text-white mb-5 leading-[1.05] tracking-tight"
            style={{ fontSize: 52 }}
          >
            Amazon FBA
            <br />
            <span style={{
              background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Calculator (2025)
            </span>
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", fontWeight: 400, lineHeight: 1.6, marginBottom: 32 }}>
            Calculate Amazon FBA fees, profit, ROI and margin instantly.
          </p>

          <div className="trust-row flex items-center justify-center gap-5" role="list" aria-label="Features">
            {["Free Tool", "No Signup Required", "Updated for 2025"].map((t, i) => (
              <div key={t} className="flex items-center" role="listitem">
                {i > 0 && <div className="divider" aria-hidden="true" />}
                <span className="trust-badge">
                  <span className="check" aria-hidden="true">✓</span>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" style={{ maxWidth: 800, margin: "0 auto", padding: "16px 20px 0" }}>
        <ol className="breadcrumb" style={{ listStyle: "none", display: "flex", alignItems: "center", padding: 0, margin: 0 }}>
          <li><a href="/">Home</a></li>
          <li aria-hidden="true"><span>›</span></li>
          <li aria-current="page" style={{ color: "#1a1a2e", fontWeight: 600 }}>Amazon FBA Calculator</li>
        </ol>
      </nav>

      {/* ── CALCULATOR CARD ──────────────────────────────────────────────── */}
      <section className="relative z-10 px-4 pb-12" style={{ marginTop: -32 }} aria-label="FBA calculator">
        <div className="card calc-card mx-auto p-8" style={{ maxWidth: 800 }}>

          {/* Inputs */}
          <div style={{ marginBottom: 28 }}>
            <p className="section-label">Your Numbers</p>

            {/* Quick-fill buttons */}
            <div role="group" aria-label="Quick fill examples" style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {quickExamples.map(({ label, sale, cost, ref, fba }) => (
                <button
                  key={label}
                  onClick={() => {
                    setSalePrice(sale);
                    setProductCost(cost);
                    setReferralPercent(ref);
                    setFbaFee(fba);
                  }}
                  style={exampleBtn}
                  aria-label={`Fill example: ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="inputs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label htmlFor="sale-price" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Sale Price
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="sale-price"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="30.00"
                    value={salePrice}
                    onChange={e => setSalePrice(e.target.value)}
                    aria-label="Sale price in dollars"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="product-cost" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Product Cost (COGS)
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="product-cost"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="10.00"
                    value={productCost}
                    onChange={e => setProductCost(e.target.value)}
                    aria-label="Product cost in dollars"
                  />
                </div>
              </div>
            </div>

            <div className="inputs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label htmlFor="referral-fee-percent" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Amazon Referral Fee (%)
                </label>
                <div className="input-wrap">
                  <input
                    id="referral-fee-percent"
                    className="input-field input-field-percent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="15"
                    value={referralPercent}
                    onChange={e => setReferralPercent(e.target.value)}
                    aria-label="Referral fee percentage"
                  />
                  <span className="input-suffix" aria-hidden="true">%</span>
                </div>
              </div>

              <div>
                <label htmlFor="fba-fulfillment-fee" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  FBA Fee
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="fba-fulfillment-fee"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="5.00"
                    value={fbaFee}
                    onChange={e => setFbaFee(e.target.value)}
                    aria-label="FBA fulfillment fee in dollars"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ece9f0", marginBottom: 24 }} />

          {/* Fee Breakdown */}
          <div style={{ marginBottom: 20 }}>
            <p className="section-label">FBA Fee Breakdown</p>
            <div role="list" aria-label="Amazon fee breakdown">
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Referral Fee <span className="fee-badge">{referralPercent || "0"}%</span>
                </span>
                <span className="fee-value">{fmt(result.referralFee)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  FBA Fulfillment Fee <span className="fee-badge">Fixed / Weight</span>
                </span>
                <span className="fee-value">{fmt(parseFloat(fbaFee) || 0)}</span>
              </div>
            </div>
          </div>

          {/* Total fees */}
          <div className="total-row" style={{ marginBottom: 16 }} role="status" aria-live="polite">
            <span style={{ fontSize: 15, fontWeight: 800, color: "#7c2d12" }}>Total Amazon Fees</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 800, color: "#c94b1a" }}>
              {fmt(result.totalFees)}
            </span>
          </div>

          {/* Net Profit Price Box */}
          <div className="price-box" role="status" aria-live="polite" aria-label={`Net profit: ${fmt(result.profit)}`}>
            <div>
              <div className="price-label">Net Profit</div>
              <div className="price-sublabel">Your projected revenue after Amazon fees and product costs</div>
            </div>
            <div className="price-value">{fmt(hasInput ? result.profit : 0)}</div>
          </div>

          {/* Summary breakdown */}
          <div
            style={{ marginTop: 20, border: "1.5px solid #e5e1f0", borderRadius: 16, padding: 16, background: "#fafaf8" }}
            aria-label="Pricing summary"
          >
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Net Profit</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#155f48" }}>
                {fmt(hasInput ? result.profit : 0)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Total Amazon Fees</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#c94b1a" }}>
                {fmt(result.totalFees)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Profit Margin</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: result.margin >= 20 ? "#155f48" : "#c94b1a" }}>
                {hasInput ? `${result.margin.toFixed(1)}%` : "0%"}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Return on Investment (ROI)</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: result.roi >= 50 ? "#155f48" : "#c94b1a" }}>
                {hasInput ? `${result.roi.toFixed(1)}%` : "0%"}
              </strong>
            </div>
          </div>

          {/* Margin health indicator */}
          {hasInput && (
            <div style={{ marginTop: 12, textAlign: "center" }} role="status" aria-live="polite">
              <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>
                Profit margin:{" "}
                <strong style={{
                  color: result.margin >= 25 ? "#155f48" : result.margin >= 15 ? "#b45309" : "#991b1b",
                  fontSize: 15,
                }}>
                  {result.margin.toFixed(1)}%
                </strong>
                {" "}
                <span style={{ fontSize: 13, color: "#9ca3af" }}>
                  {result.margin >= 25 ? "✓ Healthy" : result.margin >= 15 ? "⚠ Low" : "✗ Very low"}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Info card */}
        <div className="mx-auto mt-4 px-4" style={{ maxWidth: 800 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }} aria-hidden="true">ℹ️</div>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
              Your net profit calculation takes your gross price and removes category referral percentage costs alongside 
              standard FBA shipping and packaging overheads. Storage fees or optional advertising cost (PPC) are not included.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ─────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "60px 20px" }} aria-labelledby="faq-heading">
        <h2 id="faq-heading" style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, textAlign: "center", color: "#1a1a2e" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 36, fontSize: 15 }}>
          Get answers to the most common Amazon FBA fees, profit margins, and ROI calculations.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} role="list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="accordion-item" role="listitem">
              <button
                className="accordion-btn"
                aria-expanded={openFaq === i}
                aria-controls={`faq-body-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="accordion-q">{item.q}</span>
                <span className={`accordion-icon${openFaq === i ? " open" : ""}`} aria-hidden="true">+</span>
              </button>
              <div
                id={`faq-body-${i}`}
                className={`accordion-body${openFaq === i ? " open" : ""}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADSENSE PLACEHOLDER ───────────────────────────────────────────── */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 60px" }} aria-label="Advertisement">
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10, textAlign: "center" }}>
          Sponsored
        </p>
        <div className="ad-placeholder">
          <div style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
            Advertisement Space
          </div>
          <div style={{ fontSize: 12, color: "#c4c0d0" }}>728 × 90 — Google AdSense</div>
        </div>
      </section>

      {/* ── SELLER TOOLS ─────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 60px" }} aria-labelledby="tools-heading">
        <h2 id="tools-heading" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, textAlign: "center", color: "#1a1a2e" }}>
          More Seller Tools
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 28, fontSize: 15 }}>
          We're building a complete free toolkit for e-commerce sellers
        </p>
        <div className="tools-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} role="list">
          {sellerTools.map((tool) => (
            <div
              key={tool.label}
              role="listitem"
              aria-label={tool.current ? `${tool.label} — Current page` : `${tool.label} — Coming soon`}
              style={{
                display: "flex", flexDirection: "column", gap: 10,
                padding: "20px 20px 18px",
                background: tool.current ? "linear-gradient(135deg, #f5f3ff, #ede9fe)" : "white",
                borderRadius: 16,
                border: tool.current ? "2px solid #c4b5fd" : "1.5px solid #e5e1f0",
                boxShadow: tool.current
                  ? "0 4px 16px rgba(109,40,217,0.12), 0 8px 24px rgba(0,0,0,0.04)"
                  : "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
                cursor: "default", position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                if (!tool.current) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 4px 16px rgba(109,40,217,0.12), 0 12px 32px rgba(0,0,0,0.06)";
                  el.style.transform = "translateY(-2px)";
                  el.style.borderColor = "#c4b5fd";
                }
              }}
              onMouseLeave={e => {
                if (!tool.current) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "#e5e1f0";
                }
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: tool.current ? "#ddd6fe" : "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {tool.icon}
                </div>
                {tool.current ? (
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 999, background: "linear-gradient(90deg, #7c3aed, #6d28d9)", color: "white" }}>
                    THIS TOOL
                  </span>
                ) : (
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 999, background: "linear-gradient(90deg, #ede9fe, #e0e7ff)", color: "#1e1b4b", border: "1px solid #c7d2fe" }}>
                    VIEW TOOL
                  </span>
                )}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.3, marginBottom: 3 }}>{tool.label}</div>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
                  {tool.current ? "Free · No signup · Updated 2025" : "Free calculator · No signup"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEO CONTENT ───────────────────────────────────────────────────── */}
      <section className="seo-section" style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 80px" }} aria-label="About Amazon FBA pricing">

        <h2>What Is an Amazon FBA Calculator?</h2>
        <p>
          An <strong>Amazon FBA Calculator</strong> is a vital resource for online merchants looking to navigate 
          the financials of the Amazon fulfillment ecosystem. Rather than trying to manually figure out complex system parameters, 
          sellers supply their intended sales target value, direct supplier unit manufacturing costs, platform commission parameters, 
          and baseline transport pick/pack rates. 
        </p>
        <p>
          The tool works immediately to output accurate projections on what remains in your pocket. This free tracking asset is updated for 2025, 
          optimized cleanly across any desktop or mobile hardware setup, and requires zero user registrations. It serves Amazon Private Label brands, 
          wholesale distributors, retail arbitrage pros, and global drop-shippers trying to protect their <strong>Amazon Seller Profit</strong>.
        </p>

        <h2>Understanding Amazon Fees and System Costs</h2>
        <p>
          To maintain a sustainable business model on the marketplace, your price points must cleanly absorb structural platform overheads. 
          The core <strong>Amazon Fees</strong> handled by this layout break down into two main buckets:
        </p>
        <ul>
          <li><strong>Amazon Referral Fee</strong> — A percentage-based commission structured across product category distributions, typically ranging between 8% to 15%.</li>
          <li><strong>FBA Fulfillment Fee</strong> — Standard unitary operations charges covering storage picking adjustments, box packing materials, and postal tracking transport logistics.</li>
        </ul>
        <p>
          Failing to include these line items before committing capital to a large inventory run is one of the most common causes of seller failure. Running this numbers lookup 
          ahead of launch ensures you establish operational viability and target healthy margins.
        </p>

        <h2>Analyzing Amazon Profit Margin and Seller ROI</h2>
        <p>
          Achieving real financial momentum comes down to monitoring two metric trends: <strong>Amazon Profit Margin</strong> and <strong>Amazon Seller ROI</strong>. 
          While margin tracks what piece of the top-line retail price is retained as earnings, return on investment evaluates how hard your capital works.
        </p>
        <p>
          For example, spending $10 to purchase a unit that generates $10 in profit yields a 100% ROI. Maintaining detailed tracking metrics allows you to easily isolate 
          which items generate the most leverage per dollar invested in inventory, helping you scale your catalog strategically.
        </p>

        <h2>Amazon FBA Pricing and Fee Examples</h2>
        <p>
          See how typical product classifications flow through the automated system equations:
        </p>

        <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e5e1f0", overflow: "hidden", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "16px 24px" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>📊 Amazon FBA Calculation Configurations — 2025</span>
          </div>
          {[
            { product: "📦 Home Product", sale: "$30.00", cost: "$10.00", ref: "$4.50", fba: "$5.00", profit: "$10.50", margin: "35.0%", roi: "105.0%" },
            { product: "🎧 Electronics",  sale: "$80.00", cost: "$40.00", ref: "$12.00", fba: "$8.00", profit: "$20.00", margin: "25.0%", roi: "50.0%" },
            { product: "🧴 Beauty",       sale: "$25.00", cost: "$7.00",  ref: "$3.75", fba: "$4.00", profit: "$10.25", margin: "41.0%", roi: "146.4%" },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr", padding: "14px 20px", borderBottom: "1px solid #f0edf8", background: i % 2 === 0 ? "#fafaf8" : "white", fontSize: 12, fontWeight: 600, color: "#374151", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#1a1a2e" }}>{row.product}</span>
              <span>{row.sale}</span>
              <span>{row.cost}</span>
              <span>{row.ref}</span>
              <span>{row.fba}</span>
              <span style={{ color: "#155f48" }}>{row.profit}</span>
              <span style={{ color: "#6d28d9", fontFamily: "'DM Mono', monospace" }}>{row.margin}</span>
              <span style={{ color: "#155f48" }}>{row.roi}</span>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr", padding: "10px 20px", background: "#f5f3ff", fontSize: 10, fontWeight: 700, color: "#6b7280", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            <span>Product Category</span><span>Sale</span><span>Cost</span><span>Ref</span><span>FBA</span><span>Profit</span><span>Margin</span><span>ROI</span>
          </div>
        </div>

        <h2>Tactics to Improve Your Amazon Bottom Line</h2>
        <p>
          If your current product projections reveal compressed margins, use these practical levers to improve profitability:
        </p>
        <ul>
          <li><strong>Optimize Product Packaging</strong> — Shaving fractions of an inch or an ounce off packaging design can drop your product into a lower FBA weight tier, saving thousands in fees.</li>
          <li><strong>Bulk Component Sourcing</strong> — Negotiating higher volume raw material purchases with suppliers directly improves your unit margin and ROI.</li>
          <li><strong>Bundle Multi-Pack Variations</strong> — Grouping complementary items into singular retail listings dilutes flat FBA fulfillment fees across higher average order values.</li>
        </ul>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1.5px solid #e5e1f0", padding: "28px 16px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <a href="https://sellercentral.amazon.com" className="footer-link" target="_blank" rel="noopener noreferrer">Amazon Seller Central</a>
          <a href="https://sell.amazon.com/pricing" className="footer-link" target="_blank" rel="noopener noreferrer">Amazon Fee Schedules</a>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          © 2025 Amazon FBA Calculator · Independent tracking application not affiliated with Amazon.com, Inc. · Projections represent operational estimates.
        </p>
      </footer>
    </main>
  );
}