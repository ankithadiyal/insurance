import React, { useState, useEffect } from 'react';
import { 
  GetStarted, 
  HelpUsKnowYouBetter, 
  OtpVerificationModal, 
  QuoteCalculation,
  PlanSummary,
  BillDeskModal
} from './components';
import { initiatePayment } from './services/billdesk';
import './index.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [quoteSelections, setQuoteSelections] = useState({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  
  // BillDesk Modal State
  const [billDesk, setBillDesk] = useState({
    isOpen: false,
    amount: '',
    orderId: ''
  });

  useEffect(() => {
    // Listener for the simulated SDK trigger
    const handleShowPayment = (e) => {
      setBillDesk({
        isOpen: true,
        amount: e.detail.amount,
        orderId: e.detail.orderId
      });
    };

    window.addEventListener('SHOW_PAYMENT_MODAL', handleShowPayment);
    return () => window.removeEventListener('SHOW_PAYMENT_MODAL', handleShowPayment);
  }, []);

  const handleProceedFromStep0 = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setIsOtpModalOpen(true);
  };

  const handleOtpVerify = (otp) => {
    setIsOtpModalOpen(false);
    setCurrentStep(1);
  };

  const handleProceedFromStep1 = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep(3);
  };

  const handleProceedFromStep3 = (selections) => {
    if (selections) setQuoteSelections(selections);
    setCurrentStep(4);
  };

  const handleCloseModal = () => {
    setIsOtpModalOpen(false);
  };

  const handleFinalProceed = (apiResponse) => {
    console.log('Journey Complete! API Success. Triggering Payment SDK...');
    
    // In a real app, 'amount' and 'orderId' would come from the API response
    const amount = '1436.00'; 
    const orderId = apiResponse?.id || 'ORD1772687';

    // TRIGGER BILLDESK SDK
    initiatePayment(amount, orderId);
  };

  return (
    <div className="ij-app">
      {currentStep === 0 && (
        <>
          <GetStarted onProceed={handleProceedFromStep0} />
          <OtpVerificationModal
            isOpen={isOtpModalOpen}
            onClose={handleCloseModal}
            onVerify={handleOtpVerify}
          />
        </>
      )}
      
      {currentStep === 1 && (
        <HelpUsKnowYouBetter onProceed={handleProceedFromStep1} />
      )}

      {currentStep === 3 && (
        <QuoteCalculation
          formData={formData}
          onProceed={handleProceedFromStep3}
        />
      )}

      {currentStep === 4 && (
        <PlanSummary
          formData={formData}
          quoteSelections={quoteSelections}
          onProceed={handleFinalProceed}
          onBack={() => setCurrentStep(3)}
        />
      )}

      {/* Global BillDesk SDK Modal (Mock) */}
      <BillDeskModal
        isOpen={billDesk.isOpen}
        onClose={() => setBillDesk(prev => ({ ...prev, isOpen: false }))}
        amount={billDesk.amount}
        orderId={billDesk.orderId}
      />
    </div>
  );
}

export default App;