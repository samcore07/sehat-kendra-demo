import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { findDoctorPatientRecord } from '../../data/doctorMockData';
import { useLanguage } from '../../hooks/useLanguage';

const METHODS = ['abha', 'aadhaar', 'mobile'];

export const DoctorPatientLookupPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Search form state
  const [selectedMethod, setSelectedMethod] = useState('abha'); // 'abha' | 'aadhaar' | 'mobile'
  const [identifierInput, setIdentifierInput] = useState('');
  const [searchStatus, setSearchStatus] = useState('idle'); // 'idle' | 'loading' | 'found' | 'not_found'
  const [matchedPatient, setMatchedPatient] = useState(null);

  const handleTabChange = (method) => {
    setSelectedMethod(method);
    setIdentifierInput('');
    setSearchStatus('idle');
    setMatchedPatient(null);
  };

  const handleTabKeyDown = (e) => {
    const currentIndex = METHODS.indexOf(selectedMethod);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % METHODS.length;
      handleTabChange(METHODS[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + METHODS.length) % METHODS.length;
      handleTabChange(METHODS[prevIndex]);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!identifierInput.trim()) return;

    setSearchStatus('loading');
    setMatchedPatient(null);

    // Realistic clinical lookup simulation (500ms delay)
    setTimeout(() => {
      const found = findDoctorPatientRecord(identifierInput, selectedMethod);
      if (found) {
        setMatchedPatient(found);
        setSearchStatus('found');
      } else {
        setSearchStatus('not_found');
      }
    }, 550);
  };

  const handlePresetSelect = (presetVal, method = selectedMethod) => {
    setSelectedMethod(method);
    setIdentifierInput(presetVal);
    setSearchStatus('loading');

    setTimeout(() => {
      const found = findDoctorPatientRecord(presetVal, method);
      if (found) {
        setMatchedPatient(found);
        setSearchStatus('found');
      } else {
        setSearchStatus('not_found');
      }
    }, 500);
  };

  const handleResetSearch = () => {
    setIdentifierInput('');
    setSearchStatus('idle');
    setMatchedPatient(null);
  };

  const handleOpenSummary = (patientId) => {
    const targetId = patientId || matchedPatient?.id || 'P-10029';
    navigate(`${ROUTES.DOCTOR_PATIENT_SUMMARY}/${targetId}`);
  };

  return (
    <div className="doctor-workstation animate-fade-in">
      {/* Clinician Session Banner */}
      <div className="doctor-banner">
        <div className="doctor-banner__badge">
          <span className="icon icon-sm" aria-hidden="true">local_hospital</span>
          <span>{t('doctor.workstationBadge', 'e-Hospital Workstation • National Digital Health Gateway')}</span>
        </div>
        <div className="doctor-banner__session hide-mobile">
          <span>Facility: <strong>Dr. Ram Manohar Lohia Hospital, New Delhi</strong></span>
          <span>Dept: <strong>General Medicine OPD</strong></span>
          <span>Clinician: <strong>Dr. V. Menon (OPD-1)</strong></span>
        </div>
      </div>

      {/* Main Lookup Card */}
      <div className="doctor-lookup-card">
        {/* Header */}
        <div className="doctor-lookup-header">
          <div className="doctor-lookup-tag">
            <span className="icon icon-xs" aria-hidden="true">stethoscope</span>
            <span>{t('doctor.headerBadge', 'Doctor / Clinician Workstation')}</span>
          </div>
          <h1 className="doctor-lookup-title">
            <span className="icon" style={{ fontSize: '28px', color: '#0072B8' }} aria-hidden="true">person_search</span>
            <span>{t('doctor.lookupTitle', 'Find Patient Record')}</span>
          </h1>
          <p className="doctor-lookup-subtitle">
            {t('doctor.lookupSubtitle', 'Search for a registered patient to review their health history before consultation.')}
          </p>
        </div>

        {/* Identification Segmented Control Tabs */}
        <div>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a202c' }}>
              {t('doctor.patientIdTitle', 'Patient Identification')}
            </div>
            <div style={{ fontSize: '12.5px', color: '#64748b' }}>
              {t('doctor.patientIdSubtitle', 'Enter any identifier used by the patient during registration.')}
            </div>
          </div>

          <div
            className="id-method-tabs"
            role="tablist"
            aria-label="Select identification method"
            onKeyDown={handleTabKeyDown}
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedMethod === 'abha'}
              tabIndex={selectedMethod === 'abha' ? 0 : -1}
              className={`id-method-tab ${selectedMethod === 'abha' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('abha')}
            >
              <span className="icon icon-xs" aria-hidden="true">badge</span>
              <span>{t('doctor.tabAbha', '1. ABHA Number')}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedMethod === 'aadhaar'}
              tabIndex={selectedMethod === 'aadhaar' ? 0 : -1}
              className={`id-method-tab ${selectedMethod === 'aadhaar' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('aadhaar')}
            >
              <span className="icon icon-xs" aria-hidden="true">fingerprint</span>
              <span>{t('doctor.tabAadhaar', '2. Aadhaar Number')}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedMethod === 'mobile'}
              tabIndex={selectedMethod === 'mobile' ? 0 : -1}
              className={`id-method-tab ${selectedMethod === 'mobile' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('mobile')}
            >
              <span className="icon icon-xs" aria-hidden="true">phone_android</span>
              <span>{t('doctor.tabMobile', '3. Mobile Number')}</span>
            </button>
          </div>
        </div>

        {/* Active Tab Form */}
        <div className="doctor-search-box">
          <form onSubmit={handleSearch}>
            {selectedMethod === 'abha' && (
              <div>
                <label htmlFor="input-abha" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2d3748', marginBottom: '4px' }}>
                  {t('doctor.labelAbha', 'ABHA Number')}
                </label>
                <div className="doctor-input-group">
                  <input
                    id="input-abha"
                    type="text"
                    className="doctor-input"
                    placeholder={t('doctor.placeholderAbha', 'Enter 14-digit ABHA number')}
                    value={identifierInput}
                    onChange={(e) => {
                      setIdentifierInput(e.target.value);
                      if (searchStatus !== 'idle') setSearchStatus('idle');
                    }}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn-clinical-search"
                    disabled={searchStatus === 'loading' || !identifierInput.trim()}
                  >
                    {searchStatus === 'loading' ? (
                      <>
                        <span className="icon icon-sm animate-spin" aria-hidden="true">progress_activity</span>
                        <span>{t('doctor.searching', 'Searching...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('doctor.btnFindPatient', 'Find Patient')}</span>
                        <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  Use the ABHA number linked to the patient's SehatKendra profile.
                </div>
              </div>
            )}

            {selectedMethod === 'aadhaar' && (
              <div>
                <label htmlFor="input-aadhaar" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2d3748', marginBottom: '4px' }}>
                  {t('doctor.labelAadhaar', 'Aadhaar Number')}
                </label>
                <div className="doctor-input-group">
                  <input
                    id="input-aadhaar"
                    type="text"
                    className="doctor-input"
                    placeholder={t('doctor.placeholderAadhaar', 'Enter 12-digit Aadhaar number')}
                    value={identifierInput}
                    onChange={(e) => {
                      setIdentifierInput(e.target.value);
                      if (searchStatus !== 'idle') setSearchStatus('idle');
                    }}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn-clinical-search"
                    disabled={searchStatus === 'loading' || !identifierInput.trim()}
                  >
                    {searchStatus === 'loading' ? (
                      <>
                        <span className="icon icon-sm animate-spin" aria-hidden="true">progress_activity</span>
                        <span>{t('doctor.searching', 'Searching...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('doctor.btnFindPatient', 'Find Patient')}</span>
                        <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  Use the Aadhaar number associated with the patient's registration.
                </div>
                <div style={{ marginTop: '8px', fontSize: '11.5px', color: '#b45309', background: '#fffbeb', padding: '4px 10px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span className="icon icon-xs" aria-hidden="true">lock</span>
                  <span>Prototype mode — no real government ID is transmitted.</span>
                </div>
              </div>
            )}

            {selectedMethod === 'mobile' && (
              <div>
                <label htmlFor="input-mobile" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#2d3748', marginBottom: '4px' }}>
                  {t('doctor.labelMobile', 'Registered Mobile Number')}
                </label>
                <div className="doctor-input-group">
                  <input
                    id="input-mobile"
                    type="tel"
                    className="doctor-input"
                    placeholder={t('doctor.placeholderMobile', 'Enter 10-digit mobile number')}
                    value={identifierInput}
                    onChange={(e) => {
                      setIdentifierInput(e.target.value);
                      if (searchStatus !== 'idle') setSearchStatus('idle');
                    }}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn-clinical-search"
                    disabled={searchStatus === 'loading' || !identifierInput.trim()}
                  >
                    {searchStatus === 'loading' ? (
                      <>
                        <span className="icon icon-sm animate-spin" aria-hidden="true">progress_activity</span>
                        <span>{t('doctor.searching', 'Searching...')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('doctor.btnFindPatient', 'Find Patient')}</span>
                        <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
                      </>
                    )}
                  </button>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  Use the mobile number registered with the patient's health profile.
                </div>
              </div>
            )}
          </form>

          {/* Quick Demo Pre-sets for Evaluators */}
          <div className="demo-preset-container">
            <div className="demo-preset-label">{t('doctor.demoQuickFill', 'Demonstration Quick-Fill Identifiers:')}</div>
            <div className="demo-preset-chips">
              <button
                type="button"
                className="demo-chip"
                onClick={() => handlePresetSelect('XX-XXXX-XXXX-1204', 'abha')}
                title="Click to search demo patient Smt. Ananya Sen (P-10029) via ABHA"
              >
                <span className="icon icon-xs" aria-hidden="true">verified_user</span>
                <span>Demo ABHA: <strong>XX-XXXX-XXXX-1204</strong> (P-10029 • Smt. Ananya Sen)</span>
              </button>

              <button
                type="button"
                className="demo-chip"
                onClick={() => handlePresetSelect('14-3210-0012-4561', 'abha')}
                title="Click to search demo patient Shri Ramesh Kumar (P-10030) via ABHA"
              >
                <span className="icon icon-xs" aria-hidden="true">verified_user</span>
                <span>Demo ABHA: <strong>14-3210-0012-4561</strong> (P-10030 • Shri Ramesh Kumar)</span>
              </button>

              <button
                type="button"
                className="demo-chip"
                onClick={() => handlePresetSelect('5678-1234-9012', 'aadhaar')}
                title="Click to search demo patient Smt. Ananya Sen via Aadhaar"
              >
                <span className="icon icon-xs" aria-hidden="true">fingerprint</span>
                <span>Demo Aadhaar: <strong>5678-1234-9012</strong></span>
              </button>

              <button
                type="button"
                className="demo-chip"
                onClick={() => handlePresetSelect('9811054321', 'mobile')}
                title="Click to search demo patient Shri Ramesh Kumar via Mobile"
              >
                <span className="icon icon-xs" aria-hidden="true">call</span>
                <span>Demo Mobile: <strong>9811054321</strong> (P-10030)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State Feedback */}
        {searchStatus === 'loading' && (
          <div className="lookup-status-box loading" role="status">
            <span className="icon icon-md" style={{ color: '#0072B8' }} aria-hidden="true">sync</span>
            <div>
              <div style={{ fontWeight: 700, color: '#005991' }}>{t('doctor.findingRecord', 'Finding patient record...')}</div>
              <div style={{ fontSize: '12px', color: '#555555', marginTop: '2px' }}>
                {t('doctor.findingDesc', 'Querying ABDM Health Repository and local hospital Master Patient Index.')}
              </div>
            </div>
          </div>
        )}

        {/* Not Found State Feedback */}
        {searchStatus === 'not_found' && (
          <div className="lookup-status-box error" role="alert">
            <span className="icon icon-md" style={{ color: '#c53030' }} aria-hidden="true">error_outline</span>
            <div>
              <div style={{ fontWeight: 700 }}>{t('doctor.notFoundTitle', 'Patient record not found')}</div>
              <div style={{ fontSize: '12.5px', marginTop: '2px' }}>
                {t('doctor.notFoundDesc', 'Please check the identifier and try again. Ensure the 14-digit ABHA, 12-digit Aadhaar, or 10-digit mobile number is entered correctly.')}
              </div>
            </div>
          </div>
        )}

        {/* Part 3 — Patient Found / Confirmation Card */}
        {searchStatus === 'found' && matchedPatient && (
          <div className="patient-found-card animate-fade-in" role="region" aria-label="Patient Confirmation">
            <div className="patient-found-badge">
              <span className="icon icon-xs" aria-hidden="true">check_circle</span>
              <span>{t('doctor.patientFound', 'PATIENT FOUND • RECORD MATCHED')}</span>
            </div>

            <div className="patient-found-identity">
              <div className="patient-avatar-badge">
                {matchedPatient.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="patient-found-name">{matchedPatient.name}</h2>
                <div className="patient-found-meta">
                  <span>{matchedPatient.gender}</span>
                  <span style={{ margin: '0 6px' }}>•</span>
                  <span>{matchedPatient.age}</span>
                  <span style={{ margin: '0 6px' }}>•</span>
                  <span>Blood Group: <strong>{matchedPatient.bloodGroup}</strong></span>
                </div>
                <div className="patient-found-abha">
                  ABHA ID: <strong>{matchedPatient.abha}</strong>
                  <span style={{ marginLeft: '12px', color: '#4a5568', fontFamily: 'inherit', fontSize: '12px' }}>
                    Token: <strong>{matchedPatient.token}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '4px', border: '1px solid #d8e0e6', fontSize: '13px', color: '#2d3748', marginBottom: '16px' }}>
              <span className="icon icon-xs" style={{ color: '#16a34a', verticalAlign: 'middle', marginRight: '6px' }} aria-hidden="true">verified</span>
              <span>{t('doctor.matchSuccess', 'Patient record matched successfully. Pre-consultation health history, chronic conditions, and lab records are ready for clinician review.')}</span>
            </div>

            <div className="patient-found-actions">
              <button
                type="button"
                className="btn-open-history"
                onClick={() => handleOpenSummary(matchedPatient.id)}
              >
                <span>{t('doctor.btnOpenSummary', 'Open Clinical History')}</span>
                <span className="icon icon-sm" aria-hidden="true">arrow_forward</span>
              </button>

              <button
                type="button"
                className="btn-search-another"
                onClick={handleResetSearch}
              >
                <span className="icon icon-sm" aria-hidden="true">refresh</span>
                <span>{t('doctor.btnSearchAnother', 'Search Another Patient')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Back navigation */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigate(ROUTES.ROLE_SELECTION)}
          >
            <span className="icon icon-sm" aria-hidden="true">arrow_back</span>
            <span>{t('doctor.btnReturnRole', 'Return to Role Selection')}</span>
          </button>
          <span style={{ fontSize: '11px', color: '#718096' }}>
            ABDM National Health Authority Compliant Interface v2.4
          </span>
        </div>
      </div>
    </div>
  );
};
