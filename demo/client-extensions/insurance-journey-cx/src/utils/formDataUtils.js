/**
 * formDataUtils.js
 * ----------------
 * Utility helpers to derive display values from collected form data.
 * Designed to be replaced with API responses later.
 */

/**
 * Calculate age from a date-of-birth string.
 * Supports formats: "DD/MM/YYYY", "YYYY-MM-DD", "DD-MM-YYYY"
 */
export function calculateAge(dobString) {
  if (!dobString) return '';

  let parts;
  if (dobString.includes('/')) {
    parts = dobString.split('/');
    // DD/MM/YYYY
    return _ageFromParts(parts[2], parts[1], parts[0]);
  } else if (dobString.includes('-') && dobString.indexOf('-') === 4) {
    parts = dobString.split('-');
    // YYYY-MM-DD
    return _ageFromParts(parts[0], parts[1], parts[2]);
  } else if (dobString.includes('-')) {
    parts = dobString.split('-');
    // DD-MM-YYYY
    return _ageFromParts(parts[2], parts[1], parts[0]);
  }

  return '';
}

function _ageFromParts(year, month, day) {
  const dob = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age > 0 ? age : '';
}

/**
 * Format DOB for display (e.g., "12 MAY 1995")
 */
export function formatDobDisplay(dobString) {
  if (!dobString) return '';
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  let day, month, year;
  if (dobString.includes('/')) {
    const parts = dobString.split('/');
    day = parts[0]; month = parseInt(parts[1]) - 1; year = parts[2];
  } else if (dobString.includes('-') && dobString.indexOf('-') === 4) {
    const parts = dobString.split('-');
    day = parts[2]; month = parseInt(parts[1]) - 1; year = parts[0];
  } else if (dobString.includes('-')) {
    const parts = dobString.split('-');
    day = parts[0]; month = parseInt(parts[1]) - 1; year = parts[2];
  } else {
    return dobString;
  }

  return `${day} ${months[month] || ''} ${year}`;
}

/**
 * Calculate the "Cover Till" year based on current year + age offset.
 */
export function calculateTillYear(age, tillAge) {
  if (!age || !tillAge) return '';
  const currentYear = new Date().getFullYear();
  return currentYear + (tillAge - age);
}

/**
 * Format gender for display.
 */
export function formatGender(gender) {
  if (!gender) return '';
  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
}

/**
 * Format mobile number for display.
 */
export function formatMobile(mobile) {
  if (!mobile) return '';
  return `+91 ${mobile}`;
}

/**
 * Build the full summary data object from all collected form data.
 * This is the single source of truth for the PlanSummary screen.
 * In the future, this can be replaced with an API response.
 */
export function buildSummaryData(formData, quoteSelections) {
  const age = calculateAge(formData.dateOfBirth);
  const coverTillAge = parseInt(quoteSelections?.coverTillAge) || 60;
  const payTillAge = 41; // From selected payment option - will be derived from API later

  return {
    userName: formData.fullName || '',
    userAge: age ? `${age} Yrs` : '',
    rawAge: age,
    dateOfBirth: formatDobDisplay(formData.dateOfBirth),
    gender: formatGender(formData.gender),
    mobileNumber: formatMobile(formData.mobileNo),
    emailId: formData.emailId || '',
    annualIncome: formData.annualIncome || '',
    tobaccoUser: formData.isSmoker === 'yes' ? 'Yes' : 'No',
    lifeCover: quoteSelections?.lifeCover || '10000000',
    coverTillAge: `${coverTillAge} Years`,
    coverTillYear: `Till ${calculateTillYear(age, coverTillAge)}`,
    payTillAge: `${payTillAge} Years`,
    payTillYear: `Till ${calculateTillYear(age, payTillAge)}`,
  };
}
