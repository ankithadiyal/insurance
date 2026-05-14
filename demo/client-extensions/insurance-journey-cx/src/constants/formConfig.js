/**
 * Form Configuration
 * ------------------
 * Central config for the "Help us know you better" form.
 * All labels, placeholders, options, and validation messages live here
 * so the UI components stay free of hardcoded strings.
 */

export const FORM_TITLE = 'Help us know you better';

/* ──────────────────────────── Field Definitions ──────────────────────────── */

export const EDUCATIONAL_QUALIFICATION = {
  id: 'educationalQualification',
  label: 'Educational Qualification',
  required: true,
  options: [
    { value: 'post_grad_above', label: 'Post Grad & Above' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'diploma', label: 'Diploma' },
    { value: '12th_pass', label: '12th pass' },
    { value: '10th_pass', label: '10th pass' },
    { value: 'below_10th', label: 'Below 10th Pass' },
    { value: 'illiterate', label: 'Illiterate' },
  ],
};

export const OCCUPATION = {
  id: 'occupation',
  label: 'Occupation',
  required: true,
  options: [
    { value: 'public_sector', label: 'Service in Public Sector' },
    { value: 'private_sector', label: 'Service in Private Sector' },
    { value: 'government_sector', label: 'Service in Government Sector' },
    { value: 'professional', label: 'Professional' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'retired', label: 'Retired' },
    { value: 'housewife', label: 'Housewife' },
    { value: 'student', label: 'Student' },
    { value: 'business', label: 'Business' },
    { value: 'not_categorised', label: 'Not Categorised' },
    { value: 'service_other', label: 'Service - Other' },
  ],
};

export const ANNUAL_INCOME = {
  id: 'annualIncome',
  label: 'Annual Income',
  required: true,
  hasTooltip: true,
  tooltipText: 'Select your annual income bracket for an accurate quote.',
  options: [
    { value: '5_7_lakhs', label: '5-7 Lakhs' },
    { value: '7_10_lakhs', label: '7-10 Lakhs' },
    { value: '10_15_lakhs', label: '10-15 Lakhs' },
    { value: '15_20_lakhs', label: '15-20 Lakhs' },
    { value: 'above_20_lakhs', label: '> 20 Lakhs' },
  ],
};

export const EMAIL_FIELD = {
  id: 'emailId',
  label: 'Email Id',
  required: true,
  type: 'email',
  placeholder: 'Email Id',
};

export const PINCODE_FIELD = {
  id: 'pincode',
  label: 'Pincode',
  required: true,
  type: 'text',
  placeholder: 'Pincode',
  maxLength: 6,
};

export const SMOKER_FIELD = {
  id: 'isSmoker',
  label: 'Are you a smoker?',
  required: true,
  options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ],
};

export const FINANCIAL_ANALYSIS_FIELD = {
  id: 'financialAnalysis',
  label: 'Do you want to go through a financial analysis?',
  required: false,
  options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
};

export const SUBMIT_BUTTON_LABEL = 'Buy Now';

/* ──────────────────────────── Validation Messages ──────────────────────────── */

export const VALIDATION_MESSAGES = {
  educationalQualification: 'Please select your educational qualification.',
  occupation: 'Please select your occupation.',
  annualIncome: 'Please select your annual income bracket.',
  emailId: 'Please enter a valid email address.',
  pincode: 'Please enter a valid 6-digit pincode.',
  isSmoker: 'Please indicate whether you are a smoker.',
  financialAnalysis: 'Please select an option.',
};

/* ──────────────────────────── Regex Patterns ──────────────────────────── */

export const PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  pincode: /^[1-9][0-9]{5}$/,
};
