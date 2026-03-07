# CV Tailor

Single-page static web app that tailors a CV to a job ad using the Claude API.

## How it works
1. User enters a job ad URL
2. App fetches the job text via Jina AI Reader API (r.jina.ai)
3. Sends job text + base CV (cv.md) to the Vercel serverless function (`api/tailor.js`)
4. Claude rewrites only the CV text to match the job — structure and facts stay the same
5. Result is shown in a split view: job description (left) and tailored CV (right)
6. Changed lines in the CV are highlighted yellow; key job ad phrases that influenced the changes are also highlighted yellow in the job description
7. User reviews/edits the result, then downloads as PDF via browser print (highlights are removed in PDF)

## Stack
- Plain HTML/CSS/JS (no framework, no build step)
- Anthropic Claude API (claude-sonnet-4-6)
- Vercel serverless function (`api/tailor.js`) proxies Claude — API key never touches the browser
- Jina AI Reader API for URL-to-text extraction (free, no auth)
- Browser print API for PDF generation
- Vercel for hosting

## Key files
- index.html — entire app (HTML + CSS + JS)
- api/tailor.js — Vercel serverless function that calls Claude with the API key
- cv.md — base CV content in Markdown (source of truth)
- README.md — deployment instructions

## Config
- `ANTHROPIC_API_KEY` set in Vercel → Project Settings → Environment Variables
- For local testing without Vercel: enter API key via the gear icon (stored in localStorage)
