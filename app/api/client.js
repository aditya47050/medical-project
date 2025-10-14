import axios from 'axios';
const API = axios.create({ baseURL: '/api' });

export const getAppointments = (userId, role) =>
  API.get(`/appointments?userId=${userId}&role=${role}`);

export const bookAppointment = (data) => API.post('/appointments', data);

export const getPrescriptions = (patientId) =>
  API.get(`/prescriptions?patientId=${patientId}`);

export const addPrescription = (data) => API.post('/prescriptions', data);
