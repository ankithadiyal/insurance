/**
 * GetStarted (Step 0)
 * -------------------
 * The initial landing page component.
 */

import React from 'react';
import { BannerCarousel, TextInput, Checkbox, ToggleGroup } from '../index';
import {
  INITIAL_FORM_TITLE,
  INITIAL_FORM_TITLE_SUPERSCRIPT,
  GENDER_FIELD,
  FULL_NAME_FIELD,
  DOB_FIELD,
  MOBILE_FIELD,
  CONSENT_FIELD,
  PROCEED_BUTTON_LABEL,
  IMAGES,
  BANNER_DISCLAIMER,
} from '../../constants';
import { useInitialForm } from '../../hooks';
import './GetStarted.css';

function GetStarted({ onProceed }) {
  const { values, errors, handleChange, handleSubmit } = useInitialForm();

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit((formData) => {
      onProceed(formData);
    });
  };

  const calendarIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <section className="ij-get-started">
      <div className="ij-get-started__container">
        {/* Banner Carousel Column */}
        <div className="ij-get-started__banner-col">
          <BannerCarousel images={IMAGES.heroBanners} />
        </div>

        {/* Form Column */}
        <div className="ij-get-started__form-col">
          <h2 className="ij-get-started__title">
            {INITIAL_FORM_TITLE}
          </h2>

          <form className="ij-get-started__form" onSubmit={onFormSubmit} noValidate>
            {/* Gender Selector */}
            <div className="ij-get-started__gender-row">
              <ToggleGroup
                fieldId={GENDER_FIELD.id}
                label=""
                options={GENDER_FIELD.options}
                selected={values.gender}
                onSelect={handleChange}
                error={errors.gender}
              />
            </div>

            {/* Full Name */}
            <TextInput
              fieldId={FULL_NAME_FIELD.id}
              label={FULL_NAME_FIELD.label}
              required={FULL_NAME_FIELD.required}
              placeholder={FULL_NAME_FIELD.placeholder}
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            {/* Date of Birth */}
            <TextInput
              fieldId={DOB_FIELD.id}
              label={DOB_FIELD.label}
              required={DOB_FIELD.required}
              type={DOB_FIELD.type}
              placeholder={DOB_FIELD.placeholder}
              value={values.dateOfBirth}
              onChange={handleChange}
              error={errors.dateOfBirth}
              icon={calendarIcon}
            />

            {/* Mobile No */}
            <TextInput
              fieldId={MOBILE_FIELD.id}
              label={MOBILE_FIELD.label}
              required={MOBILE_FIELD.required}
              type={MOBILE_FIELD.type}
              placeholder={MOBILE_FIELD.placeholder}
              value={values.mobileNo}
              onChange={handleChange}
              error={errors.mobileNo}
              prefix={MOBILE_FIELD.prefix}
              maxLength={MOBILE_FIELD.maxLength}
            />

            {/* Consent */}
            <Checkbox
              fieldId={CONSENT_FIELD.id}
              checked={values.privacyConsent}
              onChange={handleChange}
              error={errors.privacyConsent}
            >
              {CONSENT_FIELD.text} <a href={CONSENT_FIELD.linkUrl}>{CONSENT_FIELD.linkText}</a> {CONSENT_FIELD.additionalText}
            </Checkbox>

            {/* Proceed Button */}
            <button type="submit" className="ij-get-started__submit-btn">
              {PROCEED_BUTTON_LABEL}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
