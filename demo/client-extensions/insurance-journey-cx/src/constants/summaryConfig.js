/**
 * Plan Summary Configuration (Step 4)
 * ------------------------------------
 * Static labels & structure only.
 * Dynamic data comes from formData/quoteSelections props via buildSummaryData().
 */

export const SUMMARY_CONFIG = {
  pageTitle: 'Review below details before proceeding',
  pageSubtitle: 'These cannot be changed at a later stage',
  downloadBtnLabel: 'Download Benefit Illustration',

  /* ── Your Plan Details (structure, not data) ── */
  planSection: {
    title: 'Your Plan Details',
    editLabel: 'Edit',
    planName: 'PNB MetLife DigiProtect Term Plan',
  },

  /* ── Total Premium + Actions ──────────────── */
  premiumBar: {
    label: 'Total Premium',
    value: '₹1,436 Monthly',
    backLabel: 'Back',
    payLabel: 'Pay Now',
  },

  /* ── Payment Agreement ────────────────────── */
  agreementSection: {
    title: 'Payment Agreement',
    consents: [
      {
        id: 'consent-payment',
        text: 'I hereby confirm that, the premium has been/is being paid from my own Credit/Debit Card. I further agree and consent to PNB MetLife\'s right to call for documents to verify my source of funds and also to cancel the insurance contract/decline my proposal in case I have been found guilty by any competent court of law/Tribunal/Authority, under any statutes, regulations or laws in force directly or indirectly governing the prevention of money laundering in India.',
        linkText: 'I also agree with the terms and conditions stated herein (Click Here).',
      },
      {
        id: 'consent-premium',
        text: 'I understand that the quoted premium is derived from the information shared by me and this is tentative premium. Mere payment of the premium will not lead to the commencement of risk and issuance of the policy. The risk commencement and issuance of the policy is subject to the submission of complete application form and underwriting procedures of PNB MetLife.',
      },
      {
        id: 'consent-benefit',
        text: 'I/We confirm having read and understood the benefits illustrated in its totality and that the figures derived in the customised benefit illustration document generated herein are basis the inputs provided by me/us.',
      },
    ],
    payLaterText: 'If you want to pay later, please click',
    payLaterLink: 'here',
  },

  /* ── Disclaimer / Footer ──────────────────── */
  disclaimer: {
    buttonLabel: 'Disclaimer',
    warningTitle: 'BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS / FRAUDULENT OFFERS!',
    warningText: 'IRDAI or its officials do not involve in activities like selling insurance policies, announcing bonus or investments of premium. Public receiving such phone calls are requested to lodge a police complaint.',
    spuriousLabel: 'SPURIOUS CALLS',
    footerLinks: [
      'Public Disclosure', 'Privacy Policy', 'Disclaimer', 'IRDAI',
      'Ombudsman', 'Life Insurance Council', 'Consumer Edu.', 'DNC',
      'Grievance Cell', 'Anti Fraud Policy', 'Policyholder Edu.',
    ],
  },
};
