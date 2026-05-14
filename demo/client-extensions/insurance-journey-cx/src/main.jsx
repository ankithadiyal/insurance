/**
 * Liferay React Client Extension - Web Component Entry Point
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

class WebComponent extends HTMLElement {

  connectedCallback() {
  ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, this);

    
    
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
