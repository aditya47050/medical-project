import { connectToDB } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectToDB();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    console.error('Registration failed:', err);
    return new Response(JSON.stringify({ message: 'Registration failed', error: err.message }), { status: 500 });
  }
}
