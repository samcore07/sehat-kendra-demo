import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { appointmentService } from '../../services/appointmentService';
import { ROUTES } from '../../constants/routes';

export const AppointmentsListPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(() => appointmentService.getAppointments());

  useEffect(() => {
    const handleUpdate = () => {
      setAppointments(appointmentService.getAppointments());
    };
    window.addEventListener('sk:appointment-updated', handleUpdate);
    return () => window.removeEventListener('sk:appointment-updated', handleUpdate);
  }, []);

  const handleCancel = (id) => {
    appointmentService.cancelAppointment(id);
    setAppointments(appointmentService.getAppointments());
  };

  return (
    <div className="portal-page animate-fade-in" style={{ padding: 'var(--space-xl) var(--gutter-mobile)' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto', marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(ROUTES.PATIENT_HOME)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('ayush.backToHome', 'Back to Patient Home')}</span>
          </button>
          <AudioAssist text="View your scheduled clinical consultations across General Medicine and Ayurveda pathways." label={t('audio.listen', 'Listen')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 className="t-headline-md" style={{ margin: '0 0 4px', color: 'var(--color-on-surface)' }}>
              {t('home.upcomingApt', 'My Scheduled Consultations')}
            </h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              Hospital OPD visits and eSanjeevani tele-consultation tokens
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
          >
            <span className="icon icon-sm" aria-hidden="true">calendar_add_on</span>
            <span>{t('home.bookNow', 'Book New Appointment')}</span>
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {appointments.length > 0 ? (
          appointments.map((apt) => {
            const isAyush = apt.treatmentSystem?.includes('Ayurveda') || apt.treatmentSystem?.includes('AYUSH');
            return (
              <div key={apt.id} className="card" style={{ padding: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '3.25rem', height: '3.25rem', borderRadius: 'var(--radius-lg)', background: isAyush ? 'var(--color-secondary-container)' : 'var(--color-primary-container)', color: isAyush ? 'var(--color-on-secondary-container)' : 'var(--color-on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="icon icon-lg" aria-hidden="true">{isAyush ? 'spa' : 'stethoscope'}</span>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                        <span className="badge badge-secondary" style={{ fontSize: '11px' }}>
                          {apt.treatmentSystem || 'General Medicine'}
                        </span>
                        <span className="badge badge-tertiary" style={{ fontSize: '11px' }}>
                          {apt.status || 'Confirmed'}
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>
                          Token #{apt.token}
                        </span>
                      </div>
                      <h2 className="t-headline-sm" style={{ margin: '2px 0 4px', color: 'var(--color-on-surface)' }}>
                        {apt.doctor}
                      </h2>
                      <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                        {apt.specialty} • {apt.facility}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px', fontSize: '13px', color: 'var(--color-on-surface)' }}>
                        <span><strong>Date:</strong> {apt.date}</span>
                        <span><strong>Time:</strong> {apt.time}</span>
                        <span><strong>Mode:</strong> {apt.mode}</span>
                      </div>

                      {apt.consentsShared && (
                        <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                          <strong>Consent:</strong> {Array.isArray(apt.consentsShared) ? apt.consentsShared.join(', ') : apt.consentsShared}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className="btn btn-surface btn-sm"
                      onClick={() => handleCancel(apt.id)}
                    >
                      <span>{t('home.cancelVisit', 'Cancel Visit')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
            <span className="icon icon-xl" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '12px' }} aria-hidden="true">event_busy</span>
            <h2 className="t-headline-sm" style={{ margin: '0 0 6px' }}>{t('home.noApt', 'No Scheduled Consultations')}</h2>
            <p className="t-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '460px', margin: '0 auto 20px' }}>
              You do not have any active appointments. Choose between General Medicine and Ayurveda/AYUSH to schedule your consultation.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-md"
              onClick={() => navigate(ROUTES.BOOK_APPOINTMENT)}
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
