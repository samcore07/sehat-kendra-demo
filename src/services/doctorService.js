import { DOCTORS } from '../data/doctors';

export const doctorService = {
  getAllDoctors() {
    return DOCTORS;
  },

  getDoctorsByPathway(pathway) {
    if (!pathway || pathway === 'all') return DOCTORS;
    return DOCTORS.filter((doc) => doc.pathway === pathway);
  },

  getDoctorById(id) {
    return DOCTORS.find((doc) => doc.id === id) || null;
  },

  getSpecialties(pathway) {
    const list = pathway ? this.getDoctorsByPathway(pathway) : DOCTORS;
    const set = new Set(list.map((d) => d.specialty));
    return Array.from(set);
  }
};
