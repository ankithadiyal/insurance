/**
 * useQuote
 * --------
 * Custom hook for Step 3 Quote Calculation state.
 */

import { useState, useCallback } from 'react';
import { QUOTE_CONFIG } from '../constants';

const INITIAL_STATE = {
  lifeCover: QUOTE_CONFIG.protectionForm.lifeCover.value,
  coverTillAge: QUOTE_CONFIG.protectionForm.coverTillAge.value,
  paymentFrequency: QUOTE_CONFIG.protectionForm.paymentFrequency.value,
  selectedPaymentOption: QUOTE_CONFIG.paymentOptions.regularPay.options[0].id,
};

export function useQuote() {
  const [selections, setSelections] = useState(INITIAL_STATE);

  const updateSelection = useCallback((fieldId, value) => {
    setSelections((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  return {
    selections,
    updateSelection,
  };
}
