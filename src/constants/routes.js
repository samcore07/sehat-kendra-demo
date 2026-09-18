export const ROUTES = {
  // Onboarding Journey
  WELCOME: '/',
  LANGUAGE: '/language',
  ROLE_SELECTION: '/role-selection',
  PATIENT_AUTH: '/patient/auth',
  PATIENT_REGISTER: '/patient/register',
  HEALTH_INTAKE: '/patient/health-intake',
  PROFILE_REVIEW: '/patient/profile-review',

  // Patient Application Core
  PATIENT_HOME: '/patient/home',
  PATIENT_PROFILE: '/patient/health-profile',
  PATIENT_APPOINTMENTS: '/patient/appointments',
  BOOK_APPOINTMENT: '/patient/book-appointment',
  TREATMENT_PATHWAY: '/patient/treatment-pathway',

  // Care AI
  CARE_AI: '/patient/care-ai',

  // Ayurveda / AYUSH Centre
  AYUSH: '/patient/ayush',
  AYUSH_DOCTORS: '/patient/ayush/doctors',
  AYUSH_DOCTOR_DETAIL: '/patient/ayush/doctor/:id',

  // Doctor / Clinician Workstation
  DOCTOR_PORTAL: '/doctor',
  DOCTOR_PATIENT_SEARCH: '/doctor',
  DOCTOR_PATIENT_SUMMARY: '/doctor/patient-summary',
};
