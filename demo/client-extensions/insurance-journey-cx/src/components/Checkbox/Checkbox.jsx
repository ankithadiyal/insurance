/**
 * Checkbox
 * --------
 * Reusable checkbox component for the privacy consent.
 */

import React from 'react';
import './Checkbox.css';

function Checkbox({ fieldId, checked, onChange, children, error }) {
  return (
    <div className="ij-checkbox">
      <label className="ij-checkbox__label">
        <input
          id={fieldId}
          type="checkbox"
          className="ij-checkbox__input"
          checked={checked}
          onChange={(e) => onChange(fieldId, e.target.checked)}
        />
        <span className="ij-checkbox__text">{children}</span>
      </label>
      {error && (
        <span className="ij-checkbox__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default Checkbox;
