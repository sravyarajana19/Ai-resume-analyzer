import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import StudentDashboard from './components/StudentDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import AdminDashboard from './components/AdminDashboard';
import { api } from './api/client';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeRole, setActiveRole] = useState('student');
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [authModalRole, setAuthModalRole] = useState('student');

  // Role Access Restriction Prompt Modal State: { targetRole: 'student' | 'recruiter' | 'admin' }
  const [rolePromptModal, setRolePromptModal] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const user = await api.getMe();
      setCurrentUser(user);
      if (user && user.role) {
        setActiveRole(user.role);
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  const handleOpenAuth = (mode, role = 'student') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (user && user.role) {
      setActiveRole(user.role);
    }
    setRolePromptModal(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setActiveRole('student');
  };

  const handleSelectRoleTab = (targetRole) => {
    if (!currentUser) {
      // User not logged in -> Prompt sign in / register for this role
      setRolePromptModal({ targetRole });
      return;
    }

    if (currentUser.role === targetRole) {
      setActiveRole(targetRole);
    } else {
      // User is logged in with a different role -> Strictly prompt to switch/login as that role
      setRolePromptModal({ targetRole });
    }
  };

  const handleSwitchAccountAndAuth = (mode, targetRole) => {
    // Clear existing session and open auth for the target role
    localStorage.removeItem('token');
    setCurrentUser(null);
    setRolePromptModal(null);
    handleOpenAuth(mode, targetRole);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0d14', color: '#f3f4f6' }}>
      {/* Header Navigation */}
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentUser={currentUser}
        onOpenAuth={(mode) => handleOpenAuth(mode, 'student')}
        onLogout={handleLogout}
        onSelectRoleTab={handleSelectRoleTab}
      />

      {/* Main Content Body */}
      <main style={{ flex: 1 }}>
        {!currentUser ? (
          /* Locked Landing Gate for Unauthenticated Users */
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
            {/* Hero Card */}
            <div className="glass-card" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
                🚀 Codegnan Data Mavericks Hackathon Platform
              </div>
              
              <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2' }}>
                AI-Based Resume Analyzer & <span style={{ color: '#06b6d4' }}>Job-Fit Scorer</span>
              </h1>
              
              <p style={{ color: '#9ca3af', maxWidth: '750px', margin: '0 auto 28px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Instant explainable fit scores, missing skill gap detection, recruiter candidate ranking leaderboards, and an interactive <strong>ATS 96%+ Resume Optimization Engine</strong>.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => handleOpenAuth('login', 'student')} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  🔑 Sign In to Your Account
                </button>
                <button onClick={() => handleOpenAuth('register', 'student')} className="btn-emerald" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  ✨ Create New Account
                </button>
              </div>
            </div>

            {/* End User Portals Showcase Grid */}
            <h2 style={{ fontSize: '1.4rem', textAlign: 'center', marginBottom: '24px', color: '#ffffff' }}>
              Select Your Role & Access Dedicated Workspace
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Student Role Card */}
              <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎓</div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#ffffff' }}>Student / Job Seeker</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '16px' }}>
                    Paste your target job title & job description, upload your PDF/DOCX resume, analyze matched & missing skills, and auto-generate an ATS 96%+ optimized formal resume draft.
                  </p>
                </div>
                <button onClick={() => handleSelectRoleTab('student')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Access Student Portal
                </button>
              </div>

              {/* Recruiter Role Card */}
              <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💼</div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#ffffff' }}>Recruiter Portal</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '16px' }}>
                    Post benchmark job postings, bulk upload applicant resumes, view candidate rankings sorted by fit score on a leaderboard, and analyze batch skill shortages.
                  </p>
                </div>
                <button onClick={() => handleSelectRoleTab('recruiter')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Access Recruiter Portal
                </button>
              </div>

              {/* Admin Role Card */}
              <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛡️</div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#ffffff' }}>Admin Analytics</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '16px' }}>
                    System wide performance analytics, total parsed resumes metrics, average platform match scores, user role distribution, and platform log monitoring.
                  </p>
                </div>
                <button onClick={() => handleSelectRoleTab('admin')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Access Admin Workspace
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Render Active Role Workspace for Logged-In Users */
          <>
            {activeRole === 'student' && (
              <StudentDashboard currentUser={currentUser} onOpenAuth={(mode) => handleOpenAuth(mode, 'student')} />
            )}
            {activeRole === 'recruiter' && (
              <RecruiterDashboard currentUser={currentUser} onOpenAuth={(mode) => handleOpenAuth(mode, 'recruiter')} />
            )}
            {activeRole === 'admin' && (
              <AdminDashboard currentUser={currentUser} onOpenAuth={(mode) => handleOpenAuth(mode, 'admin')} />
            )}
          </>
        )}
      </main>

      {/* Role Restriction Access Prompt Modal */}
      {rolePromptModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '32px', textAlign: 'center', position: 'relative', border: '1px solid rgba(244, 63, 94, 0.4)', background: '#0f172a' }}>
            <button onClick={() => setRolePromptModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '1.4rem', cursor: 'pointer' }}>
              ✕
            </button>
            
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔒</div>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '12px' }}>
              {rolePromptModal.targetRole.toUpperCase()} Portal Access Required
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: '24px', lineHeight: '1.5' }}>
              {currentUser ? (
                <>You are currently signed in as <strong>{currentUser.full_name}</strong> (<span style={{ textTransform: 'capitalize', color: '#38bdf8' }}>{currentUser.role}</span> account). To access the <strong style={{ color: '#06b6d4', textTransform: 'capitalize' }}>{rolePromptModal.targetRole} Portal</strong>, please Sign In or Create an Account with a <span style={{ color: '#34d399', textTransform: 'capitalize', fontWeight: 600 }}>{rolePromptModal.targetRole}</span> profile.</>
              ) : (
                <>Please Sign In or Create an Account as a <strong style={{ color: '#06b6d4', textTransform: 'capitalize' }}>{rolePromptModal.targetRole}</strong> to access this workspace.</>
              )}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={() => handleSwitchAccountAndAuth('login', rolePromptModal.targetRole)} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                🔑 Sign In to {rolePromptModal.targetRole.toUpperCase()} Account
              </button>
              <button onClick={() => handleSwitchAccountAndAuth('register', rolePromptModal.targetRole)} className="btn-emerald" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                ✨ Create New {rolePromptModal.targetRole.toUpperCase()} Account
              </button>
              <button onClick={() => setRolePromptModal(null)} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: '4px' }}>
                Cancel / Stay on Current Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px', textAlign: 'center', fontSize: '0.82rem', color: '#9ca3af', marginTop: 'auto' }}>
        Codegnan Hackathon — Data Mavericks Team | AI-Based Resume Analyzer & Job-Fit Scorer Platform
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        mode={authModalMode}
        initialRole={authModalRole}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
