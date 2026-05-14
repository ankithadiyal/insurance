/**
 * ProtectionForm
 * --------------
 * Sidebar form to customize the protection plan.
 */

import React from 'react';
import { QUOTE_CONFIG } from '../../constants';
import './ProtectionForm.css';

function ProtectionForm({ values, onUpdate }) {
  const { protectionForm } = QUOTE_CONFIG;

  return (
    <div className="ij-protection-form">
      <h3 className="ij-protection-form__title">{protectionForm.title}</h3>

      <div className="ij-protection-form__field">
        <label className="ij-protection-form__label">
          {protectionForm.lifeCover.label} <span className="ij-protection-form__required">*</span>
        </label>
        <div className="ij-protection-form__input-wrapper">
          <input
            type="text"
            className="ij-protection-form__input"
            value={values.lifeCover}
            onChange={(e) => onUpdate('lifeCover', e.target.value)}
          />
          <span className="ij-protection-form__hint">{protectionForm.lifeCover.hint}</span>
        </div>
      </div>

      <div className="ij-protection-form__field">
        <label className="ij-protection-form__label">
          {protectionForm.coverTillAge.label} <span className="ij-protection-form__required">*</span>
        </label>
        <div className="ij-protection-form__select-wrapper">
          <select
            className="ij-protection-form__select"
            value={values.coverTillAge}
            onChange={(e) => onUpdate('coverTillAge', e.target.value)}
          >
            <option value="60 Years">60 Years</option>
            <option value="65 Years">65 Years</option>
            <option value="70 Years">70 Years</option>
          </select>
          <span className="ij-protection-form__till">{protectionForm.coverTillAge.till}</span>
        </div>
      </div>

      <div className="ij-protection-form__field">
        <label className="ij-protection-form__label">
          {protectionForm.paymentFrequency.label} <span className="ij-protection-form__required">*</span>
        </label>
        <div className="ij-protection-form__select-wrapper">
          <select
            className="ij-protection-form__select"
            value={values.paymentFrequency}
            onChange={(e) => onUpdate('paymentFrequency', e.target.value)}
          >
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <div className="ij-protection-form__discount-badge">
            {protectionForm.paymentFrequency.discountHint}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectionForm;
