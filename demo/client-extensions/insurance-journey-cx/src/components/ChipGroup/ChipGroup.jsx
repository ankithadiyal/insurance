/**
 * ChipGroup
 * ---------
 * Renders a set of selectable pill / chip buttons.
 * Used for Educational Qualification, Occupation, and Annual Income fields.
 *
 * Props:
 *  - fieldId   : string   – form field identifier
 *  - label     : string   – visible label text
 *  - required  : bool     – shows asterisk when true
 *  - options   : array    – [{ value, label }]
 *  - selected  : string   – currently selected value
 *  - onSelect  : func     – (fieldId, value) => void
 *  - error     : string   – validation error message (optional)
 *  - tooltip   : string   – info tooltip text (optional)
 */

import React from 'react';
import './ChipGroup.css';

function ChipGroup({ fieldId, label, required, options, selected, onSelect, error, tooltip }) {
  return (
    <fieldset className="ij-chip-group" role="radiogroup" aria-labelledby={`${fieldId}-label`}>
      <legend className="ij-chip-group__label" id={`${fieldId}-label`}>
        {label}
        {required && <span className="ij-chip-group__required" aria-hidden="true">*</span>}
        {tooltip && (
          <span className="ij-chip-group__tooltip" title={tooltip} aria-label={tooltip}>
            <svg className="ij-chip-group__tooltip-icon" viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM8 11a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm0-7a2.25 2.25 0 0 1 1.13 4.2l-.24.14-.14.08V9a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75 .75.75 0 1 0-.75-.75.75.75 0 0 1-1.5 0A2.25 2.25 0 0 1 8 4Z" />
            </svg>
          </span>
        )}
      </legend>

      <div className="ij-chip-group__options">
        {options.map((option) => {
          const isSelected = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`ij-chip-group__chip ${isSelected ? 'ij-chip-group__chip--selected' : ''}`}
              onClick={() => onSelect(fieldId, option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && (
        <span className="ij-chip-group__error" role="alert">
          {error}
        </span>
      )}
    </fieldset>
  );
}

export default ChipGroup;
