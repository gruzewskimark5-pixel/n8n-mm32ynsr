## 2025-02-26 - Transparency in Template Deployment
**Learning:** For deployment templates using free tiers, users often miss critical limitations (like database expiry) which leads to a poor UX and potential data loss. Adding clear warnings and post-deployment steps in the README significantly improves the "Day 2" user experience.
**Action:** Always check the provider's free-tier terms and include specific warnings and setup guides in the README.

## 2025-05-15 - Improving Deployment Visibility with Health Checks
**Learning:** For infrastructure-as-code templates, adding a health check endpoint (like n8n's `/healthz`) to the deployment configuration (`render.yaml`) significantly improves the developer UX by providing real-time feedback during the deploy process and enabling zero-downtime updates.
**Action:** Always identify and implement the application's native health check endpoint in the Blueprint configuration and document it in a "Verification" section in the README.

## 2025-05-16 - Reducing Navigation Friction in Deployment Templates
**Learning:** Providing specific UI navigation paths (e.g., 'Go to the Environment tab') for manual setup steps reduces cognitive load and prevents users from getting lost in a complex platform dashboard.
**Action:** Always include step-by-step navigation guidance for any manual configuration required after deployment.

## 2025-05-17 - Table of Contents Anchor Consistency
**Learning:** Emojis in Markdown headers are often stripped or handled inconsistently by git platforms (like GitHub) when generating automatic anchor links. This frequently leads to broken Table of Contents links if the anchors in the TOC don't perfectly match the processed header text.
**Action:** Keep Table of Contents anchors simple and emoji-free, and ensure header text is synchronized with TOC links to maintain navigation integrity.

## 2025-05-18 - Preventing Integration Failures with Explicit Formatting
**Learning:** For environment variables that are used as base URLs (like n8n's `WEBHOOK_URL`), users often intuitively include a trailing slash, which can lead to broken integrations if the application logic later appends another slash. Providing explicit "do not include" instructions and counter-examples prevents this friction.
**Action:** Always provide explicit formatting constraints (e.g., "no trailing slash") and a clear example/counter-example pair for URL-based environment variables.

## 2026-03-14 - Factual Transparency in Free Tier Templates
**Learning:** Platform policies for free tiers (like database expiry) are dynamic and change over time. Inaccurate information in deployment templates (e.g., stating 90 days when it is now 30) creates a significant UX risk where users may unexpectedly lose data.
**Action:** Include direct links to official platform pricing/limits documentation and explicitly label resource constraints (like storage limits) to maintain trust and data safety.
