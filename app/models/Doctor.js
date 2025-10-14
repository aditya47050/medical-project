import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
});

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
