import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';

export const GovRibbon = () => {
  const { lang, setLang, t } = useLanguage();
  const { toggleContrast, setFontScale } = useTheme();

  return (
    <div className="gov-ribbon" role="banner" aria-label="Government of India official portal ribbon">
      <div className="gov-ribbon__inner">
        <div className="gov-ribbon__left">
          <span className="gov-ribbon__toll">
            <span className="icon icon-sm" aria-hidden="true">call</span>
            <span>{t('header.toll_free', 'Toll Free: 1800-11-4477')}</span>
          </span>
          <span className="gov-ribbon__separator hide-mobile">|</span>
          <span className="gov-ribbon__mission hide-mobile">{t('header.gov_label', 'National Digital Health Initiative • Citizen Portal')}</span>
        </div>

        <div className="gov-ribbon__right">
          {/* Font resizing */}
          <div className="a11y-font-controls" role="group" aria-label="Adjust font size">
            <button type="button" onClick={() => setFontScale('normal')} title="Normal text size">A-</button>
            <span className="gov-ribbon__separator" aria-hidden="true">|</span>
            <button type="button" onClick={() => setFontScale('normal')} title="Default size">A</button>
            <span className="gov-ribbon__separator" aria-hidden="true">|</span>
            <button type="button" onClick={() => setFontScale('xl')} title="Larger size">A+</button>
          </div>

          {/* Contrast toggle */}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={toggleContrast}
            aria-label="Toggle high contrast mode"
          >
            <span className="icon icon-sm" aria-hidden="true">contrast</span>
            <span className="hide-mobile">{t('a11y.contrast', 'Contrast')}</span>
          </button>

          {/* Multilingual Selector */}
          <div className="lang-switcher" role="group" aria-label="Select language">
            <button
              type="button"
              className="lang-btn"
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              English
            </button>
            <span className="gov-ribbon__separator" aria-hidden="true">|</span>
            <button
              type="button"
              className="lang-btn"
              aria-pressed={lang === 'bn'}
              onClick={() => setLang('bn')}
            >
              বাংলা
            </button>
            <span className="gov-ribbon__separator" aria-hidden="true">|</span>
            <button
              type="button"
              className="lang-btn"
              aria-pressed={lang === 'hi'}
              onClick={() => setLang('hi')}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
