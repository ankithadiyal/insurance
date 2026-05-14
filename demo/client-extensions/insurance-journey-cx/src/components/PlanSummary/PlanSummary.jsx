/**
 * PlanSummary (Step 4)
 * --------------------
 * Final review screen before payment.
 * Validates all payment agreement consents, then calls the API on "Pay Now".
 */

import React, { useState, useMemo } from 'react';
import { SUMMARY_CONFIG } from '../../constants';
import { buildSummaryData } from '../../utils';
import { buildInsurancePayload, submitInsuranceQuote } from '../../services';
import './PlanSummary.css';

function PlanSummary({ formData = {}, quoteSelections = {}, onProceed, onBack }) {
  const {
    pageTitle,
    pageSubtitle,
    downloadBtnLabel,
    planSection,
    premiumBar,
    agreementSection,
    disclaimer,
  } = SUMMARY_CONFIG;

  const [consents, setConsents] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentError, setConsentError] = useState('');

  const agreementRef = React.useRef(null);

  // Derive all display data from collected form inputs.
  const derived = useMemo(
    () => buildSummaryData(formData, quoteSelections),
    [formData, quoteSelections]
  );

  // Build dynamic plan details
  const dynamicPlanDetails = useMemo(() => [
    { label: 'Life Cover', value: `₹${(parseInt(quoteSelections.lifeCover || 10000000) / 10000000)} Cr` },
    { label: 'Cover Till Age', value: derived.coverTillAge, badge: derived.coverTillYear },
    { label: 'Pay Till Age', value: derived.payTillAge, badge: derived.payTillYear },
    { label: 'Premium (1st Year)', value: '₹1,436 Monthly' },
    { label: 'Premium (2nd Year Onwards)', value: '₹1,817 Monthly' },
    { label: 'Special Exit Benefit', value: 'No' },
  ], [derived, quoteSelections]);

  // Build dynamic personal info
  const dynamicPersonalInfo = useMemo(() => [
    { label: 'Full Name', value: derived.userName },
    { label: 'Date of Birth', value: derived.dateOfBirth },
    { label: 'Gender', value: derived.gender },
    { label: 'Tobacco User', value: derived.tobaccoUser },
    { label: 'Annual Income', value: derived.annualIncome },
    { label: 'Mobile Number', value: derived.mobileNumber },
    { label: 'Email ID', value: derived.emailId },
  ], [derived]);

  const toggleConsent = (id) => {
    setConsents((prev) => ({ ...prev, [id]: !prev[id] }));
    setConsentError(''); // Clear error when user interacts
  };

  /** Check if ALL agreement checkboxes are ticked */
  const areAllConsentsGiven = () => {
    return agreementSection.consents.every((c) => consents[c.id] === true);
  };

  /** Handle Pay Now click — validate consents, then call API */
  const handlePayNow = async () => {
    // 1. Validate all consents
    if (!areAllConsentsGiven()) {
      setConsentError('Please accept all payment agreement terms before proceeding.');
      agreementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setConsentError('');
    setIsSubmitting(true);

    try {
      // 2. Build API payload
      const payload = buildInsurancePayload(formData, quoteSelections, derived);
      console.log('Submitting payload:', payload);

      // 3. Call the API
      const response = await submitInsuranceQuote(payload);
      console.log('API Response:', response);

      // 4. Success — notify parent
      if (onProceed) onProceed(response);
    } catch (error) {
      console.error('API Error:', error);
      const message = error?.response?.data?.message
        || error?.message
        || 'Something went wrong. Please try again.';
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ij-summary">
      <div className="ij-summary__container">

        {/* ── Page Header ──────────────────────── */}
        <div className="ij-summary__page-header">
          <div>
            <h1 className="ij-summary__page-title">{pageTitle}</h1>
            <p className="ij-summary__page-subtitle">{pageSubtitle}</p>
          </div>
          <button className="ij-summary__download-btn">
            {downloadBtnLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>

        {/* ── Your Plan Details ────────────────── */}
        <section className="ij-summary__section">
          <div className="ij-summary__section-header">
            <div className="ij-summary__section-header-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <h2>{planSection.title}</h2>
            </div>
            <button className="ij-summary__edit-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              {planSection.editLabel}
            </button>
          </div>

          <div className="ij-summary__section-body">
            <div className="ij-summary__plan-name">{planSection.planName}</div>
            <div className="ij-summary__details-grid">
              {dynamicPlanDetails.map((item, idx) => (
                <div key={idx} className="ij-summary__detail-cell">
                  <span className="ij-summary__detail-label">{item.label}</span>
                  <span className="ij-summary__detail-value">
                    {item.value}
                    {item.badge && (
                      <span className="ij-summary__detail-badge">{item.badge}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Total Premium + Actions ──────────── */}
        <div className="ij-summary__premium-bar">
          <div className="ij-summary__premium-info">
            <span className="ij-summary__premium-label">{premiumBar.label}</span>
            <span className="ij-summary__premium-value">{premiumBar.value}</span>
          </div>
          <div className="ij-summary__premium-actions">
            <button className="ij-summary__back-btn" onClick={onBack} disabled={isSubmitting}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {premiumBar.backLabel}
            </button>
            <button
              className="ij-summary__pay-btn"
              onClick={handlePayNow}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : premiumBar.payLabel}
            </button>
          </div>
        </div>

        {/* ── Personal Info (dynamic) ──────────── */}
        <section className="ij-summary__personal-section">
          <div className="ij-summary__personal-grid">
            {dynamicPersonalInfo.map((field, idx) => (
              <div key={idx} className="ij-summary__personal-cell">
                <span className="ij-summary__personal-label">{field.label}</span>
                <span className="ij-summary__personal-value">{field.value || '—'}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Payment Agreement ────────────────── */}
        <section className="ij-summary__agreement-section" ref={agreementRef}>
          <div className="ij-summary__agreement-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" fill="none" stroke="#fff" strokeWidth="1.5" />
            </svg>
            <h2>{agreementSection.title}</h2>
          </div>

          <div className="ij-summary__agreement-body">
            {agreementSection.consents.map((consent) => (
              <label key={consent.id} className="ij-summary__consent-item">
                <input
                  type="checkbox"
                  className="ij-summary__consent-checkbox"
                  checked={!!consents[consent.id]}
                  onChange={() => toggleConsent(consent.id)}
                />
                <span className="ij-summary__consent-checkmark" />
                <span className="ij-summary__consent-text">
                  {consent.text}
                  {consent.linkText && (
                    <>
                      <br />
                      <a href="#" className="ij-summary__consent-link">{consent.linkText}</a>
                    </>
                  )}
                </span>
              </label>
            ))}

            {/* Consent Validation Error */}
            {consentError && (
              <div className="ij-summary__consent-error">{consentError}</div>
            )}
          </div>
        </section>

        {/* ── Pay Later ────────────────────────── */}
        <p className="ij-summary__pay-later">
          {agreementSection.payLaterText}{' '}
          <a href="#">{agreementSection.payLaterLink}</a>
        </p>

        {/* ── Disclaimer Footer ────────────────── */}
        <div className="ij-summary__disclaimer-section">
          <button className="ij-summary__disclaimer-btn">
            {disclaimer.buttonLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <p className="ij-summary__warning-title">{disclaimer.warningTitle}</p>
          <p className="ij-summary__warning-text">{disclaimer.warningText}</p>

          <button className="ij-summary__spurious-btn">{disclaimer.spuriousLabel}</button>

          <div className="ij-summary__footer-links">
            {disclaimer.footerLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                <a href="#" className="ij-summary__footer-link">{link}</a>
                {idx < disclaimer.footerLinks.length - 1 && (
                  <span className="ij-summary__footer-divider">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanSummary;
