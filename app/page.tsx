"use client";

import { useState, useEffect } from "react";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What fees does Etsy charge?",
    a: "Etsy charges a $0.20 listing fee, a 6.5% transaction fee on the item price plus shipping, and a payment processing fee of 3% + $0.25 per transaction.",
  },
  {
    q: "How is the Etsy transaction fee calculated?",
    a: "Etsy charges 6.5% on the total order value including both item price and shipping. For example, a $30 item with $5 shipping = $35 × 6.5% = $2.28 transaction fee.",
  },
  {
    q: "Does Etsy charge fees on shipping?",
    a: "Yes. Etsy applies the 6.5% transaction fee on both the item price and the shipping amount you charge the buyer.",
  },
  {
    q: "What is Etsy payment processing fee?",
    a: "Etsy charges approximately 3% + $0.25 payment processing fee per transaction when using Etsy Payments. This covers secure payment handling.",
  },
  {
    q: "How much does Etsy take from a sale?",
    a: "Etsy deducts a $0.20 listing fee, 6.5% transaction fee, and ~3% + $0.25 payment processing fee from every sale. On a $30 item with $5 shipping, total fees are roughly $4.02.",
  },
  {
    q: "Can I include shipping in my Etsy pricing?",
    a: "Yes. Many successful sellers include shipping costs directly in the product price and offer free shipping. This can also improve your search ranking on Etsy.",
  },
  {
    q: "Does Etsy charge a listing fee on every sale?",
    a: "Etsy charges a $0.20 listing fee each time a listing is published or auto-renewed. When a listing sells, it renews automatically and another $0.20 listing fee applies.",
  },
  {
    q: "How accurate is this Etsy fee calculator?",
    a: "This calculator uses Etsy's published 2025 fee structure and provides accurate estimates. Actual fees may vary slightly by country or payment method.",
  },
  {
    q: "Can I calculate Etsy profit before listing?",
    a: "Yes. Enter your product price and shipping charge to instantly estimate your net revenue, total fees, and profit margin before publishing any listing.",
  },
];

