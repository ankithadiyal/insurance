/**
 * useInsuranceForm
 * ----------------
 * Custom hook encapsulating all form state, change handlers, and
 * validation logic for the "Help us know you better" section.
 */

import { useState, useCallback } from 'react';
import { PATTERNS, VALIDATION_MESSAGES } from '../constants';

const INITIAL_FORM_STATE = {
  educationalQualification: '',
  occupation: '',
  annualIncome: '',
  emailId: '',
  pincode: '',
  isSmoker: '',
  financialAnalysis: 'no', 
};

function validateForm(values) {
  const errors = {};

  if (!values.educationalQualification) {
    errors.educationalQualification = VALIDATION_MESSAGES.educationalQualification;
  }

  if (!values.occupation) {
    errors.occupation = VALIDATION_MESSAGES.occupation;
  }

  if (!values.annualIncome) {
    errors.annualIncome = VALIDATION_MESSAGES.annualIncome;
  }

  if (!values.emailId || !PATTERNS.email.test(values.emailId)) {
    errors.emailId = VALIDATION_MESSAGES.emailId;
  }

  if (!values.pincode || !PATTERNS.pincode.test(values.pincode)) {
    errors.pincode = VALIDATION_MESSAGES.pincode;
  }

  if (!values.isSmoker) {
    errors.isSmoker = VALIDATION_MESSAGES.isSmoker;
  }

  return errors;
}

export function useInsuranceForm() {
  const [values, setValues] = useState(INITIAL_FORM_STATE);
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
      const validationErrors = validateForm(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        if (onSuccess) {
          onSuccess(values);
        }
      }
    },
    [values],
  );

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
