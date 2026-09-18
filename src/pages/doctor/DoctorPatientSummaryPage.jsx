<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> a70ddca (update frontend implementation)
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { DOCTOR_MOCK_PATIENTS } from '../../data/doctorMockData';
import { useLanguage } from '../../hooks/useLanguage';

export const DoctorPatientSummaryPage = () => {
<<<<<<< HEAD
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  // Deterministic source of truth: Route param takes precedence over query param
  const requestedId = (routeId || searchParams.get('id') || '').trim();

  // Search strictly for matching patient. NEVER silently fall back to another patient!
  const patient = requestedId
    ? DOCTOR_MOCK_PATIENTS.find((p) => p.id.toLowerCase() === requestedId.toLowerCase())
    : null;
=======
  const { id: pathPatientId } = useParams();
  const [searchParams] = useSearchParams();
  const patientId = pathPatientId || searchParams.get('id');

  // Never substitute a different patient record for a missing or invalid ID.
  const patient = DOCTOR_MOCK_PATIENTS.find((p) => p.id === patientId);
>>>>>>> a70ddca (update frontend implementation)

  // Active view tab for supplementary sections
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ayush' | 'documents'

  // Interactive Modals
  const [activeModal, setActiveModal] = useState(null); // 'verify' | 'note' | 'doc' | null
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docFeedback, setDocFeedback] = useState(null); // Inline accessible clinical feedback banner
  const modalRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  const [clinicalNotes, setClinicalNotes] = useState([
    {
      date: 'Today, 09:48 AM',
      doctor: 'Dr. V. Menon (General Medicine)',
      text: 'Pre-consultation records reviewed. Patient present with 6-month joint stiffness. BP and glycemic control require priority adjustment today.'
    }
  ]);
  const [newNoteText, setNewNoteText] = useState('');
  const [verifiedCategories, setVerifiedCategories] = useState({
    'Patient identity': true,
    'Chief complaint': true,
    'Medical history': true,
    'Medication history': false,
    'Allergy history': true,
    'Family history': true,
    'Investigation history': true,
    'Document history': true
  });
  const [clinicianVerifiedNotice, setClinicianVerifiedNotice] = useState(false);

  // Auto scroll to top on mount or patient change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [requestedId]);

  // Modal accessibility: Escape key listener, focus trapping, and focus restoration
  useEffect(() => {
    if (!activeModal) return;

    lastFocusedElementRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setDocFeedback(null);
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal && lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus?.();
    }
  }, [activeModal]);

  if (!patient) {
    return (
      <div className="doctor-workstation animate-fade-in">
        <div className="lookup-status-box error" role="alert" style={{ maxWidth: '720px', margin: '48px auto' }}>
          <span className="icon icon-md" style={{ color: '#c53030' }} aria-hidden="true">error_outline</span>
          <div>
            <div style={{ fontWeight: 700 }}>Patient record not found</div>
            <div style={{ fontSize: '12.5px', marginTop: '2px' }}>
              No clinical record matches the requested patient ID.
            </div>
            <Link to={ROUTES.DOCTOR_PATIENT_SEARCH} className="btn-clinical-sm" style={{ display: 'inline-flex', marginTop: '12px' }}>
              Return to Patient Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleOpenDocModal = (doc) => {
    setSelectedDoc(doc);
    setDocFeedback(null);
    setActiveModal('doc');
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setClinicalNotes((prev) => [
      {
        date: 'Today, Just now',
        doctor: 'Dr. V. Menon (General Medicine)',
        text: newNoteText.trim()
      },
      ...prev
    ]);
    setNewNoteText('');
    setActiveModal(null);
  };

  const handleToggleVerification = (catKey) => {
    setVerifiedCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey]
    }));
  };

  const handleConfirmVerification = () => {
    setClinicianVerifiedNotice(true);
    setActiveModal(null);
  };

  // Dedicated Patient Not Found State (Strict clinical safety: NEVER display another patient's data)
  if (!patient) {
    return (
      <div className="doctor-workstation animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <div className="doctor-banner" style={{ marginBottom: '24px' }}>
          <div className="doctor-banner__badge">
            <span className="icon icon-sm" aria-hidden="true">local_hospital</span>
            <span>{t('doctor.workstationBadge', 'e-Hospital Workstation • National Digital Health Gateway')}</span>
          </div>
        </div>

        <div className="card" style={{ padding: '32px', textAlign: 'center', borderLeft: '6px solid var(--color-error, #b3261e)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fee2e2', color: '#b91c1c', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <span className="icon icon-lg" aria-hidden="true">person_off</span>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-on-surface, #1e293b)', margin: '0 0 8px' }}>
            {t('doctor.patientNotFoundTitle', 'Patient Clinical Record Not Found')}
          </h1>
          <p style={{ color: 'var(--color-on-surface-variant, #64748b)', fontSize: '14px', maxWidth: '520px', margin: '0 auto 16px', lineHeight: 1.5 }}>
            {t('doctor.patientNotFoundDesc', 'No active pre-consultation record matches this identifier in the e-Hospital OPD Master Patient Index.')}
          </p>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '6px', fontSize: '13px', color: '#991b1b', marginBottom: '24px', textAlign: 'left' }}>
            <strong>Clinical Safety Protocol:</strong> The requested patient identifier <code>{requestedId}</code> could not be located. Fallback to another patient record is strictly prohibited to prevent clinical misidentification.
          </div>
          <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to={ROUTES.DOCTOR_PORTAL} className="btn btn-primary">
              <span className="icon icon-sm" aria-hidden="true">search</span>
              <span>{t('doctor.btnSearchAnother', 'Search Another Patient')}</span>
            </Link>
            <Link to={`${ROUTES.DOCTOR_PATIENT_SUMMARY}/P-10029`} className="btn btn-surface">
              <span className="icon icon-sm" aria-hidden="true">account_circle</span>
              <span>{t('doctor.loadDemoPatient', 'Load Primary Demo Patient (P-10029)')}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-workstation animate-fade-in">
      {/* Clinician Session Banner */}
      <div className="doctor-banner">
        <div className="doctor-banner__badge">
          <span className="icon icon-sm" aria-hidden="true">local_hospital</span>
          <span>{t('doctor.workstationBadge', 'e-Hospital Workstation • National Digital Health Gateway')}</span>
        </div>
        <div className="doctor-banner__session hide-mobile">
          <span>Facility: <strong>{patient.facility}</strong></span>
          <span>OPD Room: <strong>Room 14 (Gen Med)</strong></span>
          <span>Logged in: <strong>Dr. V. Menon</strong></span>
        </div>
      </div>

      {/* TOP PATIENT HEADER */}
      <header className="clinical-summary-header" role="region" aria-label="Patient Summary Header">
        <div className="summary-header-topline">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to={ROUTES.DOCTOR_PATIENT_SEARCH} className="btn-clinical-sm" title="Back to Patient Lookup">
              <span className="icon icon-xs" aria-hidden="true">arrow_back</span>
              <span>Back to Patient Search</span>
            </Link>
            <span className="summary-workstation-title">PATIENT CLINICAL SUMMARY</span>
          </div>

          <div className="summary-header-badges">
            <span className="summary-tag-verified">
              <span className="icon icon-xs" aria-hidden="true">verified</span>
              <span>Verified Patient</span>
            </span>
            <span className="summary-tag-neutral">
              <span className="icon icon-xs" aria-hidden="true">schedule</span>
              <span>Last updated: {patient.lastUpdated}</span>
            </span>
            <span className="summary-tag-neutral">
              <span className="icon icon-xs" aria-hidden="true">description</span>
              <span>{patient.statusTag}</span>
            </span>
            {clinicianVerifiedNotice && (
              <span className="summary-tag-verified" style={{ background: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }}>
                <span className="icon icon-xs" aria-hidden="true">task_alt</span>
                <span>Clinician Verified</span>
              </span>
            )}
          </div>
        </div>

        <div className="summary-main-details">
          <div className="summary-patient-meta-block">
            <div className="summary-patient-avatar" aria-hidden="true">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h1 className="summary-patient-name">{patient.name}</h1>
              <div className="summary-patient-subtext">
                <strong>{patient.gender}</strong> • <strong>{patient.age}</strong> • Blood Group: <strong>{patient.bloodGroup}</strong> • Patient ID / ABHA: <code>{patient.abha}</code>
              </div>
            </div>
          </div>

          <div className="summary-quick-actions">
            <button
              type="button"
              className="btn-clinical-sm primary"
              onClick={() => setActiveModal('verify')}
            >
              <span className="icon icon-xs" aria-hidden="true">edit_note</span>
              <span>Edit / Verify History</span>
            </button>
            <button
              type="button"
              className="btn-clinical-sm"
              onClick={handlePrint}
              title="Print clinical summary"
            >
              <span className="icon icon-xs" aria-hidden="true">print</span>
              <span>Print / Export Summary</span>
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1 — CLINICAL SNAPSHOT */}
      <section className="clinical-snapshot-card" aria-label="Clinical Snapshot">
        <div className="snapshot-heading">
          <span className="icon icon-xs" aria-hidden="true">flash_on</span>
          <span>Section 1 • Clinical Snapshot</span>
        </div>
        <div className="snapshot-grid">
          <div className="snapshot-item">
            <div className="snapshot-label">Chief Concern</div>
            <div className="snapshot-value">{patient.snapshot.chiefConcern}</div>
          </div>

          <div className="snapshot-item alert">
            <div className="snapshot-label">Known Conditions</div>
            <div className="snapshot-value">
              {patient.snapshot.knownConditions.join(', ')}
            </div>
          </div>

          <div className="snapshot-item">
            <div className="snapshot-label">Current Medications</div>
            <div className="snapshot-value">
              {patient.snapshot.currentMedications.join('; ')}
            </div>
          </div>

          <div className="snapshot-item alert-danger">
            <div className="snapshot-label">Allergies</div>
            <div className="snapshot-value" style={{ color: '#b91c1c', fontWeight: 700 }}>
              ⚠ {patient.snapshot.allergies}
            </div>
          </div>

          <div className="snapshot-item">
            <div className="snapshot-label">Past Surgery</div>
            <div className="snapshot-value">{patient.snapshot.pastSurgery}</div>
          </div>
        </div>
      </section>

      {/* SUB-NAVIGATION TABS FOR EXPANDED VIEWS */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #d8e0e6', paddingBottom: '8px' }}>
        <button
          type="button"
          className={`btn-clinical-sm ${activeTab === 'all' ? 'primary' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span>Complete Clinical Dossier</span>
        </button>
        <button
          type="button"
          className={`btn-clinical-sm ${activeTab === 'ayush' ? 'primary' : ''}`}
          onClick={() => setActiveTab('ayush')}
        >
          <span className="icon icon-xs" aria-hidden="true">spa</span>
          <span>AYUSH Parameters</span>
        </button>
        <button
          type="button"
          className={`btn-clinical-sm ${activeTab === 'documents' ? 'primary' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <span className="icon icon-xs" aria-hidden="true">attachment</span>
          <span>Source Documents ({patient.documents.length})</span>
        </button>
      </div>

      {/* MAIN TWO-COLUMN CLINICAL WORKSTATION LAYOUT */}
      <div className="workstation-two-column">
        {/* LEFT PRIMARY COLUMN (CLINICAL DETAILS) */}
        <div className="workstation-main-col">
          {/* SECTION 2 — AI-GENERATED PRE-CONSULTATION SUMMARY */}
          <div className="clinical-card" style={{ borderLeft: '4px solid #0072B8' }}>
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">summarize</span>
                <span>Section 2 • Pre-Consultation Summary (AI-Assisted)</span>
              </h2>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>15-Second Clinical Read</span>
            </div>
            <div className="clinical-card-body">
              <div className="preconsult-box">
                {patient.preConsultationSummary.text}
                <div className="preconsult-disclaimer">
                  <span className="icon icon-xs" style={{ verticalAlign: 'middle', marginRight: '4px' }} aria-hidden="true">verified_user</span>
                  {patient.preConsultationSummary.disclaimer}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3 — CHIEF COMPLAINT & PRESENT HISTORY */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">stethoscope</span>
                <span>Section 3 • Chief Complaint & Present History</span>
              </h2>
            </div>
            <div className="clinical-card-body">
              <div className="clinical-kv-grid">
                <div className="kv-row">
                  <span className="kv-key">Chief Complaint:</span>
                  <span className="kv-val" style={{ color: '#0072B8', fontWeight: 700 }}>{patient.presentHistory.chiefComplaint}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Onset:</span>
                  <span className="kv-val">{patient.presentHistory.onset}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Duration:</span>
                  <span className="kv-val">{patient.presentHistory.duration}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Course:</span>
                  <span className="kv-val">{patient.presentHistory.course}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Associated symptoms:</span>
                  <span className="kv-val">{patient.presentHistory.associatedSymptoms}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Severity:</span>
                  <span className="kv-val">{patient.presentHistory.severity}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Aggravating factors:</span>
                  <span className="kv-val">{patient.presentHistory.aggravatingFactors}</span>
                </div>
                <div className="kv-row">
                  <span className="kv-key">Relieving factors:</span>
                  <span className="kv-val">{patient.presentHistory.relievingFactors}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4 — PAST MEDICAL & SURGICAL HISTORY */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">history</span>
                <span>Section 4 • Past Medical & Surgical History</span>
              </h2>
            </div>
            <div className="clinical-card-body">
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '6px' }}>
                  Chronic Conditions
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: 1.6 }}>
                  {patient.medicalHistory.conditions.map((cond, idx) => (
                    <li key={idx} style={{ fontWeight: 600, color: '#1e293b' }}>{cond}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', paddingTop: '10px', borderTop: '1px solid #edf2f7' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '4px' }}>
                    Past Surgical History
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                    {patient.medicalHistory.pastSurgicalHistory.join(', ')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '4px' }}>
                    Past Hospitalizations
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                    {patient.medicalHistory.hospitalizations.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5 — CURRENT MEDICATIONS & ALLERGIES */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">medication</span>
                <span>Section 5 • Current Medications & Allergies</span>
              </h2>
            </div>
            <div className="clinical-card-body">
              <div style={{ overflowX: 'auto', marginBottom: '14px' }}>
                <table className="clinical-table" aria-label="Current Medications Table">
                  <thead>
                    <tr>
                      <th>Medication Name</th>
                      <th>Dose</th>
                      <th>Frequency</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.medications.map((med, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700, color: '#0072B8' }}>{med.name}</td>
                        <td>{med.dose}</td>
                        <td>{med.frequency}</td>
                        <td>
                          <span className="badge badge-success">{med.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '10px 12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span className="icon icon-xs" style={{ color: '#dc2626' }} aria-hidden="true">error</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>
                    Documented Allergies
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#7f1d1d' }}>
                  <strong>{patient.allergiesList[0].allergen}</strong> — Reaction: {patient.allergiesList[0].reaction}
                  <span style={{ marginLeft: '10px', fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '1px 6px', borderRadius: '3px', fontWeight: 600 }}>
                    Alert Level: {patient.allergiesList[0].severity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6 — INVESTIGATIONS */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">biotech</span>
                <span>Section 6 • Diagnostic Investigations</span>
              </h2>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Latest Lab Data</span>
            </div>
            <div className="clinical-card-body">
              <div style={{ overflowX: 'auto' }}>
                <table className="clinical-table" aria-label="Diagnostic Investigations Table">
                  <thead>
                    <tr>
                      <th>Investigation</th>
                      <th>Date</th>
                      <th>Result</th>
                      <th>Reference Range</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.investigations.map((inv, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 700 }}>{inv.investigation}</td>
                        <td style={{ color: '#64748b', fontSize: '12px' }}>{inv.date}</td>
                        <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{inv.result}</td>
                        <td style={{ color: '#64748b', fontSize: '12px' }}>{inv.referenceRange}</td>
                        <td>
                          {inv.flag === 'elevated' ? (
                            <span className="tag-alert-elevated">
                              {inv.status}
                            </span>
                          ) : (
                            <span className="tag-alert-normal">
                              {inv.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SECTION 7 — FAMILY & PERSONAL HISTORY */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">groups</span>
                <span>Section 7 • Family & Personal History</span>
              </h2>
            </div>
            <div className="clinical-card-body">
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '6px' }}>
                  Family History
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                  {patient.familyHistory.map((fam, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>
                      <strong>{fam.relation}:</strong> {fam.condition}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ paddingTop: '10px', borderTop: '1px solid #edf2f7' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '8px' }}>
                  Personal History (Lifestyle)
                </div>
                <div className="clinical-kv-grid">
                  <div className="kv-row">
                    <span className="kv-key">Diet:</span>
                    <span className="kv-val">{patient.personalHistory.diet}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">Sleep:</span>
                    <span className="kv-val">{patient.personalHistory.sleep}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">Physical activity:</span>
                    <span className="kv-val">{patient.personalHistory.physicalActivity}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">Tobacco:</span>
                    <span className="kv-val" style={{ color: '#64748b' }}>{patient.personalHistory.tobacco}</span>
                  </div>
                  <div className="kv-row">
                    <span className="kv-key">Alcohol:</span>
                    <span className="kv-val" style={{ color: '#64748b' }}>{patient.personalHistory.alcohol}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 8 — AYUSH SUPPORT */}
          {(activeTab === 'all' || activeTab === 'ayush') && (
            <div className="clinical-card" style={{ borderLeft: '4px solid #0d9488' }}>
              <div className="clinical-card-header">
                <h2 className="clinical-card-title">
                  <span className="icon icon-xs" style={{ color: '#0d9488' }} aria-hidden="true">spa</span>
                  <span>Section 8 • AYUSH History (Ayurvedic Parameters)</span>
                </h2>
                <span style={{ fontSize: '11px', color: '#0d9488', fontWeight: 600 }}>Integrated Medicine</span>
              </div>
              <div className="clinical-card-body">
                {patient.ayush?.available && patient.ayush.parameters.length > 0 ? (
                  <div className="ayush-parameters-grid">
                    {patient.ayush.parameters.map((param, idx) => (
                      <div key={idx} className="ayush-param-item">
                        <span className="ayush-param-label">{param.label}: </span>
                        <span className="ayush-param-value">{param.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '16px', background: '#f8fafc', color: '#64748b', fontSize: '13px', textAlign: 'center', borderRadius: '4px' }}>
                    AYUSH history not yet recorded.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 9 — MEDICAL DOCUMENTS */}
          {(activeTab === 'all' || activeTab === 'documents') && (
            <div className="clinical-card">
              <div className="clinical-card-header">
                <h2 className="clinical-card-title">
                  <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">folder_shared</span>
                  <span>Section 9 • Digitized Source Documents</span>
                </h2>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Digitized Source Proofs</span>
              </div>
              <div className="clinical-card-body">
                <div className="document-list">
                  {patient.documents.map((doc) => (
                    <div key={doc.id} className="document-row">
                      <div>
                        <div className="document-meta-title">
                          <span className="badge badge-secondary" style={{ marginRight: '6px', fontSize: '11px' }}>
                            {doc.type}
                          </span>
                          <span>{doc.title}</span>
                        </div>
                        <div className="document-meta-sub">
                          Date: <strong>{doc.date}</strong> • Source: <strong>{doc.source}</strong> • Signatory: {doc.verifiedBy}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-doc-view"
                        onClick={() => handleOpenDocModal(doc)}
                      >
                        <span className="icon icon-xs" aria-hidden="true">visibility</span>
                        <span>View</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CLINICAL COLUMN (TIMELINE, ALERTS, COMPLETENESS, NOTES) */}
        <div className="workstation-side-col">
          {/* SECTION 10 — IMPORTANT CLINICAL ALERTS ("ATTENTION REQUIRED") */}
          <div className="clinical-card attention-card">
            <div className="clinical-card-header" style={{ background: '#fffbeb' }}>
              <h2 className="clinical-card-title" style={{ color: '#b45309' }}>
                <span className="icon icon-xs" aria-hidden="true">warning</span>
                <span>Section 10 • Attention Required & Clinical Alerts</span>
              </h2>
              <span style={{ fontSize: '11px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '3px', fontWeight: 700 }}>
                High Priority
              </span>
            </div>
            <div className="clinical-card-body">
              {patient.clinicalAlerts.map((alert, idx) => (
                <div key={idx} className="attention-item">
                  <span
                    className={`icon icon-sm ${alert.severity === 'warning' ? 'attention-item-warning' : 'attention-item-info'}`}
                    aria-hidden="true"
                  >
                    {alert.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div className="attention-title">
                      {alert.title}
                      <span className="attention-value">{alert.value}</span>
                    </div>
                    <div className="attention-note">{alert.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 11 — MEDICAL HISTORY TIMELINE */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">timeline</span>
                <span>Section 11 • Longitudinal Medical Timeline</span>
              </h2>
            </div>
            <div className="clinical-card-body">
              <div className="clinical-timeline">
                {patient.timeline.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-event">{item.event}</div>
                    <div className="timeline-detail">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 12 — HISTORY COMPLETENESS */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">checklist</span>
                <span>Section 12 • Pre-Consultation Completeness Checklist</span>
              </h2>
            </div>
            <div className="clinical-card-body">
              <div className="completeness-grid">
                {patient.completeness.map((item, idx) => {
                  const isVerified = verifiedCategories[item.category] ?? item.complete;
                  return (
                    <div key={idx} className="completeness-item">
                      <span style={{ fontWeight: 600, color: '#334155' }}>{item.category}</span>
                      {isVerified ? (
                        <span className="completeness-badge-ok" title="Verified">
                          <span className="icon icon-xs" aria-hidden="true">check</span>
                          <span>✓</span>
                        </span>
                      ) : (
                        <span className="completeness-badge-pending">
                          Needs verification
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CLINICIAN OPD NOTES LOG */}
          <div className="clinical-card">
            <div className="clinical-card-header">
              <h2 className="clinical-card-title">
                <span className="icon icon-xs" style={{ color: '#0072B8' }} aria-hidden="true">note_alt</span>
                <span>Consultation Remarks</span>
              </h2>
              <button
                type="button"
                className="btn-clinical-sm"
                onClick={() => setActiveModal('note')}
              >
                <span className="icon icon-xs" aria-hidden="true">add</span>
                <span>Add Note</span>
              </button>
            </div>
            <div className="clinical-card-body">
              {clinicalNotes.map((note, idx) => (
                <div key={idx} style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '4px', marginBottom: '8px', borderLeft: '3px solid #0072B8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '3px' }}>
                    <strong>{note.doctor}</strong>
                    <span>{note.date}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#1e293b' }}>{note.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PART 5 — STICKY DOCTOR ACTION BAR */}
      <aside className="doctor-action-bar-sticky" role="complementary" aria-label="Doctor Workstation Action Bar">
        <div className="action-bar-inner">
          <div className="action-disclaimer">
            <span className="icon icon-xs" aria-hidden="true">gavel</span>
            <span>Clinical decisions remain the responsibility of the treating clinician.</span>
          </div>

          <div className="action-buttons-group">
            <button
              type="button"
              className="btn-action-bar primary"
              onClick={() => setActiveModal('verify')}
            >
              <span className="icon icon-xs" aria-hidden="true">verified</span>
              <span>Edit / Verify History</span>
            </button>

            <button
              type="button"
              className="btn-action-bar"
              onClick={() => setActiveModal('note')}
            >
              <span className="icon icon-xs" aria-hidden="true">edit</span>
              <span>Add Clinical Note</span>
            </button>

            <button
              type="button"
              className="btn-action-bar"
              onClick={() => {
                setActiveTab('documents');
                if (patient.documents.length > 0) {
                  handleOpenDocModal(patient.documents[0]);
                }
              }}
            >
              <span className="icon icon-xs" aria-hidden="true">folder</span>
              <span>View Documents</span>
            </button>

            <button
              type="button"
              className="btn-action-bar"
              onClick={handlePrint}
            >
              <span className="icon icon-xs" aria-hidden="true">print</span>
              <span>Print / Export</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MODAL 1: CLINICIAN VERIFICATION */}
      {activeModal === 'verify' && (
        <div
          ref={modalRef}
          className="modal-overlay animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-verify-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveModal(null);
              setDocFeedback(null);
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="modal-verify-title" className="modal-title">
                <span className="icon icon-sm" style={{ color: '#0072B8' }} aria-hidden="true">fact_check</span>
                <span>Clinician Verification & History Confirmation</span>
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setActiveModal(null);
                  setDocFeedback(null);
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p style={{ margin: '0 0 14px', color: '#4b5563', fontSize: '13px' }}>
                Review and toggle the accuracy of each recorded history dimension for <strong>{patient.name}</strong> (ABHA: {patient.abha}).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {patient.completeness.map((item, idx) => {
                  const isChecked = verifiedCategories[item.category];
                  return (
                    <label
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: isChecked ? '#f0fdf4' : '#fefce8',
                        border: '1px solid',
                        borderColor: isChecked ? '#bbf7d0' : '#fef08a',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '13px', color: '#1f2937' }}>
                          {item.category}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#6b7280' }}>
                          {item.status}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleVerification(item.category)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </label>
                  );
                })}
              </div>

              <div style={{ marginTop: '16px', padding: '10px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
                <span className="icon icon-xs" style={{ verticalAlign: 'middle', marginRight: '4px' }} aria-hidden="true">security</span>
                Verified entries will be signed with clinician digital credentials (Dr. V. Menon • HPR Registration: IN-DL-001948).
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-clinical-sm"
                onClick={() => {
                  setActiveModal(null);
                  setDocFeedback(null);
                }}
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                className="btn-clinical-sm primary"
                onClick={handleConfirmVerification}
              >
                <span className="icon icon-xs" aria-hidden="true">check</span>
                <span>Confirm & Sign Verification</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD CLINICAL NOTE */}
      {activeModal === 'note' && (
        <div
          ref={modalRef}
          className="modal-overlay animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-note-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveModal(null);
              setDocFeedback(null);
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="modal-note-title" className="modal-title">
                <span className="icon icon-sm" style={{ color: '#0072B8' }} aria-hidden="true">post_add</span>
                <span>Add OPD Clinical Note</span>
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setActiveModal(null);
                  setDocFeedback(null);
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddNote}>
              <div className="modal-body">
                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="clinical-note-input" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Consultation Remarks / Clinical Impression:
                  </label>
                  <textarea
                    id="clinical-note-input"
                    rows={5}
                    className="doctor-input"
                    style={{ width: '100%', resize: 'vertical' }}
                    placeholder="Enter clinical impression, medication adjustments, or recommended investigations..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    autoFocus
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Author: <strong>Dr. V. Menon</strong> • Dept: <strong>General Medicine OPD</strong> • Date: <strong>Today</strong>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-clinical-sm"
                  onClick={() => {
                    setActiveModal(null);
                    setDocFeedback(null);
                  }}
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="btn-clinical-sm primary"
                  disabled={!newNoteText.trim()}
                >
                  <span className="icon icon-xs" aria-hidden="true">save</span>
                  <span>Save to Consultation Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: DOCUMENT VIEWER */}
      {activeModal === 'doc' && selectedDoc && (
        <div
          ref={modalRef}
          className="modal-overlay animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-doc-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setActiveModal(null);
              setDocFeedback(null);
            }
          }}
        >
          <div className="modal-content" style={{ maxWidth: '740px' }}>
            <div className="modal-header">
              <h3 id="modal-doc-title" className="modal-title">
                <span className="icon icon-sm" style={{ color: '#0072B8' }} aria-hidden="true">description</span>
                <span>Source Document Viewer • {selectedDoc.title}</span>
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setActiveModal(null);
                  setDocFeedback(null);
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* Document Metadata Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#f8fafc', padding: '10px 14px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '16px', fontSize: '12.5px' }}>
                <div><strong>Document Type:</strong> {selectedDoc.type}</div>
                <div><strong>Issue Date:</strong> {selectedDoc.date}</div>
                <div><strong>Issuing Facility:</strong> {selectedDoc.source}</div>
                <div><strong>Format:</strong> {selectedDoc.fileFormat}</div>
                <div><strong>Pages:</strong> {selectedDoc.pages} Page(s)</div>
                <div><strong>Verified By:</strong> {selectedDoc.verifiedBy}</div>
              </div>

              {/* Document Mock Preview Canvas */}
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '4px', padding: '24px', background: '#fafbfc', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                  <span className="icon icon-md" aria-hidden="true">picture_as_pdf</span>
                </div>
                <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: '#1e293b' }}>
                  {selectedDoc.title}
                </h4>
                <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '13px' }}>
                  ABDM Longitudinal Health Record Reference: <code>{selectedDoc.id}-2026-NHA</code>
                </p>

                {docFeedback && (
                  <div
                    style={{
                      marginBottom: '16px',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      background: docFeedback.type === 'success' ? '#ecfdf5' : '#eff6ff',
                      border: `1px solid ${docFeedback.type === 'success' ? '#a7f3d0' : '#bfdbfe'}`,
                      color: docFeedback.type === 'success' ? '#065f46' : '#1e40af',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    role="status"
                  >
                    <span className="icon icon-xs">
                      {docFeedback.type === 'success' ? 'check_circle' : 'info'}
                    </span>
                    <span>{docFeedback.message}</span>
                  </div>
                )}

                <div style={{ display: 'inline-flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-clinical-sm"
                    onClick={() => setDocFeedback({
                      type: 'success',
                      message: `${selectedDoc.title}: ${t('doctor.docDownloaded', 'Document downloaded successfully (ABDM Signed Vault)')}`
                    })}
                  >
                    <span className="icon icon-xs" aria-hidden="true">download</span>
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="button"
                    className="btn-clinical-sm primary"
                    onClick={() => setDocFeedback({
                      type: 'info',
                      message: `${selectedDoc.title}: ${t('doctor.pacsOpened', 'High-resolution PACS imaging viewer opened in secure window')}`
                    })}
                  >
                    <span className="icon icon-xs" aria-hidden="true">zoom_in</span>
                    <span>Inspect Full Document</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-clinical-sm primary"
                onClick={() => {
                  setActiveModal(null);
                  setDocFeedback(null);
                }}
              >
                {t('common.close', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
