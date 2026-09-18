/**
 * SEHAT KENDRA — Doctor Portal Mock Database
 * Clinical Records for Frontend OPD Simulation
 * Prototype Demonstration — No real patient or government ID data used
 */

export const DOCTOR_MOCK_PATIENTS = [
  {
    id: 'P-10029',
    token: 'OPD-0045',
    name: 'Smt. Ananya Sen',
    nameLocal: 'শ্রীমতি অনন্যা সেন',
    age: '58 years',
    ageNum: 58,
    gender: 'Female',
    bloodGroup: 'O+',
    abha: 'XX-XXXX-XXXX-1204',
    abhaRaw: '91-4421-8890-1204',
    aadhaarMasked: 'XXXX-XXXX-9012',
    aadhaarDemo: '5678-1234-9012',
    mobile: '98XXXXXX45',
    mobileRaw: '9830012345',
    district: 'North 24 Parganas, West Bengal',
    facility: 'Dr. Ram Manohar Lohia Hospital, New Delhi',
    department: 'General Medicine OPD',
    lastUpdated: 'Today',
    statusTag: 'Pre-consultation history',
    verified: true,

    // Section 1 — Clinical Snapshot
    snapshot: {
      chiefConcern: 'Chronic joint stiffness and occasional fatigue',
      knownConditions: ['Hypertension', 'Type 2 Diabetes'],
      currentMedications: ['Metformin 500 mg', 'Amlodipine 5 mg'],
      allergies: 'Penicillin',
      pastSurgery: 'Appendectomy — 2012'
    },

    // Section 2 — Chief Complaint & History of Present Illness
    presentHistory: {
      chiefComplaint: 'Chronic joint stiffness',
      onset: 'Approximately 6 months ago',
      duration: '6 months',
      course: 'Intermittent, gradually increasing',
      associatedSymptoms: 'Occasional fatigue',
      severity: 'Moderate',
      aggravatingFactors: 'Prolonged activity',
      relievingFactors: 'Rest'
    },

    // Section 3 — Past Medical & Surgical History
    medicalHistory: {
      conditions: [
        'Hypertension',
        'Type 2 Diabetes Mellitus'
      ],
      pastSurgicalHistory: [
        'Appendectomy — 2012'
      ],
      hospitalizations: [
        'Appendectomy hospitalization — 2012'
      ]
    },

    // Section 4 — Medications & Allergies
    medications: [
      {
        name: 'Metformin',
        dose: '500 mg',
        frequency: 'Twice daily',
        status: 'Current'
      },
      {
        name: 'Amlodipine',
        dose: '5 mg',
        frequency: 'Once daily',
        status: 'Current'
      }
    ],
    allergiesList: [
      {
        allergen: 'Penicillin',
        reaction: 'Skin rash',
        severity: 'Moderate',
        alertLevel: 'warning'
      }
    ],

    // Section 5 — Family & Personal History
    familyHistory: [
      { relation: 'Father', condition: 'Hypertension' },
      { relation: 'Mother', condition: 'Type 2 Diabetes' }
    ],
    personalHistory: {
      diet: 'Balanced vegetarian diet, regular meals',
      sleep: '6–7 hours, occasionally disturbed by joint stiffness',
      physicalActivity: 'Mild morning walking (20 minutes daily)',
      tobacco: 'Not recorded / Non-user',
      alcohol: 'Not recorded / Non-user'
    },

    // Section 6 — Investigations
    investigations: [
      {
        investigation: 'HbA1c',
        date: '12 Aug 2026',
        result: '7.8%',
        referenceRange: '4.0–5.6%',
        status: 'Above reference',
        flag: 'elevated'
      },
      {
        investigation: 'Blood Pressure',
        date: '12 Aug 2026',
        result: '148/92 mmHg',
        referenceRange: '<120/80 mmHg',
        status: 'Elevated',
        flag: 'elevated'
      },
      {
        investigation: 'Fasting Blood Sugar',
        date: '12 Aug 2026',
        result: '142 mg/dL',
        referenceRange: '70–100 mg/dL',
        status: 'Above reference',
        flag: 'elevated'
      },
      {
        investigation: 'Serum Creatinine',
        date: '12 Aug 2026',
        result: '0.9 mg/dL',
        referenceRange: '0.6–1.2 mg/dL',
        status: 'Within reference',
        flag: 'normal'
      }
    ],

    // Section 7 — Medical Documents
    documents: [
      {
        id: 'DOC-001',
        type: 'Lab Report',
        title: 'Comprehensive Metabolic Panel & Glycated Hb Report',
        date: '12 Aug 2026',
        source: 'City Diagnostic Centre',
        fileFormat: 'PDF Document (Signed)',
        pages: 2,
        verifiedBy: 'Dr. S. K. Roy (MD Pathology)'
      },
      {
        id: 'DOC-002',
        type: 'Prescription',
        title: 'General Medicine Outpatient Follow-up Prescription',
        date: '10 Aug 2026',
        source: 'General Medicine',
        fileFormat: 'Digital Rx (ABDM e-Prescription)',
        pages: 1,
        verifiedBy: 'Dr. Priya Sharma (MBBS, MD)'
      },
      {
        id: 'DOC-003',
        type: 'Discharge Summary',
        title: 'Emergency Appendectomy Operative & Discharge Record',
        date: '14 May 2012',
        source: 'District Civil Hospital',
        fileFormat: 'Archival Summary (Digitized)',
        pages: 3,
        verifiedBy: 'Surgical Unit III'
      },
      {
        id: 'DOC-004',
        type: 'Imaging Report',
        title: 'Bilateral Knee Joint Plain Radiography (AP & Lat Views)',
        date: '15 Jul 2026',
        source: 'National Imaging Centre',
        fileFormat: 'Radiology Report with PACS Key',
        pages: 2,
        verifiedBy: 'Dr. M. Banerjee (DMRD)'
      }
    ],

    // Section 8 — Medical History Timeline
    timeline: [
      {
        year: '2012',
        event: 'Appendectomy',
        detail: 'Hospitalized for acute appendicitis; uncomplicated appendectomy at District Civil Hospital.'
      },
      {
        year: '2024',
        event: 'Diagnosed with Hypertension',
        detail: 'Initiated on oral antihypertensive therapy (Amlodipine 5 mg OD).'
      },
      {
        year: '2025',
        event: 'Diagnosed with Type 2 Diabetes',
        detail: 'Initiated on Metformin 500 mg BD with dietary lifestyle modifications.'
      },
      {
        year: 'Aug 2026',
        event: 'Recent laboratory investigation',
        detail: 'HbA1c reported at 7.8%; BP recorded at 148/92 mmHg at City Diagnostic Centre.'
      },
      {
        year: 'Sep 2026',
        event: 'Current complaint — joint stiffness',
        detail: 'Patient self-reported gradual worsening of bilateral knee and knuckle stiffness.'
      }
    ],

    // Section 9 — Important Clinical Alerts ("Attention Required")
    clinicalAlerts: [
      {
        icon: 'warning',
        severity: 'warning',
        title: 'Elevated blood pressure recorded',
        value: '148/92 mmHg',
        note: 'Requires clinical monitoring and antihypertensive regimen review.'
      },
      {
        icon: 'warning',
        severity: 'warning',
        title: 'HbA1c above reference range',
        value: '7.8%',
        note: 'Sub-optimal glycemic control on current dosage.'
      },
      {
        icon: 'info',
        severity: 'info',
        title: 'Penicillin allergy documented',
        value: 'Cutaneous reaction (Skin rash)',
        note: 'Avoid Beta-lactam / Penicillin class antibiotics.'
      },
      {
        icon: 'info',
        severity: 'info',
        title: 'Current medication history requires verification',
        value: 'Metformin & Amlodipine',
        note: 'Confirm patient adherence and timing relative to meals.'
      }
    ],

    // Section 10 — AI-Generated Pre-Consultation Summary
    preConsultationSummary: {
      text: 'Smt. Ananya Sen is a 58-year-old female with known hypertension and type 2 diabetes. She reports approximately six months of intermittent joint stiffness with occasional fatigue. Current medications include metformin and amlodipine. Penicillin allergy is documented. Recent records show elevated blood pressure and HbA1c. Previous surgical history includes appendectomy in 2012.',
      disclaimer: 'System-generated from patient responses and available records. Verify before clinical use.'
    },

    // Section 11 — History Completeness
    completeness: [
      { category: 'Patient identity', complete: true, status: 'Verified via ABHA' },
      { category: 'Chief complaint', complete: true, status: 'Completed by patient' },
      { category: 'Medical history', complete: true, status: 'Recorded & documented' },
      { category: 'Medication history', complete: false, status: 'Needs verification' },
      { category: 'Allergy history', complete: true, status: 'Documented' },
      { category: 'Family history', complete: true, status: 'Recorded' },
      { category: 'Investigation history', complete: true, status: '4 records attached' },
      { category: 'Document history', complete: true, status: '4 source documents' }
    ],

    // Section 12 — AYUSH Support
    ayush: {
      available: true,
      parameters: [
        { label: 'Prakriti', value: 'Vata-Pitta' },
        { label: 'Vikriti', value: 'Vata-Kapha Vriddhi (Sandhigata lakshana)' },
        { label: 'Sara', value: 'Madhyama (Medium tissue excellence)' },
        { label: 'Samhanana', value: 'Madhyama (Compact body build)' },
        { label: 'Pramana', value: 'Madhyama (Normal anthropometry)' },
        { label: 'Satmya', value: 'Mishra (Mixed adaptability)' },
        { label: 'Sattva', value: 'Madhyama (Moderate mental stamina)' },
        { label: 'Ahara Shakti', value: 'Madhyama Jarana Shakti (Moderate digestive power)' },
        { label: 'Vyayama Shakti', value: 'Avara (Mild exercise tolerance)' },
        { label: 'Vaya', value: 'Pravriddha / Praudhavastha (58 years)' },
        { label: 'Ahara', value: 'Laghu-Snigdha pathya (Light, unctuous vegetarian diet)' },
        { label: 'Vihara', value: 'Regular dinacharya, daytime sedentary lifestyle' }
      ]
    }
  },

  // Secondary Demo Patient 2
  {
    id: 'P-10030',
    token: 'OPD-0041',
    name: 'Shri Ramesh Kumar',
    nameLocal: 'রমেশ কুমার',
    age: '68 years',
    ageNum: 68,
    gender: 'Male',
    bloodGroup: 'B+',
    abha: 'XX-XXXX-XXXX-4561',
    abhaRaw: '14-3210-0012-4561',
    aadhaarMasked: 'XXXX-XXXX-4561',
    aadhaarDemo: '6789-0123-4561',
    mobile: '98XXXXXX21',
    mobileRaw: '9811054321',
    district: 'New Delhi, Delhi',
    facility: 'Dr. Ram Manohar Lohia Hospital, New Delhi',
    department: 'General Medicine OPD',
    lastUpdated: 'Today',
    statusTag: 'Follow-up visit',
    verified: true,

    snapshot: {
      chiefConcern: 'Hypertension routine 6-month evaluation and chest heaviness on exertion',
      knownConditions: ['Essential Hypertension', 'Dyslipidemia'],
      currentMedications: ['Telmisartan 40 mg', 'Atorvastatin 10 mg'],
      allergies: 'No known drug allergies (NKDA)',
      pastSurgery: 'None'
    },

    presentHistory: {
      chiefComplaint: 'Chest tightness with heavy exertion',
      onset: '3 weeks ago',
      duration: '3 weeks',
      course: 'Episodic with climbing stairs',
      associatedSymptoms: 'Mild breathlessness',
      severity: 'Moderate',
      aggravatingFactors: 'Climbing stairs, rapid walking',
      relievingFactors: 'Rest within 5 minutes'
    },

    medicalHistory: {
      conditions: ['Essential Hypertension (Diagnosed 2018)', 'Dyslipidemia (Diagnosed 2021)'],
      pastSurgicalHistory: ['None reported'],
      hospitalizations: ['None']
    },

    medications: [
      { name: 'Telmisartan', dose: '40 mg', frequency: 'Once daily morning', status: 'Current' },
      { name: 'Atorvastatin', dose: '10 mg', frequency: 'Once daily at bed time', status: 'Current' }
    ],
    allergiesList: [
      { allergen: 'No known drug allergies (NKDA)', reaction: 'None', severity: 'None', alertLevel: 'info' }
    ],

    familyHistory: [
      { relation: 'Father', condition: 'Coronary Artery Disease' },
      { relation: 'Brother', condition: 'Hypertension' }
    ],
    personalHistory: {
      diet: 'Mixed Indian diet, low salt instructed',
      sleep: '7 hours uninterrupted',
      physicalActivity: 'Sedentary',
      tobacco: 'Former smoker (Quit 2015)',
      alcohol: 'Non-user'
    },

    investigations: [
      { investigation: 'Blood Pressure', date: '04 Sep 2026', result: '136/86 mmHg', referenceRange: '<120/80 mmHg', status: 'Borderline', flag: 'elevated' },
      { investigation: 'Lipid Profile (LDL)', date: '04 Sep 2026', result: '132 mg/dL', referenceRange: '<100 mg/dL', status: 'Above reference', flag: 'elevated' },
      { investigation: 'Serum Creatinine', date: '04 Sep 2026', result: '1.0 mg/dL', referenceRange: '0.7–1.3 mg/dL', status: 'Within reference', flag: 'normal' },
      { investigation: 'Resting ECG', date: '04 Sep 2026', result: 'Normal Sinus Rhythm', referenceRange: 'Normal', status: 'Within reference', flag: 'normal' }
    ],

    documents: [
      {
        id: 'DOC-101',
        type: 'Prescription',
        title: 'Cardiology Review & Rx',
        date: '04 Sep 2026',
        source: 'Dept of Cardiology, RML Hospital',
        fileFormat: 'Digital Rx',
        pages: 1,
        verifiedBy: 'Dr. V. Menon'
      },
      {
        id: 'DOC-102',
        type: 'Lab Report',
        title: 'Comprehensive Lipid & Renal Panel',
        date: '04 Sep 2026',
        source: 'Hospital Central Lab',
        fileFormat: 'PDF Document',
        pages: 2,
        verifiedBy: 'Dr. A. Verma'
      }
    ],

    timeline: [
      { year: '2018', event: 'Diagnosed with Hypertension', detail: 'Started on Telmisartan 40 mg' },
      { year: '2021', event: 'Dyslipidemia detected', detail: 'Started on Atorvastatin 10 mg' },
      { year: 'Sep 2026', event: 'Exertional tightness reported', detail: 'Referred for TMT stress test evaluation' }
    ],

    clinicalAlerts: [
      {
        icon: 'warning',
        severity: 'warning',
        title: 'Elevated LDL Cholesterol',
        value: '132 mg/dL',
        note: 'Consider dose titration or dietary counseling.'
      },
      {
        icon: 'info',
        severity: 'info',
        title: 'Exertional symptoms reported',
        value: 'Class II Angina symptom pattern',
        note: 'TMT stress test suggested.'
      }
    ],

    preConsultationSummary: {
      text: 'Shri Ramesh Kumar is a 68-year-old male with established hypertension and dyslipidemia presenting for routine follow-up. He reports recent onset of intermittent exertional chest tightness over 3 weeks that relieves upon rest. Current medications include Telmisartan and Atorvastatin with no known drug allergies. Recent ECG shows normal sinus rhythm with borderline elevated blood pressure.',
      disclaimer: 'System-generated from patient responses and available records. Verify before clinical use.'
    },

    completeness: [
      { category: 'Patient identity', complete: true, status: 'Verified via ABHA' },
      { category: 'Chief complaint', complete: true, status: 'Completed by patient' },
      { category: 'Medical history', complete: true, status: 'Recorded & documented' },
      { category: 'Medication history', complete: true, status: 'Verified' },
      { category: 'Allergy history', complete: true, status: 'Documented' },
      { category: 'Family history', complete: true, status: 'Recorded' },
      { category: 'Investigation history', complete: true, status: '4 records attached' },
      { category: 'Document history', complete: true, status: '2 source documents' }
    ],

    ayush: {
      available: false,
      parameters: []
    }
  }
];

