# CV Tailor

A static single-page app that tailors your CV to a job ad using the Claude API.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. No build command needed; set output directory to `.` (root)
4. Click Deploy

## First use

1. Open the deployed URL (or run locally with `npx serve .`)
2. Click the gear icon (top right) and enter your Anthropic API key
3. Paste a job ad URL and click **Tailor my CV**
4. Review and edit the tailored CV, then click **Download PDF**

## Local development

```bash
npx serve .
# open http://localhost:3000
```

No build step, no dependencies to install.
