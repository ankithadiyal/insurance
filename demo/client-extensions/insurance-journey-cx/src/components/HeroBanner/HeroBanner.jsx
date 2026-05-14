/**
 * HeroBanner
 * ----------
 * Promotional image carousel / banner shown on the left side
 * of the "Help us know you better" section.
 *
 * Props:
 *  - src : string – image URL (configurable via constants/images.js)
 *  - alt : string – accessible alt text
 */

import React from 'react';
import './HeroBanner.css';

function HeroBanner({ src, alt }) {
  return (
    <div className="ij-hero-banner">
      <div className="ij-hero-banner__image-wrapper">
        <img
          className="ij-hero-banner__image"
          src={src}
          alt={alt || 'PNB MetLife DigiProtect Term Plan'}
          loading="lazy"
        />
      </div>

      {/* Dot indicators — decorative, matching the screenshot */}
      <div className="ij-hero-banner__dots" aria-hidden="true">
        <span className="ij-hero-banner__dot ij-hero-banner__dot--active"></span>
        <span className="ij-hero-banner__dot"></span>
      </div>
    </div>
  );
}

export default HeroBanner;
