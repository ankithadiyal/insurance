/**
 * PaymentOptions
 * --------------
 * Renders the selectable payment plan cards.
 */

import React from 'react';
import { QUOTE_CONFIG } from '../../constants';
import './PaymentOptions.css';

function PaymentOptions({ selectedId, options, onSelect }) {
  const { paymentOptions } = QUOTE_CONFIG;

  const renderOption = (option) => (
    <div
      key={option.id}
      className={`ij-payment-card ${selectedId === option.id ? 'ij-payment-card--selected' : ''}`}
      onClick={() => onSelect(option.id)}
    >
      <div className="ij-payment-card__radio">
        <div className="ij-payment-card__radio-inner" />
      </div>
      <div className="ij-payment-card__content">
        <div className="ij-payment-card__header">
          <span className="ij-payment-card__label">{option.label}</span>
          {option.recommended && (
            <span className="ij-payment-card__badge">Recommended</span>
          )}
        </div>
        <span className="ij-payment-card__duration">{option.duration}</span>
      </div>
      <div className="ij-payment-card__price-group">
        <span className="ij-payment-card__price">{option.price}</span>
        {option.saveAmount && (
          <span className="ij-payment-card__save">{option.saveAmount}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="ij-payment-options">
      <div className="ij-payment-options__section">
        <h4 className="ij-payment-options__title">{paymentOptions.regularPay.title}</h4>
        {(options?.regular || []).map(renderOption)}
      </div>

      <div className="ij-payment-options__section">
        <h4 className="ij-payment-options__title">{paymentOptions.limitedPay.title}</h4>
        <div className="ij-payment-options__grid">
          {(options?.limited || []).map(renderOption)}
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;
