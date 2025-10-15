import { connectToDB } from '@/app/lib/mongodb';
import Appointment from '@/app/models/Appointments';

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const id = url.searchParams.get('id'); // single appointment
    const userId = url.searchParams.get('userId');
    const role = url.searchParams.get('role');

    if (id) {
      // ✅ Fetch single appointment by ID
      const appointment = await Appointment.findById(id).populate('patientId', 'name email').populate('doctorId', 'name email');
      if (!appointment) return new Response(JSON.stringify({ message: 'Appointment not found' }), { status: 404 });
      return new Response(JSON.stringify(appointment), { status: 200 });
    }

    if (!userId || !role) {
      return new Response(JSON.stringify({ message: 'Missing userId or role' }), { status: 400 });
    }

    let appointments = [];

    if (role === 'doctor') {
      appointments = await Appointment.find({ doctorId: userId }).populate('patientId', 'name email');
    } else if (role === 'patient') {
      appointments = await Appointment.find({ patientId: userId }).populate('doctorId', 'name email');
    }

    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (err) {
    console.error('🔥 GET /api/appointments error:', err);
    return new Response(JSON.stringify({ message: 'Failed to fetch appointments', error: err.message }), { status: 500 });
  }
}
