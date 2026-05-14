/**
 * BannerCarousel Component
 * ------------------------
 * A simple auto-playing carousel for the initial landing screen.
 */

import React, { useState, useEffect } from 'react';
import './BannerCarousel.css';

function BannerCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="ij-banner-carousel">
      <div className="ij-banner-carousel__wrapper">
        <div 
          className="ij-banner-carousel__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="ij-banner-carousel__slide">
              <img src={img} alt={`Banner ${idx + 1}`} className="ij-banner-carousel__img" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicators */}
      {images.length > 1 && (
        <div className="ij-banner-carousel__indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`ij-banner-carousel__dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BannerCarousel;
