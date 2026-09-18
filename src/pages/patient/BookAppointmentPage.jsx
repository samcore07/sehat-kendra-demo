import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { doctorService } from '../../services/doctorService';
import { appointmentService } from '../../services/appointmentService';
import { ROUTES } from '../../constants/routes';

export const BookAppointmentPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initial pathway can be preselected via query parameter e.g. ?pathway=ayush
  const initialPathway = searchParams.get('pathway') || null;

  // Stepper:
  // 1: Choose Treatment Pathway
  // 2: Choose Specialty & Doctor
  // 3: Choose Mode, Date & Time Slot
  // 4: Consent-Based Record Sharing
  // 5: Review Summary
  // 6: Confirmation
  const [step, setStep] = useState(initialPathway ? 2 : 1);
  const [pathway, setPathway] = useState(initialPathway || 'general'); // 'general' | 'ayush'

  const [doctorsList, setDoctorsList] = useState(() => doctorService.getDoctorsByPathway(initialPathway || 'general'));
  const [selectedDoctor, setSelectedDoctor] = useState(() => {
    const list = doctorService.getDoctorsByPathway(initialPathway || 'general');
    return list[0] || null;
  });
  const [consultMode, setConsultMode] = useState('In-Person Hospital OPD');
  const [selectedDate, setSelectedDate] = useState(() => {
    const list = doctorService.getDoctorsByPathway(initialPathway || 'general');
    return list[0]?.availableDates[0] || '';
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    const list = doctorService.getDoctorsByPathway(initialPathway || 'general');
    return list[0]?.slots[0] || '';
  });

  // Health Record Consent options
  const [consents, setConsents] = useState({
    shareProfile: true,
    shareConditions: true,
    shareMedicines: true,
    shareAllergies: true,
    shareHistory: false,
    doNotShare: false
  });

  const [confirmedData, setConfirmedData] = useState(null);

  const bookingSpeech = {
    1: "Step 1: Choose your Treatment Pathway. You can choose General Medicine for conventional modern medical care, or Ayurveda and AYUSH for traditional health systems.",
    2: "Step 2: Select your physician or Vaidya from verified national health institutions.",
    3: "Step 3: Select consultation mode, such as In-Person clinic visit or eSanjeevani Tele-OPD, followed by date and time.",
    4: "Step 4: Explicit Consent for Medical Record Sharing. Choose exactly what information your doctor may access.",
    5: "Step 5: Review consultation summary and confirm your appointment.",
    6: "Your appointment is confirmed and logged into the hospital triage queue."
  };

  const handleSelectPathway = (chosenPathway) => {
    setPathway(chosenPathway);
    const list = doctorService.getDoctorsByPathway(chosenPathway);
    setDoctorsList(list);
    if (list.length > 0) {
      setSelectedDoctor(list[0]);
      setSelectedDate(list[0].availableDates[0] || '');
      setSelectedTime(list[0].slots[0] || '');
    }
    setStep(2);
  };

  const handleToggleConsent = (key) => {
    if (key === 'doNotShare') {
      const nextVal = !consents.doNotShare;
      setConsents({
        shareProfile: !nextVal,
        shareConditions: false,
        shareMedicines: false,
        shareAllergies: false,
        shareHistory: false,
        doNotShare: nextVal
      });
    } else {
      setConsents((prev) => ({
        ...prev,
        [key]: !prev[key],
        doNotShare: false
      }));
    }
  };

  const handleConfirm = () => {
    const appointmentData = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      doctor: selectedDoctor.name,
      qualifications: selectedDoctor.qualifications,
      specialty: selectedDoctor.specialty,
      treatmentSystem: pathway === 'ayush' ? 'Ayurveda / AYUSH' : 'General Medicine',
      facility: selectedDoctor.hospital,
      date: selectedDate,
      time: selectedTime,
      mode: consultMode,
      token: `${pathway === 'ayush' ? 'AYU' : 'OPD'}-${Math.floor(10 + Math.random() * 90)}`,
      consentsShared: consents.doNotShare ? ['Consultation Only (No Records Shared)'] : Object.keys(consents).filter((k) => consents[k] && k !== 'doNotShare'),
      status: 'Confirmed'
    };

    appointmentService.saveAppointment(appointmentData);
    setConfirmedData(appointmentData);
    setStep(6);
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-xl) var(--gutter-mobile)' }}>
      <div className="card" style={{ maxWidth: '840px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        {/* Step Indicator / Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-lg)' }}>
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '4px' }}>National OPD Appointment Scheduling</div>
            <h1 className="t-headline-md" style={{ margin: '0 0 4px', color: 'var(--color-on-surface)' }}>
              {t('apt.title')}
            </h1>
            <p className="t-body-sm" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
              {step === 1 ? 'Step 1 of 5: Choose Treatment Pathway' :
               step === 2 ? `Step 2 of 5: Choose ${pathway === 'ayush' ? 'Vaidya' : 'Doctor'}` :
               step === 3 ? 'Step 3 of 5: Consultation Mode, Date & Time' :
               step === 4 ? 'Step 4 of 5: Consent-Based Record Sharing' :
               step === 5 ? 'Step 5 of 5: Review Details & Confirm' : 'Appointment Confirmed'}
            </p>
          </div>
          <AudioAssist text={bookingSpeech[step]} label="Listen" />
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: CHOOSE TREATMENT PATHWAY */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
                Select Your Desired Treatment System
              </h2>
              <p className="t-body-md" style={{ margin: 0, color: 'var(--color-on-surface-variant)' }}>
                SEHAT KENDRA supports both Allopathic General Medicine and traditional AYUSH healthcare systems. Both options adhere to National Health Mission public standards.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
              {/* General Medicine Option */}
              <div
                className="card"
                style={{
                  padding: 'var(--space-xl)',
                  border: pathway === 'general' ? '2px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                  background: pathway === 'general' ? 'var(--color-secondary-container)' : 'var(--color-surface-container-lowest)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => setPathway('general')}
              >
                <div>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                    <span className="icon icon-lg" aria-hidden="true">local_hospital</span>
                  </div>
                  <h3 className="t-headline-sm" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)' }}>
                    1. General Medicine (Allopathy)
                  </h3>
                  <p className="t-body-sm" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.55, margin: '0 0 16px' }}>
                    Consult healthcare practitioners practicing conventional modern medicine. Ideal for diagnostic lab reviews, acute symptoms, prescription management, and hospital referrals.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-full"
                  onClick={() => handleSelectPathway('general')}
                >
                  <span>Select General Medicine</span>
                  <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
                </button>
              </div>

              {/* Ayurveda / AYUSH Option */}
              <div
                className="card"
                style={{
                  padding: 'var(--space-xl)',
                  border: pathway === 'ayush' ? '2px solid var(--color-secondary)' : '1px solid var(--color-outline-variant)',
                  background: pathway === 'ayush' ? 'var(--color-secondary-container)' : 'var(--color-surface-container-lowest)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onClick={() => setPathway('ayush')}
              >
                <div>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-secondary-fixed)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                    <span className="icon icon-lg" aria-hidden="true">spa</span>
                  </div>
                  <h3 className="t-headline-sm" style={{ margin: '0 0 6px', color: 'var(--color-on-surface)' }}>
                    2. Ayurveda / AYUSH Healthcare
                  </h3>
                  <p className="t-body-sm" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.55, margin: '0 0 16px' }}>
                    Consult qualified Vaidyas in classical Ayurvedic medicine, chronic joint care (Sandhivata), lifestyle guidance (Dinacharya), and traditional Rasayana rejuvenation.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-surface btn-full"
                  style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
                  onClick={() => handleSelectPathway('ayush')}
                >
                  <span>Select Ayurveda / AYUSH</span>
                  <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
                </button>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
              <button type="button" className="btn btn-surface" onClick={() => navigate(ROUTES.PATIENT_HOME)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: CHOOSE DOCTOR / SPECIALTY */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
              <h2 className="t-headline-sm" style={{ margin: 0 }}>
                {pathway === 'ayush' ? 'Select Ayurveda Specialist / Vaidya' : 'Select General Medicine Clinician'}
              </h2>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setStep(1)}
              >
                Change Pathway ({pathway === 'ayush' ? 'Ayurveda' : 'General'})
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
              {doctorsList.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    className="card"
                    style={{
                      padding: 'var(--space-md)',
                      border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-outline-variant)',
                      background: isSelected ? 'var(--color-secondary-container)' : 'var(--color-surface-container-lowest)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setSelectedDate(doc.availableDates[0]);
                      setSelectedTime(doc.slots[0]);
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                          {doc.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-on-surface)' }}>{doc.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>{doc.qualifications}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600 }}>{doc.specialty}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>{doc.hospital}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-secondary)', marginTop: '4px' }}>
                        ★ {doc.rating} ({doc.reviewsCount} reviews) • {doc.experience}
                      </div>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <span className={`badge ${isSelected ? 'badge-primary' : 'badge-outline'}`} style={{ width: '100%', justifyContent: 'center' }}>
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
              <button type="button" className="btn btn-surface" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                <span>Continue to Mode & Slot</span>
                <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: MODE & TIME SLOT */}
        {/* ========================================================================= */}
        {step === 3 && selectedDoctor && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <div className="form-field">
                <label className="form-label">Consultation Mode</label>
                <select
                  className="form-select"
                  value={consultMode}
                  onChange={(e) => setConsultMode(e.target.value)}
                >
                  {selectedDoctor.modes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Consultation Date</label>
                <select
                  className="form-select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {selectedDoctor.availableDates.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field" style={{ marginBottom: 'var(--space-xl)' }}>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>Choose Available Time Slot</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {selectedDoctor.slots.map((s) => {
                  const isSelected = selectedTime === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-surface'}`}
                      onClick={() => setSelectedTime(s)}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
              <button type="button" className="btn btn-surface" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>
                <span>Continue to Record Consent</span>
                <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: HEALTH RECORD CONSENT */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div>
            <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '6px' }}>
                <span className="icon icon-sm" aria-hidden="true">lock</span>
                <span>Citizen Consent-Based Health Record Sharing</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
                Under Ayushman Bharat Digital Mission (ABDM), you have explicit granular control over what clinical information is disclosed to <strong>{selectedDoctor?.name}</strong>.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'var(--space-xl)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={consents.shareProfile}
                  onChange={() => handleToggleConsent('shareProfile')}
                  disabled={consents.doNotShare}
                />
                <span>Share Basic Profile & Demographics (Name, Age, Blood Group)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={consents.shareConditions}
                  onChange={() => handleToggleConsent('shareConditions')}
                  disabled={consents.doNotShare}
                />
                <span>Share Existing Medical Conditions (e.g. Hypertension, Diabetes)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={consents.shareMedicines}
                  onChange={() => handleToggleConsent('shareMedicines')}
                  disabled={consents.doNotShare}
                />
                <span>Share Active Prescription Medications & Dosages</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={consents.shareAllergies}
                  onChange={() => handleToggleConsent('shareAllergies')}
                  disabled={consents.doNotShare}
                />
                <span>Share Known Drug & Food Allergies</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={consents.shareHistory}
                  onChange={() => handleToggleConsent('shareHistory')}
                  disabled={consents.doNotShare}
                />
                <span>Share Previous Surgeries & Hospitalization Records</span>
              </label>

              <div style={{ borderTop: '1px dashed var(--color-outline-variant)', paddingTop: '10px', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: 'var(--color-primary)' }}>
                  <input
                    type="checkbox"
                    checked={consents.doNotShare}
                    onChange={() => handleToggleConsent('doNotShare')}
                  />
                  <strong>Do not share medical records (Consultation only)</strong>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
              <button type="button" className="btn btn-surface" onClick={() => setStep(3)}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(5)}>
                <span>Review & Confirm</span>
                <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: REVIEW & CONFIRM */}
        {/* ========================================================================= */}
        {step === 5 && selectedDoctor && (
          <div>
            <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-xl)' }}>
              <h3 className="t-headline-sm" style={{ margin: '0 0 12px', color: 'var(--color-primary)' }}>
                Consultation Summary
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '14px', color: 'var(--color-on-surface)' }}>
                <div><strong>Treatment System:</strong> {pathway === 'ayush' ? 'Ayurveda / AYUSH' : 'General Medicine'}</div>
                <div><strong>Practitioner:</strong> {selectedDoctor.name}</div>
                <div><strong>Specialty:</strong> {selectedDoctor.specialty}</div>
                <div><strong>Facility:</strong> {selectedDoctor.hospital}</div>
                <div><strong>Consultation Mode:</strong> {consultMode}</div>
                <div><strong>Scheduled Slot:</strong> {selectedDate} at {selectedTime}</div>
                <div><strong>Record Consent:</strong> {consents.doNotShare ? 'No Records Disclosed' : 'Selected Records Granted'}</div>
                <div><strong>Consultation Fee:</strong> <span style={{ color: 'var(--color-tertiary)', fontWeight: 700 }}>100% Free Public Service</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)' }}>
              <button type="button" className="btn btn-surface" onClick={() => setStep(4)}>
                Back
              </button>
              <button type="button" className="btn btn-primary btn-lg" onClick={handleConfirm}>
                <span>Confirm & Generate OPD Token</span>
                <span className="icon icon-sm" aria-hidden="true">check_circle</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: CONFIRMED */}
        {/* ========================================================================= */}
        {step === 6 && confirmedData && (
          <div style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
            <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: 'var(--radius-full)', background: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
              <span className="icon icon-xl icon-fill" aria-hidden="true">event_available</span>
            </div>
            <h2 className="t-headline-md" style={{ margin: '0 0 8px' }}>Appointment Confirmed!</h2>
            <p className="t-body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '540px', margin: '0 auto 18px' }}>
              Your appointment with <strong>{confirmedData.doctor}</strong> ({confirmedData.treatmentSystem}) is booked for <strong>{confirmedData.date}</strong> at <strong>{confirmedData.time}</strong>.
            </p>

            <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', display: 'inline-block', textAlign: 'left', marginBottom: '24px', fontSize: '13px' }}>
              <div><strong>Token Number:</strong> <code style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{confirmedData.token}</code></div>
              <div><strong>Mode:</strong> {confirmedData.mode}</div>
              <div><strong>Facility:</strong> {confirmedData.facility}</div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate(ROUTES.PATIENT_HOME)}
              >
                <span>Return to Patient Home</span>
                <span className="icon icon-sm" aria-hidden="true">home</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
