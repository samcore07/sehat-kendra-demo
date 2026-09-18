import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

export const ProtectedRoute = ({ children, requiredRole = 'patient' }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
<<<<<<< HEAD
    const redirectPath = requiredRole === 'doctor' ? ROUTES.ROLE_SELECTION : ROUTES.PATIENT_AUTH;
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    const fallbackPath = user.role === 'doctor' ? ROUTES.DOCTOR_PORTAL : ROUTES.PATIENT_HOME;
    return <Navigate to={fallbackPath} replace />;
=======
    return <Navigate to={ROUTES.PATIENT_AUTH} state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={ROUTES.PATIENT_HOME} replace />;
>>>>>>> a70ddca (update frontend implementation)
  }

  return children;
};
