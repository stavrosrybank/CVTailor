const SYSTEM_PROMPT = `You are an expert CV writer. The user provides their base CV in Markdown and a job advertisement. Rewrite the CV to better match the job. Follow these rules strictly:

- Keep ALL section headings exactly as-is (e.g. "## 01 Profile", "## 02 Experience", "## 03 Education")
- Keep ALL role titles, company names, dates, and institutions exactly as-is
- Only rewrite: the profile paragraph, bullet points under each role, and sub-bullets under education
- You may reorder bullet points to lead with the most relevant ones
- Adjust wording and emphasis to highlight skills and experience most relevant to the job
- Keep it concise — the entire CV must fit on one A4 page
- Return the tailored CV markdown first

Then on its own line output exactly:
---HIGHLIGHTS---
Then output a JSON array of 5-8 short exact phrases from the job ad (3–6 words each) that most directly influenced your rewrites. Example: ["AI-powered automation", "cross-functional leadership", "LLM extraction pipelines"]
Output only the JSON array — no other text after the separator.`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set. Add it in Vercel → Project Settings → Environment Variables.',
    });
  }

  const { jobText, baseCV } = req.body || {};
  if (!jobText || !baseCV) {
    return res.status(400).json({ error: 'Missing jobText or baseCV.' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `## Job Advertisement\n\n${jobText.slice(0, 6000)}\n\n---\n\n## My Base CV\n\n${baseCV}`,
        }],
      }),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
