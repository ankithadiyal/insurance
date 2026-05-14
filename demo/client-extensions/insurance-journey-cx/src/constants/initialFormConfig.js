/**
 * Initial Form Configuration (Step 0)
 * ------------------------------------
 * Config for the initial "Get Started" screen.
 * All labels, placeholders, options, and validation messages.
 */

export const INITIAL_FORM_TITLE = 'Up to 21% Discount';
export const INITIAL_FORM_TITLE_SUPERSCRIPT = '^';

/* ──────────────────────────── Field Definitions ──────────────────────────── */

export const GENDER_FIELD = {
  id: 'gender',
  label: 'Gender',
  required: true,
  options: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ],
};

export const FULL_NAME_FIELD = {
  id: 'fullName',
  label: 'Full Name',
  required: true,
  type: 'text',
  placeholder: 'Full name as per Aadhaar',
};

export const DOB_FIELD = {
  id: 'dateOfBirth',
  label: 'Date of Birth',
  required: true,
  type: 'text',
  placeholder: 'DD/MM/YYYY',
};

export const MOBILE_FIELD = {
  id: 'mobileNo',
  label: 'Mobile No',
  required: true,
  type: 'tel',
  placeholder: 'Mobile No',
  prefix: '+91',
  maxLength: 10,
};

export const CONSENT_FIELD = {
  id: 'privacyConsent',
  required: true,
  defaultChecked: true,
  text: 'By submitting your details, you agree to PNB MetLife\'s',
  linkText: 'Privacy Policy',
  linkUrl: '#privacy-policy',
  additionalText:
    'and authorize PNB MetLife and/or its authorized service providers to verify the above information and/or contact you to assist you with the policy purchase and/or servicing. You have the option to opt-out of this contact authorization by un-checking the box. The authorization provided by you herein will supersede all earlier authorizations/registrations made by you in this regard.',
};

export const PROCEED_BUTTON_LABEL = 'Proceed';

/* ──────────────────────────── Validation Messages ──────────────────────────── */

export const INITIAL_VALIDATION_MESSAGES = {
  gender: 'Please select your gender.',
  fullName: 'Please enter your full name as per Aadhaar.',
  dateOfBirth: 'Please enter a valid date of birth.',
  mobileNo: 'Please enter a valid 10-digit mobile number.',
  privacyConsent: 'You must agree to the privacy policy to proceed.',
};

/* ──────────────────────────── Regex Patterns ──────────────────────────── */

export const INITIAL_PATTERNS = {
  fullName: /^[a-zA-Z\s]{2,100}$/,
  mobileNo: /^[6-9]\d{9}$/,
};

/* ──────────────────────────── Banner disclaimer ──────────────────────────── */

export const BANNER_DISCLAIMER =
  'T&C Apply, AD-F/2026-27/030. For full disclaimers, please refer to the disclaimer section on the website.';
