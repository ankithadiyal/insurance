/**
 * Liferay React Client Extension - Web Component Entry Point
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

class WebComponent extends HTMLElement {

  connectedCallback() {
    let pageConfig = {};

    // Helper to find and clean "dirty" Liferay attributes
    const findDirtyAttr = (key) => {
      for (let i = 0; i < this.attributes.length; i++) {
        const attr = this.attributes[i];
        // Check if the attribute name contains our key (ignoring quotes/colons)
        if (attr.name.toLowerCase().includes(key.toLowerCase())) {
          // Clean the value: remove quotes, colons, and trailing commas
          return attr.value.replace(/["':,]/g, '').trim();
        }
      }
      return null;
    };

    const getNum = (key) => {
      const val = findDirtyAttr(key);
      return val ? parseFloat(val) : undefined;
    };

    // 1. Aggressively parse individual attributes
    const individualConfig = {
      baseRate: getNum('baserate'),
      ageLoading: getNum('ageloading'),
      smokerLoading: getNum('smokerloading'),
      femaleDiscount: getNum('femalediscount'),
      limitedPayDiscount: getNum('limitedpaydiscount'),
      termOffset: getNum('termoffset'),
      termDivisor: getNum('termdivisor'),
      formulaDescription: findDirtyAttr('formuladescription')
    };

    // 2. Clean up undefined values
    Object.keys(individualConfig).forEach(key => {
      if (individualConfig[key] === undefined || individualConfig[key] === null) {
        delete individualConfig[key];
      }
    });

    // 3. Try JSON as a last resort (if it's not broken)
    const jsonAttr = this.getAttribute('data-insurance-calculation');
    let jsonConfig = {};
    if (jsonAttr && jsonAttr.trim() !== '{') {
      try { jsonConfig = JSON.parse(jsonAttr); } catch (e) {}
    }

    pageConfig = { ...individualConfig, ...jsonConfig };
    console.log('[insurance-journey-cx] Aggressive Config Load:', pageConfig);

    ReactDOM.render(
      <React.StrictMode>
        <App pageConfig={pageConfig} />
      </React.StrictMode>, 
      this
    );

    
    
    // eslint-disable-next-line no-console
    console.log(`[insurance-journey-cx] Mounted successfully.`);
  }

  disconnectedCallback() {
  ReactDOM.unmountComponentAtNode(this);
  }
}

const ELEMENT_NAME = 'insurance-journey-cx';

if (customElements.get(ELEMENT_NAME)) {
  // eslint-disable-next-line no-console
  console.log(`Skipping registration for <${ELEMENT_NAME}> (already registered)`);
} else {
  customElements.define(ELEMENT_NAME, WebComponent);
}
