/**
 * useInitialForm
 * --------------
 * Custom hook for the Step 0 (Initial) form state and validation.
 */

import { useState, useCallback } from 'react';
import { INITIAL_PATTERNS, INITIAL_VALIDATION_MESSAGES } from '../constants';

const INITIAL_STATE = {
  gender: 'male', // Male pre-selected as per screenshot
  fullName: '',
  dateOfBirth: '',
  mobileNo: '',
  privacyConsent: true, // Pre-checked as per screenshot
};

function validate(values) {
  const errors = {};

  if (!values.gender) {
    errors.gender = INITIAL_VALIDATION_MESSAGES.gender;
  }

  if (!values.fullName || !INITIAL_PATTERNS.fullName.test(values.fullName)) {
    errors.fullName = INITIAL_VALIDATION_MESSAGES.fullName;
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = INITIAL_VALIDATION_MESSAGES.dateOfBirth;
  }

  if (!values.mobileNo || !INITIAL_PATTERNS.mobileNo.test(values.mobileNo)) {
    errors.mobileNo = INITIAL_VALIDATION_MESSAGES.mobileNo;
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = INITIAL_VALIDATION_MESSAGES.privacyConsent;
  }

  return errors;
}

export function useInitialForm() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((fieldId, value) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    (onSuccess) => {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        if (onSuccess) onSuccess(values);
      }
    },
    [values]
  );

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
