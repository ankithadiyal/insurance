/**
 * API Service
 * -----------
 * Centralised API layer for the insurance journey.
 * Uses Liferay's CSRF token for authentication.
 */

import axios from 'axios';

export const axiosPrivate = axios.create({
  baseURL: window.location.origin,
  headers: {
    'Content-Type': 'application/json',
    'x-csrf-token': Liferay.authToken,
  },
});

/**
 * Build the POST payload from collected form data & quote selections.
 * Maps internal field names to the API contract.
 */
export function buildInsurancePayload(formData, quoteSelections, derived) {
  return {
    reviewDate: new Date().toISOString(),
    fullName: formData.fullName || '',
    dateOfBirth: _formatDateForApi(formData.dateOfBirth),
    gender: (formData.gender || '').toLowerCase(),
    email: formData.emailId || '',
    mobileNumber: formData.mobileNo || '',
    annualIncome: _parseNumeric(formData.annualIncome),
    tobaccoUser: formData.isSmoker === 'yes',
    planName: 'PNB MetLife DigiProtect Term Plan',
    lifeCover: parseInt(quoteSelections.lifeCover || '10000000', 10),
    coverTillAge: parseInt(quoteSelections.coverTillAge) || 60,
    coverTillYear: _extractYear(derived.coverTillYear),
    payTillAge: parseInt(derived.payTillAge) || 41,
    payTillYear: _extractYear(derived.payTillYear),
    premiumFirstYear: 1436,
    premiumFromSecondYear: 1817,
    premiumFrequency: quoteSelections.paymentFrequency || 'Monthly',
    specialExitBenefit: false,
  };
}

/**
 * Submit insurance quote to the backend.
 * POST /o/c/insurancequotes
 */
export async function submitInsuranceQuote(payload) {
  const response = await axiosPrivate.post('/o/c/insurancequotes', payload);
  return response.data;
}

/* ── Private helpers ─────────────────────────── */

/**
 * Convert various date formats to API format (YYYY-MM-DD).
 */
function _formatDateForApi(dateStr) {
  if (!dateStr) return '';

  let day, month, year;
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    day = parts[0]; month = parts[1]; year = parts[2];
  } else if (dateStr.includes('-') && dateStr.indexOf('-') === 4) {
    // Already YYYY-MM-DD
    return dateStr;
  } else if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    day = parts[0]; month = parts[1]; year = parts[2];
  } else {
    return dateStr;
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Extract numeric year from a string like "Till 2055".
 */
function _extractYear(str) {
  if (!str) return 0;
  const match = str.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

/**
 * Parse income strings like "5-7 Lakhs", "10-15 Lakhs" to a proper number.
 */
function _parseNumeric(val) {
  if (!val) return 0;
  if (typeof val === 'number') return val;

  const str = val.toLowerCase();
  // Extract the first number found (e.g., "5" from "5-7")
  const match = str.match(/\d+/);
  if (!match) return 0;

  let num = parseInt(match[0], 10);

  // Handle "Lakhs" multiplier
  if (str.includes('lakh')) {
    num = num * 100000;
  } else if (str.includes('cr') || str.includes('crore')) {
    num = num * 10000000;
  }

  return num;
}
