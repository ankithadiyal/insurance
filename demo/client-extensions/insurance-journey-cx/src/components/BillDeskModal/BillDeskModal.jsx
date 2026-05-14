/**
 * BillDeskModal Component
 * JSX-only changes — uses existing BillDeskModal.css classes unchanged.
 */

import React,{ useState } from "react";
import "./BillDeskModal.css";

/* ── SVG Icons (outline, matching screenshot line-style) ────────────── */
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ChevronDown = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="3" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const EmiIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5" />
    <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5" />
    <line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5" />
  </svg>
);
const BankIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);
const WalletIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <circle cx="17" cy="13" r="1" fill="#475569" stroke="none" />
  </svg>
);
const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/* ── Brand logos as inline SVGs ──────────────────────────────────────── */
const VisaLogo = () => (
  <svg width="30" height="11" viewBox="0 0 50 16">
    <rect width="50" height="16" rx="2" fill="#1a1f71" />
    <text x="50%" y="12" textAnchor="middle" fill="white"
      fontSize="11" fontWeight="700" fontFamily="Arial" letterSpacing="1">VISA</text>
  </svg>
);
const MastercardLogo = () => (
  <svg width="22" height="14" viewBox="0 0 34 22">
    <circle cx="12" cy="11" r="10" fill="#eb001b" />
    <circle cx="22" cy="11" r="10" fill="#f79e1b" />
    <path d="M17 5.7a10 10 0 0 1 0 10.6A10 10 0 0 1 17 5.7z" fill="#ff5f00" />
  </svg>
);
const RuPayLogo = () => (
  <svg width="30" height="11" viewBox="0 0 48 16">
    <rect width="48" height="16" rx="2" fill="#1d4ed8" />
    <text x="50%" y="12" textAnchor="middle" fill="white"
      fontSize="8" fontWeight="700" fontFamily="Arial">RuPay</text>
  </svg>
);
const HdfcDot = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="9" fill="#dc2626" />
    <text x="9" y="13" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial">H</text>
  </svg>
);
const SbiDot = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="9" fill="#2563eb" />
    <text x="9" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="800" fontFamily="Arial">SBI</text>
  </svg>
);
const IciciPill = () => (
  <svg width="28" height="13" viewBox="0 0 40 16">
    <rect width="40" height="16" rx="2" fill="#f97316" />
    <text x="20" y="12" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Arial">ICICI</text>
  </svg>
);
const AxisDot = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="9" fill="#7c3aed" />
    <text x="9" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="800" fontFamily="Arial">A</text>
  </svg>
);
const KotakDot = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <rect width="18" height="18" rx="3" fill="#dc2626" />
    <text x="9" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="800" fontFamily="Arial">K</text>
  </svg>
);
const BobDot = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="9" fill="#f97316" />
    <text x="9" y="13" textAnchor="middle" fill="white" fontSize="6" fontWeight="800" fontFamily="Arial">B</text>
  </svg>
);
const PhonePeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#5f259f" />
    <text x="12" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="Arial">P</text>
  </svg>
);
const GpayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
    <text x="12" y="17" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial" fill="#4285f4">G</text>
  </svg>
);
const PaytmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#00b9f5" />
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial">PAY</text>
  </svg>
);
const MobiKwikIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <rect width="24" height="24" rx="6" fill="#00bcd4" />
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial">MK</text>
  </svg>
);

/* UPI: flame + wordmark combined (matches screenshot exactly) */
const UpiLogo = () => (
  <svg width="78" height="26" viewBox="0 0 100 30">
    <defs>
      <linearGradient id="upiFlame" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>
    <path fill="url(#upiFlame)"
      d="M14 2C14 2 8 9 8 15c0 3.3 2.7 6 6 6s6-2.7 6-6
         c0-2.2-1-4-2-5 .7 1.5 1 2.6 1 3.8 0 2.7-2.2 4.9-5 4.9
         S9 16.5 9 13.8C9 10.4 11.8 6.2 14 2z" />
    <text x="24" y="20" fontSize="17" fontWeight="900" fontFamily="Arial" fill="#f97316">UPI</text>
    <text x="56" y="14" fontSize="5.5" fontFamily="Arial" fill="#94a3b8" fontWeight="500">UNIFIED PAYMENTS</text>
    <text x="56" y="21" fontSize="5.5" fontFamily="Arial" fill="#94a3b8" fontWeight="500">INTERFACE</text>
  </svg>
);

