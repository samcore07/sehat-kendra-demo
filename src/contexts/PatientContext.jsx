import React, { createContext, useState, useEffect } from 'react';

export const PatientContext = createContext();

const initialIntakeData = {
  // Step 1: Basic Profile
  fullName: 'Smt. Ananya Sen',
  gender: 'Female',
  dob: '1974-05-12',
  bloodGroup: 'B+',
  state: 'West Bengal',
  district: 'North 24 Parganas',
  contactNumber: '9830012345',

  // Step 2: Health Concerns
  primaryConcern: 'Chronic Joint Stiffness & Occasional Fatigue',
  severity: 'Moderate',
  duration: '6-12 months',

  // Step 3: Existing Medical Conditions
  hypertension: true,
  diabetes: true,
  asthma: false,
  allergies: 'Penicillin (mild rash)',

  // Step 4: Current Medicines
  medicines: [
    { name: 'Tab. Metformin 500mg', dosage: '1 tablet twice daily after meals', active: true },
    { name: 'Tab. Amlodipine 5mg', dosage: '1 tablet once daily morning', active: true },
  ],

  // Step 5: Past Medical History
  surgeries: 'None',
  hospitalizations: 'Appendectomy (2012)',

  // Step 6: Wellness Preferences
  ayushPreference: 'Ayurveda & Yoga lifestyle guidance',
  dietType: 'Vegetarian',

  // Step 7: Consent
  consentSigned: true,
};

export const PatientProvider = ({ children }) => {
  const [intakeData, setIntakeData] = useState(() => {
    const saved = localStorage.getItem('sk-intake');
    return saved ? JSON.parse(saved) : initialIntakeData;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('sk-prescriptions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'RX-99120',
        title: 'General Medicine OPD Consultation',
        doctor: 'Dr. Priya Sharma',
        facility: 'Dr. Ram Manohar Lohia Hospital, New Delhi',
        date: '2026-08-22',
        status: 'Verified',
        medicines: [
          { name: 'Metformin 500mg', instructions: '1-0-1 After food', days: 30 },
          { name: 'Amlodipine 5mg', instructions: '1-0-0 Before breakfast', days: 30 }
        ],
        rawText: 'Tab Metformin 500mg BD PC, Tab Amlodipine 5mg OD BBF. Review after 30 days.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sk-intake', JSON.stringify(intakeData));
  }, [intakeData]);

  useEffect(() => {
    localStorage.setItem('sk-prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  const updateIntake = (stepFields) => {
    setIntakeData((prev) => ({ ...prev, ...stepFields }));
  };

  const addPrescription = (newRx) => {
    setPrescriptions((prev) => [newRx, ...prev]);
  };

  const updatePrescriptionStatus = (id, newStatus) => {
    setPrescriptions((prev) =>
      prev.map((rx) => (rx.id === id ? { ...rx, status: newStatus } : rx))
    );
  };

  return (
    <PatientContext.Provider value={{
      intakeData,
      updateIntake,
      prescriptions,
      addPrescription,
      updatePrescriptionStatus
    }}>
      {children}
    </PatientContext.Provider>
  );
};
