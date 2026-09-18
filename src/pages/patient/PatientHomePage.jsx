import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { PatientContext } from '../../contexts/PatientContext';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { appointmentService } from '../../services/appointmentService';
import { ROUTES } from '../../constants/routes';

export const PatientHomePage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { intakeData } = useContext(PatientContext);
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(() => appointmentService.getLatestAppointment());

  useEffect(() => {
    const handleUpdate = (e) => {
      setAppointment(e.detail || appointmentService.getLatestAppointment());
    };
    window.addEventListener('sk:appointment-updated', handleUpdate);
    return () => window.removeEventListener('sk:appointment-updated', handleUpdate);
  }, []);

  const patientName = intakeData.fullName || user?.name || 'Citizen';
  const homeSpeech = t('home.speech') || `Welcome to your SEHAT KENDRA dashboard, ${patientName}. You can review your health summary, access Care AI, consult Ayurveda and General Medicine specialists, and manage appointments.`;

  // Summary counts
  const activeConditions = [
    intakeData.hypertension && 'Hypertension',
    intakeData.diabetes && 'Diabetes',
    intakeData.asthma && 'Asthma',
    intakeData.otherConditions
  ].filter(Boolean);

  return (
    <div className="patient-dashboard-container animate-fade-in">
      {/* ── TOP: Greeting & Quick Profile Access ──────────────────────────── */}
      <div className="patient-dashboard-header">
        <div className="patient-dashboard-header-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-tertiary">
                <span className="icon icon-sm icon-fill" aria-hidden="true">verified</span>
                <span>ABHA Linked: {user?.abha || '91-4421-8890-1204'}</span>
              </span>
              <span className="badge badge-surface hide-mobile">National Health Mission</span>
            </div>
            <h1 className="patient-dashboard-title">
              {t('home.welcome')} {patientName}
            </h1>
            <p className="patient-dashboard-subtitle">
              Unified Citizen Health Dashboard • Secure & Consent-Protected
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AudioAssist text={homeSpeech} label={t('audio.listen')} />
            <button
              type="button"
              className="btn btn-surface btn-sm"
              onClick={() => navigate(ROUTES.PATIENT_PROFILE)}
              title="View your digital health profile"
            >
              <span className="icon icon-sm" aria-hidden="true">person</span>
              <span>{t('home.openProfile')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SECTION 1 & 2: Health Summary & Upcoming Appointment ─────────── */}
      <div className="dashboard-two-column-grid">
        {/* SECTION 1: Health Summary */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px 20px', height: '100%', boxSizing: 'border-box' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="icon icon-md" style={{ color: 'var(--color-primary)' }} aria-hidden="true">health_and_safety</span>
                <h2 className="dashboard-section-heading" style={{ margin: 0, fontSize: '18px' }}>{t('home.healthSummary')}</h2>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => navigate(ROUTES.PATIENT_PROFILE)}
              >
                {t('home.viewProfile')}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Known Conditions */}
              <div style={{ background: 'var(--color-surface-container-low)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  {t('home.existingConditions')}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeConditions.length > 0 ? (
                    activeConditions.map((cond, idx) => (
                      <span key={idx} className="badge badge-secondary" style={{ fontSize: '12px' }}>
                        {cond}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '13.5px', color: 'var(--color-on-surface)' }}>{t('home.noConditions')}</span>
                  )}
                </div>
              </div>

              {/* Active Medicines */}
              <div style={{ background: 'var(--color-surface-container-low)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  {t('home.currentMeds')} ({intakeData.medicines?.length || 0})
                </span>
                {intakeData.medicines?.length > 0 ? (
                  <span style={{ fontSize: '13.5px', color: 'var(--color-on-surface)' }}>
                    {intakeData.medicines.map((m) => m.name).join(', ')}
                  </span>
                ) : (
                  <span style={{ fontSize: '13.5px', color: 'var(--color-on-surface-variant)' }}>{t('home.noMeds')}</span>
                )}
              </div>

              {/* Allergies */}
              <div style={{ background: 'var(--color-surface-container-low)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                  {t('home.knownAllergies')}
                </span>
                <span style={{ fontSize: '13.5px', color: 'var(--color-on-surface)' }}>
                  {intakeData.allergies || t('home.noneReported')}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <button
              type="button"
              className="dashboard-action-btn"
              onClick={() => navigate(ROUTES.HEALTH_INTAKE)}
            >
              <span className="icon icon-sm" aria-hidden="true">edit_note</span>
              <span>{t('home.updateHistory')}</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: Upcoming Appointment */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px 20px', height: '100%', boxSizing: 'border-box' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="icon icon-md" style={{ color: 'var(--color-secondary)' }} aria-hidden="true">calendar_month</span>
                <h2 className="dashboard-section-heading" style={{ margin: 0, fontSize: '18px' }}>{t('home.upcomingConsultation')}</h2>
              </div>
              {appointment && (
                <span className="badge badge-tertiary">{appointment.status || 'Confirmed'}</span>
              )}
            </div>

            {appointment ? (
              <div style={{ background: 'var(--color-primary-container)', borderRadius: 'var(--radius-xl)', padding: '16px', color: 'var(--color-on-primary-container)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="icon icon-lg" style={{ color: 'var(--color-on-primary)' }} aria-hidden="true">
                      {appointment.treatmentSystem?.includes('Ayurveda') ? 'spa' : 'stethoscope'}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
                      <span className="badge badge-secondary" style={{ fontSize: '11px', padding: '1px 8px' }}>
                        {appointment.treatmentSystem || 'General Medicine'}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)' }}>
                        Token #{appointment.token}
                      </span>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 700, margin: '3px 0' }}>
                      {appointment.doctor}
                    </div>
                    <div style={{ fontSize: '13.5px', opacity: 0.9 }}>
                      {appointment.specialty} • {appointment.facility}
                    </div>
                    <div style={{ marginTop: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', fontWeight: 600 }}>
                      <span>📅 {appointment.date}</span>
                      <span>⏰ {appointment.time}</span>
                      <span>🏥 {appointment.mode}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px 16px', textAlign: 'center', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)' }}>
                <span className="icon icon-xl" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '8px' }} aria-hidden="true">event_available</span>
                <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', margin: '0 0 14px', lineHeight: 1.5 }}>
                  {t('home.noAptDesc')}
                </p>
                <button
                  type="button"
                  className="dashboard-action-btn"
                  onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
                >
                  <span className="icon icon-sm" aria-hidden="true">calendar_add_on</span>
                  <span>{t('home.bookNow')}</span>
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="dashboard-action-btn"
              style={{ flex: 1 }}
              onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
            >
              {t('home.scheduleAnother')}
            </button>
            {appointment && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => appointmentService.cancelAppointment(appointment.id)}
              >
                {t('home.cancelVisit')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Primary Health Actions (Strict 4-Column Grid) ──────── */}
      <div style={{ marginBottom: '32px' }}>
        <h2 className="dashboard-section-heading">
          {t('home.primaryActions')}
        </h2>
        <div className="primary-actions-grid">
          {/* Action 1: Book Appointment */}
          <div className="primary-action-card action-card-accent-1">
            <div className="action-card-icon">
              <span className="icon" style={{ color: 'var(--color-primary)' }} aria-hidden="true">calendar_month</span>
            </div>
            <h3 className="action-card-title">{t('home.bookApt')}</h3>
            <p className="action-card-desc">
              {t('home.bookAptDesc')}
            </p>
            <button
              type="button"
              className="dashboard-action-btn"
              onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
            >
              <span>{t('home.bookApt')}</span>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          {/* Action 2: Care AI */}
          <div className="primary-action-card action-card-accent-2">
            <div className="action-card-icon">
              <span className="icon" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">support_agent</span>
            </div>
            <h3 className="action-card-title">{t('home.careAiTitle')}</h3>
            <p className="action-card-desc">
              {t('home.careAiDesc')}
            </p>
            <button
              type="button"
              className="dashboard-action-btn"
              onClick={() => navigate(ROUTES.CARE_AI)}
            >
              <span>{t('home.openCareAi')}</span>
              <span className="icon icon-sm" aria-hidden="true">chat</span>
            </button>
          </div>

          {/* Action 3: Ayurveda / AYUSH */}
          <div className="primary-action-card action-card-accent-3">
            <div className="action-card-icon">
              <span className="icon" style={{ color: 'var(--color-secondary)' }} aria-hidden="true">spa</span>
            </div>
            <h3 className="action-card-title">{t('home.ayushTitle')}</h3>
            <p className="action-card-desc">
              {t('home.ayushCardDesc')}
            </p>
            <button
              type="button"
              className="dashboard-action-btn"
              onClick={() => navigate(ROUTES.AYUSH)}
            >
              <span>{t('home.exploreAyush')}</span>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          {/* Action 4: Health Profile */}
          <div className="primary-action-card action-card-accent-4">
            <div className="action-card-icon">
              <span className="icon" style={{ color: 'var(--color-primary)' }} aria-hidden="true">contact_page</span>
            </div>
            <h3 className="action-card-title">{t('home.healthProfileTitle')}</h3>
            <p className="action-card-desc">
              {t('home.healthProfileDesc')}
            </p>
            <button
              type="button"
              className="dashboard-action-btn"
              onClick={() => navigate(ROUTES.PATIENT_PROFILE)}
            >
              <span>{t('home.openProfile')}</span>
              <span className="icon icon-sm" aria-hidden="true">visibility</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── SECTION 4 & 5: Health Management & Wellness Explorer ─────────── */}
      <div className="dashboard-two-column-grid">
        {/* SECTION 4: Health Management */}
        <div className="card" style={{ padding: '22px 20px', height: '100%', boxSizing: 'border-box' }}>
          <h2 className="dashboard-section-heading" style={{ marginBottom: '16px' }}>
            {t('home.healthRecordsTitle')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              className="dashboard-record-item"
              onClick={() => navigate(ROUTES.PROFILE_REVIEW)}
            >
              <div>
                <div className="dashboard-record-title">
                  {t('home.medHistoryTitle')}
                </div>
                <div className="dashboard-record-desc">
                  {t('home.medHistoryDesc')}
                </div>
              </div>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </div>

            <div
              className="dashboard-record-item"
              onClick={() => navigate(ROUTES.HEALTH_INTAKE)}
            >
              <div>
                <div className="dashboard-record-title">
                  {t('home.medRegisterTitle')}
                </div>
                <div className="dashboard-record-desc">
                  {t('home.medRegisterDesc')}
                </div>
              </div>
              <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
            </div>
          </div>
        </div>

        {/* SECTION 5: Preventive Wellness Guidance */}
        <div className="card" style={{ padding: '22px 20px', height: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="dashboard-section-heading" style={{ margin: 0 }}>
              {t('home.wellnessTitle')}
            </h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => navigate(ROUTES.AYUSH)}>
              {t('home.viewAll')}
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              className="dashboard-wellness-item"
              onClick={() => navigate(ROUTES.AYUSH)}
            >
              <span className="icon icon-md" style={{ color: 'var(--color-primary)' }} aria-hidden="true">wb_sunny</span>
              <div>
                <div className="dashboard-wellness-title">{t('home.dinacharyaTitle')}</div>
                <div className="dashboard-wellness-desc">{t('home.dinacharyaDesc')}</div>
              </div>
            </div>

            <div
              className="dashboard-wellness-item"
              onClick={() => navigate(ROUTES.AYUSH)}
            >
              <span className="icon icon-md" style={{ color: 'var(--color-secondary)' }} aria-hidden="true">self_improvement</span>
              <div>
                <div className="dashboard-wellness-title">{t('home.yogaTitle')}</div>
                <div className="dashboard-wellness-desc">{t('home.yogaDesc')}</div>
              </div>
            </div>

            <div
              className="dashboard-wellness-item"
              onClick={() => navigate(ROUTES.AYUSH)}
            >
              <span className="icon icon-md" style={{ color: 'var(--color-tertiary)' }} aria-hidden="true">air</span>
              <div>
                <div className="dashboard-wellness-title">{t('home.pranayamaTitle')}</div>
                <div className="dashboard-wellness-desc">{t('home.pranayamaDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
