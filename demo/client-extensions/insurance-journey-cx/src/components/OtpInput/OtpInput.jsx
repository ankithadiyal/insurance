/**
 * OtpInput
 * --------
 * Renders a set of individual digit input boxes for OTP entry.
 */

import React, { useRef, useEffect } from 'react';
import './OtpInput.css';

function OtpInput({ length, value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newValue = value.split('');
    newValue[index] = val.substring(val.length - 1);
    const updatedValue = newValue.join('');
    onChange(updatedValue);

    // Move to next input if current one is filled
    if (val && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').substring(0, length);
    if (!/^\d+$/.test(data)) return;
    onChange(data);
  };

  return (
    <div className="ij-otp-input" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          className="ij-otp-input__box"
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          inputMode="numeric"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}

export default OtpInput;
