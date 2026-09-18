import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { PatientContext } from '../../contexts/PatientContext';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const ProfileReviewPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { intakeData } = useContext(PatientContext);
  const navigate = useNavigate();

  const profileSpeech = "Your health profile has been created successfully. Review your basic health metrics, existing conditions, current medicines, and current health concerns. Then click Go to Patient Home.";

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      <div className="card" style={{ maxWidth: '820px', margin: '0 auto', padding: 'var(--space-2xl)' }}>
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-sm)' }}>
            <span className="icon icon-xl icon-fill" aria-hidden="true">check_circle</span>
          </div>
          <h1 className="t-headline-lg" style={{ color: 'var(--color-on-surface)', margin: '0 0 6px' }}>
            {t('profile.title')}
          </h1>
          <p className="t-body-md" style={{ color: 'var(--color-on-surface-variant)', margin: 0 }}>
            {t('profile.subtitle')}
          </p>
          <div style={{ marginTop: '12px' }}>
            <AudioAssist text={profileSpeech} label="Listen to Profile Summary" />
          </div>
        </div>

        {/* Patient Identity Strip */}
        <div className="patient-id-strip" style={{ marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div className="patient-id-strip__avatar">
              {intakeData?.fullName?.charAt(0) || 'P'}
              <span className="patient-id-strip__verified-badge icon icon-fill" aria-label="ABHA verified">check_circle</span>
            </div>
            <div>
              <div className="patient-id-strip__name">
                <span className="t-headline-sm" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  {intakeData?.fullName || user?.name || 'Citizen'}
                </span>
                <span className="badge badge-tertiary">Verified Citizen</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                ABHA ID: <strong style={{ color: 'var(--color-on-surface)' }}>{user?.abha || '91-4421-8890-1204'}</strong> • Gender: {intakeData?.gender || 'Not specified'} • Blood: {intakeData?.bloodGroup || 'Unknown'}
              </div>
            </div>
          </div>
        </div>

        {/* Consolidated Profile Review Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          {/* Card 1: Conditions */}
          <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="t-label-md" style={{ margin: '0 0 8px', color: 'var(--color-primary)' }}>
              Existing Conditions
            </h3>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--color-on-surface)' }}>
              {intakeData.hypertension && <li>Hypertension (High BP)</li>}
              {intakeData.diabetes && <li>Diabetes Mellitus</li>}
              {intakeData.asthma && <li>Asthma / Respiratory</li>}
              {intakeData.otherConditions && <li>{intakeData.otherConditions}</li>}
              {!intakeData.hypertension && !intakeData.diabetes && !intakeData.asthma && !intakeData.otherConditions && <li>None reported</li>}
            </ul>
          </div>

          {/* Card 2: Current Medicines */}
          <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="t-label-md" style={{ margin: '0 0 8px', color: 'var(--color-primary)' }}>
              Current Medications
            </h3>
            {intakeData.medicines?.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--color-on-surface)' }}>
                {intakeData.medicines.map((m, i) => (
                  <li key={i}>{m.name} ({m.frequency})</li>
                ))}
              </ul>
            ) : (
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>No active medications</span>
            )}
          </div>

          {/* Card 3: Allergies & Surgeries */}
          <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="t-label-md" style={{ margin: '0 0 8px', color: 'var(--color-primary)' }}>
              Allergies & Medical History
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--color-on-surface)' }}>
              <p style={{ margin: '0 0 4px' }}><strong>Allergies:</strong> {intakeData.allergies || 'None'}</p>
              <p style={{ margin: '0 0 4px' }}><strong>Surgeries:</strong> {intakeData.surgeries || 'None'}</p>
              <p style={{ margin: 0 }}><strong>Hospitalizations:</strong> {intakeData.hospitalizations || 'None'}</p>
            </div>
          </div>

          {/* Card 4: Health Concerns */}
          <div style={{ padding: 'var(--space-md)', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="t-label-md" style={{ margin: '0 0 8px', color: 'var(--color-primary)' }}>
              Primary Health Concern
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-on-surface)' }}>
              {intakeData.primaryConcern || 'Routine health evaluation'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
          <button
            type="button"
            className="btn btn-surface"
            onClick={() => navigate(ROUTES.HEALTH_INTAKE)}
          >
            <span className="icon icon-sm" aria-hidden="true">edit</span>
            <span>Edit Answers</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => navigate(ROUTES.PATIENT_HOME)}
          >
            <span>{t('profile.homeBtn')}</span>
            <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
