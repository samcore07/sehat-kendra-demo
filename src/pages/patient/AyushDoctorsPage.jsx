import React from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { ROUTES } from '../../constants/routes';

export const AyushDoctorsPage = () => {
  const navigate = useNavigate();
  const ayushDoctors = doctorService.getDoctorsByPathway('ayush');

  return (
    <div className="portal-page animate-fade-in" style={{ padding: 'var(--space-xl) var(--gutter-mobile)' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(ROUTES.AYUSH)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>Back to AYUSH Centre</span>
          </button>
          <AudioAssist text="Browse verified Ayurvedic Vaidyas practicing in national AYUSH research and clinical hospitals." label="Listen" />
        </div>
        <h1 className="t-headline-md" style={{ margin: '0 0 4px', color: 'var(--color-on-surface)' }}>
          Verified Ayurveda Practitioners & Vaidyas
        </h1>
        <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
          Certified by Central Council of Indian Medicine (CCIM) and registered under National Medical Commission guidelines
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
        {ayushDoctors.map((doc) => (
          <div key={doc.id} className="card" style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px' }}>
                  {doc.avatar}
                </div>
                <div>
                  <h2 className="t-headline-sm" style={{ margin: 0, color: 'var(--color-on-surface)' }}>{doc.name}</h2>
                  <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>{doc.qualifications}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-secondary)', fontWeight: 600 }}>★ {doc.rating} ({doc.reviewsCount} reviews)</div>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '4px' }}>
                {doc.specialty}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '8px' }}>
                {doc.hospital}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--color-on-surface)', lineHeight: 1.5, margin: '0 0 12px' }}>
                {doc.about}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                {doc.areasOfPractice.map((area, idx) => (
                  <span key={idx} className="badge badge-secondary" style={{ fontSize: '11px' }}>
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-outline-variant)', paddingTop: '12px' }}>
              <button
                type="button"
                className="btn btn-surface btn-sm"
                style={{ flex: 1 }}
                onClick={() => navigate(`/patient/ayush/doctor/${doc.id}`)}
              >
                View Profile
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => navigate(`${ROUTES.BOOK_APPOINTMENT}?pathway=ayush`)}
              >
                Book Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
