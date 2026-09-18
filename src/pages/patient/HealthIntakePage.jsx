import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientContext } from '../../contexts/PatientContext';
import { AudioAssist } from '../../components/ui/AudioAssist';
import { useLanguage } from '../../hooks/useLanguage';
import { ROUTES } from '../../constants/routes';

export const HealthIntakePage = () => {
  const navigate = useNavigate();
  const { intakeData, updateIntake } = useContext(PatientContext);
  const { t } = useLanguage();

  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 8;

  // Local state for adding medicines in Section 3
  const [medInput, setMedInput] = useState({ name: '', frequency: 'Once daily', notes: '' });

  const sectionPrompts = {
    1: "Section 1: Basic Health Information. Enter your height, weight, and blood group. You can select I do not know if unsure.",
    2: "Section 2: Existing Medical Conditions. Select whether you have diagnosed conditions like Diabetes, High Blood Pressure, Asthma, Heart or Kidney issues.",
    3: "Section 3: Current Medicines. Are you currently taking any prescription medicines? If yes, add their name and frequency.",
    4: "Section 4: Past Medical History. Inform us of any past major illnesses, surgeries, or hospitalizations.",
    5: "Section 5: Known Allergies. Do you have any allergies to drugs like penicillin, or food items?",
    6: "Section 6: Family Medical History. Optionally specify hereditary conditions like diabetes or heart disease in your family.",
    7: "Section 7: Current Health Concerns. What health concern would you like to discuss with a doctor today?",
    8: "Section 8: Emergency Contact. Optional emergency contact details for hospital record safety."
  };

  const currentPromptText = t(`intake.prompt${currentSection}`, sectionPrompts[currentSection]);

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(ROUTES.PROFILE_REVIEW);
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddMedicine = () => {
    if (!medInput.name.trim()) return;
    const updated = [...(intakeData.medicines || []), { ...medInput, active: true }];
    updateIntake({ medicines: updated });
    setMedInput({ name: '', frequency: 'Once daily', notes: '' });
  };

  const handleRemoveMedicine = (idx) => {
    const updated = intakeData.medicines.filter((_, i) => i !== idx);
    updateIntake({ medicines: updated });
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{ padding: 'var(--space-2xl) var(--gutter-mobile)' }}>
      {/* Statutory Banner */}
      <div style={{ background: 'var(--color-surface-container-low)', borderLeft: '4px solid var(--color-primary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Statutory Notice • सांविधिक सूचना
            </span>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-on-surface)' }}>
              {t('intake.disclaimer', 'This health history questionnaire aggregates records for consultation. It is NOT a medical diagnosis system.')}
            </p>
          </div>
          <AudioAssist text={currentPromptText} label={t('common.listen', 'Listen')} />
        </div>
      </div>

      <div className="card" style={{ maxWidth: '780px', margin: '0 auto', padding: 'var(--space-xl)' }}>
        {/* Step Indicator Header */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)' }}>
              Section {currentSection} of {totalSections}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
              {Math.round((currentSection / totalSections) * 100)}% Complete
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--color-surface-container-high)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(currentSection / totalSections) * 100}%`,
                background: 'var(--color-primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: Basic Health Information */}
        {/* ========================================================================= */}
        {currentSection === 1 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface)' }}>
              1. Basic Health Metrics
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
              <div className="form-field">
                <label className="form-label">Height (cm)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 162 cm or 'Not Sure'"
                  value={intakeData.height || ''}
                  onChange={(e) => updateIntake({ height: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 64 kg or 'Not Sure'"
                  value={intakeData.weight || ''}
                  onChange={(e) => updateIntake({ weight: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Blood Group</label>
                <select
                  className="form-select"
                  value={intakeData.bloodGroup || 'I do not know'}
                  onChange={(e) => updateIntake({ bloodGroup: e.target.value })}
                >
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="I do not know">I do not know</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: Existing Medical Conditions */}
        {/* ========================================================================= */}
        {currentSection === 2 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              2. Existing Medical Conditions
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              Select any chronic or previously diagnosed conditions that apply to you:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: 'var(--space-md)' }}>
              {[
                { key: 'diabetes', label: 'Diabetes Mellitus' },
                { key: 'hypertension', label: 'High Blood Pressure' },
                { key: 'asthma', label: 'Asthma / Respiratory' },
                { key: 'heartCondition', label: 'Heart Conditions' },
                { key: 'kidneyCondition', label: 'Kidney Disease' },
                { key: 'thyroidCondition', label: 'Thyroid Disorder' },
              ].map((cond) => (
                <label
                  key={cond.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    border: '1px solid var(--color-outline-variant)',
                    borderRadius: 'var(--radius-md)',
                    background: intakeData[cond.key] ? 'var(--color-secondary-container)' : 'var(--color-surface-container-lowest)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!intakeData[cond.key]}
                    onChange={(e) => updateIntake({ [cond.key]: e.target.checked })}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{cond.label}</span>
                </label>
              ))}
            </div>
            <div className="form-field">
              <label className="form-label">Other Chronic Conditions (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Arthritis, Migraine, or 'None'"
                value={intakeData.otherConditions || ''}
                onChange={(e) => updateIntake({ otherConditions: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: Current Medicines */}
        {/* ========================================================================= */}
        {currentSection === 3 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              3. Current Medicines
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              Are you currently taking any prescription or regular medications?
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: 'var(--space-md)' }}>
              {['Yes', 'No', 'I do not know'].map((opt) => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="takingMeds"
                    checked={intakeData.isTakingMeds === opt}
                    onChange={() => updateIntake({ isTakingMeds: opt })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {intakeData.isTakingMeds === 'Yes' && (
              <div style={{ background: 'var(--color-surface-container-low)', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-md)' }}>
                <h3 className="t-label-md" style={{ margin: '0 0 8px' }}>Add Medicine</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Medicine Name (e.g. Metformin)"
                    value={medInput.name}
                    onChange={(e) => setMedInput({ ...medInput, name: e.target.value })}
                  />
                  <select
                    className="form-select"
                    value={medInput.frequency}
                    onChange={(e) => setMedInput({ ...medInput, frequency: e.target.value })}
                  >
                    <option value="Once daily">Once daily (OD)</option>
                    <option value="Twice daily">Twice daily (BD)</option>
                    <option value="Three times daily">Three times daily (TDS)</option>
                    <option value="As needed">As needed (SOS)</option>
                  </select>
                </div>
                <button type="button" className="btn btn-surface btn-sm" onClick={handleAddMedicine}>
                  <span className="icon icon-sm" aria-hidden="true">add</span>
                  <span>Add to Medication List</span>
                </button>

                {/* List of Medicines */}
                {intakeData.medicines?.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {intakeData.medicines.map((m, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-md)' }}>
                        <span style={{ fontSize: '13px' }}><strong>{m.name}</strong> ({m.frequency})</span>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => handleRemoveMedicine(idx)} style={{ color: 'var(--color-error)' }}>
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: Past Medical History */}
        {/* ========================================================================= */}
        {currentSection === 4 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              4. Past Medical History
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              Have you had previous surgeries, major illnesses, or hospitalizations?
            </p>
            <div className="form-field" style={{ marginBottom: 'var(--space-md)' }}>
              <label className="form-label">Past Surgeries / Operations</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Appendectomy (2018), Knee Arthroscopy, or 'None'"
                value={intakeData.surgeries || ''}
                onChange={(e) => updateIntake({ surgeries: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Past Hospital Admissions / Major Illnesses</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Typhoid admission (2020), Jaundice, or 'None'"
                value={intakeData.hospitalizations || ''}
                onChange={(e) => updateIntake({ hospitalizations: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: Allergies */}
        {/* ========================================================================= */}
        {currentSection === 5 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              5. Known Allergies
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              Do you experience allergic reactions to medicines or food items?
            </p>
            <div className="form-field">
              <label className="form-label">Allergy Details</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Penicillin rash, Sulfa drugs, Peanuts, or 'No known allergies'"
                value={intakeData.allergies || ''}
                onChange={(e) => updateIntake({ allergies: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: Family Medical History */}
        {/* ========================================================================= */}
        {currentSection === 6 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              6. Family Medical History (Optional)
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              Is there a history of hereditary conditions in your immediate family?
            </p>
            <div className="form-field">
              <label className="form-label">Known Family Health History</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Maternal diabetes, Paternal hypertension, or 'I do not know'"
                value={intakeData.familyHistory || ''}
                onChange={(e) => updateIntake({ familyHistory: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 7: Current Health Concerns */}
        {/* ========================================================================= */}
        {currentSection === 7 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              7. Current Health Concerns
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              What symptoms or issues would you like to consult a doctor about?
            </p>
            <div className="form-field">
              <label className="form-label">Chief Health Concern</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="e.g. Joint stiffness in the morning, intermittent back pain, occasional fatigue"
                value={intakeData.primaryConcern || ''}
                onChange={(e) => updateIntake({ primaryConcern: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 8: Emergency Contact */}
        {/* ========================================================================= */}
        {currentSection === 8 && (
          <div>
            <h2 className="t-headline-sm" style={{ margin: '0 0 8px', color: 'var(--color-on-surface)' }}>
              8. Emergency Contact (Optional)
            </h2>
            <p className="t-body-sm" style={{ margin: '0 0 16px', color: 'var(--color-on-surface-variant)' }}>
              In case of emergency hospital admission, whom may the clinical desk reach?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
              <div className="form-field">
                <label className="form-label">Contact Person Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Shri Subir Sen"
                  value={intakeData.emergencyName || ''}
                  onChange={(e) => updateIntake({ emergencyName: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Relationship</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Spouse / Brother"
                  value={intakeData.emergencyRel || ''}
                  onChange={(e) => updateIntake({ emergencyRel: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="10-digit mobile"
                  value={intakeData.emergencyPhone || ''}
                  onChange={(e) => updateIntake({ emergencyPhone: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-outline-variant)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
          <button
            type="button"
            className="btn btn-surface"
            onClick={handleBack}
            disabled={currentSection === 1}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('common.back', 'Back')}</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={handleNext}
          >
            <span>{currentSection === totalSections ? t('common.review', 'Review Profile') : t('common.continue', 'Continue')}</span>
            <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
