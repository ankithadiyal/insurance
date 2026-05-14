/**
 * ProtectionForm
 * --------------
 * Sidebar form to customize the protection plan.
 */

import React, { useState, useRef, useEffect } from 'react';
import { QUOTE_CONFIG } from '../../constants';
import './ProtectionForm.css';

/**
 * CustomSelect Component
 * A premium dropdown replacement for native select.
 */
function CustomSelect({ label, value, options, onChange, secondaryContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="ij-custom-select" ref={containerRef}>
      <div 
        className={`ij-custom-select__trigger ${isOpen ? 'ij-custom-select__trigger--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="ij-custom-select__trigger-content">
          <span className="ij-custom-select__value">{selectedOption?.label || value}</span>
          {secondaryContent && (
            <span className="ij-custom-select__secondary-badge">{secondaryContent}</span>
          )}
        </div>
        <div className="ij-custom-select__arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="ij-custom-select__dropdown">
          <div className="ij-custom-select__options">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`ij-custom-select__option ${opt.value === value ? 'ij-custom-select__option--selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <span className="ij-custom-select__option-label">{opt.label}</span>
                {opt.badge && (
                  <span className="ij-custom-select__option-badge">{opt.badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProtectionForm({ values, onUpdate, age }) {
  const { protectionForm } = QUOTE_CONFIG;
  const currentYear = new Date().getFullYear();
  const userAge = age || 30;

  // 1. Life Cover Options
  const lifeCoverOptions = [];
  for (let i = 1; i <= 3; i += 0.25) {
    const val = i * 10000000;
    const label = i % 1 === 0 ? `${i} Cr` : `${i.toFixed(2)} Cr`;
    lifeCoverOptions.push({
      value: val.toString(),
      label: label,
      badge: `₹ ${label}`
    });
  }

  // 2. Cover Till Age Options
  const startAge = userAge + 10;
  const endAge = 75; // Extended to 75 for more options
  const ageOptions = [];
  for (let i = startAge; i <= endAge; i++) {
    const tillYear = currentYear + (i - userAge);
    ageOptions.push({
      value: `${i} Years`,
      label: `${i} Years`,
      badge: `Till ${tillYear}`
    });
  }

  // 3. Payment Frequency Options
  const frequencyOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly', badge: 'Save 4.2%' },
  ];

  // Current till year for the selected age
  const selectedAgeNum = parseInt(values.coverTillAge) || 60;
  const currentTillYear = `Till ${currentYear + (selectedAgeNum - userAge)}`;

  return (
    <div className="ij-protection-form">
      <h3 className="ij-protection-form__title">{protectionForm.title}</h3>

      {/* Life Cover */}
      <div className="ij-protection-form__field">
        <label className="ij-protection-form__label">
          {protectionForm.lifeCover.label} <span className="ij-protection-form__required">*</span>
        </label>
        <CustomSelect
          value={values.lifeCover}
          options={lifeCoverOptions}
          onChange={(val) => onUpdate('lifeCover', val)}
        />
      </div>

      {/* Cover Till Age */}
      <div className="ij-protection-form__field">
        <label className="ij-protection-form__label">
          {protectionForm.coverTillAge.label} <span className="ij-protection-form__required">*</span>
        </label>
        <CustomSelect
          value={values.coverTillAge}
          options={ageOptions}
          onChange={(val) => onUpdate('coverTillAge', val)}
          secondaryContent={currentTillYear}
        />
      </div>

      {/* Payment Frequency */}
      <div className="ij-protection-form__field">
        <label className="ij-protection-form__label">
          {protectionForm.paymentFrequency.label} <span className="ij-protection-form__required">*</span>
        </label>
        <CustomSelect
          value={values.paymentFrequency}
          options={frequencyOptions}
          onChange={(val) => onUpdate('paymentFrequency', val)}
        />
        {values.paymentFrequency === 'Monthly' && (
          <div className="ij-protection-form__discount-hint">
            {protectionForm.paymentFrequency.discountHint}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProtectionForm;
