# Deployment Checklist

## Before GitHub upload

- [ ] Rename repository, for example: `miftahul-arif-portfolio`
- [ ] Replace `https://github.com/` in `index.html` with your real GitHub profile URL.
- [ ] Add real screenshots to `assets/images/`.
- [ ] Copy the final Resume/CV files into `assets/files/` if you want them downloadable.
- [ ] Review all wording and dates.
- [ ] Verify email and portfolio URL.

## GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/miftahul-arif-portfolio.git
git push -u origin main
```

## Vercel

1. Sign in to Vercel.
2. Add New Project.
3. Import the GitHub repository.
4. Framework Preset: Other.
5. Build Command: leave empty.
6. Output Directory: leave empty / root.
7. Deploy.

The project is static and does not require a server or environment variables.

## Recommended next improvement

Add real project screenshots. Do not upload confidential employee data, private documents, credentials, API keys, or private database information.
