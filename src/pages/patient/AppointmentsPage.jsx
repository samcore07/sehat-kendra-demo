import React, { useState } from 'react';

export const AppointmentsPage = () => {
  const [appointments] = useState([
    {
      id: 'APT-9041',
      doctor: 'Dr. Priya Sharma',
      speciality: 'General Medicine',
      facility: 'Dr. Ram Manohar Lohia Hospital, New Delhi',
      date: '05 Sep 2026',
      time: '10:30 AM',
      type: 'In-Person OPD',
      token: 'OPD-0045',
      status: 'Confirmed'
    }
  ]);

  return (
    <div className="portal-page animate-fade-in">
      <div className="portal-page__header">
        <div className="portal-page__header-row">
          <div>
            <h1 className="portal-page__title">My Doctor & OPD Appointments</h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              Track scheduled hospital visits and tele-consultations
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {appointments.map((apt) => (
          <div key={apt.id} className="card" style={{ padding: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="icon icon-lg" aria-hidden="true">calendar_month</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 className="t-headline-sm" style={{ margin: 0 }}>{apt.doctor}</h3>
                    <span className="badge badge-tertiary">{apt.status}</span>
                  </div>
                  <p className="t-body-sm" style={{ margin: '4px 0 0', color: 'var(--color-on-surface-variant)' }}>
                    {apt.speciality} • {apt.facility}
                  </p>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }} className="t-label-sm">
                    <span>Date: <strong>{apt.date}</strong></span>
                    <span>Time: <strong>{apt.time}</strong></span>
                    <span>Token: <strong>{apt.token}</strong></span>
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-surface btn-sm">Reschedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
