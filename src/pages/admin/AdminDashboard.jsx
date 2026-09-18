import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPatients } from '../../data/mockPatients';
import { PatientContext } from '../../contexts/PatientContext';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { prescriptions, updatePrescriptionStatus } = useContext(PatientContext);
  const [patients] = useState(mockPatients);
  const [selectedQueueTab, setSelectedQueueTab] = useState('all');

  const handleVerify = (id) => {
    updatePrescriptionStatus(id, 'Verified');
  };

  const handleNeedsAttention = (id) => {
    updatePrescriptionStatus(id, 'Needs Attention');
  };

  return (
    <div className="portal-page animate-fade-in">
      {/* Admin Masthead */}
      <div className="portal-page__header">
        <div className="portal-page__header-row">
          <div>
            <h1 className="portal-page__title">Hospital OPD Triage & Clinical Dashboard</h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              Dr. Ram Manohar Lohia Hospital, New Delhi • HFR: IN-DL-001948 • ABDM Hub Node
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)', fontSize: '12px', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-tertiary)' }} />
              ABDM GATEWAY ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Admin Key Metrics */}
      <div className="admin-stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon stat-card__icon--primary">
            <span className="icon icon-xl" aria-hidden="true">bed</span>
          </div>
          <div>
            <div className="stat-card__label">Beds Available</div>
            <div className="stat-card__value">24</div>
            <div className="stat-card__sub">/ 80 total · 56 occupied</div>
          </div>
        </div>

        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon stat-card__icon--secondary">
            <span className="icon icon-xl" aria-hidden="true">queue</span>
          </div>
          <div>
            <div className="stat-card__label">OPD Queue Today</div>
            <div className="stat-card__value">{patients.length}</div>
            <div className="stat-card__sub">General Medicine</div>
          </div>
        </div>

        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon stat-card__icon--tertiary">
            <span className="icon icon-xl" aria-hidden="true">verified_user</span>
          </div>
          <div>
            <div className="stat-card__label">ABDM Records Synced</div>
            <div className="stat-card__value">1,204</div>
            <div className="stat-card__sub">Weekly Milestone 100%</div>
          </div>
        </div>

        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-error-container)', color: 'var(--color-on-error-container)' }}>
            <span className="icon icon-xl" aria-hidden="true">emergency</span>
          </div>
          <div>
            <div className="stat-card__label">Emergency Alerts</div>
            <div className="stat-card__value">2</div>
            <div className="stat-card__sub">ICU Bed Pressure</div>
          </div>
        </div>
      </div>

      {/* OPD Queue Table */}
      <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
            <h2 className="t-headline-sm" style={{ margin: 0 }}>Live Patient OPD Queue</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className={`btn btn-sm ${selectedQueueTab === 'all' ? 'btn-primary' : 'btn-surface'}`}
                onClick={() => setSelectedQueueTab('all')}
              >
                All Patients ({patients.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${selectedQueueTab === 'waiting' ? 'btn-primary' : 'btn-surface'}`}
                onClick={() => setSelectedQueueTab('waiting')}
              >
                Waiting
              </button>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="queue-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Patient Name</th>
                <th>ABHA ID</th>
                <th>Assigned Ward</th>
                <th>Status</th>
                <th>Clinical Action</th>
              </tr>
            </thead>
            <tbody>
              {patients
                .filter((p) => selectedQueueTab === 'all' || p.status === selectedQueueTab)
                .map((p) => (
                  <tr key={p.id}>
                    <td><strong style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>{p.token}</strong></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>{p.nameLocal} • {p.age} Yrs</div>
                    </td>
                    <td><code style={{ fontSize: '12px' }}>{p.abha}</code></td>
                    <td>{p.ward}</td>
                    <td>
                      <span className={`badge ${p.status === 'in_consult' ? 'badge-secondary' : p.status === 'discharged' ? 'badge-tertiary' : 'badge-outline'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-surface btn-sm"
                        onClick={() => navigate(`/admin/patients/${p.id}`)}
                      >
                        <span className="icon icon-sm" aria-hidden="true">assignment_ind</span>
                        <span>Open Dossier</span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription Verification Review Queue (SIH Workflow Step) */}
      <div className="card">
        <div className="card-body">
          <h2 className="t-headline-sm" style={{ margin: '0 0 4px' }}>Prescription Verification Queue (Citizen Uploads)</h2>
          <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
            Review citizen-uploaded prescriptions, verify generic active pharmaceutical ingredients, and certify ABDM validity.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {prescriptions.map((rx) => (
              <div key={rx.id} style={{ padding: '16px', background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>{rx.title} ({rx.id})</span>
                    <span className={`badge ${rx.status === 'Verified' ? 'badge-tertiary' : rx.status === 'Needs Attention' ? 'badge-error' : 'badge-outline'}`}>
                      {rx.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                    Physician: {rx.doctor} • Facility: {rx.facility}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-primary)', marginTop: '4px' }}>
                    Drugs: {rx.medicines?.map((m) => m.name).join(', ')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={rx.status === 'Verified'}
                    onClick={() => handleVerify(rx.id)}
                  >
                    <span className="icon icon-sm" aria-hidden="true">check</span>
                    <span>Verify Prescription</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-surface btn-sm"
                    onClick={() => handleNeedsAttention(rx.id)}
                  >
                    <span className="icon icon-sm" aria-hidden="true">flag</span>
                    <span>Needs Attention</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
