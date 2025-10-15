'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments for this doctor
  useEffect(() => {
    if (!user) return;

    async function fetchAppointments() {
      try {
        const res = await axios.get(`/api/appointments?userId=${user._id}&role=doctor`);
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err.response?.data || err.message);
      }
    }

    fetchAppointments();
  }, [user]);

  if (!user) return null;

  const formatDateTime = (datetime) => {
    if (!datetime) return 'N/A';
    const d = new Date(datetime);
    const date = d.toLocaleDateString();
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} at ${time}`;
  };

  // Confirm appointment
  const handleConfirm = async (id) => {
    try {
      await axios.patch('/api/appointments', { appointmentId: id, action: 'confirm' });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 'confirmed' } : a))
      );
    } catch (err) {
      console.error('Confirm Error:', err.response?.data || err.message);
      alert('Failed to confirm appointment');
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await axios.delete(`/api/appointments?id=${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error('Delete Error:', err.response?.data || err.message);
      alert('Failed to delete appointment');
    }
  };

  // Navigate to send prescription page
  const handleSendPrescription = (appointmentId) => {
    router.push(`/prescription/${appointmentId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((a) => (
            <li
              key={a._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p><strong>Patient:</strong> {a.patientId?.name || 'N/A'}</p>
                <p><strong>Time:</strong> {formatDateTime(a.time)}</p>
                <p><strong>Status:</strong> {a.status || 'pending'}</p>
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                {a.status !== 'confirmed' && (
                  <button
                    onClick={() => handleConfirm(a._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Confirm
                  </button>
                )}
                {a.status === 'confirmed' && (
                  <button
                    onClick={() => handleSendPrescription(a._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Send Prescription
                  </button>
                )}
                <button
                  onClick={() => handleDelete(a._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
