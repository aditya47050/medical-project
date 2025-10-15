'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import axios from 'axios';

export default function SendPrescription({ params }) {
  const router = useRouter();
  const { user } = useAuth();
  const { appointmentId } = use(params);

  const [appointment, setAppointment] = useState(null);
  const [medication, setMedication] = useState('');
  const [notes, setNotes] = useState('');

  // Fetch appointment details
  useEffect(() => {
    console.log('Auth User:', user); // Debug user object
    if (!appointmentId) {
      console.error('No appointmentId provided');
      return;
    }
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    async function fetchAppointment() {
      try {
        const res = await axios.get(`/api/appointments?appointmentId=${appointmentId}`);
        console.log('Fetched appointment:', res.data);
        setAppointment(res.data);
      } catch (err) {
        console.error('Error fetching appointment:', JSON.stringify(err, null, 2));
      }
    }
    fetchAppointment();
  }, [appointmentId, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!medication) {
      alert('Medication is required');
      return;
    }
    if (!appointment?.patientId?._id) {
      alert('Invalid appointment data');
      return;
    }
    const payload = {
      appointmentId,
      doctorId: user._id,
      patientId: appointment.patientId._id,
      medication,
      notes,
    };
    console.log('Sending prescription payload:', payload);
    try {
      await axios.post('/api/prescriptions', payload);
      alert('Prescription sent successfully!');
      router.push('/doctors/dashboard');
    } catch (err) {
      console.error('Error sending prescription:', JSON.stringify(err, null, 2));
      alert('Failed to send prescription');
    }
  };

  if (!appointment) return <p>Loading appointment details...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Send Prescription</h1>
      <p className="mb-2"><strong>Patient:</strong> {appointment.patientId?.name || 'Unknown'}</p>
      <p className="mb-4"><strong>Appointment Time:</strong> {new Date(appointment.time).toLocaleString()}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Medication</label>
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Prescription
        </button>
      </form>
    </div>
  );
}