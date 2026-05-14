/**
 * QuoteHero
 * ---------
 * Main display area showing the life cover amount and settlement ratio.
 */

import React from 'react';
import { QUOTE_CONFIG } from '../../constants';
import './QuoteHero.css';

function QuoteHero({ lifeCoverAmount }) {
  const { hero } = QUOTE_CONFIG;

  return (
    <div className="ij-quote-hero">
      <div className="ij-quote-hero__settlement">
        {hero.settlementRatio} <sup>1</sup>
      </div>
      
      <div className="ij-quote-hero__card">
        <div className="ij-quote-hero__amount-group">
          <div className="ij-quote-hero__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 5V11C4 16.1 7.4 20.8 12 22C16.6 20.8 20 16.1 20 11V5L12 2Z"/>
            </svg>
          </div>
          <div className="ij-quote-hero__text">
            <h1 className="ij-quote-hero__amount">{lifeCoverAmount || hero.lifeCoverAmount}</h1>
            <p className="ij-quote-hero__label">{hero.lifeCoverLabel}</p>
          </div>
        </div>
      </div>

      <div className="ij-quote-hero__footer">
        <div className="ij-quote-hero__guarantee">
          <span className="ij-quote-hero__star">⚙</span>
          {hero.guaranteeLabel}
        </div>
        <button className="ij-quote-hero__know-more">{hero.knowMoreLabel}</button>
      </div>
    </div>
  );
}

export default QuoteHero;
