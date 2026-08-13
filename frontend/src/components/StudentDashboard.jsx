import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import ResumeOptimizerModal from './ResumeOptimizerModal';

export default function StudentDashboard({ currentUser, onOpenAuth }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJdId, setSelectedJdId] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [customJobText, setCustomJobText] = useState('');

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const [showOptimizerModal, setShowOptimizerModal] = useState(false);
  const [optimizedData, setOptimizedData] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await api.getJobs();
      setJobs(data);
      if (data.length > 0) {
        setSelectedJdId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth('login');
      setErrorMsg('Please Sign In or Create an Account first to analyze your resume.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      if (selectedJdId) {
        formData.append("job_description_id", selectedJdId);
      }
      if (customJobTitle) {
        formData.append("custom_job_title", customJobTitle);
      }
      if (customJobText) {
        formData.append("custom_job_text", customJobText);
      }

      if (resumeFile) {
        formData.append("file", resumeFile);
      } else if (resumeText) {
        formData.append("resume_text", resumeText);
      } else {
        throw new Error("Please upload a resume file (PDF/DOCX) or paste resume text.");
      }

      const res = await api.analyzeResume(formData);
      setAnalysisResult(res);
    } catch (err) {
      setErrorMsg(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleBoostResumeScore = async () => {
    if (!analysisResult) return;
    try {
      setLoading(true);
      const res = await api.optimizeResume(analysisResult.analysis_id);
      setOptimizedData(res);
      setShowOptimizerModal(true);
    } catch (err) {
      alert(err.message || "Optimization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Hero Header */}
      <div className="glass-card" style={{ padding: '32px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
              ⚡ AI-Powered Resume Scoring & Optimization
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Student & Job Seeker Portal</h2>
            <p style={{ color: '#9ca3af', maxWidth: '650px', fontSize: '0.95rem' }}>
              Upload your resume and select a Job Description. Our NLP algorithm extracts skills, checks formatting compliance, calculates an explainable fit score, and auto-generates a 96%+ ATS boosted resume!
            </p>
          </div>
          {analysisResult && (
            <button onClick={handleBoostResumeScore} className="btn-emerald">
              ✨ Auto-Boost ATS Score to 96%+
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Input Form Column */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📄</span> Resume & Job Target Setup
          </h3>

          {errorMsg && (
            <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', padding: '12px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '16px' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Direct Target Job Title & Description Inputs */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>
                Target Job Title <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Enter Job Title (e.g. Python Developer, Data Analyst, Software Engineer)"
                value={customJobTitle}
                onChange={(e) => setCustomJobTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>
                Target Job Description Requirements <span style={{ color: '#f43f5e' }}>*</span>
              </label>
              <textarea
                required
                className="textarea-field"
                placeholder="Paste the full Job Description text, required technical skills, and responsibilities here..."
                value={customJobText}
                onChange={(e) => setCustomJobText(e.target.value)}
                style={{ minHeight: '140px' }}
              />
            </div>

            {/* Upload File / Paste Resume */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>
                Upload Resume File (PDF / DOCX)
              </label>
              <div style={{ border: '2px dashed rgba(99, 102, 241, 0.4)', borderRadius: '12px', padding: '20px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)', cursor: 'pointer' }}>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setResumeFile(e.target.files[0]);
                    }
                  }}
                  style={{ display: 'none' }}
                  id="resume-file-upload"
                />
                <label htmlFor="resume-file-upload" style={{ cursor: 'pointer' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📁</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#6366f1' }}>
                    {resumeFile ? resumeFile.name : 'Click to Browse PDF or DOCX file'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '4px' }}>Supports PDF, DOCX, and TXT files</div>
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#d1d5db', marginBottom: '8px' }}>
                Or Paste Resume Plain Text
              </label>
              <textarea
                className="textarea-field"
                placeholder="Paste raw resume text here if file upload is unavailable..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px', justifyContent: 'center', fontSize: '1rem' }}>
              {loading ? 'Analyzing Fit Score & NLP Keywords...' : '🔍 Analyze Resume Fit Score'}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {analysisResult ? (
            <>
              {/* Score Meter Card */}
              <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#9ca3af', marginBottom: '16px' }}>
                  OVERALL MATCH FIT SCORE
                </div>
                
                <div className="score-circle" style={{ '--score-pct': analysisResult.overall_fit_score }}>
                  <div className="score-circle-inner">
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
                      {analysisResult.overall_fit_score}%
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>ATS Fit</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginTop: '16px', color: '#ffffff' }}>
                  Target Role: <span style={{ color: '#06b6d4' }}>{analysisResult.job_title}</span>
                </h3>

                <div style={{ marginTop: '16px' }}>
                  <button onClick={handleBoostResumeScore} className="btn-emerald" style={{ width: '100%', justifyContent: 'center' }}>
                    🚀 Optimize Resume to 96%+ ATS Score
                  </button>
                </div>
              </div>

              {/* Matched & Missing Skills Card */}
              <div className="glass-card" style={{ padding: '28px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Skill Analysis & Gap Report</h4>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>✅</span> Matched Skills ({analysisResult.matched_skills.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {analysisResult.matched_skills.length > 0 ? (
                      analysisResult.matched_skills.map((skill, i) => (
                        <span key={i} className="badge badge-emerald">{skill}</span>
                      ))
                    ) : (
                      <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No exact skill matches detected.</span>
                    )}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fb7185', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>❌</span> Missing / Skill Gaps ({analysisResult.missing_skills.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {analysisResult.missing_skills.length > 0 ? (
                      analysisResult.missing_skills.map((skill, i) => (
                        <span key={i} className="badge badge-rose">{skill}</span>
                      ))
                    ) : (
                      <span style={{ color: '#34d399', fontSize: '0.85rem' }}>Great job! No major skill gaps detected.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Suggestions & Action Plan */}
              <div className="glass-card" style={{ padding: '28px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>🎓 Skill Gap Learning Recommendations</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {analysisResult.suggestions && analysisResult.suggestions.length > 0 ? (
                    analysisResult.suggestions.map((s, idx) => (
                      <div key={idx} style={{ padding: '12px 16px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ fontWeight: 700, color: '#06b6d4', fontSize: '0.9rem', marginBottom: '4px' }}>
                          Skill Focus: {s.skill}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: '#d1d5db', marginBottom: '4px' }}>{s.recommendation}</p>
                        <span style={{ fontSize: '0.78rem', color: '#a5b4fc' }}>{s.course}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No specific course recommendations required.</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card" style={{ padding: '48px 28px', textAlign: 'center', color: '#9ca3af' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📊</div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px' }}>No Analysis Generated Yet</h3>
              <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                Select a target job role, upload your resume, and click "Analyze Resume Fit Score" to generate your detailed report.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Optimizer Modal */}
      {showOptimizerModal && (
        <ResumeOptimizerModal
          isOpen={showOptimizerModal}
          data={optimizedData}
          onClose={() => setShowOptimizerModal(false)}
        />
      )}
    </div>
  );
}
