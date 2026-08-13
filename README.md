# AI-Based Resume Analyzer and Job-Fit Scorer

> **Codegnan Hackathon — Data Mavericks Team Submission**  
> *Domain: AI / Recruitment Tech*

A complete, production-ready, full-stack AI platform built to bridge the gap between job seekers and recruiters. The application accepts candidate resumes (PDF, DOCX, TXT), parses skill profiles using Natural Language Processing (NLP), evaluates formatting compliance, calculates explainable Job-Fit Scores (0–100), ranks candidates on recruiter leaderboards, and provides an **ATS 96%+ Resume Optimization Engine**.

---

## Key Features & Capabilities

### 1. 🎓 Student & Job Seeker Portal
- **Multi-Format Resume Parser**: Instant text extraction from `.pdf`, `.docx`, and plain text.
- **Explainable Fit Score**: Calculates an overall match score (0–100) using TF-IDF vectorization, cosine semantic similarity, and skill taxonomy coverage.
- **Skill Gap & Learning Recommendations**: Highlights matched vs missing skills, recommending specific courses to bridge identified gaps.
- **ATS Formatting Inspector**: Identifies word count deficiencies, missing contact details, and section heading issues.
- **🚀 One-Click ATS 96%+ Resume Optimizer**: Automatically injects missing skills into experience bullet points and skills sections, generating a downloadable resume draft with a verified **96%+ ATS score**.

### 2. 💼 Recruiter Triage & Ranking Portal
- **Job Description Management**: Create, edit, and store benchmark job postings.
- **Bulk Candidate Processing**: Upload multiple candidate resumes at once.
- **Candidate Leaderboard**: Ranks candidates dynamically based on ATS match scores.
- **Batch Skill Analytics**: Summarizes top missing skills across applicant pools and calculates average match score distributions.

### 3. 🛡️ Admin Dashboard
- **Platform Analytics**: Total registered users, total resumes parsed, total analyses run, average platform fit score.
- **User Account Log**: Track user registrations across `Student`, `Recruiter`, and `Admin` roles.

### 4. 🔒 Strict Email & Password Security
- **Strict Gmail Format**: Enforces `@gmail.com` ending. Prefix length must be between 6 and 30 characters, using only `a-z`, `0-9`, and `.`. **Cannot be numbers only** (must contain letters).
- **Password Complexity**: Requires 8–32 characters combining uppercase, lowercase, numbers, and special symbols, rejecting weak patterns (`123456`, `qwerty`).
- **Clean Form UX**: Inputs feature clean generic placeholders (`"Enter your email address"`, `"Enter your password"`).

---

## Technology Stack

- **Backend**: Python 3.11+, FastAPI, Uvicorn, SQLAlchemy (SQLite ORM), PyPDF / pdfplumber, python-docx, Scikit-Learn (TF-IDF & Cosine Similarity), Passlib (Bcrypt), Python-Jose (JWT).
- **Frontend**: Vite, React 18, Glassmorphic Modern CSS Design Tokens, Lucide Icons.
- **Deployment**: Single-service Render architecture where FastAPI directly serves compiled Vite React assets.

---

## 🛠️ Step-by-Step Local Setup Guide

Follow these simple steps to run the application on your local computer:

### Step 1: Clone Repository & Open Directory
```bash
git clone <your-repository-url>
cd ai-resume-analyzer
```

### Step 2: Set Up Backend (FastAPI)
1. Open a terminal in the project root:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *The backend will start at `http://localhost:8000` and automatically populate sample job descriptions.*

### Step 3: Set Up Frontend (Vite + React)
1. Open a second terminal window in the project root:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. Open your browser and navigate to: `http://localhost:3000`

---

## 🌐 Step-by-Step Render Deployment Guide (For Hackathon Submission)

To give your evaluators a working live URL where clicking **"Visit Site"** opens the application directly:

### Step 1: Build & Verify Production Static Assets Locally
1. Build the React frontend into `frontend/dist`:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

### Step 2: Push Code to GitHub
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Codegnan Hackathon Submission"
   ```
2. Push your code to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/ai-resume-analyzer.git
   git push -u origin main
   ```

### Step 3: Deploy on Render (Free Tier)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository `ai-resume-analyzer`.
3. Configure the Web Service settings:
   - **Name**: `ai-resume-analyzer`
   - **Environment**: `Python`
   - **Build Command**: `./build.sh`
   - **Start Command**: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
4. Click **Create Web Service**.
5. Once deployment completes, Render will generate a live URL (e.g., `https://ai-resume-analyzer.onrender.com`).
6. Paste this URL on your GitHub repository header under **Website / Visit Site** link!

When evaluators click the **Visit Site** button, the live application will load immediately!

---

## 📝 License & Team Credits
Developed for **Codegnan Hackathon** by **Data Mavericks Team**.
