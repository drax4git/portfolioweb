# Retro-Neo Professional Developer Portfolio & Admin Dashboard

A responsive, animated, and visually distinctive professional developer portfolio inspired by Neo-Brutalist aesthetics, vintage computer interfaces, retro scrapbook illustrations, and modern engineering design systems.

Includes a **complete, separate, secure Admin Dashboard** empowering the developer to manage 100% of portfolio content, projects, skills, certifications, experience, hackathons, and inbound contact messages dynamically without touching code or redeploying.

---

## 🎨 Visual & Design System

- **Neo-Brutalist Bento Layout**: Hard offset shadows (`shadow-[4px_4px_0px_#111111]`), bold black borders (`border-3`, `border-4`), geometric cards, and high-contrast color blocks.
- **Retro Aesthetic Accents**:
  - Split-screen notebook graph paper (`#F5F2EB`)
  - Retro floating code card (`const developer = {...}`)
  - Starburst sticker badges, 3.5" floppy disk illustrations, pixel hearts, barcodes, and paper clip accents
  - Retro temperature widget (`24°C`) for the Weatherly showcase
- **Color Palette**:
  - White: `#FFFFFF`
  - Black: `#111111`
  - Cream: `#F5F2EB`
  - Lime: `#C5FF4A`
  - Pink: `#FF789B`
  - Purple: `#8050F5`
  - Yellow: `#F5E82D`
  - Blue: `#1455F5`
- **Typography Pairing**:
  - Headings: *Archivo Black* & *Space Grotesk*
  - Body: *DM Sans*
  - Code & Badges: *Space Mono* & *IBM Plex Mono*

---

## 🚀 Sections Breakdown

1. **Sticky Neo-Brutalist Navigation**:
   - Brand block `</> JOSHUA DEV` with high-contrast borders
   - Section links (Skills, Projects, Experience, Education, Certifications, Hackathons, Stats)
   - Quick Admin login pill
   - Purple action CTA: `CONTACT ME ->`
   - Responsive mobile slide-down menu
2. **Split-Screen Hero Section**:
   - **Left**: Greeting badge `HEY, I'M JOSHUA 👋`, large bold headline, short biography, Neo-Brutalist CTAs (`VIEW MY WORK ↗`, `DOWNLOAD RESUME ↓`), social icon buttons (GitHub, LinkedIn, Twitter, Email).
   - **Right**: Pink panel, layered photo frame with lime offset border, interactive floating retro code snippet, floating retro stickers, and live status badge.
3. **Core Skills Arsenal**:
   - Categorized filters (Frontend, Backend, Database, Languages, Tools & Platforms)
   - Crisp official brand icons (React, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Supabase, Docker, etc.)
   - Interactive proficiency meters and hover micro-interactions.
4. **Featured Projects & Certifications**:
   - **Left / Center**: Interactive project carousel with custom Weatherly illustration, live demo & GitHub repository links, detailed project viewer modal.
   - **Right**: Stacked certificate cards (`Cert 1`, `Cert 2`, `Cert 3`) matching the visual reference with instant verification links.
5. **Career Experience Timeline**:
   - Pink `EXPERIENCE ->` header block
   - Vertical timeline with roles, companies, dates, achievements, and tech stack tags
   - Purple collaborative CTA box with starburst sticker: `LET'S BUILD SOMETHING AMAZING TOGETHER.`
6. **Academic Education**:
   - Retro-inspired colorful degree cards with honors and coursework details.
7. **Licenses & Certifications**:
   - Full certifications grid with lightbox preview modal and verification links.
8. **Hackathons & Achievements**:
   - High-energy cards showcasing competition victories, awards, teams, and project demos.
   - Key honors (e.g. GitHub Arctic Code Vault Contributor, Top 1% React Contributor).
9. **Coding Statistics**:
   - Authentic metrics for LeetCode (problems solved, contest rating), GitHub (contributions, stars), and Codeforces.
10. **Transmission Terminal (Contact Section)**:
    - Bold form with validation, celebratory confetti explosion upon submit, and direct inbox card.
    - Submissions are logged immediately to the Admin Messages center.
11. **Retro Footer**:
    - Lime logo tag, copyright notice, boxed social links, and smooth back-to-top button.

---

## ⚡ Complete Admin Dashboard (`/admin`)

Access the admin dashboard at `/admin` (or click **ADMIN / LOGIN** in the navigation header).

### 1. Authentication & Security
- **Real Supabase Auth**: Authenticates directly against your Supabase project using `supabase.auth.signInWithPassword()`.
- **Single-Owner Administrator Allowlist**: Strict server-side verification against the `public.admin_users` table and `public.is_admin()` SQL function. Only authorized administrator accounts can access the dashboard or perform write operations.
- **No Public Registration**: Public sign-ups are disabled, preventing visitors from creating accounts or escalating privileges.

### 2. Full Content Management (CRUD)
- **Profile**: Full name, title, bio, greeting badge, profile portrait upload/preview, resume link, code snippet.
- **Projects**: Title, card description, detailed modal markdown, screenshot upload, tech tag editor, live demo URL, GitHub URL, featured flag, display order, draft/published toggle, delete confirmation modal.
- **Skills**: Tech name, category dropdown, proficiency slider (20%-100%), icon selector, display order.
- **Experience**: Role, company, dates, current position flag, bullet achievement manager, tech tags.
- **Education**: Institution, degree, field of study, years, honors/GPA, description.
- **Certifications**: Certificate title, issuer, issue date, credential ID, verification URL, certificate image upload/preview.
- **Hackathons**: Competition name, organizer, date, award/position, team name, project summary, demo link.
- **Coding Statistics**: Platform, metric name, metric value, profile URL.
- **Social Links**: Platform name, destination URL, display order.
- **Inbound Messages**: Read messages submitted via the contact form, mark as read, reply via email link, delete with confirmation.
- **Website Settings & Database**: Edit SEO title, meta description, primary accent color picker, Supabase cloud sync status, restore initial demo state.

### 3. Draft & Live Preview Workflow
- Switch between **Draft** and **Published** on any project, skill, or credential.
- **Preview Drafts Toggle**: Allows administrators to inspect unreleased updates on the public website with a visual "DRAFT" badge before publishing.
- **Publish All Drafts**: 1-click batch publishing.

---

## 🗄️ Supabase Cloud Setup

The application works 100% out of the box in persistent Local Storage mode. To synchronize with Supabase PostgreSQL and Storage:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and run the entire contents of [`supabase-schema.sql`](./supabase-schema.sql).
3. Copy your project URL and Anon Public Key from **Project Settings -> API**.
4. In your project `.env` file, populate:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Restart your Vite dev server (`npm run dev`). The dashboard will immediately detect and synchronize with your cloud database!

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Deployment (Vercel / Netlify)

1. Push this repository to GitHub.
2. Import the project in Vercel or Netlify.
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (optional).
