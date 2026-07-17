# 🚀 CareerNexus / NexusLabs Careers Portal

A premium, production-ready, fully responsive **Single Page Careers & Vacancy Portal** designed for modern tech startups and professional talent placements. Built with React 19, TypeScript, and Tailwind CSS, featuring high-fidelity animations powered by Framer Motion.

This application is **100% serverless** and client-driven. It requires no custom database or server infrastructure, and can be hosted completely for free on platform solutions like **Vercel** or **Netlify**.

---

## ✨ Features

- **Responsive Dark/Light Mode**: Full visual themes that synchronize to `localStorage` for visual consistency.
- **Robust Job Boards**: Displays 8 curated, detailed positions stored inside a structured JSON layout, featuring live interactive searches and combined filters (Search, Location, Experience Level, Technology).
- **Interactive Details Overlay**: Spring-animated modals showing candidate prerequisites and detailed responsibilities.
- **Pre-filled Apply Routing**: Clicking "Apply Now" on any card automatically syncs the preferred role field and scrolls seamlessly to the application form.
- **Dual Form Inquiries**:
  - **Student / Candidate Application Form**: Rigorous input validation using **React Hook Form** (e.g. valid LinkedIn links, emails, and mandatory fields).
  - **Business / Partner Contact Form**: Clean structure for partner firms seeking to tap into our pre-screened talent pools.
- **Zero-Backend Email Delivery**: Submissions are transmitted directly to physical emails through the free, secure **FormSubmit** API endpoint.
- **Interactive Local Transaction Logs**: To prove delivery, submitted forms are cached securely on your browser’s `localStorage`, allowing you to review your active inquiries in an elegant, built-in dashboard.
- **Dynamic Toast Queue**: Custom sliding notification toasts showing successful form transmissions and informative alerts.

---

## 📂 Project Structure

```bash
src/
 ├── components/
 │    ├── JobCard.tsx       # Polished responsive job card with skills badges
 │    ├── JobModal.tsx      # Spring-animated detail modal with WCAG support
 │    ├── ThemeToggle.tsx   # Elegant animated Moon/Sun theme switcher
 │    └── Toast.tsx         # Self-destructing toast alerts queue
 ├── data/
 │    └── jobs.json         # 8 mock tech and business vacancies with metadata
 ├── sections/
 │    ├── Hero.tsx          # Dynamic background grid and CTA handles
 │    ├── About.tsx         # Company mission, vision, and core values grid
 │    ├── WhyJoinUs.tsx     # Modern startup benefit cards with hover scales
 │    ├── ApplicationForm.  # React Hook Form validated placement submissions
 │    ├── ContactSection.tsx# Location metrics and generic business inquiry form
 │    └── Footer.tsx        # Self-contained slide-overs for Privacy & Terms
 ├── types/
 │    └── index.ts          # Rigid TypeScript interfaces
 ├── App.tsx                # Main state controller, routing, and logs dashboard
 ├── index.css              # Custom font pairings (Space Grotesk + Inter)
 └── main.tsx               # Client entry point
```

---

## 🛠️ Free Form Setup (FormSubmit)

Your forms are pre-configured to send inquiries directly to your email for **$0**. To customize the destination email address:

1. Open `src/sections/ApplicationForm.tsx` and `src/sections/ContactSection.tsx`.
2. Locate the fetch URL: `https://formsubmit.co/ajax/9986b51e68710328b9d03837920807e3`.
3. Replace the hex hash (or add your target email address): e.g. `https://formsubmit.co/ajax/your-email@example.com`.
4. Upon your very first submission, FormSubmit will send you a single verification email to activate the link. Once confirmed, all future submissions will route straight to your inbox!

---

## ⚡ Deployment Instructions

### Option 1: Vercel (Recommended)
1. Register for a free account at [Vercel](https://vercel.com).
2. Connect your GitHub repository.
3. Vercel will auto-detect the Vite project configuration.
4. Click **Deploy**. Your site will be live on a free sub-domain under 2 minutes!

### Option 2: Netlify
1. Register at [Netlify](https://netlify.com).
2. Push your project and configure build parameters:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click **Deploy Site**.
