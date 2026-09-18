import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PatientContext } from '../../contexts/PatientContext';
import { ROUTES } from '../../constants/routes';

export const PatientProfilePage = () => {
  const { user } = useAuth();
  const { intakeData } = useContext(PatientContext);
  const navigate = useNavigate();

  return (
    <div className="portal-page animate-fade-in" style={{ padding: 'var(--space-xl) var(--gutter-mobile)' }}>
      <div className="portal-page__header">
        <div className="portal-page__header-row">
          <div>
            <h1 className="portal-page__title">Digital Health Identity Profile</h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              ABDM Verified Citizen Record
            </p>
          </div>
          <button type="button" className="btn btn-surface btn-sm" onClick={() => navigate(ROUTES.HEALTH_INTAKE)}>
            Update Health History
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'var(--space-lg)' }}>
          <div className="patient-id-strip__avatar" style={{ width: '4rem', height: '4rem', fontSize: '24px' }}>
            {intakeData.fullName?.charAt(0) || 'P'}
          </div>
          <div>
            <h2 className="t-headline-sm" style={{ margin: 0 }}>{intakeData.fullName || user?.name || 'Citizen'}</h2>
            <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
              ABHA ID: <strong style={{ color: 'var(--color-on-surface)' }}>{user?.abha || '91-4421-8890-1204'}</strong> • {intakeData.gender} • Blood Group: {intakeData.bloodGroup}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-tertiary)', fontWeight: 600, marginTop: '2px' }}>
              ✓ Verified ABDM Health Locker Linked
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', fontSize: '13px' }}>
          <div><strong>District / City:</strong> {intakeData.district || 'Not specified'}</div>
          <div><strong>State:</strong> {intakeData.state || 'Not specified'}</div>
          <div><strong>Mobile:</strong> {intakeData.contactNumber || '+91 98300 12345'}</div>
          <div><strong>Emergency Contact:</strong> {intakeData.emergencyName ? `${intakeData.emergencyName} (${intakeData.emergencyRel})` : 'Not provided'}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" className="btn btn-primary" onClick={() => navigate(ROUTES.PATIENT_HOME)}>
          Back to Patient Home
        </button>
      </div>
    </div>
  );
};
