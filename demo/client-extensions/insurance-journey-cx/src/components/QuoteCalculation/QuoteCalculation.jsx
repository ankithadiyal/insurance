/**
 * QuoteCalculation (Step 3)
 * -------------------------
 * The main quote calculation screen.
 * Receives formData from previous steps for dynamic display.
 */

import React from 'react';
import QuoteHeader from './QuoteHeader';
import ProtectionForm from './ProtectionForm';
import QuoteHero from './QuoteHero';
import PaymentOptions from './PaymentOptions';
import StickyRateSection from './StickyRateSection';
import { calculateAge, formatCurrency } from '../../utils';
import './QuoteCalculation.css';

/**
 * CONFIGURATION: Premium Formula Parameters
 * -----------------------------------------
 * These can be moved to page configuration in the future.
 */
const PREMIUM_CONFIG = {
  baseRate: 0.15,         // Base rate per 1000 SA
  ageLoading: 0.012,      // 1.2% increase per year of age
  smokerLoading: 1.6,     // 60% extra for smokers
  femaleDiscount: 0.9,    // 10% discount for females
  limitedPayDiscount: 0.85, // 15% discount for paying early
  
  // Term Formula Parameters: F(term) = 1 + (Term - Offset) / Divisor
  termOffset: 20,         
  termDivisor: 100
};

function QuoteCalculation({ formData = {}, onProceed }) {
  const { selections, updateSelection } = useQuote();

  // 1. Derive user info
  const age = calculateAge(formData.dateOfBirth) || 30;
  const userName = formData.fullName || 'User';
  const userAge = `${age} Yrs`;

  // 2. Extract current selections
  const { lifeCover, coverTillAge, paymentFrequency, selectedPaymentOption } = selections;
  
  const numericLifeCover = parseInt(lifeCover) || 10000000;
  const numericCoverTillAge = parseInt(coverTillAge.replace(/[^0-9]/g, '')) || 60;
  const policyTerm = numericCoverTillAge - age;
  const isSmoker = formData.isSmoker === 'yes';
  const gender = formData.gender || 'male';

  // 3. THE FORMULA FUNCTION
  const calculateResult = (payTillAge) => {
    const paymentTerm = payTillAge - age;
    
    // a. Base Rate based on age
    let rate = PREMIUM_CONFIG.baseRate + (age - 18) * PREMIUM_CONFIG.ageLoading;
    
    // b. Risk Multipliers
    if (isSmoker) rate *= PREMIUM_CONFIG.smokerLoading;
    if (gender.toLowerCase() === 'female') rate *= PREMIUM_CONFIG.femaleDiscount;
    
    // c. APPLY FORMULA: F(term) = 1 + (Policy Term - Offset) / Divisor
    const termFactor = 1 + (policyTerm - PREMIUM_CONFIG.termOffset) / PREMIUM_CONFIG.termDivisor;
    
    // d. Regular Annual Premium (Adjusted by your term factor)
    const regularAnnual = (numericLifeCover / 1000) * rate * termFactor;
    
    // d. Apply Limited Pay Adjustment
    let finalAnnual = regularAnnual;
    let savings = 0;
    
    if (paymentTerm < policyTerm) {
      finalAnnual = (regularAnnual * (policyTerm / paymentTerm)) * PREMIUM_CONFIG.limitedPayDiscount;
      savings = (regularAnnual * policyTerm) - (finalAnnual * paymentTerm);
    }

    const monthly = Math.round(finalAnnual / 12);
    return { monthly, savings: Math.max(0, Math.round(savings)) };
  };

  // 4. Generate dynamic options for the UI
  const regularRes = calculateResult(numericCoverTillAge);
  const regularOption = {
    id: 'regular-pay',
    label: `Pay till age ${numericCoverTillAge}`,
    duration: `(For ${policyTerm} Years)`,
    price: `${formatCurrency(regularRes.monthly)} Per Month`,
    monthlyValue: regularRes.monthly
  };

  // Generate limited pay options (e.g., Pay for 10, 15, 20 years)
  const limitedAges = [age + 10, age + 15, age + 20].filter(a => a < numericCoverTillAge);
  const limitedOptions = limitedAges.map((targetAge, idx) => {
    const res = calculateResult(targetAge);
    return {
      id: `limited-${targetAge}`,
      label: `Pay till age ${targetAge}`,
      duration: `(For ${targetAge - age} Years)`,
      price: `${formatCurrency(res.monthly)} Per Month`,
      saveAmount: `Save ${formatCurrency(res.savings)}`,
      recommended: idx === 0,
      monthlyValue: res.monthly
    };
  });

  // 5. Selected Premium for Sticky Footer
  const allOptions = [regularOption, ...limitedOptions];
  const activeOption = allOptions.find(o => o.id === selectedPaymentOption) || regularOption;

  const handleProceed = () => {
    // Pass everything back to App
    if (onProceed) onProceed({ ...selections, monthlyPremium: activeOption.monthlyValue });
  };

  return (
    <div className="ij-quote-page">
      <div className="ij-quote-page__container">
        {/* Top Header — dynamic name/age */}
        <QuoteHeader userName={userName} userAge={userAge} />

        <div className="ij-quote-page__content">
          {/* Sidebar */}
          <aside className="ij-quote-page__sidebar">
            <ProtectionForm values={selections} onUpdate={updateSelection} />
            
            {/* Customer Testimonial placeholder matching design */}
            <div className="ij-quote-page__testimonial">
              <div className="ij-quote-page__stars">★★★★★</div>
              <p>"PNB MetLife Products are made keeping safety and utility in mind, making it very helpful to my family."</p>
              <div className="ij-quote-page__user">
                <div className="ij-quote-page__avatar">RK</div>
                <div className="ij-quote-page__user-info">
                  <strong>Roohi Kaushal</strong>
                  <span>PNB MetLife Customer</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <main className="ij-quote-page__main">
            <QuoteHero />
            
            <PaymentOptions 
              selectedId={selections.selectedPaymentOption} 
              options={{
                regular: [regularOption],
                limited: limitedOptions
              }}
              onSelect={(id) => updateSelection('selectedPaymentOption', id)} 
            />
          </main>
        </div>
      </div>

      {/* Bottom Rate Section */}
      <StickyRateSection 
        price={formatCurrency(activeOption.monthlyValue)}
        frequency={paymentFrequency}
        onProceed={handleProceed} 
      />
    </div>
  );
}

export default QuoteCalculation;
