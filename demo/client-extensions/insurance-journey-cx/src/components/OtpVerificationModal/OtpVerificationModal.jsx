/**
 * OtpVerificationModal
 * --------------------
 * Modal popup for OTP verification.
 */

import React, { useState } from 'react';
import { OtpInput } from '../index';
import {
  OTP_TITLE,
  OTP_SUBTITLE,
  OTP_MASKED_NUMBER,
  OTP_RESEND_TEXT,
  OTP_RESEND_LINK,
  OTP_SUBMIT_LABEL,
  OTP_LENGTH,
} from '../../constants';
import './OtpVerificationModal.css';

function OtpVerificationModal({ isOpen, onClose, onVerify }) {
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === OTP_LENGTH) {
      onVerify(otp);
    }
  };

  return (
    <div className="ij-modal-overlay">
      <div className="ij-modal-card" role="dialog" aria-modal="true" aria-labelledby="otp-title">
        <button className="ij-modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <h2 className="ij-modal-title" id="otp-title">{OTP_TITLE}</h2>
        
        <p className="ij-modal-subtitle">
          {OTP_SUBTITLE}
          <span className="ij-modal-number">{OTP_MASKED_NUMBER}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <OtpInput length={OTP_LENGTH} value={otp} onChange={setOtp} />

          <p className="ij-modal-resend">
            {OTP_RESEND_TEXT} <a href="#resend" className="ij-modal-link">{OTP_RESEND_LINK}</a>
          </p>

          <button
            type="submit"
            className={`ij-modal-submit ${otp.length === OTP_LENGTH ? 'ij-modal-submit--active' : ''}`}
            disabled={otp.length !== OTP_LENGTH}
          >
            {OTP_SUBMIT_LABEL}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerificationModal;
