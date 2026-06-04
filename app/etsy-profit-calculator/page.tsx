"use client";

import { useState, useEffect } from "react";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "How do I calculate Etsy profit?",
    a: "Etsy profit = Sale Price − Product Cost − Shipping Cost − Total Etsy Fees. Total Etsy fees include a $0.20 listing fee, a 6.5% transaction fee on the sale price, and a 3% + $0.25 payment processing fee.",
  },
  {
    q: "What is a good profit margin on Etsy?",
    a: "A healthy Etsy profit margin is generally 30–50% or higher. Margins below 20% often leave sellers vulnerable to cost increases or slow periods. Digital products tend to have the highest margins since there are no material or shipping costs.",
  },
  {
    q: "Does Etsy charge fees on shipping?",
    a: "This calculator estimates Etsy profit using your sale price, product cost, shipping cost, and standard Etsy fees.",
  },
  {
    q: "How do Etsy fees affect my profit margin?",
    a: "Etsy fees typically consume 10–15% of your sale price. On a $30 item, total fees are roughly $2.45 in transaction and payment fees plus $0.20 listing fee. The lower your sale price, the bigger the proportional impact — especially the fixed $0.25 payment processing charge.",
  },
  {
    q: "How should I price products on Etsy for a target profit?",
    a: "Start with your product cost plus shipping cost, add your desired profit, then divide by (1 − Etsy fee rate). For example, if your costs are $15 and you want $10 profit, aim for a sale price around $37–$40 to cover Etsy's ~9.75% fees plus fixed charges.",
  },
  {
    q: "Are digital products more profitable on Etsy?",
    a: "Generally yes. Digital products have zero product cost and zero shipping cost, so your profit equals your sale price minus Etsy fees. A $20 digital download yields roughly $17.35 in profit after fees — an 87%+ margin.",
  },
  {
    q: "What is the Etsy payment processing fee?",
    a: "Etsy charges 3% + $0.25 per transaction through Etsy Payments. The fixed $0.25 has a bigger impact on low-priced items, which is why many sellers price digital products above $10.",
  },
  {
    q: "Can I improve my Etsy profit without raising prices?",
    a: "Yes. You can reduce product costs through bulk material purchasing, reduce packaging waste, offer bundles to lower per-unit listing fees, and switch to digital products where feasible. Even small cost reductions compound significantly at scale.",
  },
  {
    q: "How accurate is this Etsy profit calculator?",
    a: "This calculator uses Etsy's published 2025 fee structure: $0.20 listing fee, 6.5% transaction fee, and 3% + $0.25 payment processing fee. It provides reliable estimates, though actual fees may vary slightly by country or payment method.",
  },
];

