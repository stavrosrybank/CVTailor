# CV Tailor

Single-page static web app that tailors a CV to a job ad using the Claude API.

## How it works
1. User enters a job ad URL
2. App fetches the job text via Jina AI Reader API (r.jina.ai)
3. Sends job text + base CV (cv.md) to Claude Sonnet
4. Claude rewrites only the CV text to match the job — structure and facts stay the same
5. User reviews/edits the result, then downloads as PDF via browser print

## Stack
- Plain HTML/CSS/JS (no framework, no build step)
- Anthropic Claude API (claude-sonnet-4-6), called directly from browser
- Jina AI Reader API for URL-to-text extraction (free, no auth)
- Browser print API for PDF generation
- Vercel for static hosting

## Key files
- index.html — entire app (HTML + CSS + JS)
- cv.md — base CV content in Markdown (source of truth)
- README.md — deployment instructions

## Config
- API key stored in localStorage (key: cvtailor_api_key)
- No backend, no server, no env variables needed
