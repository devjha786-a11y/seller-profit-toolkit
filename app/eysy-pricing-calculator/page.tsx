"use client";

import { useState, useEffect } from "react";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What is an Etsy Pricing Calculator?",
    a: "An Etsy Pricing Calculator helps you determine the ideal selling price for your Etsy products. You enter your product cost, shipping cost, and desired profit — and the calculator works out the recommended sale price that covers all Etsy fees and still delivers your target profit.",
  },
  {
    q: "How do I calculate the right selling price on Etsy?",
    a: "The recommended Etsy selling price = (Product Cost + Shipping Cost + Desired Profit + $0.45) ÷ (1 − 0.095). This formula accounts for Etsy's listing fee, 6.5% transaction fee, and 3% + $0.25 payment processing fee so your desired profit is protected.",
  },
  {
    q: "How do Etsy fees affect my selling price?",
    a: "Etsy deducts a $0.20 listing fee, a 6.5% transaction fee on the sale price, and a 3% + $0.25 payment processing fee per order. Together these typically consume 9.5–12% of your sale price, which is why you need to price above your costs to preserve profit.",
  },
  {
    q: "What is a good profit margin for Etsy sellers?",
    a: "A healthy Etsy profit margin is 30–50% or more. Margins below 20% are fragile — any increase in material costs or shipping rates can quickly turn a sale into a loss. Digital products often achieve the highest margins since they have zero shipping cost.",
  },
  {
    q: "Should I include shipping in my Etsy product price?",
    a: "Many top Etsy sellers build shipping costs into the item price and offer free shipping. Etsy's algorithm also favors free-shipping listings in search results. This calculator lets you enter your actual shipping cost so the recommended price already covers it.",
  },
  {
    q: "How do I set prices on Etsy to be competitive and profitable?",
    a: "Start from your costs (product + shipping), add your desired profit, then run the result through this calculator to get a recommended price that covers Etsy fees. Compare that price against competitors — if it's higher, look for ways to reduce material or shipping costs.",
  },
  {
    q: "Why is my Etsy selling price higher than I expected?",
    a: "Etsy's combined fee rate is roughly 9.5–10% of the sale price, plus a fixed $0.45 in listing and payment charges. The recommended price must be high enough that after these deductions you still receive your desired profit. Pricing below this means Etsy fees erode your target margin.",
  },
  {
    q: "How can I improve my Etsy profit margin without raising prices?",
    a: "Reduce product cost by buying materials in bulk, streamline packaging to cut shipping weight, bundle products into higher-value listings to dilute fixed fees, or add digital products that have near-100% margin after Etsy fees.",
  },
  {
    q: "Are digital products priced differently on Etsy?",
    a: "Digital products have zero product cost and zero shipping cost, so you enter $0 for both. The recommended price then only needs to cover Etsy fees plus your desired profit, which typically means very high profit margins — often 80%+ for digital downloads.",
  },
];

