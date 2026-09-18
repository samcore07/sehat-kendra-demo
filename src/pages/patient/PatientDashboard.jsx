import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { PatientContext } from '../../contexts/PatientContext';
import { ROUTES } from '../../constants/routes';

export const PatientDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { intakeData, prescriptions } = useContext(PatientContext);

  return (
    <div className="portal-page animate-fade-in">
      {/* Header */}
      <div className="portal-page__header">
        <div className="portal-page__header-row">
          <div>
            <h1 className="portal-page__title">{t('patient.dashboard')}</h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              Welcome back, {user?.name || 'Smt. Ananya Sen'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to={ROUTES.HEALTH_INTAKE} className="btn btn-surface btn-sm">
              <span className="icon icon-sm" aria-hidden="true">assignment</span>
              <span>Intake Form</span>
            </Link>
            <Link to={ROUTES.PRESCRIPTIONS} className="btn btn-primary btn-sm">
              <span className="icon icon-sm" aria-hidden="true">upload_file</span>
              <span>Upload Prescription</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Patient Identity Strip */}
      <div className="patient-id-strip" role="region" aria-label="Patient identity information">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div className="patient-id-strip__avatar">
            AS
            <span className="patient-id-strip__verified-badge icon icon-fill" aria-label="ABHA verified">check_circle</span>
          </div>
          <div className="patient-id-strip__info">
            <div className="patient-id-strip__name">
              <span className="t-headline-md" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>
                {user?.name || 'Smt. Ananya Sen'}
              </span>
              <span className="t-headline-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                (শ্রীমতি অনন্যা সেন)
              </span>
              <span className="badge badge-tertiary">
                <span className="icon icon-sm icon-fill" aria-hidden="true">verified</span>
                <span>{t('patient.verified_citizen')}</span>
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }} className="t-body-sm">
              <span><strong>ABHA ID:</strong> <code style={{ color: 'var(--color-on-surface)' }}>{user?.abha || '91-4421-8890-1204'}</code></span>
              <span>•</span>
              <span>52 Yrs, Female</span>
              <span>•</span>
              <span>Blood Group: {intakeData?.bloodGroup || 'B+'}</span>
              <span>•</span>
              <span style={{ color: 'var(--color-tertiary)', fontWeight: 700 }}>Active Session #WB-2026-904</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-surface btn-sm">
            <span className="icon icon-sm" aria-hidden="true">download</span>
            <span>ABHA Card</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon stat-card__icon--primary">
            <span className="icon icon-xl" aria-hidden="true">medication</span>
          </div>
          <div>
            <div className="stat-card__label">{t('patient.prescriptions')}</div>
            <div className="stat-card__value">{prescriptions.length}</div>
            <div className="stat-card__sub">{prescriptions.filter(p => p.status === 'Verified').length} Verified</div>
          </div>
        </div>

        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon stat-card__icon--secondary">
            <span className="icon icon-xl" aria-hidden="true">calendar_month</span>
          </div>
          <div>
            <div className="stat-card__label">{t('patient.appointments')}</div>
            <div className="stat-card__value">1</div>
            <div className="stat-card__sub">05 Sep · RMLH OPD</div>
          </div>
        </div>

        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon stat-card__icon--tertiary">
            <span className="icon icon-xl" aria-hidden="true">spa</span>
          </div>
          <div>
            <div className="stat-card__label">Ayurveda Care</div>
            <div className="stat-card__value">Active</div>
            <div className="stat-card__sub">Lifestyle protocol</div>
          </div>
        </div>

        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-secondary-fixed)', color: 'var(--color-secondary)' }}>
            <span className="icon icon-xl" aria-hidden="true">verified_user</span>
          </div>
          <div>
            <div className="stat-card__label">ABDM Consents</div>
            <div className="stat-card__value">3</div>
            <div className="stat-card__sub">Active Linkages</div>
          </div>
        </div>
      </div>

      {/* Two-Column Detail Grid */}
      <div className="content-grid-2">
        {/* Next Scheduled OPD Appointment */}
        <div className="card">
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
              <h2 className="t-headline-sm" style={{ margin: 0 }}>Upcoming OPD Consultation</h2>
              <Link to={ROUTES.APPOINTMENTS} className="btn btn-ghost btn-sm">{t('common.view_all')}</Link>
            </div>
            <div style={{ background: 'var(--color-primary-container)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-md)', color: 'var(--color-on-primary-container)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="icon icon-lg" style={{ color: 'var(--color-on-primary)' }} aria-hidden="true">calendar_month</span>
                </div>
                <div>
                  <div className="t-headline-sm" style={{ fontWeight: 700 }}>Dr. Priya Sharma</div>
                  <div className="t-body-sm" style={{ opacity: 0.9 }}>General Medicine · Dr. Ram Manohar Lohia Hospital, OPD Room 14</div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap' }} className="t-label-sm">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="icon icon-sm" aria-hidden="true">schedule</span> 05 Sep 2026 · 10:30 AM
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span className="icon icon-sm" aria-hidden="true">confirmation_number</span> Token #OPD-0045
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="card">
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
              <h2 className="t-headline-sm" style={{ margin: 0 }}>Active Prescriptions</h2>
              <Link to={ROUTES.PRESCRIPTIONS} className="btn btn-ghost btn-sm">{t('common.view_all')}</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {prescriptions.map((rx) => (
                <div key={rx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-outline-variant)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{rx.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>{rx.doctor} • {rx.date}</div>
                  </div>
                  <span className={`badge ${rx.status === 'Verified' ? 'badge-tertiary' : 'badge-outline'}`}>
                    {rx.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
