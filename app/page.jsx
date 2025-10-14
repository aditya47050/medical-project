'use client';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { Calendar, User, FileText, Stethoscope } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  
  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h2>
        <p className="text-gray-600 mb-6">Please login to access your dashboard</p>
        <Link 
          href="/login" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );

  if (user.role === 'doctor') {
    window.location.href = '/doctors/dashboard';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-blue-600">{user.name}</span>!
          </h1>
          <p className="text-gray-600 text-lg">Here's your health dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Prescriptions</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Visits This Month</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Browse Doctors Card */}
          <Link href="/doctors" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <Stethoscope className="w-8 h-8 mb-2" />
                  <h2 className="text-2xl font-bold">Browse Doctors</h2>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -right-5 -top-5 w-28 h-28 bg-white/10 rounded-full"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                  Find specialized doctors and book appointments with top healthcare professionals.
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  Find your doctor
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Prescriptions Card */}
          <Link href="/prescriptions" className="group">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
              <div className="h-48 bg-gradient-to-r from-green-500 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <FileText className="w-8 h-8 mb-2" />
                  <h2 className="text-2xl font-bold">Prescriptions</h2>
                </div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -left-5 -top-5 w-28 h-28 bg-white/10 rounded-full"></div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                  View all your current and past prescriptions, medication details, and refill status.
                </p>
                <div className="mt-4 flex items-center text-green-600 font-medium group-hover:text-green-700">
                  View prescriptions
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/appointments" className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition-shadow">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Appointments</span>
          </Link>
          <Link href="/medical-records" className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition-shadow">
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Medical Records</span>
          </Link>
          <Link href="/lab-results" className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Lab Results</span>
          </Link>
          <Link href="/billing" className="bg-white rounded-xl shadow p-4 text-center hover:shadow-md transition-shadow">
            <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Billing</span>
          </Link>
        </div>
      </div>
    </div>
  );
}