export default function EtsyFeeCalculator() {
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
    name: "Etsy Fee Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Etsy Fee Calculator",
    description:
      "Free Etsy fee calculator. Calculate Etsy listing fees, transaction fees, payment processing fees, and net profit instantly.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: "https://yoursite.com/etsy-fee-calculator",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yoursite.com" },
      { "@type": "ListItem", position: 2, name: "Etsy Fee Calculator", item: "https://yoursite.com/etsy-fee-calculator" },
    ],
  };

  // ─── STATE ─────────────────────────────────────────────────────────────────
  const [price, setPrice] = useState<string>("");
  const [shipping, setShipping] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [fees, setFees] = useState({ transaction: 0, payment: 0, listing: 0.2, total: 0, net: 0 });

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const s = parseFloat(shipping) || 0;
    const subtotal = p + s;
    const transaction = subtotal * 0.065;
    const payment = subtotal * 0.03 + 0.25;
    const listing = 0.2;
    const total = transaction + payment + listing;
    const net = subtotal - total;
    setFees({ transaction, payment, listing, total, net });
  }, [price, shipping]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const marginPct = parseFloat(price) > 0
    ? (fees.net / parseFloat(price)) * 100
    : 0;

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

  // ─── SELLER TOOLS ──────────────────────────────────────────────────────────
  const sellerTools = [
    { label: "Etsy Profit Calculator", href: "/etsy-profit-calculator", ready: false },
    { label: "Etsy Pricing Calculator", href: "/etsy-pricing-calculator", ready: false },
    { label: "Amazon FBA Calculator", href: "/amazon-fba-calculator", ready: false },
    { label: "Shopify Profit Calculator", href: "/shopify-profit-calculator", ready: false },
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
        @media (max-width: 640px) {
          .hero-title { font-size: 36px !important; }
          .trust-row { flex-wrap: wrap; gap: 10px; justify-content: center; }
          .divider { display: none; }
          .net-value { font-size: 22px !important; }
          .inputs-grid { grid-template-columns: 1fr !important; }
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero-bg relative z-0 py-20 px-6 text-center" aria-label="Etsy Fee Calculator hero">
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
            Etsy Fee
            <br />
            <span style={{ background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Calculator (2025)
            </span>
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", fontWeight: 400, lineHeight: 1.6, marginBottom: 32 }}>
            Calculate your Etsy fees and profit instantly.<br />
            Know exactly what you earn before you list.
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
          <li aria-current="page" style={{ color: "#1a1a2e", fontWeight: 600 }}>Etsy Fee Calculator</li>
        </ol>
      </nav>

      {/* ── CALCULATOR CARD ──────────────────────────────────────────────── */}
      <section
        className="relative z-10 px-4 pb-12"
        style={{ marginTop: -32 }}
        aria-label="Fee calculator"
      >
        <div className="card calc-card mx-auto p-8" style={{ maxWidth: 800 }}>

          {/* Inputs */}
          <div style={{ marginBottom: 28 }}>
            <p className="section-label" id="pricing-label">Your Pricing</p>

            {/* Quick-fill buttons */}
            <div role="group" aria-label="Quick fill examples" style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { label: "💍 Jewelry", price: "30", ship: "5" },
                { label: "👕 T-Shirt", price: "25", ship: "4" },
                { label: "📄 Digital", price: "10", ship: "0" },
              ].map(({ label, price: p, ship }) => (
                <button
                  key={label}
                  onClick={() => { setPrice(p); setShipping(ship); }}
                  style={exampleBtn}
                  aria-label={`Fill example: ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="inputs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label htmlFor="product-price" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Product Price
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="product-price"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="29.99"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    aria-label="Product price in dollars"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="shipping-charge" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Shipping Charge
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="shipping-charge"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="4.99"
                    value={shipping}
                    onChange={e => setShipping(e.target.value)}
                    aria-label="Shipping charge in dollars"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ece9f0", marginBottom: 24 }} />

          {/* Fee Breakdown */}
          <div style={{ marginBottom: 20 }}>
            <p className="section-label">Fee Breakdown</p>
            <div role="list" aria-label="Fee breakdown">
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Listing Fee <span className="fee-badge">Fixed</span>
                </span>
                <span className="fee-value" aria-label={`Listing fee: ${fmt(fees.listing)}`}>{fmt(fees.listing)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Transaction Fee <span className="fee-badge">6.5%</span>
                </span>
                <span className="fee-value" aria-label={`Transaction fee: ${fmt(fees.transaction)}`}>{fmt(fees.transaction)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Payment Processing <span className="fee-badge">3% + $0.25</span>
                </span>
                <span className="fee-value" aria-label={`Payment processing fee: ${fmt(fees.payment)}`}>{fmt(fees.payment)}</span>
              </div>
            </div>
          </div>

          {/* Total fees */}
          <div className="total-row" style={{ marginBottom: 16 }} role="status" aria-live="polite">
            <span style={{ fontSize: 15, fontWeight: 800, color: "#7c2d12" }}>Total Fees</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, fontWeight: 800, color: "#c94b1a" }}>
              {fmt(fees.total)}
            </span>
          </div>

          {/* Net Revenue */}
          <div className="net-box" role="status" aria-live="polite" aria-label={`Net revenue: ${fmt(Math.max(fees.net, 0))}`}>
            <div>
              <div className="net-label">Your Net Revenue</div>
              <div className="net-sublabel">After all Etsy fees</div>
            </div>
            <div className={`net-value ${fees.net < 0 && parseFloat(price) > 0 ? "negative" : ""}`}>
              {fmt(Math.max(fees.net, 0))}
            </div>
          </div>

          {/* Revenue Summary */}
          <div
            style={{ marginTop: 20, border: "1.5px solid #e5e1f0", borderRadius: 16, padding: 16, background: "#fafaf8" }}
            aria-label="Revenue summary"
          >
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Sale Price (incl. shipping)</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#1a1a2e" }}>
                {fmt((parseFloat(price) || 0) + (parseFloat(shipping) || 0))}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Total Fees</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#c94b1a" }}>
                {fmt(fees.total)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>You Keep</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#155f48" }}>
                {parseFloat(price) > 0 ? `${marginPct.toFixed(1)}%` : "0%"}
              </strong>
            </div>
          </div>

          {/* Margin line */}
          {parseFloat(price) > 0 && (
            <div style={{ marginTop: 12, textAlign: "center" }} role="status" aria-live="polite">
              <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>
                Effective margin:{" "}
                <strong style={{ color: marginPct > 50 ? "#155f48" : "#c94b1a", fontSize: 15 }}>
                  {marginPct.toFixed(1)}%
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
              Etsy charges a <strong>$0.20 listing fee</strong> per item, a <strong>6.5% transaction fee</strong> on
              item price + shipping, and a <strong>3% + $0.25 payment processing fee</strong> per transaction. Fees may vary by country.
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
          Get answers to the most common Etsy fee, transaction fee, listing fee, and profit calculator questions.
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
                  {tool.label.includes("Etsy Profit") ? "📈" :
                   tool.label.includes("Etsy Pricing") ? "🏷️" :
                   tool.label.includes("Amazon") ? "📦" : "🛒"}
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
      <section className="seo-section" style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 80px" }} aria-label="About Etsy fees">
        <h2>What Is an Etsy Fee Calculator?</h2>
        <p>
          An <strong>Etsy fee calculator</strong> is a free tool that helps Etsy sellers instantly calculate the total fees
          Etsy deducts from every sale — including listing fees, transaction fees, and payment processing fees. Instead of
          manually doing the math, you simply enter your product price and shipping charge to see exactly how much you'll
          earn. This Etsy fees calculator is updated for 2025 and reflects Etsy's current published fee structure.
        </p>
        <p>
          Whether you sell handmade jewelry, print-on-demand shirts, digital downloads, or vintage goods, understanding
          your fees before listing helps you price competitively without sacrificing profit.
        </p>

        <h2>How Etsy Fees Work</h2>
        <p>
          Etsy charges sellers three main types of fees on every transaction. These fees are automatically deducted from
          your payment account, so you never see a separate invoice — but you do see reduced payouts if you haven't
          priced your products correctly.
        </p>
        <p>
          The full <strong>Etsy fee formula</strong> is:<br />
          <strong>Total Fees = Listing Fee ($0.20) + Transaction Fee (6.5%) + Payment Processing Fee (3% + $0.25)</strong>
        </p>

        <h2>Etsy Listing Fee</h2>
        <p>
          Etsy charges a flat <strong>$0.20 listing fee</strong> every time you publish or renew a listing. Listings
          remain active for four months. When a listing sells, it auto-renews and another $0.20 fee applies. If you
          sell multiple quantities of the same item, each sale triggers a new $0.20 renewal fee.
        </p>
        <p>
          For sellers with high-volume stores, listing fees can add up quickly. A store selling 500 items per month
          pays $100 in listing fees alone. This is why accurate pricing using an <strong>Etsy profit calculator</strong> matters.
        </p>

        <h2>Etsy Transaction Fee</h2>
        <p>
          The <strong>Etsy transaction fee</strong> is <strong>6.5%</strong> of the total order value, which includes
          both the item price and the shipping charge you collect. This is one of the largest fees Etsy charges and the
          one that most affects your profit margin.
        </p>
        <p>
          For example: if you sell a $30 handmade necklace with $5 shipping, your transaction fee is
          ($30 + $5) × 6.5% = <strong>$2.28</strong>. Many new sellers forget that Etsy fees apply to shipping too,
          which is why this calculator includes shipping in the fee calculation.
        </p>

        <h2>Etsy Payment Processing Fee</h2>
        <p>
          When buyers pay through Etsy Payments (the default checkout), Etsy charges a <strong>payment processing fee
          of 3% + $0.25</strong> per transaction. This fee covers secure payment handling, fraud protection, and
          multi-currency support.
        </p>
        <p>
          The $0.25 fixed portion means this fee has a bigger impact on low-priced items. A $5 digital download
          incurs a $0.40 processing fee — that's 8% of the sale just for payment processing. This is why many
          sellers bundle digital products or price them above $10.
        </p>

        <h2>How To Price Products on Etsy</h2>
        <p>
          Profitable Etsy pricing covers all costs and still delivers a margin you're happy with. A good starting
          framework is:
        </p>
        <ul>
          <li><strong>Materials cost</strong> — raw materials used in the product</li>
          <li><strong>Labor cost</strong> — your time, valued at a fair hourly rate</li>
          <li><strong>Overhead</strong> — tools, packaging, subscriptions, software</li>
          <li><strong>Etsy fees</strong> — use this calculator to estimate the exact amount</li>
          <li><strong>Profit margin</strong> — typically 20–40% above total costs</li>
        </ul>
        <p>
          A common mistake is pricing based on what competitors charge without knowing your own costs. Use this
          <strong> Etsy fee calculator</strong> to reverse-engineer a target sale price from your desired net revenue.
        </p>

        <h2>How To Increase Your Etsy Profit Margin</h2>
        <p>
          There are several proven strategies to improve profitability on Etsy without necessarily raising prices:
        </p>
        <ul>
          <li><strong>Offer free shipping</strong> by building shipping costs into your item price — Etsy rewards free shipping listings with better search placement.</li>
          <li><strong>Bundle products</strong> — selling a $40 bundle vs. two $20 items reduces the per-unit listing and payment processing fees.</li>
          <li><strong>Reduce material waste</strong> — even small savings in materials compound quickly at scale.</li>
          <li><strong>Raise prices gradually</strong> — test price increases of 10–15% and monitor conversion rates.</li>
          <li><strong>Switch to digital products</strong> — no shipping, no materials cost, and the same product can sell thousands of times.</li>
        </ul>

        <h2>Common Etsy Seller Mistakes</h2>
        <p>
          Many Etsy sellers lose money on every sale without realizing it. Here are the most common mistakes to avoid:
        </p>
        <ul>
          <li>Not including Etsy fees in your product pricing</li>
          <li>Forgetting that Etsy charges transaction fees on shipping too</li>
          <li>Underpricing to compete, without knowing your actual costs</li>
          <li>Ignoring the $0.20 auto-renewal fee on high-volume listings</li>
          <li>Pricing the same as competitors without knowing their cost structure</li>
          <li>Not accounting for packaging and shipping supply costs</li>
        </ul>

        <h2>Why Use This Etsy Fee Calculator?</h2>
        <p>
          This free <strong>Etsy fees calculator</strong> was built specifically for Etsy sellers who want clear,
          instant answers without spreadsheets or guesswork. It's updated for 2025, requires no signup, and works
          on any device. The calculator shows you the listing fee, transaction fee, payment processing fee, total
          fees, and your net revenue — all in real time as you type.
        </p>
        <p>
          Unlike basic calculators, this tool also shows your <strong>effective profit margin</strong> as a
          percentage, so you can instantly see whether your pricing is healthy or needs adjustment.
        </p>

        <h2>Etsy Fees Example</h2>
        <p>
          Here's a real-world example showing exactly how Etsy fees are calculated on a typical handmade product sale.
          This breakdown uses the same formula as the <strong>Etsy fee calculator</strong> above.
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
            { label: "Product Price",           value: "$25.00", sub: "Item sale price", color: "#1a1a2e",  bg: "#fafaf8" },
            { label: "Shipping Charge",          value: "$5.00",  sub: "Charged to buyer",  color: "#1a1a2e",  bg: "white" },
            { label: "Listing Fee",              value: "−$0.20", sub: "Fixed per listing", color: "#c94b1a", bg: "#fafaf8" },
            { label: "Transaction Fee (6.5%)",   value: "−$1.95", sub: "6.5% of $30.00",   color: "#c94b1a", bg: "white" },
            { label: "Payment Processing Fee",   value: "−$1.15", sub: "3% of $30 + $0.25", color: "#c94b1a", bg: "#fafaf8" },
            { label: "Total Etsy Fees",          value: "−$3.30", sub: "Sum of all fees",   color: "#7c2d12", bg: "#fff4f0", bold: true },
          ].map(({ label, value, sub, color, bg, bold }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: bg, borderBottom: "1px solid #f0edf8" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: bold ? 800 : 600, color: "#1a1a2e" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>{sub}</div>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: bold ? 800 : 600, color }}>{value}</span>
            </div>
          ))}
          {/* Net Revenue highlight row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", background: "linear-gradient(135deg, #d0ede4, #b8e3d8)" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0f4a35" }}>Net Revenue (You Keep)</div>
              <div style={{ fontSize: 12, color: "#155f48", marginTop: 2 }}>After all Etsy fees are deducted</div>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 800, color: "#0f4a35" }}>$26.70</span>
          </div>
        </div>

        <p>
          In this example, the seller listed a candle for <strong>$25.00</strong> with <strong>$5.00 shipping</strong>,
          making the total order value <strong>$30.00</strong>. Etsy deducted a flat <strong>$0.20 listing fee</strong>,
          a <strong>$1.95 transaction fee</strong> (6.5% × $30), and a <strong>$1.15 payment processing fee</strong>
          (3% × $30 + $0.25). The total Etsy fees came to <strong>$3.30</strong>, leaving a net revenue of <strong>$26.70</strong>
          — an effective margin of <strong>89%</strong> on the product price.
        </p>
        <p>
          Note that the $5 shipping is included in the transaction and payment processing fee calculations but is
          not profit — it covers the actual cost of postage and packaging. This is why it's important to use a
          dedicated <strong>Etsy profit calculator</strong> that separates your true product margin from shipping recovery.
        </p>

        <h2>Final Thoughts</h2>
        <p>
          Running a profitable Etsy shop requires more than creative products — it requires smart financial
          awareness. Etsy seller fees can easily consume 15–20% of your revenue if you're not careful. By using
          this <strong>Etsy fee calculator</strong> before you list, you'll know exactly what you'll earn and can
          price your products with confidence.
        </p>
        <p>
          Bookmark this tool and use it every time you create a new listing. A few seconds of calculation can save
          you from weeks of selling at a loss.
        </p>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1.5px solid #e5e1f0", padding: "28px 16px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <a href="https://www.etsy.com/legal/fees" className="footer-link" target="_blank" rel="noopener noreferrer">How Fees Are Calculated</a>
          <a href="https://www.etsy.com/seller-handbook" className="footer-link" target="_blank" rel="noopener noreferrer">Etsy Seller Handbook</a>
          <a href="https://www.etsy.com/legal/privacy" className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          © 2025 Etsy Fee Calculator · Not affiliated with Etsy, Inc. · Fees shown are estimates only.
        </p>
      </footer>
    </main>
  );
}
