import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const PatientAuthPage = () => {
  const { t } = useLanguage();
  const { loginPatient } = useAuth();
  const navigate = useNavigate();

  const [activeMethod, setActiveMethod] = useState(null); // 'abha' | 'aadhaar' | 'phone' | 'existing'
  const [inputValue, setInputValue] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [step, setStep] = useState('input'); // 'input' | 'otp'

  const authSpeech = t(
    'auth.speech',
    'Choose your authentication method. You can use ABHA number, Aadhaar demo verification, mobile phone OTP, or select demo patient login.'
  );

  const handleStartAuth = (method) => {
    setActiveMethod(method);
    setStep('input');
    setInputValue(
      method === 'abha' ? '91-4421-8890-1204' :
      method === 'aadhaar' ? 'XXXX-XXXX-8921' :
      method === 'phone' ? '+91 98300 12345' : ''
    );
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifySuccess = (patientName = 'Smt. Ananya Sen', abhaId = '91-4421-8890-1204') => {
    loginPatient(abhaId, patientName);
    navigate(ROUTES.HEALTH_INTAKE);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      <div className="card" style={{ maxWidth: '820px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="/logo.png" alt="SEHAT KENDRA Logo" width="44" height="44" style={{ objectFit: 'contain' }} />
            <div>
              <div className="badge badge-primary" style={{ marginBottom: '4px' }}>{t('auth.title', 'Citizen Authentication')}</div>
              <h1 className="t-headline-md patient-auth-title" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)', lineHeight: '1.3' }}>
                {t('auth.title')}
              </h1>
              <p className="t-body-sm patient-auth-subtitle" style={{ margin: 0, color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
                {t('auth.subtitle')}
              </p>
            </div>
          </div>
          <AudioAssist text={authSpeech} label={t('common.listen', 'Listen')} />
        </div>

        {/* Prototype Banner */}
        <div style={{ background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-md)', padding: '10px 14px', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
          <span className="icon icon-sm" style={{ color: 'var(--color-primary)' }} aria-hidden="true">info</span>
          <span>{t('auth.demoNotice')}</span>
        </div>

        {/* Modal / Active Auth Input if open */}
        {activeMethod ? (
          <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-xl)', border: '1px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 className="t-headline-sm" style={{ margin: 0, color: 'var(--color-primary)' }}>
                Demo Verification: {activeMethod.toUpperCase()}
              </h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setActiveMethod(null)}>
                Change Method
              </button>
            </div>

            {step === 'input' ? (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '420px' }}>
                <div className="form-field">
                  <label className="form-label">
                    {activeMethod === 'abha' ? 'ABHA ID / Health Number' :
                     activeMethod === 'aadhaar' ? 'Aadhaar Reference (Simulated)' : 'Registered Mobile Number'}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-md">
                  <span>Send Demo OTP</span>
                  <span className="icon icon-sm" aria-hidden="true">send</span>
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleVerifySuccess(); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '420px' }}>
                <div className="form-field">
                  <label className="form-label">Enter Mock OTP (Pre-filled: 123456)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={otpValue || '123456'}
                    onChange={(e) => setOtpValue(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-md">
                  <span>Confirm Verification & Proceed</span>
                  <span className="icon icon-sm" aria-hidden="true">check</span>
                </button>
              </form>
            )}
          </div>
        ) : null}

        {/* 6 Authentication Methods Grid */}
        <div className="patient-auth-grid">
          {/* 1. ABHA */}
          <div className="card patient-auth-option">
            <div>
              <span className="icon icon-lg" style={{ color: 'var(--color-primary)', marginBottom: '6px' }} aria-hidden="true">badge</span>
              <h3 className="patient-auth-option__title">{t('auth.abha')}</h3>
              <p className="patient-auth-option__description">{t('auth.abhaDesc')}</p>
            </div>
            <button type="button" className="btn btn-surface btn-sm patient-auth-option__button" onClick={() => handleStartAuth('abha')}>
              {t('auth.verifyAbha', 'Verify ABHA')}
            </button>
          </div>

          {/* 2. Aadhaar */}
          <div className="card patient-auth-option">
            <div>
              <span className="icon icon-lg" style={{ color: 'var(--color-secondary)', marginBottom: '6px' }} aria-hidden="true">fingerprint</span>
              <h3 className="patient-auth-option__title">{t('auth.aadhaar')}</h3>
              <p className="patient-auth-option__description">{t('auth.aadhaarDesc')}</p>
            </div>
            <button type="button" className="btn btn-surface btn-sm patient-auth-option__button" onClick={() => handleStartAuth('aadhaar')}>
              {t('auth.verifyAadhaar', 'Verify Aadhaar')}
            </button>
          </div>

          {/* 3. Phone */}
          <div className="card patient-auth-option">
            <div>
              <span className="icon icon-lg" style={{ color: 'var(--color-primary)', marginBottom: '6px' }} aria-hidden="true">smartphone</span>
              <h3 className="patient-auth-option__title">{t('auth.phone')}</h3>
              <p className="patient-auth-option__description">{t('auth.phoneDesc')}</p>
            </div>
            <button type="button" className="btn btn-surface btn-sm patient-auth-option__button" onClick={() => handleStartAuth('phone')}>
              {t('auth.mobileOtp', 'Mobile OTP')}
            </button>
          </div>

          {/* 4. Existing Patient */}
          <div className="card patient-auth-option">
            <div>
              <span className="icon icon-lg" style={{ color: 'var(--color-tertiary)', marginBottom: '6px' }} aria-hidden="true">account_circle</span>
              <h3 className="patient-auth-option__title">{t('auth.existing')}</h3>
              <p className="patient-auth-option__description">{t('auth.existingDesc')}</p>
            </div>
            <button type="button" className="btn btn-surface btn-sm patient-auth-option__button" onClick={() => handleVerifySuccess('Smt. Ananya Sen', '91-4421-8890-1204')}>
              {t('auth.useDemo', 'Use Demo Citizen')}
            </button>
          </div>

          {/* 5. Guest Access */}
          <div className="card patient-auth-option">
            <div>
              <span className="icon icon-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '6px' }} aria-hidden="true">visibility</span>
              <h3 className="patient-auth-option__title">{t('auth.guest')}</h3>
              <p className="patient-auth-option__description">{t('auth.guestDesc')}</p>
            </div>
            <button type="button" className="btn btn-surface btn-sm patient-auth-option__button" onClick={() => handleVerifySuccess('Guest Citizen', 'GUEST-0000-0000-0000')}>
              {t('auth.continueGuest', 'Continue as Guest')}
            </button>
          </div>

          {/* 6. New Registration */}
          <div className="card patient-auth-option">
            <div>
              <span className="icon icon-lg" style={{ color: 'var(--color-secondary)', marginBottom: '6px' }} aria-hidden="true">person_add</span>
              <h3 className="patient-auth-option__title">{t('auth.register')}</h3>
              <p className="patient-auth-option__description">{t('auth.registerDesc')}</p>
            </div>
            <button type="button" className="btn btn-surface btn-sm patient-auth-option__button" onClick={() => navigate(ROUTES.PATIENT_REGISTER)}>
              {t('auth.registerNow', 'Register Now')}
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
          <button
            type="button"
            className="btn btn-surface"
            onClick={() => navigate(ROUTES.ROLE_SELECTION)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('common.back')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
