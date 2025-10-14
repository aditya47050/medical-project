import { connectToDB } from '../../lib/mongodb';
import Prescription from '../../models/Prescription';
import Appointment from '../../models/Appointments';
import User from '../../models/User';

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const patientId = url.searchParams.get('patientId');

    if (!patientId) {
      return new Response(
        JSON.stringify({ message: 'Missing patientId' }),
        { status: 400 }
      );
    }

    const prescriptions = await Prescription.find({ patientId })
      .populate('doctorId', 'name email')
      .populate('appointmentId', 'time');

    return new Response(JSON.stringify(prescriptions), { status: 200 });
  } catch (err) {
    console.error('🔥 GET /api/prescriptions error:', err.message, err.stack);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch prescriptions', error: err.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    console.log('📥 Incoming prescription data:', body);

    const { appointmentId, doctorId, patientId, medication, notes } = body;

    if (!appointmentId || !doctorId || !patientId || !medication) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return new Response(
        JSON.stringify({ message: 'Appointment not found' }),
        { status: 404 }
      );
    }

    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);
    if (!doctor) {
      return new Response(
        JSON.stringify({ message: 'Doctor not found' }),
        { status: 404 }
      );
    }
    if (!patient) {
      return new Response(
        JSON.stringify({ message: 'Patient not found' }),
        { status: 404 }
      );
    }

    const newPrescription = await Prescription.create({
      appointmentId,
      doctorId,
      patientId,
      medication,
      notes,
      createdAt: new Date(),
    });

    console.log('✅ Prescription created:', newPrescription);

    return new Response(JSON.stringify(newPrescription), { status: 201 });
  } catch (err) {
    console.error('🔥 POST /api/prescriptions error:', err.message, err.stack);
    return new Response(
      JSON.stringify({ message: 'Failed to create prescription', error: err.message }),
      { status: 500 }
    );
  }
}