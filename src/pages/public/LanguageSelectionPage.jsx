import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const LanguageSelectionPage = () => {
  const { lang, setLang, t, supportedLanguages } = useLanguage();
  const navigate = useNavigate();

  const guidanceSpeech = "Please select your preferred language from English, Hindi, Bengali, Tamil, Marathi, or Odia. After selecting, click Continue.";

  const handleSelectAndProceed = (code) => {
    setLang(code);
  };

  const handleContinue = () => {
    navigate(ROUTES.ROLE_SELECTION);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      <div className="card" style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        {/* Header & Audio Assist */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-lg)' }}>
          <div>
            <h1 className="t-headline-md" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)' }}>
              {t('lang.title')}
            </h1>
            <p className="t-headline-sm" style={{ margin: '0 0 6px', color: 'var(--color-primary)' }}>
              {t('lang.subtitle')}
            </p>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              {t('lang.instruction')}
            </p>
          </div>
          <AudioAssist text={guidanceSpeech} label="Listen" />
        </div>

        {/* Language Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          {supportedLanguages.map((l) => {
            const isSelected = lang === l.code;
            return (
              <button
                key={l.code}
                type="button"
                className={`card ${isSelected ? 'is-selected' : ''}`}
                style={{
                  padding: 'var(--space-md)',
                  textAlign: 'center',
                  border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                  background: isSelected ? 'var(--color-secondary-container)' : 'var(--color-surface-container-lowest)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleSelectAndProceed(l.code)}
                aria-pressed={isSelected}
              >
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  {l.nativeName}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  {l.name}
                </span>
                {isSelected && (
                  <span className="badge badge-primary" style={{ marginTop: '6px', fontSize: '11px' }}>
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
          <button
            type="button"
            className="btn btn-surface"
            onClick={() => navigate(ROUTES.WELCOME)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('common.back')}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={handleContinue}
          >
            <span>{t('common.continue')}</span>
            <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
