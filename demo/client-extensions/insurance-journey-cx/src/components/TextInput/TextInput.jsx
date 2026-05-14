/**
 * TextInput
 * ---------
 * Reusable text / email input field with label and error support.
 *
 * Props:
 *  - fieldId     : string  – form field identifier
 *  - label       : string  – visible label
 *  - required    : bool
 *  - type        : string  – 'text' | 'email' | etc.
 *  - placeholder : string
 *  - value       : string
 *  - onChange     : func   – (fieldId, value) => void
 *  - error       : string  – validation error (optional)
 *  - maxLength   : number  – character limit (optional)
 */

import React from 'react';
import './TextInput.css';

function TextInput({ fieldId, label, required, type, placeholder, value, onChange, error, maxLength, prefix, icon }) {
  const handleChange = (e) => {
    const val = e.target.value;
    // For pincode or mobile: only allow digits
    if (maxLength && (fieldId === 'pincode' || fieldId === 'mobileNo')) {
      if (/^\d*$/.test(val) && val.length <= maxLength) {
        onChange(fieldId, val);
      }
      return;
    }
    onChange(fieldId, val);
  };

  return (
    <div className="ij-text-input">
      <label className="ij-text-input__label" htmlFor={fieldId}>
        {label}
        {required && <span className="ij-text-input__required" aria-hidden="true">*</span>}
      </label>
      <div className={`ij-text-input__wrapper ${error ? 'ij-text-input__wrapper--error' : ''}`}>
        {prefix && <span className="ij-text-input__prefix">{prefix}</span>}
        <input
          id={fieldId}
          className="ij-text-input__field"
          type={type || 'text'}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          autoComplete="off"
        />
        {icon && (
          <span
            className="ij-text-input__icon"
            onClick={() => {
              const el = document.getElementById(fieldId);
              if (el) {
                if (type === 'date' && el.showPicker) {
                  try {
                    el.showPicker();
                  } catch (e) {
                    el.focus();
                  }
                } else {
                  el.focus();
                }
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {icon}
          </span>
        )}
      </div>
      {error && (
        <span className="ij-text-input__error" id={`${fieldId}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default TextInput;
