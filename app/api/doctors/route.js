import { connectToDB } from '@/app/lib/mongodb';
import Doctor from '@/app/models/User'; // users are stored in User model

export async function GET(req) {
  try {
    await connectToDB();

    // Find all users with role = 'doctor'
    const doctors = await Doctor.find({ role: 'doctor' }).select('name email specialty');

    return new Response(JSON.stringify(doctors), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to fetch doctors' }), { status: 500 });
  }
}
