import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';

// Common
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Onboarding Flow Pages
import { WelcomePage } from './pages/public/WelcomePage';
import { LanguageSelectionPage } from './pages/public/LanguageSelectionPage';
import { RoleSelectionPage } from './pages/public/RoleSelectionPage';
import { PatientAuthPage } from './pages/public/PatientAuthPage';
import { PatientRegisterPage } from './pages/public/PatientRegisterPage';
import { DoctorPatientLookupPage } from './pages/doctor/DoctorPatientLookupPage';
import { DoctorPatientSummaryPage } from './pages/doctor/DoctorPatientSummaryPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Patient Milestone Pages
import { HealthIntakePage } from './pages/patient/HealthIntakePage';
import { ProfileReviewPage } from './pages/patient/ProfileReviewPage';
import { PatientHomePage } from './pages/patient/PatientHomePage';
import { PatientProfilePage } from './pages/patient/PatientProfilePage';
import { BookAppointmentPage } from './pages/patient/BookAppointmentPage';
import { AppointmentsListPage } from './pages/patient/AppointmentsListPage';
import { CareAiPage } from './pages/patient/CareAiPage';
import { AyushCentrePage } from './pages/patient/AyushCentrePage';
import { AyushDoctorsPage } from './pages/patient/AyushDoctorsPage';
import { AyushDoctorDetailPage } from './pages/patient/AyushDoctorDetailPage';

export const App = () => {
  return (
    <Routes>
      {/* 1. PUBLIC ONBOARDING WORKFLOW */}
      <Route element={<PublicLayout />}>
        {/* Step 1: Welcome Page */}
        <Route path={ROUTES.WELCOME} element={<WelcomePage />} />

        {/* Step 2: Language Selection */}
        <Route path={ROUTES.LANGUAGE} element={<LanguageSelectionPage />} />

        {/* Step 3: Role Selection */}
        <Route path={ROUTES.ROLE_SELECTION} element={<RoleSelectionPage />} />

        {/* Step 4: Patient Authentication */}
        <Route path={ROUTES.PATIENT_AUTH} element={<PatientAuthPage />} />

        {/* Step 5: New Patient Registration */}
        <Route path={ROUTES.PATIENT_REGISTER} element={<PatientRegisterPage />} />

        {/* Step 6: Health History Questionnaire */}
        <Route
          path={ROUTES.HEALTH_INTAKE}
          element={
            <ProtectedRoute requiredRole="patient">
              <HealthIntakePage />
            </ProtectedRoute>
          }
        />

        {/* Step 7: Profile Creation Review */}
        <Route
          path={ROUTES.PROFILE_REVIEW}
          element={
            <ProtectedRoute requiredRole="patient">
              <ProfileReviewPage />
            </ProtectedRoute>
          }
        />

        {/* Step 8: Patient Home Dashboard */}
        <Route
          path={ROUTES.PATIENT_HOME}
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientHomePage />
            </ProtectedRoute>
          }
        />

        {/* Step 9: Appointment Entry Flow & Pathway Selection */}
        <Route
          path={ROUTES.BOOK_APPOINTMENT}
          element={
            <ProtectedRoute requiredRole="patient">
              <BookAppointmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.TREATMENT_PATHWAY}
          element={
            <ProtectedRoute requiredRole="patient">
              <BookAppointmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PATIENT_APPOINTMENTS}
          element={
            <ProtectedRoute requiredRole="patient">
              <AppointmentsListPage />
            </ProtectedRoute>
          }
        />

        {/* Care AI Feature */}
        <Route
          path={ROUTES.CARE_AI}
          element={
            <ProtectedRoute requiredRole="patient">
              <CareAiPage />
            </ProtectedRoute>
          }
        />

        {/* Ayurveda / AYUSH Centre & Doctor Consultation */}
        <Route
          path={ROUTES.AYUSH}
          element={
            <ProtectedRoute requiredRole="patient">
              <AyushCentrePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.AYUSH_DOCTORS}
          element={
            <ProtectedRoute requiredRole="patient">
              <AyushDoctorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.AYUSH_DOCTOR_DETAIL}
          element={
            <ProtectedRoute requiredRole="patient">
              <AyushDoctorDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Patient Profile View */}
        <Route
          path={ROUTES.PATIENT_PROFILE}
          element={
            <ProtectedRoute requiredRole="patient">
              <PatientProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Doctor / Clinician Workstation Workflow (Protected) */}
        <Route
          path={ROUTES.DOCTOR_PORTAL}
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorPatientLookupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.DOCTOR_PATIENT_SUMMARY}
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorPatientSummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.DOCTOR_PATIENT_SUMMARY}/:id`}
          element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorPatientSummaryPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
