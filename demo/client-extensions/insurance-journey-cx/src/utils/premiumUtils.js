/**
 * premiumUtils.js
 * ---------------
 * Logic for calculating Term Life Insurance premiums.
 */

/**
 * Calculate the monthly premium for a term insurance policy.
 */
export function calculatePremium({
  sumAssured,
  age,
  policyTerm,
  paymentTerm,
  isSmoker = false,
  gender = 'male'
}) {
  // Base parameters
  const baseRate = 0.15;
  const ageLoading = 0.012;
  const smokerLoading = 1.6;
  const femaleDiscount = 0.9;
  const limitedPayDiscount = 0.85;
  const termOffset = 20;
  const termDivisor = 100;

  // 1. Base Rate based on age
  let rate = baseRate + (age - 18) * ageLoading;
  
  // 2. Risk Multipliers
  if (isSmoker) rate *= smokerLoading;
  if (gender.toLowerCase() === 'female') rate *= femaleDiscount;
  
  // 3. Term Factor: F(term) = 1 + (Policy Term - 20) / 100
  const termFactor = 1 + (policyTerm - termOffset) / termDivisor;
  
  // 4. Regular Annual Premium
  const regularAnnual = (sumAssured / 1000) * rate * termFactor;
  
  // 5. Apply Limited Pay Adjustment
  let finalAnnual = regularAnnual;
  let savings = 0;
  
  if (paymentTerm < policyTerm) {
    finalAnnual = (regularAnnual * (policyTerm / paymentTerm)) * limitedPayDiscount;
    savings = (regularAnnual * policyTerm) - (finalAnnual * paymentTerm);
  }

  const monthly = Math.round(finalAnnual / 12);
  return { monthly, savings: Math.max(0, Math.round(savings)), annual: Math.round(finalAnnual) };
}

/**
 * Formats a number as Indian Currency (INR)
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
