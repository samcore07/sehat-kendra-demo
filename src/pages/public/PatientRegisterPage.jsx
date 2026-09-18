import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { PatientContext } from '../../contexts/PatientContext';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const PatientRegisterPage = () => {
  const { t } = useLanguage();
  const { loginPatient } = useAuth();
  const { updateIntake } = useContext(PatientContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: 'Female',
    mobile: '',
    email: '',
    city: '',
    state: 'West Bengal'
  });

  const [errors, setErrors] = useState({});

  const regSpeech = "New Patient Registration. Please enter your full name, date of birth, gender, mobile number, and city to establish your digital health profile.";

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.dob) errs.dob = 'Date of birth is required';
    if (!formData.mobile || formData.mobile.length < 10) errs.mobile = 'Valid 10-digit mobile number required';
    if (!formData.city.trim()) errs.city = 'City or District is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate mock ABHA
    const generatedAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    loginPatient(generatedAbha, formData.fullName);
    updateIntake({
      fullName: formData.fullName,
      dob: formData.dob,
      gender: formData.gender,
      contactNumber: formData.mobile,
      district: formData.city,
      state: formData.state
    });

    navigate(ROUTES.HEALTH_INTAKE);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      <div className="card" style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="/logo.png" alt="SEHAT KENDRA Logo" width="44" height="44" style={{ objectFit: 'contain' }} />
            <div>
              <div className="badge badge-primary" style={{ marginBottom: '4px' }}>Step 1 of 3: Identity Setup</div>
              <h1 className="t-headline-md" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)' }}>
                {t('reg.title')}
              </h1>
              <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
                {t('reg.subtitle')}
              </p>
            </div>
          </div>
          <AudioAssist text={regSpeech} label="Listen" />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Full Name */}
          <div className="form-field">
            <label className="form-label">
              {t('reg.fullName')} <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Smt. Ananya Sen"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            {errors.fullName && <span className="form-hint" style={{ color: 'var(--color-error)' }}>{errors.fullName}</span>}
          </div>

          {/* DOB and Gender */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            <div className="form-field">
              <label className="form-label">
                {t('reg.dob')} <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="date"
                className="form-input"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
              {errors.dob && <span className="form-hint" style={{ color: 'var(--color-error)' }}>{errors.dob}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">
                {t('reg.gender')} <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Mobile and Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            <div className="form-field">
              <label className="form-label">
                {t('reg.mobile')} <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              {errors.mobile && <span className="form-hint" style={{ color: 'var(--color-error)' }}>{errors.mobile}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">{t('reg.email')}</label>
              <input
                type="email"
                className="form-input"
                placeholder="citizen@example.gov.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* City and State */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            <div className="form-field">
              <label className="form-label">
                {t('reg.city')} <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Barasat / Kolkata"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              {errors.city && <span className="form-hint" style={{ color: 'var(--color-error)' }}>{errors.city}</span>}
            </div>

            <div className="form-field">
              <label className="form-label">{t('reg.state')}</label>
              <select
                className="form-select"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              >
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi (NCT)</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Odisha">Odisha</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
              </select>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
            <button
              type="button"
              className="btn btn-surface"
              onClick={() => navigate(ROUTES.PATIENT_AUTH)}
            >
              <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
              <span>{t('common.back')}</span>
            </button>

            <button type="submit" className="btn btn-primary btn-md">
              <span>{t('reg.submit')}</span>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