export default function EtsyProfitCalculator() {
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
    name: "Etsy Profit Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Etsy Profit Calculator",
    description:
      "Free Etsy profit calculator. Calculate your Etsy profit margin, product cost, shipping cost and Etsy fees instantly.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: "https://yoursite.com/etsy-profit-calculator",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yoursite.com" },
      { "@type": "ListItem", position: 2, name: "Etsy Profit Calculator", item: "https://yoursite.com/etsy-profit-calculator" },
    ],
  };

  // ─── STATE ─────────────────────────────────────────────────────────────────
  const [salePrice, setSalePrice] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [result, setResult] = useState({
    transactionFee: 0,
    paymentFee: 0,
    listingFee: 0.2,
    totalFees: 0,
    profit: 0,
    margin: 0,
  });

  useEffect(() => {
    const sale = parseFloat(salePrice) || 0;
    const cost = parseFloat(productCost) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const transactionFee = sale * 0.065;
    const paymentFee = sale * 0.03 + 0.25;
    const listingFee = 0.2;
    const totalFees = transactionFee + paymentFee + listingFee;
    const profit = sale - cost - shipping - totalFees;
    const margin = sale > 0 ? (profit / sale) * 100 : 0;
    setResult({ transactionFee, paymentFee, listingFee, totalFees, profit, margin });
  }, [salePrice, productCost, shippingCost]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

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

  // ─── QUICK EXAMPLES ────────────────────────────────────────────────────────
  const quickExamples = [
    { label: "👕 T-Shirt", sale: "35", cost: "10", shipping: "5" },
    { label: "💍 Jewelry", sale: "50", cost: "15", shipping: "6" },
    { label: "📄 Digital", sale: "20", cost: "0", shipping: "0" },
  ];

  // ─── SELLER TOOLS ──────────────────────────────────────────────────────────
  const sellerTools = [
    { label: "Etsy Profit Calculator", href: "/etsy-profit-calculator", ready: false },
    { label: "Etsy Pricing Calculator", href: "/etsy-pricing-calculator", ready: false },
    { label: "Amazon FBA Calculator", href: "/amazon-fba-calculator", ready: false },
    { label: "Shopify Profit Calculator", href: "/shopify-profit-calculator", ready: false },
  ];

  const hasSalePrice = parseFloat(salePrice) > 0;

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
          --cream: #f5f4f0;
          --rust: #c94b1a;
          --emerald: #155f48;
          --emerald-bg: #d0ede4;
          --violet: #6d28d9;
          --mist: #e8e6e0;
          --text-primary: #1a1a2e;
          --text-secondary: #374151;
          --text-muted: #6b7280;
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

        /* FEE ROWS */
        .fee-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 13px 0; border-bottom: 1px solid #ece9f0; font-size: 15px;
          color: var(--text-secondary); font-weight: 500;
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

        /* NET BOX */
        .net-box {
          background: linear-gradient(135deg, #d0ede4 0%, #b8e3d8 100%);
          border: 2px solid rgba(21,95,72,0.2); border-radius: 18px;
          padding: 20px 24px; display: flex; justify-content: space-between; align-items: center;
        }
        .net-label { font-size: 16px; font-weight: 800; color: #0f4a35; }
        .net-sublabel { font-size: 12px; color: #155f48; margin-top: 2px; font-weight: 500; }
        .net-value {
          font-family: 'DM Mono', monospace; font-size: 28px;
          font-weight: 800; color: #0f4a35; letter-spacing: -0.02em;
        }
        .net-value.negative { color: #991b1b; }

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
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
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
          background: #fafaff; padding: 32px 20px;
          text-align: center;
        }

        /* SELLER TOOL CARDS */
        .tool-card {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px; background: white; border-radius: 14px;
          border: 1.5px solid #e5e1f0; text-decoration: none;
          transition: all 0.2s; cursor: default;
        }
        .tool-card.clickable { cursor: pointer; }
        .tool-card.clickable:hover {
          border-color: #6d28d9; box-shadow: 0 4px 16px rgba(109,40,217,0.1);
          transform: translateY(-1px);
        }
        .tool-card:focus { outline: 2px solid var(--violet); outline-offset: 2px; }

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
        @media (min-width: 641px) {
          .calc-card { padding: 40px !important; }
        }
        @media (max-width: 1024px) {
          .hero-title { font-size: 36px !important; }
          .trust-row { flex-wrap: wrap; gap: 10px; justify-content: center; }
          .divider { display: none; }
          .net-value { font-size: 22px !important; }
          .inputs-grid { grid-template-columns: 1fr !important; }
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg relative z-0 py-20 px-6 text-center" aria-label="Etsy Profit Calculator hero">
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
            Etsy Profit
            <br />
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Calculator (2025)
            </span>
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", fontWeight: 400, lineHeight: 1.6, marginBottom: 32 }}>
            Calculate your Etsy profit instantly.<br />
            Include product cost, shipping cost and Etsy fees.
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
          <li aria-current="page" style={{ color: "#1a1a2e", fontWeight: 600 }}>Etsy Profit Calculator</li>
        </ol>
      </nav>

      {/* ── CALCULATOR CARD ──────────────────────────────────────────────── */}
      <section
        className="relative z-10 px-4 pb-12"
        style={{ marginTop: -32 }}
        aria-label="Profit calculator"
      >
        <div className="card calc-card mx-auto p-8" style={{ maxWidth: 800 }}>

          {/* Inputs */}
          <div style={{ marginBottom: 28 }}>
            <p className="section-label" id="pricing-label">Your Numbers</p>

            {/* Quick-fill buttons */}
            <div role="group" aria-label="Quick fill examples" style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {quickExamples.map(({ label, sale, cost, shipping }) => (
                <button
                  key={label}
                  onClick={() => { setSalePrice(sale); setProductCost(cost); setShippingCost(shipping); }}
                  style={exampleBtn}
                  aria-label={`Fill example: ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="inputs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
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
                    placeholder="35.00"
                    value={salePrice}
                    onChange={e => setSalePrice(e.target.value)}
                    aria-label="Sale price in dollars"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="product-cost" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Product Cost
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
              <div>
                <label htmlFor="shipping-cost" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Shipping Cost
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="shipping-cost"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="5.00"
                    value={shippingCost}
                    onChange={e => setShippingCost(e.target.value)}
                    aria-label="Shipping cost in dollars"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ece9f0", marginBottom: 24 }} />

          {/* Fee Breakdown */}
          <div style={{ marginBottom: 20 }}>
            <p className="section-label">Etsy Fee Breakdown</p>
            <div role="list" aria-label="Fee breakdown">
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Listing Fee <span className="fee-badge">Fixed</span>
                </span>
                <span className="fee-value" aria-label={`Listing fee: ${fmt(result.listingFee)}`}>{fmt(result.listingFee)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Transaction Fee <span className="fee-badge">6.5%</span>
                </span>
                <span className="fee-value" aria-label={`Transaction fee: ${fmt(result.transactionFee)}`}>{fmt(result.transactionFee)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Payment Processing <span className="fee-badge">3% + $0.25</span>
                </span>
                <span className="fee-value" aria-label={`Payment processing fee: ${fmt(result.paymentFee)}`}>{fmt(result.paymentFee)}</span>
              </div>
            </div>
          </div>

          {/* Total fees */}
          <div className="total-row" style={{ marginBottom: 16 }} role="status" aria-live="polite">
            <span style={{ fontSize: 15, fontWeight: 800, color: "#7c2d12" }}>Total Etsy Fees</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 800, color: "#c94b1a" }}>
              {fmt(result.totalFees)}
            </span>
          </div>

          {/* Net Profit */}
          <div className="net-box" role="status" aria-live="polite" aria-label={`Net profit: ${fmt(result.profit)}`}>
            <div>
              <div className="net-label">Net Profit</div>
              <div className="net-sublabel">After all costs and Etsy fees</div>
            </div>
            <div className={`net-value ${result.profit < 0 && hasSalePrice ? "negative" : ""}`}>
              {hasSalePrice ? fmt(result.profit) : fmt(0)}
            </div>
          </div>

          {/* Profit Summary */}
          <div
            style={{ marginTop: 20, border: "1.5px solid #e5e1f0", borderRadius: 16, padding: 16, background: "#fafaf8" }}
            aria-label="Profit summary"
          >
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Sale Price</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#1a1a2e" }}>
                {fmt(parseFloat(salePrice) || 0)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Product Cost</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#c94b1a" }}>
                {fmt(parseFloat(productCost) || 0)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Shipping Cost</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#c94b1a" }}>
                {fmt(parseFloat(shippingCost) || 0)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Total Etsy Fees</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#c94b1a" }}>
                {fmt(result.totalFees)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Profit Margin</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#155f48" }}>
                {hasSalePrice ? `${result.margin.toFixed(1)}%` : "0%"}
              </strong>
            </div>
          </div>

          {/* Margin line */}
          {hasSalePrice && (
            <div style={{ marginTop: 12, textAlign: "center" }} role="status" aria-live="polite">
              <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>
                Profit margin:{" "}
                <strong style={{ color: result.margin > 20 ? "#155f48" : "#c94b1a", fontSize: 15 }}>
                  {result.margin.toFixed(1)}%
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Info card */}
        <div className="mx-auto mt-4 px-4" style={{ maxWidth: 800 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }} aria-hidden="true">ℹ️</div>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
              Etsy fees include a <strong>$0.20 listing fee</strong>, a <strong>6.5% transaction fee</strong> on
              sale price, and a <strong>3% + $0.25 payment processing fee</strong>. Your profit is calculated after
              deducting product cost, shipping cost, and all Etsy fees.
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
          Common questions about Etsy profit, profit margin, pricing strategy, and Etsy seller fees.
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
          More Seller Tools Coming Soon
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 28, fontSize: 15 }}>
          We're building a complete free toolkit for e-commerce sellers
        </p>
        <div className="tools-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} role="list">
          {sellerTools.map((tool) => (
            <div
              key={tool.label}
              role="listitem"
              aria-label={`${tool.label} — Coming soon`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "20px 20px 18px",
                background: "white",
                borderRadius: 16,
                border: "1.5px solid #e5e1f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(109,40,217,0.12), 0 12px 32px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.borderColor = "#c4b5fd";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "#e5e1f0";
              }}
            >
              {/* Top row: icon + badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "#ede9fe",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>
                  {tool.label.includes("Etsy Pricing") ? "🏷️" :
                   tool.label.includes("Amazon") ? "📦" :
                   tool.label.includes("Shopify") ? "🛒" : "📊"}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
                  padding: "4px 10px", borderRadius: 999,
                  background: "linear-gradient(90deg, #fef3c7, #fde68a)",
                  color: "#92400e", border: "1px solid #fcd34d",
                }}>
                  COMING SOON
                </span>
              </div>
              {/* Tool name */}
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.3, marginBottom: 3 }}>
                  {tool.label}
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Free calculator · No signup</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEO CONTENT ───────────────────────────────────────────────────── */}
      <section className="seo-section" style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 80px" }} aria-label="About Etsy profit">

        <h2>What Is an Etsy Profit Calculator?</h2>
        <p>
          An <strong>Etsy profit calculator</strong> is a free tool that helps Etsy sellers instantly calculate their
          true profit on every sale — after accounting for product cost, shipping cost, and all Etsy platform fees.
          Unlike a basic fee calculator, a profit calculator gives you a complete picture of your <strong>Etsy profit
          margin</strong> so you can price with confidence and grow a sustainable shop.
        </p>
        <p>
          Whether you sell handmade jewelry, print-on-demand apparel, digital downloads, or vintage goods, knowing
          your real profit before listing is essential to running a profitable Etsy business.
        </p>

        <h2>How Etsy Profit Is Calculated</h2>
        <p>
          Your Etsy profit is calculated by subtracting all costs and fees from your sale price:
        </p>
        <p>
          <strong>Profit = Sale Price − Product Cost − Shipping Cost − Total Etsy Fees</strong>
        </p>
        <p>
          Total Etsy fees include a flat <strong>$0.20 listing fee</strong>, a <strong>6.5% transaction fee</strong> on
          the sale price, and a <strong>3% + $0.25 payment processing fee</strong>. This calculator handles all three
          automatically and updates your profit margin in real time.
        </p>

        <h2>Understanding Etsy Profit Margin</h2>
        <p>
          Your <strong>Etsy profit margin</strong> is your profit expressed as a percentage of your sale price. It tells
          you how efficiently you're converting revenue into take-home earnings. A margin of 30% means you keep $0.30
          for every $1.00 in sales after all costs.
        </p>
        <p>
          Most experienced Etsy sellers aim for a profit margin of 30–50% or higher. Margins below 20% leave little
          room for slow seasons, refunds, or rising material costs. Digital product sellers often achieve margins above
          80% since there are no product or shipping costs.
        </p>

        <h2>Etsy Pricing Strategy for Maximum Profit</h2>
        <p>
          Profitable Etsy pricing starts with knowing your costs and working backwards from your desired margin. A
          practical framework:
        </p>
        <ul>
          <li><strong>Product cost</strong> — materials, labor, packaging, and overhead per unit</li>
          <li><strong>Shipping cost</strong> — actual postage plus packaging supplies</li>
          <li><strong>Etsy fees</strong> — use this calculator to determine the exact amount</li>
          <li><strong>Target profit</strong> — what you want to earn per sale</li>
          <li><strong>Sale price</strong> — the sum of all the above, rounded to a competitive price point</li>
        </ul>
        <p>
          A common mistake is setting prices based on competitors without knowing your own cost structure. Use this
          <strong> Etsy profit calculator</strong> to verify that your pricing delivers a healthy margin before you list.
        </p>

        <h2>How To Increase Your Etsy Profit Margin</h2>
        <p>
          There are several proven strategies to improve your Etsy seller profit without necessarily raising prices:
        </p>
        <ul>
          <li><strong>Reduce product cost</strong> — buy materials in bulk, eliminate waste, and streamline production.</li>
          <li><strong>Bundle products</strong> — a $50 bundle pays one $0.20 listing fee instead of two; payment processing fees also carry less fixed cost per dollar of revenue.</li>
          <li><strong>Offer free shipping</strong> — include your shipping cost in the sale price. Etsy favors free shipping listings in search, which can increase volume and offset any margin impact.</li>
          <li><strong>Expand to digital products</strong> — no product cost and no shipping cost means every sale goes almost entirely to profit after fees.</li>
          <li><strong>Test price increases</strong> — raise prices 10–15% on your best-sellers and monitor conversion. Many sellers discover buyers are less price-sensitive than expected.</li>
        </ul>

        <h2>Etsy Profit Example</h2>
        <p>
          Here's a real-world example showing how profit is calculated on a typical handmade item sale.
        </p>

        {/* Example table card */}
        <div style={{
          background: "white", borderRadius: 18, border: "1.5px solid #e5e1f0",
          overflow: "hidden", marginBottom: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
        }}>
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "16px 24px" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em" }}>
              📦 Example Sale — Handmade Candle
            </span>
          </div>
          {/* Rows */}
          {[
            { label: "Sale Price",                value: "$35.00", sub: "What the buyer pays",     color: "#1a1a2e",  bg: "#fafaf8" },
            { label: "Product Cost",              value: "−$10.00", sub: "Materials + labor",       color: "#c94b1a", bg: "white" },
            { label: "Shipping Cost",             value: "−$5.00",  sub: "Actual postage",          color: "#c94b1a", bg: "#fafaf8" },
            { label: "Listing Fee",               value: "−$0.20",  sub: "Fixed per listing",       color: "#c94b1a", bg: "white" },
            { label: "Transaction Fee (6.5%)",    value: "−$2.28",  sub: "6.5% of $35.00",          color: "#c94b1a", bg: "#fafaf8" },
            { label: "Payment Processing Fee",    value: "−$1.30",  sub: "3% of $35 + $0.25",       color: "#c94b1a", bg: "white" },
            { label: "Total Etsy Fees",           value: "−$3.78",  sub: "Sum of all Etsy fees",    color: "#7c2d12", bg: "#fff4f0", bold: true },
          ].map(({ label, value, sub, color, bg, bold }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: bg, borderBottom: "1px solid #f0edf8" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: bold ? 800 : 600, color: "#1a1a2e" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>{sub}</div>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: bold ? 800 : 600, color }}>{value}</span>
            </div>
          ))}
          {/* Net Profit highlight row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", background: "linear-gradient(135deg, #d0ede4, #b8e3d8)" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0f4a35" }}>Net Profit</div>
              <div style={{ fontSize: 12, color: "#155f48", marginTop: 2 }}>After all costs and Etsy fees</div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 800, color: "#0f4a35" }}>$16.22</span>
          </div>
        </div>

        <p>
          In this example, the seller listed a candle at <strong>$35.00</strong>. After deducting a <strong>$10.00
          product cost</strong>, <strong>$5.00 shipping cost</strong>, and <strong>$3.78 in Etsy fees</strong>, the
          net profit is <strong>$16.22</strong> — a profit margin of approximately <strong>46%</strong>.
        </p>
        <p>
          Notice that shipping cost is a real expense deducted from profit, not just a pass-through. If you charge
          buyers for shipping separately, you still pay Etsy's transaction fee on the sale price, which is why accurate
          profit tracking requires an <strong>Etsy profit calculator</strong> that accounts for all three inputs.
        </p>

        <h2>Common Etsy Seller Profit Mistakes</h2>
        <p>
          Many Etsy sellers unknowingly price themselves out of profitability. Here are the most common errors to avoid:
        </p>
        <ul>
          <li>Not including product cost or labor when setting sale prices</li>
          <li>Forgetting that Etsy charges fees on top of your costs — not just from revenue</li>
          <li>Underpricing to compete without knowing actual cost structure</li>
          <li>Treating shipping income as profit rather than a cost offset</li>
          <li>Ignoring the $0.20 listing renewal fee on high-volume listings</li>
          <li>Pricing based on competitors without knowing their manufacturing advantages</li>
        </ul>

        <h2>Why Use This Etsy Profit Calculator?</h2>
        <p>
          This free <strong>Etsy profit calculator</strong> was built specifically for Etsy sellers who want clear,
          instant answers about their true earnings — no spreadsheets, no guesswork, no signup required. It's updated
          for 2025, works on any device, and shows your profit, profit margin, and a full fee breakdown in real time
          as you type.
        </p>
        <p>
          Use it every time you create a new listing or consider a price change. A few seconds of calculation can prevent
          weeks of selling at a loss.
        </p>

        <h2>Final Thoughts on Etsy Seller Profit</h2>
        <p>
          Running a profitable Etsy shop requires clear financial awareness on every listing. Etsy fees, product costs,
          and shipping can easily consume 40–60% of your sale price if left untracked. By using this
          <strong> Etsy profit calculator</strong> before you list, you'll know exactly what you'll earn and can build
          a shop that grows sustainably.
        </p>
        <p>
          Bookmark this tool and revisit it whenever you adjust your pricing, change suppliers, or launch a new product
          category. Consistent margin tracking is one of the most impactful habits of successful Etsy sellers.
        </p>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1.5px solid #e5e1f0", padding: "28px 16px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <a href="https://www.etsy.com/legal/fees" className="footer-link" target="_blank" rel="noopener noreferrer">How Etsy Fees Are Calculated</a>
          <a href="https://www.etsy.com/seller-handbook" className="footer-link" target="_blank" rel="noopener noreferrer">Etsy Seller Handbook</a>
          <a href="https://www.etsy.com/legal/privacy" className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          © 2025 Etsy Profit Calculator · Not affiliated with Etsy, Inc. · Results shown are estimates only.
        </p>
      </footer>
    </main>
  );
}
