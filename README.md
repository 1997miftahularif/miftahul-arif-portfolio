# Miftahul Arif — Portfolio

Personal portfolio website for **Miftahul Arif**, focused on:

- Digital Solutions
- Web Applications
- Business Process Automation
- Reporting & Workflow Automation
- AI-Assisted Development

The site is intentionally positioned around practical digital solutions rather than claiming AI engineering or full-stack expertise.

## Featured project

### Employee Activity & Attendance Reporting System

A personal / administrative web application built to replace a manual monthly activity and attendance reporting workflow with structured digital submission and review.

**Stack**
- HTML / CSS / JavaScript
- Supabase / PostgreSQL
- Supabase Auth
- Row Level Security (RLS)
- Cloudinary
- docx.js
- Git / GitHub

**Workflow**
- Employee login
- Select month
- Add activities + photos
- Add attendance + photos
- Review and submit
- Admin review
- Approve or Revision
- Resubmission after revision
- Word report output

## Project case study

The full case study is available at:

`projects/employee-reporting-system/index.html`

It includes:
- Problem
- Before → After workflow
- How the application works
- Key features
- Screenshot gallery
- Technical architecture
- My role
- AI-assisted development approach
- What I learned
- Live application link

## Screenshots

Place real, redacted project screenshots in:

```text
assets/images/project/
```

Recommended final files:

```text
01-login.png
02-main-reporting.png
03-activity.png
04-attendance.png
05-admin-review.png
06-word-output.png
architecture-v2.png
```

The current `02`–`06` files are visual placeholders. Replace them with real screenshots from the application before publishing.

### Screenshot checklist

1. **Login** — employee/admin login screen.
2. **Main reporting page** — main employee reporting interface.
3. **Activity** — activity entry and supporting photo upload.
4. **Attendance** — attendance record and supporting photo upload.
5. **Admin review** — admin dashboard with Approve / Revision actions.
6. **Word output** — redacted preview of the generated Word report.
7. **Architecture** — technical architecture diagram already included.

Do not publish employee names, IDs, emails, photos, passwords, tokens, private URLs, or other personal/private data. Redact them in screenshots.

## Run locally

This is a static website. No build step is required.

```bash
git clone https://github.com/1997miftahularif/miftahul-arif-portfolio.git
cd miftahul-arif-portfolio
```

Open `index.html` in a browser, or use any static local server.

## Deploy to Vercel

### Option A — GitHub integration
1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Import the repository into Vercel.
4. Use **Other / static** as the framework preset if prompted.
5. Deploy.

No environment variables are required for the portfolio site itself.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel
```

## Before publishing

Check these files/values:

- `index.html` — GitHub and live portfolio URLs.
- `projects/employee-reporting-system/index.html` — live application URL and GitHub link if you decide to expose source code.
- `assets/files/Resume_Master_Miftahul_Arif.docx` — current resume.
- `assets/images/project/` — replace placeholders with redacted screenshots.

Do not place Supabase service-role keys, Cloudinary API secrets, passwords, tokens, or private employee data in this repository.

## Career positioning

The site follows the current resume positioning:

**DIGITAL SOLUTIONS • WEB APPLICATIONS • BUSINESS PROCESS AUTOMATION**

The technical foundation is HTML, CSS, and JavaScript, expanded through hands-on learning and AI-assisted development. Graphic design, digital marketing, and administrative operations remain important parts of the professional background.

## Contact

Email: arief1911@gmail.com

Portfolio: https://miftahularif.vercel.app
