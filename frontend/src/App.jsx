import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import StudentDashboard from './components/StudentDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import AdminDashboard from './components/AdminDashboard';
import { api } from './api/client';

export default function App() {
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'recruiter', 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const user = await api.getMe();
      setCurrentUser(user);
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  const handleOpenAuth = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Body */}
      <main style={{ flex: 1 }}>
        {activeRole === 'student' && (
          <StudentDashboard currentUser={currentUser} />
        )}
        {activeRole === 'recruiter' && (
          <RecruiterDashboard currentUser={currentUser} />
        )}
        {activeRole === 'admin' && (
          <AdminDashboard currentUser={currentUser} />
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px', textAlign: 'center', fontSize: '0.82rem', color: '#9ca3af', marginTop: 'auto' }}>
        Codegnan Hackathon — Data Mavericks Team | AI-Based Resume Analyzer & Job-Fit Scorer Platform
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </div>
  );
}
