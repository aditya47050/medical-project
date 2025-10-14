import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medication: { type: String, required: true }, // Ensure this is "medication", not "medicine"
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);