export default function EtsyPricingCalculator() {
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
    name: "Etsy Pricing Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Etsy Pricing Calculator",
    description:
      "Free Etsy pricing calculator. Enter your product cost, shipping cost, and desired profit to instantly calculate the ideal Etsy selling price. Updated for 2025.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: "https://sellerprofittoolkit.com/etsy-pricing-calculator",
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
        name: "Etsy Pricing Calculator",
        item: "https://yoursite.com/etsy-pricing-calculator",
      },
    ],
  };

  // ─── STATE ─────────────────────────────────────────────────────────────────
  const [productCost, setProductCost] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<string>("");
  const [desiredProfit, setDesiredProfit] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [result, setResult] = useState({
    recommendedPrice: 0,
    transactionFee: 0,
    paymentFee: 0,
    listingFee: 0.2,
    totalFees: 0,
    profit: 0,
    margin: 0,
  });

  useEffect(() => {
    const cost = parseFloat(productCost) || 0;
    const shipping = parseFloat(shippingCost) || 0;
    const profit = parseFloat(desiredProfit) || 0;

    const recommendedPrice = (cost + shipping + profit + 0.20 + 0.25) / (1 - 0.095);
    const transactionFee = recommendedPrice * 0.065;
    const paymentFee = recommendedPrice * 0.03 + 0.25;
    const listingFee = 0.2;
    const totalFees = transactionFee + paymentFee + listingFee;
    const margin = recommendedPrice > 0 ? (profit / recommendedPrice) * 100 : 0;

    setResult({
      recommendedPrice,
      transactionFee,
      paymentFee,
      listingFee,
      totalFees,
      profit,
      margin,
    });
  }, [productCost, shippingCost, desiredProfit]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const hasInput = parseFloat(desiredProfit) > 0 || parseFloat(productCost) > 0;

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
    { label: "👕 T-Shirt", cost: "10", shipping: "5",  profit: "15" },
    { label: "💍 Jewelry", cost: "15", shipping: "6",  profit: "25" },
    { label: "📄 Digital", cost: "0",  shipping: "0",  profit: "20" },
  ];

  // ─── SELLER TOOLS ──────────────────────────────────────────────────────────
  const sellerTools = [
    { label: "Etsy Profit Calculator",    icon: "📈", current: false },
    { label: "Etsy Pricing Calculator",   icon: "🏷️", current: true  },
    { label: "Amazon FBA Calculator",     icon: "📦", current: false },
    { label: "Shopify Profit Calculator", icon: "🛒", current: false },
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

        /* RECOMMENDED PRICE BOX */
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
      <section className="hero-bg relative z-0 py-20 px-6 text-center" aria-label="Etsy Pricing Calculator hero">
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
            Etsy Pricing
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
            Calculate the ideal Etsy selling price based on your<br />
            product cost, shipping cost, and desired profit.
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
          <li aria-current="page" style={{ color: "#1a1a2e", fontWeight: 600 }}>Etsy Pricing Calculator</li>
        </ol>
      </nav>

      {/* ── CALCULATOR CARD ──────────────────────────────────────────────── */}
      <section className="relative z-10 px-4 pb-12" style={{ marginTop: -32 }} aria-label="Pricing calculator">
        <div className="card calc-card mx-auto p-8" style={{ maxWidth: 800 }}>

          {/* Inputs */}
          <div style={{ marginBottom: 28 }}>
            <p className="section-label">Your Numbers</p>

            {/* Quick-fill buttons */}
            <div role="group" aria-label="Quick fill examples" style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {quickExamples.map(({ label, cost, shipping, profit }) => (
                <button
                  key={label}
                  onClick={() => {
                    setProductCost(cost);
                    setShippingCost(shipping);
                    setDesiredProfit(profit);
                  }}
                  style={exampleBtn}
                  aria-label={`Fill example: ${label}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="inputs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
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

              <div>
                <label htmlFor="desired-profit" style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", display: "block", marginBottom: 6 }}>
                  Desired Profit
                </label>
                <div className="input-wrap">
                  <span className="input-prefix" aria-hidden="true">$</span>
                  <input
                    id="desired-profit"
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="15.00"
                    value={desiredProfit}
                    onChange={e => setDesiredProfit(e.target.value)}
                    aria-label="Desired profit in dollars"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#ece9f0", marginBottom: 24 }} />

          {/* Fee Breakdown */}
          <div style={{ marginBottom: 20 }}>
            <p className="section-label">Estimated Etsy Fees</p>
            <div role="list" aria-label="Etsy fee breakdown">
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Listing Fee <span className="fee-badge">Fixed</span>
                </span>
                <span className="fee-value">{fmt(result.listingFee)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Transaction Fee <span className="fee-badge">6.5%</span>
                </span>
                <span className="fee-value">{fmt(result.transactionFee)}</span>
              </div>
              <div className="fee-row" role="listitem">
                <span className="fee-label">
                  Payment Processing <span className="fee-badge">3% + $0.25</span>
                </span>
                <span className="fee-value">{fmt(result.paymentFee)}</span>
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

          {/* Recommended Selling Price */}
          <div className="price-box" role="status" aria-live="polite" aria-label={`Recommended selling price: ${fmt(result.recommendedPrice)}`}>
            <div>
              <div className="price-label">Recommended Selling Price</div>
              <div className="price-sublabel">Price needed to achieve your target profit</div>
            </div>
            <div className="price-value">{fmt(hasInput ? result.recommendedPrice : 0)}</div>
          </div>

          {/* Summary breakdown */}
          <div
            style={{ marginTop: 20, border: "1.5px solid #e5e1f0", borderRadius: 16, padding: 16, background: "#fafaf8" }}
            aria-label="Pricing summary"
          >
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Recommended Price</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#1a1a2e" }}>
                {fmt(hasInput ? result.recommendedPrice : 0)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Estimated Etsy Fees</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#c94b1a" }}>
                {fmt(result.totalFees)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Desired Profit</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: "#155f48" }}>
                {fmt(result.profit)}
              </strong>
            </div>
            <div className="fee-row">
              <span style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>Profit Margin</span>
              <strong style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: result.margin >= 20 ? "#155f48" : "#c94b1a" }}>
                {hasInput ? `${result.margin.toFixed(1)}%` : "0%"}
              </strong>
            </div>
          </div>

          {/* Margin health indicator */}
          {hasInput && (
            <div style={{ marginTop: 12, textAlign: "center" }} role="status" aria-live="polite">
              <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>
                Profit margin:{" "}
                <strong style={{
                  color: result.margin >= 30 ? "#155f48" : result.margin >= 15 ? "#b45309" : "#991b1b",
                  fontSize: 15,
                }}>
                  {result.margin.toFixed(1)}%
                </strong>
                {" "}
                <span style={{ fontSize: 13, color: "#9ca3af" }}>
                  {result.margin >= 30 ? "✓ Healthy" : result.margin >= 15 ? "⚠ Low" : "✗ Very low"}
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
              The recommended price ensures your <strong>desired profit</strong> is fully preserved after Etsy deducts
              a <strong>$0.20 listing fee</strong>, a <strong>6.5% transaction fee</strong>, and a <strong>3% + $0.25
              payment processing fee</strong>. Fees may vary slightly by country.
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
          Get answers to the most common Etsy pricing, selling price, and profit margin questions.
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
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "4px 10px", borderRadius: 999, background: "linear-gradient(90deg, #fef3c7, #fde68a)", color: "#92400e", border: "1px solid #fcd34d" }}>
                    COMING SOON
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
      <section className="seo-section" style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 80px" }} aria-label="About Etsy pricing">

        <h2>What Is an Etsy Pricing Calculator?</h2>
        <p>
          An <strong>Etsy pricing calculator</strong> helps Etsy sellers determine the correct selling price for
          their products. Instead of guessing or copying competitor prices, you enter your actual product cost,
          shipping cost, and desired profit — and the calculator tells you exactly what price to set so that after
          Etsy deducts all its fees, your target profit is fully preserved.
        </p>
        <p>
          This free tool is updated for 2025, works on any device, and requires no account. It's designed for
          handmade sellers, print-on-demand shops, vintage resellers, and digital product creators who want
          data-driven <strong>Etsy product pricing</strong>.
        </p>

        <h2>How to Calculate Your Etsy Selling Price</h2>
        <p>
          The <strong>Etsy selling price formula</strong> used by this calculator is:
        </p>
        <p>
          <strong>Recommended Price = (Product Cost + Shipping Cost + Desired Profit + $0.45) ÷ (1 − 0.095)</strong>
        </p>
        <p>
          The $0.45 accounts for the fixed listing fee ($0.20) and fixed payment processing charge ($0.25).
          The 0.095 (9.5%) accounts for the combined variable rate of the 6.5% transaction fee and 3% payment
          processing rate. Dividing by (1 − 0.095) ensures your desired profit is protected even after Etsy
          takes its percentage cut.
        </p>

        <h2>How Etsy Fees Affect Your Selling Price</h2>
        <p>
          Many sellers price based on product cost plus a rough markup, without accounting for Etsy fees. This
          is one of the most expensive mistakes on the platform. Etsy's three fees together consume:
        </p>
        <ul>
          <li><strong>Listing fee ($0.20)</strong> — fixed per listing, charged on publish and auto-renewal</li>
          <li><strong>Transaction fee (6.5%)</strong> — percentage of your sale price</li>
          <li><strong>Payment processing fee (3% + $0.25)</strong> — percentage plus fixed charge per order</li>
        </ul>
        <p>
          On a $35 item, Etsy's combined fees are approximately $3.55. If you priced that item expecting to
          keep $35 minus your costs, you'd actually receive $31.45 — a significant gap if you hadn't
          planned for it. The <strong>Etsy pricing calculator</strong> above eliminates this problem.
        </p>

        <h2>Etsy Pricing Strategy for Sellers</h2>
        <p>
          A sustainable <strong>Etsy pricing strategy</strong> starts with cost-based pricing, not
          competitor-based pricing. Here's a proven framework:
        </p>
        <ul>
          <li><strong>Calculate your true product cost</strong> — materials, supplies, labor (your time has value)</li>
          <li><strong>Calculate your true shipping cost</strong> — postage, packaging materials, time to pack</li>
          <li><strong>Set a target profit</strong> — aim for at least 30% profit margin on your sale price</li>
          <li><strong>Use this calculator</strong> — get the exact recommended price that hits your target</li>
          <li><strong>Compare to market</strong> — if your recommended price is above market, reduce costs; if below, consider raising it</li>
        </ul>

        <h2>Etsy Pricing Examples</h2>
        <p>
          Here's how three common Etsy product types work through the pricing calculator:
        </p>

        <div style={{ background: "white", borderRadius: 18, border: "1.5px solid #e5e1f0", overflow: "hidden", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", padding: "16px 24px" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>📊 Etsy Pricing Examples — 2025</span>
          </div>
          {[
            { product: "👕 T-Shirt",  cost: "$10.00", ship: "$5.00",  profit: "$15.00", price: "$33.15", margin: "45.3%" },
            { product: "💍 Jewelry",  cost: "$15.00", ship: "$6.00",  profit: "$25.00", price: "$50.88", margin: "49.1%" },
            { product: "📄 Digital",  cost: "$0.00",  ship: "$0.00",  profit: "$20.00", price: "$22.65", margin: "88.3%" },
          ].map((row, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr 1fr", padding: "14px 24px", borderBottom: "1px solid #f0edf8", background: i % 2 === 0 ? "#fafaf8" : "white", fontSize: 13, fontWeight: 600, color: "#374151", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: "#1a1a2e" }}>{row.product}</span>
              <span>{row.cost}</span>
              <span>{row.ship}</span>
              <span style={{ color: "#155f48" }}>{row.profit}</span>
              <span style={{ color: "#6d28d9", fontFamily: "'DM Mono', monospace" }}>{row.price}</span>
              <span style={{ color: "#155f48" }}>{row.margin}</span>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr 1fr", padding: "10px 24px", background: "#f5f3ff", fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <span>Product</span><span>Cost</span><span>Shipping</span><span>Profit</span><span>List Price</span><span>Margin</span>
          </div>
        </div>

        <h2>Common Etsy Pricing Mistakes</h2>
        <p>
          Even experienced Etsy sellers make pricing errors that cost them money on every sale. The most
          common mistakes include:
        </p>
        <ul>
          <li>Pricing based on competitor listings without knowing their cost structure</li>
          <li>Forgetting to include labor cost — your time is a real expense</li>
          <li>Not accounting for Etsy's 6.5% transaction fee in the selling price</li>
          <li>Ignoring the $0.20 listing renewal fee, especially on high-volume products</li>
          <li>Undercharging for shipping and absorbing the loss on every order</li>
          <li>Setting prices too low during launch and never raising them for fear of losing sales</li>
          <li>Pricing the same for high-effort and low-effort products instead of using margin targets</li>
        </ul>

        <h2>How to Price Digital Products on Etsy</h2>
        <p>
          Digital products are the easiest to price profitably on Etsy because product cost and shipping cost
          are both zero. Enter $0 for both fields and just set your desired profit — the calculator will show
          you the minimum price to charge.
        </p>
        <p>
          A $20 digital product typically generates $17–$18 in profit after Etsy fees, giving you an
          87%+ profit margin. This is why many sellers use digital products as their highest-margin offering
          alongside handmade physical goods.
        </p>

        <h2>How to Improve Your Etsy Profit Margin</h2>
        <p>
          If your recommended price is higher than what the market will bear, you have two levers to pull:
          reduce costs or reduce your profit target. Here are practical ways to reduce costs without
          compromising quality:
        </p>
        <ul>
          <li><strong>Buy materials in bulk</strong> — unit cost drops significantly at higher quantities</li>
          <li><strong>Optimize packaging</strong> — lighter packaging = lower actual shipping cost</li>
          <li><strong>Offer free shipping</strong> — build shipping into your price; Etsy boosts free-shipping listings</li>
          <li><strong>Create product bundles</strong> — higher order value dilutes the fixed $0.45 in fees</li>
          <li><strong>Streamline production</strong> — reducing labor hours per unit directly increases margin</li>
        </ul>

        <h2>Why Use This Etsy Pricing Calculator?</h2>
        <p>
          This free <strong>Etsy selling price calculator</strong> was built for sellers who want accurate,
          instant results without spreadsheets. Enter three numbers — product cost, shipping cost, and desired
          profit — and get a recommended selling price that guarantees your profit target even after Etsy's fees
          are deducted. No guessing, no undercutting yourself.
        </p>
        <p>
          The tool also shows your projected profit margin, fee breakdown, and a health indicator so you can
          immediately see whether your pricing is sustainable or needs adjustment.
        </p>

        <h2>Final Thoughts on Etsy Pricing</h2>
        <p>
          Pricing is one of the most important decisions an Etsy seller makes. Set your price too low and you
          work hard for little return. Set it too high and you lose sales. The key is knowing your exact costs,
          understanding Etsy's fee structure, and using a data-driven tool like this <strong>Etsy pricing
          calculator</strong> to find the number that works for both you and your customers.
        </p>
        <p>
          Use the quick-fill examples above to see how different product types are priced, and revisit your
          pricing every time your material or shipping costs change.
        </p>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1.5px solid #e5e1f0", padding: "28px 16px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 10 }}>
          <a href="https://www.etsy.com/legal/fees" className="footer-link" target="_blank" rel="noopener noreferrer">How Etsy Fees Work</a>
          <a href="https://www.etsy.com/seller-handbook" className="footer-link" target="_blank" rel="noopener noreferrer">Etsy Seller Handbook</a>
          <a href="https://www.etsy.com/legal/privacy" className="footer-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, fontWeight: 500 }}>
          © 2025 Etsy Pricing Calculator · Not affiliated with Etsy, Inc. · Results are estimates only.
        </p>
      </footer>
    </main>
  );
}
