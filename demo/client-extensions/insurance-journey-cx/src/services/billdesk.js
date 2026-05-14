/**
 * billdeskService.js
 * ------------------
 * This service handles the integration with the BillDesk SDK.
 * For the demo, it provides a simulated 'bdPayment' interface.
 */

/**
 * Simulates loading the external BillDesk SDK script.
 * In production, you would add: <script src="https://.../billdesk.js"></script>
 */
export const loadBillDeskSDK = () => {
  return new Promise((resolve) => {
    if (window.bdPayment) {
      resolve(window.bdPayment);
      return;
    }

    // MOCK SDK INTERFACE for demo purposes
    window.bdPayment = {
      setup: (config) => {
        console.log('BillDesk SDK Initialized with:', config);
        
        // Return an object with the trigger method
        return {
          trigger: () => {
            console.log('BillDesk Payment Triggered for Amount:', config.amount);
            // Create the custom event to show our demo modal (re-using the UI logic)
            const event = new CustomEvent('SHOW_PAYMENT_MODAL', { 
              detail: { amount: config.amount, orderId: config.orderId } 
            });
            window.dispatchEvent(event);
          }
        };
      }
    };
    
    resolve(window.bdPayment);
  });
};

/**
 * Initiates the payment flow using the BillDesk SDK pattern.
 */
export const initiatePayment = async (amount, orderId) => {
  const sdk = await loadBillDeskSDK();
  
  const payment = sdk.setup({
    merchantId: 'PNBMETLIFE_DEMO',
    orderId: orderId || `ORD${Math.floor(Math.random() * 1000000)}`,
    amount: amount,
    currency: 'INR',
    callbackUrl: window.location.origin + '/payment-callback',
    onSuccess: (response) => {
      console.log('Payment Success:', response);
      alert('Payment Successful!');
    },
    onError: (error) => {
      console.log('Payment Error:', error);
      alert('Payment Failed. Please try again.');
    }
  });

  payment.trigger();
};