/**
 * Helper to find patient by ABHA, Aadhaar, or Mobile query
 */
export const findDoctorPatientRecord = (query, method = 'abha') => {
  if (!query || typeof query !== 'string') return null;
  const clean = query.replace(/[\s-]/g, '').toLowerCase();

  return DOCTOR_MOCK_PATIENTS.find((p) => {
    if (method === 'abha') {
      const pAbhaClean = p.abha.replace(/[\s-]/g, '').toLowerCase();
      const pAbhaRawClean = p.abhaRaw.replace(/[\s-]/g, '').toLowerCase();
      return (
        pAbhaClean.includes(clean) ||
        pAbhaRawClean.includes(clean) ||
        (clean.includes('1204') && p.id === 'P-10029') ||
        (clean.includes('4561') && p.id === 'P-10030') ||
        (clean.includes('ananya') && p.id === 'P-10029')
      );
    }
    if (method === 'aadhaar') {
      const pAadhaarClean = p.aadhaarDemo.replace(/[\s-]/g, '').toLowerCase();
      return (
        pAadhaarClean.includes(clean) ||
        (clean.includes('9012') && p.id === 'P-10029') ||
        (clean.includes('5678') && p.id === 'P-10029') ||
        (clean.includes('4561') && p.id === 'P-10030')
      );
    }
    if (method === 'mobile') {
      const pPhoneClean = p.mobileRaw.replace(/[\s-]/g, '').toLowerCase();
      return (
        pPhoneClean.includes(clean) ||
        (clean.includes('98300') && p.id === 'P-10029') ||
        (clean.includes('45') && p.id === 'P-10029') ||
        (clean.includes('54321') && p.id === 'P-10030')
      );
    }
    return false;
  });
};
