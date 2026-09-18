import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sk-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sk-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sk-user');
    }
  }, [user]);

  // Mock login functions
  const loginPatient = (abhaId = '91-4421-8890-1204', name = 'Smt. Ananya Sen') => {
    const patientUser = {
      role: 'patient',
      id: 'P-10029',
      abha: abhaId,
      name,
      district: 'North 24 Parganas, WB',
      age: 52,
      gender: 'Female',
      bloodGroup: 'B+',
    };
    setUser(patientUser);
    return patientUser;
  };

  const loginDoctor = (name = 'Dr. V. Menon', facility = 'Dr. Ram Manohar Lohia Hospital, New Delhi', department = 'General Medicine OPD') => {
    const doctorUser = {
      role: 'doctor',
      id: 'DOC-101',
      name,
      facility,
      department,
      hprId: 'IN-DL-001948',
      designation: 'Clinician / OPD Consultant',
    };
    setUser(doctorUser);
    return doctorUser;
  };

  const loginAdmin = (username = 'Dr. V. Menon', facility = 'Dr. RML Hospital, New Delhi') => {
    const adminUser = {
      role: 'admin',
      id: 'ADM-901',
      name: username,
      facility,
      hfrId: 'IN-DL-001948',
      designation: 'Medical Superintendent',
    };
    setUser(adminUser);
    return adminUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loginPatient, loginDoctor, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
