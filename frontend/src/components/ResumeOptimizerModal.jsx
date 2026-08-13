import React, { useState } from 'react';

export default function ResumeOptimizerModal({ isOpen, data, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.optimized_resume_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([data.optimized_resume_text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Optimized_ATS_96_Plus_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0, 0, 0, 0.82)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
        {/* Close Button */}
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '1.5rem', cursor: 'pointer' }}>
          ✕
        </button>

        {/* Header Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px' }}>
          🏆 ATS Score Boosted to {data.boosted_ats_score}%
        </div>

        <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>AI-Optimized Resume Draft</h2>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '24px' }}>
          The AI engine has incorporated your missing skills and optimized structural formatting to guarantee an ATS Fit Score above 96%!
        </p>

        {/* Missing Skills Injected Badges */}
        <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#34d399', marginBottom: '8px' }}>
            ✨ Injected Missing Skills into Bullet Points & Skills Section:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.missing_skills_added && data.missing_skills_added.map((s, i) => (
              <span key={i} className="badge badge-emerald">+ {s}</span>
            ))}
          </div>
        </div>

        {/* Optimized Text Area */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>
            Optimized ATS 96%+ Resume Content:
          </label>
          <textarea
            readOnly
            className="textarea-field"
            style={{ minHeight: '320px', fontFamily: 'monospace', fontSize: '0.88rem', background: '#0b0f19', color: '#34d399', lineHeight: '1.5' }}
            value={data.optimized_resume_text}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button onClick={handleCopy} className="btn-secondary">
            {copied ? '✅ Copied to Clipboard!' : '📋 Copy Optimized Text'}
          </button>
          <button onClick={handleDownload} className="btn-emerald">
            📥 Download Optimized (.txt)
          </button>
        </div>
      </div>
    </div>
  );
}
