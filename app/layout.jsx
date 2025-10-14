import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Medical App',
  description: 'Patient Doctor Appointment Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto mt-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
