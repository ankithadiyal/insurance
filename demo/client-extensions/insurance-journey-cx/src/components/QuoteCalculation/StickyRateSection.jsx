/**
 * StickyRateSection
 * -----------------
 * A sticky bar at the bottom that displays the current rate and proceed button.
 */

import React from 'react';
import { QUOTE_CONFIG } from '../../constants';
import './StickyRateSection.css';

function StickyRateSection({ price, frequency, onProceed }) {
  const { stickyRate } = QUOTE_CONFIG;

  return (
    <div className="ij-sticky-rate">
      <div className="ij-sticky-rate__container">
        <div className="ij-sticky-rate__info">
          <div className="ij-sticky-rate__label-group">
            <span className="ij-sticky-rate__label">{stickyRate.label}</span>
            <div className="ij-sticky-rate__prices">
              <span className="ij-sticky-rate__current">{price || stickyRate.currentPrice}</span>
              <span className="ij-sticky-rate__original">| {stickyRate.originalPrice}</span>
              <span className="ij-sticky-rate__frequency">{frequency || stickyRate.frequency}</span>
            </div>
          </div>
          <div className="ij-sticky-rate__sub-group">
            <span className="ij-sticky-rate__sub-text">{stickyRate.subText}</span>
            <button className="ij-sticky-rate__breakup-btn">{stickyRate.viewBreakup}</button>
          </div>
        </div>

        <div className="ij-sticky-rate__actions">
          <button className="ij-sticky-rate__proceed-btn" onClick={onProceed}>
            {stickyRate.proceedLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyRateSection;
