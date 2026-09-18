import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { WELLNESS_CATEGORIES, AYURVEDA_PRINCIPLES } from '../../data/wellnessContent';
import { ROUTES } from '../../constants/routes';

export const AyushCentrePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Active category defaults to first item so the initial tab state visibly matches the content displayed
  const [activeCategory, setActiveCategory] = useState(WELLNESS_CATEGORIES[0]);

  const ayushSpeech = t(
    'ayush.speech',
    'Welcome to the Ayurveda and AYUSH Centre. Explore holistic lifestyle guidance, daily Dinacharya routines, yoga, and consult verified Vaidyas.'
  );

  const displayCategory = activeCategory || WELLNESS_CATEGORIES[0];

  return (
    <div className="ayush-page animate-fade-in">
      <div className="ayush-container">

        {/* ── Breadcrumb Row ── */}
        <div className="ayush-breadcrumb-row">
          <button
            type="button"
            className="ayush-btn-back"
            onClick={() => navigate(ROUTES.PATIENT_HOME)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('ayush.backToHome', 'Back to Patient Home')}</span>
          </button>
          <span className="ayush-ministry-badge">
            <span className="icon icon-sm" aria-hidden="true">verified</span>
            {t('ayush.badgeNotice', 'National Digital Health Portal • AYUSH Guidance')}
          </span>
        </div>

        {/* ── Hero Introduction Card ── */}
        <div className="ayush-hero-card">
          <div className="ayush-hero-body">
            <div className="ayush-hero-title-row">
              <span className="icon ayush-hero-icon" aria-hidden="true">spa</span>
              <h1 className="ayush-hero-heading">{t('ayush.title', 'Ayurveda & AYUSH Centre')}</h1>
            </div>
            <p className="ayush-hero-desc">{AYURVEDA_PRINCIPLES.intro}</p>
            <div className="ayush-actions-row">
              <button
                type="button"
                className="ayush-btn-action"
                onClick={() => navigate(`${ROUTES.BOOK_APPOINTMENT}?pathway=ayush`)}
              >
                <span className="icon icon-sm" aria-hidden="true">calendar_month</span>
                <span>{t('ayush.consultVaidya', 'Consult an AYUSH Vaidya')}</span>
              </button>
              <button
                type="button"
                className="ayush-btn-action ayush-btn-action-outline"
                onClick={() => navigate(ROUTES.AYUSH_DOCTORS)}
              >
                <span className="icon icon-sm" aria-hidden="true">person_search</span>
                <span>{t('ayush.findDoctors', 'Find Verified Vaidyas')}</span>
              </button>
            </div>
          </div>
          <AudioAssist text={ayushSpeech} label={t('common.listen', 'Listen')} />
        </div>

        {/* ── Statutory Disclaimer Box ── */}
        <div className="ayush-disclaimer">
          <span className="icon ayush-disclaimer-icon" aria-hidden="true">verified_user</span>
          <p className="ayush-disclaimer-text">
            <strong>{t('ayush.statutoryNotice', 'Statutory Health Notice')}:</strong> {AYURVEDA_PRINCIPLES.disclaimer}
          </p>
        </div>

        {/* ── Wellness Guidance Explorer ── */}
        <div>
          <h2 className="ayush-section-heading">{t('ayush.wellnessHeading', 'Traditional Wellness & Lifestyle Guidance')}</h2>

          {/* Category Tabs — First tab selected by default, visibly matching displayed content */}
          <div className="ayush-category-grid" role="tablist" aria-label="AYUSH Wellness Categories">
            {WELLNESS_CATEGORIES.map((cat) => {
              const isSelected = displayCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  className={`ayush-cat-btn${isSelected ? ' ayush-cat-btn--selected' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-selected={isSelected}
                >
                  <span className="icon ayush-cat-icon" aria-hidden="true">{cat.icon}</span>
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Detail Card */}
          <div className="ayush-detail-card" role="tabpanel">
            <div className="ayush-detail-header">
              <div>
                <div className="ayush-protocol-badge">{t('ayush.protocolLabel', 'Lifestyle Protocol')}</div>
                <h3 className="ayush-detail-title">{displayCategory.title}</h3>
                <p className="ayush-detail-tagline">{displayCategory.tagline}</p>
              </div>
              <AudioAssist
                text={`${displayCategory.title}. ${displayCategory.summary} Practices include: ${displayCategory.practices.map(p => p.name).join(', ')}`}
                label={t('common.listen', 'Listen')}
              />
            </div>

            <p className="ayush-detail-summary">{displayCategory.summary}</p>

            <div className="ayush-practices-grid">
              {displayCategory.practices.map((prac, idx) => (
                <div key={idx} className="ayush-practice-item">
                  <div className="ayush-practice-name">{prac.name}</div>
                  <p className="ayush-practice-desc">{prac.description}</p>
                </div>
              ))}
            </div>

            <div className="ayush-detail-footer">
              <span className="ayush-lifestyle-note">Note: {displayCategory.lifestyleNote}</span>
              <button
                type="button"
                className="ayush-btn-vaidya"
                onClick={() => navigate(`${ROUTES.BOOK_APPOINTMENT}?pathway=ayush`)}
              >
                <span>{t('ayush.consultVaidya', 'Consult an AYUSH Vaidya')}</span>
                <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
