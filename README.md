# 🎨 Kishan Parvadiya - Portfolio Website

> A modern, fully-animated personal portfolio website showcasing UI/UX design expertise, product management skills, and professional case studies.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://kishanparvadiya.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat&logo=tailwindcss)](https://tailwindcss.com)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Content Management](#content-management)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Project Guidelines](#project-guidelines)
- [License](#license)

---

## 📋 Overview

This portfolio is a **full-featured, production-ready personal website** designed to showcase professional work, skills, and experience. It combines:

- **Modern React 19** for component-based architecture
- **Vite 8** for lightning-fast development and optimized builds
- **Tailwind CSS 4** for responsive, utility-first styling
- **Framer Motion** for smooth, professional animations
- **Web3Forms** for serverless contact form handling

The website is **fully responsive**, works seamlessly on mobile and desktop, and includes dynamic features like automatic experience calculation and interactive case study displays.

---

## ✨ Key Features

### 🎯 Frontend Excellence

- **Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Smooth Motion & Animations** - Professional fade-in, scroll, and stagger effects using Framer Motion
- **Interactive Components** - Project cards with hover effects, expandable sections, and smooth transitions
- **Custom Cursor** - Unique pointer experience that enhances brand presence
- **Loading Screen** - Professional loading animation while content loads

### 💼 Content & Portfolio

- **Dynamic Project Showcase** - Display projects with categories, descriptions, and image support
- **Case Study Feature** - Detailed case studies with problem, research, design process, and results sections
- **Skills & Experience** - Visual skill bars with proficiency levels and professional experience timeline
- **Client Logos** - Display of brands and clients you've worked with
- **Education Section** - Showcase your academic credentials and certifications

### 📞 Contact & Communication

- **Web3Forms Integration** - Serverless form submission (no backend server needed)
- **Email Notifications** - Receive contact form submissions directly to your email
- **Social Links** - Direct links to Behance, LinkedIn, Dribbble, GitHub, and Twitter
- **Resume Link** - Quick link to download your resume from Google Drive

### 🔧 Developer Features

- **Single Data Source** - All content managed in one file (`portfolio.js`)
- **Easy Content Updates** - Change text, images, and projects without touching code
- **Component-Based Architecture** - Modular, maintainable code structure
- **ESLint Configuration** - Code quality standards built-in
- **Development Mode Indicators** - Clear HMR (Hot Module Replacement) for instant updates

---

## 🛠 Tech Stack

| Technology        | Version  | Purpose                                                     |
| ----------------- | -------- | ----------------------------------------------------------- |
| **React**         | 19       | UI framework for component-based architecture               |
| **Vite**          | 8        | Lightning-fast build tool and dev server with HMR support   |
| **Tailwind CSS**  | 4        | Utility-first CSS framework for responsive design           |
| **Framer Motion** | Latest   | Animation library for smooth, professional effects          |
| **React Icons**   | Latest   | Icon library with 1000+ icons (Font Awesome, Feather, etc.) |
| **Web3Forms**     | Service  | Serverless form backend (no server needed)                  |
| **Node.js**       | 18+      | Runtime environment for development and build scripts       |
| **Express**       | Optional | Backend API (included for optional use)                     |

### Why These Technologies?

- **React 19**: Modern hooks API, automatic batching, and improved performance
- **Vite**: Extremely fast development with instant HMR and optimized production builds
- **Tailwind CSS**: Rapid UI development with consistent design system
- **Framer Motion**: Industry-standard for smooth, accessible animations
- **Web3Forms**: No backend infrastructure needed for contact forms

---

## 📁 Project Structure

```
new-update-portfolio/
│
├── 📄 README.md                    # This file - comprehensive project documentation
├── 📄 PORTFOLIO_GUIDE.md           # Non-technical content editing guide for users
├── 📄 package.json                 # Root project dependencies and scripts
├── 📄 vercel.json                  # Vercel deployment configuration
│
├── 📂 client/                      # React frontend application (MAIN PROJECT)
│   ├── 📄 package.json             # Frontend dependencies (React, Vite, Tailwind)
│   ├── 📄 vite.config.js           # Vite configuration (build, preview, HMR)
│   ├── 📄 eslint.config.js         # ESLint rules for code quality
│   ├── 📄 index.html               # HTML entry point
│   │
│   ├── 📂 public/                  # Static assets served as-is
│   │   └── 📂 images/              # Profile photo, project images, logos
│   │
│   └── 📂 src/                     # React source code
│       ├── 📄 main.jsx             # Application entry point
│       ├── 📄 App.jsx              # Root component (routing & layout)
│       ├── 📄 index.css            # Global styles
│       │
│       ├── 📂 data/
│       │   └── 📄 portfolio.js     # ⭐ MAIN DATA FILE - Edit here for all content!
│       │
│       ├── 📂 components/          # React components (modular UI pieces)
│       │   ├── About.jsx           # About section with bio
│       │   ├── CaseStudy.jsx       # Detailed case study modal
│       │   ├── ClientLogos.jsx     # Brand logos showcase
│       │   ├── Contact.jsx         # Contact form section
│       │   ├── CustomCursor.jsx    # Custom pointer effect
│       │   ├── Education.jsx       # Education & certifications
│       │   ├── Experience.jsx      # Work experience timeline
│       │   ├── Footer.jsx          # Footer with social links
│       │   ├── Hero.jsx            # Hero/landing section
│       │   ├── LoadingScreen.jsx   # Loading animation
│       │   ├── Navbar.jsx          # Navigation bar
│       │   ├── Projects.jsx        # Projects showcase grid
│       │   ├── Skills.jsx          # Skills with visual bars
│       │   │
│       │   ├── 📂 motion/          # Animation wrapper components
│       │   │   ├── FadeInOnScroll.jsx   # Fade in when scrolling into view
│       │   │   └── StaggerContainer.jsx # Stagger animation for lists
│       │   │
│       │   └── 📂 ui/              # Reusable UI components
│       │       ├── Button.jsx      # Customizable button component
│       │       ├── Card.jsx        # Card container component
│       │       ├── GlowOrb.jsx     # Decorative glowing orb effect
│       │       └── SectionHeading.jsx  # Styled section headings
│       │
│       └── 📂 hooks/               # Custom React hooks
│           └── useSmoothScroll.js  # Smooth scrolling behavior
│
├── 📂 server/                      # Optional Express backend (for local development)
│   ├── 📄 package.json             # Server dependencies
│   ├── 📄 index.js                 # Express server entry point
│   └── 📂 routes/
│       └── contact.js              # Contact form endpoint (optional)
│
└── 📂 api/                         # Optional Vercel serverless function
    └── contact.js                  # Serverless contact form handler

```

### Key Directory Explanations

**`client/src/data/portfolio.js`** ⭐

- **Central content management file**
- Contains all text, project details, skills, experience, social links
- Edit this file to update portfolio content without touching code
- Exported data includes:
  - `personalInfo` - Your name, bio, contact details
  - `navLinks` - Navigation menu items
  - `projects` - Portfolio projects with descriptions and case studies
  - `skills` - Skills grouped by category with proficiency levels
  - `experience` - Work history and timeline
  - `education` - Academic background
  - `caseStudy` - Template for case study sections

**`client/src/components/`**

- Modular React components that build the UI
- Each component is self-contained and reusable
- Components use Tailwind CSS for styling

**`client/public/images/`**

- Stores all images (profile photo, project screenshots, logos)
- Referenced in `portfolio.js` with paths like `/images/filename.jpg`

---

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

### Required

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
  - Check: `node --version` and `npm --version`
- **Git** (optional, but recommended for version control) - [Download here](https://git-scm.com/)

### Recommended

- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Vercel CLI** - For easy deployment (install with `npm install -g vercel`)

### Web3Forms Account (For Contact Form)

- Create free account at [https://web3forms.com](https://web3forms.com)
- Get your Access Key from dashboard
- No credit card required, free tier includes 250 monthly submissions

---

## 🚀 Installation

### Step 1: Clone or Download the Repository

```bash
# Option A: Using Git (Recommended)
git clone https://github.com/kishanpatel486630/new-update-portfolio.git
cd new-update-portfolio

# Option B: Download ZIP from GitHub
# Extract the downloaded ZIP file to your desired location
# Open terminal in the extracted folder
```

### Step 2: Install Dependencies

```bash
# From the root directory (new-update-portfolio/)
npm run setup
```

This command automatically:

- Installs root dependencies
- Installs client dependencies (inside `client/` folder)
- Installs server dependencies (inside `server/` folder)

**What gets installed:**

- React, React DOM
- Vite and build tools
- Tailwind CSS
- Framer Motion, React Icons
- Development tools (ESLint, Concurrently)

### Step 3: Verify Installation

```bash
# Check if all dependencies installed correctly
npm list --depth=0

# You should see packages like:
# ├── concurrently@9.2.1
# ├── nodemailer@6.10.1
# └── (other packages)
```

---

## ⚙️ Configuration

### Web3Forms Setup (For Contact Form)

The contact form uses **Web3Forms** - a service that handles form submissions without needing a backend server.

#### Getting Your Web3Forms Key

1. **Visit** [https://web3forms.com](https://web3forms.com)
2. **Sign up** (click "Get Started for Free")
3. **Verify email** (check your inbox)
4. **Copy Access Key** from your dashboard
5. **Create environment file** in `client/` folder:

#### Step-by-Step Configuration

```bash
# Navigate to client folder
cd client

# Create .env.local file (Windows: use notepad or VS Code)
# File location: client/.env.local

# Add this line with your actual Web3Forms key:
VITE_WEB3FORMS_ACCESS_KEY=your_actual_web3forms_access_key_here
```

**Example .env.local file:**

```env
VITE_WEB3FORMS_ACCESS_KEY=12345678901234567890abcdefghijklmnop
```

#### Template File

A template is provided at `client/.env.example`:

```env
VITE_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

**Important Security Notes:**

- ✅ Never commit `.env.local` to Git (it's in `.gitignore`)
- ✅ Keep your Access Key private
- ✅ The key is safe to use in frontend (Web3Forms provides security)

#### Live Deployment on Vercel

For the production site, add `VITE_WEB3FORMS_ACCESS_KEY` in your Vercel project settings under Environment Variables, then redeploy. A local `.env` file is not read by the live deployment.

### Optional: Environment Variables

```env
# client/.env.local (optional, add as needed)

# Web3Forms
VITE_WEB3FORMS_ACCESS_KEY=your_key_here

# API endpoints (if using custom backend)
VITE_API_URL=http://localhost:5000

# Analytics (optional)
VITE_GA_ID=your_google_analytics_id
```

---

## 💻 Usage

### Running Development Server

```bash
# From root directory
npm run dev
```

This starts:

- **Frontend**: http://localhost:5173 (Vite development server)
- **Backend** (optional): http://localhost:5000 (Express server)

Visit http://localhost:5173 in your browser to see the portfolio.

#### Development Features

- **Hot Module Replacement (HMR)** - Changes appear instantly without refreshing
- **Fast Refresh** - React components update in place
- **Source Maps** - Easy debugging in browser DevTools
- **Error Overlay** - Compilation errors displayed in browser

### Running Only Frontend

```bash
npm run dev:client
```

This runs only the React/Vite development server (useful if you don't need the backend).

### Running Only Backend

```bash
npm run dev:server
```

This starts only the Express server on port 5000 (useful if frontend is hosted elsewhere).

### Editing Content

All content is in `client/src/data/portfolio.js`. Simply:

1. Open the file in VS Code
2. Edit text, add/remove projects, change images
3. Save the file (Ctrl+S)
4. Changes appear instantly in the browser (HMR)

See [Content Management](#content-management) for detailed editing instructions.

---

## 📦 Available Scripts

### Root Level Scripts

**`npm run setup`**

- Installs all dependencies for the entire project
- Runs: `npm install` in root, client/, and server/
- **Use this** first time after cloning the project

**`npm run dev`**

- Starts both frontend (Vite) and backend (Express) in parallel
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Uses `concurrently` to run both without separate terminals

**`npm run dev:client`**

- Starts only the frontend development server
- Frontend: http://localhost:5173

**`npm run dev:server`**

- Starts only the backend development server
- Backend: http://localhost:5000

### Client-Level Scripts

Run these from inside the `client/` folder:

```bash
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Check code quality with ESLint
```

**`npm run dev`** (from client/)

- Start Vite development server
- Hot Module Replacement enabled
- Source maps for debugging

**`npm run build`** (from client/)

- Create production-optimized build
- Output in `client/dist/`
- Minified CSS, JS, and assets
- Static files ready for deployment

**`npm run preview`** (from client/)

- Preview the production build locally
- Helps verify build works before deploying
- Runs on http://localhost:4173

**`npm run lint`** (from client/)

- Check code quality using ESLint
- Detects code style issues
- Helps maintain consistent code quality

---

## 📝 Content Management

All portfolio content is stored in **one file**: `client/src/data/portfolio.js`

### What You Can Edit

✅ **Easily Editable:**

- Personal info (name, email, bio, role)
- Social media links
- Projects (title, description, images, categories)
- Skills and proficiency levels
- Work experience and timeline
- Education details
- Case study content
- Profile photo and project images

### Data Structure Overview

The `portfolio.js` file contains these main exports:

```javascript
// 👤 Your personal information
export const personalInfo = {
  name: "Kishan Parvadiya",
  role: "UI/UX Designer | Aspiring Product Manager",
  email: "kishanpatel486630@gmail.com",
  profileImage: "/images/profile.jpg",
  social: {
    behance: "https://...",
    linkedin: "https://...",
    // ... other social links
  },
  // ... more fields
};

// 🔗 Navigation menu items
export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  // ... more links
];

// 💼 Your projects
export const projects = [
  {
    id: "project-1",
    title: "Project Name",
    description: "Project description",
    image: "/images/project.jpg",
    // ... more fields
  },
  // ... more projects
];

// 🎯 Your skills
export const skills = [
  {
    category: "UI/UX Design",
    items: [
      { name: "Figma", level: 95 },
      // ... more skills
    ],
  },
  // ... more categories
];

// 💼 Work experience
export const experience = [
  {
    title: "Job Title",
    company: "Company Name",
    startDate: "Jan 2025",
    endDate: "Present",
    // ... more fields
  },
  // ... more jobs
];

// 🎓 Education
export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science",
    institution: "Your University",
    year: "2026",
    // ... more fields
  },
  // ... more education
];

// 📖 Case study template
export const caseStudy = {
  sections: {
    problem: { title: "The Problem", content: "..." },
    research: { title: "Research & Discovery", content: "..." },
    design: { title: "Design Process", content: "..." },
    results: { title: "Results", content: "..." },
  },
};
```

### Detailed Editing Guide

For **step-by-step instructions** on editing content, see:
**[PORTFOLIO_GUIDE.md](PORTFOLIO_GUIDE.md)**

This file includes:

- How to change photos and images
- How to update text and personal details
- How to manage projects
- How to update case studies
- How to update skills
- Syntax rules and important notes

### Quick Editing Examples

**Change Your Name:**

```javascript
export const personalInfo = {
  name: "Your New Name", // ← Change this
  // ... rest of fields
};
```

**Update a Social Link:**

```javascript
social: {
  linkedin: "https://linkedin.com/in/your-profile",  // ← Change this
  // ... other links
}
```

**Modify Skill Level:**

```javascript
items: [
  { name: "Figma", level: 90 }, // ← Change 90 to any number 0-100
  // ... more skills
];
```

**Add New Project:**

1. Find the `projects` array
2. Copy an existing project object `{ ... }`
3. Paste it and edit the details
4. Save the file

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is perfect for this project - it's free, fast, and handles everything automatically.

#### Option 1: Deploy from GitHub (Easiest)

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Visit** [https://vercel.com](https://vercel.com)

3. **Sign up** with GitHub account

4. **Import project**
   - Click "New Project"
   - Select your repository
   - Vercel auto-detects it's a Vite project
   - Click "Deploy"

5. **Add environment variables**
   - In Vercel dashboard, go to project settings
   - Add environment variable:
     ```
     VITE_WEB3FORMS_ACCESS_KEY = your_key_here
     ```

6. **Your site is live!** 🎉
   - URL: `your-project.vercel.app`
   - Custom domain: Add in Settings → Domains

#### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# From project root, deploy
vercel

# Follow the prompts:
# - Link to existing Vercel project or create new
# - Add environment variables when asked
# - Deployment starts automatically
```

#### Option 3: Manual Deployment

```bash
# Build for production
npm run build

# Contents of client/dist/ are ready to deploy to any host:
# - Netlify
# - GitHub Pages
# - Firebase Hosting
# - Any static hosting service
```

### After Deployment

1. **Add custom domain** (optional)
   - In Vercel: Settings → Domains
   - Point domain DNS to Vercel nameservers

2. **Enable auto-deployments**
   - Vercel automatically redeploys on every GitHub push

3. **Monitor performance**
   - Vercel dashboard shows analytics and deployment logs

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### **"Command not found: npm"**

- **Cause**: Node.js not installed
- **Solution**:
  - Download and install [Node.js](https://nodejs.org/)
  - Restart your terminal/VS Code
  - Verify: `node --version` and `npm --version`

#### **Port 5173 already in use**

- **Cause**: Another process using the port
- **Solution**:
  ```bash
  # Use different port
  npm run dev -- --port 3000
  ```

#### **"Cannot find module" errors**

- **Cause**: Dependencies not installed
- **Solution**:
  ```bash
  npm run setup
  npm install
  ```

#### **Contact form not working**

- **Cause**: Missing Web3Forms key
- **Solution**:
  1. Check `client/.env.local` exists
  2. Verify `VITE_WEB3FORMS_ACCESS_KEY` is present
  3. Check key is valid at [web3forms.com](https://web3forms.com)
  4. Restart dev server: `npm run dev`

#### **Images not displaying**

- **Cause**: Images not in `client/public/images/`
- **Solution**:
  1. Place images in `client/public/images/`
  2. Update paths in `portfolio.js` with `/images/filename.jpg`
  3. Clear browser cache (Ctrl+Shift+Delete)

#### **Styles not applying**

- **Cause**: Tailwind CSS cache or build issue
- **Solution**:
  ```bash
  # Clear cache and rebuild
  npm run build
  npm run preview
  ```

#### **Hot Module Replacement (HMR) not working**

- **Cause**: Browser cache or network issue
- **Solution**:
  1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
  2. Close dev server and restart: `npm run dev`
  3. Check browser console for errors

#### **Build fails**

- **Cause**: Code syntax errors
- **Solution**:
  1. Check console output for error message and line number
  2. Review `portfolio.js` for syntax issues (missing quotes, commas)
  3. Fix errors and rebuild: `npm run build`

---

## 📖 Project Guidelines

### Design Preferences

- **Modern, animated UI** with smooth motion effects
- **Responsive mobile-first design** - works great on all devices
- **Accessible components** - keyboard navigation supported
- **Fast performance** - optimized builds with lazy loading

### Content Guidelines

- **Keep descriptions concise** - 1-2 sentences per project
- **Use professional language** - match design industry standards
- **Include keywords** - helps with SEO and searchability
- **Update regularly** - add new projects, update skills as you grow

### Performance Tips

- **Optimize images**
  - Compress before uploading (use [TinyPNG](https://tinypng.com))
  - Use WebP format when possible
  - Keep file sizes under 500KB per image

- **Update skills data**
  - Keep skill levels realistic (0-100)
  - Review skills annually

- **Monitor deployments**
  - Check Vercel analytics
  - View performance metrics in lighthouse reports

---

## 📄 License

This project is provided as-is. Feel free to use it as your portfolio or modify it for your needs.

---

## 📧 Support & Questions

For help with:

- **Content editing** → See [PORTFOLIO_GUIDE.md](PORTFOLIO_GUIDE.md)
- **Development issues** → Check [Troubleshooting](#troubleshooting)
- **Deployment problems** → See [Deployment](#deployment) section
- **Tech questions** → Review inline code comments

---

## 🎉 Getting Started Checklist

- [ ] Install Node.js v18+
- [ ] Clone/download repository
- [ ] Run `npm run setup` from root
- [ ] Create `client/.env.local` with Web3Forms key
- [ ] Run `npm run dev` to start development
- [ ] Edit `client/src/data/portfolio.js` with your content
- [ ] Add your images to `client/public/images/`
- [ ] Test contact form with a test submission
- [ ] Build for production: `npm run build`
- [ ] Deploy to Vercel or your hosting service
- [ ] Configure custom domain (optional)

---

**Happy building! Your portfolio is ready to impress.** ✨

- `PORTFOLIO_GUIDE.md`

## Deployment

This repo includes `vercel.json` configured for Vite static output:

- Build command: `cd client && npm run build`
- Output directory: `client/dist`

For successful contact form submissions in production:

- Add `VITE_WEB3FORMS_ACCESS_KEY` in your deployment environment variables.

## Notes

- Web3Forms handles contact submission directly from frontend.
- Backend files are currently optional and can be kept for future custom API logic.

## Author

Kishan Parvadiya
