/**
 * ToggleGroup
 * -----------
 * Renders a pair (or more) of toggle / pill buttons for Yes/No fields.
 * Used for "Are you a smoker?" and "Financial analysis" questions.
 *
 * Props:
 *  - fieldId   : string   – form field identifier
 *  - label     : string   – visible label text
 *  - required  : bool
 *  - options   : array    – [{ value, label }]
 *  - selected  : string   – currently selected value
 *  - onSelect  : func     – (fieldId, value) => void
 *  - error     : string   – validation error (optional)
 */

import React from 'react';
import './ToggleGroup.css';

function ToggleGroup({ fieldId, label, required, options, selected, onSelect, error }) {
  return (
    <fieldset className="ij-toggle-group" role="radiogroup" aria-labelledby={`${fieldId}-label`}>
      <legend className="ij-toggle-group__label" id={`${fieldId}-label`}>
        {label}
        {required && <span className="ij-toggle-group__required" aria-hidden="true">*</span>}
      </legend>

      <div className="ij-toggle-group__options">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`ij-toggle-group__btn ${isSelected ? 'ij-toggle-group__btn--selected' : ''}`}
              onClick={() => onSelect(fieldId, option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && (
        <span className="ij-toggle-group__error" role="alert">
          {error}
        </span>
      )}
    </fieldset>
  );
}

export default ToggleGroup;
