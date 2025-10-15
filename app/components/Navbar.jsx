'use client';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="font-bold text-2xl hover:text-gray-200 transition">
        Medical App
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
