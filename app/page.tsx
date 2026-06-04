"use client";

import { useState, useEffect } from "react";

export default function EtsyFeeCalculator() {
  const [price, setPrice] = useState<string>("");
  const [shipping, setShipping] = useState<string>("");
  const [fees, setFees] = useState({
    transaction: 0,
    payment: 0,
    listing: 0.2,
    total: 0,
    net: 0,
  });

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

  return (
    <main className="min-h-screen bg-[#f5f4f0] font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --ink: #1a1a2e;
          --cream: #f5f4f0;
          --rust: #e8572a;
          --rust-light: #fef0eb;
          --emerald: #1a7a5e;
          --emerald-light: #d4f0e8;
          --sky: #2563eb;
          --violet: #7c3aed;
          --mist: #e8e6e0;
        }

        * { box-sizing: border-box; }

        .hero-bg {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(124,58,237,0.25) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 50% at 20% 80%, rgba(37,99,235,0.2) 0%, transparent 50%);
        }

        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .grid-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08), 0 32px 64px rgba(0,0,0,0.06);
        }

        .input-field {
          width: 100%;
          padding: 14px 16px 14px 44px;
          border: 2px solid #e8e6e0;
          border-radius: 14px;
          font-size: 17px;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          color: var(--ink);
          background: #fafaf8;
          transition-all duration-300ms;
          outline: none;
          -moz-appearance: textfield;
        }

        .input-field::-webkit-outer-spin-button,
        .input-field::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }

        .input-field:focus {
          border-color: var(--violet);
          background: white;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.1);
        }

        .input-field::placeholder {
          color: #c0bdb6;
          font-weight: 400;
        }

        .input-wrap {
          position: relative;
        }

        .input-prefix {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-family: 'DM Mono', monospace;
          font-size: 16px;
          font-weight: 500;
          color: #9794ae;
          pointer-events: none;
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #f0eee8;
        }

        .fee-row:last-child { border-bottom: none; }

        .fee-label {
          font-size: 14px;
          color: #6b6880;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fee-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 999px;
          background: #f0eee8;
          color: #9794ae;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .fee-value {
          font-family: 'DM Mono', monospace;
          font-size: 15px;
          font-weight: 500;
          color: var(--ink);
        }

        .net-box {
          background: linear-gradient(135deg, #d4f0e8 0%, #c8ede3 100%);
          border: 2px solid #1a7a5e22;
          border-radius: 18px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .net-label {
          font-size: 16px;
          font-weight: 700;
          color: var(--emerald);
        }

        .net-value {
          font-family: 'DM Mono', monospace;
          font-size: 28px;
          font-weight: 700;
          color: var(--emerald);
          letter-spacing: -0.02em;
        }

        .net-value.negative {
          color: #c0392b;
        }

        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
        }

        .trust-badge .check {
          width: 18px;
          height: 18px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          flex-shrink: 0;
        }

        .divider {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.2);
        }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9794ae;
          margin-bottom: 8px;
        }

        .total-row {
          background: #fafaf8;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .footer-link {
          color: #9794ae;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover { color: var(--ink); }

        @media (max-width: 640px) {
          .hero-title { font-size: 36px !important; }
          .trust-row { flex-wrap: wrap; gap: 10px; justify-content: center; }
          .divider { display: none; }
        }
      `}</style>

      {/* HERO */}
      <section className="hero-bg relative z-0 py-20 px-6 text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="pulse-dot"></span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
              Live Calculator — No Signup Needed
            </span>
          </div>

          {/* Heading */}
          <h1
            className="hero-title font-extrabold text-white mb-5 leading-[1.05] tracking-tight"
            style={{ fontSize: 52 }}
          >
            Etsy Fee
            <br />
            <span style={{
              background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Calculator (2025)
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", fontWeight: 400, lineHeight: 1.6, marginBottom: 32 }}>
            Calculate your Etsy fees and profit instantly.<br />
            Know exactly what you earn before you list.
          </p>

          {/* Trust badges */}
          <div className="trust-row flex items-center justify-center gap-5">
            {["Free Tool", "No Signup Required", "Updated for 2025"].map((t, i) => (
              <div key={t} className="flex items-center">
                {i > 0 && <div className="divider" key={`div-${i}`} />}
                <span className="trust-badge" key={t}>
                  <span className="check">✓</span>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARD */}
      <section className="relative z-10 px-4 pb-20" style={{ marginTop: -40 }}>
        <div className="card max-w-2xl mx-auto p-8">

          {/* Inputs */}
          <div style={{ marginBottom: 28 }}>
            <p className="section-label">Your Pricing</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#4b4860", display: "block", marginBottom: 6 }}>
                  Product Price
                </label>
                <div className="input-wrap">
                  <span className="input-prefix">$</span>
                  <input
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="29.99"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#4b4860", display: "block", marginBottom: 6 }}>
                  Shipping Charge
                </label>
                <div className="input-wrap">
                  <span className="input-prefix">$</span>
                  <input
                    className="input-field"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="4.99"
                    value={shipping}
                    onChange={e => setShipping(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#f0eee8", marginBottom: 24 }} />

          {/* Fee Breakdown */}
          <div style={{ marginBottom: 20 }}>
            <p className="section-label">Fee Breakdown</p>

            <div className="fee-row">
              <span className="fee-label">
                Listing Fee
                <span className="fee-badge">Fixed</span>
              </span>
              <span className="fee-value">{fmt(fees.listing)}</span>
            </div>

            <div className="fee-row">
              <span className="fee-label">
                Transaction Fee
                <span className="fee-badge">6.5%</span>
              </span>
              <span className="fee-value">{fmt(fees.transaction)}</span>
            </div>

            <div className="fee-row">
              <span className="fee-label">
                Payment Processing
                <span className="fee-badge">3% + $0.25</span>
              </span>
              <span className="fee-value">{fmt(fees.payment)}</span>
            </div>
          </div>

          {/* Total fees */}
          <div className="total-row" style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#4b4860" }}>Total Fees</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700, color: "#e8572a" }}>
              {fmt(fees.total)}
            </span>
          </div>

          {/* Net Revenue */}
          <div className="net-box">
            <div>
              <div className="net-label">Your Net Revenue</div>
              <div style={{ fontSize: 12, color: "#1a7a5e", marginTop: 2, opacity: 0.7 }}>
                After all Etsy fees
              </div>
            </div>
            <div className={`net-value ${fees.net < 0 && (parseFloat(price) > 0) ? "negative" : ""}`}>
              {fmt(Math.max(fees.net, 0))}
            </div>
          </div>

          {/* Margin line */}
          {parseFloat(price) > 0 && (
            <div style={{ marginTop: 12, textAlign: "center" }}>
              <span style={{ fontSize: 13, color: "#9794ae" }}>
                Effective margin:{" "}
                <strong style={{ color: fees.net / parseFloat(price) > 0.5 ? "#1a7a5e" : "#e8572a" }}>
                  {((fees.net / parseFloat(price)) * 100).toFixed(1)}%
                </strong>
              </span>
            </div>
          )}
        </div>

        {/* Info card */}
        <div className="max-w-xl mx-auto mt-4 px-4">
          <div style={{
            background: "white",
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)"
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "#ede9fe",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 16
            }}>ℹ️</div>
            <div>
              <p style={{ fontSize: 13, color: "#4b4860", lineHeight: 1.6, margin: 0 }}>
                Etsy charges a <strong>$0.20 listing fee</strong> per item, a <strong>6.5% transaction fee</strong> on
                item price + shipping, and a <strong>3% + $0.25 payment processing fee</strong> per transaction.
                Fees may vary by country.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 30,
            textAlign: "center",
            color: "#1a1a2e",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "grid", gap: 24 }}>
          <div>
            <h3 style={{ color: "#022777",fontWeight: 700, marginBottom: 8 }}>
              What fees does Etsy charge?
            </h3>
            <p style={{ color: "#4b5563", lineHeight: 1.8,fontSize: 16, }}>
              Etsy charges a $0.20 listing fee, a 6.5% transaction fee,
              and payment processing fees.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#022777",fontWeight: 700, marginBottom: 8 }}>
              How is Etsy transaction fee calculated?
            </h3>
            <p style={{ color: "#4b5563", lineHeight: 1.8,fontSize: 16, }}>
              Etsy charges 6.5% on the total order value including shipping.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#022777",fontWeight: 700, marginBottom: 8 }}>
              Does Etsy charge fees on shipping?
            </h3>
            <p style={{ color: "#4b5563", lineHeight: 1.8,fontSize: 16, }}>
              Yes. Etsy applies transaction fees on both item price and shipping amount.
            </p>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e8e6e0", padding: "24px 16px", textAlign: "center" }}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">How fees are calculated</a>
          <a href="#" className="footer-link">Etsy Seller Handbook</a>
        </div>
        <p style={{ fontSize: 12, color: "#c0bdb6", margin: 0 }}>
          © 2025 Etsy Fee Calculator (2025) · Not affiliated with Etsy, Inc.
        </p>
      </footer>
    </main>
  );
}
