/**
 * QuoteHeader
 * -----------
 * Top header with current payment summary and user info.
 * Accepts dynamic userName and userAge from props.
 */

import React from 'react';
import { QUOTE_CONFIG } from '../../constants';
import './QuoteHeader.css';

function QuoteHeader({ userName, userAge, amount, duration }) {
  const { header } = QUOTE_CONFIG;

  return (
    <div className="ij-quote-header">
      <div className="ij-quote-header__pay-info">
        <span className="ij-quote-header__label">{header.youPayPrefix}</span>
        <span className="ij-quote-header__amount">{amount || header.amount}</span>
        <span className="ij-quote-header__duration">{duration || header.duration}</span>
        <button className="ij-quote-header__info-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="ij-quote-header__user-info">
        <span className="ij-quote-header__user-name">{userName || header.userName}</span>
        <span className="ij-quote-header__divider">|</span>
        <span className="ij-quote-header__user-age">{userAge || header.userAge}</span>
        <svg className="ij-quote-header__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

export default QuoteHeader;
