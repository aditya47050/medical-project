'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

export default function PrescriptionsPage() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setError('Please login to view prescriptions.');
      setLoading(false);
      return;
    }

    async function fetchPrescriptions() {
      try {
        const res = await axios.get(`/api/prescriptions?patientId=${user._id}`);
        setPrescriptions(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prescriptions:', JSON.stringify(err, null, 2));
        setError('Failed to load prescriptions.');
        setLoading(false);
      }
    }
    fetchPrescriptions();
  }, [user]);

  if (!user) {
    return <div className="text-center mt-10">Please login to access your prescriptions.</div>;
  }

  if (loading) {
    return <div className="text-center mt-10">Loading prescriptions...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Prescriptions</h1>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {prescriptions.map((prescription) => (
            <div key={prescription._id} className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-bold mb-2">{prescription.medication}</h2>
              <p><strong>Notes:</strong> {prescription.notes || 'None'}</p>
              <p><strong>Prescribed by:</strong> {prescription.doctorId?.name || 'Unknown'}</p>
              <p><strong>Appointment Date:</strong> {prescription.appointmentId?.time ? new Date(prescription.appointmentId.time).toLocaleString() : 'Unknown'}</p>
              <p><strong>Prescribed on:</strong> {new Date(prescription.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
}