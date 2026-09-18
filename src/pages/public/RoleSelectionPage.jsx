import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const RoleSelectionPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loginDoctor } = useAuth();

  const roleSpeech = "Please select your role. Choose Patient if you are a citizen managing your health records. Choose Doctor if you are a healthcare professional.";

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      <div className="card" style={{ maxWidth: '780px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-xl)' }}>
          <div>
            <h1 className="t-headline-md" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)', fontSize: '24px', lineHeight: '1.3' }}>
              {t('role.title')}
            </h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)', fontSize: '15px', lineHeight: '1.5' }}>
              {t('role.subtitle')}
            </p>
          </div>
          <AudioAssist text={roleSpeech} label="Listen" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
          {/* Patient Card */}
          <div
            className="card role-card role-card--patient"
            tabIndex={0}
            role="button"
            aria-label={t('role.patientTitle')}
            onClick={() => navigate(ROUTES.PATIENT_AUTH)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(ROUTES.PATIENT_AUTH);
              }
            }}
            style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-surface-container-lowest)' }}
          >
            <div
              className="role-card__icon"
              style={{ width: '4.5rem', height: '4.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-fixed)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)', transition: 'background-color 180ms ease-out, color 180ms ease-out, transform 180ms ease-out' }}
            >
              <span className="icon" style={{ fontSize: '36px' }} aria-hidden="true">person</span>
            </div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 6px', color: 'var(--color-primary)' }}>
              {t('role.patientTitle')}
            </h2>
            <p className="t-body-sm" style={{ color: 'var(--color-on-surface-variant)', flex: 1, margin: '0 0 var(--space-lg)' }}>
              {t('role.patientDesc')}
            </p>
            <button
              type="button"
              className="btn btn-surface btn-full"
              tabIndex={-1}
              aria-hidden="true"
              style={{ pointerEvents: 'none' }}
            >
              <span>{t('role.continueAsPatient')}</span>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          {/* Doctor Card */}
          <div
            className="card role-card role-card--doctor"
            tabIndex={0}
            role="button"
            aria-label={t('role.doctorTitle')}
            onClick={() => {
              loginDoctor();
              navigate(ROUTES.DOCTOR_PORTAL);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                loginDoctor();
                navigate(ROUTES.DOCTOR_PORTAL);
              }
            }}
            style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'var(--color-surface-container-lowest)' }}
          >
            <div
              className="role-card__icon"
              style={{ width: '4.5rem', height: '4.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-secondary-fixed)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)', transition: 'background-color 180ms ease-out, color 180ms ease-out, transform 180ms ease-out' }}
            >
              <span className="icon" style={{ fontSize: '36px' }} aria-hidden="true">stethoscope</span>
            </div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)' }}>
              {t('role.doctorTitle')}
            </h2>
            <p className="t-body-sm" style={{ color: 'var(--color-on-surface-variant)', flex: 1, margin: '0 0 var(--space-lg)' }}>
              {t('role.doctorDesc')}
            </p>
            <button
              type="button"
              className="btn btn-surface btn-full"
              tabIndex={-1}
              aria-hidden="true"
              style={{ pointerEvents: 'none' }}
            >
              <span>{t('role.continueAsDoctor')}</span>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
          <button
            type="button"
            className="btn btn-surface"
            onClick={() => navigate(ROUTES.LANGUAGE)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('common.back')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
