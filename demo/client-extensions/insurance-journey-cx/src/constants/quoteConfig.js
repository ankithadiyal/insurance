/**
 * Quote Calculation Configuration (Step 3)
 * -----------------------------------------
 */

export const QUOTE_CONFIG = {
  header: {
    youPayPrefix: 'You Pay :',
    amount: '₹3.20 Lakh',
    duration: '(Till 2055)',
    userName: 'Parth Patel',
    userAge: '31 Yrs',
  },
  protectionForm: {
    title: 'Choose protection that fits you',
    lifeCover: {
      label: 'Life Cover',
      value: '10000000',
      hint: '₹1 Cr',
    },
    coverTillAge: {
      label: 'Cover Till Age',
      value: '60 Years',
      till: 'Till 2055',
    },
    paymentFrequency: {
      label: 'Payment Frequency',
      value: 'Monthly',
      discountHint: 'Save 4.2% with Yearly',
    },
  },
  hero: {
    settlementRatio: '99.57 % Individual Death Claim Settlement Ratio',
    lifeCoverAmount: '₹ 1 Cr',
    lifeCoverLabel: 'Life Cover',
    guaranteeLabel: 'Lowest Premium Guarantee',
    knowMoreLabel: 'Know More',
  },
  paymentOptions: {
    regularPay: {
      title: 'Regular Pay',
      options: [
        {
          id: 'regular-60',
          label: 'Pay till age 60',
          duration: '(For 29 Years)',
          price: '₹734 Per Month',
          selected: true,
        }
      ]
    },
    limitedPay: {
      title: 'Limited Pay',
      options: [
        {
          id: 'limited-41',
          label: 'Pay till age 41',
          duration: '(For 10 Years)',
          price: '₹1,436 Per Month',
          saveAmount: 'Save ₹1.07 Lakh',
          recommended: true,
        },
        {
          id: 'limited-46',
          label: 'Pay till age 46',
          duration: '(For 15 Years)',
          price: '₹1,072 Per Month',
          saveAmount: 'Save ₹80,280',
        },
        {
          id: 'limited-51',
          label: 'Pay till age 51',
          duration: '(For 20 Years)',
          price: '₹940 Per Month',
          saveAmount: 'Save ₹38,580',
        }
      ]
    }
  },
  stickyRate: {
    label: 'Online Rate',
    currentPrice: '₹734',
    originalPrice: '₹929',
    frequency: 'Monthly',
    subText: 'Your Premium',
    viewBreakup: '(View Break-Up)',
    proceedLabel: 'Proceed',
  },
  features: [
    { label: 'Express', subLabel: 'Claim Payout', value: '1 DAY', icon: 'bolt' },
    { label: 'Lowest', subLabel: 'Premium Guarantee', icon: 'shield' },
    { label: '30 Days', subLabel: 'Return Policy', icon: 'refresh' },
  ],
  trustStats: [
    { label: '99.57%', subLabel: 'Individual Death Claim Settlement Ratio' },
    { label: '17.50L+', subLabel: 'No. of customers' },
    { label: '2300 Cr+', subLabel: 'Individual Death Claim Amount Settled' },
    { label: '54,000 Cr+', subLabel: 'Assets Under Management' },
  ]
};
