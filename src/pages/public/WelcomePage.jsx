import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const WelcomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const welcomeSpeech = "Welcome to SEHAT KENDRA, the National Digital Health Gateway. Click Get Started or Choose Language to begin your citizen healthcare journey.";

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      {/* Top Ministry Ribbon Badge */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <span className="badge badge-primary" style={{ padding: '6px 16px', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em' }}>
          {t('common.govLabel')}
        </span>
      </div>

      {/* Hero Welcome Card */}
      <div className="card" style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--space-2xl)', textAlign: 'center', position: 'relative' }}>
        {/* Floating Audio Assist */}
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <AudioAssist text={welcomeSpeech} label="Listen" />
        </div>

        <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-lowest)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)', padding: '8px', border: '1px solid var(--color-outline-variant)' }}>
          <img src="/logo.png" alt="SEHAT KENDRA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>

        <h1 className="t-headline-lg" style={{ color: 'var(--color-on-surface)', margin: '0 0 8px', fontSize: 'clamp(26px, 3.5vw, 32px)' }}>
          {t('welcome.title')}
        </h1>

        <p className="t-headline-sm" style={{ color: 'var(--color-primary)', margin: '0 0 16px', fontWeight: 600 }}>
          {t('welcome.subtitle')}
        </p>

        <p className="t-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '580px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          {t('welcome.desc')}
        </p>

        {/* Primary CTA and Language Switcher Entry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px', margin: '0 auto 28px' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => navigate(ROUTES.LANGUAGE)}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>{t('welcome.getStarted')}</span>
            <span className="icon icon-md" aria-hidden="true">arrow_forward</span>
          </button>

          <button
            type="button"
            className="btn btn-surface btn-md"
            onClick={() => navigate(ROUTES.LANGUAGE)}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span className="icon icon-sm" aria-hidden="true">language</span>
            <span>{t('welcome.chooseLanguage')}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-lg)', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="icon icon-sm" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">verified_user</span>
            <span>{t('welcome.trust1')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="icon icon-sm" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">lock</span>
            <span>{t('welcome.trust2')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="icon icon-sm" style={{ color: 'var(--color-primary)' }} aria-hidden="true">record_voice_over</span>
            <span>{t('welcome.trust3')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
