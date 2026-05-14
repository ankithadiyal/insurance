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
import { useQuote } from '../../hooks';
import { calculateAge, calculateTillYear, formatCurrency } from '../../utils';
import './QuoteCalculation.css';

/**
 * CONFIGURATION: Premium Formula Parameters
 * -----------------------------------------
 * These can be moved to page configuration in the future.
 */
const PREMIUM_CONFIG = {
  baseRate: 1.0,          
  ageFactor: 0.04,        
  monthlyLoading: 1.15,   
  smokerLoading: 1.6,
  femaleDiscount: 0.9,
  limitedPayDiscount: 0.85,
  termOffset: 29,         
  termDivisor: 100,

  formulaDescription: "Premium = (SA/1000) * [Base + (Age-31)*Factor] * [1 + (Term-29)/100]"
};

function QuoteCalculation({ formData = {}, pageConfig = {}, onProceed }) {
  const { selections, updateSelection } = useQuote();

  // MERGE Page Level Config with defaults
  const CONFIG = {
    ...PREMIUM_CONFIG,
    ...pageConfig
  };

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
    
    // a. Base Rate adjusted for age (Base 1.0 at age 31)
    let rate = CONFIG.baseRate + (age - 31) * CONFIG.ageFactor;
    
    // b. Risk Multipliers
    if (isSmoker) rate *= CONFIG.smokerLoading;
    if (gender.toLowerCase() === 'female') rate *= CONFIG.femaleDiscount;
    
    // c. Term Factor: Adjusted around the 29-year base
    const termFactor = 1 + (policyTerm - CONFIG.termOffset) / CONFIG.termDivisor;
    
    // d. Base Annual Premium
    let annualPremium = (numericLifeCover / 1000) * rate * termFactor;
    
    // e. Apply Limited Pay Adjustment if applicable
    let savings = 0;
    if (paymentTerm < policyTerm) {
      annualPremium = (annualPremium * (policyTerm / paymentTerm)) * CONFIG.limitedPayDiscount;
      savings = (annualPremium * policyTerm) - (annualPremium * paymentTerm);
    }

    // f. Frequency Loading (15% for monthly)
    const isMonthly = paymentFrequency === 'Monthly';
    const frequencyFactor = isMonthly ? CONFIG.monthlyLoading : 1.0;
    
    const installmentPremium = isMonthly 
      ? Math.round((annualPremium / 12) * frequencyFactor)
      : Math.round(annualPremium);

    // g. Total Lifetime Pay
    const totalLifetimePay = isMonthly
      ? Math.round(installmentPremium * 12 * paymentTerm)
      : Math.round(installmentPremium * paymentTerm);
    
    return { 
      installment: installmentPremium, 
      total: totalLifetimePay,
      savings: Math.max(0, Math.round(savings)) 
    };
  };

  // 4. Generate dynamic options for the UI
  const regularRes = calculateResult(numericCoverTillAge);
  const regularOption = {
    id: 'regular-pay',
    label: `Pay till age ${numericCoverTillAge}`,
    duration: `(For ${policyTerm} Years)`,
    price: `${formatCurrency(regularRes.installment)} / ${paymentFrequency}`,
    installmentValue: regularRes.installment,
    totalValue: regularRes.total
  };

  // Generate limited pay options
  const limitedAges = [age + 10, age + 15, age + 20].filter(a => a < numericCoverTillAge);
  const limitedOptions = limitedAges.map((targetAge) => {
    const res = calculateResult(targetAge);
    return {
      id: `limited-${targetAge}`,
      label: `Pay till age ${targetAge}`,
      duration: `(For ${targetAge - age} Years)`,
      price: `${formatCurrency(res.installment)} / ${paymentFrequency}`,
      installmentValue: res.installment,
      totalValue: res.total
    };
  });

  // 5. Selected Premium for Sticky Footer & Header
  const allOptions = [regularOption, ...limitedOptions];
  const activeOption = allOptions.find(o => o.id === selectedPaymentOption) || regularOption;

  // Format total amount (e.g., ₹3.20 Lakh)
  const formatLakh = (val) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return formatCurrency(val);
  };

  const handleProceed = () => {
    // Pass everything back to App
    if (onProceed) onProceed({ 
      ...selections, 
      installmentPremium: activeOption.installmentValue,
      totalPremium: activeOption.totalValue 
    });
  };

  return (
    <div className="ij-quote-page">
      <div className="ij-quote-page__container">
        {/* Top Header — dynamic name/age/amount */}
        <QuoteHeader 
          userName={userName} 
          userAge={userAge} 
          amount={formatLakh(activeOption.totalValue || regularRes.total)}
          duration={`(Till ${calculateTillYear(age, numericCoverTillAge)})`} 
        />

        <div className="ij-quote-page__content">
          {/* Sidebar */}
          <aside className="ij-quote-page__sidebar">
            <ProtectionForm values={selections} onUpdate={updateSelection} age={age} />
            
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
            <QuoteHero lifeCoverAmount={`₹ ${numericLifeCover / 10000000} Cr`} />
            
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

      <StickyRateSection 
        price={formatCurrency(activeOption.installmentValue)}
        frequency={paymentFrequency}
        onProceed={handleProceed} 
      />
    </div>
  );
}

export default QuoteCalculation;
