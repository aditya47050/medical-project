'use client';
import Link from 'next/link';

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{doctor.name}</h2>
      <p className="text-gray-600">{doctor.specialty || 'General'}</p>
      <Link
        href={`/book/${doctor._id}`}
        className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Book Appointment
      </Link>
    </div>
  );
}
