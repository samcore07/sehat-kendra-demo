const APPOINTMENTS_KEY = 'sk-appointments';
const ACTIVE_APT_KEY = 'sk-confirmed-appointment';

export const appointmentService = {
  getAppointments() {
    try {
      const stored = localStorage.getItem(APPOINTMENTS_KEY);
      if (stored) return JSON.parse(stored);
      // Fallback to active single appointment if present
      const single = localStorage.getItem(ACTIVE_APT_KEY);
      if (single) return [JSON.parse(single)];
    } catch (e) {
      console.warn('Error reading appointments:', e);
    }
    return [];
  },

  getLatestAppointment() {
    const list = this.getAppointments();
    return list.length > 0 ? list[0] : null;
  },

  saveAppointment(appointment) {
    try {
      const current = this.getAppointments();
      const updated = [appointment, ...current.filter((a) => a.id !== appointment.id)];
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
      localStorage.setItem(ACTIVE_APT_KEY, JSON.stringify(appointment));
      window.dispatchEvent(new CustomEvent('sk:appointment-updated', { detail: appointment }));
      return appointment;
    } catch (e) {
      console.warn('Error saving appointment:', e);
      return appointment;
    }
  },

  cancelAppointment(id) {
    try {
      const current = this.getAppointments();
      const updated = current.filter((a) => a.id !== id);
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
      if (updated.length > 0) {
        localStorage.setItem(ACTIVE_APT_KEY, JSON.stringify(updated[0]));
      } else {
        localStorage.removeItem(ACTIVE_APT_KEY);
      }
      window.dispatchEvent(new CustomEvent('sk:appointment-updated', { detail: null }));
    } catch (e) {
      console.warn('Error cancelling appointment:', e);
    }
  }
};
