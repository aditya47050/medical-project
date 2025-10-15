import { connectToDB } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectToDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Return user object with _id
    return new Response(JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }), { status: 200 });

  } catch (err) {
    console.error('Login failed:', err);
    return new Response(JSON.stringify({ message: 'Login failed', error: err.message }), { status: 500 });
  }
}