/* BillDesk hexagon + wordmark */
const BillDeskLogo = () => (
  <svg width="110" height="26" viewBox="0 0 130 28">
    <defs>
      <linearGradient id="bdHex" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <path fill="url(#bdHex)" d="M13 2l9.5 5.5v11L13 24l-9.5-5.5V7.5L13 2z" />
    <path fill="white" opacity="0.92"
      d="M10 8h4a2.2 2.2 0 1 1 0 4.4H10V8zm0 4.4h4.5a2.2 2.2 0 1 1 0 4.4H10v-4.4z" />
    <text x="30" y="19" fontSize="14" fontWeight="800" fontFamily="Arial"
      fill="#f97316" letterSpacing="-0.3">BillDesk</text>
  </svg>
);

/* ── Component ─────────────────────────────────────────────────────── */
function BillDeskModal({ isOpen, onClose, amount, orderId }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const displayOrderId = `ORD${orderId}`;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(displayOrderId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const paymentMethods = [
    {
      id: "cards",
      icon: <CardIcon />,
      label: "Credit / Debit Cards",
      logos: [<VisaLogo key="visa" />, <MastercardLogo key="mc" />, <RuPayLogo key="rp" />],
      expandable: false,
    },
    {
      id: "emi",
      icon: <EmiIcon />,
      label: "EMI",
      logos: [<HdfcDot key="hdfc" />, <SbiDot key="sbi" />, <IciciPill key="icici" />],
      expandable: true,
    },
    {
      id: "netbanking",
      icon: <BankIcon />,
      label: "Net Banking",
      logos: [<AxisDot key="axis" />, <KotakDot key="kotak" />, <BobDot key="bob" />],
      expandable: true,
    },
    {
      id: "upi",
      icon: null,
      label: null,
      logos: [<PhonePeIcon key="pp" />, <GpayIcon key="gp" />, <PaytmIcon key="pt" />],
      expandable: false,
      isUpi: true,
    },
    {
      id: "wallets",
      icon: <WalletIcon />,
      label: "Wallets",
      logos: [<MobiKwikIcon key="mk" />],
      expandable: true,
    },
  ];

  return (
    <div className="bd-overlay">
      <div className="bd-modal">

        {/* Header */}
        <div className="bd-header">
          <button className="bd-back-btn" onClick={onClose} aria-label="Go back">
            <ChevronLeft />
          </button>
          <div className="bd-merchant">
            <div className="bd-logo-circle">PL</div>
            <div className="bd-merchant-info">
              <span className="bd-merchant-name">PNB MetLife India Insurance Co...</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bd-order-summary">
          <div className="bd-summary-row">
            <span className="bd-label">Order ID</span>
            <span className="bd-value">
              {displayOrderId}
              <button
                onClick={handleCopy}
                title={copied ? "Copied!" : "Copy"}
                style={{ background: "none", border: "none", padding: "2px 0 0", cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <CopyIcon />
              </button>
            </span>
          </div>
          <div className="bd-summary-row bd-summary-row--total">
            <span className="bd-label">Total Amount</span>
            <span className="bd-value">₹{amount}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bd-content">
          <h3 className="bd-section-title">Payment Methods</h3>
          <div className="bd-methods-list">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bd-method-item">
                <div className="bd-method-left">
                  {method.isUpi ? (
                    <>
                      <span className="bd-method-icon"><UpiLogo /></span>
                      <div className="bd-method-logos">{method.logos}</div>
                    </>
                  ) : (
                    <>
                      <span className="bd-method-icon">{method.icon}</span>
                      <span className="bd-method-label">{method.label}</span>
                      <div className="bd-method-logos">{method.logos}</div>
                    </>
                  )}
                </div>
                <div className="bd-method-right">
                  {method.expandable ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bd-footer">
          <BillDeskLogo />
        </div>

      </div>
    </div>
  );
}

export default BillDeskModal;
