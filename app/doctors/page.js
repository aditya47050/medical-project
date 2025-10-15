'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '@/app/components/DoctorCard';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await axios.get('/api/doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Doctors</h1>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
