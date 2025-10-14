'use client';

export default function PrescriptionCard({ prescription }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Doctor: {prescription.doctorId?.name || 'N/A'}</h2>
      <p><strong>Patient:</strong> {prescription.patientId?.name || 'N/A'}</p>
      <p><strong>Medicine:</strong> {prescription.medicine}</p>
      <p><strong>Dosage:</strong> {prescription.dosage}</p>
      <p><strong>Notes:</strong> {prescription.notes}</p>
    </div>
  );
}
