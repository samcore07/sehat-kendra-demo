import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const AyushDoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctorService.getDoctorById(id) || doctorService.getDoctorsByPathway('ayush')[0];

  return (
    <div className="portal-page animate-fade-in" style={{ padding: 'var(--space-xl) var(--gutter-mobile)' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', marginBottom: 'var(--space-md)' }}>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => navigate(ROUTES.AYUSH_DOCTORS)}
        >
          <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
          <span>Back to All Doctors</span>
        </button>
      </div>

      <div className="card" style={{ maxWidth: '780px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '24px' }}>
              {doctor.avatar}
            </div>
            <div>
              <div className="badge badge-secondary" style={{ marginBottom: '4px' }}>Verified Vaidya</div>
              <h1 className="t-headline-md" style={{ margin: '0 0 4px', color: 'var(--color-on-surface)' }}>
                {doctor.name}
              </h1>
              <div style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                {doctor.qualifications} • Reg No: <code>{doctor.regNo}</code>
              </div>
            </div>
          </div>
          <AudioAssist text={`Doctor Profile for ${doctor.name}, ${doctor.specialty} at ${doctor.hospital}. Experience: ${doctor.experience}.`} label="Listen" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)', fontSize: '13px' }}>
          <div><strong>Specialty:</strong> {doctor.specialty}</div>
          <div><strong>Hospital:</strong> {doctor.hospital}</div>
          <div><strong>Experience:</strong> {doctor.experience}</div>
          <div><strong>Languages:</strong> {doctor.languages.join(', ')}</div>
        </div>

        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>About Practitioner</h2>
          <p className="t-body-md" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6, margin: 0 }}>
            {doctor.about}
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>Areas of Practice</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {doctor.areasOfPractice.map((area, idx) => (
              <span key={idx} className="badge badge-surface" style={{ fontSize: '12px' }}>
                {area}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
          <button type="button" className="btn btn-surface" onClick={() => navigate(ROUTES.AYUSH)}>
            Back to AYUSH Centre
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => navigate(`${ROUTES.BOOK_APPOINTMENT}?pathway=ayush`)}
          >
            <span>Book Consultation with {doctor.name}</span>
            <span className="icon icon-sm" aria-hidden="true">calendar_month</span>
          </button>
        </div>
      </div>
    </div>
  );
};
