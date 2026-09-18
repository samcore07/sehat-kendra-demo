import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { ROUTES } from '../../constants/routes';

export const AppFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/logo.png" alt="SEHAT KENDRA Logo" width="32" height="32" style={{ objectFit: 'contain' }} />
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)' }}>SEHAT KENDRA</span>
            </div>
            <p className="t-body-sm" style={{ color: 'var(--color-on-surface-variant)', margin: '0 0 12px' }}>
              {t('footer.tagline', 'Digital healthcare platform prototype designed for universal health intake and clinical workflows.')}
            </p>
            <span className="badge badge-secondary">{t('footer.registry', 'Healthcare Prototype Portal')}</span>
          </div>

          {/* Clinical Services */}
          <div className="site-footer__col">
            <h3 className="site-footer__col-title">{t('footer.clinical_services', 'Clinical Services')}</h3>
            <ul>
              <li><Link to={ROUTES.HEALTH_INTAKE}>OPD Consultation Intake</Link></li>
              <li><Link to={ROUTES.PATIENT_PROFILE}>e-Prescription Verification</Link></li>
              <li><Link to={ROUTES.AYUSH}>Ayush Integrated Protocols</Link></li>
              <li><Link to={ROUTES.PATIENT_AUTH}>ABHA Card Linkage</Link></li>
            </ul>
          </div>

          {/* Institutional Support */}
          <div className="site-footer__col">
            <h3 className="site-footer__col-title">{t('footer.institutional', 'Support & Facilities')}</h3>
            <ul>
              <li><Link to={ROUTES.DOCTOR_PORTAL}>Hospital Triage Node</Link></li>
              <li><Link to={ROUTES.DOCTOR_PORTAL}>ASHA / MO Dashboard</Link></li>
              <li><Link to={ROUTES.PATIENT_HOME}>Tele-Manas / eSanjeevani</Link></li>
              <li><a href="#help">Grievance Redressal (14477)</a></li>
            </ul>
          </div>

          {/* Civic Assurance */}
          <div className="site-footer__col">
            <h3 className="site-footer__col-title">{t('footer.civic_assurance', 'Civic Assurance')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                <span className="icon icon-sm" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">verified_user</span>
                <span>{t('status.encrypted', '256-Bit SSL Encrypted')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                <span className="icon icon-sm" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">support_agent</span>
                <span>{t('footer.helpdesk_24x7', '24x7 Help Desk: 1800-11-4477')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                <span className="icon icon-sm" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">volunteer_activism</span>
                <span>{t('footer.free_service', '100% Free Public Utility')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">{t('footer.copyright', '© 2026 SEHAT KENDRA • Digital Healthcare Platform Prototype')}</p>
          <nav className="site-footer__legal" aria-label="Legal links">
            <a href="#privacy">{t('footer.privacy', 'Privacy Policy')}</a>
            <a href="#terms">{t('footer.terms', 'Terms of Use')}</a>
            <a href="#a11y">{t('footer.accessibility', 'Accessibility Statement')}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
