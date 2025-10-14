'use client';
import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function BookAppointment({ params }) {
  const router = useRouter();
  const { user } = useAuth();

  // ✅ unwrap params properly (Next.js 15+)
  const unwrappedParams = use(params);
  const doctorId = unwrappedParams?.id;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !doctorId || !date || !time) {
      alert('All fields are required');
      return;
    }

    try {
      setLoading(true);

      // ✅ Combine date + time into a valid ISO string
      const combinedDateTime = new Date(`${date}T${time}`).toISOString();

      await axios.post('/api/appointments', {
        patientId: user._id,
        doctorId,
        time: combinedDateTime, // ✅ backend expects only one "time" field (Date)
      });

      alert('✅ Appointment booked successfully!');
      router.push('/');
    } catch (err) {
      console.error('Booking Error:', err.response?.data || err.message);
      alert('❌ Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-2 text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md transition-all duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
}
