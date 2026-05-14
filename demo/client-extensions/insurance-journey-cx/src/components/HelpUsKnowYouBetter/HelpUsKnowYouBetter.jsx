/**
 * HelpUsKnowYouBetter (Step 1)
 * ----------------------------
 * The main form section that composes all input components.
 */

import React from 'react';
import {
  ChipGroup,
  TextInput,
  ToggleGroup,
  BannerCarousel,
} from '../index';
import {
  FORM_TITLE,
  EDUCATIONAL_QUALIFICATION,
  OCCUPATION,
  ANNUAL_INCOME,
  EMAIL_FIELD,
  PINCODE_FIELD,
  SMOKER_FIELD,
  FINANCIAL_ANALYSIS_FIELD,
  SUBMIT_BUTTON_LABEL,
  IMAGES,
} from '../../constants';
import { useInsuranceForm } from '../../hooks';
import './HelpUsKnowYouBetter.css';

function HelpUsKnowYouBetter({ onProceed }) {
  const formState = useInsuranceForm();
  // Support both 'values' and 'formValues' for backward compatibility during transition
  const { 
    values: v, 
    formValues, 
    errors = {}, 
    handleChange, 
    handleSelect, 
    handleSubmit = () => {} 
  } = formState || {};
  
  const values = v || formValues || {};
  const onChange = handleChange || handleSelect || (() => {});

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit((formData) => {
      console.log('Step 1 Submitted:', formData);
      if (onProceed) onProceed(formData);
    });
  };

  return (
    <section className="ij-form-section">
      <div className="ij-form-section__container">
        {/* Banner Carousel Column */}
        <div className="ij-form-section__banner-col">
          <BannerCarousel images={IMAGES.heroBanners} />
        </div>

        {/* Form Column */}
        <div className="ij-form-section__form-col">
          <h2 className="ij-form-section__title">{FORM_TITLE}</h2>

          <form className="ij-form-section__form" onSubmit={onFormSubmit} noValidate>
            {/* Educational Qualification */}
            <ChipGroup
              fieldId={EDUCATIONAL_QUALIFICATION.id}
              label={EDUCATIONAL_QUALIFICATION.label}
              required={EDUCATIONAL_QUALIFICATION.required}
              options={EDUCATIONAL_QUALIFICATION.options}
              selected={values.educationalQualification}
              onSelect={onChange}
              error={errors.educationalQualification}
            />

            {/* Occupation */}
            <ChipGroup
              fieldId={OCCUPATION.id}
              label={OCCUPATION.label}
              required={OCCUPATION.required}
              options={OCCUPATION.options}
              selected={values.occupation}
              onSelect={onChange}
              error={errors.occupation}
            />

            {/* Annual Income */}
            <ChipGroup
              fieldId={ANNUAL_INCOME.id}
              label={ANNUAL_INCOME.label}
              required={ANNUAL_INCOME.required}
              options={ANNUAL_INCOME.options}
              selected={values.annualIncome}
              onSelect={onChange}
              error={errors.annualIncome}
              hasTooltip={ANNUAL_INCOME.hasTooltip}
              tooltipText={ANNUAL_INCOME.tooltipText}
            />

            {/* Email and Pincode Row */}
            <div className="ij-form-section__row">
              <TextInput
                fieldId={EMAIL_FIELD.id}
                label={EMAIL_FIELD.label}
                required={EMAIL_FIELD.required}
                type={EMAIL_FIELD.type}
                placeholder={EMAIL_FIELD.placeholder}
                value={values.emailId}
                onChange={onChange}
                error={errors.emailId}
              />
              <TextInput
                fieldId={PINCODE_FIELD.id}
                label={PINCODE_FIELD.label}
                required={PINCODE_FIELD.required}
                type={PINCODE_FIELD.type}
                placeholder={PINCODE_FIELD.placeholder}
                value={values.pincode}
                onChange={onChange}
                error={errors.pincode}
                maxLength={PINCODE_FIELD.maxLength}
              />
            </div>

            {/* Smoker Toggle */}
            <ToggleGroup
              fieldId={SMOKER_FIELD.id}
              label={SMOKER_FIELD.label}
              required={SMOKER_FIELD.required}
              options={SMOKER_FIELD.options}
              selected={values.isSmoker}
              onSelect={onChange}
              error={errors.isSmoker}
            />

            {/* Financial Analysis Toggle */}
            <ToggleGroup
              fieldId={FINANCIAL_ANALYSIS_FIELD.id}
              label={FINANCIAL_ANALYSIS_FIELD.label}
              required={FINANCIAL_ANALYSIS_FIELD.required}
              options={FINANCIAL_ANALYSIS_FIELD.options}
              selected={values.financialAnalysis}
              onSelect={onChange}
              error={errors.financialAnalysis}
            />

            {/* Submit Button */}
            <button type="submit" className="ij-form-section__submit-btn">
              {SUBMIT_BUTTON_LABEL}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HelpUsKnowYouBetter;
