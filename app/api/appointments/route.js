import { connectToDB } from '@/app/lib/mongodb';
import Appointment from '@/app/models/Appointments';

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const role = url.searchParams.get('role');
    const appointmentId = url.searchParams.get('appointmentId'); // New: Support fetching by appointmentId

    // New: Handle single appointment fetch by ID
    if (appointmentId) {
      const appointment = await Appointment.findById(appointmentId)
        .populate('patientId', 'name email') // Populate patient details (matches your client expectation)
        .populate('doctorId', 'name email'); // Optionally populate doctor details if needed
      if (!appointment) {
        return new Response(
          JSON.stringify({ message: 'Appointment not found' }),
          { status: 404 }
        );
      }
      return new Response(JSON.stringify(appointment), { status: 200 });
    }

    // Existing logic for fetching all appointments by user/role
    if (!userId || !role) {
      return new Response(
        JSON.stringify({ message: 'Missing userId or role' }),
        { status: 400 }
      );
    }

    let appointments = [];

    if (role === 'doctor') {
      appointments = await Appointment.find({ doctorId: userId })
        .populate('patientId', 'name email');
    } else if (role === 'patient') {
      appointments = await Appointment.find({ patientId: userId })
        .populate('doctorId', 'name email');
    }

    return new Response(JSON.stringify(appointments), { status: 200 });
  } catch (err) {
    console.error('🔥 GET /api/appointments error:', err);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch appointments', error: err.message }),
      { status: 500 }
    );
  }
}

// Keep the existing POST, PATCH, and DELETE handlers unchanged
export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    console.log("📥 Incoming appointment data:", body);

    const { patientId, doctorId, time } = body;

    if (!patientId || !doctorId || !time) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // ✅ Validate time
    const appointmentDate = new Date(time);
    if (isNaN(appointmentDate.getTime())) {
      console.error("❌ Invalid date format:", { time });
      return new Response(
        JSON.stringify({ message: 'Invalid date format', time }),
        { status: 400 }
      );
    }

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      time: appointmentDate,
    });

    console.log("✅ Appointment created:", newAppointment);

    return new Response(JSON.stringify(newAppointment), { status: 201 });
  } catch (err) {
    console.error('🔥 POST /api/appointments error:', err);
    return new Response(
      JSON.stringify({
        message: 'Failed to book appointment',
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectToDB();
    const { appointmentId, action } = await req.json();

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return new Response(JSON.stringify({ message: 'Appointment not found' }), { status: 404 });

    if (action === 'confirm') appointment.status = 'confirmed';
    await appointment.save();

    return new Response(JSON.stringify({ message: 'Updated successfully', appointment }), { status: 200 });
  } catch (err) {
    console.error('🔥 PATCH /api/appointments error:', err);
    return new Response(JSON.stringify({ message: 'Failed to update', error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const url = new URL(req.url);
    const appointmentId = url.searchParams.get('id');

    await Appointment.findByIdAndDelete(appointmentId);
    return new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 });
  } catch (err) {
    console.error('🔥 DELETE /api/appointments error:', err);
    return new Response(JSON.stringify({ message: 'Failed to delete', error: err.message }), { status: 500 });
  }
}