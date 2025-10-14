import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' }, // ✅ new
});

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
