import React from 'react';

export default function Navbar({ activeRole, setActiveRole, currentUser, onOpenAuth, onLogout }) {
  return (
    <header className="glass-header">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', lineHeight: '1.2' }}>
              Data Mavericks <span style={{ color: '#06b6d4', fontSize: '0.9rem', fontWeight: 600, marginLeft: '6px' }}>AI Scorer</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Codegnan Hackathon Edition</p>
          </div>
        </div>

        {/* Role Navigation Badge (Strictly locked to assigned account role) */}
        {currentUser && (
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '6px 16px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)', alignItems: 'center', gap: '8px' }}>
            {currentUser.role === 'student' && (
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🎓</span> Student & Job Seeker Workspace
              </div>
            )}
            {currentUser.role === 'recruiter' && (
              <div style={{ color: '#06b6d4', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>💼</span> Recruiter Candidate Ranking Workspace
              </div>
            )}
            {currentUser.role === 'admin' && (
              <div style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🛡️</span> System Admin Analytics Workspace
              </div>
            )}
          </div>
        )}

        {/* User Account / Auth Actions */}
        <div>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{currentUser.full_name}</div>
                <div style={{ fontSize: '0.75rem', color: '#06b6d4', textTransform: 'capitalize' }}>
                  {currentUser.role} Account
                </div>
              </div>
              <button onClick={onLogout} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => onOpenAuth('login')} className="btn-secondary">
                Sign In
              </button>
              <button onClick={() => onOpenAuth('register')} className="btn-primary">
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
